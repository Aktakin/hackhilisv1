const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hackhilis', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: Number, default: 1 },
  experience: { type: Number, default: 0 },
  money: { type: Number, default: 10000 },
  skills: {
    hacking: { type: Number, default: 0 },
    networking: { type: Number, default: 0 },
    cryptography: { type: Number, default: 0 },
    socialEngineering: { type: Number, default: 0 },
    forensics: { type: Number, default: 0 },
    malware: { type: Number, default: 0 }
  },
  inventory: [{
    name: String,
    type: String,
    price: Number,
    stats: mongoose.Schema.Types.Mixed
  }],
  equipment: {
    laptop: mongoose.Schema.Types.Mixed,
    router: mongoose.Schema.Types.Mixed,
    vpn: mongoose.Schema.Types.Mixed,
    tools: [mongoose.Schema.Types.Mixed]
  },
  education: {
    coursesCompleted: [Number],
    certifications: [String],
    currentCourse: mongoose.Schema.Types.Mixed
  },
  career: {
    company: String,
    position: String,
    salary: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 }
  },
  alliance: {
    name: String,
    role: String,
    members: [mongoose.Schema.Types.Mixed]
  },
  stats: {
    hacksAttempted: { type: Number, default: 0 },
    hacksSuccessful: { type: Number, default: 0 },
    moneyEarned: { type: Number, default: 0 },
    moneyStolen: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 }
  },
  joinDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Alliance Schema
const allianceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  requirements: String,
  members: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    level: Number,
    role: { type: String, enum: ['Leader', 'Officer', 'Member'], default: 'Member' },
    joinDate: { type: Date, default: Date.now }
  }],
  level: { type: Number, default: 1 },
  reputation: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Alliance = mongoose.model('Alliance', allianceSchema);

// Multiplayer simulation state (server-authoritative, in-memory)
const PUBLIC_NETWORK_ID = 'public-network';
const playerSessions = new Map(); // socketId => player session
const usernameToSocketId = new Map(); // username => socketId
const multiplayerRooms = new Map(); // roomId => { id, name, type, members:Set<socketId> }
const attackCooldownByUser = new Map(); // username => last attack timestamp
const SIMULATED_ID_REGEX = /^SIM-\d{3}\.\d{3}\.\d{3}-(USR|PHN|LTP|TAB|TV|RTR|DEV)$/;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const toSimulatedUserId = (username) => {
  if (!username || typeof username !== 'string') {
    return 'SIM-000.000.000-USR';
  }
  let hash = 0;
  for (let i = 0; i < username.length; i += 1) {
    const char = username.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const uniqueID = Math.abs(hash) % 254 + 1;
  const subnet = Math.abs(hash >> 8) % 254 + 1;
  const segment = Math.abs(hash >> 16) % 254 + 1;
  const octet = (num) => String(num).padStart(3, '0');
  return `SIM-${octet(segment)}.${octet(subnet)}.${octet(uniqueID)}-USR`;
};

const getOrCreateRoom = (roomId, roomConfig = {}) => {
  if (!multiplayerRooms.has(roomId)) {
    multiplayerRooms.set(roomId, {
      id: roomId,
      name: roomConfig.name || roomId,
      type: roomConfig.type || 'private',
      members: new Set()
    });
  }
  return multiplayerRooms.get(roomId);
};

const leaveCurrentRoom = (socket, player) => {
  if (!player?.roomId) return;
  const previousRoomId = player.roomId;
  const currentRoom = multiplayerRooms.get(player.roomId);
  if (currentRoom) {
    currentRoom.members.delete(socket.id);
    socket.leave(currentRoom.id);
    if (currentRoom.type !== 'public' && currentRoom.members.size === 0) {
      multiplayerRooms.delete(currentRoom.id);
    }
  }
  player.roomId = null;
  if (multiplayerRooms.has(previousRoomId)) {
    emitRoomPresence(previousRoomId);
  }
};

const roomPresence = (roomId) => {
  const room = multiplayerRooms.get(roomId);
  if (!room) return [];
  return [...room.members]
    .map((socketId) => playerSessions.get(socketId))
    .filter(Boolean)
    .map((player) => ({
      username: player.username,
      simulatedId: player.simulatedId,
      hackingSkill: player.hackingSkill,
      defenseLevel: player.defenseLevel,
      reputation: player.reputation,
      status: 'online',
      onlineSince: player.onlineSince,
      roomId: player.roomId
    }));
};

const emitRoomPresence = (roomId) => {
  io.to(roomId).emit('multiplayer:presence', {
    roomId,
    players: roomPresence(roomId),
    timestamp: Date.now()
  });
};

const joinRoom = (socket, player, roomId, roomConfig = {}) => {
  leaveCurrentRoom(socket, player);
  const room = getOrCreateRoom(roomId, roomConfig);
  room.members.add(socket.id);
  player.roomId = room.id;
  socket.join(room.id);
  socket.emit('multiplayer:room_joined', {
    roomId: room.id,
    roomName: room.name,
    roomType: room.type,
    memberCount: room.members.size
  });
  emitRoomPresence(room.id);
};

const createRoomCode = () => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
};

getOrCreateRoom(PUBLIC_NETWORK_ID, { name: 'Public Network', type: 'public' });

io.on('connection', (socket) => {
  socket.on('multiplayer:register', (payload = {}) => {
    const username = String(payload.username || '').trim();
    if (!username) {
      socket.emit('multiplayer:error', { message: 'Username is required for multiplayer registration.' });
      return;
    }

    const existingSocketId = usernameToSocketId.get(username);
    if (existingSocketId && existingSocketId !== socket.id) {
      const existingSocket = io.sockets.sockets.get(existingSocketId);
      if (existingSocket) {
        existingSocket.emit('multiplayer:notice', { message: 'You connected from another session.' });
        existingSocket.disconnect(true);
      }
    }

    const player = {
      username,
      simulatedId: SIMULATED_ID_REGEX.test(payload.simulatedId || '')
        ? payload.simulatedId
        : toSimulatedUserId(username),
      hackingSkill: clamp(Number(payload.hackingSkill) || 1, 1, 100),
      defenseLevel: clamp(Number(payload.defenseLevel) || 1, 1, 10),
      reputation: Number(payload.reputation) || 0,
      onlineSince: Date.now(),
      roomId: null
    };

    playerSessions.set(socket.id, player);
    usernameToSocketId.set(username, socket.id);
    socket.emit('multiplayer:registered', {
      username: player.username,
      simulatedId: player.simulatedId
    });
    joinRoom(socket, player, PUBLIC_NETWORK_ID, { name: 'Public Network', type: 'public' });
  });

  socket.on('multiplayer:update_profile', (payload = {}) => {
    const player = playerSessions.get(socket.id);
    if (!player) return;
    player.hackingSkill = clamp(Number(payload.hackingSkill) || player.hackingSkill, 1, 100);
    player.defenseLevel = clamp(Number(payload.defenseLevel) || player.defenseLevel, 1, 10);
    player.reputation = Number(payload.reputation) || player.reputation;
    if (SIMULATED_ID_REGEX.test(payload.simulatedId || '')) {
      player.simulatedId = payload.simulatedId;
    }
    if (player.roomId) {
      emitRoomPresence(player.roomId);
    }
  });

  socket.on('multiplayer:join_public', () => {
    const player = playerSessions.get(socket.id);
    if (!player) return;
    joinRoom(socket, player, PUBLIC_NETWORK_ID, { name: 'Public Network', type: 'public' });
  });

  socket.on('multiplayer:create_room', (payload = {}) => {
    const player = playerSessions.get(socket.id);
    if (!player) {
      socket.emit('multiplayer:error', { message: 'Register before creating a room.' });
      return;
    }
    let roomCode = String(payload.roomCode || '').trim().toUpperCase();
    if (!roomCode) {
      roomCode = createRoomCode();
    }
    while (multiplayerRooms.has(roomCode)) {
      roomCode = createRoomCode();
    }
    joinRoom(socket, player, roomCode, {
      name: payload.roomName || `Private Room ${roomCode}`,
      type: 'private'
    });
    socket.emit('multiplayer:room_created', { roomCode });
  });

  socket.on('multiplayer:join_room', (payload = {}) => {
    const player = playerSessions.get(socket.id);
    if (!player) {
      socket.emit('multiplayer:error', { message: 'Register before joining a room.' });
      return;
    }
    const roomCode = String(payload.roomCode || '').trim().toUpperCase();
    if (!roomCode || !multiplayerRooms.has(roomCode)) {
      socket.emit('multiplayer:error', { message: 'Room not found. Check room code and try again.' });
      return;
    }
    const targetRoom = multiplayerRooms.get(roomCode);
    joinRoom(socket, player, targetRoom.id, { name: targetRoom.name, type: targetRoom.type });
  });

  socket.on('multiplayer:attack_attempt', (payload = {}) => {
    const attacker = playerSessions.get(socket.id);
    if (!attacker || !attacker.roomId) {
      socket.emit('multiplayer:error', { message: 'Join a multiplayer network before attacking.' });
      return;
    }

    const cooldownMs = 4000;
    const now = Date.now();
    const lastAttackAt = attackCooldownByUser.get(attacker.username) || 0;
    if (now - lastAttackAt < cooldownMs) {
      socket.emit('multiplayer:error', {
        message: `Attack cooldown active. Wait ${Math.ceil((cooldownMs - (now - lastAttackAt)) / 1000)}s.`
      });
      return;
    }

    const targetUsername = String(payload.targetUsername || '').trim();
    if (!targetUsername || targetUsername === attacker.username) {
      socket.emit('multiplayer:error', { message: 'Select a valid online target.' });
      return;
    }

    const targetSocketId = usernameToSocketId.get(targetUsername);
    const targetPlayer = targetSocketId ? playerSessions.get(targetSocketId) : null;
    if (!targetPlayer || targetPlayer.roomId !== attacker.roomId) {
      socket.emit('multiplayer:error', { message: 'Target is not available in your current network.' });
      return;
    }

    const toolBonusByType = {
      recon: 0.03,
      bruteforce: 0.08,
      malware: 0.1
    };
    const rawTool = String(payload.tool || 'recon').toLowerCase();
    const tool = rawTool === 'phishing' ? 'recon' : rawTool;
    const toolBonus = toolBonusByType[tool] ?? 0.02;

    const skillDelta = (attacker.hackingSkill - (targetPlayer.defenseLevel * 10)) / 100;
    const breachChance = clamp(0.35 + skillDelta + toolBonus, 0.1, 0.92);
    const success = Math.random() < breachChance;
    const severity = success ? (Math.random() < 0.33 ? 'high' : 'medium') : 'blocked';

    if (success) {
      targetPlayer.defenseLevel = clamp(targetPlayer.defenseLevel - 1, 1, 10);
      attacker.reputation += 2;
    } else {
      targetPlayer.defenseLevel = clamp(targetPlayer.defenseLevel + 1, 1, 10);
    }
    attackCooldownByUser.set(attacker.username, now);

    const result = {
      attacker: attacker.username,
      attackerId: attacker.simulatedId,
      target: targetPlayer.username,
      targetId: targetPlayer.simulatedId,
      tool,
      success,
      severity,
      breachChance: Number(breachChance.toFixed(3)),
      timestamp: now,
      summary: success
        ? `${attacker.username} breached ${targetPlayer.username} using ${tool}.`
        : `${targetPlayer.username} blocked ${attacker.username}'s ${tool} attack.`
    };

    socket.emit('multiplayer:attack_result', result);
    io.to(targetSocketId).emit('multiplayer:attack_alert', result);
    io.to(attacker.roomId).emit('multiplayer:activity', result);
    emitRoomPresence(attacker.roomId);
  });

  socket.on('disconnect', () => {
    const player = playerSessions.get(socket.id);
    if (!player) return;
    usernameToSocketId.delete(player.username);
    leaveCurrentRoom(socket, player);
    playerSessions.delete(socket.id);
  });
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HackHilis server is running' });
});

// User routes
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email or username already exists' 
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password, // In production, hash this password
      level: 1,
      experience: 0,
      money: 10000
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ 
      message: 'Login successful', 
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        level: user.level,
        money: user.money
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Alliance routes
app.get('/api/alliances', async (req, res) => {
  try {
    const alliances = await Alliance.find().populate('members.userId', 'username level');
    res.json(alliances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/alliances', async (req, res) => {
  try {
    const { name, description, requirements, createdBy } = req.body;
    
    const alliance = new Alliance({
      name,
      description,
      requirements,
      createdBy,
      members: [{
        userId: createdBy,
        role: 'Leader'
      }]
    });

    await alliance.save();
    res.status(201).json({ message: 'Alliance created successfully', alliance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/alliances/:id/join', async (req, res) => {
  try {
    const { userId, username, level } = req.body;
    
    const alliance = await Alliance.findById(req.params.id);
    if (!alliance) {
      return res.status(404).json({ error: 'Alliance not found' });
    }

    // Check if user is already a member
    const existingMember = alliance.members.find(member => 
      member.userId.toString() === userId
    );
    
    if (existingMember) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    alliance.members.push({
      userId,
      username,
      level,
      role: 'Member'
    });

    await alliance.save();
    res.json({ message: 'Successfully joined alliance', alliance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Game state routes
app.put('/api/users/:id/gamestate', async (req, res) => {
  try {
    const userId = req.params.id;
    const gameState = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: gameState },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Game state updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`HackHilis server running on port ${PORT}`);
});




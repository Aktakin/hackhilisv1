const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`HackHilis server running on port ${PORT}`);
});




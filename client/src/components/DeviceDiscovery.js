import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import { FaSearch, FaWifi, FaBluetooth, FaNetworkWired, FaMobile, FaLaptop, FaTablet, FaCrosshairs, FaTerminal, FaUsers, FaGlobe, FaPlusCircle, FaSignInAlt } from 'react-icons/fa';
import { useGame } from '../context/GameContext';

const SIMULATED_ID_REGEX = /^SIM-\d{3}\.\d{3}\.\d{3}-(USR|PHN|LTP|TAB|TV|RTR|DEV)$/;
const isSafeSimulatedId = (ip) => SIMULATED_ID_REGEX.test(ip || '');

const DiscoveryContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
`;

const DiscoveryHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const DiscoveryTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const DiscoverySubtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
`;

const NetworkIntelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 25px;
`;

const IntelCard = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid #00ffff;
  border-radius: 12px;
  padding: 14px;
`;

const IntelTitle = styled.h3`
  color: #00ffff;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const IntelList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 180px;
  overflow-y: auto;
`;

const IntelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 0.85rem;
`;

const IntelText = styled.span`
  color: #00ff41;
`;

const IntelMeta = styled.span`
  color: #888;
`;

const MultiplayerControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;

const MultiplayerButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(45deg, #00ffff, #00a5c9)' : 'rgba(0, 255, 255, 0.12)'};
  border: 1px solid rgba(0, 255, 255, 0.6);
  color: ${props => props.primary ? '#001018' : '#00ffff'};
  border-radius: 8px;
  padding: 8px 10px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.75rem;
  cursor: pointer;
  font-weight: 700;
`;

const RoomCodeInput = styled.input`
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(0, 255, 255, 0.4);
  color: #00ffff;
  border-radius: 8px;
  padding: 8px 10px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  min-width: 150px;
  text-transform: uppercase;
`;

const PlayerActionButton = styled.button`
  background: linear-gradient(45deg, #ff0040, #cc0033);
  border: 0;
  border-radius: 6px;
  color: #fff;
  font-size: 0.72rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  padding: 6px 8px;
  cursor: pointer;
`;

const BotControlRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const BotToggle = styled.button`
  background: ${props => props.active ? 'linear-gradient(45deg, #00ff41, #00cc33)' : 'transparent'};
  border: 1px solid #00ff41;
  border-radius: 8px;
  color: ${props => props.active ? '#000' : '#00ff41'};
  font-family: 'Orbitron', sans-serif;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 8px 12px;
  cursor: pointer;
`;

const BotStat = styled.div`
  color: #00ff41;
  font-size: 0.85rem;
  margin-bottom: 6px;
`;

const ScanControls = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const ScanButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 10px;
  padding: 15px 30px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #00cc33, #00ff41);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
    transform: translateY(-2px);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const DevicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const DeviceCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid ${props => props.selected ? '#00ffff' : '#00ff41'};
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }

  ${props => props.selected && `
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.5);
  `}
`;

const DeviceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const DeviceIcon = styled.div`
  font-size: 2.5rem;
  color: #00ff41;
`;

const DeviceInfo = styled.div`
  flex: 1;
  margin-left: 15px;
`;

const DeviceName = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 5px;
`;

const DeviceType = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

const DeviceDetails = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #333;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const DetailLabel = styled.span`
  color: #888;
`;

const DetailValue = styled.span`
  color: #00ff41;
  font-weight: bold;
`;

const AttackButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff0040, #cc0033);
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #cc0033, #ff0040);
    box-shadow: 0 0 20px rgba(255, 0, 64, 0.5);
    transform: translateY(-2px);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusBadge = styled.div`
  background: ${props => 
    props.status === 'online' ? 'rgba(0, 255, 65, 0.2)' :
    props.status === 'vulnerable' ? 'rgba(255, 170, 0, 0.2)' :
    'rgba(255, 0, 64, 0.2)'
  };
  border: 1px solid ${props => 
    props.status === 'online' ? '#00ff41' :
    props.status === 'vulnerable' ? '#ffaa00' :
    '#ff0040'
  };
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.8rem;
  color: ${props => 
    props.status === 'online' ? '#00ff41' :
    props.status === 'vulnerable' ? '#ffaa00' :
    '#ff0040'
  };
  font-weight: bold;
`;

const DeviceDiscovery = ({ onDeviceSelected }) => {
  const TRAINING_TICK_MS = 5000;

  const { gameState } = useGame();
  const socketRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [onlineIps, setOnlineIps] = useState([]);
  const [simulationEnabled, setSimulationEnabled] = useState(false);
  const [botControls, setBotControls] = useState({
    autoAttack: false,
    autoDefense: false
  });
  const [botStats, setBotStats] = useState({
    attacksLaunched: 0,
    attacksBlocked: 0,
    successfulBreaches: 0
  });
  const [botActivity, setBotActivity] = useState([]);
  const [multiplayerPlayers, setMultiplayerPlayers] = useState([]);
  const [multiplayerRoom, setMultiplayerRoom] = useState({
    roomId: 'public-network',
    roomName: 'Public Network',
    roomType: 'public'
  });
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [multiplayerStatus, setMultiplayerStatus] = useState('Connecting...');
  const [multiplayerError, setMultiplayerError] = useState('');
  const [multiplayerLog, setMultiplayerLog] = useState([]);
  const [attackTool, setAttackTool] = useState('recon');

  const currentUser = gameState?.user || (() => {
    try {
      const saved = localStorage.getItem('hackhilis_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();
  const currentUsername = currentUser?.username || 'anonymous';

  const appendActivity = (entry) => {
    setBotActivity(prev => [entry, ...prev].slice(0, 10));
  };

  const appendMultiplayerLog = (entry) => {
    setMultiplayerLog(prev => [entry, ...prev].slice(0, 12));
  };

  const ensureDeviceIp = (device, index) => {
    if (device.ip) {
      return device.ip;
    }
    const suffixByType = {
      Phone: 'PHN',
      Laptop: 'LTP',
      Tablet: 'TAB',
      TV: 'TV',
      Router: 'RTR'
    };
    const suffix = suffixByType[device.type] || 'DEV';
    const segment = String((index + 37) % 255).padStart(3, '0');
    const subnet = String((index + 71) % 255).padStart(3, '0');
    const unique = String((index + 109) % 255).padStart(3, '0');
    return `SIM-${segment}.${subnet}.${unique}-${suffix}`;
  };

  const toSimulatedDeviceId = (device, index) => {
    const suffixByType = {
      Phone: 'PHN',
      Laptop: 'LTP',
      Tablet: 'TAB',
      TV: 'TV',
      Router: 'RTR'
    };
    const suffix = suffixByType[device.type] || 'DEV';
    const base = ensureDeviceIp(device, index);
    if (SIMULATED_ID_REGEX.test(base)) {
      return base;
    }
    const segment = String((index + 37) % 255).padStart(3, '0');
    const subnet = String((index + 71) % 255).padStart(3, '0');
    const unique = String((index + 109) % 255).padStart(3, '0');
    return `SIM-${segment}.${subnet}.${unique}-${suffix}`;
  };

  const scanForDevices = (type) => {
    setIsScanning(true);
    setDevices([]);

    setTimeout(() => {
      const discoveredDevices = [];

      if (type === 'all' || type === 'bluetooth') {
        discoveredDevices.push(
          {
            id: 'bt-1',
            name: 'iPhone 13 Pro',
            type: 'Phone',
            icon: FaMobile,
            mac: 'AA:BB:CC:DD:EE:01',
            os: 'iOS 16.5',
            security: 8,
            status: 'online',
            method: 'bluetooth',
            signal: -45,
            battery: 78,
            model: 'iPhone13,2'
          },
          {
            id: 'bt-2',
            name: 'Samsung Galaxy S21',
            type: 'Phone',
            icon: FaMobile,
            mac: 'AA:BB:CC:DD:EE:02',
            os: 'Android 12',
            security: 6,
            status: 'vulnerable',
            method: 'bluetooth',
            signal: -52,
            battery: 65,
            model: 'SM-G991B'
          },
          {
            id: 'bt-3',
            name: 'MacBook Pro',
            type: 'Laptop',
            icon: FaLaptop,
            mac: 'AA:BB:CC:DD:EE:03',
            os: 'macOS 13.0',
            security: 7,
            status: 'online',
            method: 'bluetooth',
            signal: -38,
            battery: 85,
            model: 'MacBookPro18,1'
          }
        );
      }

      if (type === 'all' || type === 'wifi') {
        discoveredDevices.push(
          {
            id: 'wifi-1',
            name: 'Unknown Device',
            type: 'Phone',
            icon: FaMobile,
            ip: '192.168.1.105',
            os: 'Android 11',
            security: 4,
            status: 'vulnerable',
            method: 'wifi',
            signal: -65,
            battery: null,
            model: 'Unknown'
          },
          {
            id: 'wifi-2',
            name: 'Smart TV',
            type: 'TV',
            icon: FaTablet,
            ip: '192.168.1.110',
            os: 'Android TV 10',
            security: 5,
            status: 'online',
            method: 'wifi',
            signal: -58,
            battery: null,
            model: 'TV-2022'
          }
        );
      }

      if (type === 'all' || type === 'network') {
        discoveredDevices.push(
          {
            id: 'net-1',
            name: 'Corporate Device',
            type: 'Phone',
            icon: FaMobile,
            ip: '10.0.0.45',
            os: 'Android 9',
            security: 3,
            status: 'vulnerable',
            method: 'network',
            signal: null,
            battery: 42,
            model: 'Pixel 3'
          }
        );
      }

      const withIps = discoveredDevices.map((device, index) => ({
        ...device,
        ip: toSimulatedDeviceId(device, index),
        underAttack: false
      }));

      setDevices(withIps);
      setIsScanning(false);
    }, 3000);
  };

  const handleAttack = (device) => {
    if (onDeviceSelected) {
      onDeviceSelected(device);
    }
  };

  const attackMultiplayerTarget = (target) => {
    if (!socketRef.current) return;
    if (!target?.username || target.username === currentUsername) return;
    socketRef.current.emit('multiplayer:attack_attempt', {
      targetUsername: target.username,
      tool: attackTool
    });
  };

  useEffect(() => {
    const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
    const socket = io(serverUrl, { transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    const registerPlayer = () => {
      socket.emit('multiplayer:register', {
        username: currentUsername,
        simulatedId: gameState.ipAddress,
        hackingSkill: gameState.skills?.hacking ?? 1,
        defenseLevel: gameState.phone?.securityLevel ?? 1,
        reputation: gameState.stats?.reputation ?? 0
      });
    };

    socket.on('connect', () => {
      setMultiplayerStatus('Connected');
      setMultiplayerError('');
      registerPlayer();
    });

    socket.on('disconnect', () => {
      setMultiplayerStatus('Disconnected');
    });

    socket.on('connect_error', (error) => {
      setMultiplayerStatus('Connection error');
      setMultiplayerError(error?.message || 'Unable to connect to multiplayer server.');
    });

    socket.on('multiplayer:registered', (payload) => {
      appendMultiplayerLog(`Linked as ${payload.username} (${payload.simulatedId})`);
    });

    socket.on('multiplayer:room_created', (payload) => {
      appendMultiplayerLog(`Private room created: ${payload.roomCode}`);
      setRoomCodeInput(payload.roomCode);
    });

    socket.on('multiplayer:room_joined', (payload) => {
      setMultiplayerRoom({
        roomId: payload.roomId,
        roomName: payload.roomName,
        roomType: payload.roomType
      });
      appendMultiplayerLog(`Joined ${payload.roomName} (${payload.roomId})`);
    });

    socket.on('multiplayer:presence', (payload) => {
      const safePlayers = (payload.players || []).filter(player => SIMULATED_ID_REGEX.test(player.simulatedId || ''));
      setMultiplayerPlayers(safePlayers);
    });

    socket.on('multiplayer:activity', (result) => {
      appendMultiplayerLog(result.summary);
    });

    socket.on('multiplayer:attack_result', (result) => {
      appendMultiplayerLog(result.success ? `Breach successful on ${result.target}` : `Attack blocked by ${result.target}`);
    });

    socket.on('multiplayer:attack_alert', (result) => {
      appendMultiplayerLog(`Alert: ${result.attacker} attempted to hack you via ${result.tool}`);
    });

    socket.on('multiplayer:error', (payload) => {
      const message = payload?.message || 'Multiplayer action failed.';
      setMultiplayerError(message);
      appendMultiplayerLog(`Error: ${message}`);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [currentUsername, gameState.ipAddress, gameState.skills?.hacking, gameState.phone?.securityLevel, gameState.stats?.reputation]);

  useEffect(() => {
    const activeDevices = devices
      .filter(device => device.status === 'online' || device.status === 'vulnerable')
      .map(device => ({
        id: device.id,
        name: device.name,
        ip: device.ip,
        status: device.status
      }));

    const playerIp = gameState.ipAddress
      ? [{ id: 'self', name: 'You', ip: gameState.ipAddress, status: 'online' }]
      : [];
    const multiplayerIps = multiplayerPlayers
      .filter(player => player.username !== currentUsername)
      .map(player => ({
        id: `mp-${player.username}`,
        name: `${player.username} (${multiplayerRoom.roomType})`,
        ip: player.simulatedId,
        status: player.status || 'online'
      }));
    setOnlineIps([...playerIp, ...multiplayerIps, ...activeDevices]);
  }, [devices, gameState.ipAddress, multiplayerPlayers, multiplayerRoom.roomType, currentUsername]);

  useEffect(() => {
    if (devices.length === 0) {
      return undefined;
    }

    const movementInterval = setInterval(() => {
      setDevices(prev => {
        if (prev.length === 0) {
          return prev;
        }

        const index = Math.floor(Math.random() * prev.length);
        const chosen = prev[index];
        if (!isSafeSimulatedId(chosen.ip)) {
          return prev;
        }
        const roll = Math.random();
        let nextStatus = chosen.status;

        if (roll > 0.75) {
          nextStatus = 'offline';
        } else if (roll > 0.45) {
          nextStatus = 'vulnerable';
        } else {
          nextStatus = 'online';
        }

        if (nextStatus !== chosen.status) {
          appendActivity(`Network: ${chosen.name} is now ${nextStatus.toUpperCase()} (${chosen.ip})`);
        }

        const updated = [...prev];
        updated[index] = {
          ...chosen,
          status: nextStatus
        };
        return updated;
      });
    }, TRAINING_TICK_MS);

    return () => clearInterval(movementInterval);
  }, [devices.length]);

  useEffect(() => {
    if (!simulationEnabled || devices.length === 0 || (!botControls.autoAttack && !botControls.autoDefense)) {
      return undefined;
    }

    const botInterval = setInterval(() => {
      setDevices(prev => {
        if (prev.length === 0) {
          return prev;
        }

        const updated = [...prev];
        const activeTargets = updated.filter(device => device.status !== 'offline' && isSafeSimulatedId(device.ip));
        if (activeTargets.length === 0) {
          return prev;
        }

        const target = activeTargets[Math.floor(Math.random() * activeTargets.length)];
        const targetIndex = updated.findIndex(device => device.id === target.id);
        if (targetIndex < 0) {
          return prev;
        }

        let nextTarget = { ...updated[targetIndex] };

        if (botControls.autoAttack) {
          nextTarget.underAttack = true;
          nextTarget.security = Math.max(1, nextTarget.security - 1);
          appendActivity(`Attack bot: probing ${nextTarget.name} at ${nextTarget.ip}`);
          setBotStats(prevStats => ({
            ...prevStats,
            attacksLaunched: prevStats.attacksLaunched + 1
          }));
        }

        if (botControls.autoDefense && nextTarget.underAttack) {
          const defenseSuccess = Math.random() > 0.25;
          if (defenseSuccess) {
            nextTarget.underAttack = false;
            nextTarget.security = Math.min(10, nextTarget.security + 1);
            nextTarget.status = 'online';
            appendActivity(`Defense bot: blocked attack on ${nextTarget.name} (${nextTarget.ip})`);
            setBotStats(prevStats => ({
              ...prevStats,
              attacksBlocked: prevStats.attacksBlocked + 1
            }));
          } else {
            nextTarget.status = 'vulnerable';
            appendActivity(`Defense bot: failed to secure ${nextTarget.name} (${nextTarget.ip})`);
            setBotStats(prevStats => ({
              ...prevStats,
              successfulBreaches: prevStats.successfulBreaches + 1
            }));
          }
        }

        updated[targetIndex] = nextTarget;
        return updated;
      });
    }, TRAINING_TICK_MS);

    return () => clearInterval(botInterval);
  }, [devices.length, botControls.autoAttack, botControls.autoDefense, simulationEnabled]);

  return (
    <DiscoveryContainer>
      <DiscoveryHeader>
        <DiscoveryTitle>Device Discovery</DiscoveryTitle>
        <DiscoverySubtitle>Scan for devices to attack</DiscoverySubtitle>
      </DiscoveryHeader>

      <NetworkIntelGrid>
        <IntelCard>
          <IntelTitle>Live Online IP Monitor</IntelTitle>
          <IntelList>
            {onlineIps.length === 0 && <IntelMeta>No online entities detected yet.</IntelMeta>}
            {onlineIps.map(entity => (
              <IntelRow key={entity.id}>
                <IntelText>{entity.name}</IntelText>
                <IntelMeta>{entity.ip} | {entity.status}</IntelMeta>
              </IntelRow>
            ))}
          </IntelList>
        </IntelCard>

        <IntelCard>
          <IntelTitle><FaUsers /> Multiplayer Network</IntelTitle>
          <IntelMeta style={{ display: 'block', marginBottom: '8px' }}>
            Status: {multiplayerStatus} | Room: {multiplayerRoom.roomName} ({multiplayerRoom.roomId})
          </IntelMeta>
          {multiplayerError && <IntelMeta style={{ display: 'block', color: '#ff7f9f', marginBottom: '8px' }}>{multiplayerError}</IntelMeta>}
          <MultiplayerControls>
            <MultiplayerButton
              primary
              onClick={() => socketRef.current?.emit('multiplayer:join_public')}
            >
              <FaGlobe /> Join Public
            </MultiplayerButton>
            <MultiplayerButton
              onClick={() => socketRef.current?.emit('multiplayer:create_room')}
            >
              <FaPlusCircle /> Create Room
            </MultiplayerButton>
            <RoomCodeInput
              value={roomCodeInput}
              onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
              placeholder="ROOM CODE"
            />
            <MultiplayerButton
              onClick={() => socketRef.current?.emit('multiplayer:join_room', { roomCode: roomCodeInput })}
            >
              <FaSignInAlt /> Join Room
            </MultiplayerButton>
          </MultiplayerControls>
          <MultiplayerControls>
            <IntelMeta>Attack Tool:</IntelMeta>
            <MultiplayerButton
              primary={attackTool === 'recon'}
              onClick={() => setAttackTool('recon')}
            >
              Recon
            </MultiplayerButton>
            <MultiplayerButton
              primary={attackTool === 'bruteforce'}
              onClick={() => setAttackTool('bruteforce')}
            >
              Brute
            </MultiplayerButton>
            <MultiplayerButton
              primary={attackTool === 'malware'}
              onClick={() => setAttackTool('malware')}
            >
              Malware
            </MultiplayerButton>
          </MultiplayerControls>
          <IntelList>
            {multiplayerPlayers.filter(player => player.username !== currentUsername).length === 0 && (
              <IntelMeta>No other players online in this network.</IntelMeta>
            )}
            {multiplayerPlayers
              .filter(player => player.username !== currentUsername)
              .map((player) => (
                <IntelRow key={`player-${player.username}`}>
                  <IntelText>{player.username}</IntelText>
                  <IntelMeta>{player.simulatedId} | DEF {player.defenseLevel}</IntelMeta>
                  <PlayerActionButton onClick={() => attackMultiplayerTarget(player)}>
                    Sim Attack
                  </PlayerActionButton>
                </IntelRow>
              ))}
          </IntelList>
          <IntelList style={{ marginTop: '8px' }}>
            {multiplayerLog.length === 0 && <IntelMeta>Multiplayer activity log will appear here.</IntelMeta>}
            {multiplayerLog.map((item, idx) => (
              <IntelRow key={`mplog-${idx}`}>
                <IntelText>{item}</IntelText>
              </IntelRow>
            ))}
          </IntelList>
        </IntelCard>

        <IntelCard>
          <IntelTitle>Autonomous Bot Operations</IntelTitle>
          <IntelMeta style={{ display: 'block', marginBottom: '10px' }}>
            Safe training mode only: local simulation, private IP ranges, no real network traffic.
          </IntelMeta>
          <BotControlRow>
            <BotToggle
              active={simulationEnabled}
              onClick={() => {
                const nextEnabled = !simulationEnabled;
                setSimulationEnabled(nextEnabled);
                if (!nextEnabled) {
                  setBotControls({ autoAttack: false, autoDefense: false });
                  setDevices(prev => prev.map(device => ({ ...device, underAttack: false })));
                  appendActivity('Safety: simulation disabled, all bot actions halted.');
                } else {
                  appendActivity('Safety: simulation enabled in guarded local mode.');
                }
              }}
            >
              {simulationEnabled ? 'SIMULATION ON' : 'SIMULATION OFF'}
            </BotToggle>
            <BotToggle
              active={botControls.autoAttack}
              onClick={() => simulationEnabled && setBotControls(prev => ({ ...prev, autoAttack: !prev.autoAttack }))}
              disabled={!simulationEnabled}
              style={!simulationEnabled ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
            >
              {botControls.autoAttack ? 'ATTACK BOT ON' : 'ATTACK BOT OFF'}
            </BotToggle>
            <BotToggle
              active={botControls.autoDefense}
              onClick={() => simulationEnabled && setBotControls(prev => ({ ...prev, autoDefense: !prev.autoDefense }))}
              disabled={!simulationEnabled}
              style={!simulationEnabled ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
            >
              {botControls.autoDefense ? 'DEFENSE BOT ON' : 'DEFENSE BOT OFF'}
            </BotToggle>
          </BotControlRow>
          <BotStat>Attacks launched: {botStats.attacksLaunched}</BotStat>
          <BotStat>Attacks blocked: {botStats.attacksBlocked}</BotStat>
          <BotStat>Successful breaches: {botStats.successfulBreaches}</BotStat>
          <IntelList>
            {botActivity.length === 0 && <IntelMeta>Bot activity log will appear here.</IntelMeta>}
            {botActivity.map((item, idx) => (
              <IntelRow key={`${item}-${idx}`}>
                <IntelText>{item}</IntelText>
              </IntelRow>
            ))}
          </IntelList>
        </IntelCard>
      </NetworkIntelGrid>

      <ScanControls>
        <ScanButton
          onClick={() => scanForDevices('all')}
          disabled={isScanning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSearch />
          Scan All
        </ScanButton>
        <ScanButton
          onClick={() => scanForDevices('bluetooth')}
          disabled={isScanning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBluetooth />
          Scan Bluetooth
        </ScanButton>
        <ScanButton
          onClick={() => scanForDevices('wifi')}
          disabled={isScanning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWifi />
          Scan WiFi
        </ScanButton>
        <ScanButton
          onClick={() => scanForDevices('network')}
          disabled={isScanning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaNetworkWired />
          Scan Network
        </ScanButton>
      </ScanControls>

      {isScanning && (
        <div style={{ textAlign: 'center', color: '#00ff41', marginBottom: '20px' }}>
          Scanning for devices...
        </div>
      )}

      {devices.length > 0 && (
        <DevicesGrid>
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              selected={selectedDevice?.id === device.id}
              onClick={() => setSelectedDevice(device)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DeviceHeader>
                <DeviceIcon as={device.icon} />
                <DeviceInfo>
                  <DeviceName>{device.name}</DeviceName>
                  <DeviceType>{device.type}</DeviceType>
                </DeviceInfo>
                <StatusBadge status={device.status}>
                  {device.status === 'online' ? 'Online' :
                   device.status === 'vulnerable' ? 'Vulnerable' : 'Offline'}
                </StatusBadge>
              </DeviceHeader>
              {device.underAttack && (
                <div style={{ color: '#ff0040', fontWeight: 'bold', marginBottom: '8px' }}>
                  Under active bot attack
                </div>
              )}

              <DeviceDetails>
                <DetailRow>
                  <DetailLabel>OS:</DetailLabel>
                  <DetailValue>{device.os}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Security Level:</DetailLabel>
                  <DetailValue>{device.security}/10</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Method:</DetailLabel>
                  <DetailValue>{device.method}</DetailValue>
                </DetailRow>
                {device.mac && (
                  <DetailRow>
                    <DetailLabel>MAC:</DetailLabel>
                    <DetailValue>{device.mac}</DetailValue>
                  </DetailRow>
                )}
                {device.ip && (
                  <DetailRow>
                    <DetailLabel>IP:</DetailLabel>
                    <DetailValue>{device.ip}</DetailValue>
                  </DetailRow>
                )}
                {device.signal && (
                  <DetailRow>
                    <DetailLabel>Signal:</DetailLabel>
                    <DetailValue>{device.signal}dBm</DetailValue>
                  </DetailRow>
                )}
                {device.battery !== null && (
                  <DetailRow>
                    <DetailLabel>Battery:</DetailLabel>
                    <DetailValue>{device.battery}%</DetailValue>
                  </DetailRow>
                )}
              </DeviceDetails>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <AttackButton
                  onClick={() => handleAttack(device)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ flex: 1 }}
                >
                  <FaCrosshairs />
                  Attack Device
                </AttackButton>
                <AttackButton
                  onClick={() => handleAttack(device, true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    flex: 1,
                    background: 'linear-gradient(45deg, #00ffff, #0099cc)',
                    border: 'none'
                  }}
                >
                  <FaTerminal />
                  Terminal Only
                </AttackButton>
              </div>
            </DeviceCard>
          ))}
        </DevicesGrid>
      )}

      {!isScanning && devices.length === 0 && (
        <div style={{ textAlign: 'center', color: '#888', padding: '40px' }}>
          No devices found. Click a scan button to discover devices.
        </div>
      )}
    </DiscoveryContainer>
  );
};

export default DeviceDiscovery;


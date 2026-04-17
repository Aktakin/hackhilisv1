import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  FaTerminal, 
  FaNetworkWired, 
  FaEye, 
  FaBomb, 
  FaUserSecret,
  FaShieldAlt,
  FaLock,
  FaUnlock,
  FaPlay,
  FaPause,
  FaStop,
  FaDownload,
  FaUpload,
  FaSearch,
  FaFilter,
  FaCog,
  FaChartLine,
  FaGlobe,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaBug,
  FaCode,
  FaDatabase,
  FaServer,
  FaWifi,
  FaEthernet,
  FaHdd,
  FaMemory,
  FaCpu,
  FaUser
} from 'react-icons/fa';
import NmapInterface from './tools/NmapInterface';
import WiresharkInterface from './tools/WiresharkInterface';
import MetasploitInterface from './tools/MetasploitInterface';
import WhoisInterface from './tools/WhoisInterface';
import SqlmapInterface from './tools/SqlmapInterface';
import OsintInterface from './tools/OsintInterface';
import GenericToolInterface from './tools/GenericToolInterface';

// Placeholder components - will be created
const DnsEnumInterface = GenericToolInterface;
const BurpSuiteInterface = GenericToolInterface;
const JohnInterface = GenericToolInterface;
const SocialEngInterface = GenericToolInterface;
const ReconNgInterface = GenericToolInterface;
const DdosInterface = GenericToolInterface;
const BruteForceInterface = GenericToolInterface;
const MitmInterface = GenericToolInterface;
const BackdoorInterface = GenericToolInterface;

const EnvironmentContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
`;

const EnvironmentHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const EnvironmentTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const EnvironmentSubtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
`;

const MainInterface = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 20px;
  height: calc(100vh - 200px);
`;

const NetworkPanel = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #00ff41;
`;

const PanelTitle = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlButton = styled.button`
  background: ${props => props.active ? '#00ff41' : 'transparent'};
  color: ${props => props.active ? '#000' : '#00ff41'};
  border: 2px solid #00ff41;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: #00ff41;
    color: #000;
  }
`;

const NetworkTraffic = styled.div`
  flex: 1;
  background: #000;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 15px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.8rem;
  overflow-y: auto;
  max-height: 400px;
`;

const TrafficLine = styled.div`
  color: ${props => {
    if (props.type === 'http') return '#00ff41';
    if (props.type === 'https') return '#00ffff';
    if (props.type === 'dns') return '#ffaa00';
    if (props.type === 'suspicious') return '#ff0040';
    if (props.type === 'user') return '#ffaa00';
    return '#888';
  }};
  margin-bottom: 5px;
  padding: 2px 0;
  border-bottom: 1px solid #222;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.type === 'user' ? 'rgba(255, 170, 0, 0.1)' : 'transparent'};
  border-left: ${props => props.type === 'user' ? '3px solid #ffaa00' : 'none'};
  padding-left: ${props => props.type === 'user' ? '8px' : '0'};
`;

const TrafficTime = styled.span`
  color: #666;
  margin-right: 10px;
  min-width: 80px;
`;

const TrafficSource = styled.span`
  color: #00ff41;
  margin-right: 10px;
  min-width: 120px;
`;

const TrafficDestination = styled.span`
  color: #00ffff;
  margin-right: 10px;
  min-width: 120px;
`;

const TrafficProtocol = styled.span`
  color: #ffaa00;
  margin-right: 10px;
  min-width: 60px;
`;

const TrafficSize = styled.span`
  color: #888;
  margin-right: 10px;
  min-width: 60px;
`;

const TrafficInfo = styled.span`
  color: #ccc;
  flex: 1;
`;

const ToolsPanel = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ToolCategory = styled.div`
  margin-bottom: 20px;
`;

const CategoryTitle = styled.h3`
  color: #00ff41;
  font-size: 1.1rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const ToolButton = styled.button`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00ff41;
  border-radius: 8px;
  padding: 12px;
  color: #00ff41;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;

  &:hover {
    background: rgba(0, 255, 65, 0.1);
    border-color: #00ffff;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ToolIcon = styled.div`
  font-size: 1.2rem;
`;

const ToolName = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
`;

const ToolDescription = styled.div`
  font-size: 0.7rem;
  color: #888;
  text-align: center;
`;

const TargetPanel = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  width: 700px;
  margin-left: 0;
  margin-right: auto;
`;

const TargetList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  gap: 15px;
  justify-content: start;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, 280px);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const TargetCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid #00ff41;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const TargetIcon = styled.div`
  font-size: 2rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-align: center;
`;

const TargetName = styled.h4`
  color: #00ff41;
  margin-bottom: 5px;
  text-align: center;
`;

const TargetInfo = styled.div`
  color: #888;
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 10px;
`;

const TargetVulnerabilities = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
`;

const VulnerabilityTag = styled.span`
  background: rgba(255, 0, 64, 0.2);
  color: #ff0040;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  border: 1px solid #ff0040;
`;

const AttackModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const AttackModalContent = styled.div`
  background: rgba(26, 26, 46, 0.95);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const AttackTitle = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 20px;
  text-align: center;
`;

const AttackForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #00ff41;
  font-weight: bold;
  font-size: 0.9rem;
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 10px;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const Select = styled.select`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 10px;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const TextArea = styled.textarea`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 10px;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
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

const CloseButton = styled.button`
  background: transparent;
  border: 2px solid #ff0040;
  border-radius: 8px;
  padding: 8px 16px;
  color: #ff0040;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 0, 64, 0.1);
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? '#00ff41' : '#666'};
  animation: ${props => props.active ? 'pulse 2s infinite' : 'none'};
`;

const StatusText = styled.span`
  color: #00ff41;
  font-weight: bold;
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const Environment = ({ user }) => {
  const { gameState, dispatch } = useGame();
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [showAttackModal, setShowAttackModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [networkTraffic, setNetworkTraffic] = useState([]);
  const [attackForm, setAttackForm] = useState({
    target: '',
    method: '',
    payload: '',
    intensity: 'medium'
  });

  const tools = {
    reconnaissance: [
      { id: 'nmap', name: 'Nmap', description: 'Network scanner', icon: FaSearch, cost: 0 },
      { id: 'wireshark', name: 'Wireshark', description: 'Packet analyzer', icon: FaEye, cost: 0 },
      { id: 'whois', name: 'Whois', description: 'Domain lookup', icon: FaGlobe, cost: 0 },
      { id: 'dnsenum', name: 'DNS Enum', description: 'DNS enumeration', icon: FaDatabase, cost: 0 }
    ],
    exploitation: [
      { id: 'metasploit', name: 'Metasploit', description: 'Exploit framework', icon: FaBomb, cost: 0 },
      { id: 'sqlmap', name: 'SQLMap', description: 'SQL injection', icon: FaDatabase, cost: 0 },
      { id: 'burpsuite', name: 'Burp Suite', description: 'Web app scanner', icon: FaBug, cost: 0 },
      { id: 'john', name: 'John the Ripper', description: 'Password cracker', icon: FaUnlock, cost: 0 }
    ],
    social: [
      { id: 'social_eng', name: 'Social Engineering', description: 'Manipulation tools', icon: FaUserSecret, cost: 0 },
      { id: 'osint', name: 'OSINT', description: 'Open source intel', icon: FaSearch, cost: 0 },
      { id: 'recon', name: 'Recon-ng', description: 'Reconnaissance', icon: FaEye, cost: 0 }
    ],
    attacks: [
      { id: 'ddos', name: 'DDoS Tool', description: 'Distributed denial', icon: FaBomb, cost: 0 },
      { id: 'bruteforce', name: 'Brute Force', description: 'Password attacks', icon: FaLock, cost: 0 },
      { id: 'mitm', name: 'Man-in-Middle', description: 'Intercept traffic', icon: FaNetworkWired, cost: 0 },
      { id: 'backdoor', name: 'Backdoor', description: 'Remote access', icon: FaCode, cost: 0 }
    ]
  };

  const targets = [
    {
      id: 1,
      name: 'Local Network',
      type: 'network',
      ip: '192.168.1.0/24',
      vulnerabilities: ['Weak WPA2', 'Default Passwords', 'Open Ports'],
      difficulty: 'Easy',
      reward: 500
    },
    {
      id: 2,
      name: 'Small Business',
      type: 'business',
      ip: '203.45.67.89',
      vulnerabilities: ['SQL Injection', 'XSS', 'Weak Auth'],
      difficulty: 'Medium',
      reward: 2000
    },
    {
      id: 3,
      name: 'Government Server',
      type: 'government',
      ip: '198.51.100.42',
      vulnerabilities: ['Zero-day', 'Privilege Escalation'],
      difficulty: 'Hard',
      reward: 10000
    },
    {
      id: 4,
      name: 'Banking System',
      type: 'financial',
      ip: '203.0.113.15',
      vulnerabilities: ['Advanced Persistent Threat'],
      difficulty: 'Expert',
      reward: 25000
    },
    {
      id: 5,
      name: `Player: ${gameState.user?.username || 'Unknown'}`,
      type: 'player',
      ip: gameState.ipAddress || '192.168.1.1',
      vulnerabilities: ['Potential Backdoor', 'Weak Security', 'Social Engineering'],
      difficulty: 'Medium',
      reward: 1500,
      isPlayer: true
    }
  ];

  // Generate realistic network traffic
  useEffect(() => {
    if (isCapturing) {
      const interval = setInterval(() => {
        const newTraffic = generateNetworkTraffic();
        setNetworkTraffic(prev => [newTraffic, ...prev.slice(0, 49)]);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCapturing]);

  const generateNetworkTraffic = () => {
    const protocols = ['HTTP', 'HTTPS', 'DNS', 'SSH', 'FTP', 'SMTP'];
    const userIP = gameState.ipAddress || '192.168.1.1';
    const sources = ['192.168.1.10', '192.168.1.15', '10.0.0.5', '172.16.0.20', userIP];
    const destinations = ['8.8.8.8', '1.1.1.1', 'google.com', 'facebook.com', 'amazon.com', userIP];
    const sizes = ['64', '128', '256', '512', '1024', '2048'];
    
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const destination = destinations[Math.floor(Math.random() * destinations.length)];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    
    let type = 'normal';
    if (protocol === 'HTTP') type = 'http';
    if (protocol === 'HTTPS') type = 'https';
    if (protocol === 'DNS') type = 'dns';
    if (Math.random() < 0.1) type = 'suspicious';
    
    // Mark traffic involving the user's IP
    const isUserTraffic = source === userIP || destination === userIP;

    return {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      source,
      destination,
      protocol,
      size,
      type: isUserTraffic ? 'user' : type,
      info: `${protocol} request from ${source} to ${destination}${isUserTraffic ? ' (YOUR TRAFFIC)' : ''}`
    };
  };

  const startCapture = () => {
    setIsCapturing(true);
    setNetworkTraffic([]);
  };

  const stopCapture = () => {
    setIsCapturing(false);
  };

  const selectTool = (tool) => {
    // All tools are free now
    setSelectedTool(tool);
    setShowAttackModal(true);
  };

  const executeAttack = (e) => {
    e.preventDefault();
    // Simulate attack execution
    console.log('Executing attack:', attackForm);
    setShowAttackModal(false);
    setAttackForm({ target: '', method: '', payload: '', intensity: 'medium' });
  };

  const canUseTool = (tool) => {
    return gameState.money >= tool.cost; // All tools are free now
  };

  const renderToolInterface = () => {
    if (!selectedTool) return null;

    switch (selectedTool.id) {
      case 'nmap':
        return <NmapInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
      case 'wireshark':
        return <WiresharkInterface tool={selectedTool} onClose={() => setShowAttackModal(false)} />;
      case 'whois':
        return <WhoisInterface tool={selectedTool} onClose={() => setShowAttackModal(false)} />;
      case 'dnsenum':
        return <DnsEnumInterface tool={selectedTool} onClose={() => setShowAttackModal(false)} />;
      case 'metasploit':
        return <MetasploitInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
      case 'sqlmap':
        return <SqlmapInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
      case 'burpsuite':
        return <BurpSuiteInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
      case 'john':
        return <JohnInterface tool={selectedTool} onClose={() => setShowAttackModal(false)} />;
      case 'social_eng':
        return <SocialEngInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
      case 'osint':
        return <OsintInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
      case 'recon':
        return <ReconNgInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
      case 'ddos':
        return <DdosInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
      case 'bruteforce':
        return <BruteForceInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
      case 'mitm':
        return <MitmInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
      case 'backdoor':
        return <BackdoorInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
      default:
        return <GenericToolInterface tool={selectedTool} targets={targets} onClose={() => setShowAttackModal(false)} />;
    }
  };

  return (
    <EnvironmentContainer>
      <EnvironmentHeader>
        <EnvironmentTitle>ENVIRONMENT</EnvironmentTitle>
        <EnvironmentSubtitle>
          Network analysis and penetration testing interface
        </EnvironmentSubtitle>
      </EnvironmentHeader>

      <MainInterface>
        <NetworkPanel>
          <PanelHeader>
            <PanelTitle>
              <FaNetworkWired />
              Network Traffic Monitor
            </PanelTitle>
            <ControlButtons>
              <ControlButton 
                active={isCapturing} 
                onClick={isCapturing ? stopCapture : startCapture}
              >
                {isCapturing ? <FaStop /> : <FaPlay />}
                {isCapturing ? 'Stop' : 'Start'} Capture
              </ControlButton>
              <ControlButton>
                <FaFilter />
                Filter
              </ControlButton>
              <ControlButton>
                <FaCog />
                Settings
              </ControlButton>
            </ControlButtons>
          </PanelHeader>

          <StatusIndicator>
            <StatusDot active={isCapturing} />
            <StatusText>
              {isCapturing ? 'Capturing network traffic...' : 'Ready to capture'}
            </StatusText>
          </StatusIndicator>

          <NetworkTraffic>
            {networkTraffic.length === 0 ? (
              <div style={{ color: '#666', textAlign: 'center', marginTop: '50px' }}>
                {isCapturing ? 'Capturing traffic...' : 'Click Start Capture to begin monitoring'}
              </div>
            ) : (
              networkTraffic.map((traffic) => (
                <TrafficLine key={traffic.id} type={traffic.type}>
                  <TrafficTime>{traffic.time}</TrafficTime>
                  <TrafficSource>{traffic.source}</TrafficSource>
                  <TrafficDestination>{traffic.destination}</TrafficDestination>
                  <TrafficProtocol>{traffic.protocol}</TrafficProtocol>
                  <TrafficSize>{traffic.size}B</TrafficSize>
                  <TrafficInfo>{traffic.info}</TrafficInfo>
                </TrafficLine>
              ))
            )}
          </NetworkTraffic>
        </NetworkPanel>

        <ToolsPanel>
          <PanelHeader>
            <PanelTitle>
              <FaTerminal />
              Hacking Tools
            </PanelTitle>
          </PanelHeader>

          {Object.entries(tools).map(([category, toolList]) => (
            <ToolCategory key={category}>
              <CategoryTitle>
                {category === 'reconnaissance' && <FaEye />}
                {category === 'exploitation' && <FaBomb />}
                {category === 'social' && <FaUserSecret />}
                {category === 'attacks' && <FaShieldAlt />}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </CategoryTitle>
              <ToolGrid>
                {toolList.map((tool) => (
                  <ToolButton
                    key={tool.id}
                    onClick={() => selectTool(tool)}
                    disabled={!canUseTool(tool)}
                  >
                    <ToolIcon as={tool.icon} />
                    <ToolName>{tool.name}</ToolName>
                    <ToolDescription>
                      {tool.description}
                      <br />
                      Cost: ${tool.cost}
                    </ToolDescription>
                  </ToolButton>
                ))}
              </ToolGrid>
            </ToolCategory>
          ))}
        </ToolsPanel>
      </MainInterface>

      <TargetPanel>
        <PanelHeader>
          <PanelTitle>
            <FaGlobe />
            Available Targets
          </PanelTitle>
        </PanelHeader>
        <TargetList>
          {targets.map((target) => (
            <TargetCard
              key={target.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTarget(target)}
            >
              <TargetIcon>
                {target.type === 'network' && <FaWifi />}
                {target.type === 'business' && <FaServer />}
                {target.type === 'government' && <FaShieldAlt />}
                {target.type === 'financial' && <FaDatabase />}
                {target.type === 'player' && <FaUser />}
              </TargetIcon>
              <TargetName>{target.name}</TargetName>
              <TargetInfo>
                {target.ip} • {target.difficulty}
                <br />
                Reward: ${target.reward.toLocaleString()}
              </TargetInfo>
              <TargetVulnerabilities>
                {target.vulnerabilities.map((vuln, index) => (
                  <VulnerabilityTag key={index}>{vuln}</VulnerabilityTag>
                ))}
              </TargetVulnerabilities>
            </TargetCard>
          ))}
        </TargetList>
      </TargetPanel>

      <AnimatePresence>
        {showAttackModal && selectedTool && renderToolInterface()}
      </AnimatePresence>
    </EnvironmentContainer>
  );
};

export default Environment;

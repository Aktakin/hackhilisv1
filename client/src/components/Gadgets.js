import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import LaptopInterface from './LaptopInterface';
import RouterInterface from './RouterInterface';
import LaptopLogin from './LaptopLogin';
import LaptopHomeScreen from './LaptopHomeScreen';
import { 
  FaLaptop, 
  FaWifi, 
  FaMobile, 
  FaCog, 
  FaPowerOff,
  FaShieldAlt,
  FaTerminal,
  FaNetworkWired,
  FaBatteryFull,
  FaBatteryThreeQuarters,
  FaBatteryHalf,
  FaBatteryQuarter,
  FaBatteryEmpty,
  FaSignal,
  FaWifi as FaWifiIcon,
  FaEthernet,
  FaHdd,
  FaMemory,
  FaCpu,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaStop,
  FaDownload,
  FaUpload,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
  FaLock,
  FaUnlock,
  FaEye,
  FaEyeSlash,
  FaDollarSign
} from 'react-icons/fa';

const GadgetsContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
`;

const GadgetsHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const GadgetsTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const GadgetsSubtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
`;

const GadgetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const GadgetCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const GadgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const GadgetIcon = styled.div`
  font-size: 2.5rem;
  color: #00ff41;
  margin-right: 15px;
`;

const GadgetInfo = styled.div`
  flex: 1;
`;

const GadgetName = styled.h3`
  color: #00ff41;
  font-size: 1.3rem;
  margin-bottom: 5px;
`;

const GadgetModel = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const GadgetStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: ${props => props.online ? '#00ff41' : '#ff0040'};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.online ? '#00ff41' : '#ff0040'};
  animation: ${props => props.online ? 'pulse 2s infinite' : 'none'};
`;

const GadgetStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 15px;
`;

const StatItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
`;

const StatValue = styled.div`
  color: #00ff41;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 0.8rem;
`;

const ControlButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

const ControlButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(45deg, #00ff41, #00cc33)' : 'transparent'};
  color: ${props => props.primary ? '#000' : '#00ff41'};
  border: 2px solid #00ff41;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: ${props => props.primary ? 'linear-gradient(45deg, #00cc33, #00ff41)' : '#00ff41'};
    color: ${props => props.primary ? '#000' : '#000'};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ConfigurationModal = styled(motion.div)`
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

const ModalContent = styled.div`
  background: rgba(26, 26, 46, 0.95);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #00ff41;
`;

const ModalTitle = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 2px solid #ff0040;
  border-radius: 8px;
  padding: 8px 12px;
  color: #ff0040;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 0, 64, 0.1);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #00ff41;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 12px;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 12px;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 12px;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
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
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #888;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: #666;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h3`
  color: #00ff41;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const EmptyDescription = styled.p`
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const Gadgets = ({ user }) => {
  const { gameState, dispatch } = useGame();
  const [selectedGadget, setSelectedGadget] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configForm, setConfigForm] = useState({});
  const [showDeviceInterface, setShowDeviceInterface] = useState(false);
  const [showLaptopLogin, setShowLaptopLogin] = useState(false);
  const [showLaptopHome, setShowLaptopHome] = useState(false);

  // Gadget data based on purchased items
  const gadgets = [
    {
      id: 'laptop',
      name: gameState.equipment.laptop?.name || 'Laptop',
      model: gameState.equipment.laptop?.name || 'Not Purchased',
      type: 'laptop',
      icon: FaLaptop,
      online: gameState.equipment.laptop ? gameState.devices.laptop.powered : false,
      purchased: !!gameState.equipment.laptop,
      risk: gameState.equipment.laptop?.risk,
      illegal: gameState.equipment.laptop?.illegal,
      price: gameState.equipment.laptop?.price || 0,
      stats: {
        cpu: gameState.equipment.laptop?.name === 'Quantum Laptop' ? 'Quantum CPU' : 
             gameState.equipment.laptop?.name === 'Gaming Laptop' ? 'Intel i7-12700H' : 
             gameState.equipment.laptop?.name === 'Basic Laptop' ? 'Intel i5-8400H' :
             gameState.equipment.laptop?.name === 'Used Gaming Laptop' ? 'Intel i7-12700H (Used)' :
             gameState.equipment.laptop?.name === 'Salvaged Quantum Laptop' ? 'Quantum CPU (Damaged)' :
             gameState.equipment.laptop?.name === 'Stolen Gaming Laptop' ? 'Intel i7-12700H (Stolen)' :
             gameState.equipment.laptop?.name === 'Government Laptop' ? 'Classified CPU' :
             'Intel i5-8400H',
        ram: gameState.equipment.laptop?.name === 'Quantum Laptop' ? '64GB DDR5' : 
             gameState.equipment.laptop?.name === 'Gaming Laptop' ? '32GB DDR4' : 
             gameState.equipment.laptop?.name === 'Basic Laptop' ? '16GB DDR4' :
             gameState.equipment.laptop?.name === 'Used Gaming Laptop' ? '32GB DDR4 (Used)' :
             gameState.equipment.laptop?.name === 'Salvaged Quantum Laptop' ? '64GB DDR5 (Damaged)' :
             gameState.equipment.laptop?.name === 'Stolen Gaming Laptop' ? '32GB DDR4 (Stolen)' :
             gameState.equipment.laptop?.name === 'Government Laptop' ? '128GB DDR5 (Classified)' :
             '16GB DDR4',
        storage: gameState.equipment.laptop?.name === 'Quantum Laptop' ? '2TB NVMe SSD' : 
                gameState.equipment.laptop?.name === 'Gaming Laptop' ? '1TB NVMe SSD' : 
                gameState.equipment.laptop?.name === 'Basic Laptop' ? '512GB SSD' :
                gameState.equipment.laptop?.name === 'Used Gaming Laptop' ? '1TB NVMe SSD (Used)' :
                gameState.equipment.laptop?.name === 'Salvaged Quantum Laptop' ? '2TB NVMe SSD (Damaged)' :
                gameState.equipment.laptop?.name === 'Stolen Gaming Laptop' ? '1TB NVMe SSD (Stolen)' :
                gameState.equipment.laptop?.name === 'Government Laptop' ? '4TB NVMe SSD (Classified)' :
                '512GB SSD',
        gpu: gameState.equipment.laptop?.name === 'Quantum Laptop' ? 'RTX 4090' : 
             gameState.equipment.laptop?.name === 'Gaming Laptop' ? 'RTX 3070' : 
             gameState.equipment.laptop?.name === 'Basic Laptop' ? 'GTX 1660' :
             gameState.equipment.laptop?.name === 'Used Gaming Laptop' ? 'RTX 3070 (Used)' :
             gameState.equipment.laptop?.name === 'Salvaged Quantum Laptop' ? 'RTX 4090 (Damaged)' :
             gameState.equipment.laptop?.name === 'Stolen Gaming Laptop' ? 'RTX 3070 (Stolen)' :
             gameState.equipment.laptop?.name === 'Government Laptop' ? 'RTX 5090 (Classified)' :
             'GTX 1660',
        battery: gameState.devices.laptop.battery
      },
      config: {
        hostname: 'hacker-laptop',
        ip: gameState.ipAddress,
        os: 'Kali Linux',
        security: gameState.equipment.laptop?.illegal ? 'Compromised' : 'High',
        vpn: 'Connected',
        firewall: 'Enabled'
      }
    },
    {
      id: 'router',
      name: gameState.equipment.router?.name || 'Router',
      model: gameState.equipment.router?.name || 'Not Purchased',
      type: 'router',
      icon: FaWifi,
      online: gameState.equipment.router ? gameState.devices.router.powered : false,
      purchased: !!gameState.equipment.router,
      risk: gameState.equipment.router?.risk,
      illegal: gameState.equipment.router?.illegal,
      price: gameState.equipment.router?.price || 0,
      stats: {
        speed: gameState.equipment.router?.name === 'Quantum Router' ? '10Gbps' : 
               gameState.equipment.router?.name === 'Enterprise Router' ? '1Gbps' : 
               gameState.equipment.router?.name === 'Basic Router' ? '100Mbps' :
               gameState.equipment.router?.name === 'Second-hand Router' ? '1Gbps (Used)' :
               gameState.equipment.router?.name === 'Hacked Router' ? '1Gbps (Compromised)' :
               gameState.equipment.router?.name === 'Quantum Router Prototype' ? '10Gbps (Prototype)' :
               '100Mbps',
        range: gameState.equipment.router?.name === 'Quantum Router' ? '500m' : 
               gameState.equipment.router?.name === 'Enterprise Router' ? '100m' : 
               gameState.equipment.router?.name === 'Basic Router' ? '50m' :
               gameState.equipment.router?.name === 'Second-hand Router' ? '100m (Used)' :
               gameState.equipment.router?.name === 'Hacked Router' ? '100m (Compromised)' :
               gameState.equipment.router?.name === 'Quantum Router Prototype' ? '500m (Prototype)' :
               '50m',
        devices: gameState.devices.router.connectedDevices?.length || 0,
        security: gameState.equipment.router?.illegal ? 'Compromised' : 'WPA3'
      },
      config: {
        ssid: gameState.devices.router.ssid || 'HackHilis-Net',
        password: gameState.devices.router.password || 'Not Set',
        encryption: gameState.equipment.router?.illegal ? 'WEP (Compromised)' : 'WPA3',
        channel: 'Auto',
        bandwidth: gameState.equipment.router?.name === 'Quantum Router' ? '10Gbps' : 
                  gameState.equipment.router?.name === 'Enterprise Router' ? '1Gbps' : 
                  gameState.equipment.router?.name === 'Basic Router' ? '100Mbps' :
                  gameState.equipment.router?.name === 'Second-hand Router' ? '1Gbps (Used)' :
                  gameState.equipment.router?.name === 'Hacked Router' ? '1Gbps (Compromised)' :
                  gameState.equipment.router?.name === 'Quantum Router Prototype' ? '10Gbps (Prototype)' :
                  '100Mbps',
        firewall: gameState.equipment.router?.illegal ? 'Disabled (Compromised)' : 'Enabled'
      }
    },
    {
      id: 'phone',
      name: gameState.phone.model || 'Phone',
      model: gameState.phone.model || 'Not Purchased',
      type: 'phone',
      icon: FaMobile,
      online: gameState.phone.owned && gameState.devices.phone.powered,
      purchased: gameState.phone.owned,
      price: gameState.phone.owned ? 500 : 0, // Default phone price
      stats: {
        battery: gameState.devices.phone.battery,
        storage: gameState.phone.model === 'Quantum Phone' ? '1TB' : 
                gameState.phone.model === 'iPhone Pro' ? '256GB' : 
                gameState.phone.model === 'Basic Phone' ? '128GB' :
                gameState.phone.model === 'Refurbished iPhone' ? '256GB (Refurbished)' :
                gameState.phone.model === 'Counterfeit iPhone' ? '128GB (Fake)' :
                '128GB',
        security: gameState.phone.model === 'Counterfeit iPhone' ? 1 : gameState.phone.securityLevel,
        os: 'iOS 16'
      },
      config: {
        deviceName: 'HackerPhone',
        icloud: 'Connected',
        findMy: 'Enabled',
        passcode: '6-digit',
        faceId: 'Enabled',
        location: 'Enabled'
      }
    }
  ];

  // Debug logging
  console.log('Gadgets - Current gameState:', gameState);
  console.log('Gadgets - Equipment state:', gameState.equipment);
  console.log('Gadgets - Laptop equipment:', gameState.equipment.laptop);
  console.log('Gadgets - User:', user);
  console.log('Gadgets - Purchased gadgets:', gadgets.filter(gadget => gadget.purchased));

  // Track equipment changes
  useEffect(() => {
    console.log('Gadgets - Equipment state changed:', gameState.equipment);
    console.log('Gadgets - Laptop equipment changed:', gameState.equipment.laptop);
  }, [gameState.equipment]);

  const openConfig = (gadget) => {
    setSelectedGadget(gadget);
    setConfigForm(gadget.config);
    setShowConfigModal(true);
  };

  const saveConfig = () => {
    // Update gadget configuration
    console.log('Saving configuration:', configForm);
    setShowConfigModal(false);
  };

  const togglePower = (gadgetId) => {
    const isPoweringOn = !gameState.devices[gadgetId].powered;
    
    dispatch({
      type: 'POWER_DEVICE',
      payload: {
        device: gadgetId,
        powered: isPoweringOn
      }
    });

    // If powering on laptop, show login screen
    if (gadgetId === 'laptop' && isPoweringOn) {
      setShowLaptopLogin(true);
    }
  };

  const openDeviceInterface = (gadget) => {
    setSelectedGadget(gadget);
    setShowDeviceInterface(true);
  };

  const handleLaptopLogin = () => {
    setShowLaptopLogin(false);
    setShowLaptopHome(true);
  };

  const handleLaptopLogout = () => {
    setShowLaptopHome(false);
    dispatch({ type: 'POWER_DEVICE', payload: { device: 'laptop', powered: false } });
  };

  const sellDevice = (gadget) => {
    const sellPrice = Math.floor(gadget.price * 0.6); // 60% of original price
    const confirmMessage = `Are you sure you want to sell your ${gadget.name}?\n\n` +
      `You will receive $${sellPrice.toLocaleString()} (60% of original price).\n\n` +
      `This action cannot be undone.`;
    
    if (window.confirm(confirmMessage)) {
      dispatch({
        type: 'SELL_EQUIPMENT',
        payload: {
          type: gadget.id,
          item: { ...gadget, price: gadget.price }
        }
      });
      alert(`Device sold! You received $${sellPrice.toLocaleString()}.`);
    }
  };

  const getBatteryIcon = (level) => {
    if (level > 75) return FaBatteryFull;
    if (level > 50) return FaBatteryThreeQuarters;
    if (level > 25) return FaBatteryHalf;
    if (level > 10) return FaBatteryQuarter;
    return FaBatteryEmpty;
  };

  const purchasedGadgets = gadgets.filter(gadget => gadget.purchased);

  return (
    <GadgetsContainer>
      <GadgetsHeader>
        <GadgetsTitle>Gadgets & Equipment</GadgetsTitle>
        <GadgetsSubtitle>
          Configure and manage your hacking equipment
        </GadgetsSubtitle>
      </GadgetsHeader>

      {gadgets.filter(gadget => gadget.purchased).length === 0 ? (
        <EmptyState>
          <EmptyIcon as={FaLaptop} />
          <EmptyTitle>No Gadgets Purchased</EmptyTitle>
          <EmptyDescription>
            Visit the store to purchase laptops, routers, and other equipment
          </EmptyDescription>
          <Button onClick={() => window.location.href = '/store'}>
            Go to Store
          </Button>
        </EmptyState>
      ) : (
        <GadgetsGrid>
          {gadgets.map((gadget) => (
            <GadgetCard
              key={gadget.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GadgetHeader>
                <GadgetIcon as={gadget.icon} />
                <GadgetInfo>
                  <GadgetName>{gadget.name}</GadgetName>
                  <GadgetModel>{gadget.model}</GadgetModel>
                  <GadgetStatus online={gadget.online}>
                    <StatusDot online={gadget.online} />
                    {gadget.online ? 'Online' : 'Offline'}
                  </GadgetStatus>
                </GadgetInfo>
              </GadgetHeader>

              {gadget.risk && (
                <div style={{
                  background: gadget.risk === 'extreme' ? 'rgba(255, 0, 64, 0.1)' : 
                             gadget.risk === 'high' ? 'rgba(255, 102, 0, 0.1)' :
                             'rgba(255, 170, 0, 0.1)',
                  border: `1px solid ${gadget.risk === 'extreme' ? '#ff0040' : 
                                     gadget.risk === 'high' ? '#ff6600' : '#ffaa00'}`,
                  borderRadius: '5px',
                  padding: '8px',
                  marginBottom: '10px',
                  color: gadget.risk === 'extreme' ? '#ff0040' : 
                         gadget.risk === 'high' ? '#ff6600' : '#ffaa00',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <FaExclamationTriangle />
                  {gadget.illegal ? 'ILLEGAL DEVICE - High Security Risk!' : 
                   `Risk Level: ${gadget.risk.toUpperCase()}`}
                </div>
              )}

              <GadgetStats>
                {Object.entries(gadget.stats).map(([key, value]) => (
                  <StatItem key={key}>
                    <StatValue>
                      {key === 'battery' && gadget.type === 'phone' ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                          {React.createElement(getBatteryIcon(value))}
                          {value}%
                        </div>
                      ) : (
                        value
                      )}
                    </StatValue>
                    <StatLabel>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </StatLabel>
                  </StatItem>
                ))}
              </GadgetStats>

              {gadget.purchased ? (
                <ControlButtons>
                  <ControlButton
                    onClick={() => togglePower(gadget.id)}
                  >
                    <FaPowerOff />
                    {gadget.online ? 'Power Off' : 'Power On'}
                  </ControlButton>
                  <ControlButton
                    primary
                    onClick={() => openDeviceInterface(gadget)}
                  >
                    <FaCog />
                    Interface
                  </ControlButton>
                  <ControlButton
                    onClick={() => openConfig(gadget)}
                  >
                    <FaCog />
                    Configure
                  </ControlButton>
                  <ControlButton
                    onClick={() => sellDevice(gadget)}
                    style={{ 
                      background: 'linear-gradient(45deg, #ff0040, #cc0033)',
                      color: '#fff',
                      borderColor: '#ff0040'
                    }}
                  >
                    <FaDollarSign />
                    Sell Device (${Math.floor(gadget.price * 0.6).toLocaleString()})
                  </ControlButton>
                </ControlButtons>
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '20px', 
                  color: '#888',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '8px',
                  marginTop: '15px'
                }}>
                  <p style={{ marginBottom: '15px' }}>This device is not purchased yet.</p>
                  <button
                    onClick={() => window.location.href = '/store'}
                    style={{
                      background: 'linear-gradient(45deg, #00ff41, #00cc33)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      color: '#000',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Buy in Store
                  </button>
                </div>
              )}
            </GadgetCard>
          ))}
        </GadgetsGrid>
      )}

      <AnimatePresence>
        {showConfigModal && selectedGadget && (
          <ConfigurationModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent>
              <ModalHeader>
                <ModalTitle>
                  Configure {selectedGadget.name}
                </ModalTitle>
                <CloseButton onClick={() => setShowConfigModal(false)}>
                  <FaTimes />
                </CloseButton>
              </ModalHeader>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {Object.entries(configForm).map(([key, value]) => (
                  <FormGroup key={key}>
                    <Label>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </Label>
                    {key === 'password' || key === 'passcode' ? (
                      <Input
                        type="password"
                        value={value}
                        onChange={(e) => setConfigForm({...configForm, [key]: e.target.value})}
                      />
                    ) : key === 'description' || key === 'notes' ? (
                      <TextArea
                        value={value}
                        onChange={(e) => setConfigForm({...configForm, [key]: e.target.value})}
                      />
                    ) : key === 'encryption' || key === 'channel' || key === 'bandwidth' ? (
                      <Select
                        value={value}
                        onChange={(e) => setConfigForm({...configForm, [key]: e.target.value})}
                      >
                        {key === 'encryption' && (
                          <>
                            <option value="WPA3">WPA3</option>
                            <option value="WPA2">WPA2</option>
                            <option value="WEP">WEP</option>
                          </>
                        )}
                        {key === 'channel' && (
                          <>
                            <option value="Auto">Auto</option>
                            <option value="1">Channel 1</option>
                            <option value="6">Channel 6</option>
                            <option value="11">Channel 11</option>
                          </>
                        )}
                        {key === 'bandwidth' && (
                          <>
                            <option value="1Gbps">1Gbps</option>
                            <option value="100Mbps">100Mbps</option>
                            <option value="10Mbps">10Mbps</option>
                          </>
                        )}
                      </Select>
                    ) : (
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => setConfigForm({...configForm, [key]: e.target.value})}
                      />
                    )}
                  </FormGroup>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
                <ControlButton onClick={() => setShowConfigModal(false)}>
                  Cancel
                </ControlButton>
                <Button onClick={saveConfig}>
                  <FaSave />
                  Save Configuration
                </Button>
              </div>
            </ModalContent>
          </ConfigurationModal>
        )}
      </AnimatePresence>

          <AnimatePresence>
            {showDeviceInterface && selectedGadget && (
              <ConfigurationModal
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ModalContent style={{ maxWidth: '1000px', width: '95%' }}>
                  <ModalHeader>
                    <ModalTitle>
                      {selectedGadget.name} Interface
                    </ModalTitle>
                    <CloseButton onClick={() => setShowDeviceInterface(false)}>
                      <FaTimes />
                    </CloseButton>
                  </ModalHeader>

                  {selectedGadget.type === 'laptop' && (
                    <LaptopInterface device="laptop" />
                  )}

                  {selectedGadget.type === 'router' && (
                    <RouterInterface device="router" />
                  )}

                  {selectedGadget.type === 'phone' && (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                      <FaMobile style={{ fontSize: '3rem', marginBottom: '20px' }} />
                      <h4>Phone Interface</h4>
                      <p>Use the Phone page to access your phone interface</p>
                      <button
                        onClick={() => {
                          setShowDeviceInterface(false);
                          window.location.href = '/phone';
                        }}
                        style={{
                          background: 'linear-gradient(45deg, #00ff41, #00cc33)',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '12px 24px',
                          color: '#000',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          marginTop: '15px'
                        }}
                      >
                        Go to Phone
                      </button>
                    </div>
                  )}
                </ModalContent>
              </ConfigurationModal>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showLaptopLogin && (
              <LaptopLogin
                onLogin={handleLaptopLogin}
                onClose={() => setShowLaptopLogin(false)}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showLaptopHome && (
              <LaptopHomeScreen
                onLogout={handleLaptopLogout}
              />
            )}
          </AnimatePresence>
    </GadgetsContainer>
  );
};

export default Gadgets;

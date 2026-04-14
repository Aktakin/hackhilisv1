import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import LaptopLogin from './LaptopLogin';
import LaptopHomeScreen from './LaptopHomeScreen';
import { 
  FaLaptop, 
  FaPowerOff, 
  FaCog, 
  FaDollarSign, 
  FaExclamationTriangle,
  FaBatteryFull, 
  FaBatteryThreeQuarters, 
  FaBatteryHalf, 
  FaBatteryQuarter, 
  FaBatteryEmpty,
  FaWifi,
  FaTimesCircle,
  FaCheckCircle
} from 'react-icons/fa';

const LaptopManagerContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
`;

const LaptopManagerHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const LaptopManagerTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
`;

const LaptopManagerSubtitle = styled.p`
  color: #00ffff;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const LaptopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const LaptopCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 25px;
  position: relative;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const LaptopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LaptopInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LaptopIcon = styled.div`
  font-size: 2.5rem;
  color: #00ff41;
`;

const LaptopDetails = styled.div`
  color: #00ff41;
`;

const LaptopName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 5px;
  font-family: 'Orbitron', sans-serif;
`;

const LaptopModel = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const LaptopStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.online ? '#00ff41' : '#ff0040'};
  font-size: 0.9rem;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.online ? '#00ff41' : '#ff0040'};
  animation: ${props => props.online ? 'pulse' : 'none'} 2s infinite;
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const LaptopStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
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
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 0.8rem;
`;

const RiskWarning = styled.div`
  background: rgba(255, 0, 64, 0.1);
  border: 1px solid #ff0040;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  color: #ff0040;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ControlButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ControlButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(45deg, #00ff41, #00cc33)' : 'transparent'};
  color: ${props => props.primary ? '#000' : '#00ff41'};
  border: 2px solid #00ff41;
  border-radius: 8px;
  padding: 12px 20px;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${props => props.primary ? 'linear-gradient(45deg, #00cc33, #00ff41)' : 'rgba(0, 255, 65, 0.1)'};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 65, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SellButton = styled.button`
  background: linear-gradient(45deg, #ff0040, #cc0033);
  color: #fff;
  border: 2px solid #ff0040;
  border-radius: 8px;
  padding: 12px 20px;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(45deg, #cc0033, #990022);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 0, 64, 0.3);
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
  color: #888;
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const EmptyDescription = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 8px;
  padding: 15px 30px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #00cc33, #00ff41);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 65, 0.4);
  }
`;

const LaptopManager = ({ user }) => {
  const { gameState, dispatch } = useGame();
  const [showLaptopLogin, setShowLaptopLogin] = useState(false);
  const [showLaptopHome, setShowLaptopHome] = useState(false);
  const [selectedLaptop, setSelectedLaptop] = useState(null);

  // Debug logging
  console.log('LaptopManager - Current gameState:', gameState);
  console.log('LaptopManager - Equipment state:', gameState.equipment);
  console.log('LaptopManager - Laptop equipment:', gameState.equipment.laptop);
  console.log('LaptopManager - User:', user);


  const getBatteryIcon = (level) => {
    if (level > 75) return FaBatteryFull;
    if (level > 50) return FaBatteryThreeQuarters;
    if (level > 25) return FaBatteryHalf;
    if (level > 0) return FaBatteryQuarter;
    return FaBatteryEmpty;
  };

  const togglePower = (laptop) => {
    const isPoweringOn = !gameState.devices.laptop.powered;
    
    dispatch({
      type: 'POWER_DEVICE',
      payload: {
        device: 'laptop',
        powered: isPoweringOn
      }
    });

    if (isPoweringOn) {
      setSelectedLaptop(laptop);
      setShowLaptopLogin(true);
    }
  };

  const handleLaptopLogin = () => {
    setShowLaptopLogin(false);
    setShowLaptopHome(true);
  };

  const handleLaptopLogout = () => {
    setShowLaptopHome(false);
    dispatch({ type: 'POWER_DEVICE', payload: { device: 'laptop', powered: false } });
  };

  const sellLaptop = (laptop) => {
    const sellPrice = Math.floor(laptop.price * 0.6);
    const confirmMessage = `Are you sure you want to sell your ${laptop.name}?\n\n` +
      `You will receive $${sellPrice.toLocaleString()} (60% of original price).\n\n` +
      `This action cannot be undone.`;
    
    if (window.confirm(confirmMessage)) {
      dispatch({
        type: 'SELL_EQUIPMENT',
        payload: {
          type: 'laptop',
          item: laptop
        }
      });
      alert(`Laptop sold! You received $${sellPrice.toLocaleString()}.`);
    }
  };

  // Debug logging
  console.log('LaptopManager - Current gameState:', gameState);
  console.log('LaptopManager - Equipment state:', gameState.equipment);
  console.log('LaptopManager - Laptop equipment:', gameState.equipment.laptop);
  console.log('LaptopManager - User:', user);
  console.log('LaptopManager - Has laptop:', !!gameState.equipment.laptop);

  const laptops = gameState.equipment.laptop ? [{
    id: 'laptop',
    name: gameState.equipment.laptop.name,
    model: gameState.equipment.laptop.name,
    price: gameState.equipment.laptop.price,
    risk: gameState.equipment.laptop.risk,
    illegal: gameState.equipment.laptop.illegal,
    online: gameState.devices.laptop.powered,
    stats: {
      cpu: gameState.equipment.laptop.name === 'Quantum Laptop' ? 'Quantum CPU' : 
           gameState.equipment.laptop.name === 'Gaming Laptop' ? 'Intel i7-12700H' : 
           gameState.equipment.laptop.name === 'Basic Laptop' ? 'Intel i5-8400H' :
           gameState.equipment.laptop.name === 'Used Gaming Laptop' ? 'Intel i7-12700H (Used)' :
           gameState.equipment.laptop.name === 'Salvaged Quantum Laptop' ? 'Quantum CPU (Damaged)' :
           gameState.equipment.laptop.name === 'Stolen Gaming Laptop' ? 'Intel i7-12700H (Stolen)' :
           gameState.equipment.laptop.name === 'Government Laptop' ? 'Classified CPU' :
           'Intel i5-8400H',
      ram: gameState.equipment.laptop.name === 'Quantum Laptop' ? '64GB DDR5' : 
           gameState.equipment.laptop.name === 'Gaming Laptop' ? '32GB DDR4' : 
           gameState.equipment.laptop.name === 'Basic Laptop' ? '16GB DDR4' :
           gameState.equipment.laptop.name === 'Used Gaming Laptop' ? '32GB DDR4 (Used)' :
           gameState.equipment.laptop.name === 'Salvaged Quantum Laptop' ? '64GB DDR5 (Damaged)' :
           gameState.equipment.laptop.name === 'Stolen Gaming Laptop' ? '32GB DDR4 (Stolen)' :
           gameState.equipment.laptop.name === 'Government Laptop' ? '128GB DDR5 (Classified)' :
           '16GB DDR4',
      storage: gameState.equipment.laptop.name === 'Quantum Laptop' ? '2TB NVMe SSD' : 
              gameState.equipment.laptop.name === 'Gaming Laptop' ? '1TB NVMe SSD' : 
              gameState.equipment.laptop.name === 'Basic Laptop' ? '512GB SSD' :
              gameState.equipment.laptop.name === 'Used Gaming Laptop' ? '1TB NVMe SSD (Used)' :
              gameState.equipment.laptop.name === 'Salvaged Quantum Laptop' ? '2TB NVMe SSD (Damaged)' :
              gameState.equipment.laptop.name === 'Stolen Gaming Laptop' ? '1TB NVMe SSD (Stolen)' :
              gameState.equipment.laptop.name === 'Government Laptop' ? '4TB NVMe SSD (Classified)' :
              '512GB SSD',
      battery: gameState.devices.laptop.battery
    }
  }] : [];

  return (
    <LaptopManagerContainer>
      <LaptopManagerHeader>
        <LaptopManagerTitle>Laptop Manager</LaptopManagerTitle>
        <LaptopManagerSubtitle>
          Manage your hacking laptops and access their interfaces
        </LaptopManagerSubtitle>
      </LaptopManagerHeader>

      {laptops.length === 0 ? (
        <EmptyState>
          <EmptyIcon as={FaLaptop} />
          <EmptyTitle>No Laptops Purchased</EmptyTitle>
          <EmptyDescription>
            Visit the store to purchase laptops for your hacking operations
          </EmptyDescription>
          <Button onClick={() => window.location.href = '/store'}>
            Go to Store
          </Button>
        </EmptyState>
      ) : (
        <LaptopGrid>
          {laptops.map((laptop) => (
            <LaptopCard
              key={laptop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LaptopHeader>
                <LaptopInfo>
                  <LaptopIcon as={FaLaptop} />
                  <LaptopDetails>
                    <LaptopName>{laptop.name}</LaptopName>
                    <LaptopModel>{laptop.model}</LaptopModel>
                    <LaptopStatus online={laptop.online}>
                      <StatusDot online={laptop.online} />
                      {laptop.online ? 'Online' : 'Offline'}
                    </LaptopStatus>
                  </LaptopDetails>
                </LaptopInfo>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {gameState.internet.connected ? (
                    <FaCheckCircle style={{ color: '#00ff41' }} />
                  ) : (
                    <FaTimesCircle style={{ color: '#ff0040' }} />
                  )}
                  <div style={{ color: '#00ff41', fontSize: '1.2rem' }}>
                    {React.createElement(getBatteryIcon(laptop.stats.battery))}
                  </div>
                  <span style={{ color: '#00ff41', fontSize: '0.9rem' }}>
                    {laptop.stats.battery.toFixed(0)}%
                  </span>
                </div>
              </LaptopHeader>

              {laptop.risk && (
                <RiskWarning>
                  <FaExclamationTriangle />
                  {laptop.illegal ? 'ILLEGAL DEVICE - High Security Risk!' : 
                   `Risk Level: ${laptop.risk.toUpperCase()}`}
                </RiskWarning>
              )}

              <LaptopStats>
                <StatItem>
                  <StatValue>{laptop.stats.cpu}</StatValue>
                  <StatLabel>CPU</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{laptop.stats.ram}</StatValue>
                  <StatLabel>RAM</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{laptop.stats.storage}</StatValue>
                  <StatLabel>Storage</StatLabel>
                </StatItem>
                <StatItem>
                  <StatValue>{laptop.stats.battery}%</StatValue>
                  <StatLabel>Battery</StatLabel>
                </StatItem>
              </LaptopStats>

              <ControlButtons>
                <ControlButton
                  onClick={() => togglePower(laptop)}
                >
                  <FaPowerOff />
                  {laptop.online ? 'Power Off' : 'Power On'}
                </ControlButton>
                <ControlButton
                  primary
                  onClick={() => {
                    if (laptop.online) {
                      setSelectedLaptop(laptop);
                      setShowLaptopHome(true);
                    } else {
                      alert('Please power on the laptop first');
                    }
                  }}
                >
                  <FaCog />
                  Access Interface
                </ControlButton>
                <SellButton
                  onClick={() => sellLaptop(laptop)}
                >
                  <FaDollarSign />
                  Sell Laptop (${Math.floor(laptop.price * 0.6).toLocaleString()})
                </SellButton>
              </ControlButtons>
            </LaptopCard>
          ))}
        </LaptopGrid>
      )}

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
    </LaptopManagerContainer>
  );
};

export default LaptopManager;

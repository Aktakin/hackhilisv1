import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import Environment from './Environment';
import { FaSignOutAlt, FaCog, FaBatteryFull, FaBatteryThreeQuarters, FaBatteryHalf, FaBatteryQuarter, FaBatteryEmpty, FaWifi, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';

const HomeContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  font-family: 'Orbitron', sans-serif;
`;

const TopBar = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-bottom: 2px solid #00ff41;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StatusIcon = styled.div`
  color: ${props => props.connected ? '#00ff41' : '#ff0040'};
  font-size: 1.2rem;
`;

const BatteryIcon = styled.div`
  color: ${props => props.level > 20 ? '#00ff41' : '#ff0040'};
  font-size: 1.2rem;
`;

const UserInfo = styled.div`
  color: #00ff41;
  font-size: 1rem;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background: linear-gradient(45deg, #ff0040, #cc0033);
  border: none;
  border-radius: 6px;
  padding: 8px 15px;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: linear-gradient(45deg, #cc0033, #990022);
    transform: translateY(-1px);
  }
`;

const MainContent = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const WelcomeScreen = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const WelcomeTitle = styled.h1`
  color: #00ff41;
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
  text-align: center;
`;

const WelcomeSubtitle = styled.p`
  color: #00ffff;
  font-size: 1.2rem;
  margin-bottom: 40px;
  text-align: center;
`;

const AppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 800px;
  width: 100%;
  padding: 0 20px;
`;

const AppCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const AppIcon = styled.div`
  font-size: 3rem;
  color: #00ff41;
  margin-bottom: 15px;
`;

const AppName = styled.h3`
  color: #00ff41;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const AppDescription = styled.p`
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const LaptopHomeScreen = ({ onLogout }) => {
  const { gameState, dispatch } = useGame();
  const [currentApp, setCurrentApp] = useState(null);

  const getBatteryIcon = (level) => {
    if (level > 75) return FaBatteryFull;
    if (level > 50) return FaBatteryThreeQuarters;
    if (level > 25) return FaBatteryHalf;
    if (level > 0) return FaBatteryQuarter;
    return FaBatteryEmpty;
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_LAPTOP', payload: {} });
    onLogout();
  };

  const apps = [
    {
      id: 'env',
      name: 'Environment',
      description: 'Network analysis and hacking tools',
      icon: '🌐',
      component: Environment
    },
    {
      id: 'terminal',
      name: 'Terminal',
      description: 'Command line interface',
      icon: '💻',
      component: null
    },
    {
      id: 'files',
      name: 'File Manager',
      description: 'Browse and manage files',
      icon: '📁',
      component: null
    },
    {
      id: 'settings',
      name: 'Settings',
      description: 'System configuration',
      icon: '⚙️',
      component: null
    }
  ];

  const renderApp = () => {
    if (!currentApp) return null;

    const app = apps.find(a => a.id === currentApp);
    if (!app || !app.component) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <app.component user={gameState.user} />
      </motion.div>
    );
  };

  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TopBar>
        <TopBarLeft>
          <UserInfo>
            Welcome, {gameState.devices.laptop.userAccount?.username || 'User'}
          </UserInfo>
        </TopBarLeft>
        <TopBarRight>
          <StatusIcon connected={gameState.internet.connected}>
            {gameState.internet.connected ? <FaWifi /> : <FaTimesCircle />}
          </StatusIcon>
          <BatteryIcon as={getBatteryIcon(gameState.devices.laptop.battery)} level={gameState.devices.laptop.battery} />
          <span style={{ color: '#00ff41', fontSize: '0.9rem' }}>
            {gameState.devices.laptop.battery.toFixed(0)}%
          </span>
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </LogoutButton>
        </TopBarRight>
      </TopBar>

      <MainContent>
        {currentApp ? (
          renderApp()
        ) : (
          <WelcomeScreen
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomeTitle>Kali Linux</WelcomeTitle>
            <WelcomeSubtitle>
              Welcome to your hacking environment. Choose an application to begin.
            </WelcomeSubtitle>
            <AppGrid>
              {apps.map((app) => (
                <AppCard
                  key={app.id}
                  onClick={() => setCurrentApp(app.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AppIcon>{app.icon}</AppIcon>
                  <AppName>{app.name}</AppName>
                  <AppDescription>{app.description}</AppDescription>
                </AppCard>
              ))}
            </AppGrid>
          </WelcomeScreen>
        )}
      </MainContent>
    </HomeContainer>
  );
};

export default LaptopHomeScreen;




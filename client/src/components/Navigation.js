import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  FaHome, 
  FaStore, 
  FaGraduationCap, 
  FaTerminal, 
  FaUsers, 
  FaUser,
  FaSignOutAlt,
  FaMobileAlt,
  FaNetworkWired,
  FaBuilding,
  FaCode,
  FaCrosshairs,
  FaChevronLeft,
  FaChevronRight,
  FaBars,
  FaTimes,
  FaFlag
} from 'react-icons/fa';

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(0, 255, 65, 0.3), 0 0 10px rgba(0, 255, 65, 0.2);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.5), 0 0 25px rgba(0, 255, 65, 0.3);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const NavContainer = styled(motion.nav)`
  position: fixed;
  left: 0;
  top: 0;
  width: ${props => props.expanded ? '220px' : '80px'};
  height: 100vh;
  background: linear-gradient(180deg, rgba(10, 10, 20, 0.98) 0%, rgba(26, 26, 46, 0.98) 100%);
  border-right: 2px solid #00ff41;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.expanded ? 'flex-start' : 'center'};
  padding: ${props => props.expanded ? '20px 15px' : '20px 0'};
  z-index: 1000;
  backdrop-filter: blur(15px);
  box-shadow: 2px 0 30px rgba(0, 255, 65, 0.1);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ff41, transparent);
    animation: ${glow} 3s ease-in-out infinite;
  }
`;

const NavHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.expanded ? 'space-between' : 'center'};
  width: 100%;
  margin-bottom: 30px;
  padding: ${props => props.expanded ? '0 10px' : '0'};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: ${props => props.expanded ? '10px' : '50%'};
    transform: ${props => props.expanded ? 'none' : 'translateX(-50%)'};
    width: ${props => props.expanded ? 'calc(100% - 20px)' : '60%'};
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.3), transparent);
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: ${props => props.expanded ? '1.1rem' : '0'};
  opacity: ${props => props.expanded ? '1' : '0'};
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &::before {
    content: '⚡';
    font-size: 1.5rem;
    filter: drop-shadow(0 0 5px rgba(0, 255, 65, 0.5));
  }
`;

const ToggleButton = styled(motion.button)`
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid rgba(0, 255, 65, 0.3);
  color: #00ff41;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  width: 32px;
  height: 32px;
  
  &:hover {
    background: rgba(0, 255, 65, 0.2);
    border-color: #00ff41;
    transform: scale(1.1);
  }
`;

const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: ${props => props.expanded ? '5px' : '0'};
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 65, 0.3);
    border-radius: 2px;
    
    &:hover {
      background: rgba(0, 255, 65, 0.5);
    }
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: ${props => props.expanded ? 'row' : 'column'};
  align-items: center;
  justify-content: ${props => props.expanded ? 'flex-start' : 'center'};
  padding: ${props => props.expanded ? '12px 15px' : '15px'};
  margin: 0;
  color: #888;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  width: ${props => props.expanded ? '100%' : '50px'};
  min-height: 50px;
  gap: ${props => props.expanded ? '12px' : '0'};
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: #00ff41;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #00ff41;
    background: linear-gradient(90deg, rgba(0, 255, 65, 0.15) 0%, rgba(0, 255, 65, 0.05) 100%);
    transform: translateX(${props => props.expanded ? '5px' : '0'});
    box-shadow: 0 4px 15px rgba(0, 255, 65, 0.2);
    
    &::before {
      transform: scaleY(1);
    }
  }

  &.active {
    color: #00ff41;
    background: linear-gradient(90deg, rgba(0, 255, 65, 0.25) 0%, rgba(0, 255, 65, 0.1) 100%);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.4);
    animation: ${glow} 2s ease-in-out infinite;
    
    &::before {
      transform: scaleY(1);
      box-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
    }
  }

  &.active::after {
    content: '';
    position: absolute;
    right: ${props => props.expanded ? '15px' : '50%'};
    transform: ${props => props.expanded ? 'none' : 'translateX(50%)'};
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: #00ff41;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.8);
  }
`;

const Icon = styled(motion.div)`
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  filter: drop-shadow(0 0 3px rgba(0, 255, 65, ${props => props.active ? '0.5' : '0'}));
  transition: filter 0.3s ease;
`;

const Label = styled(motion.span)`
  font-size: 0.85rem;
  font-weight: 600;
  text-align: ${props => props.expanded ? 'left' : 'center'};
  line-height: 1.2;
  font-family: 'Orbitron', sans-serif;
  white-space: nowrap;
  opacity: ${props => props.expanded ? '1' : '0'};
  width: ${props => props.expanded ? 'auto' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  left: 100%;
  margin-left: 15px;
  background: rgba(0, 0, 0, 0.95);
  color: #00ff41;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid rgba(0, 255, 65, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  z-index: 1001;
  
  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid rgba(0, 255, 65, 0.3);
  }
`;

const NavFooter = styled.div`
  margin-top: auto;
  padding-top: 20px;
  width: 100%;
  border-top: 1px solid rgba(0, 255, 65, 0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserSection = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: ${props => props.expanded ? '12px 15px' : '12px'};
  border-radius: 10px;
  background: rgba(0, 255, 65, 0.05);
  border: 1px solid rgba(0, 255, 65, 0.2);
  margin-bottom: 10px;
  width: ${props => props.expanded ? '100%' : '50px'};
  overflow: hidden;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00ff41, #00cc33);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.4);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  opacity: ${props => props.expanded ? '1' : '0'};
  width: ${props => props.expanded ? 'auto' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const UserName = styled.div`
  color: #00ff41;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Orbitron', sans-serif;
  white-space: nowrap;
`;

const UserLevel = styled.div`
  color: #888;
  font-size: 0.75rem;
  white-space: nowrap;
`;

const LogoutButton = styled(motion.button)`
  background: linear-gradient(135deg, rgba(255, 0, 64, 0.1), rgba(255, 0, 64, 0.05));
  border: 1px solid rgba(255, 0, 64, 0.3);
  color: #ff0040;
  padding: ${props => props.expanded ? '12px 15px' : '12px'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${props => props.expanded ? '100%' : '50px'};
  min-height: 50px;
  display: flex;
  flex-direction: ${props => props.expanded ? 'row' : 'column'};
  align-items: center;
  justify-content: ${props => props.expanded ? 'flex-start' : 'center'};
  gap: ${props => props.expanded ? '12px' : '0'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: #ff0040;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(255, 0, 64, 0.2), rgba(255, 0, 64, 0.1));
    border-color: #ff0040;
    transform: translateX(${props => props.expanded ? '5px' : '0'});
    box-shadow: 0 4px 15px rgba(255, 0, 64, 0.3);
    
    &::before {
      transform: scaleY(1);
    }
  }
`;

const LogoutIcon = styled.div`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
`;

const LogoutLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'Orbitron', sans-serif;
  white-space: nowrap;
  opacity: ${props => props.expanded ? '1' : '0'};
  width: ${props => props.expanded ? 'auto' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
`;

const Navigation = ({ onLogout, user }) => {
  const { gameState } = useGame();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Full menu for free mode
  const allNavItems = [
    { to: '/dashboard', icon: FaHome, label: 'Home' },
    { to: '/phone', icon: FaMobileAlt, label: 'Devices' },
    { to: '/companies', icon: FaBuilding, label: 'Companies' },
    { to: '/store', icon: FaStore, label: 'Store' },
    { to: '/education', icon: FaGraduationCap, label: 'Learn' },
    { to: '/env', icon: FaNetworkWired, label: 'ENV' },
    { to: '/missions', icon: FaFlag, label: 'Missions' },
    { to: '/alliance', icon: FaUsers, label: 'Alliance' },
    { to: '/scenarios', icon: FaCode, label: 'Scenarios' },
    { to: '/attack', icon: FaCrosshairs, label: 'Attack' }
  ];

  // Reduced menu for story mode
  const storyNavItems = [
    { to: '/dashboard', icon: FaHome, label: 'Home' },
    { to: '/phone', icon: FaMobileAlt, label: 'Devices' },
    { to: '/companies', icon: FaBuilding, label: 'Companies' },
    { to: '/store', icon: FaStore, label: 'Store' },
    { to: '/education', icon: FaGraduationCap, label: 'Learn' },
    { to: '/env', icon: FaNetworkWired, label: 'ENV' },
    { to: '/missions', icon: FaFlag, label: 'Missions' },
    { to: '/alliance', icon: FaUsers, label: 'Alliance' }
  ];

  const navItems = gameState?.gameMode === 'story' ? storyNavItems : allNavItems;
  const isActive = (path) => location.pathname === path;

  return (
    <NavContainer 
      expanded={expanded}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavHeader expanded={expanded}>
        <Logo expanded={expanded}>
          {expanded && 'HackHilis'}
        </Logo>
        <ToggleButton
          onClick={() => setExpanded(!expanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {expanded ? <FaChevronLeft /> : <FaBars />}
        </ToggleButton>
      </NavHeader>

      <NavItemsContainer expanded={expanded}>
        {navItems.map((item, index) => {
          const active = isActive(item.to);
          return (
            <NavItem
              key={item.to}
              to={item.to}
              expanded={expanded}
              onMouseEnter={() => !expanded && setHoveredItem(item.to)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                animationDelay: `${index * 0.05}s`
              }}
            >
              <Icon 
                as={item.icon}
                active={active}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              />
              <Label expanded={expanded}>
                {item.label}
              </Label>
              
              <AnimatePresence>
                {!expanded && hoveredItem === item.to && (
                  <Tooltip
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </Tooltip>
                )}
              </AnimatePresence>
            </NavItem>
          );
        })}
      </NavItemsContainer>

      <NavFooter>
        <UserSection
          expanded={expanded}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <UserAvatar>
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </UserAvatar>
          <UserInfo expanded={expanded}>
            <UserName>{user?.username || 'User'}</UserName>
            <UserLevel>Level {gameState?.level || 1}</UserLevel>
          </UserInfo>
        </UserSection>

        <LogoutButton
          expanded={expanded}
          onClick={onLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogoutIcon as={FaSignOutAlt} />
          <LogoutLabel expanded={expanded}>Logout</LogoutLabel>
        </LogoutButton>
      </NavFooter>
    </NavContainer>
  );
};

export default Navigation;

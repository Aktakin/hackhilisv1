import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  FaPowerOff,
  FaBatteryFull,
  FaBatteryThreeQuarters,
  FaBatteryHalf,
  FaBatteryQuarter,
  FaBatteryEmpty,
  FaWifi,
  FaEthernet,
  FaTerminal,
  FaCode,
  FaHackerNews,
  FaShieldAlt,
  FaDatabase,
  FaNetworkWired,
  FaCog,
  FaPlay,
  FaPause,
  FaStop,
  FaDownload,
  FaUpload,
  FaTrash,
  FaFolder,
  FaFile,
  FaSearch,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaLock,
  FaUnlock,
  FaEye,
  FaEyeSlash,
  FaWindows,
  FaChrome,
  FaFileAlt,
  FaImage,
  FaMusic,
  FaVideo,
  FaGamepad,
  FaCalculator,
  FaPaintBrush,
  FaTimes,
  FaMinus,
  FaSquare,
  FaEnvelope,
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaCamera,
  FaHeadphones,
  FaBook,
  FaChartLine,
  FaCloud,
  FaKey,
  FaLock as FaLockIcon,
  FaUnlock as FaUnlockIcon,
  FaBell,
  FaUsers as FaUsersIcon,
  FaStickyNote
} from 'react-icons/fa';

// Laptop Frame Styles
const LaptopWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  perspective: 2000px;
`;

const LaptopFrame = styled.div`
  background: linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%);
  border-radius: 20px 20px 8px 8px;
  padding: 25px 25px 15px 25px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  flex: 1;
  min-width: 700px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(0, 255, 65, 0.3), 
      rgba(0, 255, 65, 0.5), 
      rgba(0, 255, 65, 0.3), 
      transparent
    );
    border-radius: 20px 20px 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    right: 10%;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(0, 255, 65, 0.2), 
      transparent
    );
    border-radius: 0 0 8px 8px;
  }
`;

const LaptopScreen = styled.div`
  background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
  border: 4px solid #0a0a0a;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 16/10;
  min-height: 550px;
  box-shadow: 
    inset 0 0 50px rgba(0, 0, 0, 0.8),
    0 0 0 2px rgba(0, 255, 65, 0.1),
    0 10px 40px rgba(0, 0, 0, 0.6);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
    z-index: 200;
    pointer-events: none;
  }
`;

const ScreenBezel = styled.div`
  background: linear-gradient(145deg, #0a0a0a 0%, #000 50%, #0a0a0a 100%);
  padding: 12px;
  border-radius: 12px;
  position: relative;
  box-shadow: 
    inset 0 2px 10px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: #000;
    border-radius: 0 0 8px 8px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background: #1a1a1a;
    border-radius: 50%;
    box-shadow: 
      0 0 3px rgba(0, 255, 65, 0.3),
      inset 0 0 2px rgba(0, 0, 0, 0.8);
  }
`;

const Desktop = styled.div`
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(30, 60, 114, 0.8) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(42, 82, 152, 0.8) 0%, transparent 50%),
    linear-gradient(135deg, #0f1b2e 0%, #1a2f4f 50%, #0f1b2e 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 2px,
        rgba(0, 0, 0, 0.03) 4px
      );
    pointer-events: none;
    z-index: 1;
  }
`;

const DesktopIcons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 30px 40px;
  padding: 25px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  max-width: calc(100% - 50px);
`;

const IconImage = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  font-size: 28px;
  color: #fff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const DesktopIcon = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover {
    transform: translateY(-2px);
    
    &::before {
      opacity: 1;
    }
    
    ${IconImage} {
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 12px rgba(0, 255, 65, 0.3);
      transform: scale(1.1);
    }
  }
`;

const IconLabel = styled.span`
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  text-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.8),
    0 0 8px rgba(0, 0, 0, 0.5);
  max-width: 80px;
  line-height: 1.2;
`;

const Taskbar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: linear-gradient(180deg, 
    rgba(0, 0, 0, 0.95) 0%, 
    rgba(0, 0, 0, 0.9) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 6px;
  z-index: 100;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 -2px 10px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
`;

const StartButton = styled(motion.button)`
  background: linear-gradient(135deg, #0078d4 0%, #005a9e 100%);
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  box-shadow: 
    0 2px 8px rgba(0, 120, 212, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: linear-gradient(135deg, #0088e4 0%, #006aae 100%);
    box-shadow: 
      0 4px 12px rgba(0, 120, 212, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 1px 4px rgba(0, 120, 212, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
`;

const TaskbarIcon = styled(motion.button)`
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  border: none;
  padding: 8px 14px;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-bottom: ${props => props.$active ? '2px solid #0078d4' : '2px solid transparent'};
  
  &:hover {
    background: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-1px);
  }
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$active ? '80%' : '0%'};
    height: 2px;
    background: #0078d4;
    transition: width 0.2s;
  }
`;

const SystemTray = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 12px;
`;

const StartMenu = styled(motion.div)`
  position: fixed;
  bottom: 48px;
  left: 0;
  width: 350px;
  max-height: 500px;
  background: linear-gradient(180deg, 
    rgba(30, 30, 40, 0.98) 0%, 
    rgba(20, 20, 30, 0.98) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 8px 8px 0 0;
  box-shadow: 
    0 -4px 20px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  z-index: 200;
  overflow: hidden;
`;

const StartMenuHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, rgba(0, 120, 212, 0.2) 0%, transparent 100%);
`;

const StartMenuTitle = styled.h3`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StartMenuApps = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 5px;
  overflow-y: auto;
  flex: 1;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

const StartMenuItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
  
  &:active {
    transform: translateX(3px);
  }
`;

const StartMenuIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  font-size: 20px;
  color: #fff;
  flex-shrink: 0;
`;

const StartMenuLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  flex: 1;
`;

const Window = styled(motion.div)`
  position: ${props => props.$maximized ? 'fixed' : 'absolute'};
  top: ${props => props.$maximized ? '0' : props.y + 'px'};
  left: ${props => props.$maximized ? '0' : props.x + 'px'};
  width: ${props => props.$maximized ? '100%' : props.$minimized ? '0' : '600px'};
  height: ${props => props.$maximized ? 'calc(100% - 40px)' : props.$minimized ? '0' : '400px'};
  background: #f0f0f0;
  border-radius: ${props => props.$maximized ? '0' : '8px'};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  display: ${props => props.$minimized ? 'none' : 'flex'};
  flex-direction: column;
  z-index: ${props => props.$selected ? 20 : 10};
  overflow: hidden;
`;

const WindowHeader = styled.div`
  background: linear-gradient(135deg, #0078d4 0%, #005a9e 100%);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px 8px 0 0;
`;

const WindowTitle = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WindowControls = styled.div`
  display: flex;
  gap: 5px;
`;

const WindowButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 3px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const WindowContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow: auto;
  background: #fff;
`;

const KeyboardArea = styled.div`
  background: linear-gradient(145deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%);
  height: 240px;
  margin-top: 15px;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  box-shadow: 
    inset 0 2px 10px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(0, 255, 65, 0.1),
    0 4px 20px rgba(0, 0, 0, 0.6);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 15%;
    right: 15%;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(0, 255, 65, 0.2), 
      rgba(0, 255, 65, 0.4), 
      rgba(0, 255, 65, 0.2), 
      transparent
    );
    border-radius: 0 0 50% 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(0, 255, 65, 0.1), 
      transparent
    );
    border-radius: 2px;
  }
`;

const KeyboardRow = styled.div`
  display: flex;
  gap: 3px;
  align-items: flex-start;
  width: 100%;
  height: 32px;
  justify-content: flex-start;
`;

const Key = styled.div`
  background: linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 5px 7px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  width: ${props => props.width || '34px'};
  height: ${props => props.height || '30px'};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  font-weight: 500;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 6px;
    background: linear-gradient(145deg, 
      rgba(255, 255, 255, 0.05) 0%, 
      transparent 50%, 
      rgba(0, 0, 0, 0.2) 100%);
    opacity: 0;
    transition: opacity 0.15s;
  }
  
  &:hover {
    background: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 50%, #2a2a2a 100%);
    border-color: rgba(0, 255, 65, 0.3);
    transform: translateY(-2px);
    box-shadow: 
      0 4px 12px rgba(0, 255, 65, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 rgba(0, 0, 0, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 1px 3px rgba(0, 0, 0, 0.6),
      inset 0 2px 4px rgba(0, 0, 0, 0.5);
  }
`;

const SpaceBar = styled(Key)`
  width: auto;
  flex: 1;
  height: 30px;
  min-width: 250px;
`;

const NumpadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 8px;
  position: relative;
  height: 100%;
`;

const NumpadRow = styled.div`
  display: flex;
  gap: 3px;
  align-items: flex-start;
  position: relative;
`;

const NavigationCluster = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 8px;
  height: 100%;
`;

const ArrowCluster = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 8px;
  position: relative;
  height: 100%;
`;


const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  color: ${props => props.active ? '#00ff41' : '#888'};
  margin-bottom: 10px;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? '#00ff41' : '#ff0040'};
  animation: ${props => props.active ? 'pulse 2s infinite' : 'none'};
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const BatteryIcon = styled.div`
  font-size: 1rem;
  color: ${props => props.level > 75 ? '#00ff41' : 
                   props.level > 50 ? '#ffaa00' : 
                   props.level > 25 ? '#ff6600' : '#ff0040'};
`;

// Captured Data Modal Styles
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, rgba(10, 10, 20, 0.98) 0%, rgba(26, 26, 46, 0.98) 100%);
  border: 2px solid rgba(0, 255, 65, 0.3);
  border-radius: 15px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 255, 65, 0.1);
`;

const ModalHeader = styled.div`
  padding: 20px 30px;
  border-bottom: 1px solid rgba(0, 255, 65, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  color: #00ff41;
  font-size: 1.8rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ModalCloseButton = styled.button`
  background: rgba(255, 0, 64, 0.2);
  border: 1px solid rgba(255, 0, 64, 0.4);
  color: #ff0040;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 0, 64, 0.3);
    border-color: #ff0040;
    transform: scale(1.1);
  }
`;

const ModalBody = styled.div`
  padding: 30px;
  overflow-y: auto;
  flex: 1;
`;

const DataSection = styled.div`
  margin-bottom: 30px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${props => props.$encrypted ? 'rgba(255, 170, 0, 0.3)' : 'rgba(0, 255, 65, 0.3)'};
`;

const SectionTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  color: ${props => props.$encrypted ? '#ffaa00' : '#00ff41'};
  font-size: 1.4rem;
  margin: 0;
`;

const DataCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid ${props => props.$encrypted ? 'rgba(255, 170, 0, 0.2)' : 'rgba(0, 255, 65, 0.2)'};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
`;

const DataRow = styled.div`
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const DataLabel = styled.span`
  color: #888;
  font-weight: bold;
  min-width: 150px;
  font-family: 'Share Tech Mono', monospace;
`;

const DataValue = styled.span`
  color: ${props => props.$highlight ? '#00ff41' : props.$danger ? '#ff0040' : '#ccc'};
  font-family: 'Share Tech Mono', monospace;
  word-break: break-all;
`;

const EncryptedData = styled.div`
  background: rgba(255, 170, 0, 0.1);
  border: 1px solid rgba(255, 170, 0, 0.3);
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  font-family: 'Share Tech Mono', monospace;
  color: #ffaa00;
  text-align: center;
  font-size: 0.9rem;
`;

const WarningBox = styled.div`
  background: rgba(255, 170, 0, 0.1);
  border-left: 4px solid #ffaa00;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
  display: flex;
  align-items: start;
  gap: 12px;
`;

const InfoBox = styled.div`
  background: rgba(0, 170, 255, 0.1);
  border-left: 4px solid #00aaff;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
  display: flex;
  align-items: start;
  gap: 12px;
`;

const InfoText = styled.p`
  color: #aaa;
  line-height: 1.6;
  margin: 0;
  flex: 1;
`;

const LaptopInterface = ({ device }) => {
  const { gameState, dispatch } = useGame();
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'output', text: 'Kali Linux 2023.4 (kali-rolling) tty1' },
    { type: 'output', text: 'kali login: _' },
    { type: 'output', text: 'Password: ' },
    { type: 'output', text: 'Last login: Mon Jan 15 10:30:45 UTC 2024' },
    { type: 'output', text: 'Welcome to Kali Linux!' },
    { type: 'command', text: 'kali@hacker-laptop:~$ ' }
  ]);
  const [terminalCommand, setTerminalCommand] = useState('');
  const [openWindows, setOpenWindows] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [windowStates, setWindowStates] = useState({}); // { appId: { minimized: false, maximized: false } }
  const [settingsCategory, setSettingsCategory] = useState(null);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcValue, setCalcValue] = useState(null);
  const [calcOperation, setCalcOperation] = useState(null);
  const [notepadText, setNotepadText] = useState('');
  const terminalScrollRef = useRef(null);
  
  // MitM Mission State
  const [mitmState, setMitmState] = useState({
    toolsInstalled: false,
    monitorMode: false,
    rogueAPRunning: false,
    dnsmasqRunning: false,
    ipForwarding: false,
    bettercapRunning: false,
    arpSpoofing: false,
    sniffing: false,
    connectedDevices: [],
    capturedPackets: 0
  });
  const [showCapturedDataModal, setShowCapturedDataModal] = useState(false);

  // Auto-scroll terminal to bottom when new output is added
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const laptopDevice = gameState.devices.laptop;
  const isPowered = laptopDevice.powered;
  const isConnected = laptopDevice.connected;
  const battery = laptopDevice.battery;

  const desktopApps = [
    // First Column
    { id: 'explorer', name: 'File Explorer', icon: FaFolder, color: '#0078d4' },
    { id: 'browser', name: 'Browser', icon: FaChrome, color: '#4285f4' },
    { id: 'terminal', name: 'Terminal', icon: FaTerminal, color: '#00ff41' },
    { id: 'settings', name: 'Settings', icon: FaCog, color: '#888' },
    { id: 'notepad', name: 'Notepad', icon: FaFileAlt, color: '#ffff00' },
    // Second Column (starting with Calculator)
    { id: 'calculator', name: 'Calculator', icon: FaCalculator, color: '#ff6600' },
    { id: 'paint', name: 'Paint', icon: FaPaintBrush, color: '#ff00ff' },
    { id: 'images', name: 'Pictures', icon: FaImage, color: '#00ffff' },
    { id: 'music', name: 'Music', icon: FaMusic, color: '#ff0080' },
    { id: 'videos', name: 'Videos', icon: FaVideo, color: '#8000ff' },
    { id: 'games', name: 'Games', icon: FaGamepad, color: '#ff8000' },
    // Third Column
    { id: 'downloads', name: 'Downloads', icon: FaDownload, color: '#00d2d3' },
    { id: 'email', name: 'Email', icon: FaEnvelope, color: '#00a8ff' },
    { id: 'calendar', name: 'Calendar', icon: FaCalendar, color: '#ff4757' },
    { id: 'clock', name: 'Clock', icon: FaClock, color: '#5f27cd' },
    { id: 'camera', name: 'Camera', icon: FaCamera, color: '#00d2d3' },
    { id: 'headphones', name: 'Audio', icon: FaHeadphones, color: '#ff6348' },
    { id: 'book', name: 'Books', icon: FaBook, color: '#ff9ff3' },
    { id: 'chart', name: 'Analytics', icon: FaChartLine, color: '#54a0ff' },
    { id: 'cloud', name: 'Cloud', icon: FaCloud, color: '#48dbfb' },
    { id: 'key', name: 'Password', icon: FaKey, color: '#ffd32a' },
    { id: 'code', name: 'Code Editor', icon: FaCode, color: '#00ff41' }
  ];

  const startMenuApps = [
    { id: 'calendar', name: 'Calendar', icon: FaCalendar, color: '#ff4757' },
    { id: 'reminder', name: 'Reminder', icon: FaBell, color: '#ffa502' },
    { id: 'meeting', name: 'Meeting', icon: FaUsersIcon, color: '#0078d4' }
  ];

  const handlePowerToggle = () => {
    dispatch({
      type: 'POWER_DEVICE',
      payload: {
        device: 'laptop',
        powered: !isPowered
      }
    });
  };

  const openApp = (app) => {
    if (!openWindows.find(w => w.id === app.id)) {
      setOpenWindows([...openWindows, { ...app, x: 50 + openWindows.length * 30, y: 50 + openWindows.length * 30 }]);
      setWindowStates({ ...windowStates, [app.id]: { minimized: false, maximized: false } });
    }
    setSelectedApp(app.id);
    // Restore if minimized
    if (windowStates[app.id]?.minimized) {
      setWindowStates({ ...windowStates, [app.id]: { ...windowStates[app.id], minimized: false } });
    }
  };

  const closeWindow = (appId) => {
    setOpenWindows(openWindows.filter(w => w.id !== appId));
    const newStates = { ...windowStates };
    delete newStates[appId];
    setWindowStates(newStates);
    if (selectedApp === appId) {
      setSelectedApp(null);
    }
  };

  const minimizeWindow = (appId) => {
    setWindowStates({ ...windowStates, [appId]: { ...windowStates[appId], minimized: true } });
  };

  const maximizeWindow = (appId) => {
    const currentState = windowStates[appId] || { minimized: false, maximized: false };
    setWindowStates({ ...windowStates, [appId]: { ...currentState, maximized: !currentState.maximized } });
  };

  const handleTerminalCommand = (command) => {
    if (!command.trim()) return;
    const cmd = command.trim();
    setTerminalHistory(prev => [...prev, { type: 'command', text: `kali@hacker-laptop:~$ ${cmd}` }]);
    
    setTimeout(() => {
      let output = '';
      const cmdLower = cmd.toLowerCase();
      const cmdParts = cmd.split(' ');
      
      // Basic commands
      switch (cmdLower) {
        case 'help':
          output = 'Available commands:\n' +
            '\n' +
            'Basic Commands:\n' +
            '  help, whoami, pwd, ls, ls -la, cd, cat, clear, exit, status\n' +
            '\n' +
            'MitM Mission Commands:\n' +
            '  sudo apt update && sudo apt install aircrack-ng hostapd dnsmasq iptables\n' +
            '  iw list | grep "AP"\n' +
            '  sudo iwlist wlan0 scan | grep -E "SSID|BSSID|Channel"\n' +
            '  view captured (or analyze captured) - View captured network traffic analysis\n' +
            '  sudo airmon-ng check kill\n' +
            '  sudo airmon-ng start wlan0\n' +
            '  sudo aireplay-ng -0 30 -a <BSSID> mon0\n' +
            '  sudo hostapd /etc/hostapd/hostapd.conf\n' +
            '  sudo ifconfig wlan0 up 192.168.1.1 netmask 255.255.255.0\n' +
            '  sudo dnsmasq -C /etc/dnsmasq.conf -d\n' +
            '  sudo sysctl -w net.ipv4.ip_forward=1\n' +
            '  sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE\n' +
            '  sudo bettercap -iface wlan0\n' +
            '  set arp.spoof.targets 192.168.1.0/24\n' +
            '  arp.spoof on\n' +
            '  net.sniff on\n' +
            '  sudo tcpdump -i wlan0 -w capture.pcap\n' +
            '  wireshark capture.pcap\n' +
            '\n' +
            'Network Tools:\n' +
            '  ifconfig, ping, netstat, nmap, msfconsole\n' +
            '\n' +
            'Type any command to execute it!';
          break;
        case 'whoami':
          output = 'kali';
          break;
        case 'pwd':
          output = '/home/kali';
          break;
        case 'ls':
          if (cmdParts.length > 1 && cmdParts[1] === '-la') {
            output = 'total 48\n' +
              'drwxr-xr-x  8 kali kali  4096 Jan 15 07:30 .\n' +
              'drwxr-xr-x  3 root root  4096 Jan 10 10:00 ..\n' +
              '-rw-r--r--  1 kali kali   220 Jan 10 10:00 .bashrc\n' +
              'drwxr-xr-x  2 kali kali  4096 Jan 15 07:25 Desktop\n' +
              'drwxr-xr-x  2 kali kali  4096 Jan 15 07:25 Documents\n' +
              'drwxr-xr-x  2 kali kali  4096 Jan 15 07:25 Downloads\n' +
              'drwxr-xr-x  2 kali kali  4096 Jan 15 07:25 Music\n' +
              'drwxr-xr-x  2 kali kali  4096 Jan 15 07:25 Pictures\n' +
              'drwxr-xr-x  2 kali kali  4096 Jan 15 07:25 Videos\n' +
              'drwxr-xr-x  2 kali kali  4096 Jan 15 07:25 tools\n' +
              'drwxr-xr-x  2 kali kali  4096 Jan 15 07:25 scripts\n' +
              'drwxr-xr-x  2 kali kali  4096 Jan 15 07:25 mitm-tools';
          } else {
            output = 'Desktop  Documents  Downloads  Music  Pictures  Videos  tools  scripts  mitm-tools';
          }
          break;
        case 'clear':
          setTerminalHistory([]);
          return;
        case 'cd':
          if (cmdParts.length > 1) {
            output = `Changed directory to ${cmdParts[1]}`;
          } else {
            output = 'cd: missing operand';
          }
          break;
        case 'cat':
          if (cmdParts.length > 1) {
            if (cmdParts[1].includes('hostapd.conf')) {
              output = 'interface=wlan0\n' +
                'driver=nl80211\n' +
                'ssid=PublicWiFi\n' +
                'hw_mode=g\n' +
                'channel=11\n' +
                'macaddr_acl=0\n' +
                'auth_algs=1\n' +
                'ignore_broadcast_ssid=0';
            } else if (cmdParts[1].includes('dnsmasq.conf')) {
              output = 'interface=wlan0\n' +
                'dhcp-range=192.168.1.2,192.168.1.100,12h\n' +
                'dhcp-option=3,192.168.1.1\n' +
                'dhcp-option=6,192.168.1.1';
            } else {
              output = `cat: ${cmdParts[1]}: No such file or directory`;
            }
          } else {
            output = 'cat: missing file operand';
          }
          break;
        case 'exit':
          if (mitmState.bettercapRunning) {
            output = '[07:32:00] [sys.log] [inf] shutting down...\n' +
              '[07:32:00] [arp.spoof] [inf] arp spoofer stopped\n' +
              '[07:32:00] [net.sniff] [inf] network sniffer stopped\n' +
              'bettercap stopped.';
            setMitmState(prev => ({ 
              ...prev, 
              bettercapRunning: false,
              arpSpoofing: false,
              sniffing: false
            }));
          } else {
            output = 'exit';
          }
          break;
        case 'status':
          output = '=== MitM Mission Status ===\n' +
            `Tools Installed: ${mitmState.toolsInstalled ? '✓' : '✗'}\n` +
            `Monitor Mode: ${mitmState.monitorMode ? '✓' : '✗'}\n` +
            `Rogue AP Running: ${mitmState.rogueAPRunning ? '✓' : '✗'}\n` +
            `DHCP Server: ${mitmState.dnsmasqRunning ? '✓' : '✗'}\n` +
            `IP Forwarding: ${mitmState.ipForwarding ? '✓' : '✗'}\n` +
            `Bettercap Running: ${mitmState.bettercapRunning ? '✓' : '✗'}\n` +
            `ARP Spoofing: ${mitmState.arpSpoofing ? '✓' : '✗'}\n` +
            `Network Sniffing: ${mitmState.sniffing ? '✓' : '✗'}\n` +
            `Captured Packets: ${mitmState.capturedPackets}\n` +
            `Connected Devices: ${mitmState.connectedDevices.length}`;
          break;
        default:
          // MitM Mission Commands
          if (cmd.startsWith('sudo apt update')) {
            output = 'Get:1 http://kali.download/kali kali-rolling InRelease [30.5 kB]\n' +
              'Get:2 http://kali.download/kali kali-rolling/main amd64 Packages [18.2 MB]\n' +
              'Fetched 18.2 MB in 3s (6,073 kB/s)\n' +
              'Reading package lists... Done\n' +
              'Building dependency tree... Done\n' +
              'Reading state information... Done\n' +
              'All packages are up to date.';
            setMitmState(prev => ({ ...prev, toolsInstalled: true }));
          } else if (cmd.startsWith('sudo apt install')) {
            const packages = cmd.replace('sudo apt install', '').trim();
            output = `Reading package lists... Done\n` +
              `Building dependency tree... Done\n` +
              `The following NEW packages will be installed:\n` +
              `  ${packages}\n` +
              `0 upgraded, ${packages.split(' ').length} newly installed, 0 to remove\n` +
              `Setting up ${packages.split(' ')[0]} ...\n` +
              `Processing triggers for systemd ...\n` +
              `Done!`;
            setMitmState(prev => ({ ...prev, toolsInstalled: true }));
          } else if (cmd.startsWith('iw list') || cmd.startsWith('iwlist')) {
            if (cmd.includes('grep "AP"')) {
              output = '        Supported interface modes:\n' +
                '                 * IBSS\n' +
                '                 * managed\n' +
                '                 * AP\n' +
                '                 * AP/VLAN\n' +
                '                 * monitor\n' +
                '                 * mesh point\n' +
                '        AP mode: Supported ✓';
            } else if (cmd.includes('scan')) {
              output = 'wlan0     Scan completed :\n' +
                '          Cell 01 - Address: AA:BB:CC:DD:EE:FF\n' +
                '                    ESSID:"PublicWiFi"\n' +
                '                    Protocol:IEEE 802.11bgn\n' +
                '                    Mode:Master\n' +
                '                    Frequency:2.462 GHz (Channel 11)\n' +
                '                    Encryption key:off\n' +
                '                    Bit Rates:54 Mb/s\n' +
                '                    Signal level=-45 dBm\n' +
                '          Cell 02 - Address: 11:22:33:44:55:66\n' +
                '                    ESSID:"CoffeeShop_WiFi"\n' +
                '                    Protocol:IEEE 802.11ac\n' +
                '                    Mode:Master\n' +
                '                    Frequency:5.180 GHz (Channel 36)\n' +
                '                    Encryption key:on\n' +
                '                    Bit Rates:433 Mb/s\n' +
                '                    Signal level=-52 dBm';
            } else {
              output = 'Interface wlan0\n' +
                '    Supported interface modes:\n' +
                '         * IBSS\n' +
                '         * managed\n' +
                '         * AP\n' +
                '         * AP/VLAN\n' +
                '         * monitor\n' +
                '         * mesh point';
            }
          } else if (cmd.startsWith('sudo airmon-ng check kill')) {
            output = 'Killing these processes:\n' +
              '  PID Name\n' +
              '  1234 NetworkManager\n' +
              '  5678 wpa_supplicant\n' +
              'Processes killed successfully.';
          } else if (cmd.startsWith('sudo airmon-ng start')) {
            const wifiInterface = cmdParts[cmdParts.length - 1] || 'wlan0';
            output = `Found ${wifiInterface} interface\n` +
              `Enabling monitor mode on ${wifiInterface}...\n` +
              `Interface ${wifiInterface}mon0 created in monitor mode\n` +
              `Monitor mode enabled on ${wifiInterface}mon0`;
            setMitmState(prev => ({ ...prev, monitorMode: true }));
          } else if (cmd.startsWith('sudo hostapd')) {
            output = 'Configuration file: /etc/hostapd/hostapd.conf\n' +
              'wlan0: interface state UNINITIALIZED->ENABLED\n' +
              'wlan0: AP-ENABLED\n' +
              'Using interface wlan0 with hwaddr aa:bb:cc:dd:ee:ff and ssid "PublicWiFi"\n' +
              'wlan0: STA aa:11:bb:22:cc:33 IEEE 802.11: authenticated\n' +
              'wlan0: STA aa:11:bb:22:cc:33 IEEE 802.11: associated (aid 1)\n' +
              'Rogue AP is now running!';
            setMitmState(prev => ({ 
              ...prev, 
              rogueAPRunning: true,
              connectedDevices: [...prev.connectedDevices, { mac: 'aa:11:bb:22:cc:33', ip: '192.168.1.2' }]
            }));
          } else if (cmd.startsWith('ifconfig')) {
            if (cmd.includes('sudo') && cmd.includes('192.168.1.1')) {
              output = 'wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n' +
                '        inet 192.168.1.1  netmask 255.255.255.0  broadcast 192.168.1.255\n' +
                '        inet6 fe80::aabb:ccff:fedd:eeff  prefixlen 64  scopeid 0x20<link>\n' +
                '        ether aa:bb:cc:dd:ee:ff  txqueuelen 1000  (Ethernet)\n' +
                '        RX packets 0  bytes 0 (0.0 B)\n' +
                '        TX packets 0  bytes 0 (0.0 B)';
            } else if (cmd.includes('wlan0')) {
              output = 'wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n' +
                '        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255\n' +
                '        inet6 fe80::aabb:ccff:fedd:eeff  prefixlen 64  scopeid 0x20<link>\n' +
                '        ether aa:bb:cc:dd:ee:ff  txqueuelen 1000  (Ethernet)\n' +
                '        RX packets 1234  bytes 456789 (456.7 KB)\n' +
                '        TX packets 987  bytes 234567 (234.5 KB)';
            } else {
              output = 'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n' +
                '        inet 192.168.0.105  netmask 255.255.255.0  broadcast 192.168.0.255\n' +
                'wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n' +
                '        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255';
            }
          } else if (cmd.startsWith('sudo dnsmasq')) {
            output = 'dnsmasq: started, version 2.85 cachesize 150\n' +
              'dnsmasq: compile time options: IPv6 GNU-getopt DBus i18n IDN2 DHCP DHCPv6 no-Lua TFTP conntrack ipset auth cryptohash DNSSEC loop-detect inotify dumpfile\n' +
              'dnsmasq-dhcp: DHCP, IP range 192.168.1.2 -- 192.168.1.100, lease time 12h\n' +
              'dnsmasq: reading /etc/resolv.conf\n' +
              'dnsmasq: using nameserver 8.8.8.8#53\n' +
              'dnsmasq: read /etc/hosts - 7 addresses\n' +
              'DHCP server is running!';
            setMitmState(prev => ({ ...prev, dnsmasqRunning: true }));
          } else if (cmd.startsWith('sudo sysctl -w net.ipv4.ip_forward=1')) {
            output = 'net.ipv4.ip_forward = 1';
            setMitmState(prev => ({ ...prev, ipForwarding: true }));
          } else if (cmd.startsWith('sudo iptables')) {
            if (cmd.includes('MASQUERADE')) {
              output = 'NAT rule added successfully.';
            } else if (cmd.includes('FORWARD')) {
              output = 'Forwarding rule added successfully.';
            } else if (cmd.includes('-F')) {
              output = 'All iptables rules flushed.';
            } else {
              output = 'iptables rule added successfully.';
            }
          } else if (cmd.startsWith('sudo bettercap -iface')) {
            output = 'bettercap v2.32.0 (built for linux amd64 with go1.21.0) [type \'help\' for a list of commands]\n' +
              '\n' +
              '[07:30:45] [sys.log] [inf] wlan0 (192.168.1.1/24) > gateway is 192.168.1.1\n' +
              '[07:30:45] [sys.log] [inf] wlan0 > starting network discovery\n' +
              '[07:30:45] [sys.log] [inf] wlan0 > network discovery started\n' +
              '\n' +
              'bettercap v2.32.0 interactive session\n' +
              'Type \'help\' for a list of commands\n' +
              '\n' +
              'bettercap > ';
            setMitmState(prev => ({ ...prev, bettercapRunning: true }));
          } else if (cmd.startsWith('set arp.spoof.targets') || cmd.startsWith('arp.spoof.targets')) {
            const targets = cmd.replace(/^(set\s+)?arp\.spoof\.targets\s+/, '').trim();
            output = `[07:31:10] [arp.spoof] [inf] arp.spoof.targets set to ${targets}`;
          } else if (cmd.startsWith('arp.spoof on') || cmd === 'arp.spoof on') {
            if (!mitmState.bettercapRunning) {
              output = 'Error: bettercap is not running. Start it first with: sudo bettercap -iface wlan0';
            } else {
              output = '[07:31:12] [arp.spoof] [inf] wlan0 > arp spoofer started, probing 192.168.1.0/24\n' +
                '[07:31:12] [arp.spoof] [inf] wlan0 > 192.168.1.2 > aa:11:bb:22:cc:33 (spoofed as 192.168.1.1)\n' +
                '[07:31:13] [arp.spoof] [inf] wlan0 > 192.168.1.3 > bb:22:cc:33:dd:44 (spoofed as 192.168.1.1)\n' +
                '[07:31:14] [arp.spoof] [inf] wlan0 > 192.168.1.4 > cc:33:dd:44:ee:55 (spoofed as 192.168.1.1)\n' +
                'ARP spoofing is now active! All traffic is being intercepted.';
              setMitmState(prev => ({ ...prev, arpSpoofing: true }));
            }
          } else if (cmd.startsWith('net.sniff on') || cmd === 'net.sniff on') {
            if (!mitmState.bettercapRunning) {
              output = 'Error: bettercap is not running. Start it first with: sudo bettercap -iface wlan0';
            } else {
              output = '[07:31:15] [net.sniff] [inf] wlan0 > network sniffer started\n' +
                '[07:31:16] [net.sniff] [inf] 192.168.1.2:52341 > 93.184.216.34:80 [HTTP] GET /login HTTP/1.1\n' +
                '[07:31:17] [net.sniff] [inf] 192.168.1.2:52342 > 93.184.216.34:443 [HTTPS] POST /api/auth\n' +
                '[07:31:18] [net.sniff] [inf] 192.168.1.3:45123 > 151.101.1.140:80 [HTTP] GET /search?q=password\n' +
                '[07:31:19] [net.sniff] [inf] 192.168.1.2:52343 > 8.8.8.8:53 [DNS] A example.com\n' +
                '[07:31:20] [net.sniff] [inf] 192.168.1.4:45124 > 142.250.185.14:443 [HTTPS] GET /mail\n' +
                'Network sniffer is capturing all packets!';
              setMitmState(prev => ({ 
                ...prev, 
                sniffing: true,
                capturedPackets: prev.capturedPackets + 150
              }));
            }
          } else if (cmd.startsWith('sudo tcpdump')) {
            if (cmd.includes('-w')) {
              const filename = cmd.match(/-w\s+(\S+)/)?.[1] || 'capture.pcap';
              output = `tcpdump: listening on wlan0, link-type EN10MB (Ethernet), capture size 262144 bytes\n` +
                `Capturing packets...\n` +
                `^C\n` +
                `150 packets captured\n` +
                `150 packets received by filter\n` +
                `0 packets dropped by kernel\n` +
                `Saved to ${filename}`;
              setMitmState(prev => ({ ...prev, capturedPackets: prev.capturedPackets + 150 }));
            } else {
              output = 'tcpdump: listening on wlan0, link-type EN10MB (Ethernet), capture size 262144 bytes\n' +
                '07:32:10.123456 IP 192.168.1.2.52341 > 93.184.216.34.80: Flags [S], seq 1234567890, win 65535\n' +
                '07:32:10.234567 IP 93.184.216.34.80 > 192.168.1.2.52341: Flags [S.], seq 9876543210, ack 1234567891\n' +
                '07:32:10.345678 IP 192.168.1.2.52341 > 93.184.216.34.80: Flags [.], ack 9876543211';
            }
          } else if (cmd.startsWith('wireshark')) {
            output = 'Opening Wireshark...\n' +
              'Loading capture file: capture.pcap\n' +
              'Found 150 packets\n' +
              'Packet analysis:\n' +
              '  - HTTP requests: 45\n' +
              '  - HTTPS connections: 32\n' +
              '  - DNS queries: 28\n' +
              '  - Other protocols: 45\n' +
              '\n' +
              'Wireshark GUI opened (simulated)';
          } else if (cmd.startsWith('ping')) {
            const target = cmdParts[1] || '8.8.8.8';
            output = `PING ${target} (${target}) 56(84) bytes of data.\n` +
              `64 bytes from ${target}: icmp_seq=1 ttl=64 time=12.345 ms\n` +
              `64 bytes from ${target}: icmp_seq=2 ttl=64 time=11.234 ms\n` +
              `64 bytes from ${target}: icmp_seq=3 ttl=64 time=10.123 ms\n` +
              `\n` +
              `--- ${target} ping statistics ---\n` +
              `3 packets transmitted, 3 received, 0% packet loss, time 2002ms\n` +
              `rtt min/avg/max/mdev = 10.123/11.234/12.345/1.111 ms`;
          } else if (cmd.startsWith('netstat')) {
            if (cmd.includes('-rn')) {
              output = 'Kernel IP routing table\n' +
                'Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface\n' +
                '0.0.0.0         192.168.1.1     0.0.0.0         UG        0 0          0 wlan0\n' +
                '192.168.1.0     0.0.0.0         255.255.255.0   U         0 0          0 wlan0';
            } else {
              output = 'Active Internet connections (w/o servers)\n' +
                'Proto Recv-Q Send-Q Local Address           Foreign Address         State\n' +
                'tcp        0      0 192.168.1.1:22          192.168.1.2:52341      ESTABLISHED\n' +
                'tcp        0      0 192.168.1.1:80           192.168.1.3:45123      ESTABLISHED';
            }
          } else if (cmd.startsWith('sudo aireplay-ng')) {
            const bssid = cmd.match(/-a\s+(\S+)/)?.[1] || 'AA:BB:CC:DD:EE:FF';
            output = `Sending deauth packets to ${bssid}...\n` +
              `17:30:45  Waiting for beacon frame (BSSID: ${bssid}) on channel 11\n` +
              `17:30:46  Sending 30 directed DeAuth (code 7). BSSID: [${bssid}] 30.30.30.30.30.30\n` +
              `17:30:47  Deauth packets sent successfully!\n` +
              `Clients disconnected from target AP.`;
          } else if (cmd.startsWith('nmap')) {
            output = 'Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-15 07:30 UTC\n' +
              'Nmap scan report for 192.168.1.0/24\n' +
              'Host is up (0.001s latency).\n' +
              'Not shown: 997 closed ports\n' +
              'PORT     STATE SERVICE\n' +
              '22/tcp   open  ssh\n' +
              '80/tcp   open  http\n' +
              '443/tcp  open  https\n' +
              '\n' +
              'Nmap done: 256 IP addresses (4 hosts up) scanned in 2.34 seconds';
          } else if (cmd.startsWith('msfconsole')) {
            output = 'Metasploit Framework Console\n' +
              '       =[ metasploit v6.3.0-dev                          ]\n' +
              '+ -- --=[ 2291 exploits - 1208 auxiliary - 409 post       ]\n' +
              '+ -- --=[ 968 payloads - 45 encoders - 10 nops            ]\n' +
              '+ -- --=[ 8 evasion                                       ]\n' +
              '\n' +
              'msf6 > ';
          } else if (cmd === 'view captured' || cmd === 'analyze captured' || cmd === 'show captured') {
            if (mitmState.capturedPackets === 0) {
              output = 'No packets captured yet. Start sniffing first with: net.sniff on';
            } else {
              output = `Analyzing ${mitmState.capturedPackets} captured packets...\n` +
                `Found:\n` +
                `  - HTTP (Unencrypted) packets: 45\n` +
                `  - HTTPS (Encrypted) packets: 32\n` +
                `  - DNS queries: 28\n` +
                `  - Other protocols: 45\n` +
                `\n` +
                `Opening detailed analysis view...\n` +
                `Type 'view captured' again to see the full report.`;
              setShowCapturedDataModal(true);
            }
          } else {
            output = `Command not found: ${cmdParts[0]}\n` +
              `Type 'help' for a list of available commands.`;
          }
      }
      
      if (output) {
        setTerminalHistory(prev => [...prev, { type: 'output', text: output }]);
      }
    }, 500);
    setTerminalCommand('');
  };


  const getBatteryIcon = (level) => {
    if (level > 75) return FaBatteryFull;
    if (level > 50) return FaBatteryThreeQuarters;
    if (level > 25) return FaBatteryHalf;
    if (level > 10) return FaBatteryQuarter;
    return FaBatteryEmpty;
  };

  useEffect(() => {
    if (isPowered && isConnected) {
      const interval = setInterval(() => {
        const newBattery = Math.max(0, battery - 1);
        dispatch({
          type: 'UPDATE_DEVICE_BATTERY',
          payload: {
            device: 'laptop',
            battery: newBattery
          }
        });
        
        // Auto-shutdown when battery reaches 0%
        if (newBattery === 0 && battery > 0) {
          setTimeout(() => {
            dispatch({
              type: 'POWER_DEVICE',
              payload: {
                device: 'laptop',
                powered: false
              }
            });
            alert('⚠️ Laptop battery depleted! The laptop has automatically shut down. Please charge it to continue.');
          }, 1000);
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isPowered, isConnected, battery, dispatch]);

  const chargeBattery = () => {
    if (battery < 100) {
      dispatch({
        type: 'UPDATE_DEVICE_BATTERY',
        payload: {
          device: 'laptop',
          battery: 100
        }
      });
      alert('🔌 Laptop battery fully charged!');
    } else {
      alert('Battery is already at 100%');
    }
  };

  if (!isPowered) {
    return (
      <LaptopWrapper>
        <LaptopFrame>
          <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
            <FaPowerOff style={{ fontSize: '3rem', marginBottom: '20px' }} />
            <h4>Laptop is powered off</h4>
            <p>Battery: {battery}%</p>
            {battery < 20 && (
              <p style={{ color: '#ff0040', marginTop: '10px' }}>
                ⚠️ Low battery! Consider charging before powering on.
              </p>
            )}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
              <button
                onClick={chargeBattery}
                style={{
                  background: 'linear-gradient(45deg, #00ffff, #0088cc)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  color: '#000',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                🔌 Charge Battery
              </button>
              <button
                onClick={handlePowerToggle}
                style={{
                  background: 'linear-gradient(45deg, #00ff41, #00cc33)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  color: '#000',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Power On
              </button>
            </div>
          </div>
        </LaptopFrame>
      </LaptopWrapper>
    );
  }

  const renderWindowContent = (app) => {
    switch (app.id) {
      case 'explorer':
        return (
          <WindowContent>
            <h3>File Explorer</h3>
            <p>This PC</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px', cursor: 'pointer' }}>📁 Documents</li>
              <li style={{ padding: '8px', cursor: 'pointer' }}>📁 Downloads</li>
              <li style={{ padding: '8px', cursor: 'pointer' }}>📁 Pictures</li>
              <li style={{ padding: '8px', cursor: 'pointer' }}>📁 Videos</li>
              <li style={{ padding: '8px', cursor: 'pointer' }}>📁 Music</li>
            </ul>
          </WindowContent>
        );
      case 'browser':
        return (
          <WindowContent>
            <h3>Browser</h3>
            <p>Welcome to the web browser</p>
            <input type="text" placeholder="Enter URL..." style={{ width: '100%', padding: '8px', marginTop: '10px' }} />
          </WindowContent>
        );
      case 'terminal':
        return (
          <WindowContent style={{ background: '#000', color: '#00ff41', fontFamily: 'monospace', padding: '10px', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div 
              ref={terminalScrollRef}
              style={{ 
                marginBottom: '10px', 
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingRight: '5px'
              }}
            >
              {terminalHistory.map((line, index) => (
                <div 
                  key={index} 
                  style={{ 
                    color: line.type === 'command' ? '#00ff41' : line.type === 'output' ? '#00ffff' : line.type === 'error' ? '#ff0040' : '#888', 
                    marginBottom: '2px',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontFamily: 'Share Tech Mono, monospace',
                    fontSize: '13px',
                    lineHeight: '1.4'
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: '#00ff41' }}>kali@hacker-laptop:~$</span>
              <input
                type="text"
                value={terminalCommand}
                onChange={(e) => setTerminalCommand(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleTerminalCommand(terminalCommand);
                  }
                }}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#00ff41', 
                  outline: 'none',
                  flex: 1,
                  fontFamily: 'monospace'
                }}
                autoFocus
              />
            </div>
          </WindowContent>
        );
      case 'settings':
        return (
          <WindowContent>
            <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
              <div style={{ width: '200px', borderRight: '1px solid #ddd', paddingRight: '10px' }}>
                <h3>Settings</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li 
                    style={{ padding: '10px', cursor: 'pointer', background: settingsCategory === 'display' ? '#e0e0e0' : 'transparent' }}
                    onClick={() => setSettingsCategory('display')}
                  >
                    Display
                  </li>
                  <li 
                    style={{ padding: '10px', cursor: 'pointer', background: settingsCategory === 'sound' ? '#e0e0e0' : 'transparent' }}
                    onClick={() => setSettingsCategory('sound')}
                  >
                    Sound
                  </li>
                  <li 
                    style={{ padding: '10px', cursor: 'pointer', background: settingsCategory === 'network' ? '#e0e0e0' : 'transparent' }}
                    onClick={() => setSettingsCategory('network')}
                  >
                    Network
                  </li>
                  <li 
                    style={{ padding: '10px', cursor: 'pointer', background: settingsCategory === 'privacy' ? '#e0e0e0' : 'transparent' }}
                    onClick={() => setSettingsCategory('privacy')}
                  >
                    Privacy
                  </li>
                </ul>
              </div>
              <div style={{ flex: 1, padding: '20px' }}>
                {settingsCategory === 'display' && (
                  <div>
                    <h4>Display Settings</h4>
                    <p>Resolution: 1920x1080</p>
                    <p>Brightness: <input type="range" min="0" max="100" defaultValue="80" /></p>
                  </div>
                )}
                {settingsCategory === 'sound' && (
                  <div>
                    <h4>Sound Settings</h4>
                    <p>Volume: <input type="range" min="0" max="100" defaultValue="50" /></p>
                    <p>Output Device: Speakers</p>
                  </div>
                )}
                {settingsCategory === 'network' && (
                  <div>
                    <h4>Network Settings</h4>
                    <p>WiFi: {isConnected ? 'Connected' : 'Disconnected'}</p>
                    <p>Ethernet: Available</p>
                  </div>
                )}
                {settingsCategory === 'privacy' && (
                  <div>
                    <h4>Privacy Settings</h4>
                    <p>Location Services: <input type="checkbox" defaultChecked /></p>
                    <p>Camera Access: <input type="checkbox" defaultChecked /></p>
                  </div>
                )}
                {!settingsCategory && (
                  <div>
                    <h4>System Settings</h4>
                    <p>Select a category from the left to configure settings.</p>
                  </div>
                )}
              </div>
            </div>
          </WindowContent>
        );
      case 'calculator':
        const handleCalcInput = (input) => {
          if (input === 'C') {
            setCalcDisplay('0');
            setCalcValue(null);
            setCalcOperation(null);
          } else if (['+', '-', '*', '/'].includes(input)) {
            if (calcValue === null) {
              setCalcValue(parseFloat(calcDisplay));
            } else if (calcOperation) {
              const result = calculate(calcValue, parseFloat(calcDisplay), calcOperation);
              setCalcValue(result);
              setCalcDisplay(String(result));
            }
            setCalcOperation(input);
            setCalcDisplay('0');
          } else if (input === '=') {
            if (calcValue !== null && calcOperation) {
              const result = calculate(calcValue, parseFloat(calcDisplay), calcOperation);
              setCalcDisplay(String(result));
              setCalcValue(null);
              setCalcOperation(null);
            }
          } else {
            setCalcDisplay(prev => prev === '0' ? input : prev + input);
          }
        };
        
        const calculate = (a, b, op) => {
          switch(op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : 0;
            default: return b;
          }
        };
        
        return (
          <WindowContent style={{ padding: '20px', background: '#1a1a1a' }}>
            <div style={{ 
              background: '#000', 
              padding: '20px', 
              borderRadius: '8px',
              marginBottom: '15px',
              textAlign: 'right',
              fontSize: '32px',
              color: '#00ff41',
              fontFamily: 'monospace',
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
              {calcDisplay}
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '10px' 
            }}>
              {[
                { label: 'C', colSpan: 1, rowSpan: 1 },
                { label: '/', colSpan: 1, rowSpan: 1 },
                { label: '*', colSpan: 1, rowSpan: 1 },
                { label: '-', colSpan: 1, rowSpan: 1 },
                { label: '7', colSpan: 1, rowSpan: 1 },
                { label: '8', colSpan: 1, rowSpan: 1 },
                { label: '9', colSpan: 1, rowSpan: 1 },
                { label: '+', colSpan: 1, rowSpan: 2 },
                { label: '4', colSpan: 1, rowSpan: 1 },
                { label: '5', colSpan: 1, rowSpan: 1 },
                { label: '6', colSpan: 1, rowSpan: 1 },
                { label: '1', colSpan: 1, rowSpan: 1 },
                { label: '2', colSpan: 1, rowSpan: 1 },
                { label: '3', colSpan: 1, rowSpan: 1 },
                { label: '=', colSpan: 1, rowSpan: 2 },
                { label: '0', colSpan: 2, rowSpan: 1 },
                { label: '.', colSpan: 1, rowSpan: 1 }
              ].map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCalcInput(btn.label)}
                  style={{
                    gridColumn: `span ${btn.colSpan}`,
                    gridRow: `span ${btn.rowSpan}`,
                    padding: '15px',
                    fontSize: '18px',
                    background: ['+', '-', '*', '/', '='].includes(btn.label) ? '#ff6600' : '#333',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = ['+', '-', '*', '/', '='].includes(btn.label) ? '#ff7700' : '#444'}
                  onMouseLeave={(e) => e.target.style.background = ['+', '-', '*', '/', '='].includes(btn.label) ? '#ff6600' : '#333'}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </WindowContent>
        );
      case 'paint':
        return (
          <WindowContent style={{ padding: '10px' }}>
            <div style={{ 
              background: '#fff', 
              width: '100%', 
              height: '400px', 
              border: '2px solid #ddd',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#888'
            }}>
            <p>Canvas Area - Paint tools coming soon</p>
          </div>
          </WindowContent>
        );
      case 'notepad':
        return (
          <WindowContent style={{ padding: '10px', height: '100%' }}>
            <textarea
              value={notepadText}
              onChange={(e) => setNotepadText(e.target.value)}
              placeholder="Start typing..."
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                outline: 'none',
                fontFamily: 'monospace',
                fontSize: '14px',
                padding: '10px',
                background: '#fff',
                resize: 'none'
              }}
            />
          </WindowContent>
        );
      case 'downloads':
        return (
          <WindowContent style={{ padding: '20px' }}>
            <h3>Downloads</h3>
            <div style={{ marginTop: '15px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
                gap: '15px' 
              }}>
                {[
                  { name: 'document.pdf', icon: '📄', size: '2.3 MB', date: 'Today' },
                  { name: 'image.jpg', icon: '🖼️', size: '1.5 MB', date: 'Yesterday' },
                  { name: 'video.mp4', icon: '🎥', size: '45.2 MB', date: '2 days ago' },
                  { name: 'archive.zip', icon: '📦', size: '12.8 MB', date: '3 days ago' },
                  { name: 'presentation.pptx', icon: '📊', size: '5.1 MB', date: 'Last week' },
                  { name: 'music.mp3', icon: '🎵', size: '3.4 MB', date: 'Last week' }
                ].map((file, idx) => (
                  <div 
                    key={idx}
                    style={{ 
                      padding: '15px', 
                      border: '1px solid #ddd', 
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      background: '#fff'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f0f0f0';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#fff';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{file.icon}</div>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', wordBreak: 'break-word' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: '10px', color: '#666', marginBottom: '2px' }}>
                      {file.size}
                    </div>
                    <div style={{ fontSize: '10px', color: '#999' }}>
                      {file.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WindowContent>
        );
      case 'email':
        return (
          <WindowContent style={{ padding: '20px' }}>
            <h3>Inbox</h3>
            <div style={{ marginTop: '15px' }}>
              <div style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}>
                <strong>Welcome Email</strong>
                <p style={{ margin: '5px 0', color: '#666' }}>Welcome to your new laptop!</p>
              </div>
            </div>
          </WindowContent>
        );
      case 'calendar':
        return (
          <WindowContent style={{ padding: '20px' }}>
            <h3>Calendar</h3>
            <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', padding: '5px' }}>{day}</div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} style={{ 
                  padding: '10px', 
                  textAlign: 'center', 
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: i === new Date().getDate() - 1 ? '#e3f2fd' : '#fff'
                }}>
                  {i < 31 ? i + 1 : ''}
                </div>
              ))}
            </div>
          </WindowContent>
        );
      case 'clock':
        return (
          <WindowContent style={{ padding: '20px', textAlign: 'center' }}>
            <h3>Clock</h3>
            <div style={{ fontSize: '48px', marginTop: '20px', fontFamily: 'monospace' }}>
              {new Date().toLocaleTimeString()}
            </div>
            <div style={{ fontSize: '24px', marginTop: '10px' }}>
              {new Date().toLocaleDateString()}
            </div>
          </WindowContent>
        );
      case 'reminder':
        return (
          <WindowContent style={{ padding: '20px' }}>
            <h3>Reminders</h3>
            <div style={{ marginTop: '15px' }}>
              {[
                { title: 'Team Meeting', time: '2:00 PM', date: 'Today', completed: false },
                { title: 'Submit Report', time: '5:00 PM', date: 'Today', completed: false },
                { title: 'Call Client', time: '10:00 AM', date: 'Tomorrow', completed: false },
                { title: 'Review Documents', time: '3:30 PM', date: 'Tomorrow', completed: true }
              ].map((reminder, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    padding: '12px', 
                    marginBottom: '10px',
                    border: '1px solid #ddd', 
                    borderRadius: '6px',
                    background: reminder.completed ? '#f0f0f0' : '#fff',
                    opacity: reminder.completed ? 0.6 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="checkbox" 
                      checked={reminder.completed}
                      onChange={() => {}}
                      style={{ cursor: 'pointer' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                        {reminder.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {reminder.time} • {reminder.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </WindowContent>
        );
      case 'meeting':
        return (
          <WindowContent style={{ padding: '20px' }}>
            <h3>Meetings</h3>
            <div style={{ marginTop: '15px' }}>
              {[
                { title: 'Team Standup', time: '9:00 AM', date: 'Today', participants: 5, status: 'upcoming' },
                { title: 'Project Review', time: '2:00 PM', date: 'Today', participants: 8, status: 'upcoming' },
                { title: 'Client Presentation', time: '11:00 AM', date: 'Tomorrow', participants: 12, status: 'scheduled' },
                { title: 'Weekly Sync', time: '3:00 PM', date: 'Yesterday', participants: 6, status: 'completed' }
              ].map((meeting, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    padding: '15px', 
                    marginBottom: '12px',
                    border: '1px solid #ddd', 
                    borderRadius: '8px',
                    background: meeting.status === 'completed' ? '#f0f0f0' : '#fff',
                    opacity: meeting.status === 'completed' ? 0.6 : 1
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                        {meeting.title}
                      </div>
                      <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                        {meeting.time} • {meeting.date}
                      </div>
                      <div style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaUsersIcon /> {meeting.participants} participants
                      </div>
                    </div>
                    <div style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      background: meeting.status === 'upcoming' ? '#e3f2fd' : 
                                  meeting.status === 'scheduled' ? '#fff3e0' : '#e8f5e9',
                      color: meeting.status === 'upcoming' ? '#1976d2' : 
                             meeting.status === 'scheduled' ? '#f57c00' : '#388e3c'
                    }}>
                      {meeting.status.toUpperCase()}
                    </div>
                  </div>
                  {meeting.status === 'upcoming' && (
                    <button style={{
                      width: '100%',
                      padding: '8px',
                      marginTop: '8px',
                      background: '#0078d4',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}>
                      Join Meeting
                    </button>
                  )}
                </div>
              ))}
            </div>
          </WindowContent>
        );
      default:
        return (
          <WindowContent>
            <h3>{app.name}</h3>
            <p>Application content for {app.name}</p>
          </WindowContent>
        );
    }
  };

  return (
    <LaptopWrapper>
      <LaptopFrame>
        <ScreenBezel>
          <LaptopScreen>
            <Desktop onClick={() => setShowStartMenu(false)}>
              <DesktopIcons onClick={(e) => e.stopPropagation()}>
                {desktopApps.map((app) => (
                  <DesktopIcon
                    key={app.id}
                    onClick={() => openApp(app)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconImage style={{ background: app.color }}>
                      <app.icon />
                    </IconImage>
                    <IconLabel>{app.name}</IconLabel>
                  </DesktopIcon>
                ))}
              </DesktopIcons>

              <AnimatePresence>
                {openWindows.map((window) => {
                  const state = windowStates[window.id] || { minimized: false, maximized: false };
                  return (
                    <Window
                      key={window.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: state.minimized ? 0 : 1, 
                        scale: state.minimized ? 0.8 : 1,
                        x: state.maximized ? 0 : window.x,
                        y: state.maximized ? 0 : window.y
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      drag={!state.maximized}
                      dragMomentum={false}
                      $minimized={state.minimized}
                      $maximized={state.maximized}
                      $selected={selectedApp === window.id}
                      onClick={() => setSelectedApp(window.id)}
                    >
                      <WindowHeader>
                        <WindowTitle>
                          <window.icon />
                          {window.name}
                        </WindowTitle>
                        <WindowControls>
                          <WindowButton onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}>
                            <FaMinus />
                          </WindowButton>
                          <WindowButton onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}>
                            <FaSquare />
                          </WindowButton>
                          <WindowButton onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}>
                            <FaTimes />
                          </WindowButton>
                        </WindowControls>
                      </WindowHeader>
                      {!state.minimized && renderWindowContent(window)}
                    </Window>
                  );
                })}
              </AnimatePresence>

              <Taskbar>
                <StartButton 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowStartMenu(!showStartMenu);
                  }}
                >
                  <FaWindows />
                  Start
                </StartButton>
                
                <AnimatePresence>
                  {showStartMenu && (
                    <StartMenu
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <StartMenuHeader>
                        <StartMenuTitle>
                          <FaWindows />
                          Applications
                        </StartMenuTitle>
                      </StartMenuHeader>
                      <StartMenuApps>
                        {startMenuApps.map((app) => (
                          <StartMenuItem
                            key={app.id}
                            onClick={() => {
                              const appToOpen = desktopApps.find(a => a.id === app.id) || app;
                              openApp(appToOpen);
                              setShowStartMenu(false);
                            }}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <StartMenuIcon $color={app.color}>
                              <app.icon />
                            </StartMenuIcon>
                            <StartMenuLabel>{app.name}</StartMenuLabel>
                          </StartMenuItem>
                        ))}
                      </StartMenuApps>
                    </StartMenu>
                  )}
                </AnimatePresence>
                {openWindows.map((window) => {
                  const state = windowStates[window.id] || { minimized: false, maximized: false };
                  return (
                    <TaskbarIcon
                      key={window.id}
                      onClick={() => {
                        if (state.minimized) {
                          setWindowStates({ ...windowStates, [window.id]: { ...state, minimized: false } });
                        }
                        setSelectedApp(window.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      style={{ 
                        background: selectedApp === window.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                        borderBottom: selectedApp === window.id ? '2px solid #fff' : 'none'
                      }}
                      title={window.name}
                    >
                      <window.icon />
                    </TaskbarIcon>
                  );
                })}
                <SystemTray>
                  <StatusItem active={isConnected}>
                    <StatusDot active={isConnected} />
                    {isConnected ? <FaWifi /> : <FaEthernet />}
                  </StatusItem>
                  <BatteryIcon level={battery}>
                    {React.createElement(getBatteryIcon(battery))}
                  </BatteryIcon>
                  <span 
                    style={{ 
                      color: battery < 20 ? '#ff0040' : battery < 50 ? '#ffaa00' : '#00ff41',
                      cursor: 'pointer',
                      fontWeight: battery < 20 ? 'bold' : 'normal'
                    }}
                    onClick={chargeBattery}
                    title="Click to charge battery to 100%"
                  >
                    {battery}%
                  </span>
                  {battery < 20 && (
                    <span style={{ color: '#ff0040', fontSize: '10px', fontWeight: 'bold' }}>⚠️</span>
                  )}
                  <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </SystemTray>
              </Taskbar>
            </Desktop>
          </LaptopScreen>
        </ScreenBezel>
        <KeyboardArea>
          {/* Row 1: Function Keys */}
          <KeyboardRow>
            <Key width="40px" height="30px">Esc</Key>
            <Key width="34px" height="30px">F1</Key>
            <Key width="34px" height="30px">F2</Key>
            <Key width="34px" height="30px">F3</Key>
            <Key width="34px" height="30px">F4</Key>
            <Key width="34px" height="30px">F5</Key>
            <Key width="34px" height="30px">F6</Key>
            <Key width="34px" height="30px">F7</Key>
            <Key width="34px" height="30px">F8</Key>
            <Key width="34px" height="30px">F9</Key>
            <Key width="34px" height="30px">F10</Key>
            <Key width="34px" height="30px">F11</Key>
            <Key width="34px" height="30px">F12</Key>
          </KeyboardRow>

          {/* Row 2: Number Row */}
          <KeyboardRow>
            <Key width="40px" height="30px">`</Key>
            <Key width="34px" height="30px">1</Key>
            <Key width="34px" height="30px">2</Key>
            <Key width="34px" height="30px">3</Key>
            <Key width="34px" height="30px">4</Key>
            <Key width="34px" height="30px">5</Key>
            <Key width="34px" height="30px">6</Key>
            <Key width="34px" height="30px">7</Key>
            <Key width="34px" height="30px">8</Key>
            <Key width="34px" height="30px">9</Key>
            <Key width="34px" height="30px">0</Key>
            <Key width="34px" height="30px">-</Key>
            <Key width="34px" height="30px">=</Key>
            <Key width="90px" height="30px">Backspace</Key>
            <Key width="50px" height="30px">Home</Key>
            <Key width="50px" height="30px">PgUp</Key>
            <Key width="40px" height="30px">Num</Key>
            <Key width="40px" height="30px">/</Key>
            <Key width="40px" height="30px">*</Key>
            <Key width="40px" height="30px">-</Key>
          </KeyboardRow>

          {/* Row 3: QWERTY Row */}
          <KeyboardRow>
            <Key width="70px" height="30px">Tab</Key>
            <Key width="34px" height="30px">Q</Key>
            <Key width="34px" height="30px">W</Key>
            <Key width="34px" height="30px">E</Key>
            <Key width="34px" height="30px">R</Key>
            <Key width="34px" height="30px">T</Key>
            <Key width="34px" height="30px">Y</Key>
            <Key width="34px" height="30px">U</Key>
            <Key width="34px" height="30px">I</Key>
            <Key width="34px" height="30px">O</Key>
            <Key width="34px" height="30px">P</Key>
            <Key width="34px" height="30px">[</Key>
            <Key width="34px" height="30px">]</Key>
            <Key width="50px" height="30px">\</Key>
            <Key width="50px" height="30px">PgDn</Key>
            <Key width="50px" height="30px">End</Key>
            <Key width="40px" height="30px">7</Key>
            <Key width="40px" height="30px">8</Key>
            <Key width="40px" height="30px">9</Key>
            <Key width="40px" height="30px">+</Key>
          </KeyboardRow>

          {/* Row 4: ASDF Row */}
          <KeyboardRow>
            <Key width="85px" height="30px">Caps</Key>
            <Key width="34px" height="30px">A</Key>
            <Key width="34px" height="30px">S</Key>
            <Key width="34px" height="30px">D</Key>
            <Key width="34px" height="30px">F</Key>
            <Key width="34px" height="30px">G</Key>
            <Key width="34px" height="30px">H</Key>
            <Key width="34px" height="30px">J</Key>
            <Key width="34px" height="30px">K</Key>
            <Key width="34px" height="30px">L</Key>
            <Key width="34px" height="30px">;</Key>
            <Key width="34px" height="30px">'</Key>
            <Key width="90px" height="30px">Enter</Key>
            <Key width="50px" height="30px">↓</Key>
            <Key width="50px" height="30px">→</Key>
            <Key width="40px" height="30px">4</Key>
            <Key width="40px" height="30px">5</Key>
            <Key width="40px" height="30px">6</Key>
          </KeyboardRow>
          
          {/* Row 4.5: Arrow/Numpad Continuation */}
          <KeyboardRow>
            <div style={{ width: '85px' }}></div>
            <div style={{ width: '34px' }}></div>
            <div style={{ width: '34px' }}></div>
            <div style={{ width: '34px' }}></div>
            <div style={{ width: '34px' }}></div>
            <div style={{ width: '34px' }}></div>
            <div style={{ width: '34px' }}></div>
            <div style={{ width: '34px' }}></div>
            <div style={{ width: '34px' }}></div>
            <div style={{ width: '34px' }}></div>
            <div style={{ width: '34px' }}></div>
            <div style={{ width: '34px' }}></div>
            <div style={{ width: '90px' }}></div>
            <Key width="50px" height="30px">←</Key>
            <div style={{ width: '50px' }}></div>
            <Key width="40px" height="30px">1</Key>
            <Key width="40px" height="30px">2</Key>
            <Key width="40px" height="30px">3</Key>
            <Key width="40px" height="30px">Enter</Key>
          </KeyboardRow>

          {/* Row 5: ZXCV Row */}
          <KeyboardRow>
            <Key width="105px" height="30px">Shift</Key>
            <Key width="34px" height="30px">Z</Key>
            <Key width="34px" height="30px">X</Key>
            <Key width="34px" height="30px">C</Key>
            <Key width="34px" height="30px">V</Key>
            <Key width="34px" height="30px">B</Key>
            <Key width="34px" height="30px">N</Key>
            <Key width="34px" height="30px">M</Key>
            <Key width="34px" height="30px">,</Key>
            <Key width="34px" height="30px">.</Key>
            <Key width="34px" height="30px">/</Key>
            <Key width="115px" height="30px">Shift</Key>
          </KeyboardRow>

          {/* Row 6: Bottom Row */}
          <KeyboardRow>
            <Key width="60px" height="30px">Ctrl</Key>
            <Key width="50px" height="30px">Fn</Key>
            <Key width="50px" height="30px">⊞</Key>
            <Key width="60px" height="30px">Alt</Key>
            <SpaceBar height="30px" />
            <Key width="60px" height="30px">Alt</Key>
            <Key width="50px" height="30px">☰</Key>
            <Key width="60px" height="30px">Ctrl</Key>
            <Key width="88px" height="30px">0</Key>
            <Key width="40px" height="30px">.</Key>
          </KeyboardRow>
        </KeyboardArea>
      </LaptopFrame>

      {/* Captured Data Modal */}
      <AnimatePresence>
        {showCapturedDataModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCapturedDataModal(false)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>
                  <FaNetworkWired />
                  Captured Network Traffic Analysis
                </ModalTitle>
                <ModalCloseButton onClick={() => setShowCapturedDataModal(false)}>
                  <FaTimes />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <InfoBox>
                  <FaInfoCircle style={{ color: '#00aaff', marginTop: '3px' }} />
                  <InfoText>
                    <strong style={{ color: '#00aaff' }}>Analysis Summary:</strong> This shows what an attacker can see during a Man-in-the-Middle attack. 
                    HTTP traffic (unencrypted) reveals everything, while HTTPS traffic (encrypted) only shows metadata.
                  </InfoText>
                </InfoBox>

                {/* Unencrypted HTTP Data */}
                <DataSection>
                  <SectionHeader $encrypted={false}>
                    <FaLock style={{ color: '#ff0040' }} />
                    <SectionTitle $encrypted={false}>HTTP (Unencrypted) - FULLY VISIBLE</SectionTitle>
                  </SectionHeader>
                  
                  <DataCard $encrypted={false}>
                    <DataRow>
                      <DataLabel>Source IP:</DataLabel>
                      <DataValue>192.168.1.2</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Destination:</DataLabel>
                      <DataValue>http://example.com/login</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Method:</DataLabel>
                      <DataValue>POST</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Username:</DataLabel>
                      <DataValue $highlight>john.doe@email.com</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Password:</DataLabel>
                      <DataValue $danger>MyPassword123!</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Cookies:</DataLabel>
                      <DataValue>session_id=abc123xyz; user_pref=dark_mode</DataValue>
                    </DataRow>
                  </DataCard>

                  <DataCard $encrypted={false}>
                    <DataRow>
                      <DataLabel>Source IP:</DataLabel>
                      <DataValue>192.168.1.3</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Destination:</DataLabel>
                      <DataValue>http://shopping-site.com/checkout</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Method:</DataLabel>
                      <DataValue>POST</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Credit Card:</DataLabel>
                      <DataValue $danger>4532-1234-5678-9010</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>CVV:</DataLabel>
                      <DataValue $danger>123</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Name on Card:</DataLabel>
                      <DataValue>Jane Smith</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Billing Address:</DataLabel>
                      <DataValue>123 Main St, City, State 12345</DataValue>
                    </DataRow>
                  </DataCard>

                  <DataCard $encrypted={false}>
                    <DataRow>
                      <DataLabel>Source IP:</DataLabel>
                      <DataValue>192.168.1.4</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Destination:</DataLabel>
                      <DataValue>http://search-engine.com/search</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Search Query:</DataLabel>
                      <DataValue $highlight>how to reset password</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>User Agent:</DataLabel>
                      <DataValue>Mozilla/5.0 (Windows NT 10.0; Win64; x64)</DataValue>
                    </DataRow>
                  </DataCard>

                  <DataCard $encrypted={false}>
                    <DataRow>
                      <DataLabel>Source IP:</DataLabel>
                      <DataValue>192.168.1.2</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Destination:</DataLabel>
                      <DataValue>http://social-media.com/api/status</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Post Content:</DataLabel>
                      <DataValue>"Just got a promotion! So excited! 🎉"</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Location:</DataLabel>
                      <DataValue>Lat: 40.7128, Lon: -74.0060 (New York)</DataValue>
                    </DataRow>
                  </DataCard>
                </DataSection>

                {/* Encrypted HTTPS Data */}
                <DataSection>
                  <SectionHeader $encrypted={true}>
                    <FaLockIcon style={{ color: '#ffaa00' }} />
                    <SectionTitle $encrypted={true}>HTTPS (Encrypted) - METADATA ONLY</SectionTitle>
                  </SectionHeader>

                  <WarningBox>
                    <FaExclamationTriangle style={{ color: '#ffaa00', marginTop: '3px' }} />
                    <InfoText>
                      <strong style={{ color: '#ffaa00' }}>Encrypted Traffic:</strong> The actual data is encrypted and cannot be read. 
                      However, metadata (destination, timing, packet size) can still reveal information about user behavior.
                    </InfoText>
                  </WarningBox>

                  <DataCard $encrypted={true}>
                    <DataRow>
                      <DataLabel>Source IP:</DataLabel>
                      <DataValue>192.168.1.2</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Destination:</DataLabel>
                      <DataValue>https://banking-site.com</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Protocol:</DataLabel>
                      <DataValue>TLS 1.3 (Encrypted)</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Packet Size:</DataLabel>
                      <DataValue>1,234 bytes</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Timing:</DataLabel>
                      <DataValue>2024-01-15 14:32:15</DataValue>
                    </DataRow>
                    <EncryptedData>
                      🔒 ENCRYPTED DATA - Cannot be read without decryption key
                      <br />
                      (Actual login credentials, account numbers, and transactions are protected)
                    </EncryptedData>
                  </DataCard>

                  <DataCard $encrypted={true}>
                    <DataRow>
                      <DataLabel>Source IP:</DataLabel>
                      <DataValue>192.168.1.3</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Destination:</DataLabel>
                      <DataValue>https://email-service.com</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Protocol:</DataLabel>
                      <DataValue>TLS 1.3 (Encrypted)</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Packet Size:</DataLabel>
                      <DataValue>5,678 bytes (likely email content)</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Timing:</DataLabel>
                      <DataValue>2024-01-15 14:33:22</DataValue>
                    </DataRow>
                    <EncryptedData>
                      🔒 ENCRYPTED DATA - Email content, attachments, and metadata are protected
                    </EncryptedData>
                  </DataCard>

                  <DataCard $encrypted={true}>
                    <DataRow>
                      <DataLabel>Source IP:</DataLabel>
                      <DataValue>192.168.1.4</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Destination:</DataLabel>
                      <DataValue>https://healthcare-portal.com</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Protocol:</DataLabel>
                      <DataValue>TLS 1.3 (Encrypted)</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Packet Size:</DataLabel>
                      <DataValue>12,345 bytes (likely medical records)</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Timing:</DataLabel>
                      <DataValue>2024-01-15 14:34:10</DataValue>
                    </DataRow>
                    <EncryptedData>
                      🔒 ENCRYPTED DATA - Medical records, personal information, and health data are protected
                    </EncryptedData>
                  </DataCard>
                </DataSection>

                {/* DNS Queries */}
                <DataSection>
                  <SectionHeader $encrypted={false}>
                    <FaNetworkWired style={{ color: '#00aaff' }} />
                    <SectionTitle $encrypted={false}>DNS Queries - Domain Names Visible</SectionTitle>
                  </SectionHeader>

                  <DataCard $encrypted={false}>
                    <DataRow>
                      <DataLabel>Query:</DataLabel>
                      <DataValue>banking-site.com</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Resolved IP:</DataLabel>
                      <DataValue>203.0.113.42</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Source IP:</DataLabel>
                      <DataValue>192.168.1.2</DataValue>
                    </DataRow>
                  </DataCard>

                  <DataCard $encrypted={false}>
                    <DataRow>
                      <DataLabel>Query:</DataLabel>
                      <DataValue>dating-app.com</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Resolved IP:</DataLabel>
                      <DataValue>198.51.100.15</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Source IP:</DataLabel>
                      <DataValue>192.168.1.3</DataValue>
                    </DataRow>
                  </DataCard>

                  <DataCard $encrypted={false}>
                    <DataRow>
                      <DataLabel>Query:</DataLabel>
                      <DataValue>job-search-site.com</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Resolved IP:</DataLabel>
                      <DataValue>192.0.2.78</DataValue>
                    </DataRow>
                    <DataRow>
                      <DataLabel>Source IP:</DataLabel>
                      <DataValue>192.168.1.4</DataValue>
                    </DataRow>
                  </DataCard>
                </DataSection>

                <WarningBox>
                  <FaExclamationTriangle style={{ color: '#ffaa00', marginTop: '3px' }} />
                  <InfoText>
                    <strong style={{ color: '#ffaa00' }}>Key Takeaway:</strong> Always use HTTPS (the lock icon) when possible. 
                    HTTP traffic is completely visible to attackers, while HTTPS encrypts your data. However, even with HTTPS, 
                    DNS queries and metadata can still reveal what websites you visit and when.
                  </InfoText>
                </WarningBox>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </LaptopWrapper>
  );
};

export default LaptopInterface;

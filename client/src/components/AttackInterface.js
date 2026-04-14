import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Phone from './Phone';
import AndroidDevTerminal from './AndroidDevTerminal';
import TargetDevice from './TargetDevice';
import { useGame } from '../context/GameContext';
import { FaTimes, FaCrosshairs } from 'react-icons/fa';

const AttackContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
`;

const AttackSide = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: ${props => props.isLeft ? '2px solid #00ff41' : 'none'};
  padding: 20px;
  gap: 20px;
  overflow-y: auto;
  position: relative;
`;

const SideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const SideTitle = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
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
  font-size: 18px;

  &:hover {
    background: rgba(255, 0, 64, 0.1);
    transform: scale(1.1);
  }
`;

const PhoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
`;

const TerminalWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Divider = styled.div`
  width: 4px;
  background: linear-gradient(180deg, #00ff41, #00ffff);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: #00ff41;
    border-radius: 50%;
    box-shadow: 0 0 20px #00ff41;
  }
`;

const AttackStatus = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 0, 64, 0.9);
  border: 2px solid #ff0040;
  border-radius: 10px;
  padding: 15px 20px;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 0 30px rgba(255, 0, 64, 0.5);
`;

const AttackInterface = ({ targetDevice, onClose, terminalOnly = false }) => {
  const { gameState, dispatch } = useGame();
  const [targetDeviceState, setTargetDeviceState] = useState({
    ...targetDevice,
    compromised: false,
    accessLevel: 'none', // none, shell, root
    terminalOutput: []
  });

  const handleTerminalCommand = (command, isTargetTerminal = false) => {
    if (isTargetTerminal) {
      // Commands executed on target device
      const parts = command.trim().split(' ');
      const cmd = parts[0].toLowerCase();
      
      // Simulate attack commands
      if (cmd === 'exploit' || cmd === 'hack' || cmd === 'gain-access') {
        setTimeout(() => {
          const success = Math.random() > (targetDevice.security / 10);
          if (success) {
            setTargetDeviceState(prev => ({
              ...prev,
              compromised: true,
              accessLevel: 'shell'
            }));
          }
        }, 2000);
      }
    }
  };

  if (terminalOnly) {
    // Terminal-only mode - just show target device terminal
    return (
      <AttackContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <AttackSide 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          style={{ maxWidth: '1200px', width: '100%' }}
        >
          <SideHeader>
            <SideTitle style={{ color: targetDeviceState.compromised ? '#00ff41' : '#00ffff' }}>
              Terminal: {targetDevice.name}
            </SideTitle>
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
          </SideHeader>

          <TargetDevice
            device={targetDeviceState}
            onStateChange={setTargetDeviceState}
            onTerminalCommand={handleTerminalCommand}
            terminalOnly={true}
          />
        </AttackSide>
      </AttackContainer>
    );
  }

  return (
    <AttackContainer>
      <AttackStatus>
        <FaCrosshairs />
        ATTACKING: {targetDevice.name}
      </AttackStatus>

      {/* Your Device Side */}
      <AttackSide isLeft initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <SideHeader>
          <SideTitle>Your Device</SideTitle>
        </SideHeader>
        
        <PhoneWrapper>
          <div style={{ transform: 'scale(0.7)', transformOrigin: 'top center' }}>
            <Phone user={{ username: gameState.user?.username || 'hacker' }} />
          </div>
        </PhoneWrapper>

        <TerminalWrapper>
          <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
            <AndroidDevTerminal
              phoneConnected={gameState.phone.owned}
              phoneData={gameState.phone}
              gameState={gameState}
              dispatch={dispatch}
              isAttackMode={true}
              targetDevice={targetDevice}
            />
          </div>
        </TerminalWrapper>
      </AttackSide>

      <Divider />

      {/* Target Device Side */}
      <AttackSide initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <SideHeader>
          <SideTitle style={{ color: targetDeviceState.compromised ? '#00ff41' : '#ff0040' }}>
            {targetDeviceState.compromised ? '✓ COMPROMISED' : 'TARGET DEVICE'}
          </SideTitle>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </SideHeader>

        <TargetDevice
          device={targetDeviceState}
          onStateChange={setTargetDeviceState}
          onTerminalCommand={handleTerminalCommand}
        />
      </AttackSide>
    </AttackContainer>
  );
};

export default AttackInterface;


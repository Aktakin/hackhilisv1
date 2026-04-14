import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DeviceDiscovery from './DeviceDiscovery';
import AttackInterface from './AttackInterface';
import { FaCrosshairs, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ScenarioContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  padding: 20px;
`;

const ScenarioHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  position: relative;
`;

const BackButton = styled(motion.button)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: 2px solid #00ff41;
  color: #00ff41;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 65, 0.1);
    transform: translateY(-50%) translateX(-5px);
  }
`;

const ScenarioTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const ScenarioSubtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
`;

const AttackScenario = () => {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showAttackInterface, setShowAttackInterface] = useState(false);
  const [terminalOnly, setTerminalOnly] = useState(false);

  const handleDeviceSelected = (device, terminalOnlyMode = false) => {
    setSelectedDevice(device);
    setTerminalOnly(terminalOnlyMode);
    setShowAttackInterface(true);
  };

  const handleCloseAttack = () => {
    setShowAttackInterface(false);
    setSelectedDevice(null);
  };

  if (showAttackInterface && selectedDevice) {
    return (
      <ScenarioContainer>
        <AttackInterface
          targetDevice={selectedDevice}
          onClose={handleCloseAttack}
          terminalOnly={terminalOnly}
        />
      </ScenarioContainer>
    );
  }

  return (
    <ScenarioContainer>
      <ScenarioHeader>
        <BackButton
          onClick={() => navigate('/phone')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft />
          Back
        </BackButton>
        <ScenarioTitle>
          <FaCrosshairs />
          Attack Scenario
        </ScenarioTitle>
        <ScenarioSubtitle>
          Discover and attack devices in your network
        </ScenarioSubtitle>
      </ScenarioHeader>

      <DeviceDiscovery onDeviceSelected={handleDeviceSelected} />
    </ScenarioContainer>
  );
};

export default AttackScenario;


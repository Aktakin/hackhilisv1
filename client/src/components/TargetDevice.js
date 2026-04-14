import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AndroidDevTerminal from './AndroidDevTerminal';
import { 
  FaMobile, 
  FaLaptop, 
  FaTablet,
  FaBatteryFull,
  FaBatteryThreeQuarters,
  FaBatteryHalf,
  FaBatteryQuarter,
  FaBatteryEmpty,
  FaSignal,
  FaWifi,
  FaShieldAlt,
  FaExclamationTriangle,
  FaLock,
  FaUnlock
} from 'react-icons/fa';

const TargetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

const DeviceDisplay = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid ${props => props.compromised ? '#00ff41' : '#ff0040'};
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  position: relative;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DeviceIcon = styled.div`
  font-size: 5rem;
  color: ${props => props.compromised ? '#00ff41' : '#ff0040'};
  margin-bottom: 20px;
  filter: ${props => props.compromised ? 'drop-shadow(0 0 20px #00ff41)' : 'drop-shadow(0 0 20px #ff0040)'};
`;

const DeviceName = styled.h2`
  color: ${props => props.compromised ? '#00ff41' : '#ff0040'};
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  margin-bottom: 10px;
`;

const DeviceStatus = styled.div`
  color: ${props => props.compromised ? '#00ff41' : '#ffaa00'};
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const DeviceInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
`;

const InfoCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  border-radius: 10px;
  padding: 15px;
  text-align: left;
`;

const InfoLabel = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const InfoValue = styled.div`
  color: #00ff41;
  font-weight: bold;
  font-size: 1.1rem;
`;

const SecurityIndicator = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: ${props => 
    props.compromised ? 'rgba(0, 255, 65, 0.2)' : 'rgba(255, 0, 64, 0.2)'
  };
  border: 1px solid ${props => props.compromised ? '#00ff41' : '#ff0040'};
  border-radius: 8px;
  color: ${props => props.compromised ? '#00ff41' : '#ff0040'};
  font-weight: bold;
`;

const TerminalSection = styled.div`
  flex: 1;
  min-height: 400px;
`;

const TargetDevice = ({ device, onStateChange, onTerminalCommand, terminalOnly = false, isTutorialMode = false }) => {
  const [localDeviceState, setLocalDeviceState] = useState(device);

  const getBatteryIcon = (level) => {
    if (level > 75) return <FaBatteryFull />;
    if (level > 50) return <FaBatteryThreeQuarters />;
    if (level > 25) return <FaBatteryHalf />;
    if (level > 10) return <FaBatteryQuarter />;
    return <FaBatteryEmpty />;
  };

  const getDeviceIcon = () => {
    switch (device.type) {
      case 'Phone':
        return <FaMobile />;
      case 'Laptop':
        return <FaLaptop />;
      case 'Tablet':
      case 'TV':
        return <FaTablet />;
      default:
        return <FaMobile />;
    }
  };

  const handleTerminalCommand = (command) => {
    if (onTerminalCommand) {
      onTerminalCommand(command, true);
    }
    
    // Update device state based on commands
    const parts = command.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    
    if (cmd === 'exploit' || cmd === 'hack' || cmd === 'gain-access' || cmd.startsWith('exploit')) {
      setTimeout(() => {
        // In tutorial mode, always succeed
        const success = isTutorialMode ? true : Math.random() > (device.security / 10);
        if (success) {
          const newState = {
            ...localDeviceState,
            compromised: true,
            accessLevel: 'shell'
          };
          setLocalDeviceState(newState);
          if (onStateChange) {
            onStateChange(newState);
          }
        }
      }, 2000);
    }
    
    // Also handle bt exploit, hack-device, crack-pin in tutorial mode
    if (isTutorialMode && (cmd.startsWith('bt exploit') || cmd.startsWith('hack-device') || cmd === 'crack-pin')) {
      setTimeout(() => {
        const newState = {
          ...localDeviceState,
          compromised: true,
          accessLevel: 'shell'
        };
        setLocalDeviceState(newState);
        if (onStateChange) {
          onStateChange(newState);
        }
      }, 2000);
    }
  };

  return (
    <TargetContainer>
      {!terminalOnly && (
        <DeviceDisplay
          compromised={localDeviceState.compromised}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        <SecurityIndicator compromised={localDeviceState.compromised}>
          {localDeviceState.compromised ? (
            <>
              <FaUnlock />
              COMPROMISED
            </>
          ) : (
            <>
              <FaLock />
              SECURED
            </>
          )}
        </SecurityIndicator>

        <DeviceIcon compromised={localDeviceState.compromised}>
          {getDeviceIcon()}
        </DeviceIcon>

        <DeviceName compromised={localDeviceState.compromised}>
          {localDeviceState.name}
        </DeviceName>

        <DeviceStatus compromised={localDeviceState.compromised}>
          {localDeviceState.compromised ? (
            <>
              <FaUnlock />
              Access Granted
            </>
          ) : (
            <>
              <FaLock />
              Access Denied
            </>
          )}
        </DeviceStatus>

        <DeviceInfo>
          <InfoCard>
            <InfoLabel>OS Version</InfoLabel>
            <InfoValue>{localDeviceState.os}</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoLabel>Security Level</InfoLabel>
            <InfoValue>{localDeviceState.security}/10</InfoValue>
          </InfoCard>
          <InfoCard>
            <InfoLabel>Connection</InfoLabel>
            <InfoValue>{localDeviceState.method}</InfoValue>
          </InfoCard>
          {localDeviceState.battery !== null && (
            <InfoCard>
              <InfoLabel>Battery</InfoLabel>
              <InfoValue>
                {getBatteryIcon(localDeviceState.battery)}
                {' '}
                {localDeviceState.battery}%
              </InfoValue>
            </InfoCard>
          )}
          {localDeviceState.mac && (
            <InfoCard>
              <InfoLabel>MAC Address</InfoLabel>
              <InfoValue>{localDeviceState.mac}</InfoValue>
            </InfoCard>
          )}
          {localDeviceState.ip && (
            <InfoCard>
              <InfoLabel>IP Address</InfoLabel>
              <InfoValue>{localDeviceState.ip}</InfoValue>
            </InfoCard>
          )}
        </DeviceInfo>

        {localDeviceState.compromised && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(0, 255, 65, 0.1)',
              border: '1px solid #00ff41',
              borderRadius: '10px',
              color: '#00ff41',
              textAlign: 'center'
            }}
          >
            <FaShieldAlt style={{ fontSize: '2rem', marginBottom: '10px' }} />
            <div style={{ fontWeight: 'bold' }}>Device Compromised!</div>
            <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>
              Full access granted via terminal
            </div>
          </motion.div>
        )}
      </DeviceDisplay>
      )}

      <TerminalSection style={terminalOnly ? { minHeight: '80vh' } : {}}>
        <AndroidDevTerminal
          phoneConnected={true}
          phoneData={null}
          gameState={null}
          dispatch={null}
          isTargetTerminal={true}
          targetDevice={localDeviceState}
          onCommand={handleTerminalCommand}
        />
      </TerminalSection>
    </TargetContainer>
  );
};

export default TargetDevice;


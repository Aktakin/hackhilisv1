import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaWifi, FaBluetooth, FaNetworkWired, FaMobile, FaLaptop, FaTablet, FaTimes, FaCrosshairs, FaTerminal } from 'react-icons/fa';

const DiscoveryContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
`;

const DiscoveryHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const DiscoveryTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const DiscoverySubtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
`;

const ScanControls = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const ScanButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 10px;
  padding: 15px 30px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
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

const DevicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const DeviceCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid ${props => props.selected ? '#00ffff' : '#00ff41'};
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }

  ${props => props.selected && `
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.5);
  `}
`;

const DeviceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const DeviceIcon = styled.div`
  font-size: 2.5rem;
  color: #00ff41;
`;

const DeviceInfo = styled.div`
  flex: 1;
  margin-left: 15px;
`;

const DeviceName = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 5px;
`;

const DeviceType = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

const DeviceDetails = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #333;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const DetailLabel = styled.span`
  color: #888;
`;

const DetailValue = styled.span`
  color: #00ff41;
  font-weight: bold;
`;

const AttackButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff0040, #cc0033);
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #cc0033, #ff0040);
    box-shadow: 0 0 20px rgba(255, 0, 64, 0.5);
    transform: translateY(-2px);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusBadge = styled.div`
  background: ${props => 
    props.status === 'online' ? 'rgba(0, 255, 65, 0.2)' :
    props.status === 'vulnerable' ? 'rgba(255, 170, 0, 0.2)' :
    'rgba(255, 0, 64, 0.2)'
  };
  border: 1px solid ${props => 
    props.status === 'online' ? '#00ff41' :
    props.status === 'vulnerable' ? '#ffaa00' :
    '#ff0040'
  };
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 0.8rem;
  color: ${props => 
    props.status === 'online' ? '#00ff41' :
    props.status === 'vulnerable' ? '#ffaa00' :
    '#ff0040'
  };
  font-weight: bold;
`;

const DeviceDiscovery = ({ onDeviceSelected }) => {
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [scanType, setScanType] = useState('all');

  const scanForDevices = (type) => {
    setIsScanning(true);
    setScanType(type);
    setDevices([]);

    setTimeout(() => {
      const discoveredDevices = [];

      if (type === 'all' || type === 'bluetooth') {
        discoveredDevices.push(
          {
            id: 'bt-1',
            name: 'iPhone 13 Pro',
            type: 'Phone',
            icon: FaMobile,
            mac: 'AA:BB:CC:DD:EE:01',
            os: 'iOS 16.5',
            security: 8,
            status: 'online',
            method: 'bluetooth',
            signal: -45,
            battery: 78,
            model: 'iPhone13,2'
          },
          {
            id: 'bt-2',
            name: 'Samsung Galaxy S21',
            type: 'Phone',
            icon: FaMobile,
            mac: 'AA:BB:CC:DD:EE:02',
            os: 'Android 12',
            security: 6,
            status: 'vulnerable',
            method: 'bluetooth',
            signal: -52,
            battery: 65,
            model: 'SM-G991B'
          },
          {
            id: 'bt-3',
            name: 'MacBook Pro',
            type: 'Laptop',
            icon: FaLaptop,
            mac: 'AA:BB:CC:DD:EE:03',
            os: 'macOS 13.0',
            security: 7,
            status: 'online',
            method: 'bluetooth',
            signal: -38,
            battery: 85,
            model: 'MacBookPro18,1'
          }
        );
      }

      if (type === 'all' || type === 'wifi') {
        discoveredDevices.push(
          {
            id: 'wifi-1',
            name: 'Unknown Device',
            type: 'Phone',
            icon: FaMobile,
            ip: '192.168.1.105',
            os: 'Android 11',
            security: 4,
            status: 'vulnerable',
            method: 'wifi',
            signal: -65,
            battery: null,
            model: 'Unknown'
          },
          {
            id: 'wifi-2',
            name: 'Smart TV',
            type: 'TV',
            icon: FaTablet,
            ip: '192.168.1.110',
            os: 'Android TV 10',
            security: 5,
            status: 'online',
            method: 'wifi',
            signal: -58,
            battery: null,
            model: 'TV-2022'
          }
        );
      }

      if (type === 'all' || type === 'network') {
        discoveredDevices.push(
          {
            id: 'net-1',
            name: 'Corporate Device',
            type: 'Phone',
            icon: FaMobile,
            ip: '10.0.0.45',
            os: 'Android 9',
            security: 3,
            status: 'vulnerable',
            method: 'network',
            signal: null,
            battery: 42,
            model: 'Pixel 3'
          }
        );
      }

      setDevices(discoveredDevices);
      setIsScanning(false);
    }, 3000);
  };

  const handleAttack = (device) => {
    if (onDeviceSelected) {
      onDeviceSelected(device);
    }
  };

  return (
    <DiscoveryContainer>
      <DiscoveryHeader>
        <DiscoveryTitle>Device Discovery</DiscoveryTitle>
        <DiscoverySubtitle>Scan for devices to attack</DiscoverySubtitle>
      </DiscoveryHeader>

      <ScanControls>
        <ScanButton
          onClick={() => scanForDevices('all')}
          disabled={isScanning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSearch />
          Scan All
        </ScanButton>
        <ScanButton
          onClick={() => scanForDevices('bluetooth')}
          disabled={isScanning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBluetooth />
          Scan Bluetooth
        </ScanButton>
        <ScanButton
          onClick={() => scanForDevices('wifi')}
          disabled={isScanning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaWifi />
          Scan WiFi
        </ScanButton>
        <ScanButton
          onClick={() => scanForDevices('network')}
          disabled={isScanning}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaNetworkWired />
          Scan Network
        </ScanButton>
      </ScanControls>

      {isScanning && (
        <div style={{ textAlign: 'center', color: '#00ff41', marginBottom: '20px' }}>
          Scanning for devices...
        </div>
      )}

      {devices.length > 0 && (
        <DevicesGrid>
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              selected={selectedDevice?.id === device.id}
              onClick={() => setSelectedDevice(device)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DeviceHeader>
                <DeviceIcon as={device.icon} />
                <DeviceInfo>
                  <DeviceName>{device.name}</DeviceName>
                  <DeviceType>{device.type}</DeviceType>
                </DeviceInfo>
                <StatusBadge status={device.status}>
                  {device.status === 'online' ? 'Online' :
                   device.status === 'vulnerable' ? 'Vulnerable' : 'Offline'}
                </StatusBadge>
              </DeviceHeader>

              <DeviceDetails>
                <DetailRow>
                  <DetailLabel>OS:</DetailLabel>
                  <DetailValue>{device.os}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Security Level:</DetailLabel>
                  <DetailValue>{device.security}/10</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Method:</DetailLabel>
                  <DetailValue>{device.method}</DetailValue>
                </DetailRow>
                {device.mac && (
                  <DetailRow>
                    <DetailLabel>MAC:</DetailLabel>
                    <DetailValue>{device.mac}</DetailValue>
                  </DetailRow>
                )}
                {device.ip && (
                  <DetailRow>
                    <DetailLabel>IP:</DetailLabel>
                    <DetailValue>{device.ip}</DetailValue>
                  </DetailRow>
                )}
                {device.signal && (
                  <DetailRow>
                    <DetailLabel>Signal:</DetailLabel>
                    <DetailValue>{device.signal}dBm</DetailValue>
                  </DetailRow>
                )}
                {device.battery !== null && (
                  <DetailRow>
                    <DetailLabel>Battery:</DetailLabel>
                    <DetailValue>{device.battery}%</DetailValue>
                  </DetailRow>
                )}
              </DeviceDetails>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <AttackButton
                  onClick={() => handleAttack(device)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ flex: 1 }}
                >
                  <FaCrosshairs />
                  Attack Device
                </AttackButton>
                <AttackButton
                  onClick={() => handleAttack(device, true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    flex: 1,
                    background: 'linear-gradient(45deg, #00ffff, #0099cc)',
                    border: 'none'
                  }}
                >
                  <FaTerminal />
                  Terminal Only
                </AttackButton>
              </div>
            </DeviceCard>
          ))}
        </DevicesGrid>
      )}

      {!isScanning && devices.length === 0 && (
        <div style={{ textAlign: 'center', color: '#888', padding: '40px' }}>
          No devices found. Click a scan button to discover devices.
        </div>
      )}
    </DiscoveryContainer>
  );
};

export default DeviceDiscovery;


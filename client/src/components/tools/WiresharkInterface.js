import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEye, FaTimes, FaPlay, FaStop, FaDownload } from 'react-icons/fa';

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: linear-gradient(145deg, #1a1a2e, #0a0a0a);
  border: 2px solid #00ffff;
  border-radius: 15px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #00ffff;
`;

const Title = styled.h2`
  color: #00ffff;
  font-family: 'Orbitron', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
`;

const CloseButton = styled.button`
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

  &:hover {
    background: rgba(255, 0, 64, 0.1);
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px 20px;
  border-bottom: 1px solid #00ffff;
  align-items: center;
`;

const ControlButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(45deg, #00ffff, #0099cc)' : 'rgba(0, 255, 255, 0.1)'};
  border: 1px solid #00ffff;
  border-radius: 5px;
  padding: 8px 15px;
  color: ${props => props.active ? '#000' : '#00ffff'};
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(0, 255, 255, 0.2);
  }
`;

const Interface = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`;

const PacketList = styled.div`
  width: 300px;
  border-right: 1px solid #00ffff;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.3);
`;

const PacketItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  color: #ccc;
  font-size: 0.85rem;
  font-family: 'Share Tech Mono', monospace;

  &:hover {
    background: rgba(0, 255, 255, 0.1);
  }

  ${props => props.selected && `
    background: rgba(0, 255, 255, 0.2);
    border-left: 3px solid #00ffff;
  `}
`;

const PacketDetails = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.2);
`;

const DetailSection = styled.div`
  margin-bottom: 20px;
`;

const DetailTitle = styled.div`
  color: #00ffff;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: 'Orbitron', sans-serif;
`;

const DetailContent = styled.pre`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ffff;
  border-radius: 5px;
  padding: 15px;
  color: #00ffff;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  overflow-x: auto;
  line-height: 1.6;
`;

const WiresharkInterface = ({ tool, targets, onClose }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedPacket, setSelectedPacket] = useState(null);
  const [packets, setPackets] = useState([]);

  const startCapture = () => {
    setIsCapturing(true);
    setPackets([]);
    
    // Simulate packet capture
    const interval = setInterval(() => {
      const newPacket = {
        id: Date.now(),
        number: packets.length + 1,
        time: new Date().toLocaleTimeString(),
        source: `192.168.1.${Math.floor(Math.random() * 255)}`,
        destination: `192.168.1.${Math.floor(Math.random() * 255)}`,
        protocol: ['HTTP', 'HTTPS', 'DNS', 'TCP', 'UDP'][Math.floor(Math.random() * 5)],
        length: Math.floor(Math.random() * 1500) + 64,
        info: 'HTTP GET /index.html'
      };
      setPackets(prev => [...prev, newPacket]);
      if (packets.length === 0) {
        setSelectedPacket(newPacket);
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setIsCapturing(false);
    }, 10000);
  };

  const stopCapture = () => {
    setIsCapturing(false);
  };

  return (
    <Modal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            <FaEye />
            Wireshark - Packet Analyzer
          </Title>
          <CloseButton onClick={onClose}>
            <FaTimes />
            Close
          </CloseButton>
        </Header>

        <Controls>
          <ControlButton active={isCapturing} onClick={isCapturing ? stopCapture : startCapture}>
            {isCapturing ? <FaStop /> : <FaPlay />}
            {isCapturing ? 'Stop' : 'Start'} Capture
          </ControlButton>
          <ControlButton>
            <FaDownload />
            Save
          </ControlButton>
          <div style={{ marginLeft: 'auto', color: '#00ffff', fontSize: '0.9rem' }}>
            Packets: {packets.length}
          </div>
        </Controls>

        <Interface>
          <PacketList>
            {packets.length === 0 ? (
              <div style={{ padding: '20px', color: '#666', textAlign: 'center' }}>
                {isCapturing ? 'Capturing packets...' : 'Click Start Capture to begin'}
              </div>
            ) : (
              packets.map(packet => (
                <PacketItem
                  key={packet.id}
                  selected={selectedPacket?.id === packet.id}
                  onClick={() => setSelectedPacket(packet)}
                >
                  <div>#{packet.number} {packet.time}</div>
                  <div style={{ color: '#00ffff' }}>{packet.source} → {packet.destination}</div>
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>{packet.protocol} {packet.length} bytes</div>
                </PacketItem>
              ))
            )}
          </PacketList>

          <PacketDetails>
            {selectedPacket ? (
              <>
                <DetailSection>
                  <DetailTitle>Frame {selectedPacket.number}</DetailTitle>
                  <DetailContent>{`Frame ${selectedPacket.number}: ${selectedPacket.length} bytes on wire
Arrival Time: ${selectedPacket.time}
Protocol: ${selectedPacket.protocol}`}</DetailContent>
                </DetailSection>
                <DetailSection>
                  <DetailTitle>Ethernet II</DetailTitle>
                  <DetailContent>{`Destination: aa:bb:cc:dd:ee:ff
Source: 11:22:33:44:55:66
Type: IPv4 (0x0800)`}</DetailContent>
                </DetailSection>
                <DetailSection>
                  <DetailTitle>Internet Protocol Version 4</DetailTitle>
                  <DetailContent>{`Source: ${selectedPacket.source}
Destination: ${selectedPacket.destination}
Protocol: ${selectedPacket.protocol}
Total Length: ${selectedPacket.length}`}</DetailContent>
                </DetailSection>
                <DetailSection>
                  <DetailTitle>Raw Packet Data</DetailTitle>
                  <DetailContent>{`0000  aa bb cc dd ee ff 11 22 33 44 55 66 08 00 45 00
0010  00 3c 1c 46 40 00 40 06 b1 e6 c0 a8 01 01 c0 a8
0020  01 64 00 50 04 d2 00 00 00 00 00 00 00 00 50 02
0030  20 00 91 7c 00 00 47 45 54 20 2f 20 48 54 54 50`}</DetailContent>
                </DetailSection>
              </>
            ) : (
              <div style={{ color: '#666', textAlign: 'center', marginTop: '50px' }}>
                Select a packet to view details
              </div>
            )}
          </PacketDetails>
        </Interface>
      </ModalContent>
    </Modal>
  );
};

export default WiresharkInterface;




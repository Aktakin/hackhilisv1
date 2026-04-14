import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

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
  border: 2px solid #00ff41;
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  padding: 30px;
  box-shadow: 0 0 50px rgba(0, 255, 65, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 2px solid #ff0040;
  color: #ff0040;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 0, 64, 0.1);
  }
`;

const GenericToolInterface = ({ tool, targets, onClose }) => {
  return (
    <Modal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{tool.name}</Title>
          <CloseButton onClick={onClose}>
            <FaTimes />
            Close
          </CloseButton>
        </Header>
        <div style={{ color: '#ccc' }}>
          <p>{tool.description}</p>
          <p style={{ marginTop: '20px', color: '#888' }}>
            Tool interface coming soon...
          </p>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default GenericToolInterface;




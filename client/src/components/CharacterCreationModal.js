import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaBirthdayCake, FaBrain, FaTimes } from 'react-icons/fa';

const ModalOverlay = styled(motion.div)`
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

const ModalContent = styled(motion.div)`
  background: linear-gradient(145deg, #1a1a2e, #0a0a0a);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 50px rgba(0, 255, 65, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
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
  font-size: 1.2rem;

  &:hover {
    background: rgba(255, 0, 64, 0.1);
    box-shadow: 0 0 10px rgba(255, 0, 64, 0.5);
  }
`;

const Title = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
  margin-bottom: 10px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 1rem;
  margin-bottom: 30px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 8px;
  padding: 12px;
  color: #00ff41;
  font-size: 1rem;
  font-family: 'Share Tech Mono', monospace;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 8px;
  padding: 12px;
  color: #00ff41;
  font-size: 1rem;
  font-family: 'Share Tech Mono', monospace;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const PersonalityCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid ${props => props.selected ? '#00ff41' : '#333'};
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff41;
    background: rgba(0, 255, 65, 0.1);
  }

  ${props => props.selected && `
    background: rgba(0, 255, 65, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
  `}
`;

const PersonalityName = styled.div`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 8px;
`;

const PersonalityDescription = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const CreateButton = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 8px;
  padding: 15px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(45deg, #00cc33, #00ff41);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const personalities = [
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Hardly makes mistakes. The computer warns you whenever you\'re about to make a mistake. Can be very annoying because you\'ll get lots of pop-ups directing you whenever you\'re likely to make a costly mistake.'
  },
  {
    id: 'delusional',
    name: 'Delusional',
    description: 'Tendency to be a bad guy, crazy in a way but still loves attacking people for fun. Likes to live on the edge. Your story mode might have a lot of police trying to get you.'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Always called for a job. Good guy but never really rich. Focuses on legitimate work and building reputation through proper channels.'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Loves trying new things and thinking outside the box. Might involve trying different new things and unconventional approaches to problems.'
  },
  {
    id: 'intelligent',
    name: 'Intelligent',
    description: 'Always school oriented and focused, gains lots of knowledge. Also may come with lots of pop-ups teaching you every step. Prioritizes learning and understanding.'
  },
  {
    id: 'fearless',
    name: 'Fearless',
    description: 'Never afraid of getting caught, scared of no one and always attacking. Takes risks without hesitation and doesn\'t worry about consequences.'
  },
  {
    id: 'charismatic',
    name: 'Charismatic',
    description: 'Adored by all, has everything he needs but be careful, might be in for a surprise. People naturally trust and help you, but things might not always be as they seem.'
  }
];

const CharacterCreationModal = ({ onClose, onCreate }) => {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState(null);

  const handleCreate = () => {
    if (nickname.trim() && age && selectedPersonality) {
      onCreate({
        nickname: nickname.trim(),
        age: parseInt(age),
        personality: selectedPersonality
      });
      onClose();
    }
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        // Only close on overlay click, don't prevent closing
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <ModalContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose} title="Close">
          <FaTimes />
        </CloseButton>
        <Title>Welcome to Story Mode!</Title>
        <Subtitle>Please create your character personality</Subtitle>

        <FormGroup>
          <Label>
            <FaUser />
            Nickname
          </Label>
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter your character's nickname"
            maxLength={20}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            <FaBirthdayCake />
            Age
          </Label>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            min="13"
            max="100"
          />
        </FormGroup>

        <FormGroup>
          <Label>
            <FaBrain />
            Personality Type
          </Label>
          {personalities.map((personality) => (
            <PersonalityCard
              key={personality.id}
              selected={selectedPersonality === personality.id}
              onClick={() => setSelectedPersonality(personality.id)}
            >
              <PersonalityName>{personality.name}</PersonalityName>
              <PersonalityDescription>{personality.description}</PersonalityDescription>
            </PersonalityCard>
          ))}
        </FormGroup>

        <CreateButton
          onClick={handleCreate}
          disabled={!nickname.trim() || !age || !selectedPersonality}
        >
          Create Character
        </CreateButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CharacterCreationModal;


import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import CharacterCreationModal from './CharacterCreationModal';
import JobSelectionModal from './JobSelectionModal';
import StoryProgress from './StoryProgress';
import InvestigationInterface from './InvestigationInterface';
import { 
  FaDollarSign, 
  FaChartLine, 
  FaShieldAlt, 
  FaTerminal,
  FaGraduationCap,
  FaUsers,
  FaStore,
  FaExclamationTriangle,
  FaPhone,
  FaUser,
  FaGamepad,
  FaBook
} from 'react-icons/fa';

const gridPattern = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 50px 50px; }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const DashboardContainer = styled.div`
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px),
      linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: ${gridPattern} 20s linear infinite;
    pointer-events: none;
    z-index: 0;
  }
`;

const WelcomeSection = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(0, 255, 65, 0.15) 0%, 
    rgba(0, 255, 255, 0.15) 50%,
    rgba(0, 255, 65, 0.15) 100%);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 255, 65, 0.5);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  text-align: center;
  box-shadow: 
    0 0 40px rgba(0, 255, 65, 0.3),
    inset 0 0 60px rgba(0, 255, 65, 0.05);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0, 255, 65, 0.1) 0%, transparent 70%);
    animation: ${float} 6s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.1) 50%, transparent 70%);
    animation: ${glowPulse} 3s ease-in-out infinite;
  }
`;

const WelcomeTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 3rem;
  background: linear-gradient(135deg, #00ff41 0%, #00ffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  text-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
  position: relative;
  z-index: 1;
  letter-spacing: 2px;
`;

const WelcomeSubtitle = styled.p`
  color: #aaa;
  font-size: 1.2rem;
  margin-bottom: 25px;
  position: relative;
  z-index: 1;
  font-weight: 300;
  letter-spacing: 1px;
`;

const ModeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  margin-top: 30px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 2px solid rgba(0, 255, 65, 0.3);
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.2);
  position: relative;
  z-index: 1;
`;

const ModeLabel = styled.span`
  color: #00ff41;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 200px;
  height: 45px;
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid #00ff41;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
    border-color: #00ffff;
  }
`;

const ToggleSlider = styled.div`
  position: absolute;
  width: 100px;
  height: 41px;
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border-radius: 23px;
  transition: transform 0.3s ease;
  transform: translateX(${props => props.active === 'story' ? '100px' : '0px'});
  z-index: 0;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
`;

const ModeOption = styled.div`
  position: relative;
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: ${props => props.active ? '#000' : '#00ff41'};
  font-weight: bold;
  font-size: 0.9rem;
  z-index: 2;
  transition: color 0.3s ease;
  font-family: 'Orbitron', sans-serif;
  
  svg {
    font-size: 1rem;
  }
`;

const ResetButton = styled.button`
  background: rgba(255, 0, 64, 0.1);
  border: 2px solid #ff0040;
  border-radius: 8px;
  padding: 8px 15px;
  color: #ff0040;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.85rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 0, 64, 0.2);
    box-shadow: 0 0 15px rgba(255, 0, 64, 0.5);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(0, 255, 65, 0.1) 0%, 
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 255, 255, 0.1) 100%);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 255, 65, 0.4);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    border-color: #00ffff;
    box-shadow: 
      0 0 30px rgba(0, 255, 255, 0.4),
      inset 0 0 30px rgba(0, 255, 65, 0.1);
    transform: translateY(-8px) scale(1.02);
    
    &::before {
      left: 100%;
    }
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  background: linear-gradient(135deg, #00ff41, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  filter: drop-shadow(0 0 10px rgba(0, 255, 65, 0.5));
  transition: transform 0.3s ease;
  
  ${StatCard}:hover & {
    transform: scale(1.2) rotate(5deg);
  }
`;

const StatValue = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  background: linear-gradient(135deg, #00ff41, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
`;

const StatLabel = styled.div`
  color: #aaa;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 300;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
  position: relative;
  z-index: 1;
`;

const ActionCard = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.7) 0%, 
    rgba(0, 255, 65, 0.05) 100%);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 255, 65, 0.3);
  border-radius: 15px;
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 65, 0.2) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover {
    border-color: #00ffff;
    box-shadow: 
      0 0 35px rgba(0, 255, 255, 0.4),
      inset 0 0 40px rgba(0, 255, 65, 0.1);
    transform: translateY(-10px) scale(1.05);
    
    &::after {
      width: 300px;
      height: 300px;
    }
  }
`;

const ActionIcon = styled.div`
  font-size: 2.5rem;
  background: linear-gradient(135deg, #00ff41, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  filter: drop-shadow(0 0 10px rgba(0, 255, 65, 0.5));
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
  
  ${ActionCard}:hover & {
    transform: scale(1.3) rotate(10deg);
  }
`;

const ActionTitle = styled.h3`
  color: #00ff41;
  margin-bottom: 12px;
  font-size: 1.2rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: 600;
  position: relative;
  z-index: 1;
  letter-spacing: 1px;
`;

const ActionDescription = styled.p`
  color: #aaa;
  font-size: 0.95rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  font-weight: 300;
`;

const SkillsSection = styled.div`
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.7) 0%, 
    rgba(0, 255, 65, 0.05) 100%);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 255, 65, 0.3);
  border-radius: 20px;
  padding: 35px;
  margin-bottom: 40px;
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  background: linear-gradient(135deg, #00ff41, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 25px;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const SkillItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 255, 65, 0.05));
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 65, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(0, 255, 255, 0.5);
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 255, 65, 0.1));
    transform: translateX(5px);
  }
`;

const SkillName = styled.span`
  color: #00ff41;
  font-weight: bold;
`;

const SkillLevel = styled.span`
  color: #00ffff;
  font-weight: bold;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: ${glowPulse} 2s ease-in-out infinite;
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00ff41, #00ffff, #00ff41);
  background-size: 200% 100%;
  width: ${props => props.percentage}%;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
  animation: ${glowPulse} 2s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: ${gridPattern} 1s linear infinite;
  }
`;

const WarningBanner = styled(motion.div)`
  background: linear-gradient(135deg, 
    rgba(255, 0, 64, 0.2) 0%, 
    rgba(204, 0, 51, 0.2) 100%);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 0, 64, 0.6);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 40px;
  text-align: center;
  color: #fff;
  box-shadow: 
    0 0 40px rgba(255, 0, 64, 0.4),
    inset 0 0 60px rgba(255, 0, 64, 0.1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 0, 64, 0.2) 0%, transparent 70%);
    animation: ${float} 4s ease-in-out infinite;
  }
`;

const WarningTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const WarningMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 15px;
`;

const WarningAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
`;

const Dashboard = ({ user }) => {
  const { gameState, dispatch } = useGame();
  const navigate = useNavigate();
  const [daysWithoutPhone, setDaysWithoutPhone] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showInvestigation, setShowInvestigation] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  // Check if player has been without phone for 2+ days
  useEffect(() => {
    if (!gameState.phone.owned) {
      const startTime = localStorage.getItem('hackhilis_start_time') || Date.now();
      const daysElapsed = Math.floor((Date.now() - startTime) / (1000 * 60 * 60 * 24));
      setDaysWithoutPhone(daysElapsed);
      
      if (daysElapsed >= 2) {
        setShowWarning(true);
        // Trigger Easy Money hack
        dispatch({ type: 'EASY_MONEY_HACK' });
      }
    } else {
      setShowWarning(false);
      setDaysWithoutPhone(0);
    }
  }, [gameState.phone.owned, dispatch]);

  // Show character creation modal when switching to story mode without character
  useEffect(() => {
    if (gameState.gameMode === 'story' && !gameState.character) {
      setShowCharacterModal(true);
    } else {
      setShowCharacterModal(false);
    }
  }, [gameState.gameMode, gameState.character]);

  // Show job selection modal when character is created but no job selected
  // For professional and delusional personalities
  useEffect(() => {
    if (gameState.gameMode === 'story' && 
        gameState.character && 
        !gameState.story && 
        (gameState.character.personality === 'professional' || gameState.character.personality === 'delusional')) {
      setShowJobModal(true);
    }
  }, [gameState.gameMode, gameState.character, gameState.story]);

  const handleCreateCharacter = (characterData) => {
    dispatch({ type: 'CREATE_CHARACTER', payload: characterData });
    setShowCharacterModal(false);
    // Job selection will show automatically via useEffect
  };

  const handleSelectJob = (job) => {
    dispatch({ type: 'SELECT_JOB', payload: { job: job.id } });
    setShowJobModal(false);
  };

  const handleResetStoryMode = () => {
    if (window.confirm('Are you sure you want to reset Story Mode? This will delete your character and switch to Free Game mode.')) {
      dispatch({ type: 'RESET_STORY_MODE' });
      setShowCharacterModal(false);
    }
  };

  const skills = [
    { name: 'Hacking', level: gameState.skills.hacking },
    { name: 'Networking', level: gameState.skills.networking },
    { name: 'Cryptography', level: gameState.skills.cryptography },
    { name: 'Social Engineering', level: gameState.skills.socialEngineering },
    { name: 'Forensics', level: gameState.skills.forensics },
    { name: 'Malware', level: gameState.skills.malware }
  ];

  const quickActions = [
    {
      icon: FaStore,
      title: 'Visit Store',
      description: 'Buy new equipment and tools',
      link: '/store'
    },
    {
      icon: FaGraduationCap,
      title: 'Learn Skills',
      description: 'Take courses and exams',
      link: '/education'
    },
    {
      icon: FaTerminal,
      title: 'Start Hacking',
      description: 'Target other players',
      link: '/hacking'
    },
    {
      icon: FaUsers,
      title: 'Join Alliance',
      description: 'Team up with other hackers',
      link: '/alliance'
    },
    {
      icon: FaUser,
      title: 'Profile',
      description: 'View and edit your profile',
      link: '/profile'
    }
  ];

  return (
    <DashboardContainer>
      {showWarning && (
        <WarningBanner
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WarningTitle>
            <FaExclamationTriangle />
            EASY MONEY HACK DETECTED!
          </WarningTitle>
          <WarningMessage>
            You've been without a phone for {daysWithoutPhone} days. 
            Your money has been stolen by hackers!
          </WarningMessage>
          <WarningAction>
            <FaPhone />
            Buy a phone immediately to protect your money!
          </WarningAction>
        </WarningBanner>
      )}

      <WelcomeSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <WelcomeTitle>Welcome back, {user?.username}</WelcomeTitle>
        <WelcomeSubtitle>
          Level {gameState.level} • {gameState.experience} XP • IP: {gameState.ipAddress} • Ready to hack?
        </WelcomeSubtitle>
        
        <ModeToggleContainer>
          <ModeLabel>Game Mode:</ModeLabel>
          <ToggleSwitch 
            active={gameState.gameMode || 'free'}
            onClick={() => {
              const newMode = gameState.gameMode === 'story' ? 'free' : 'story';
              dispatch({ type: 'SET_GAME_MODE', payload: newMode });
            }}
          >
            <ToggleSlider active={gameState.gameMode || 'free'} />
            <ModeOption active={gameState.gameMode === 'free'}>
              <FaGamepad />
              <span>Free</span>
            </ModeOption>
            <ModeOption active={gameState.gameMode === 'story'}>
              <FaBook />
              <span>Story</span>
            </ModeOption>
          </ToggleSwitch>
          {gameState.gameMode === 'story' && (
            <ResetButton onClick={handleResetStoryMode}>
              Reset Story
            </ResetButton>
          )}
        </ModeToggleContainer>
        </WelcomeSection>

        {gameState.gameMode === 'story' && gameState.story && gameState.character && 
         (gameState.character.personality === 'professional' || gameState.character.personality === 'delusional') && (
          <StoryProgress
            story={gameState.story}
            character={gameState.character}
            onViewDetails={(step) => {
              setSelectedStep(step);
              setShowInvestigation(true);
            }}
          />
        )}
        
        {gameState.gameMode === 'story' && gameState.character && 
         gameState.character.personality !== 'professional' && gameState.character.personality !== 'delusional' && (
          <div style={{
            background: 'rgba(26, 26, 46, 0.8)',
            border: '2px solid #ffaa00',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#ffaa00', fontFamily: 'Orbitron, sans-serif', marginBottom: '15px' }}>
              Story Mode Available Soon
            </h2>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>
              Story mode is currently available for <strong style={{ color: '#00ff41' }}>Professional</strong> and <strong style={{ color: '#ff0040' }}>Delusional</strong> personalities.
              <br />
              <br />
              To experience the full story, please create a character with one of these personality types.
            </p>
          </div>
        )}

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <StatIcon as={FaDollarSign} />
          <StatValue>${(gameState.phone.owned ? gameState.phone.money : gameState.money).toLocaleString()}</StatValue>
          <StatLabel>{gameState.phone.owned ? 'Phone Money' : 'Vulnerable Money'}</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <StatIcon as={FaChartLine} />
          <StatValue>{gameState.level}</StatValue>
          <StatLabel>Level</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <StatIcon as={FaShieldAlt} />
          <StatValue>{gameState.stats.reputation}</StatValue>
          <StatLabel>Reputation</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <StatIcon as={FaTerminal} />
          <StatValue>{gameState.stats.hacksSuccessful}</StatValue>
          <StatLabel>Successful Hacks</StatLabel>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        {quickActions.map((action, index) => (
          <ActionCard
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(action.link)}
          >
            <ActionIcon as={action.icon} />
            <ActionTitle>{action.title}</ActionTitle>
            <ActionDescription>{action.description}</ActionDescription>
          </ActionCard>
        ))}
      </QuickActions>

      <SkillsSection>
        <SectionTitle>Your Skills</SectionTitle>
        <SkillsGrid>
          {skills.map((skill) => (
            <div key={skill.name}>
              <SkillItem>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel>{skill.level}/100</SkillLevel>
              </SkillItem>
              <ProgressBar>
                <ProgressFill percentage={skill.level} />
              </ProgressBar>
            </div>
          ))}
        </SkillsGrid>
      </SkillsSection>

      <AnimatePresence>
        {showCharacterModal && (
          <CharacterCreationModal
            onClose={() => {
              // User can close without creating - just close the modal, stay in story mode
              setShowCharacterModal(false);
            }}
            onCreate={handleCreateCharacter}
          />
        )}
        {showJobModal && gameState.character && (
          <JobSelectionModal
            character={gameState.character}
            onClose={() => {
              // User can close without selecting - just close the modal, stay in story mode
              setShowJobModal(false);
            }}
            onSelectJob={handleSelectJob}
          />
        )}
        {showInvestigation && selectedStep && gameState.story && gameState.character && (
          <InvestigationInterface
            story={gameState.story}
            character={gameState.character}
            step={selectedStep}
            onClose={() => {
              setShowInvestigation(false);
              setSelectedStep(null);
            }}
          />
        )}
      </AnimatePresence>
    </DashboardContainer>
  );
};

export default Dashboard;

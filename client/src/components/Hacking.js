import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import HackingTerminal from './HackingTerminal';
import { 
  FaTerminal, 
  FaBullseye, 
  FaShieldAlt,
  FaDollarSign,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaCode,
  FaEye
} from 'react-icons/fa';

const HackingContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const HackingHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const HackingTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const HackingSubtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #00ff41;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TargetSection = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #00ff41;
  margin-bottom: 20px;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
`;

const TargetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const TargetCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid #00ff41;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const TargetIcon = styled.div`
  font-size: 2rem;
  color: #00ff41;
  margin-bottom: 10px;
`;

const TargetName = styled.h3`
  color: #00ff41;
  margin-bottom: 10px;
`;

const TargetLevel = styled.div`
  color: #00ffff;
  font-weight: bold;
  margin-bottom: 10px;
`;

const TargetReward = styled.div`
  color: #00ff41;
  font-weight: bold;
  margin-bottom: 15px;
`;

const HackButton = styled.button`
  background: linear-gradient(45deg, #ff0040, #cc0033);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

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

const HackResult = styled(motion.div)`
  background: rgba(26, 26, 46, 0.9);
  border: 2px solid ${props => props.success ? '#00ff41' : '#ff0040'};
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;

const ResultIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.success ? '#00ff41' : '#ff0040'};
  margin-bottom: 15px;
`;

const ResultTitle = styled.h3`
  color: ${props => props.success ? '#00ff41' : '#ff0040'};
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const ResultMessage = styled.p`
  color: #888;
  margin-bottom: 15px;
`;

const ResultReward = styled.div`
  color: #00ffff;
  font-weight: bold;
  font-size: 1.2rem;
`;

const Hacking = ({ user }) => {
  const { gameState, dispatch } = useGame();
  const [hackResult, setHackResult] = useState(null);
  const [isHacking, setIsHacking] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);

  const targets = [
    {
      id: 1,
      name: 'Personal Website',
      level: 1,
      reward: 500,
      difficulty: 'Easy',
      icon: FaBullseye,
      description: 'Personal blog with weak security',
      recommendedAttacks: ['brute-force', 'sql-injection'],
      attackTips: 'Try default passwords and SQL injection on contact forms'
    },
    {
      id: 2,
      name: 'Small Business',
      level: 2,
      reward: 1500,
      difficulty: 'Easy',
      icon: FaBullseye,
      description: 'Local business with outdated systems',
      recommendedAttacks: ['brute-force', 'sql-injection', 'ddos'],
      attackTips: 'Target admin panels and exploit weak authentication'
    },
    {
      id: 3,
      name: 'E-commerce Site',
      level: 3,
      reward: 5000,
      difficulty: 'Medium',
      icon: FaBullseye,
      description: 'Online store with payment processing',
      recommendedAttacks: ['sql-injection', 'brute-force'],
      attackTips: 'Focus on user accounts and payment systems'
    },
    {
      id: 4,
      name: 'Corporate Network',
      level: 4,
      reward: 15000,
      difficulty: 'Hard',
      icon: FaBullseye,
      description: 'Large corporation with mixed security',
      recommendedAttacks: ['brute-force', 'rainbow', 'ddos'],
      attackTips: 'Target employee accounts and internal systems'
    },
    {
      id: 5,
      name: 'Banking System',
      level: 5,
      reward: 25000,
      difficulty: 'Hard',
      icon: FaBullseye,
      description: 'Financial institution with strong defenses',
      recommendedAttacks: ['rainbow', 'brute-force'],
      attackTips: 'Use advanced password cracking and social engineering'
    },
    {
      id: 6,
      name: 'Government Server',
      level: 6,
      reward: 50000,
      difficulty: 'Expert',
      icon: FaBullseye,
      description: 'High-security government infrastructure',
      recommendedAttacks: ['rainbow', 'ddos'],
      attackTips: 'Requires sophisticated attacks and persistence'
    },
    {
      id: 7,
      name: 'HILIS Core',
      level: 7,
      reward: 100000,
      difficulty: 'Legendary',
      icon: FaBullseye,
      description: 'The ultimate target - Hilis organization',
      recommendedAttacks: ['rainbow', 'ddos', 'brute-force'],
      attackTips: 'All attack methods needed - this is the final boss'
    }
  ];

  const calculateHackSuccess = (target) => {
    const playerHackingSkill = gameState.skills.hacking;
    const playerLevel = gameState.level;
    const targetLevel = target.level;
    
    // Base success rate calculation
    let successRate = (playerHackingSkill + playerLevel * 2) / (targetLevel * 3) * 100;
    
    // Equipment bonuses
    if (gameState.equipment.laptop) {
      successRate += gameState.equipment.laptop.stats?.hacking || 0;
    }
    if (gameState.equipment.tools) {
      successRate += gameState.equipment.tools.reduce((bonus, tool) => 
        bonus + (tool.stats?.hacking || 0), 0);
    }
    
    // Cap success rate
    successRate = Math.min(95, Math.max(5, successRate));
    
    return Math.random() * 100 < successRate;
  };

  const attemptHack = async (target) => {
    setIsHacking(true);
    setHackResult(null);

    // Simulate hacking process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const success = calculateHackSuccess(target);
    
    if (success) {
      dispatch({ type: 'UPDATE_MONEY', payload: target.reward });
      dispatch({ type: 'ADD_EXPERIENCE', payload: target.level * 10 });
      dispatch({ type: 'UPDATE_STATS', payload: { 
        hacksAttempted: gameState.stats.hacksAttempted + 1,
        hacksSuccessful: gameState.stats.hacksSuccessful + 1,
        moneyStolen: gameState.stats.moneyStolen + target.reward
      }});
    } else {
      dispatch({ type: 'UPDATE_STATS', payload: { 
        hacksAttempted: gameState.stats.hacksAttempted + 1
      }});
    }

    setHackResult({
      success,
      target,
      reward: success ? target.reward : 0
    });
    setIsHacking(false);
  };

  const selectTargetForAttack = (target) => {
    setSelectedTarget(target);
    setShowTerminal(true);
  };

  const handleAttackComplete = (success, reward) => {
    if (success) {
      dispatch({ type: 'UPDATE_MONEY', payload: reward });
      dispatch({ type: 'ADD_EXPERIENCE', payload: selectedTarget.level * 10 });
      dispatch({ type: 'UPDATE_STATS', payload: { 
        hacksAttempted: gameState.stats.hacksAttempted + 1,
        hacksSuccessful: gameState.stats.hacksSuccessful + 1,
        moneyStolen: gameState.stats.moneyStolen + reward
      }});
    } else {
      dispatch({ type: 'UPDATE_STATS', payload: { 
        hacksAttempted: gameState.stats.hacksAttempted + 1
      }});
    }
    
    setHackResult({
      success,
      target: selectedTarget,
      reward: success ? reward : 0
    });
    setShowTerminal(false);
    setSelectedTarget(null);
  };

  const canHackTarget = (target) => {
    return !isHacking; // Remove level requirement - all targets are now accessible
  };

  return (
    <HackingContainer>
      <HackingHeader>
        <HackingTitle>Hacking Terminal</HackingTitle>
        <HackingSubtitle>
          Target other players and organizations
        </HackingSubtitle>
      </HackingHeader>

      <StatsRow>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatValue>{gameState.stats.hacksSuccessful}</StatValue>
          <StatLabel>Successful Hacks</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatValue>${gameState.stats.moneyStolen.toLocaleString()}</StatValue>
          <StatLabel>Money Stolen</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatValue>{gameState.skills.hacking}</StatValue>
          <StatLabel>Hacking Skill</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatValue>{gameState.stats.reputation}</StatValue>
          <StatLabel>Reputation</StatLabel>
        </StatCard>
      </StatsRow>

      <TargetSection>
        <SectionTitle>Available Targets</SectionTitle>
        <TargetGrid>
          {targets.map((target) => (
            <TargetCard
              key={target.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <TargetIcon as={target.icon} />
              <TargetName>{target.name}</TargetName>
              <TargetLevel>Level {target.level}</TargetLevel>
              <TargetReward>Reward: ${target.reward.toLocaleString()}</TargetReward>
              <p style={{ color: '#888', marginBottom: '10px', fontSize: '0.9rem' }}>
                {target.description}
              </p>
              <div style={{ marginBottom: '10px' }}>
                <p style={{ color: '#ffaa00', fontSize: '0.8rem', marginBottom: '5px' }}>
                  <strong>Recommended:</strong> {target.recommendedAttacks.join(', ')}
                </p>
                <p style={{ color: '#00ffff', fontSize: '0.8rem', fontStyle: 'italic' }}>
                  {target.attackTips}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <HackButton
                  onClick={() => attemptHack(target)}
                  disabled={!canHackTarget(target) || isHacking}
                  style={{ marginBottom: '5px' }}
                >
                  {isHacking ? 'Hacking...' : 'Quick Hack'}
                </HackButton>
                <HackButton
                  onClick={() => selectTargetForAttack(target)}
                  disabled={!canHackTarget(target)}
                  style={{ 
                    background: 'transparent',
                    border: '2px solid #00ffff',
                    color: '#00ffff'
                  }}
                >
                  <FaTerminal style={{ marginRight: '5px' }} />
                  Advanced Attack
                </HackButton>
              </div>
            </TargetCard>
          ))}
        </TargetGrid>
      </TargetSection>

      {hackResult && (
        <HackResult
          success={hackResult.success}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ResultIcon success={hackResult.success} as={hackResult.success ? FaCheckCircle : FaTimesCircle} />
          <ResultTitle success={hackResult.success}>
            {hackResult.success ? 'Hack Successful!' : 'Hack Failed!'}
          </ResultTitle>
          <ResultMessage>
            {hackResult.success 
              ? `You successfully hacked ${hackResult.target.name} and stole $${hackResult.reward.toLocaleString()}!`
              : `Your hack attempt on ${hackResult.target.name} was detected and blocked.`
            }
          </ResultMessage>
          {hackResult.success && (
            <ResultReward>
              +${hackResult.reward.toLocaleString()} Money
            </ResultReward>
          )}
        </HackResult>
      )}

      {showTerminal && selectedTarget && (
        <HackingTerminal 
          target={selectedTarget} 
          onAttackComplete={handleAttackComplete}
        />
      )}
    </HackingContainer>
  );
};

export default Hacking;

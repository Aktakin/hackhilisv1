import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AndroidDevTerminal from './AndroidDevTerminal';
import WiresharkEmbedded from './WiresharkEmbedded';
import { useGame } from '../context/GameContext';
import { FaArrowLeft, FaTerminal, FaBook, FaChevronDown, FaChevronRight, FaEye } from 'react-icons/fa';

const TutorialContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  padding: 20px;
`;

const TutorialHeader = styled.div`
  margin-bottom: 30px;
  position: relative;
`;

const BackButton = styled(motion.button)`
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
  margin-bottom: 20px;

  &:hover {
    background: rgba(0, 255, 65, 0.1);
    transform: translateX(-5px);
  }
`;

const TutorialTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const TutorialDescription = styled.p`
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 20px;
  height: calc(100vh - 200px);
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const InstructionsPanel = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
`;

const InstructionsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
`;

const ExplanationSection = styled.div`
  background: rgba(0, 255, 65, 0.05);
  border: 1px solid #00ff41;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const ExplanationTitle = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ExplanationContent = styled.div`
  color: #ccc;
  font-size: 0.95rem;
  line-height: 1.6;
  
  p {
    margin-bottom: 12px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  ul {
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    
    li {
      margin-bottom: 8px;
    }
  }
  
  strong {
    color: #00ff41;
  }
`;

const StepContainer = styled.div`
  margin-bottom: 25px;
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 255, 65, 0.1);
  }
`;

const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 255, 65, 0.2);
  border: 2px solid #00ff41;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff41;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepTitle = styled.div`
  color: #ccc;
  font-weight: bold;
  flex: 1;
`;

const StepChevron = styled.div`
  color: #888;
  font-size: 0.9rem;
  transition: transform 0.3s ease;
  transform: ${props => props.expanded ? 'rotate(0deg)' : 'rotate(-90deg)'};
`;

const StepContent = styled(motion.div)`
  padding-left: 40px;
  color: #ccc;
  line-height: 1.8;
  font-size: 0.95rem;
  margin-top: 10px;
`;

const CommandExample = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  font-family: 'Share Tech Mono', monospace;
  color: #00ff41;
  font-size: 0.9rem;
`;

const TipBox = styled.div`
  background: rgba(255, 170, 0, 0.1);
  border: 1px solid #ffaa00;
  border-radius: 8px;
  padding: 12px;
  margin: 15px 0;
  color: #ffaa00;
  font-size: 0.9rem;
`;

const SuccessBox = styled.div`
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid #00ff41;
  border-radius: 8px;
  padding: 12px;
  margin: 15px 0;
  color: #00ff41;
  font-size: 0.9rem;
`;

const TerminalArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

const TerminalSection = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const TerminalLabel = styled.div`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
`;

const TerminalWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ProgressBar = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
`;

const ProgressTitle = styled.div`
  color: #00ff41;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProgressSteps = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ProgressStep = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.85rem;
  background: ${props => props.completed ? 'rgba(0, 255, 65, 0.2)' : 'rgba(0, 255, 65, 0.05)'};
  border: 1px solid ${props => props.completed ? '#00ff41' : '#333'};
  color: ${props => props.completed ? '#00ff41' : '#888'};
`;

const AttackTutorial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { gameState, dispatch } = useGame();
  const scenario = location.state?.scenario || null;
  
  // Debug: Log scenario data
  console.log('AttackTutorial - scenario:', scenario);
  console.log('AttackTutorial - location.state:', location.state);
  
  const [expandedSteps, setExpandedSteps] = useState(new Set([0]));

  if (!scenario) {
    return (
      <TutorialContainer>
        <TutorialHeader>
          <BackButton onClick={() => navigate('/scenarios')} whileHover={{ scale: 1.05 }}>
            <FaArrowLeft />
            Back to Scenarios
          </BackButton>
          <TutorialTitle>No Tutorial Selected</TutorialTitle>
          <TutorialDescription>Please select a tutorial from the Scenario Manager.</TutorialDescription>
        </TutorialHeader>
      </TutorialContainer>
    );
  }

  const instructions = scenario.instructions || [];
  const totalSteps = instructions.length;

  const toggleStep = (index) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };


  return (
    <TutorialContainer>
      <TutorialHeader>
        <BackButton onClick={() => navigate('/scenarios')} whileHover={{ scale: 1.05 }}>
          <FaArrowLeft />
          Back to Scenarios
        </BackButton>
        <TutorialTitle>{scenario.name}</TutorialTitle>
        <TutorialDescription>{scenario.description}</TutorialDescription>
      </TutorialHeader>

      <ExplanationSection>
        <ExplanationTitle>
          📋 Attack Scenario Overview
        </ExplanationTitle>
        <ExplanationContent>
          {scenario.description && (
            <p><strong>What you'll learn:</strong> {scenario.description}</p>
          )}
          <p>
            <strong>Scenario Context:</strong> This tutorial demonstrates a realistic attack scenario 
            where you'll learn how to identify vulnerabilities, exploit security weaknesses, and gain 
            unauthorized access to target systems. Each step builds upon the previous one, teaching you 
            the methodology and techniques used by security professionals and ethical hackers.
          </p>
          <p>
            <strong>Learning Objectives:</strong>
          </p>
          <ul>
            <li>Understand the attack vector and target system</li>
            <li>Learn reconnaissance and information gathering techniques</li>
            <li>Master exploitation methods and command execution</li>
            <li>Practice data extraction and system manipulation</li>
            <li>Develop skills in maintaining access and covering tracks</li>
          </ul>
          <p>
            <strong>Important:</strong> This is an educational simulation. All techniques shown are for 
            learning purposes only. Always ensure you have proper authorization before testing security 
            on any system.
          </p>
        </ExplanationContent>
      </ExplanationSection>

      <ContentLayout>
        <InstructionsPanel>
          <InstructionsHeader>
            <FaBook />
            Step-by-Step Guide
          </InstructionsHeader>

          <p style={{ color: '#888', marginBottom: '20px', fontSize: '0.9rem' }}>
            Total Steps: {totalSteps}
          </p>

          {instructions.map((instruction, index) => {
            const isExpanded = expandedSteps.has(index);

            return (
              <StepContainer key={index}>
                <StepHeader onClick={() => toggleStep(index)}>
                  <StepNumber>
                    {index + 1}
                  </StepNumber>
                  <StepTitle>
                    {instruction.split('\n')[0] || `Step ${index + 1}`}
                  </StepTitle>
                  <StepChevron expanded={isExpanded}>
                    <FaChevronDown />
                  </StepChevron>
                </StepHeader>
                <AnimatePresence>
                  {isExpanded && (
                    <StepContent
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {instruction.split('\n').map((line, lineIdx) => {
                        if (line.trim() === '') return <br key={lineIdx} />;
                        if (line.startsWith('   ') || line.startsWith('  ')) {
                          // Indented line - likely a command or sub-step
                          if (line.includes('type:') || line.includes('Type:') || line.includes('$') || line.includes('Command:')) {
                            return (
                              <CommandExample key={lineIdx}>
                                {line.trim()}
                              </CommandExample>
                            );
                          }
                          return <div key={lineIdx} style={{ paddingLeft: '20px', marginTop: '5px' }}>{line}</div>;
                        }
                        if (line.toLowerCase().includes('tip:') || line.toLowerCase().includes('note:')) {
                          return (
                            <TipBox key={lineIdx}>
                              💡 {line.replace(/^(tip|note):\s*/i, '')}
                            </TipBox>
                          );
                        }
                        if (line.toLowerCase().includes('success') || line.toLowerCase().includes('expected')) {
                          return (
                            <SuccessBox key={lineIdx}>
                              ✓ {line}
                            </SuccessBox>
                          );
                        }
                        return <div key={lineIdx} style={{ marginTop: '8px' }}>{line}</div>;
                      })}
                    </StepContent>
                  )}
                </AnimatePresence>
              </StepContainer>
            );
          })}
        </InstructionsPanel>

        {scenario.id === 'env_tutorial_wireshark' ? (
          <TerminalArea>
            <TerminalSection style={{ width: '100%', maxWidth: '100%' }}>
              <TerminalLabel>
                <FaEye />
                Wireshark Packet Analyzer
              </TerminalLabel>
              <TerminalWrapper style={{ height: '600px', overflow: 'hidden' }}>
                <WiresharkEmbedded />
              </TerminalWrapper>
            </TerminalSection>
          </TerminalArea>
        ) : (
          <TerminalArea>
            <TerminalSection>
              <TerminalLabel>
                <FaTerminal />
                Your Terminal (Your Device)
              </TerminalLabel>
              <TerminalWrapper>
                <AndroidDevTerminal
                  phoneConnected={gameState.phone.owned}
                  phoneData={gameState.phone}
                  gameState={gameState}
                  dispatch={dispatch}
                  isAttackMode={true}
                  isTutorialMode={true}
                />
              </TerminalWrapper>
            </TerminalSection>

            <TerminalSection>
              <TerminalLabel>
                <FaTerminal />
                Target Device Terminal
              </TerminalLabel>
              <TerminalWrapper>
                <AndroidDevTerminal
                  phoneConnected={true}
                  phoneData={null}
                  gameState={null}
                  dispatch={null}
                  isTargetTerminal={true}
                  isTutorialMode={true}
                  targetDevice={{
                    name: 'Target Device',
                    os: 'Android 11',
                    security: 4,
                    status: 'vulnerable'
                  }}
                  onCommand={(cmd) => {
                    // Auto-compromise device when exploit commands are used in tutorial
                    if (cmd.includes('exploit shell') || cmd.includes('exploit backdoor')) {
                      setTimeout(() => {
                        // Device will be marked as compromised
                      }, 2000);
                    }
                  }}
                />
              </TerminalWrapper>
            </TerminalSection>
          </TerminalArea>
        )}
      </ContentLayout>
    </TutorialContainer>
  );
};

export default AttackTutorial;


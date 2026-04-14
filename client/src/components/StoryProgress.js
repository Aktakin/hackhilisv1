import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaCheckCircle, FaFlag, FaTrophy, FaEye, FaChevronDown, FaChevronUp, FaLock } from 'react-icons/fa';
import { storyConfig } from '../story/storyConfig';

const getCurrentStoryStep = (story, character) => {
  if (!story || !character) return null;
  
  const personalityStories = storyConfig[character.personality];
  if (!personalityStories) return null;
  
  const jobStory = personalityStories[story.job];
  if (!jobStory) return null;
  
  const chapter = jobStory.chapters.find(c => c.id === story.currentChapter);
  if (!chapter) return null;
  
  const step = chapter.steps.find(s => s.id === story.currentStep);
  return step || null;
};

const getNextStoryStep = (story, character) => {
  if (!story || !character) return null;
  
  const personalityStories = storyConfig[character.personality];
  if (!personalityStories) return null;
  
  const jobStory = personalityStories[story.job];
  if (!jobStory) return null;
  
  const chapter = jobStory.chapters.find(c => c.id === story.currentChapter);
  if (!chapter) return null;
  
  const currentStepIndex = chapter.steps.findIndex(s => s.id === story.currentStep);
  if (currentStepIndex < chapter.steps.length - 1) {
    return chapter.steps[currentStepIndex + 1];
  }
  
  // Check for next chapter
  const currentChapterIndex = jobStory.chapters.findIndex(c => c.id === story.currentChapter);
  if (currentChapterIndex < jobStory.chapters.length - 1) {
    const nextChapter = jobStory.chapters[currentChapterIndex + 1];
    return nextChapter.steps[0];
  }
  
  return null; // Story complete
};

const StoryContainer = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
  position: relative;
  z-index: 1;
`;

const StoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StoryTitle = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChapterInfo = styled.div`
  color: #00ffff;
  font-size: 0.9rem;
  font-family: 'Share Tech Mono', monospace;
`;

const CurrentStepCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00ff41;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
`;

const StepTitle = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StepDescription = styled.p`
  color: #ccc;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const ObjectivesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 15px 0;
`;

const ObjectiveItem = styled.li`
  color: #00ffff;
  font-size: 0.9rem;
  margin-bottom: 8px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding-left: 5px;

  &::before {
    content: '▸';
    color: #00ff41;
    font-weight: bold;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 15px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00ff41, #00cc33);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const ViewDetailsButton = styled(motion.button)`
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 10;
  pointer-events: auto;

  &:hover {
    background: linear-gradient(45deg, #00cc33, #00ff41);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ChaptersSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid rgba(0, 255, 65, 0.3);
  padding-top: 20px;
`;

const ChaptersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  cursor: pointer;
  user-select: none;
`;

const ChaptersTitle = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChaptersList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 15px;
`;

const ChapterCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid ${props => {
    if (props.current) return '#00ff41';
    if (props.completed) return '#00ffff';
    if (props.available) return '#ffaa00';
    return '#666';
  }};
  border-radius: 8px;
  padding: 15px;
  cursor: ${props => props.available || props.current ? 'pointer' : 'not-allowed'};
  opacity: ${props => props.available || props.current || props.completed ? 1 : 0.5};
  position: relative;
`;

const ChapterNumber = styled.div`
  color: ${props => {
    if (props.current) return '#00ff41';
    if (props.completed) return '#00ffff';
    if (props.available) return '#ffaa00';
    return '#666';
  }};
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ChapterName = styled.div`
  color: #ccc;
  font-size: 0.85rem;
  line-height: 1.4;
`;

const ChapterStatus = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.7rem;
  color: ${props => {
    if (props.current) return '#00ff41';
    if (props.completed) return '#00ffff';
    return '#666';
  }};
`;

const StoryProgress = ({ story, character, onViewDetails }) => {
  const [showChapters, setShowChapters] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  if (!story || !character) return null;

  const currentStep = getCurrentStoryStep(story, character);
  const nextStep = getNextStoryStep(story, character);

  if (!currentStep) return null;

  // Calculate progress
  const personalityStories = storyConfig[character.personality];
  const jobStory = personalityStories?.[story.job];
  const chapter = jobStory?.chapters?.find(c => c.id === story.currentChapter);
  const totalSteps = chapter?.steps?.length || 1;
  const currentStepIndex = chapter?.steps?.findIndex(s => s.id === story.currentStep) || 0;
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;

  // Get all chapters
  const allChapters = jobStory?.chapters || [];
  
  // Determine chapter status - ALL AVAILABLE
  const getChapterStatus = (chapterId) => {
    if (chapterId === story.currentChapter) return 'current';
    if (chapterId < story.currentChapter) return 'completed';
    // Unlock all chapters for testing
    return 'available'; // All chapters are now available
  };

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setShowChapters(true); // Keep chapters expanded when one is selected
  };

  // If a chapter is selected, show its steps
  const displayChapter = selectedChapter || chapter;
  const displaySteps = displayChapter?.steps || [];

  return (
    <StoryContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <StoryHeader>
        <StoryTitle>
          <FaBook />
          Story Mode: {jobStory?.title || 'Your Story'}
        </StoryTitle>
        <ChapterInfo>
          Chapter {story.currentChapter} • Step {story.currentStep}/{totalSteps}
        </ChapterInfo>
      </StoryHeader>

      {!selectedChapter ? (
        <CurrentStepCard>
          <StepTitle>
            <FaFlag />
            {currentStep.title}
          </StepTitle>
          <StepDescription>{currentStep.description}</StepDescription>

          {currentStep.objectives && currentStep.objectives.length > 0 && (
            <>
              <div style={{ color: '#00ff41', fontSize: '0.9rem', marginBottom: '10px', fontWeight: 'bold' }}>
                Objectives:
              </div>
              <ObjectivesList>
                {currentStep.objectives.map((objective, index) => (
                  <ObjectiveItem key={index}>{objective}</ObjectiveItem>
                ))}
              </ObjectivesList>
            </>
          )}

          <ViewDetailsButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('View Details clicked, step:', currentStep);
              if (onViewDetails && currentStep) {
                onViewDetails(currentStep);
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEye />
            View Details
          </ViewDetailsButton>
        </CurrentStepCard>
      ) : (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.3)', 
            border: '1px solid #00ff41', 
            borderRadius: '10px', 
            padding: '20px',
            marginBottom: '20px'
          }}>
            <StepTitle style={{ marginBottom: '10px' }}>
              <FaBook />
              {selectedChapter.title}
            </StepTitle>
            <StepDescription>{selectedChapter.description}</StepDescription>
            <div style={{ 
              marginTop: '15px', 
              padding: '10px', 
              background: 'rgba(0, 255, 65, 0.1)', 
              borderRadius: '5px',
              color: '#00ff41',
              fontSize: '0.9rem'
            }}>
              {displaySteps.length} steps in this chapter
            </div>
          </div>

          {/* Combine all objectives from all steps into one list */}
          {(() => {
            const allObjectives = [];
            displaySteps.forEach(step => {
              if (step.objectives && step.objectives.length > 0) {
                step.objectives.forEach(obj => {
                  if (!allObjectives.includes(obj)) {
                    allObjectives.push(obj);
                  }
                });
              }
            });

            return allObjectives.length > 0 ? (
              <CurrentStepCard style={{ marginBottom: '20px' }}>
                <div style={{ color: '#00ff41', fontSize: '0.9rem', marginBottom: '10px', fontWeight: 'bold' }}>
                  Objectives:
                </div>
                <ObjectivesList>
                  {allObjectives.map((objective, objIndex) => (
                    <ObjectiveItem key={objIndex}>{objective}</ObjectiveItem>
                  ))}
                </ObjectivesList>
              </CurrentStepCard>
            ) : null;
          })()}

          {displaySteps.length > 0 && (
            <ViewDetailsButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Show the first step of the selected chapter with chapter context
                const firstStep = displaySteps[0];
                if (onViewDetails && firstStep) {
                  // Pass the step with chapter information
                  onViewDetails({
                    ...firstStep,
                    chapterId: selectedChapter.id,
                    chapterTitle: selectedChapter.title
                  });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ marginTop: '20px', width: '100%' }}
            >
              <FaEye />
              View Details
            </ViewDetailsButton>
          )}

          <ViewDetailsButton
            onClick={() => setSelectedChapter(null)}
            style={{ 
              background: 'rgba(255, 170, 0, 0.2)',
              border: '1px solid #ffaa00',
              color: '#ffaa00',
              marginTop: '20px'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Current Step
          </ViewDetailsButton>
        </div>
      )}

      <ChaptersSection>
        <ChaptersHeader onClick={() => setShowChapters(!showChapters)}>
          <ChaptersTitle>
            <FaBook />
            All Chapters ({allChapters.length})
          </ChaptersTitle>
          {showChapters ? <FaChevronUp color="#00ff41" /> : <FaChevronDown color="#00ff41" />}
        </ChaptersHeader>

        <AnimatePresence>
          {showChapters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChaptersList>
                {allChapters.map((ch) => {
                  const status = getChapterStatus(ch.id);
                  const isSelected = selectedChapter?.id === ch.id;
                  return (
                    <ChapterCard
                      key={ch.id}
                      current={status === 'current' && !isSelected}
                      completed={status === 'completed' && !isSelected}
                      available={status === 'available' && !isSelected}
                      onClick={() => handleChapterClick(ch)}
                      style={{
                        borderColor: isSelected ? '#00ff41' : undefined,
                        background: isSelected ? 'rgba(0, 255, 65, 0.1)' : undefined
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChapterStatus>
                        {isSelected && <FaFlag />}
                        {!isSelected && status === 'current' && <FaFlag />}
                        {!isSelected && status === 'completed' && <FaCheckCircle />}
                        {!isSelected && status === 'locked' && <FaLock />}
                      </ChapterStatus>
                      <ChapterNumber
                        current={status === 'current' || isSelected}
                        completed={status === 'completed' && !isSelected}
                        available={status === 'available' && !isSelected}
                      >
                        Chapter {ch.id}
                      </ChapterNumber>
                      <ChapterName>{ch.title}</ChapterName>
                      <div style={{ color: '#888', fontSize: '0.75rem', marginTop: '5px' }}>
                        {ch.steps?.length || 0} steps
                      </div>
                      {ch.description && (
                        <div style={{ color: '#888', fontSize: '0.75rem', marginTop: '5px' }}>
                          {ch.description}
                        </div>
                      )}
                    </ChapterCard>
                  );
                })}
              </ChaptersList>
            </motion.div>
          )}
        </AnimatePresence>
      </ChaptersSection>
    </StoryContainer>
  );
};

export default StoryProgress;


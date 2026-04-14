import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaShieldAlt, FaBuilding, FaCode, FaUniversity, FaHospital, FaTimes } from 'react-icons/fa';

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
  max-width: 800px;
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
  z-index: 10;

  &:hover {
    background: rgba(255, 0, 64, 0.1);
    box-shadow: 0 0 10px rgba(255, 0, 64, 0.5);
    transform: rotate(90deg);
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

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const JobCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid ${props => props.selected ? '#00ff41' : '#333'};
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    border-color: #00ff41;
    background: rgba(0, 255, 65, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
  }

  ${props => props.selected && `
    background: rgba(0, 255, 65, 0.2);
    box-shadow: 0 0 25px rgba(0, 255, 65, 0.5);
  `}
`;

const JobIcon = styled.div`
  font-size: 3rem;
  color: #00ff41;
  margin-bottom: 15px;
`;

const JobName = styled.div`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const JobDescription = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const JobDetails = styled.div`
  color: #888;
  font-size: 0.85rem;
  font-style: italic;
  margin-top: 10px;
`;

const SelectButton = styled.button`
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
  margin-top: 30px;

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

const getJobsForPersonality = (personality) => {
  if (personality === 'professional') {
    return [
      {
        id: 'government',
        name: 'Government Security',
        icon: FaShieldAlt,
        description: 'Work as a cybersecurity specialist for the government. Your mission: track down and neutralize a terrorist group that has been launching cyberattacks against critical infrastructure.',
        details: 'High-stakes investigation, pattern analysis, and digital forensics'
      },
      {
        id: 'private_security',
        name: 'Private Security Firm',
        icon: FaBuilding,
        description: 'Join a prestigious private security firm protecting major corporations. Investigate corporate espionage, data breaches, and insider threats.',
        details: 'Corporate investigations, threat analysis, client protection'
      },
      {
        id: 'tech_company',
        name: 'Tech Company',
        icon: FaCode,
        description: 'Work as a security engineer at a leading tech company. Protect user data, investigate vulnerabilities, and build secure systems.',
        details: 'Product security, bug bounties, secure development'
      },
      {
        id: 'university',
        name: 'University Research',
        icon: FaUniversity,
        description: 'Join a cybersecurity research team at a university. Conduct cutting-edge research, publish papers, and mentor students.',
        details: 'Academic research, teaching, innovation'
      },
      {
        id: 'healthcare',
        name: 'Healthcare Security',
        icon: FaHospital,
        description: 'Protect medical systems and patient data. Investigate healthcare breaches and ensure HIPAA compliance.',
        details: 'Medical data protection, compliance, patient privacy'
      },
      {
        id: 'freelance',
        name: 'Freelance Consultant',
        icon: FaBriefcase,
        description: 'Work independently as a security consultant. Take on various clients, from small businesses to large enterprises.',
        details: 'Flexible schedule, diverse clients, build your reputation'
      }
    ];
  } else if (personality === 'delusional') {
    return [
      {
        id: 'criminal_empire',
        name: 'Criminal Empire',
        icon: FaCode,
        description: 'Build your criminal hacking empire. Attack targets, steal data, sell on dark web, and evade the police. Live on the edge and cause maximum chaos.',
        details: 'Criminal operations, dark web marketplace, police evasion, chaos'
      }
    ];
  }
  return [];
};

const JobSelectionModal = ({ character, onClose, onSelectJob }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const jobs = getJobsForPersonality(character?.personality);

  const handleSelect = () => {
    if (selectedJob) {
      onSelectJob(selectedJob);
      onClose();
    }
  };

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
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
        
        <Title>Choose Your Path</Title>
        <Subtitle>
          Welcome, {character?.nickname}! As a {character?.personality === 'professional' ? 'Professional' : character?.personality === 'delusional' ? 'Delusional' : character?.personality}, 
          {character?.personality === 'delusional' 
            ? ' select your criminal path and start building your empire.' 
            : ' select the job that best fits your career goals.'}
        </Subtitle>

        <JobsGrid>
          {jobs.map((job) => {
            const IconComponent = job.icon;
            return (
              <JobCard
                key={job.id}
                selected={selectedJob?.id === job.id}
                onClick={() => setSelectedJob(job)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <JobIcon>
                  <IconComponent />
                </JobIcon>
                <JobName>{job.name}</JobName>
                <JobDescription>{job.description}</JobDescription>
                <JobDetails>{job.details}</JobDetails>
              </JobCard>
            );
          })}
        </JobsGrid>

        <SelectButton
          onClick={handleSelect}
          disabled={!selectedJob}
        >
          {selectedJob ? `Start Career as ${selectedJob.name}` : 'Select a Job to Continue'}
        </SelectButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default JobSelectionModal;


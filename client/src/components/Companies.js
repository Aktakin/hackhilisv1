import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  FaBuilding, 
  FaShieldAlt, 
  FaWifi, 
  FaDatabase, 
  FaMobile, 
  FaMoneyBillWave,
  FaUserTie,
  FaLock,
  FaUnlock,
  FaEye,
  FaEyeSlash,
  FaHackerNews,
  FaNetworkWired,
  FaServer,
  FaCloud,
  FaGlobe,
  FaChartLine,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaSort,
  FaInfoCircle,
  FaDollarSign,
  FaUsers,
  FaCog,
  FaPlay,
  FaPause,
  FaStop
} from 'react-icons/fa';

const CompaniesContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
`;

const CompaniesHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const CompaniesTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const CompaniesSubtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(45deg, #00ff41, #00cc33)' : 'transparent'};
  color: ${props => props.active ? '#000' : '#00ff41'};
  border: 2px solid #00ff41;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${props => props.active ? 'linear-gradient(45deg, #00cc33, #00ff41)' : '#00ff41'};
    color: ${props => props.active ? '#000' : '#000'};
    transform: translateY(-2px);
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 25px;
  padding: 10px 20px;
  margin-bottom: 20px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  outline: none;
  flex: 1;

  &::placeholder {
    color: #666;
  }
`;

const CompaniesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const CompanyCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.companyType === 'cybersecurity' ? 'linear-gradient(90deg, #00ff41, #00cc33)' :
                   props.companyType === 'telecom' ? 'linear-gradient(90deg, #00ffff, #0099cc)' :
                   props.companyType === 'data' ? 'linear-gradient(90deg, #ff6600, #ff9900)' :
                   props.companyType === 'phone' ? 'linear-gradient(90deg, #ff0066, #cc0066)' :
                   props.companyType === 'banking' ? 'linear-gradient(90deg, #ffaa00, #ffcc00)' :
                   props.companyType === 'technology' ? 'linear-gradient(90deg, #00ccff, #0099cc)' :
                   props.companyType === 'healthcare' ? 'linear-gradient(90deg, #00ff88, #00cc66)' :
                   'linear-gradient(90deg, #666, #999)'};
  }
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CompanyIcon = styled.div`
  font-size: 2.5rem;
  color: #00ff41;
`;

const CompanyDetails = styled.div`
  flex: 1;
`;

const CompanyName = styled.h3`
  color: #00ff41;
  font-size: 1.4rem;
  margin-bottom: 5px;
  font-family: 'Orbitron', sans-serif;
`;

const CompanyType = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CompanySize = styled.p`
  color: #666;
  font-size: 0.8rem;
`;

const CompanyStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: ${props => props.secure ? '#00ff41' : '#ff0040'};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.secure ? '#00ff41' : '#ff0040'};
  animation: ${props => props.secure ? 'pulse 2s infinite' : 'none'};
`;

const CompanyStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
`;

const StatValue = styled.div`
  color: #00ff41;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 0.8rem;
`;

const CompanyActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background: ${props => props.primary ? 'linear-gradient(45deg, #00ff41, #00cc33)' : 'transparent'};
  color: ${props => props.primary ? '#000' : '#00ff41'};
  border: 2px solid #00ff41;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  flex: 1;

  &:hover {
    background: ${props => props.primary ? 'linear-gradient(45deg, #00cc33, #00ff41)' : '#00ff41'};
    color: ${props => props.primary ? '#000' : '#000'};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const JobModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: rgba(26, 26, 46, 0.95);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #00ff41;
`;

const ModalTitle = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 2px solid #ff0040;
  border-radius: 8px;
  padding: 8px 12px;
  color: #ff0040;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 0, 64, 0.1);
  }
`;

const JobList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const JobCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  border-radius: 10px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff41;
    background: rgba(0, 255, 65, 0.05);
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const JobTitle = styled.h4`
  color: #00ff41;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const JobSalary = styled.div`
  color: #00ff41;
  font-weight: bold;
  font-size: 1.2rem;
`;

const JobRequirements = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const RequirementTag = styled.span`
  background: ${props => props.met ? 'rgba(0, 255, 65, 0.2)' : 'rgba(255, 0, 64, 0.2)'};
  color: ${props => props.met ? '#00ff41' : '#ff0040'};
  border: 1px solid ${props => props.met ? '#00ff41' : '#ff0040'};
  border-radius: 15px;
  padding: 4px 12px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const JobDescription = styled.p`
  color: #888;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 15px;
`;

const TrainingInfo = styled.div`
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid #00ff41;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 15px;
`;

const TrainingTitle = styled.div`
  color: #00ff41;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TrainingText = styled.div`
  color: #888;
  font-size: 0.8rem;
  line-height: 1.4;
`;

const ScamWarning = styled.div`
  background: rgba(255, 0, 64, 0.1);
  border: 1px solid #ff0040;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 15px;
`;

const WarningTitle = styled.div`
  color: #ff0040;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const WarningText = styled.div`
  color: #ff6666;
  font-size: 0.8rem;
  line-height: 1.4;
`;

const ApplyButton = styled.button`
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

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

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const Companies = ({ user }) => {
  const { gameState, dispatch } = useGame();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);

  // Mock company data
  const companies = [
    {
      id: 'cybersec1',
      name: 'QuantumShield Corp',
      type: 'cybersecurity',
      size: 'Large (5000+ employees)',
      icon: FaShieldAlt,
      secure: true,
      stats: {
        money: 2500000,
        dataValue: 5000000,
        securityLevel: 95,
        reputation: 98
      },
      jobs: [
        {
          title: 'Senior Penetration Tester',
          salary: 150000,
          requirements: [
            { skill: 'hacking', level: 80, met: gameState.skills.hacking >= 80 },
            { skill: 'networking', level: 70, met: gameState.skills.networking >= 70 },
            { skill: 'level', level: 15, met: gameState.level >= 15 }
          ],
          description: 'Lead penetration testing initiatives and security assessments for enterprise clients.'
        },
        {
          title: 'Security Analyst',
          salary: 90000,
          requirements: [
            { skill: 'hacking', level: 50, met: gameState.skills.hacking >= 50 },
            { skill: 'level', level: 8, met: gameState.level >= 8 }
          ],
          description: 'Monitor security systems and analyze threats for corporate networks.'
        }
      ]
    },
    {
      id: 'telecom1',
      name: 'NeoConnect Telecom',
      type: 'telecom',
      size: 'Mega (50000+ employees)',
      icon: FaWifi,
      secure: false,
      stats: {
        money: 10000000,
        dataValue: 15000000,
        securityLevel: 60,
        reputation: 75
      },
      jobs: [
        {
          title: 'Network Security Engineer',
          salary: 120000,
          requirements: [
            { skill: 'networking', level: 85, met: gameState.skills.networking >= 85 },
            { skill: 'level', level: 12, met: gameState.level >= 12 }
          ],
          description: 'Design and implement secure network infrastructure for telecommunications.'
        }
      ]
    },
    {
      id: 'data1',
      name: 'DataVault Systems',
      type: 'data',
      size: 'Medium (1000+ employees)',
      icon: FaDatabase,
      secure: true,
      stats: {
        money: 800000,
        dataValue: 2000000,
        securityLevel: 88,
        reputation: 85
      },
      jobs: [
        {
          title: 'Data Security Specialist',
          salary: 110000,
          requirements: [
            { skill: 'cryptography', level: 75, met: gameState.skills.cryptography >= 75 },
            { skill: 'level', level: 10, met: gameState.level >= 10 }
          ],
          description: 'Protect sensitive data and implement encryption solutions.'
        }
      ]
    },
    {
      id: 'phone1',
      name: 'SecurePhone Inc',
      type: 'phone',
      size: 'Large (8000+ employees)',
      icon: FaMobile,
      secure: false,
      stats: {
        money: 5000000,
        dataValue: 8000000,
        securityLevel: 45,
        reputation: 60
      },
      jobs: [
        {
          title: 'Mobile Security Expert',
          salary: 130000,
          requirements: [
            { skill: 'hacking', level: 70, met: gameState.skills.hacking >= 70 },
            { skill: 'level', level: 14, met: gameState.level >= 14 }
          ],
          description: 'Develop secure mobile applications and security protocols.'
        }
      ]
    },
    {
      id: 'bank1',
      name: 'CyberBank Financial',
      type: 'banking',
      size: 'Mega (100000+ employees)',
      icon: FaMoneyBillWave,
      secure: true,
      stats: {
        money: 50000000,
        dataValue: 100000000,
        securityLevel: 98,
        reputation: 95
      },
      jobs: [
        {
          title: 'Financial Security Director',
          salary: 200000,
          requirements: [
            { skill: 'hacking', level: 90, met: gameState.skills.hacking >= 90 },
            { skill: 'cryptography', level: 85, met: gameState.skills.cryptography >= 85 },
            { skill: 'level', level: 20, met: gameState.level >= 20 }
          ],
          description: 'Lead cybersecurity initiatives for financial institution.'
        }
      ]
    },
    {
      id: 'tech1',
      name: 'Urvan Tech',
      type: 'technology',
      size: 'Large (12000+ employees)',
      icon: FaCog,
      secure: true,
      stats: {
        money: 1500000,
        dataValue: 3000000,
        securityLevel: 85,
        reputation: 88
      },
      jobs: [
        {
          title: 'Junior Security Analyst',
          salary: 45000,
          requirements: [
            { skill: 'hacking', level: 20, met: gameState.skills.hacking >= 20 },
            { skill: 'level', level: 3, met: gameState.level >= 3 }
          ],
          description: 'Entry-level position with extensive training program. Learn cybersecurity fundamentals through hands-on experience and comprehensive documentation.',
          training: '6-month intensive training program with access to proprietary security documentation and mentorship.'
        },
        {
          title: 'Security Intern',
          salary: 25000,
          requirements: [
            { skill: 'level', level: 1, met: gameState.level >= 1 }
          ],
          description: 'Perfect for beginners! Learn the basics of cybersecurity with full training support and documentation.',
          training: '12-month internship with complete training materials and certification opportunities.'
        }
      ]
    },
    {
      id: 'health1',
      name: 'FirstCity Healthcare',
      type: 'healthcare',
      size: 'Large (15000+ employees)',
      icon: FaShieldAlt,
      secure: true,
      stats: {
        money: 800000,
        dataValue: 2000000,
        securityLevel: 90,
        reputation: 92
      },
      jobs: [
        {
          title: 'Healthcare Security Trainee',
          salary: 40000,
          requirements: [
            { skill: 'hacking', level: 15, met: gameState.skills.hacking >= 15 },
            { skill: 'level', level: 2, met: gameState.level >= 2 }
          ],
          description: 'Specialized training in healthcare cybersecurity with focus on HIPAA compliance and medical data protection.',
          training: 'Comprehensive 8-month program covering healthcare-specific security protocols and compliance requirements.'
        },
        {
          title: 'Security Support Specialist',
          salary: 35000,
          requirements: [
            { skill: 'level', level: 1, met: gameState.level >= 1 }
          ],
          description: 'Entry-level position with full training in healthcare security fundamentals.',
          training: 'Complete training package with access to healthcare security documentation and expert mentorship.'
        }
      ]
    },
    {
      id: 'tech2',
      name: 'Nvizio',
      type: 'technology',
      size: 'Medium (3000+ employees)',
      icon: FaServer,
      secure: true,
      stats: {
        money: 600000,
        dataValue: 1200000,
        securityLevel: 80,
        reputation: 85
      },
      jobs: [
        {
          title: 'Cybersecurity Apprentice',
          salary: 38000,
          requirements: [
            { skill: 'hacking', level: 10, met: gameState.skills.hacking >= 10 },
            { skill: 'level', level: 2, met: gameState.level >= 2 }
          ],
          description: 'Comprehensive apprenticeship program with extensive training in modern cybersecurity practices.',
          training: '10-month structured program with access to cutting-edge security tools and documentation.'
        },
        {
          title: 'Junior Penetration Tester',
          salary: 42000,
          requirements: [
            { skill: 'hacking', level: 25, met: gameState.skills.hacking >= 25 },
            { skill: 'level', level: 4, met: gameState.level >= 4 }
          ],
          description: 'Learn ethical hacking through guided training and real-world practice scenarios.',
          training: 'Intensive 6-month program with hands-on labs and access to professional testing tools.'
        }
      ]
    },
    {
      id: 'tech3',
      name: '419 Station',
      type: 'technology',
      size: 'Small (50+ employees)',
      icon: FaCog,
      secure: true,
      stats: {
        money: 50000,
        dataValue: 100000,
        securityLevel: 55,
        reputation: 65
      },
      jobs: [
        {
          title: 'Remote Security Consultant',
          salary: 80000,
          requirements: [
            { skill: 'level', level: 1, met: true }
          ],
          description: 'Work from home opportunity! No experience required. We provide all training materials.',
          scam: true
        },
        {
          title: 'Cybersecurity Specialist',
          salary: 120000,
          requirements: [
            { skill: 'level', level: 1, met: true }
          ],
          description: 'High-paying position with no requirements! Perfect for beginners looking to make quick money.',
          scam: true
        }
      ]
    },
    {
      id: 'tech4',
      name: 'Mugu Secure',
      type: 'technology',
      size: 'Small (25+ employees)',
      icon: FaCog,
      secure: true,
      stats: {
        money: 25000,
        dataValue: 50000,
        securityLevel: 53,
        reputation: 68
      },
      jobs: [
        {
          title: 'Security Analyst',
          salary: 95000,
          requirements: [
            { skill: 'level', level: 1, met: true }
          ],
          description: 'Immediate start! No background check required. We train you on the job.',
          scam: true
        },
        {
          title: 'IT Security Manager',
          salary: 150000,
          requirements: [
            { skill: 'level', level: 1, met: true }
          ],
          description: 'Management position with no experience needed! We provide all necessary training.',
          scam: true
        }
      ]
    },
    {
      id: 'gov_db',
      name: 'Government Database',
      type: 'data',
      size: 'Mega (100000+ employees)',
      icon: FaDatabase,
      secure: true,
      stats: {
        money: 50000000,
        dataValue: 200000000,
        securityLevel: 75,
        reputation: 100
      },
      storyModeOnly: true, // Only show in story mode
      attackDetails: {
        timeline: '48 hours ago',
        attackVectors: ['Zero-day vulnerability', 'SQL Injection', 'Privilege Escalation'],
        compromisedData: ['Employee records', 'Infrastructure blueprints', 'Communication intercepts'],
        signatures: ['198.51.100.42', 'Shadow Network', 'Coordinated attack pattern']
      },
      jobs: []
    }
  ];

  // Filter companies based on story mode
  const availableCompanies = gameState.gameMode === 'story' 
    ? companies 
    : companies.filter(company => !company.storyModeOnly);

  const filteredCompanies = availableCompanies.filter(company => {
    const matchesFilter = selectedFilter === 'all' || company.type === selectedFilter;
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openJobModal = (company) => {
    setSelectedCompany(company);
    setShowJobModal(true);
  };

  const applyForJob = (job) => {
    // Check if player meets all requirements
    const meetsRequirements = job.requirements.every(req => req.met);
    
    if (meetsRequirements) {
      // Apply for job
      console.log('Applied for job:', job.title);
      alert(`Successfully applied for ${job.title} at ${selectedCompany.name}!`);
      setShowJobModal(false);
    } else {
      alert('You do not meet the requirements for this position.');
    }
  };

  const hackCompany = (company) => {
    // Implement hacking logic
    console.log('Attempting to hack:', company.name);
    alert(`Attempting to hack ${company.name}... This feature will be implemented in the hacking system.`);
  };

  const getCompanyTypeIcon = (type) => {
    switch (type) {
      case 'cybersecurity': return FaShieldAlt;
      case 'telecom': return FaWifi;
      case 'data': return FaDatabase;
      case 'phone': return FaMobile;
      case 'banking': return FaMoneyBillWave;
      case 'technology': return FaCog;
      case 'healthcare': return FaShieldAlt;
      default: return FaBuilding;
    }
  };

  const getCompanyTypeColor = (type) => {
    switch (type) {
      case 'cybersecurity': return '#00ff41';
      case 'telecom': return '#00ffff';
      case 'data': return '#ff6600';
      case 'phone': return '#ff0066';
      case 'banking': return '#ffaa00';
      case 'technology': return '#00ccff';
      case 'healthcare': return '#00ff88';
      default: return '#666';
    }
  };

  return (
    <CompaniesContainer>
      <CompaniesHeader>
        <CompaniesTitle>Corporate Targets</CompaniesTitle>
        <CompaniesSubtitle>
          Hack companies, steal data, or get hired - the choice is yours
        </CompaniesSubtitle>
      </CompaniesHeader>

      <SearchBar>
        <FaSearch style={{ color: '#666', marginRight: '10px' }} />
        <SearchInput
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      <FilterBar>
        <FilterButton
          active={selectedFilter === 'all'}
          onClick={() => setSelectedFilter('all')}
        >
          <FaBuilding />
          All Companies
        </FilterButton>
        <FilterButton
          active={selectedFilter === 'cybersecurity'}
          onClick={() => setSelectedFilter('cybersecurity')}
        >
          <FaShieldAlt />
          Cybersecurity
        </FilterButton>
        <FilterButton
          active={selectedFilter === 'telecom'}
          onClick={() => setSelectedFilter('telecom')}
        >
          <FaWifi />
          Telecom
        </FilterButton>
        <FilterButton
          active={selectedFilter === 'data'}
          onClick={() => setSelectedFilter('data')}
        >
          <FaDatabase />
          Data
        </FilterButton>
        <FilterButton
          active={selectedFilter === 'phone'}
          onClick={() => setSelectedFilter('phone')}
        >
          <FaMobile />
          Phone
        </FilterButton>
        <FilterButton
          active={selectedFilter === 'banking'}
          onClick={() => setSelectedFilter('banking')}
        >
          <FaMoneyBillWave />
          Banking
        </FilterButton>
        <FilterButton
          active={selectedFilter === 'technology'}
          onClick={() => setSelectedFilter('technology')}
        >
          <FaCog />
          Technology
        </FilterButton>
        <FilterButton
          active={selectedFilter === 'healthcare'}
          onClick={() => setSelectedFilter('healthcare')}
        >
          <FaShieldAlt />
          Healthcare
        </FilterButton>
      </FilterBar>

      <CompaniesGrid>
        {filteredCompanies.map((company) => (
          <CompanyCard
            key={company.id}
            companyType={company.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CompanyHeader>
              <CompanyInfo>
                <CompanyIcon as={company.icon} />
                <CompanyDetails>
                  <CompanyName>{company.name}</CompanyName>
                  <CompanyType>{company.type}</CompanyType>
                  <CompanySize>{company.size}</CompanySize>
                </CompanyDetails>
              </CompanyInfo>
              <CompanyStatus secure={company.secure}>
                <StatusDot secure={company.secure} />
                {company.secure ? 'Secure' : 'Vulnerable'}
              </CompanyStatus>
            </CompanyHeader>

            <CompanyStats>
              <StatItem>
                <StatValue>
                  <FaDollarSign />
                  ${company.stats.money.toLocaleString()}
                </StatValue>
                <StatLabel>Available Money</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <FaDatabase />
                  ${company.stats.dataValue.toLocaleString()}
                </StatValue>
                <StatLabel>Data Value</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <FaShieldAlt />
                  {company.stats.securityLevel}%
                </StatValue>
                <StatLabel>Security Level</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  <FaStar />
                  {company.stats.reputation}%
                </StatValue>
                <StatLabel>Reputation</StatLabel>
              </StatItem>
            </CompanyStats>

            <CompanyActions>
              {company.attackDetails ? (
                <ActionButton 
                  primary 
                  onClick={() => {
                    setSelectedCompany(company);
                    setShowJobModal(true);
                  }}
                  style={{ width: '100%' }}
                >
                  <FaInfoCircle />
                  View Attack Details
                </ActionButton>
              ) : (
                <>
                  <ActionButton onClick={() => hackCompany(company)}>
                    <FaHackerNews />
                    Hack
                  </ActionButton>
                  <ActionButton primary onClick={() => openJobModal(company)}>
                    <FaBriefcase />
                    Jobs
                  </ActionButton>
                </>
              )}
            </CompanyActions>
          </CompanyCard>
        ))}
      </CompaniesGrid>

      <AnimatePresence>
        {showJobModal && selectedCompany && (
          <JobModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent>
              <ModalHeader>
                <ModalTitle>
                  {selectedCompany.attackDetails ? 'Attack Details' : `Jobs at ${selectedCompany.name}`}
                </ModalTitle>
                <CloseButton onClick={() => setShowJobModal(false)}>
                  <FaTimesCircle />
                </CloseButton>
              </ModalHeader>

              {selectedCompany.attackDetails ? (
                <div style={{ padding: '20px', color: '#ccc' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#00ff41', marginBottom: '10px', fontFamily: "'Orbitron', sans-serif" }}>Attack Timeline</h3>
                    <p style={{ color: '#ffaa00' }}>{selectedCompany.attackDetails.timeline}</p>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#00ff41', marginBottom: '10px', fontFamily: "'Orbitron', sans-serif" }}>Attack Vectors</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {selectedCompany.attackDetails.attackVectors.map((vector, idx) => (
                        <li key={idx} style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#00ff41' }}>▸</span>
                          {vector}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ color: '#00ff41', marginBottom: '10px', fontFamily: "'Orbitron', sans-serif" }}>Compromised Data</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {selectedCompany.attackDetails.compromisedData.map((data, idx) => (
                        <li key={idx} style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#00ff41' }}>▸</span>
                          {data}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 style={{ color: '#00ff41', marginBottom: '10px', fontFamily: "'Orbitron', sans-serif" }}>Attack Signatures</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {selectedCompany.attackDetails.signatures.map((sig, idx) => (
                        <li key={idx} style={{ marginBottom: '8px', paddingLeft: '20px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#00ff41' }}>▸</span>
                          {sig}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <JobList>
                  {selectedCompany.jobs.map((job, index) => (
                  <JobCard key={index}>
                    <JobHeader>
                      <JobTitle>{job.title}</JobTitle>
                      <JobSalary>${job.salary.toLocaleString()}/year</JobSalary>
                    </JobHeader>
                    
                    <JobRequirements>
                      {job.requirements.map((req, reqIndex) => (
                        <RequirementTag key={reqIndex} met={req.met}>
                          {req.met ? <FaCheckCircle /> : <FaTimesCircle />}
                          {req.skill}: {req.level}+ {req.skill === 'level' ? 'Level' : 'Skill'}
                        </RequirementTag>
                      ))}
                    </JobRequirements>
                    
                    <JobDescription>{job.description}</JobDescription>
                    
                    {job.training && (
                      <TrainingInfo>
                        <TrainingTitle>
                          <FaGraduationCap />
                          Training Program
                        </TrainingTitle>
                        <TrainingText>{job.training}</TrainingText>
                      </TrainingInfo>
                    )}
                    
                    
                    <ApplyButton
                      onClick={() => applyForJob(job)}
                      disabled={!job.requirements.every(req => req.met)}
                    >
                      {job.requirements.every(req => req.met) ? 'Apply Now' : 'Requirements Not Met'}
                    </ApplyButton>
                  </JobCard>
                    ))}
                  </JobList>
              )}
            </ModalContent>
          </JobModal>
        )}
      </AnimatePresence>
    </CompaniesContainer>
  );
};

export default Companies;

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  FaUser, 
  FaChartLine, 
  FaTrophy,
  FaShieldAlt,
  FaTerminal,
  FaDollarSign,
  FaCalendarAlt
} from 'react-icons/fa';

const ProfileContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, rgba(0, 255, 65, 0.1) 0%, rgba(0, 255, 255, 0.1) 100%);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.2);
`;

const ProfileTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const ProfileSubtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 20px;
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StatCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid #00ff41;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  color: #00ff41;
  margin-bottom: 10px;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

const Section = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  color: #00ff41;
  margin-bottom: 20px;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
`;

const SkillItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ff41;
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
  }
`;

const SkillName = styled.div`
  color: #00ff41;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 0.9rem;
`;

const SkillLevel = styled.div`
  color: #00ffff;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #333;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00ff41, #00ffff);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
`;

const InventoryItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00ff41;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const ItemIcon = styled.div`
  font-size: 1.5rem;
  color: #00ff41;
  margin-bottom: 8px;
`;

const ItemName = styled.div`
  color: #00ff41;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ItemStats = styled.div`
  color: #888;
  font-size: 0.7rem;
`;

const AchievementList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const AchievementItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00ff41;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const AchievementIcon = styled.div`
  font-size: 2rem;
  color: #00ff41;
  margin-bottom: 10px;
`;

const AchievementName = styled.div`
  color: #00ff41;
  font-weight: bold;
  margin-bottom: 5px;
`;

const AchievementDescription = styled.div`
  color: #888;
  font-size: 0.8rem;
  line-height: 1.3;
`;

const CareerInfo = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
`;

const CareerTitle = styled.div`
  color: #00ff41;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CareerDetails = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

const Profile = ({ user }) => {
  const { gameState } = useGame();

  const skills = [
    { name: 'Hacking', level: gameState.skills.hacking },
    { name: 'Networking', level: gameState.skills.networking },
    { name: 'Cryptography', level: gameState.skills.cryptography },
    { name: 'Social Engineering', level: gameState.skills.socialEngineering },
    { name: 'Forensics', level: gameState.skills.forensics },
    { name: 'Malware', level: gameState.skills.malware }
  ];

  const achievements = [
    {
      id: 1,
      name: 'First Hack',
      description: 'Successfully completed your first hack',
      icon: FaTerminal,
      unlocked: gameState.stats.hacksSuccessful > 0
    },
    {
      id: 2,
      name: 'Money Maker',
      description: 'Earned $10,000 through hacking',
      icon: FaDollarSign,
      unlocked: gameState.stats.moneyStolen >= 10000
    },
    {
      id: 3,
      name: 'Skill Master',
      description: 'Reached level 10 in any skill',
      icon: FaTrophy,
      unlocked: Object.values(gameState.skills).some(skill => skill >= 10)
    },
    {
      id: 4,
      name: 'Alliance Leader',
      description: 'Created your own alliance',
      icon: FaShieldAlt,
      unlocked: gameState.alliance.role === 'Leader'
    }
  ];

  const mockInventory = [
    { name: 'Gaming Laptop', type: 'laptop', stats: '+15 hacking' },
    { name: 'VPN Service', type: 'security', stats: '+10 security' },
    { name: 'Hacking Toolkit', type: 'tools', stats: '+10 hacking' },
    { name: 'Enterprise Router', type: 'router', stats: '+20 networking' }
  ];

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileTitle>{user?.username}</ProfileTitle>
        <ProfileSubtitle>
          Level {gameState.level} • {gameState.experience} XP • IP: {gameState.ipAddress} • {gameState.stats.reputation} Reputation
        </ProfileSubtitle>
        
        <ProfileStats>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatIcon as={FaDollarSign} />
            <StatValue>${gameState.money.toLocaleString()}</StatValue>
            <StatLabel>Money</StatLabel>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatIcon as={FaTerminal} />
            <StatValue>{gameState.stats.hacksSuccessful}</StatValue>
            <StatLabel>Successful Hacks</StatLabel>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatIcon as={FaChartLine} />
            <StatValue>{gameState.stats.hacksAttempted}</StatValue>
            <StatLabel>Total Attempts</StatLabel>
          </StatCard>

          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatIcon as={FaTrophy} />
            <StatValue>{achievements.filter(a => a.unlocked).length}</StatValue>
            <StatLabel>Achievements</StatLabel>
          </StatCard>
        </ProfileStats>
      </ProfileHeader>

      <ContentGrid>
        <Section>
          <SectionTitle>
            <FaChartLine />
            Skills
          </SectionTitle>
          <SkillsGrid>
            {skills.map((skill) => (
              <SkillItem key={skill.name}>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel>{skill.level}/100</SkillLevel>
                <ProgressBar>
                  <ProgressFill percentage={skill.level} />
                </ProgressBar>
              </SkillItem>
            ))}
          </SkillsGrid>
        </Section>

        <Section>
          <SectionTitle>
            <FaTrophy />
            Achievements
          </SectionTitle>
          <AchievementList>
            {achievements.map((achievement) => (
              <AchievementItem
                key={achievement.id}
                style={{
                  borderColor: achievement.unlocked ? '#00ff41' : '#666',
                  opacity: achievement.unlocked ? 1 : 0.5
                }}
              >
                <AchievementIcon as={achievement.icon} />
                <AchievementName>{achievement.name}</AchievementName>
                <AchievementDescription>{achievement.description}</AchievementDescription>
              </AchievementItem>
            ))}
          </AchievementList>
        </Section>

        <Section>
          <SectionTitle>
            <FaShieldAlt />
            Career
          </SectionTitle>
          {gameState.career.company ? (
            <CareerInfo>
              <CareerTitle>{gameState.career.position} at {gameState.career.company}</CareerTitle>
              <CareerDetails>
                Salary: ${gameState.career.salary.toLocaleString()}/month
              </CareerDetails>
            </CareerInfo>
          ) : (
            <CareerInfo>
              <CareerTitle>No Current Employment</CareerTitle>
              <CareerDetails>
                Complete courses and build your reputation to get hired by cybersecurity companies.
              </CareerDetails>
            </CareerInfo>
          )}
        </Section>

        <Section>
          <SectionTitle>
            <FaUser />
            Inventory
          </SectionTitle>
          <InventoryGrid>
            {mockInventory.map((item, index) => (
              <InventoryItem key={index}>
                <ItemIcon as={FaTerminal} />
                <ItemName>{item.name}</ItemName>
                <ItemStats>{item.stats}</ItemStats>
              </InventoryItem>
            ))}
          </InventoryGrid>
        </Section>
      </ContentGrid>
    </ProfileContainer>
  );
};

export default Profile;

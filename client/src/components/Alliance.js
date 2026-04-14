import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  FaUsers, 
  FaCrown, 
  FaUserPlus,
  FaUserMinus,
  FaShieldAlt,
  FaTrophy,
  FaChartLine
} from 'react-icons/fa';

const AllianceContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const AllianceHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const AllianceTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const AllianceSubtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  background: ${props => props.active ? '#00ff41' : 'transparent'};
  color: ${props => props.active ? '#000' : '#00ff41'};
  border: 2px solid #00ff41;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;

  &:hover {
    background: #00ff41;
    color: #000;
    transform: translateY(-2px);
  }
`;

const AllianceInfo = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
`;

const AllianceName = styled.h2`
  color: #00ff41;
  margin-bottom: 10px;
  font-family: 'Orbitron', sans-serif;
  font-size: 2rem;
`;

const AllianceStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const StatCard = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
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

const MembersSection = styled.div`
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

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
`;

const MemberCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00ff41;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const MemberIcon = styled.div`
  font-size: 1.5rem;
  color: #00ff41;
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  color: #00ff41;
  font-weight: bold;
  margin-bottom: 5px;
`;

const MemberLevel = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

const MemberRole = styled.div`
  color: #00ffff;
  font-size: 0.8rem;
  font-weight: bold;
`;

const CreateAllianceSection = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #00ff41;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 12px;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 12px;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #00cc33, #00ff41);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
    transform: translateY(-2px);
  }
`;

const AllianceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const AllianceCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const AllianceCardName = styled.h3`
  color: #00ff41;
  margin-bottom: 10px;
  font-size: 1.3rem;
`;

const AllianceCardDescription = styled.p`
  color: #888;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const AllianceCardStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
`;

const AllianceCardStat = styled.div`
  text-align: center;
`;

const AllianceCardStatValue = styled.div`
  color: #00ffff;
  font-weight: bold;
  font-size: 1.1rem;
`;

const AllianceCardStatLabel = styled.div`
  color: #888;
  font-size: 0.8rem;
`;

const JoinButton = styled.button`
  background: linear-gradient(45deg, #00ffff, #0099cc);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: linear-gradient(45deg, #0099cc, #00ffff);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const Alliance = ({ user }) => {
  const { gameState, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState('my-alliance');
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    requirements: ''
  });

  const mockAlliances = [
    {
      id: 1,
      name: 'Cyber Warriors',
      description: 'Elite hackers focused on taking down corporations',
      members: 15,
      level: 8,
      reputation: 950
    },
    {
      id: 2,
      name: 'Digital Shadows',
      description: 'Stealth-focused group specializing in espionage',
      members: 12,
      level: 6,
      reputation: 780
    },
    {
      id: 3,
      name: 'Code Breakers',
      description: 'Cryptography experts and security researchers',
      members: 20,
      level: 9,
      reputation: 1100
    }
  ];

  const mockMembers = [
    { id: 1, name: 'ShadowHacker', level: 12, role: 'Leader' },
    { id: 2, name: 'CyberNinja', level: 10, role: 'Officer' },
    { id: 3, name: 'DataThief', level: 8, role: 'Member' },
    { id: 4, name: 'CodeMaster', level: 9, role: 'Member' }
  ];

  const handleCreateAlliance = (e) => {
    e.preventDefault();
    if (createForm.name && createForm.description) {
      // Simulate alliance creation
      dispatch({ type: 'JOIN_ALLIANCE', payload: {
        name: createForm.name,
        role: 'Leader',
        members: [{ id: user.id, name: user.username, level: gameState.level, role: 'Leader' }]
      }});
      setCreateForm({ name: '', description: '', requirements: '' });
    }
  };

  const handleJoinAlliance = (alliance) => {
    dispatch({ type: 'JOIN_ALLIANCE', payload: {
      name: alliance.name,
      role: 'Member',
      members: [{ id: user.id, name: user.username, level: gameState.level, role: 'Member' }]
    }});
  };

  const tabs = [
    { id: 'my-alliance', name: 'My Alliance' },
    { id: 'create', name: 'Create Alliance' },
    { id: 'browse', name: 'Browse Alliances' }
  ];

  return (
    <AllianceContainer>
      <AllianceHeader>
        <AllianceTitle>Alliance Network</AllianceTitle>
        <AllianceSubtitle>
          Team up with other hackers to take down Hilis
        </AllianceSubtitle>
      </AllianceHeader>

      <Tabs>
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </TabButton>
        ))}
      </Tabs>

      {activeTab === 'my-alliance' && (
        <>
          {gameState.alliance.name ? (
            <>
              <AllianceInfo>
                <AllianceName>{gameState.alliance.name}</AllianceName>
                <p style={{ color: '#888', marginBottom: '20px' }}>
                  Your Role: {gameState.alliance.role}
                </p>
                <AllianceStats>
                  <StatCard>
                    <StatValue>{gameState.alliance.members.length}</StatValue>
                    <StatLabel>Members</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>1,250</StatValue>
                    <StatLabel>Reputation</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>8</StatValue>
                    <StatLabel>Level</StatLabel>
                  </StatCard>
                  <StatCard>
                    <StatValue>15</StatValue>
                    <StatLabel>Hacks</StatLabel>
                  </StatCard>
                </AllianceStats>
              </AllianceInfo>

              <MembersSection>
                <SectionTitle>Alliance Members</SectionTitle>
                <MembersGrid>
                  {mockMembers.map((member) => (
                    <MemberCard key={member.id}>
                      <MemberIcon as={member.role === 'Leader' ? FaCrown : FaUsers} />
                      <MemberInfo>
                        <MemberName>{member.name}</MemberName>
                        <MemberLevel>Level {member.level}</MemberLevel>
                      </MemberInfo>
                      <MemberRole>{member.role}</MemberRole>
                    </MemberCard>
                  ))}
                </MembersGrid>
              </MembersSection>
            </>
          ) : (
            <AllianceInfo>
              <h2 style={{ color: '#00ff41', marginBottom: '20px' }}>No Alliance</h2>
              <p style={{ color: '#888', marginBottom: '20px' }}>
                You're not currently part of any alliance. Join one or create your own!
              </p>
              <Button onClick={() => setActiveTab('browse')}>
                Browse Alliances
              </Button>
            </AllianceInfo>
          )}
        </>
      )}

      {activeTab === 'create' && (
        <CreateAllianceSection>
          <SectionTitle>Create New Alliance</SectionTitle>
          <form onSubmit={handleCreateAlliance}>
            <FormGroup>
              <Label htmlFor="name">Alliance Name</Label>
              <Input
                type="text"
                id="name"
                value={createForm.name}
                onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                placeholder="Enter alliance name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                value={createForm.description}
                onChange={(e) => setCreateForm({...createForm, description: e.target.value})}
                placeholder="Describe your alliance's goals and focus"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="requirements">Requirements</Label>
              <TextArea
                id="requirements"
                value={createForm.requirements}
                onChange={(e) => setCreateForm({...createForm, requirements: e.target.value})}
                placeholder="Minimum level, skills, or other requirements"
              />
            </FormGroup>
            <Button type="submit">Create Alliance</Button>
          </form>
        </CreateAllianceSection>
      )}

      {activeTab === 'browse' && (
        <AllianceList>
          {mockAlliances.map((alliance) => (
            <AllianceCard
              key={alliance.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <AllianceCardName>{alliance.name}</AllianceCardName>
              <AllianceCardDescription>{alliance.description}</AllianceCardDescription>
              <AllianceCardStats>
                <AllianceCardStat>
                  <AllianceCardStatValue>{alliance.members}</AllianceCardStatValue>
                  <AllianceCardStatLabel>Members</AllianceCardStatLabel>
                </AllianceCardStat>
                <AllianceCardStat>
                  <AllianceCardStatValue>{alliance.level}</AllianceCardStatValue>
                  <AllianceCardStatLabel>Level</AllianceCardStatLabel>
                </AllianceCardStat>
                <AllianceCardStat>
                  <AllianceCardStatValue>{alliance.reputation}</AllianceCardStatValue>
                  <AllianceCardStatLabel>Reputation</AllianceCardStatLabel>
                </AllianceCardStat>
              </AllianceCardStats>
              <JoinButton onClick={() => handleJoinAlliance(alliance)}>
                Join Alliance
              </JoinButton>
            </AllianceCard>
          ))}
        </AllianceList>
      )}
    </AllianceContainer>
  );
};

export default Alliance;


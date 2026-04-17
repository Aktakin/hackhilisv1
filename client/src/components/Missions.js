import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaFlag } from 'react-icons/fa';

const Page = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  min-height: 60vh;
`;

const Header = styled.div`
  margin-bottom: 28px;
`;

const PageTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.2rem;
  color: #00ff41;
  margin: 0 0 10px;
  text-shadow: 0 0 12px rgba(0, 255, 65, 0.35);
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PageSubtitle = styled.p`
  color: #888;
  font-size: 1.05rem;
  margin: 0;
`;

const MissionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 18px;
`;

const MissionCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(10, 10, 20, 0.95) 100%);
  border: 2px solid
    ${(props) =>
      props.$available ? 'rgba(0, 255, 65, 0.35)' : 'rgba(100, 100, 100, 0.22)'};
  border-radius: 14px;
  padding: 18px 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
  cursor: ${(props) => (props.$available ? 'pointer' : 'not-allowed')};
  min-height: 168px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    border-color: ${(props) =>
      props.$available ? 'rgba(0, 255, 65, 0.55)' : 'rgba(100, 100, 100, 0.28)'};
    box-shadow: ${(props) =>
      props.$available ? '0 12px 40px rgba(0, 255, 65, 0.18)' : '0 8px 32px rgba(0, 0, 0, 0.45)'};
  }
`;

const MissionNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  color: ${(props) => (props.$available ? '#00ff41' : '#555')};
  margin-bottom: 8px;
  text-shadow: ${(props) =>
    props.$available ? '0 0 10px rgba(0, 255, 65, 0.45)' : 'none'};
`;

const MissionCardTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 0.92rem;
  color: ${(props) => (props.$available ? '#00ff41' : '#666')};
  margin: 0 0 8px;
  line-height: 1.35;
`;

const MissionCardDescription = styled.p`
  font-size: 0.78rem;
  color: ${(props) => (props.$available ? '#aaa' : '#555')};
  margin: 0;
  line-height: 1.45;
  flex: 1;
`;

const ComingSoonBadge = styled.span`
  display: inline-block;
  margin-top: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  background: rgba(100, 100, 100, 0.2);
  color: #666;
  border: 1px solid rgba(100, 100, 100, 0.3);
`;

const buildMissions = () => {
  const first = {
    id: 1,
    number: 1,
    title: 'MitM on Public WiFi',
    available: true,
    description:
      'Router down — join CafeFreeNet. Phase 1: harden your host. Phase 2: authorized MitM & capture (simulated).'
  };

  const rest = Array.from({ length: 29 }, (_, index) => {
    const number = index + 2;
    return {
      id: number,
      number,
      title: `Mission ${number}`,
      available: false
    };
  });

  return [first, ...rest];
};

const missions = buildMissions();

const Missions = ({ onSelectMission }) => {
  const navigate = useNavigate();

  const handleMissionClick = (mission) => {
    if (!mission.available) return;
    if (typeof onSelectMission === 'function') {
      onSelectMission(mission);
      return;
    }
    navigate(`/missions/${mission.id}`);
  };

  return (
    <Page>
      <Header>
        <PageTitle>
          <FaFlag aria-hidden />
          Missions
        </PageTitle>
        <PageSubtitle>30 training scenarios — complete them in order or jump in when unlocked.</PageSubtitle>
      </Header>

      <MissionsGrid>
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            $available={mission.available}
            onClick={() => handleMissionClick(mission)}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: Math.min(mission.id * 0.015, 0.35) }}
            whileHover={mission.available ? { scale: 1.03 } : {}}
            whileTap={mission.available ? { scale: 0.98 } : {}}
          >
            <MissionNumber $available={mission.available}>{mission.number}</MissionNumber>
            <MissionCardTitle $available={mission.available}>{mission.title}</MissionCardTitle>
            {mission.available ? (
              <MissionCardDescription $available>{mission.description}</MissionCardDescription>
            ) : (
              <ComingSoonBadge>Coming Soon</ComingSoonBadge>
            )}
          </MissionCard>
        ))}
      </MissionsGrid>
    </Page>
  );
};

export default Missions;

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { 
  FaGraduationCap, 
  FaBook, 
  FaCertificate,
  FaPlay,
  FaCheckCircle,
  FaLock
} from 'react-icons/fa';

const EducationContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const EducationHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const EducationTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const EducationSubtitle = styled.p`
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

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const CourseCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid ${props => props.completed ? '#00ff41' : props.locked ? '#666' : '#00ff41'};
  border-radius: 15px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const CourseIcon = styled.div`
  font-size: 2.5rem;
  color: ${props => props.completed ? '#00ff41' : props.locked ? '#666' : '#00ff41'};
  margin-bottom: 15px;
`;

const CourseTitle = styled.h3`
  color: #00ff41;
  margin-bottom: 10px;
  font-size: 1.3rem;
`;

const CourseDescription = styled.p`
  color: #888;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const CourseStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 0.9rem;
`;

const StatItem = styled.div`
  color: #00ffff;
  font-weight: bold;
`;

const CourseButton = styled.button`
  background: ${props => props.completed ? '#00ff41' : props.locked ? '#666' : 'linear-gradient(45deg, #00ff41, #00cc33)'};
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: ${props => props.completed ? '#000' : props.locked ? '#999' : '#000'};
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: ${props => props.locked ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: ${props => props.completed ? '#00ff41' : props.locked ? '#666' : 'linear-gradient(45deg, #00cc33, #00ff41)'};
    box-shadow: ${props => props.locked ? 'none' : '0 0 20px rgba(0, 255, 65, 0.5)'};
    transform: ${props => props.locked ? 'none' : 'translateY(-2px)'};
  }
`;

const LockIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  color: #666;
  font-size: 1.2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #333;
  border-radius: 3px;
  margin-bottom: 15px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #00ff41, #00ffff);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const CertificationsSection = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  margin-top: 30px;
`;

const SectionTitle = styled.h2`
  color: #00ff41;
  margin-bottom: 20px;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
`;

const CertificationCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00ff41;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
`;

const CertificationIcon = styled.div`
  font-size: 2rem;
  color: #00ff41;
  margin-bottom: 10px;
`;

const CertificationName = styled.h4`
  color: #00ff41;
  margin-bottom: 5px;
`;

const CertificationDate = styled.p`
  color: #888;
  font-size: 0.9rem;
`;

const Education = ({ user }) => {
  const { gameState, dispatch } = useGame();
  const [activeTab, setActiveTab] = useState('courses');

  const courses = [
    {
      id: 1,
      title: 'Introduction to Hacking',
      description: 'Learn the basics of ethical hacking and penetration testing',
      skill: 'hacking',
      skillIncrease: 10,
      duration: 30,
      difficulty: 'Beginner',
      prerequisites: [],
      completed: gameState.education.coursesCompleted.includes(1)
    },
    {
      id: 2,
      title: 'Network Security Fundamentals',
      description: 'Master network protocols, firewalls, and intrusion detection',
      skill: 'networking',
      skillIncrease: 15,
      duration: 45,
      difficulty: 'Intermediate',
      prerequisites: [1],
      completed: gameState.education.coursesCompleted.includes(2)
    },
    {
      id: 3,
      title: 'Cryptography and Encryption',
      description: 'Deep dive into encryption algorithms and cryptographic systems',
      skill: 'cryptography',
      skillIncrease: 20,
      duration: 60,
      difficulty: 'Advanced',
      prerequisites: [1, 2],
      completed: gameState.education.coursesCompleted.includes(3)
    },
    {
      id: 4,
      title: 'Social Engineering Tactics',
      description: 'Learn psychological manipulation techniques for security testing',
      skill: 'socialEngineering',
      skillIncrease: 12,
      duration: 40,
      difficulty: 'Intermediate',
      prerequisites: [1],
      completed: gameState.education.coursesCompleted.includes(4)
    },
    {
      id: 5,
      title: 'Digital Forensics',
      description: 'Investigate cyber crimes and analyze digital evidence',
      skill: 'forensics',
      skillIncrease: 18,
      duration: 50,
      difficulty: 'Advanced',
      prerequisites: [2, 3],
      completed: gameState.education.coursesCompleted.includes(5)
    },
    {
      id: 6,
      title: 'Malware Analysis',
      description: 'Reverse engineer malicious software and understand attack vectors',
      skill: 'malware',
      skillIncrease: 25,
      duration: 70,
      difficulty: 'Expert',
      prerequisites: [3, 5],
      completed: gameState.education.coursesCompleted.includes(6)
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'Certified Ethical Hacker',
      date: '2024-01-15',
      icon: FaCertificate
    },
    {
      id: 2,
      name: 'Network Security Specialist',
      date: '2024-02-20',
      icon: FaCertificate
    }
  ];

  const isCourseLocked = (course) => {
    return course.prerequisites.some(prereq => 
      !gameState.education.coursesCompleted.includes(prereq)
    );
  };

  const startCourse = (course) => {
    if (!isCourseLocked(course) && !course.completed) {
      // Simulate course completion
      dispatch({ type: 'UPDATE_SKILL', skill: course.skill, payload: course.skillIncrease });
      dispatch({ type: 'ADD_EXPERIENCE', payload: course.skillIncrease * 10 });
      dispatch({ type: 'COMPLETE_COURSE', payload: course.id });
    }
  };

  const tabs = [
    { id: 'courses', name: 'Courses' },
    { id: 'certifications', name: 'Certifications' },
    { id: 'exams', name: 'Exams' }
  ];

  return (
    <EducationContainer>
      <EducationHeader>
        <EducationTitle>Cyber Academy</EducationTitle>
        <EducationSubtitle>
          Level up your skills and earn certifications
        </EducationSubtitle>
      </EducationHeader>

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

      {activeTab === 'courses' && (
        <CoursesGrid>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              completed={course.completed}
              locked={isCourseLocked(course)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isCourseLocked(course) && <LockIcon as={FaLock} />}
              
              <CourseIcon completed={course.completed} locked={isCourseLocked(course)} as={FaBook} />
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              
              <CourseStats>
                <StatItem>Duration: {course.duration} min</StatItem>
                <StatItem>Difficulty: {course.difficulty}</StatItem>
              </CourseStats>

              <ProgressBar>
                <ProgressFill percentage={course.completed ? 100 : 0} />
              </ProgressBar>

              <CourseButton
                completed={course.completed}
                locked={isCourseLocked(course)}
                onClick={() => startCourse(course)}
              >
                {course.completed ? (
                  <>
                    <FaCheckCircle style={{ marginRight: '8px' }} />
                    Completed
                  </>
                ) : isCourseLocked(course) ? (
                  'Locked'
                ) : (
                  <>
                    <FaPlay style={{ marginRight: '8px' }} />
                    Start Course
                  </>
                )}
              </CourseButton>
            </CourseCard>
          ))}
        </CoursesGrid>
      )}

      {activeTab === 'certifications' && (
        <CertificationsSection>
          <SectionTitle>Your Certifications</SectionTitle>
          <CertificationsGrid>
            {certifications.map((cert) => (
              <CertificationCard key={cert.id}>
                <CertificationIcon as={cert.icon} />
                <CertificationName>{cert.name}</CertificationName>
                <CertificationDate>Earned: {cert.date}</CertificationDate>
              </CertificationCard>
            ))}
          </CertificationsGrid>
        </CertificationsSection>
      )}

      {activeTab === 'exams' && (
        <div>
          <h2>Exams Coming Soon!</h2>
          <p>Advanced certification exams will be available soon.</p>
        </div>
      )}
    </EducationContainer>
  );
};

export default Education;




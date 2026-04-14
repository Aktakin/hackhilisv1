import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaCheckCircle, FaLock, FaNetworkWired, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(0, 255, 65, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.6);
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
`;

const MissionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const MissionCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(10, 10, 20, 0.95) 100%);
  border: 2px solid ${props => props.$selected ? 'rgba(0, 255, 65, 0.8)' : props.$available ? 'rgba(0, 255, 65, 0.3)' : 'rgba(100, 100, 100, 0.2)'};
  border-radius: 15px;
  padding: 25px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  cursor: ${props => props.$available ? 'pointer' : 'not-allowed'};
  position: relative;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  &:hover {
    border-color: ${props => props.$available ? 'rgba(0, 255, 65, 0.6)' : 'rgba(100, 100, 100, 0.3)'};
    box-shadow: ${props => props.$available ? '0 15px 50px rgba(0, 255, 65, 0.3)' : '0 10px 40px rgba(0, 0, 0, 0.5)'};
    transform: ${props => props.$available ? 'translateY(-5px)' : 'none'};
  }
`;

const MissionNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${props => props.$available ? '#00ff41' : '#666'};
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 10px;
  text-shadow: ${props => props.$available ? '0 0 10px rgba(0, 255, 65, 0.5)' : 'none'};
`;

const MissionCardTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  color: ${props => props.$available ? '#00ff41' : '#666'};
  margin-bottom: 8px;
`;

const MissionCardDescription = styled.p`
  font-size: 0.85rem;
  color: ${props => props.$available ? '#aaa' : '#555'};
  margin-bottom: 10px;
`;

const ComingSoonBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  background: rgba(100, 100, 100, 0.2);
  color: #666;
  border: 1px solid rgba(100, 100, 100, 0.3);
`;

const DetailedMissionCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(10, 10, 20, 0.95) 100%);
  border: 2px solid rgba(0, 255, 65, 0.3);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(0, 255, 65, 0.6);
    box-shadow: 0 15px 50px rgba(0, 255, 65, 0.3);
  }
`;

const MissionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 255, 65, 0.2);
`;

const MissionIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 255, 65, 0.2) 0%, rgba(0, 255, 65, 0.1) 100%);
  border-radius: 12px;
  font-size: 28px;
  color: #00ff41;
  border: 2px solid rgba(0, 255, 65, 0.3);
`;

const MissionTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.8rem;
  color: #00ff41;
  flex: 1;
`;

const MissionBadge = styled.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: bold;
  background: ${props => 
    props.difficulty === 'beginner' ? 'rgba(0, 255, 65, 0.2)' :
    props.difficulty === 'intermediate' ? 'rgba(255, 170, 0, 0.2)' :
    'rgba(255, 0, 64, 0.2)'};
  color: ${props => 
    props.difficulty === 'beginner' ? '#00ff41' :
    props.difficulty === 'intermediate' ? '#ffaa00' :
    '#ff0040'};
  border: 1px solid ${props => 
    props.difficulty === 'beginner' ? 'rgba(0, 255, 65, 0.4)' :
    props.difficulty === 'intermediate' ? 'rgba(255, 170, 0, 0.4)' :
    'rgba(255, 0, 64, 0.4)'};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 0, 64, 0.2);
  border: 1px solid rgba(255, 0, 64, 0.4);
  color: #ff0040;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 0, 64, 0.3);
    border-color: #ff0040;
    transform: scale(1.1);
  }
`;

const Section = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  color: #00ff41;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SimpleExplanation = styled.div`
  background: rgba(0, 255, 65, 0.05);
  border-left: 4px solid #00ff41;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  line-height: 1.8;
`;

const SimpleText = styled.p`
  color: #ccc;
  font-size: 1.1rem;
  margin-bottom: 15px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InstructionCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 65, 0.2);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
`;

const StepNumber = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #00ff41 0%, #00cc33 100%);
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  font-size: 0.9rem;
`;

const StepTitle = styled.h4`
  color: #00ff41;
  font-size: 1.1rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const StepDescription = styled.p`
  color: #aaa;
  margin-bottom: 15px;
  line-height: 1.6;
`;

const TerminalButton = styled(motion.button)`
  background: linear-gradient(135deg, rgba(0, 255, 65, 0.2) 0%, rgba(0, 255, 65, 0.1) 100%);
  border: 2px solid rgba(0, 255, 65, 0.4);
  color: #00ff41;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background: linear-gradient(135deg, rgba(0, 255, 65, 0.3) 0%, rgba(0, 255, 65, 0.2) 100%);
    border-color: #00ff41;
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.4);
    transform: translateY(-2px);
  }
`;

const CommandBox = styled.div`
  background: #000;
  border: 1px solid rgba(0, 255, 65, 0.3);
  border-radius: 6px;
  padding: 15px;
  margin: 10px 0;
  font-family: 'Share Tech Mono', monospace;
  color: #00ff41;
  font-size: 0.95rem;
  overflow-x: auto;
`;

const CommandPrompt = styled.span`
  color: #00ff41;
  margin-right: 8px;
`;

const CommandText = styled.span`
  color: #00ffff;
`;

const InfoBox = styled.div`
  background: rgba(0, 170, 255, 0.1);
  border-left: 4px solid #00aaff;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
  display: flex;
  align-items: start;
  gap: 12px;
`;

const WarningBox = styled.div`
  background: rgba(255, 170, 0, 0.1);
  border-left: 4px solid #ffaa00;
  padding: 15px;
  border-radius: 6px;
  margin: 15px 0;
  display: flex;
  align-items: start;
  gap: 12px;
`;

const InfoText = styled.p`
  color: #aaa;
  line-height: 1.6;
  flex: 1;
`;

const Missions = () => {
  const [selectedMission, setSelectedMission] = useState(null);

  // Mission 1 - MitM (fully detailed)
  const mitmMission = {
    id: 1,
    number: 1,
    title: 'Man-in-the-Middle Attack',
    icon: FaNetworkWired,
    difficulty: 'intermediate',
    available: true,
    description: 'Intercept and analyze network traffic on a public WiFi network',
    simpleExplanation: {
      title: 'What is a Man-in-the-Middle Attack?',
      content: [
        "Imagine you're sending a letter to your friend. Normally, you'd give it directly to the mail carrier, who delivers it straight to your friend.",
        "In a Man-in-the-Middle attack, someone sneaky (the attacker) pretends to be the mail carrier. They take your letter, read it, maybe even change it, and then give it to your friend. Your friend thinks the letter came straight from you, but it actually went through the attacker first!",
        "In computer terms: When you connect to WiFi, your device talks to the internet through a router (like a mail carrier). In a MitM attack, the hacker makes your device talk to THEIR computer first, which then talks to the real router. This lets them see everything you're doing online - like reading your messages, seeing what websites you visit, and even stealing passwords!",
        "Why is this dangerous? Because the attacker can see all your internet traffic, steal your passwords, read your emails, and even change what you see on websites!"
      ]
    },
    objectives: [
      'Set up a rogue WiFi access point',
      'Intercept network traffic from connected devices',
      'Analyze captured data packets',
      'Understand network security vulnerabilities'
    ],
    steps: [
      {
        title: 'Step 1: Prepare Your Environment',
        description: 'First, we need to set up our laptop to act as a WiFi access point. This is like creating a fake WiFi network that looks real.',
        commands: [
          { text: 'sudo apt update && sudo apt install aircrack-ng hostapd dnsmasq iptables', description: 'Install all the tools we need for this mission' },
          { text: 'iw list | grep "AP"', description: 'Check if your WiFi adapter supports access point mode' }
        ],
        explanation: 'We\'re installing special tools that let us create a fake WiFi network and capture internet traffic. Think of it like setting up a fake mailbox that looks like the real one.'
      },
      {
        title: 'Step 2: Scan for Target Network',
        description: 'Find the public WiFi network we want to mimic. We need to know its name and settings.',
        commands: [
          { text: 'sudo iwlist wlan0 scan | grep -E "SSID|BSSID|Channel"', description: 'Scan for nearby WiFi networks and find the target' }
        ],
        explanation: 'We\'re looking around to find a WiFi network to copy. It\'s like finding a mailbox to make an exact copy of.'
      },
      {
        title: 'Step 3: Create Rogue Access Point',
        description: 'Create a fake WiFi network with the same name as the real one. This tricks devices into connecting to us instead.',
        commands: [
          { text: 'sudo airmon-ng check kill', description: 'Stop any programs that might interfere' },
          { text: 'sudo airmon-ng start wlan0', description: 'Put WiFi adapter into monitor mode (like putting on special glasses to see all WiFi signals)' },
          { text: 'sudo hostapd /etc/hostapd/hostapd.conf', description: 'Start our fake WiFi network' }
        ],
        explanation: 'We\'re creating a fake WiFi network that looks exactly like the real one. When someone tries to connect, they\'ll connect to our fake one instead!'
      },
      {
        title: 'Step 4: Set Up Network Services',
        description: 'Configure our fake network to give out IP addresses and route traffic, just like a real router does.',
        commands: [
          { text: 'sudo ifconfig wlan0 up 192.168.1.1 netmask 255.255.255.0', description: 'Set our IP address as the gateway' },
          { text: 'sudo dnsmasq -C /etc/dnsmasq.conf -d', description: 'Start DHCP server to give IP addresses to connected devices' },
          { text: 'sudo sysctl -w net.ipv4.ip_forward=1', description: 'Enable forwarding so we can relay traffic' }
        ],
        explanation: 'Now our fake WiFi network works like a real one - it gives devices addresses and routes their internet traffic through us.'
      },
      {
        title: 'Step 5: Intercept Traffic',
        description: 'Now that devices are connected to our fake network, we can see all their internet traffic!',
        commands: [
          { text: 'sudo bettercap -iface wlan0', description: 'Start Bettercap, a powerful tool for network attacks' },
          { text: 'set arp.spoof.targets 192.168.1.0/24', description: 'Target all devices on our network' },
          { text: 'arp.spoof on', description: 'Start ARP spoofing (tricking devices into sending us their traffic)' },
          { text: 'net.sniff on', description: 'Start capturing all network packets' }
        ],
        explanation: 'This is where the magic happens! We\'re now seeing everything that devices connected to our fake network are doing online - every website they visit, every message they send!'
      },
      {
        title: 'Step 6: Analyze Captured Data',
        description: 'Examine the traffic we\'ve captured to understand what information we can see.',
        commands: [
          { text: 'sudo tcpdump -i wlan0 -w capture.pcap', description: 'Save all captured traffic to a file' },
          { text: 'wireshark capture.pcap', description: 'Open the captured data in Wireshark to analyze it' }
        ],
        explanation: 'We\'re saving all the traffic we captured and looking at it with special tools. This shows us exactly what information we could steal if we were a real attacker!'
      }
    ],
    warnings: [
      'This technique is for educational purposes only. Performing MitM attacks on networks you don\'t own is illegal.',
      'Always get permission before testing security on any network.',
      'Real attackers use this to steal passwords, credit card numbers, and personal information.',
      'Always use HTTPS (the lock icon) when possible - it encrypts your data and makes MitM attacks harder.'
    ],
    keyLearnings: [
      'How WiFi networks can be impersonated',
      'Why public WiFi is dangerous',
      'How attackers intercept network traffic',
      'The importance of using encrypted connections (HTTPS)',
      'How to protect yourself from MitM attacks'
    ]
  };

  // Create 30 mission cards (1 is MitM, 2-30 are placeholders)
  const missions = Array.from({ length: 30 }, (_, index) => {
    const number = index + 1;
    if (number === 1) {
      return mitmMission;
    }
    return {
      id: number,
      number: number,
      title: `Mission ${number}`,
      available: false,
      description: 'Coming soon...'
    };
  });

  const handleMissionClick = (mission) => {
    if (mission.available) {
      setSelectedMission(mission);
    }
  };

  const handleStartMission = (mission) => {
    // Navigate to laptop terminal for this mission
    window.location.href = '/phone?device=laptop&mission=' + mission.id;
  };

  const renderDetailedMission = (mission) => {
    if (!mission || !mission.available) return null;

    return (
      <DetailedMissionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <CloseButton onClick={() => setSelectedMission(null)}>
          <FaTimes />
        </CloseButton>

        <MissionHeader>
          <MissionIcon>
            <mission.icon />
          </MissionIcon>
          <MissionTitle>Mission {mission.number}: {mission.title}</MissionTitle>
          <MissionBadge difficulty={mission.difficulty}>
            {mission.difficulty.toUpperCase()}
          </MissionBadge>
        </MissionHeader>

        <Section>
          <SectionTitle>
            <FaInfoCircle />
            Mission Description
          </SectionTitle>
          <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '20px' }}>
            {mission.description}
          </p>
        </Section>

        <Section>
          <SectionTitle>
            <FaInfoCircle />
            Simple Explanation
          </SectionTitle>
          <SimpleExplanation>
            <SimpleText style={{ fontWeight: 'bold', color: '#00ff41', marginBottom: '15px' }}>
              {mission.simpleExplanation.title}
            </SimpleText>
            {mission.simpleExplanation.content.map((paragraph, idx) => (
              <SimpleText key={idx}>{paragraph}</SimpleText>
            ))}
          </SimpleExplanation>
        </Section>

        <Section>
          <SectionTitle>
            <FaCheckCircle />
            Mission Objectives
          </SectionTitle>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {mission.objectives.map((objective, idx) => (
              <li key={idx} style={{ 
                color: '#aaa', 
                marginBottom: '10px', 
                paddingLeft: '25px',
                position: 'relative'
              }}>
                <span style={{ 
                  position: 'absolute', 
                  left: 0, 
                  color: '#00ff41' 
                }}>✓</span>
                {objective}
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <SectionTitle>
            <FaTerminal />
            Step-by-Step Instructions
          </SectionTitle>
          {mission.steps.map((step, idx) => (
            <InstructionCard key={idx}>
              <StepTitle>
                <StepNumber>{idx + 1}</StepNumber>
                {step.title}
              </StepTitle>
              <StepDescription>{step.description}</StepDescription>
              
              {step.commands && step.commands.map((cmd, cmdIdx) => (
                <div key={cmdIdx}>
                  <InfoBox>
                    <FaInfoCircle style={{ color: '#00aaff', marginTop: '3px' }} />
                    <InfoText>
                      <strong style={{ color: '#00aaff' }}>What this does:</strong> {cmd.description}
                    </InfoText>
                  </InfoBox>
                  <CommandBox>
                    <CommandPrompt>kali@hacker-laptop:~$</CommandPrompt>
                    <CommandText>{cmd.text}</CommandText>
                  </CommandBox>
                </div>
              ))}
              
              <InfoBox style={{ marginTop: '15px' }}>
                <FaInfoCircle style={{ color: '#00aaff', marginTop: '3px' }} />
                <InfoText>
                  <strong style={{ color: '#00aaff' }}>In Simple Terms:</strong> {step.explanation}
                </InfoText>
              </InfoBox>
            </InstructionCard>
          ))}
        </Section>

        <Section>
          <SectionTitle>
            <FaExclamationTriangle />
            Important Warnings
          </SectionTitle>
          {mission.warnings.map((warning, idx) => (
            <WarningBox key={idx}>
              <FaExclamationTriangle style={{ color: '#ffaa00', marginTop: '3px' }} />
              <InfoText>{warning}</InfoText>
            </WarningBox>
          ))}
        </Section>

        <Section>
          <SectionTitle>
            <FaLock />
            Key Learnings
          </SectionTitle>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {mission.keyLearnings.map((learning, idx) => (
              <li key={idx} style={{ 
                color: '#aaa', 
                marginBottom: '10px', 
                paddingLeft: '25px',
                position: 'relative'
              }}>
                <span style={{ 
                  position: 'absolute', 
                  left: 0, 
                  color: '#00ff41' 
                }}>→</span>
                {learning}
              </li>
            ))}
          </ul>
        </Section>

        <TerminalButton
          onClick={() => handleStartMission(mission)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTerminal />
          Start Mission in Terminal
        </TerminalButton>
      </DetailedMissionCard>
    );
  };

  return (
    <Container>
      <Header>
        <Title>Missions</Title>
        <Subtitle>Complete interactive cybersecurity missions to learn and practice</Subtitle>
      </Header>

      {!selectedMission && (
        <MissionsGrid>
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              $available={mission.available}
              $selected={false}
              onClick={() => handleMissionClick(mission)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: mission.id * 0.02 }}
              whileHover={mission.available ? { scale: 1.05 } : {}}
              whileTap={mission.available ? { scale: 0.95 } : {}}
            >
              <MissionNumber $available={mission.available}>
                {mission.number}
              </MissionNumber>
              <MissionCardTitle $available={mission.available}>
                {mission.title}
              </MissionCardTitle>
              {mission.available ? (
                <MissionCardDescription $available={true}>
                  {mission.description}
                </MissionCardDescription>
              ) : (
                <ComingSoonBadge>Coming Soon</ComingSoonBadge>
              )}
            </MissionCard>
          ))}
        </MissionsGrid>
      )}

      <AnimatePresence>
        {selectedMission && renderDetailedMission(selectedMission)}
      </AnimatePresence>
    </Container>
  );
};

export default Missions;

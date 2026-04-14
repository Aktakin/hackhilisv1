import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaPlay, FaStop, FaCopy, FaTrash } from 'react-icons/fa';

const TerminalContainer = styled.div`
  background: #0a0a0a;
  border: 2px solid #00ff41;
  border-radius: 10px;
  font-family: 'Courier New', monospace;
  color: #00ff41;
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TerminalHeader = styled.div`
  background: #1a1a1a;
  padding: 10px 15px;
  border-bottom: 1px solid #00ff41;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TerminalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  color: #00ff41;
`;

const TerminalControls = styled.div`
  display: flex;
  gap: 10px;
`;

const ControlButton = styled.button`
  background: transparent;
  border: 1px solid #00ff41;
  color: #00ff41;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: #00ff41;
    color: #000;
  }
`;

const TerminalBody = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #0a0a0a;
`;

const TerminalLine = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
`;

const Prompt = styled.span`
  color: #00ff41;
  font-weight: bold;
`;

const Command = styled.span`
  color: #ffffff;
`;

const Output = styled.span`
  color: #888;
`;

const Error = styled.span`
  color: #ff4444;
`;

const Success = styled.span`
  color: #44ff44;
`;

const Warning = styled.span`
  color: #ffaa00;
`;

const TerminalInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border-top: 1px solid #00ff41;
  background: #1a1a1a;
`;

const InputField = styled.input`
  background: transparent;
  border: none;
  color: #00ff41;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  outline: none;
  flex: 1;
`;

const AttackGuideContainer = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
`;

const AttackTitle = styled.h3`
  color: #00ff41;
  margin-bottom: 15px;
  font-family: 'Orbitron', sans-serif;
`;

const AttackStep = styled.div`
  background: rgba(0, 255, 65, 0.1);
  border-left: 4px solid #00ff41;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const StepNumber = styled.span`
  color: #00ff41;
  font-weight: bold;
  margin-right: 10px;
`;

const VulnerabilityList = styled.ul`
  color: #ffaa00;
  margin: 10px 0;
  padding-left: 20px;
`;

const VulnerabilityItem = styled.li`
  margin-bottom: 5px;
`;

const HackingTerminal = ({ target, onAttackComplete }) => {
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [attackMethod, setAttackMethod] = useState(null);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const vulnerabilities = {
    1: ['Weak password policy', 'No 2FA enabled', 'Outdated WordPress', 'Default admin credentials'],
    2: ['SQL injection vulnerabilities', 'Cross-site scripting (XSS)', 'Weak encryption', 'Poor access controls'],
    3: ['Payment system vulnerabilities', 'User account weaknesses', 'Session management issues', 'Insecure file uploads'],
    4: ['Privilege escalation opportunities', 'Buffer overflow vulnerabilities', 'Network misconfigurations', 'Social engineering vectors'],
    5: ['Multi-factor authentication bypass', 'Cryptographic weaknesses', 'Hardware vulnerabilities', 'Side-channel attacks'],
    6: ['Zero-day exploits', 'Advanced persistent threats', 'Insider threats', 'Supply chain vulnerabilities'],
    7: ['Quantum-resistant encryption needed', 'AI-powered defense systems', 'Distributed infrastructure', 'Advanced threat detection']
  };

  const attackMethods = {
    'brute-force': {
      name: 'Brute Force Attack',
      steps: [
        'Identify target service and port',
        'Use nmap to scan for open ports',
        'Launch hydra for password brute force',
        'Monitor for successful authentication',
        'Escalate privileges if needed'
      ],
      commands: [
        'nmap -sS -O target_ip',
        'hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://target_ip',
        'hydra -l root -P /usr/share/wordlists/rockyou.txt ftp://target_ip',
        'john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt'
      ]
    },
    'rainbow': {
      name: 'Rainbow Table Attack',
      steps: [
        'Extract password hashes from target',
        'Identify hash algorithm (MD5, SHA1, etc.)',
        'Generate or download rainbow tables',
        'Use rainbowcrack or similar tool',
        'Match hash against rainbow table'
      ],
      commands: [
        'hashcat -m 0 -a 3 hash.txt ?a?a?a?a?a?a',
        'john --format=raw-md5 hash.txt',
        'rainbowcrack -h hash.txt -t rainbow_table.rt',
        'hashcat -m 1000 -a 3 hash.txt ?d?d?d?d?d?d'
      ]
    },
    'ddos': {
      name: 'DDoS Attack',
      steps: [
        'Identify target infrastructure',
        'Compromise multiple systems (botnet)',
        'Coordinate attack timing',
        'Launch distributed attack',
        'Monitor target response'
      ],
      commands: [
        'hping3 -S --flood -V target_ip',
        'slowloris.py target_ip',
        'python3 ddos.py --target target_ip --threads 100',
        'nmap -sS -f --data-length 25 target_ip'
      ]
    },
    'sql-injection': {
      name: 'SQL Injection',
      steps: [
        'Identify vulnerable input fields',
        'Test for SQL injection vulnerabilities',
        'Extract database information',
        'Enumerate tables and columns',
        'Extract sensitive data'
      ],
      commands: [
        "' OR '1'='1",
        "' UNION SELECT 1,2,3,4,5--",
        "' UNION SELECT table_name FROM information_schema.tables--",
        "' UNION SELECT username,password FROM users--"
      ]
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const addToTerminal = (text, type = 'output') => {
    const timestamp = new Date().toLocaleTimeString();
    setTerminalHistory(prev => [...prev, { text, type, timestamp }]);
  };

  const executeCommand = async (command) => {
    if (!command.trim()) return;

    setIsExecuting(true);
    addToTerminal(`hacker@ubuntu:~$ ${command}`, 'command');

    // Simulate command execution with realistic delays
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simulate command output based on the command
    if (command.includes('nmap')) {
      addToTerminal('Starting Nmap 7.80 ( https://nmap.org )', 'output');
      addToTerminal(`Nmap scan report for ${target?.name || 'target'}`, 'output');
      addToTerminal('Host is up (0.045s latency).', 'output');
      addToTerminal('PORT     STATE SERVICE', 'output');
      addToTerminal('22/tcp   open  ssh', 'output');
      addToTerminal('80/tcp   open  http', 'output');
      addToTerminal('443/tcp  open  https', 'output');
    } else if (command.includes('hydra')) {
      addToTerminal('[INFO] Hydra v9.1 starting at ' + new Date().toLocaleString(), 'output');
      addToTerminal('[INFO] Using dictionary attack on ssh', 'output');
      addToTerminal('[ATTEMPT] target 192.168.1.100 ssh [port 22] [ssh] host: 192.168.1.100   login: admin   password: password123', 'success');
      addToTerminal('[22][ssh] host: 192.168.1.100   login: admin   password: password123', 'success');
      addToTerminal('1 of 1 target successfully completed, 1 valid password found', 'success');
    } else if (command.includes('john')) {
      addToTerminal('Loaded 1 password hash (MD5 [128/128 SSE2 4x])', 'output');
      addToTerminal('Will run 8 OpenMP threads', 'output');
      addToTerminal('Press \'q\' or Ctrl-C to abort, almost any other key for status', 'output');
      addToTerminal('password123        (admin)', 'success');
      addToTerminal('1g 0:00:00:01 DONE 2/3 (2023-01-01 12:00) 0.6667g/s 1000p/s 1000c/s 1000C/s password123', 'success');
    } else if (command.includes('hping3')) {
      addToTerminal('HPING3 target_ip (eth0 target_ip): NO FLAG are set, 40 headers + 0 data bytes', 'output');
      addToTerminal('len=46 ip=target_ip ttl=64 id=12345 sport=0 flags=RA seq=0 win=0 rtt=0.5 ms', 'output');
      addToTerminal('len=46 ip=target_ip ttl=64 id=12346 sport=0 flags=RA seq=1 win=0 rtt=0.3 ms', 'output');
    } else {
      addToTerminal(`Command '${command}' executed successfully`, 'success');
    }

    setIsExecuting(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  const clearTerminal = () => {
    setTerminalHistory([]);
  };

  const copyTerminal = () => {
    const text = terminalHistory.map(line => line.text).join('\n');
    navigator.clipboard.writeText(text);
  };

  const startAttack = (method) => {
    setAttackMethod(method);
    setCurrentStep(0);
    addToTerminal(`Starting ${method.name} on target: ${target?.name}`, 'warning');
    addToTerminal('Initializing attack sequence...', 'output');
  };

  const nextStep = () => {
    if (attackMethod && currentStep < attackMethod.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      addToTerminal(`Step ${currentStep + 2}: ${attackMethod.steps[currentStep + 1]}`, 'output');
    }
  };

  const executeStepCommand = (command) => {
    executeCommand(command);
  };

  return (
    <div>
      <AttackGuideContainer>
        <AttackTitle>Target Vulnerabilities</AttackTitle>
        <VulnerabilityList>
          {target && vulnerabilities[target.level]?.map((vuln, index) => (
            <VulnerabilityItem key={index}>{vuln}</VulnerabilityItem>
          ))}
        </VulnerabilityList>

        <AttackTitle>Available Attack Methods</AttackTitle>
        <div style={{ marginBottom: '15px' }}>
          <p style={{ color: '#ffaa00', fontSize: '0.9rem', marginBottom: '10px' }}>
            <strong>Recommended for this target:</strong> {target?.recommendedAttacks?.join(', ') || 'All methods'}
          </p>
          <p style={{ color: '#00ffff', fontSize: '0.8rem', fontStyle: 'italic', marginBottom: '15px' }}>
            💡 {target?.attackTips || 'Use any attack method you prefer'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {Object.entries(attackMethods).map(([key, method]) => {
            const isRecommended = target?.recommendedAttacks?.includes(key);
            return (
              <button
                key={key}
                onClick={() => startAttack(method)}
                style={{
                  background: isRecommended ? '#00ff41' : 'transparent',
                  border: `2px solid ${isRecommended ? '#00ff41' : '#00ff41'}`,
                  color: isRecommended ? '#000' : '#00ff41',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: isRecommended ? 'bold' : 'normal'
                }}
                onMouseOver={(e) => {
                  if (!isRecommended) {
                    e.target.style.background = '#00ff41';
                    e.target.style.color = '#000';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isRecommended) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#00ff41';
                  }
                }}
              >
                {isRecommended && '⭐ '}{method.name}
              </button>
            );
          })}
        </div>

        {attackMethod && (
          <div>
            <AttackTitle>Attack Steps: {attackMethod.name}</AttackTitle>
            {attackMethod.steps.map((step, index) => (
              <AttackStep key={index}>
                <StepNumber>{index + 1}.</StepNumber>
                {step}
                {index === currentStep && (
                  <div style={{ marginTop: '10px' }}>
                    <button
                      onClick={() => executeStepCommand(attackMethod.commands[index] || 'echo "Step completed"')}
                      style={{
                        background: '#00ff41',
                        border: 'none',
                        color: '#000',
                        padding: '5px 10px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        marginRight: '10px'
                      }}
                    >
                      Execute Command
                    </button>
                    {index < attackMethod.steps.length - 1 && (
                      <button
                        onClick={nextStep}
                        style={{
                          background: '#00ffff',
                          border: 'none',
                          color: '#000',
                          padding: '5px 10px',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        Next Step
                      </button>
                    )}
                  </div>
                )}
              </AttackStep>
            ))}
          </div>
        )}
      </AttackGuideContainer>

      <TerminalContainer>
        <TerminalHeader>
          <TerminalTitle>
            <FaTerminal />
            Ubuntu Terminal - Hacking Session
          </TerminalTitle>
          <TerminalControls>
            <ControlButton onClick={copyTerminal}>
              <FaCopy />
            </ControlButton>
            <ControlButton onClick={clearTerminal}>
              <FaTrash />
            </ControlButton>
          </TerminalControls>
        </TerminalHeader>

        <TerminalBody ref={terminalRef}>
          <AnimatePresence>
            {terminalHistory.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TerminalLine>
                  {line.type === 'command' && (
                    <>
                      <Prompt>hacker@ubuntu:~$</Prompt> <Command>{line.text.replace('hacker@ubuntu:~$ ', '')}</Command>
                    </>
                  )}
                  {line.type === 'output' && <Output>{line.text}</Output>}
                  {line.type === 'success' && <Success>{line.text}</Success>}
                  {line.type === 'error' && <Error>{line.text}</Error>}
                  {line.type === 'warning' && <Warning>{line.text}</Warning>}
                </TerminalLine>
              </motion.div>
            ))}
          </AnimatePresence>
        </TerminalBody>

        <TerminalInput>
          <Prompt>hacker@ubuntu:~$</Prompt>
          <InputField
            ref={inputRef}
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter command..."
            disabled={isExecuting}
          />
          <ControlButton onClick={() => executeCommand(currentCommand)} disabled={isExecuting}>
            <FaPlay />
          </ControlButton>
        </TerminalInput>
      </TerminalContainer>
    </div>
  );
};

export default HackingTerminal;

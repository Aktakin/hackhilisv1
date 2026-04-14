import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDatabase, FaTimes, FaPlay } from 'react-icons/fa';

const Modal = styled(motion.div)`
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

const ModalContent = styled.div`
  background: linear-gradient(145deg, #1a1a2e, #0a0a0a);
  border: 2px solid #ffaa00;
  border-radius: 15px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 50px rgba(255, 170, 0, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ffaa00;
`;

const Title = styled.h2`
  color: #ffaa00;
  font-family: 'Orbitron', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: 2px solid #ff0040;
  color: #ff0040;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 0, 64, 0.1);
  }
`;

const TerminalContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const TerminalOutput = styled.div`
  background: #000;
  border: 1px solid #ffaa00;
  border-radius: 5px;
  padding: 15px;
  height: 500px;
  overflow-y: auto;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  color: #ffaa00;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const OutputLine = styled.div`
  color: ${props => {
    if (props.type === 'command') return '#00ffff';
    if (props.type === 'success') return '#00ff41';
    if (props.type === 'error') return '#ff0040';
    if (props.type === 'warning') return '#ffaa00';
    return '#ffaa00';
  }};
  margin-bottom: 2px;
  white-space: pre-wrap;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Prompt = styled.span`
  color: #ffaa00;
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #ffaa00;
  border-radius: 5px;
  padding: 10px;
  color: #ffaa00;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #ffcc00;
    box-shadow: 0 0 10px rgba(255, 170, 0, 0.3);
  }
`;

const ExecuteButton = styled.button`
  background: linear-gradient(45deg, #ffaa00, #cc8800);
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(45deg, #cc8800, #ffaa00);
    box-shadow: 0 0 15px rgba(255, 170, 0, 0.5);
  }
`;

const SqlmapInterface = ({ tool, targets, onClose }) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([
    { text: '        ___', type: 'normal' },
    { text: '__H__', type: 'normal' },
    { text: ' ___ ___[)]_____ ___ ___  {1.7.11#stable}', type: 'normal' },
    { text: '|_ -| . [(]     | .\'| . |', type: 'normal' },
    { text: '|___|_  ["]_|_|_|__,|  _|', type: 'normal' },
    { text: '      |_|V...       |_|   https://sqlmap.org', type: 'normal' },
    { text: '', type: 'normal' },
    { text: '[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal. It is the end user\'s responsibility to obey all applicable local, state and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program', type: 'warning' },
    { text: '', type: 'normal' },
    { text: '[*] starting @ 14:30:15/2024-01-18/', type: 'normal' },
    { text: '', type: 'normal' }
  ]);

  const addOutput = (text, type = 'normal') => {
    setOutput(prev => [...prev, { text, type, id: Date.now() }]);
  };

  const executeCommand = (cmd) => {
    if (!cmd.trim()) return;
    
    addOutput(`sqlmap > ${cmd}`, 'command');
    setCommand('');

    setTimeout(() => {
      if (cmd.includes('-u')) {
        const url = cmd.match(/-u\s+["']?([^"'\s]+)/)?.[1] || 'http://example.com/page?id=1';
        addOutput('', 'normal');
        addOutput(`[14:30:16] [INFO] testing connection to the target URL`, 'normal');
        addOutput(`[14:30:16] [INFO] checking if the target is protected by some kind of WAF/IPS`, 'normal');
        addOutput(`[14:30:17] [INFO] testing if the target URL content is stable`, 'normal');
        addOutput(`[14:30:17] [INFO] target URL content is stable`, 'success');
        addOutput(`[14:30:17] [INFO] testing if GET parameter 'id' is dynamic`, 'normal');
        addOutput(`[14:30:18] [INFO] confirming that GET parameter 'id' is dynamic`, 'success');
        addOutput(`[14:30:18] [INFO] GET parameter 'id' appears to be injectable (based on time delays)`, 'success');
        addOutput(`[14:30:20] [INFO] testing \'AND boolean-based blind - WHERE or HAVING clause\'`, 'normal');
        addOutput(`[14:30:22] [INFO] GET parameter 'id' is \'AND boolean-based blind - WHERE or HAVING clause\' injectable`, 'success');
        addOutput(`[14:30:22] [INFO] testing \'MySQL >= 5.0 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause\'`, 'normal');
        addOutput(`[14:30:24] [INFO] GET parameter 'id' is \'MySQL >= 5.0 AND error-based - WHERE, HAVING, ORDER BY or GROUP BY clause\' injectable`, 'success');
        addOutput(`[14:30:24] [INFO] the back-end DBMS is MySQL`, 'success');
        addOutput(`[14:30:24] [WARNING] it is very important to not stress the network connection for usage of time-based payloads`, 'warning');
      } else if (cmd.includes('--dbs')) {
        addOutput('', 'normal');
        addOutput(`[14:30:25] [INFO] fetching database names`, 'normal');
        addOutput(`available databases [5]:`, 'success');
        addOutput(`[*] information_schema`, 'success');
        addOutput(`[*] mysql`, 'success');
        addOutput(`[*] performance_schema`, 'success');
        addOutput(`[*] testdb`, 'success');
        addOutput(`[*] webapp`, 'success');
      } else if (cmd.includes('-D') && cmd.includes('--tables')) {
        const db = cmd.match(/-D\s+(\S+)/)?.[1] || 'webapp';
        addOutput('', 'normal');
        addOutput(`[14:30:26] [INFO] fetching tables for database: '${db}'`, 'normal');
        addOutput(`Database: ${db}`, 'success');
        addOutput(`[5 tables]`, 'success');
        addOutput(`+------------------+`, 'success');
        addOutput(`| users            |`, 'success');
        addOutput(`| products         |`, 'success');
        addOutput(`| orders           |`, 'success');
        addOutput(`| sessions         |`, 'success');
        addOutput(`| config           |`, 'success');
        addOutput(`+------------------+`, 'success');
      } else if (cmd.includes('--dump')) {
        addOutput('', 'normal');
        addOutput(`[14:30:27] [INFO] fetching entries for table 'users' in database 'webapp'`, 'normal');
        addOutput(`Database: webapp`, 'success');
        addOutput(`Table: users`, 'success');
        addOutput(`[3 entries]`, 'success');
        addOutput(`+----+----------+------------------+`, 'success');
        addOutput(`| id | username | password         |`, 'success');
        addOutput(`+----+----------+------------------+`, 'success');
        addOutput(`| 1  | admin    | 5f4dcc3b5aa765d61d8327deb882cf99 |`, 'success');
        addOutput(`| 2  | user1    | e10adc3949ba59abbe56e057f20f883e |`, 'success');
        addOutput(`| 3  | test     | 098f6bcd4621d373cade4e832627b4f6 |`, 'success');
        addOutput(`+----+----------+------------------+`, 'success');
      } else {
        addOutput(`[14:30:28] [ERROR] invalid option: ${cmd}`, 'error');
        addOutput(`[14:30:28] [INFO] type 'sqlmap -h' for help`, 'warning');
      }
    }, 1000);
  };

  return (
    <Modal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>
            <FaDatabase />
            SQLMap - SQL Injection Tool
          </Title>
          <CloseButton onClick={onClose}>
            <FaTimes />
            Close
          </CloseButton>
        </Header>

        <TerminalContainer>
          <TerminalOutput>
            {output.map(line => (
              <OutputLine key={line.id} type={line.type}>
                {line.text}
              </OutputLine>
            ))}
          </TerminalOutput>

          <InputContainer>
            <Prompt>sqlmap ></Prompt>
            <Input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && executeCommand(command)}
              placeholder="sqlmap -u 'http://example.com/page?id=1'"
              autoFocus
            />
            <ExecuteButton onClick={() => executeCommand(command)}>
              <FaPlay />
              Run
            </ExecuteButton>
          </InputContainer>

          <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => executeCommand("-u 'http://example.com/page?id=1'")}
              style={{
                background: 'rgba(255, 170, 0, 0.1)',
                border: '1px solid #ffaa00',
                borderRadius: '5px',
                padding: '8px 15px',
                color: '#ffaa00',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Test URL
            </button>
            <button
              onClick={() => executeCommand("-u 'http://example.com/page?id=1' --dbs")}
              style={{
                background: 'rgba(255, 170, 0, 0.1)',
                border: '1px solid #ffaa00',
                borderRadius: '5px',
                padding: '8px 15px',
                color: '#ffaa00',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              List Databases
            </button>
          </div>
        </TerminalContainer>
      </ModalContent>
    </Modal>
  );
};

export default SqlmapInterface;


import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaTimes, FaPlay, FaStop, FaInfoCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
  border: 2px solid #00ff41;
  border-radius: 15px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 50px rgba(0, 255, 65, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #00ff41;
`;

const Title = styled.h2`
  color: #00ff41;
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

const TerminalHeader = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  align-items: center;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  flex: 1;
`;

const Input = styled.input`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 10px;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const ExecuteButton = styled.button`
  background: linear-gradient(45deg, #00ff41, #00cc33);
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
    background: linear-gradient(45deg, #00cc33, #00ff41);
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TerminalOutput = styled.div`
  background: #000;
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 15px;
  height: 400px;
  overflow-y: auto;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  color: #00ff41;
  line-height: 1.6;
`;

const OutputLine = styled.div`
  color: ${props => {
    if (props.type === 'command') return '#00ffff';
    if (props.type === 'success') return '#00ff41';
    if (props.type === 'error') return '#ff0040';
    if (props.type === 'warning') return '#ffaa00';
    return '#00ff41';
  }};
  margin-bottom: 2px;
  white-space: pre-wrap;
`;

const QuickScanButton = styled.button`
  background: rgba(0, 255, 65, 0.1);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 8px 15px;
  color: #00ff41;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 65, 0.2);
  }
`;

const GuidancePanel = styled(motion.div)`
  background: rgba(0, 255, 65, 0.05);
  border: 2px solid #00ff41;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  max-height: ${props => props.expanded ? '400px' : '60px'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const GuidanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  margin-bottom: ${props => props.expanded ? '15px' : '0'};
`;

const GuidanceContent = styled.div`
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.8;
  font-family: 'Share Tech Mono', monospace;
`;

const StepItem = styled.div`
  margin-bottom: 12px;
  padding-left: 20px;
  border-left: 2px solid #00ff41;
`;

const StepTitle = styled.div`
  color: #00ff41;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommandExample = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ffff;
  border-radius: 5px;
  padding: 8px;
  margin: 8px 0;
  color: #00ffff;
  font-family: 'Share Tech Mono', monospace;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    border-color: #00ff41;
    color: #00ff41;
  }
`;

const ExpectedResults = styled.div`
  background: rgba(255, 170, 0, 0.1);
  border: 1px solid #ffaa00;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  color: #ffaa00;
  font-size: 0.85rem;
`;

const NmapInterface = ({ tool, targets, onClose, stepContext, selectedCompany, embedded = false }) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [guidanceExpanded, setGuidanceExpanded] = useState(true);
  
  // Check if this is Step 2 (Reconnaissance) from the investigation
  const isReconnaissanceStep = stepContext?.stepId === 2 || stepContext?.title?.toLowerCase().includes('reconnaissance');
  
  // Get target IP and network from selected company, or use defaults
  const targetIP = selectedCompany?.targetIP || '198.51.100.42';
  const networkRange = selectedCompany?.networkRange || '198.51.100.0/24';
  const companyName = selectedCompany?.name || 'Target';

  const addOutput = (text, type = 'normal') => {
    setOutput(prev => [...prev, { text, type, id: Date.now() }]);
  };

  const executeNmap = (cmd) => {
    if (!cmd.trim()) return;
    
    setIsScanning(true);
    addOutput(`root@kali:~# nmap ${cmd}`, 'command');
    addOutput('', 'normal');
    addOutput('Starting Nmap 7.94 ( https://nmap.org ) at 2024-01-18 14:30 UTC', 'normal');
    addOutput('', 'normal');

    setTimeout(() => {
      // Extract target from command or use company's target
      const ipMatch = cmd.match(/\d+\.\d+\.\d+\.\d+(?:\/\d+)?/);
      const target = ipMatch ? ipMatch[0] : targetIP;
      const isNetworkScan = cmd.includes('/24') || cmd.includes('/') || cmd.includes(networkRange);
      const scanNetwork = isNetworkScan ? (ipMatch ? ipMatch[0] : networkRange) : null;
      
      if (isNetworkScan) {
        // Network scan results
        addOutput(`Nmap scan report for ${scanNetwork}`, 'normal');
        addOutput('Host is up (0.045s latency).', 'success');
        addOutput('', 'normal');
        // Extract base IP from network range
        const baseIP = scanNetwork.split('/')[0];
        const ipParts = baseIP.split('.');
        const baseIPNum = ipParts.slice(0, 3).join('.');
        
        addOutput(`Nmap scan report for ${baseIPNum}.42`, 'normal');
        addOutput('Host is up (0.045s latency).', 'success');
        addOutput('MAC Address: 00:1B:44:11:3A:B7 (Unknown)', 'normal');
        addOutput('', 'normal');
        addOutput(`Nmap scan report for ${baseIPNum}.43`, 'normal');
        addOutput('Host is up (0.045s latency).', 'success');
        addOutput('MAC Address: 00:1B:44:11:3A:B8 (Unknown)', 'normal');
        addOutput('', 'normal');
        addOutput(`Nmap scan report for ${baseIPNum}.44`, 'normal');
        addOutput('Host is up (0.045s latency).', 'success');
        addOutput('MAC Address: 00:1B:44:11:3A:B9 (Unknown)', 'normal');
        addOutput('', 'normal');
        addOutput('Nmap done: 256 IP addresses (5 hosts up) scanned in 12.45 seconds', 'success');
      } else {
        // Single host scan results - use extracted target or company's target IP
        const scanTarget = target || targetIP;
        addOutput(`Nmap scan report for ${scanTarget}`, 'normal');
        addOutput('Host is up (0.045s latency).', 'success');
        addOutput('', 'normal');
        
        if (cmd.includes('-O') || cmd.includes('-sV')) {
          addOutput('PORT     STATE SERVICE     VERSION', 'normal');
          addOutput('22/tcp   open  ssh         OpenSSH 7.4p1 Debian 10+deb9u7 (protocol 2.0)', 'success');
          addOutput('80/tcp   open  http        Apache httpd 2.4.29 ((Ubuntu))', 'success');
          addOutput('443/tcp  open  ssl/http    Apache httpd 2.4.29 ((Ubuntu))', 'success');
          addOutput('8080/tcp open  http-proxy  Apache httpd 2.4.29', 'success');
          addOutput('', 'normal');
          addOutput('OS details: Linux 4.15.0 - 4.19.0 (Linux 4.15.0)', 'warning');
          addOutput('Network Distance: 2 hops', 'normal');
          addOutput('', 'normal');
          addOutput('Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel', 'normal');
          addOutput('', 'normal');
          addOutput('VULNERABILITIES:', 'warning');
          addOutput('CVE-2019-0211: Apache HTTP Server privilege escalation', 'error');
          addOutput('CVE-2017-15710: Apache HTTP Server vulnerability', 'error');
          addOutput('', 'normal');
        } else {
          addOutput('PORT     STATE SERVICE', 'normal');
          addOutput('22/tcp   open  ssh', 'success');
          addOutput('80/tcp   open  http', 'success');
          addOutput('443/tcp  open  https', 'success');
          addOutput('8080/tcp open  http-proxy', 'success');
          addOutput('', 'normal');
        }
        
        addOutput('Service detection performed. Please report any incorrect results.', 'warning');
        addOutput('Nmap done: 1 IP address (1 host up) scanned in 8.23 seconds', 'success');
      }
      
      setIsScanning(false);
    }, 2000);
  };

  const quickScan = (target) => {
    setCommand(target);
    executeNmap(target);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeNmap(command);
  };

  const content = (
    <ModalContent onClick={(e) => e.stopPropagation()} style={embedded ? { width: '100%', maxWidth: '100%', maxHeight: '100%', borderRadius: '0', border: 'none', boxShadow: 'none' } : {}}>
      {!embedded && (
        <Header>
          <Title>
            <FaTerminal />
            Nmap - Network Mapper
          </Title>
          <CloseButton onClick={onClose}>
            <FaTimes />
            Close
          </CloseButton>
        </Header>
      )}

        <TerminalContainer style={embedded ? { flex: 1, minHeight: 0 } : {}}>
          {isReconnaissanceStep && (
            <GuidancePanel expanded={guidanceExpanded}>
              <GuidanceHeader onClick={() => setGuidanceExpanded(!guidanceExpanded)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaInfoCircle />
                  Step-by-Step Instructions for Reconnaissance
                </div>
                {guidanceExpanded ? <FaChevronUp /> : <FaChevronDown />}
              </GuidanceHeader>
              {guidanceExpanded && (
                <GuidanceContent>
                  <StepItem>
                    <StepTitle>STEP 1 - Network Scanning:</StepTitle>
                    <div>Scanning target: <strong style={{ color: '#00ff41' }}>{companyName}</strong> ({targetIP})</div>
                    <div style={{ marginTop: '8px' }}>Type or click the command below to scan the target:</div>
                    <CommandExample onClick={() => {
                      const cmd = `-sS -sV -O ${targetIP}`;
                      setCommand(cmd);
                      executeNmap(cmd);
                    }}>
                      nmap -sS -sV -O {targetIP}
                    </CommandExample>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '5px' }}>
                      This performs a stealth SYN scan with version detection and OS detection
                    </div>
                  </StepItem>

                  <StepItem>
                    <StepTitle>STEP 2 - Analyze Results:</StepTitle>
                    <div>Look for:</div>
                    <div style={{ marginLeft: '20px', marginTop: '5px' }}>
                      • Open ports (22, 80, 443, 8080)<br />
                      • Service versions (Apache 2.4.29, OpenSSH 7.4)<br />
                      • Operating system (Linux 4.15.0)<br />
                      • Vulnerabilities (CVE numbers)
                    </div>
                  </StepItem>

                  <StepItem>
                    <StepTitle>STEP 3 - Map Infrastructure:</StepTitle>
                    <div>Scan the entire network to find all hosts:</div>
                    <CommandExample onClick={() => {
                      const cmd = `-sn ${networkRange}`;
                      setCommand(cmd);
                      executeNmap(cmd);
                    }}>
                      nmap -sn {networkRange}
                    </CommandExample>
                    <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '5px' }}>
                      This scans the entire subnet to find all active hosts
                    </div>
                  </StepItem>

                  <ExpectedResults>
                    <strong>Expected Results for {companyName}:</strong><br />
                    • Target IP: {targetIP}<br />
                    • Open Ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 8080 (Web App)<br />
                    • OS: Linux 4.15.0 (outdated)<br />
                    • Vulnerabilities: Apache 2.4.29 (CVE-2019-0211), OpenSSH 7.4<br />
                    • Network: 5 active hosts discovered in {networkRange}
                  </ExpectedResults>
                </GuidanceContent>
              )}
            </GuidancePanel>
          )}

          <TerminalHeader>
            <InputGroup>
              <Input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder={isReconnaissanceStep ? `nmap -sS -sV -O ${targetIP}` : "nmap [options] <target>"}
                onKeyPress={(e) => e.key === 'Enter' && !isScanning && handleSubmit(e)}
              />
              <ExecuteButton onClick={handleSubmit} disabled={isScanning}>
                {isScanning ? <FaStop /> : <FaPlay />}
                {isScanning ? 'Scanning...' : 'Scan'}
              </ExecuteButton>
            </InputGroup>
          </TerminalHeader>

          <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {isReconnaissanceStep ? (
              <>
                <QuickScanButton onClick={() => {
                  const cmd = `-sS -sV -O ${targetIP}`;
                  setCommand(cmd);
                  executeNmap(cmd);
                }}>
                  Step 1: Scan {companyName}
                </QuickScanButton>
                <QuickScanButton onClick={() => {
                  const cmd = `-sn ${networkRange}`;
                  setCommand(cmd);
                  executeNmap(cmd);
                }}>
                  Step 3: Map Network
                </QuickScanButton>
              </>
            ) : (
              <>
                <QuickScanButton onClick={() => quickScan('192.168.1.1')}>
                  Quick: 192.168.1.1
                </QuickScanButton>
                <QuickScanButton onClick={() => quickScan('192.168.1.0/24')}>
                  Scan Network
                </QuickScanButton>
                <QuickScanButton onClick={() => quickScan('-sV 192.168.1.1')}>
                  Version Scan
                </QuickScanButton>
              </>
            )}
            {targets && targets.slice(0, 3).map(target => (
              <QuickScanButton key={target.id} onClick={() => quickScan(target.ip)}>
                {target.name}
              </QuickScanButton>
            ))}
          </div>

          <TerminalOutput>
            {output.length === 0 ? (
              <OutputLine type="normal">
                {isReconnaissanceStep ? (
                  `Nmap 7.94 ( https://nmap.org )
Ready for reconnaissance scan.

Target: ${companyName} (${targetIP})
Network: ${networkRange}

Follow the instructions above to:
1. Scan the target: nmap -sS -sV -O ${targetIP}
2. Analyze the results for open ports and vulnerabilities
3. Map the network: nmap -sn ${networkRange}

Click the quick scan buttons or type commands in the input field above.`
                ) : (
                  `Nmap 7.94 ( https://nmap.org )
Usage: nmap [Scan Type(s)] [Options] {target specification}
TARGET SPECIFICATION:
  Can pass hostnames, IP addresses, networks, etc.
  Ex: scanme.nmap.org, microsoft.com/24, 192.168.0.1; 10.0.0-255.1-254
SCAN TYPES:
  -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans
  -sU: UDP Scan
  -sN/sF/sX: TCP Null, FIN, and Xmas scans
  -sV: Probe open ports to determine service/version info
  -O: Enable OS detection
  -A: Enable OS detection, version detection, script scanning, and traceroute
`
                )}
              </OutputLine>
            ) : (
              output.map(line => (
                <OutputLine key={line.id} type={line.type}>
                  {line.text}
                </OutputLine>
              ))
            )}
          </TerminalOutput>
        </TerminalContainer>
      </ModalContent>
  );

  if (embedded) {
    return content;
  }

  return (
    <Modal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {content}
    </Modal>
  );
};

export default NmapInterface;


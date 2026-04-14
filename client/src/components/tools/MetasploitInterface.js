import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTerminal, FaTimes, FaBomb } from 'react-icons/fa';

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
  border: 2px solid #ff0040;
  border-radius: 15px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 50px rgba(255, 0, 64, 0.5);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ff0040;
`;

const Title = styled.h2`
  color: #ff0040;
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
  border: 1px solid #ff0040;
  border-radius: 5px;
  padding: 15px;
  height: 500px;
  overflow-y: auto;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  color: #ff0040;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const OutputLine = styled.div`
  color: ${props => {
    if (props.type === 'command') return '#00ffff';
    if (props.type === 'success') return '#00ff41';
    if (props.type === 'error') return '#ff0040';
    if (props.type === 'warning') return '#ffaa00';
    return '#ff0040';
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
  color: #ff0040;
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;
`;

const Input = styled.input`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #ff0040;
  border-radius: 5px;
  padding: 10px;
  color: #ff0040;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #ff3366;
    box-shadow: 0 0 10px rgba(255, 0, 64, 0.3);
  }
`;

const MetasploitInterface = ({ tool, targets, onClose }) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([
    { text: 'Metasploit Framework Console', type: 'normal' },
    { text: 'Version: 6.3.0-dev', type: 'normal' },
    { text: '', type: 'normal' },
    { text: '       =[ metasploit v6.3.0-dev                          ]', type: 'normal' },
    { text: '+ -- --=[ 2308 exploits - 1218 auxiliary - 412 post       ]', type: 'normal' },
    { text: '+ -- --=[ 1385 payloads - 46 encoders - 11 nops            ]', type: 'normal' },
    { text: '+ -- --=[ 9 evasion                                       ]', type: 'normal' },
    { text: '', type: 'normal' },
    { text: 'Metasploit tip: Use the \'search\' command to find modules', type: 'warning' },
    { text: '', type: 'normal' }
  ]);
  const [module, setModule] = useState(null);
  const [options, setOptions] = useState({});

  const addOutput = (text, type = 'normal') => {
    setOutput(prev => [...prev, { text, type, id: Date.now() }]);
  };

  const executeCommand = (cmd) => {
    if (!cmd.trim()) return;
    
    addOutput(`msf6 > ${cmd}`, 'command');
    setCommand('');

    const parts = cmd.trim().split(' ');
    const cmdName = parts[0].toLowerCase();

    setTimeout(() => {
      switch (cmdName) {
        case 'search':
          const searchTerm = parts.slice(1).join(' ') || 'exploit';
          addOutput('', 'normal');
          addOutput(`Matching Modules`, 'normal');
          addOutput('================', 'normal');
          addOutput('', 'normal');
          addOutput(`Name  Disclosure Date  Rank    Check  Description`, 'normal');
          addOutput(`----  ---------------  ----    -----  -----------`, 'normal');
          addOutput(`exploit/windows/smb/ms17_010_eternalblue  2017-03-14  excellent  Yes   MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption`, 'success');
          addOutput(`exploit/linux/http/apache_mod_cgi_bash_env_exec  2014-09-24  excellent  Yes   Apache mod_cgi Bash Environment Variable Code Injection (Shellshock)`, 'success');
          addOutput(`exploit/unix/webapp/wp_admin_shell_upload  2015-02-21  excellent  Yes   WordPress Admin Shell Upload`, 'success');
          break;
        case 'use':
          const modulePath = parts[1];
          if (modulePath) {
            setModule(modulePath);
            addOutput(`[*] Using exploit/${modulePath}`, 'success');
            addOutput('', 'normal');
            addOutput('Module options (exploit/windows/smb/ms17_010_eternalblue):', 'normal');
            addOutput('', 'normal');
            addOutput('   Name           Current Setting  Required  Description', 'normal');
            addOutput('   ----           ---------------  --------  -----------', 'normal');
            addOutput('   RHOSTS                          yes       The target host(s), see https://github.com/rapid7/metasploit-framework/wiki/Using-Metasploit', 'normal');
            addOutput('   RPORT          445              yes       The SMB service port (TCP)', 'normal');
            addOutput('   SMBDomain      .                no        (Optional) The Windows domain to use for authentication', 'normal');
            addOutput('   SMBPass                         no        (Optional) The password for the specified username', 'normal');
            addOutput('   SMBUser                         no        (Optional) The username to authenticate as', 'normal');
            addOutput('', 'normal');
            addOutput('Payload options (windows/x64/meterpreter/reverse_tcp):', 'normal');
            addOutput('', 'normal');
            addOutput('   Name      Current Setting  Required  Description', 'normal');
            addOutput('   ----      ---------------  --------  -----------', 'normal');
            addOutput('   EXITFUNC  thread           yes       Exit technique (Accepted: \'\', seh, thread, process, none)', 'normal');
            addOutput('   LHOST                      yes       The listen address (an interface may be specified)', 'normal');
            addOutput('   LPORT     4444             yes       The listen port', 'normal');
          }
          break;
        case 'set':
          if (parts[1] && parts[2]) {
            const opt = parts[1];
            const val = parts[2];
            setOptions(prev => ({ ...prev, [opt]: val }));
            addOutput(`${opt} => ${val}`, 'success');
          }
          break;
        case 'show':
          if (parts[1] === 'options') {
            addOutput('', 'normal');
            addOutput('Module options (exploit/windows/smb/ms17_010_eternalblue):', 'normal');
            addOutput('', 'normal');
            addOutput('   Name           Current Setting  Required  Description', 'normal');
            addOutput('   ----           ---------------  --------  -----------', 'normal');
            Object.entries(options).forEach(([key, val]) => {
              addOutput(`   ${key.padEnd(15)} ${(val || '').padEnd(15)} yes       ${key === 'RHOSTS' ? 'The target host(s)' : key === 'LHOST' ? 'The listen address' : 'Option description'}`, 'normal');
            });
          }
          break;
        case 'exploit':
        case 'run':
          addOutput('', 'normal');
          addOutput('[*] Started reverse TCP handler on 0.0.0.0:4444', 'success');
          addOutput('[*] 192.168.1.100:445 - Connecting to target for exploitation.', 'normal');
          addOutput('[*] 192.168.1.100:445 - Connection established for exploitation.', 'normal');
          addOutput('[*] 192.168.1.100:445 - Target OS: Windows 7', 'normal');
          addOutput('[*] 192.168.1.100:445 - Sending exploit...', 'warning');
          setTimeout(() => {
            addOutput('[*] 192.168.1.100:445 - Exploit completed successfully', 'success');
            addOutput('[*] Meterpreter session 1 opened (192.168.1.1:4444 -> 192.168.1.100:49158)', 'success');
            addOutput('', 'normal');
            addOutput('meterpreter >', 'command');
          }, 2000);
          break;
        case 'help':
          addOutput('', 'normal');
          addOutput('Core Commands', 'normal');
          addOutput('=============', 'normal');
          addOutput('', 'normal');
          addOutput('    Command       Description', 'normal');
          addOutput('    -------       -----------', 'normal');
          addOutput('    ?             Help menu', 'normal');
          addOutput('    background    Background the current session', 'normal');
          addOutput('    banner        Display an awesome metasploit banner', 'normal');
          addOutput('    cd            Change the current working directory', 'normal');
          addOutput('    exit          Exit the console', 'normal');
          addOutput('    get           Gets the value of a context variable', 'normal');
          addOutput('    getg          Gets the value of a global variable', 'normal');
          addOutput('    grep          Grep the output of another command', 'normal');
          addOutput('    help          Help menu', 'normal');
          addOutput('    history       Show command history', 'normal');
          addOutput('    load          Load a framework plugin', 'normal');
          addOutput('    quit          Exit the console', 'normal');
          addOutput('    route         Route traffic through a session', 'normal');
          addOutput('    save          Saves the active datastores', 'normal');
          addOutput('    set           Sets a context-specific variable to a value', 'normal');
          addOutput('    setg          Sets a global variable to a value', 'normal');
          addOutput('    sleep         Do nothing for the specified number of seconds', 'normal');
          addOutput('    spool         Write console output into a file as well the screen', 'normal');
          addOutput('    threads       View and manipulate background threads', 'normal');
          addOutput('    unload        Unload a framework plugin', 'normal');
          addOutput('    use           Select a module by name', 'normal');
          addOutput('    version       Show the framework and console library version numbers', 'normal');
          break;
        default:
          addOutput(`[-] Unknown command: ${cmdName}`, 'error');
          addOutput('Type "help" for available commands', 'warning');
      }
    }, 500);
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
            <FaBomb />
            Metasploit Framework
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
            <Prompt>{module ? 'msf6 exploit(windows/smb/ms17_010_eternalblue) >' : 'msf6 >'}</Prompt>
            <Input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && executeCommand(command)}
              placeholder="Enter command..."
              autoFocus
            />
          </InputContainer>
        </TerminalContainer>
      </ModalContent>
    </Modal>
  );
};

export default MetasploitInterface;




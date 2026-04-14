import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaGlobe, FaUser, FaEnvelope, FaServer, FaDatabase, FaGoogle, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
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
  max-width: 1200px;
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

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #00ff41;
  background: rgba(0, 0, 0, 0.3);
  overflow-x: auto;
`;

const Tab = styled.button`
  background: ${props => props.active ? 'rgba(0, 255, 65, 0.2)' : 'transparent'};
  border: none;
  border-bottom: ${props => props.active ? '3px solid #00ff41' : '3px solid transparent'};
  color: ${props => props.active ? '#00ff41' : '#888'};
  padding: 15px 20px;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(0, 255, 65, 0.1);
    color: #00ff41;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 12px;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 65, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 15px;
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
`;

const ResultLine = styled.div`
  color: ${props => {
    if (props.type === 'success') return '#00ff41';
    if (props.type === 'info') return '#00ffff';
    if (props.type === 'warning') return '#ffaa00';
    if (props.type === 'error') return '#ff0040';
    return '#ccc';
  }};
  margin-bottom: 8px;
  line-height: 1.6;
  word-break: break-word;
`;

const SectionTitle = styled.h3`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoBox = styled.div`
  background: rgba(0, 255, 65, 0.1);
  border-left: 3px solid #00ff41;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 5px;
  color: #ccc;
  font-size: 0.85rem;
  line-height: 1.6;
`;

const OsintInterface = ({ tool, targets, onClose }) => {
  const [activeTab, setActiveTab] = useState('google');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const tabs = [
    { id: 'google', name: 'Google Dorking', icon: FaGoogle },
    { id: 'social', name: 'Social Media', icon: FaUser },
    { id: 'shodan', name: 'Shodan', icon: FaServer },
    { id: 'email', name: 'Email Harvest', icon: FaEnvelope },
    { id: 'subdomain', name: 'Subdomain Discovery', icon: FaDatabase },
    { id: 'whois', name: 'Whois Lookup', icon: FaGlobe }
  ];

  const generateGoogleResults = (query) => {
    const domain = query.includes('.') ? query : `${query}.com`;
    return [
      { text: `[+] Searching Google for: ${query}`, type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] Found 47 results:', type: 'success' },
      { text: '', type: 'normal' },
      { text: `[1] site:${domain} filetype:pdf`, type: 'info' },
      { text: '   → Found 12 PDF documents', type: 'success' },
      { text: '   → Contains: employee_handbook.pdf, security_policy.pdf', type: 'info' },
      { text: '', type: 'normal' },
      { text: `[2] site:${domain} inurl:admin`, type: 'info' },
      { text: '   → Found admin panel: admin.${domain}', type: 'warning' },
      { text: '', type: 'normal' },
      { text: `[3] site:${domain} "password" OR "secret"`, type: 'info' },
      { text: '   → Found 3 pages containing sensitive keywords', type: 'warning' },
      { text: '', type: 'normal' },
      { text: '[+] Google Dorking complete', type: 'success' }
    ];
  };

  const generateSocialResults = (query) => {
    return [
      { text: `[+] Searching social media platforms for: ${query}`, type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] LinkedIn Results:', type: 'success' },
      { text: '   → Found profile: John Smith - System Administrator', type: 'info' },
      { text: '   → Company: Shadow Network', type: 'warning' },
      { text: '   → Location: Remote', type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] Twitter Results:', type: 'success' },
      { text: '   → @shadow_net_ops - 1,247 followers', type: 'info' },
      { text: '   → Last tweet: 2 days ago about "new infrastructure"', type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] Facebook Results:', type: 'success' },
      { text: '   → Profile found: John Smith', type: 'info' },
      { text: '   → Public posts reveal location and interests', type: 'warning' },
      { text: '', type: 'normal' },
      { text: '[+] Social media reconnaissance complete', type: 'success' }
    ];
  };

  const generateShodanResults = (query) => {
    const ip = query.match(/\d+\.\d+\.\d+\.\d+/) ? query : '198.51.100.42';
    return [
      { text: `[+] Querying Shodan for: ${query}`, type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] Shodan Results:', type: 'success' },
      { text: '', type: 'normal' },
      { text: `IP: ${ip}`, type: 'info' },
      { text: 'Organization: Shadow Network Infrastructure', type: 'warning' },
      { text: 'Location: Unknown', type: 'info' },
      { text: '', type: 'normal' },
      { text: 'Open Ports:', type: 'success' },
      { text: '  22/tcp  - SSH (OpenSSH 8.2)', type: 'info' },
      { text: '  80/tcp  - HTTP (Apache 2.4.41)', type: 'info' },
      { text: '  443/tcp - HTTPS (Apache 2.4.41)', type: 'info' },
      { text: '  8080/tcp - HTTP Proxy', type: 'info' },
      { text: '', type: 'normal' },
      { text: 'Vulnerabilities:', type: 'warning' },
      { text: '  → CVE-2024-XXXXX (Apache mod_cgi)', type: 'warning' },
      { text: '  → Outdated OpenSSH version', type: 'warning' },
      { text: '', type: 'normal' },
      { text: '[+] Shodan search complete', type: 'success' }
    ];
  };

  const generateEmailResults = (query) => {
    const domain = query.includes('@') ? query.split('@')[1] : query;
    return [
      { text: `[+] Harvesting emails from domain: ${domain}`, type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] Email addresses found:', type: 'success' },
      { text: '', type: 'normal' },
      { text: 'admin@shadow-network.org', type: 'info' },
      { text: 'john.smith@shadow-network.org', type: 'info' },
      { text: 'sysadmin@shadow-network.org', type: 'info' },
      { text: 'security@shadow-network.org', type: 'info' },
      { text: 'operations@shadow-network.org', type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] Additional information:', type: 'success' },
      { text: '   → Found 5 email addresses', type: 'info' },
      { text: '   → Email pattern: firstname.lastname@shadow-network.org', type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] Email harvesting complete', type: 'success' }
    ];
  };

  const generateSubdomainResults = (query) => {
    const domain = query.includes('.') ? query : `${query}.com`;
    return [
      { text: `[+] Discovering subdomains for: ${domain}`, type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] Subdomains found:', type: 'success' },
      { text: '', type: 'normal' },
      { text: 'www.shadow-network.org', type: 'info' },
      { text: 'admin.shadow-network.org', type: 'warning' },
      { text: 'api.shadow-network.org', type: 'info' },
      { text: 'mail.shadow-network.org', type: 'info' },
      { text: 'ftp.shadow-network.org', type: 'info' },
      { text: 'dev.shadow-network.org', type: 'info' },
      { text: 'staging.shadow-network.org', type: 'info' },
      { text: 'test.shadow-network.org', type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] Total subdomains discovered: 8', type: 'success' },
      { text: '[+] Subdomain discovery complete', type: 'success' }
    ];
  };

  const generateWhoisResults = (query) => {
    const domain = query.includes('.') ? query : `${query}.com`;
    return [
      { text: `[+] Performing Whois lookup for: ${domain}`, type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] Whois Information:', type: 'success' },
      { text: '', type: 'normal' },
      { text: `Domain: ${domain}`, type: 'info' },
      { text: 'Registrar: Privacy Protection Service', type: 'info' },
      { text: 'Registration Date: 2022-03-15', type: 'info' },
      { text: 'Expiration Date: 2025-03-15', type: 'info' },
      { text: '', type: 'normal' },
      { text: 'Name Servers:', type: 'success' },
      { text: '  ns1.shadow-network.org', type: 'info' },
      { text: '  ns2.shadow-network.org', type: 'info' },
      { text: '', type: 'normal' },
      { text: 'Registrant (Hidden):', type: 'warning' },
      { text: '  → Privacy protection enabled', type: 'info' },
      { text: '', type: 'normal' },
      { text: '[+] Whois lookup complete', type: 'success' }
    ];
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setResults([]);

    setTimeout(() => {
      let newResults = [];
      
      switch (activeTab) {
        case 'google':
          newResults = generateGoogleResults(query);
          break;
        case 'social':
          newResults = generateSocialResults(query);
          break;
        case 'shodan':
          newResults = generateShodanResults(query);
          break;
        case 'email':
          newResults = generateEmailResults(query);
          break;
        case 'subdomain':
          newResults = generateSubdomainResults(query);
          break;
        case 'whois':
          newResults = generateWhoisResults(query);
          break;
        default:
          newResults = [{ text: 'Unknown search type', type: 'error' }];
      }

      setResults(newResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'google':
        return 'Enter domain or search query (e.g., example.com, site:example.com filetype:pdf)';
      case 'social':
        return 'Enter name, username, or organization';
      case 'shodan':
        return 'Enter IP address, domain, or search query (e.g., 198.51.100.42)';
      case 'email':
        return 'Enter domain name (e.g., example.com)';
      case 'subdomain':
        return 'Enter domain name (e.g., example.com)';
      case 'whois':
        return 'Enter domain name (e.g., example.com)';
      default:
        return 'Enter search query';
    }
  };

  const getInfoText = () => {
    switch (activeTab) {
      case 'google':
        return 'Use Google search operators to find sensitive information. Examples: site:example.com filetype:pdf, inurl:admin, "password" site:example.com';
      case 'social':
        return 'Search across social media platforms (LinkedIn, Twitter, Facebook) to gather information about individuals or organizations.';
      case 'shodan':
        return 'Search Shodan database for exposed services, open ports, and vulnerabilities. Enter IP address or search query.';
      case 'email':
        return 'Harvest email addresses associated with a domain using various techniques and public sources.';
      case 'subdomain':
        return 'Discover subdomains of a target domain to map the organization\'s infrastructure.';
      case 'whois':
        return 'Perform Whois lookup to gather domain registration information, name servers, and registration dates.';
      default:
        return '';
    }
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
            <FaSearch />
            {tool.name} - Open Source Intelligence
          </Title>
          <CloseButton onClick={onClose}>
            <FaTimes />
            Close
          </CloseButton>
        </Header>

        <TabsContainer>
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <Tab
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setResults([]);
                  setQuery('');
                }}
              >
                <IconComponent />
                {tab.name}
              </Tab>
            );
          })}
        </TabsContainer>

        <Content>
          <InfoBox>
            {getInfoText()}
          </InfoBox>

          <InputGroup>
            <Input
              type="text"
              placeholder={getPlaceholder()}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SearchButton onClick={handleSearch} disabled={isSearching || !query.trim()}>
              <FaSearch />
              {isSearching ? 'Searching...' : 'Search'}
            </SearchButton>
          </InputGroup>

          <SectionTitle>
            <FaSearch />
            Results
          </SectionTitle>

          <ResultsContainer>
            {results.length === 0 ? (
              <ResultLine type="info">
                {isSearching 
                  ? 'Searching... Please wait...' 
                  : 'Enter a query above and click Search to begin OSINT gathering.'}
              </ResultLine>
            ) : (
              results.map((result, idx) => (
                <ResultLine key={idx} type={result.type}>
                  {result.text}
                </ResultLine>
              ))
            )}
          </ResultsContainer>
        </Content>
      </ModalContent>
    </Modal>
  );
};

export default OsintInterface;




import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGlobe, FaTimes, FaSearch } from 'react-icons/fa';

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
  max-width: 700px;
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

const Content = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
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
    background: linear-gradient(45deg, #00cc33, #00ff41);
    box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
  }
`;

const Results = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 5px;
  padding: 20px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.85rem;
  color: #00ff41;
  line-height: 1.8;
  white-space: pre-wrap;
  min-height: 400px;
`;

const WhoisInterface = ({ tool, targets, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState('');

  const performLookup = (target) => {
    const domain = target || query;
    if (!domain.trim()) return;

    setResults(`Domain Name: ${domain}
Registry Domain ID: D123456789-COM
Registrar WHOIS Server: whois.example-registrar.com
Registrar URL: http://www.example-registrar.com
Updated Date: 2024-01-15T10:30:00Z
Creation Date: 2020-03-20T14:22:00Z
Registry Expiry Date: 2025-03-20T14:22:00Z
Registrar: Example Registrar Inc.
Registrar IANA ID: 1234
Registrar Abuse Contact Email: abuse@example-registrar.com
Registrar Abuse Contact Phone: +1.5551234567
Domain Status: clientTransferProhibited https://icann.org/epp#clientTransferProhibited
Name Server: NS1.EXAMPLE.COM
Name Server: NS2.EXAMPLE.COM
DNSSEC: unsigned
URL of the ICANN Whois Inaccuracy Complaint Form: https://www.icann.org/wicf/
>>> Last update of whois database: 2024-01-18T12:00:00Z <<<

Registrant Name: John Doe
Registrant Organization: Example Corporation
Registrant Street: 123 Main Street
Registrant City: New York
Registrant State/Province: NY
Registrant Postal Code: 10001
Registrant Country: US
Registrant Phone: +1.5551234567
Registrant Email: john.doe@example.com

Admin Name: Admin Contact
Admin Organization: Example Corporation
Admin Street: 123 Main Street
Admin City: New York
Admin State/Province: NY
Admin Postal Code: 10001
Admin Country: US
Admin Phone: +1.5551234567
Admin Email: admin@example.com

Tech Name: Tech Contact
Tech Organization: Example Corporation
Tech Street: 123 Main Street
Tech City: New York
Tech State/Province: NY
Tech Postal Code: 10001
Tech Country: US
Tech Phone: +1.5551234567
Tech Email: tech@example.com`);
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
            <FaGlobe />
            Whois - Domain Lookup
          </Title>
          <CloseButton onClick={onClose}>
            <FaTimes />
            Close
          </CloseButton>
        </Header>

        <Content>
          <InputGroup>
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter domain or IP address (e.g., example.com)"
              onKeyPress={(e) => e.key === 'Enter' && performLookup()}
            />
            <SearchButton onClick={() => performLookup()}>
              <FaSearch />
              Lookup
            </SearchButton>
          </InputGroup>

          {targets && targets.length > 0 && (
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {targets.slice(0, 3).map(target => (
                <button
                  key={target.id}
                  onClick={() => performLookup(target.name)}
                  style={{
                    background: 'rgba(0, 255, 65, 0.1)',
                    border: '1px solid #00ff41',
                    borderRadius: '5px',
                    padding: '8px 15px',
                    color: '#00ff41',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  {target.name}
                </button>
              ))}
            </div>
          )}

          <Results>
            {results || 'Enter a domain or IP address and click Lookup to see WHOIS information'}
          </Results>
        </Content>
      </ModalContent>
    </Modal>
  );
};

export default WhoisInterface;


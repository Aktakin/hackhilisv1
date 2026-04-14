import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaTimes, FaPaperPlane, FaUser, FaLock } from 'react-icons/fa';

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
  max-width: 700px;
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

const Content = styled.div`
  padding: 20px;
  overflow-y: auto;
  flex: 1;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #ff0040;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #ff0040;
  border-radius: 5px;
  padding: 12px;
  color: #fff;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #ff3366;
    box-shadow: 0 0 10px rgba(255, 0, 64, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #ff0040;
  border-radius: 5px;
  padding: 12px;
  color: #fff;
  font-size: 0.9rem;
  min-height: 150px;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #ff3366;
    box-shadow: 0 0 10px rgba(255, 0, 64, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #ff0040;
  border-radius: 5px;
  padding: 12px;
  color: #fff;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #ff3366;
    box-shadow: 0 0 10px rgba(255, 0, 64, 0.3);
  }
`;

const TemplatePreview = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #ff0040;
  border-radius: 5px;
  padding: 15px;
  margin-top: 15px;
  color: #ccc;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const SendButton = styled.button`
  background: linear-gradient(45deg, #ff0040, #cc0033);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: center;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(45deg, #cc0033, #ff0040);
    box-shadow: 0 0 20px rgba(255, 0, 64, 0.5);
  }
`;

const TemplateButton = styled.button`
  background: rgba(255, 0, 64, 0.1);
  border: 1px solid #ff0040;
  border-radius: 5px;
  padding: 8px 15px;
  color: #ff0040;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 10px;
  margin-bottom: 10px;

  &:hover {
    background: rgba(255, 0, 64, 0.2);
  }
`;

const PhishingKitInterface = ({ tool, targets, onClose }) => {
  const [formData, setFormData] = useState({
    fromEmail: 'noreply@example.com',
    fromName: 'Security Team',
    toEmail: '',
    subject: 'Urgent: Account Verification Required',
    template: 'security',
    body: ''
  });

  const templates = {
    security: {
      subject: 'Urgent: Account Verification Required',
      body: `Dear User,

We have detected suspicious activity on your account. To secure your account, please verify your identity by clicking the link below:

[VERIFY ACCOUNT]

This link will expire in 24 hours. If you did not request this, please ignore this email.

Best regards,
Security Team`
    },
    bank: {
      subject: 'Important: Bank Account Update Required',
      body: `Dear Customer,

Your bank account requires immediate verification. Please update your information by clicking the link below:

[UPDATE ACCOUNT]

Failure to update within 48 hours may result in account suspension.

Thank you,
Bank Security Department`
    },
    social: {
      subject: 'Your Account Needs Attention',
      body: `Hi there,

We noticed unusual login activity on your account. Please verify your identity:

[VERIFY NOW]

If this wasn't you, please secure your account immediately.

Thanks,
Support Team`
    }
  };

  const loadTemplate = (templateName) => {
    const template = templates[templateName];
    setFormData(prev => ({
      ...prev,
      template: templateName,
      subject: template.subject,
      body: template.body
    }));
  };

  const handleSend = () => {
    // Simulate sending phishing email
    alert(`Phishing email sent to ${formData.toEmail || 'target'}`);
    onClose();
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
            <FaEnvelope />
            Phishing Kit - Email Template Builder
          </Title>
          <CloseButton onClick={onClose}>
            <FaTimes />
            Close
          </CloseButton>
        </Header>

        <Content>
          <div style={{ marginBottom: '20px' }}>
            <Label>Email Templates:</Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <TemplateButton onClick={() => loadTemplate('security')}>
                Security Alert
              </TemplateButton>
              <TemplateButton onClick={() => loadTemplate('bank')}>
                Bank Verification
              </TemplateButton>
              <TemplateButton onClick={() => loadTemplate('social')}>
                Social Media
              </TemplateButton>
            </div>
          </div>

          <FormGroup>
            <Label>
              <FaUser />
              From Name
            </Label>
            <Input
              type="text"
              value={formData.fromName}
              onChange={(e) => setFormData({...formData, fromName: e.target.value})}
              placeholder="Sender Name"
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaEnvelope />
              From Email
            </Label>
            <Input
              type="email"
              value={formData.fromEmail}
              onChange={(e) => setFormData({...formData, fromEmail: e.target.value})}
              placeholder="sender@example.com"
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaUser />
              Target Email
            </Label>
            <Input
              type="email"
              value={formData.toEmail}
              onChange={(e) => setFormData({...formData, toEmail: e.target.value})}
              placeholder="target@example.com"
            />
            {targets && targets.length > 0 && (
              <Select
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    const target = targets.find(t => t.id === parseInt(e.target.value));
                    if (target) setFormData({...formData, toEmail: target.email || `user${target.id}@${target.name.toLowerCase()}.com`});
                  }
                }}
                style={{ marginTop: '10px' }}
              >
                <option value="">Select from targets...</option>
                {targets.map(target => (
                  <option key={target.id} value={target.id}>
                    {target.name} ({target.ip})
                  </option>
                ))}
              </Select>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Subject</Label>
            <Input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              placeholder="Email Subject"
            />
          </FormGroup>

          <FormGroup>
            <Label>Email Body</Label>
            <TextArea
              value={formData.body}
              onChange={(e) => setFormData({...formData, body: e.target.value})}
              placeholder="Enter email content..."
            />
          </FormGroup>

          <TemplatePreview>
            <div style={{ color: '#ff0040', marginBottom: '10px', fontWeight: 'bold' }}>Preview:</div>
            <div style={{ marginBottom: '5px' }}><strong>From:</strong> {formData.fromName} &lt;{formData.fromEmail}&gt;</div>
            <div style={{ marginBottom: '5px' }}><strong>To:</strong> {formData.toEmail || 'target@example.com'}</div>
            <div style={{ marginBottom: '5px' }}><strong>Subject:</strong> {formData.subject}</div>
            <div style={{ marginTop: '15px', whiteSpace: 'pre-wrap' }}>{formData.body}</div>
          </TemplatePreview>

          <SendButton onClick={handleSend}>
            <FaPaperPlane />
            Send Phishing Email
          </SendButton>
        </Content>
      </ModalContent>
    </Modal>
  );
};

export default PhishingKitInterface;


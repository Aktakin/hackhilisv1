import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { FaExclamationTriangle, FaUser, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const LoginContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  font-family: 'Orbitron', sans-serif;
`;

const LoginBox = styled(motion.div)`
  background: rgba(10, 10, 20, 0.95);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 40px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
  backdrop-filter: blur(10px);
`;

const LoginTitle = styled.h1`
  color: #00ff41;
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
`;

const WarningBox = styled.div`
  background: rgba(255, 170, 0, 0.1);
  border: 1px solid #ffaa00;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffaa00;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  color: #00ff41;
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-weight: bold;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 15px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00ff41;
  border-radius: 8px;
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }

  &::placeholder {
    color: #666;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 25px;
`;

const LoginButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 8px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(45deg, #00cc33, #00ff41);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 65, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CreateAccountButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  background: transparent;
  border: 2px solid #00ffff;
  border-radius: 8px;
  color: #00ffff;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: rgba(0, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 255, 255, 0.4);
  }
`;

const ErrorMessage = styled.div`
  color: #ff0040;
  text-align: center;
  margin-top: 15px;
  font-size: 0.9rem;
`;

const LaptopLogin = ({ onLogin, onClose }) => {
  const { gameState, dispatch } = useGame();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    if (gameState.devices.laptop.userAccount) {
      if (username === gameState.devices.laptop.userAccount.username && 
          password === gameState.devices.laptop.userAccount.password) {
        dispatch({ type: 'LOGIN_LAPTOP', payload: { success: true } });
        onLogin();
      } else {
        setError('Invalid username or password');
      }
    } else {
      setError('No account found. Please create an account first.');
    }
  };

  const handleCreateAccount = () => {
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    dispatch({
      type: 'CREATE_LAPTOP_ACCOUNT',
      payload: { username, password }
    });

    dispatch({ type: 'LOGIN_LAPTOP', payload: { success: true } });
    onLogin();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (isCreatingAccount) {
        handleCreateAccount();
      } else {
        handleLogin();
      }
    }
  };

  return (
    <LoginContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoginBox
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <LoginTitle>
          {isCreatingAccount ? 'Create Account' : 'Laptop Login'}
        </LoginTitle>

        {!gameState.devices.laptop.userAccount && !isCreatingAccount && (
          <WarningBox>
            <FaExclamationTriangle />
            <span>No password set. Click "Create Account" to set up your laptop.</span>
          </WarningBox>
        )}

        <InputGroup>
          <InputLabel>
            <FaUser style={{ marginRight: '8px' }} />
            Username
          </InputLabel>
          <InputField
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter username"
            autoFocus
          />
        </InputGroup>

        <InputGroup>
          <InputLabel>
            <FaLock style={{ marginRight: '8px' }} />
            Password
          </InputLabel>
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter password"
          />
        </InputGroup>

        {isCreatingAccount && (
          <InputGroup>
            <InputLabel>
              <FaLock style={{ marginRight: '8px' }} />
              Confirm Password
            </InputLabel>
            <InputField
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Confirm password"
            />
          </InputGroup>
        )}

        <ButtonGroup>
          {isCreatingAccount ? (
            <>
              <CreateAccountButton onClick={handleCreateAccount}>
                <FaUserPlus />
                Create Account
              </CreateAccountButton>
              <LoginButton onClick={() => setIsCreatingAccount(false)}>
                Back to Login
              </LoginButton>
            </>
          ) : (
            <>
              <LoginButton onClick={handleLogin}>
                <FaSignInAlt />
                Sign In
              </LoginButton>
              <CreateAccountButton onClick={() => setIsCreatingAccount(true)}>
                <FaUserPlus />
                Create Account
              </CreateAccountButton>
            </>
          )}
        </ButtonGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginBox>
    </LoginContainer>
  );
};

export default LaptopLogin;




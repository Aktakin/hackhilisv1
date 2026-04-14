import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Phone from './components/Phone';
import Gadgets from './components/Gadgets';
import Companies from './components/Companies';
import Store from './components/Store';
import Education from './components/Education';
import Environment from './components/Environment';
import LaptopManager from './components/LaptopManager';
import Hacking from './components/Hacking';
import Alliance from './components/Alliance';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import ScenarioManager from './components/ScenarioManager';
import AttackScenario from './components/AttackScenario';
import AttackTutorial from './components/AttackTutorial';
import Missions from './components/Missions';
import { GameProvider } from './context/GameContext';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Share Tech Mono', monospace;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
    color: #00ff41;
    min-height: 100vh;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  margin-left: ${props => props.isLoggedIn ? '80px' : '0'};
  transition: margin-left 0.3s ease;
`;

const theme = {
  colors: {
    primary: '#00ff41',
    secondary: '#ff0040',
    accent: '#00ffff',
    background: '#0a0a0a',
    surface: '#1a1a2e',
    text: '#00ff41',
    textSecondary: '#888',
    danger: '#ff0040',
    warning: '#ffaa00',
    success: '#00ff41',
  },
  fonts: {
    primary: "'Share Tech Mono', monospace",
    heading: "'Orbitron', sans-serif",
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  }
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const savedUser = localStorage.getItem('hackhilis_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
        console.log('App - Restored user from localStorage:', userData.username);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('hackhilis_user');
      }
    } else {
      console.log('App - No saved user found, starting fresh');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('hackhilis_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('hackhilis_user');
    // Note: We don't clear the game state here as it's user-specific
    // Each user's game state is stored separately
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GameProvider user={user}>
        <Router>
          <AppContainer>
            {isLoggedIn && <Navigation onLogout={handleLogout} user={user} />}
            <MainContent isLoggedIn={isLoggedIn}>
              <Routes>
                <Route 
                  path="/login" 
                  element={
                    isLoggedIn ? 
                    <Navigate to="/dashboard" replace /> : 
                    <Login onLogin={handleLogin} />
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    isLoggedIn ? 
                    <Dashboard user={user} /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/phone" 
                  element={
                    isLoggedIn ? 
                    <Phone user={user} /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/gadgets" 
                  element={
                    isLoggedIn ? 
                    <Gadgets user={user} /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/laptops" 
                  element={
                    isLoggedIn ? 
                    <LaptopManager user={user} /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/companies" 
                  element={
                    isLoggedIn ? 
                    <Companies user={user} /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/store" 
                  element={
                    isLoggedIn ? 
                    <Store user={user} /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/education" 
                  element={
                    isLoggedIn ? 
                    <Education user={user} /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/env" 
                  element={
                    isLoggedIn ? 
                    <Environment user={user} /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/hacking" 
                  element={
                    isLoggedIn ? 
                    <Hacking user={user} /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/alliance" 
                  element={
                    isLoggedIn ? 
                    <Alliance user={user} /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    isLoggedIn ? 
                    <Profile user={user} /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/scenarios" 
                  element={
                    isLoggedIn ? 
                    <ScenarioManager /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/attack" 
                  element={
                    isLoggedIn ? 
                    <AttackScenario /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/tutorial" 
                  element={
                    isLoggedIn ? 
                    <AttackTutorial /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/missions" 
                  element={
                    isLoggedIn ? 
                    <Missions /> : 
                    <Navigate to="/login" replace />
                  } 
                />
                <Route 
                  path="/" 
                  element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} 
                />
              </Routes>
            </MainContent>
          </AppContainer>
        </Router>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;

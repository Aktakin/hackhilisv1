import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import ScenarioEngine from '../scenarios/scenarioEngine';
import { allScenarios, getCategories, getScenariosByCategory } from '../scenarios/scenarioConfig';
import { 
  FaPlay, 
  FaStop, 
  FaList, 
  FaFilter, 
  FaCheckCircle, 
  FaTimesCircle,
  FaHistory,
  FaChartBar,
  FaTrash,
  FaSearch,
  FaFolder,
  FaFolderOpen,
  FaBook
} from 'react-icons/fa';

const ManagerContainer = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const ManagerHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const ManagerTitle = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 2.5rem;
  color: #00ff41;
  margin-bottom: 10px;
  text-shadow: 0 0 20px #00ff41;
`;

const ManagerSubtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
`;

const ControlsBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 8px;
  padding: 10px 15px;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  flex: 1;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  }

  &::placeholder {
    color: #666;
  }
`;

const FilterButton = styled.button`
  background: ${props => props.active ? '#00ff41' : 'transparent'};
  color: ${props => props.active ? '#000' : '#00ff41'};
  border: 2px solid #00ff41;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #00ff41;
    color: #000;
    transform: translateY(-2px);
  }
`;

const StatsBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const StatCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 10px;
  padding: 15px 20px;
  flex: 1;
  min-width: 150px;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #00ff41;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 0.9rem;
  text-transform: uppercase;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CategoriesSidebar = styled.div`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  max-height: 600px;
  overflow-y: auto;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
  margin-bottom: 5px;

  &:hover {
    background: rgba(0, 255, 65, 0.1);
  }
`;

const CategoryName = styled.div`
  color: #00ff41;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryCount = styled.span`
  color: #888;
  font-size: 0.9rem;
`;

const ScenariosList = styled.div`
  margin-top: 10px;
  padding-left: 20px;
`;

const ScenarioItem = styled.div`
  padding: 8px 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  &:hover {
    background: rgba(0, 255, 65, 0.1);
    border-color: #00ff41;
  }

  ${props => props.selected && `
    background: rgba(0, 255, 65, 0.2);
    border-color: #00ff41;
  `}
`;

const ScenarioName = styled.div`
  color: #00ff41;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 3px;
`;

const ScenarioDescription = styled.div`
  color: #888;
  font-size: 0.75rem;
`;

const ScenariosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ScenarioCard = styled(motion.div)`
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ffff;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    transform: translateY(-5px);
  }
`;

const ScenarioCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 15px;
`;

const ScenarioCardTitle = styled.h3`
  color: #00ff41;
  font-size: 1.1rem;
  margin-bottom: 5px;
  flex: 1;
`;

const ScenarioCardCategory = styled.span`
  color: #00ffff;
  font-size: 0.8rem;
  background: rgba(0, 255, 255, 0.1);
  padding: 3px 8px;
  border-radius: 5px;
`;

const ScenarioCardDescription = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const ExecuteButton = styled.button`
  background: linear-gradient(45deg, #00ff41, #00cc33);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: linear-gradient(45deg, #00cc33, #00ff41);
    box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
    transform: translateY(-2px);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const HistorySection = styled.div`
  margin-top: 30px;
  background: rgba(26, 26, 46, 0.8);
  border: 2px solid #00ff41;
  border-radius: 15px;
  padding: 20px;
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const HistoryTitle = styled.h2`
  color: #00ff41;
  font-family: 'Orbitron', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ClearButton = styled.button`
  background: transparent;
  border: 2px solid #ff0040;
  color: #ff0040;
  padding: 8px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Share Tech Mono', monospace;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 0, 64, 0.1);
    transform: translateY(-2px);
  }
`;

const HistoryList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const HistoryItem = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.success ? '#00ff41' : '#ff0040'};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HistoryInfo = styled.div`
  flex: 1;
`;

const HistoryName = styled.div`
  color: ${props => props.success ? '#00ff41' : '#ff0040'};
  font-weight: bold;
  margin-bottom: 5px;
`;

const HistoryTime = styled.div`
  color: #888;
  font-size: 0.8rem;
`;

const HistoryIcon = styled.div`
  font-size: 1.5rem;
  color: ${props => props.success ? '#00ff41' : '#ff0040'};
`;

const ScenarioManager = () => {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const [engine, setEngine] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [executingScenarios, setExecutingScenarios] = useState(new Set());
  const [statistics, setStatistics] = useState({
    total: 0,
    successful: 0,
    failed: 0,
    avgExecutionTime: 0
  });

  useEffect(() => {
    const scenarioEngine = new ScenarioEngine(dispatch);
    setEngine(scenarioEngine);
    
    // Update statistics periodically
    const interval = setInterval(() => {
      if (scenarioEngine) {
        setStatistics(scenarioEngine.getStatistics());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const categories = getCategories();
  const allScenariosList = allScenarios;

  // Filter to ONLY show tutorial scenarios (scenarios with instructions)
  const tutorialScenarios = allScenariosList.filter(scenario => 
    scenario.instructions && Array.isArray(scenario.instructions) && scenario.instructions.length > 0
  );

  // Filter tutorial scenarios based on search and category
  const filteredScenarios = tutorialScenarios.filter(scenario => {
    const matchesSearch = searchQuery === '' || 
      scenario.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      scenario.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleExecuteScenario = async (scenarioId) => {
    if (!engine || executingScenarios.has(scenarioId)) return;

    setExecutingScenarios(prev => new Set(prev).add(scenarioId));

    try {
      await engine.executeScenario(scenarioId);
      setStatistics(engine.getStatistics());
    } catch (error) {
      console.error('Error executing scenario:', error);
    } finally {
      setExecutingScenarios(prev => {
        const newSet = new Set(prev);
        newSet.delete(scenarioId);
        return newSet;
      });
    }
  };

  const handleClearHistory = () => {
    if (engine) {
      engine.clearHistory();
      setStatistics(engine.getStatistics());
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getCategoryScenarios = (category) => {
    return getScenariosByCategory(category);
  };

  const getExecutionHistory = () => {
    return engine ? engine.getExecutionHistory() : [];
  };

  return (
    <ManagerContainer>
      <ManagerHeader>
        <ManagerTitle>Attack Tutorials</ManagerTitle>
        <ManagerSubtitle>
          Learn how to discover, identify, and attack weak devices step-by-step
        </ManagerSubtitle>
      </ManagerHeader>

      <StatsBar>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <StatValue>{tutorialScenarios.length}</StatValue>
          <StatLabel>Available Tutorials</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatValue style={{ color: '#00ff41' }}>{filteredScenarios.length}</StatValue>
          <StatLabel>Tutorials Found</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatValue style={{ color: '#00ffff' }}>Interactive</StatValue>
          <StatLabel>Learning Mode</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatValue>Step-by-Step</StatValue>
          <StatLabel>Guided Tutorials</StatLabel>
        </StatCard>
      </StatsBar>

      <ControlsBar>
        <SearchInput
          type="text"
          placeholder="Search tutorials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterButton
          active={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
        >
          <FaList />
          All Tutorials
        </FilterButton>
        <FilterButton
          active={selectedCategory === 'deviceAttacks'}
          onClick={() => setSelectedCategory('deviceAttacks')}
        >
          <FaFilter />
          Attack Tutorials
        </FilterButton>
      </ControlsBar>

      <ContentGrid>
        <CategoriesSidebar>
          <div style={{ marginBottom: '15px', color: '#00ff41', fontWeight: 'bold', fontSize: '1.1rem' }}>
            📚 Tutorial Categories
          </div>
          <div style={{ 
            background: 'rgba(0, 255, 255, 0.1)', 
            border: '1px solid #00ffff', 
            borderRadius: '8px', 
            padding: '12px', 
            marginBottom: '15px',
            fontSize: '0.9rem',
            color: '#00ffff'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>💡 How to Use:</div>
            <div style={{ lineHeight: '1.6' }}>
              1. Select a tutorial below<br/>
              2. Click "Understand Tutorial"<br/>
              3. Follow step-by-step guide<br/>
              4. Practice in terminals provided
            </div>
          </div>
          {categories.filter(cat => {
            // Only show categories that have tutorial scenarios
            const catScenarios = getCategoryScenarios(cat);
            return catScenarios.some(s => s.instructions && Array.isArray(s.instructions) && s.instructions.length > 0);
          }).map(category => {
            const categoryScenarios = getCategoryScenarios(category).filter(s => 
              s.instructions && Array.isArray(s.instructions) && s.instructions.length > 0
            );
            const isExpanded = expandedCategories[category];
            
            return (
              <div key={category}>
                <CategoryHeader onClick={() => toggleCategory(category)}>
                  <CategoryName>
                    {isExpanded ? <FaFolderOpen /> : <FaFolder />}
                    {category === 'deviceAttacks' ? 'Attack Tutorials' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </CategoryName>
                  <CategoryCount>{categoryScenarios.length}</CategoryCount>
                </CategoryHeader>
                {isExpanded && (
                  <ScenariosList>
                    {categoryScenarios.map(scenario => (
                      <ScenarioItem
                        key={scenario.id}
                        onClick={() => setSelectedCategory(category)}
                      >
                        <ScenarioName>{scenario.name}</ScenarioName>
                        <ScenarioDescription>{scenario.description}</ScenarioDescription>
                      </ScenarioItem>
                    ))}
                  </ScenariosList>
                )}
              </div>
            );
          })}
        </CategoriesSidebar>

        <div>
          {filteredScenarios.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#888'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📚</div>
              <div style={{ fontSize: '1.5rem', color: '#00ff41', marginBottom: '10px' }}>
                No Tutorials Found
              </div>
              <div>
                {searchQuery ? 'Try a different search term' : 'Select a different category'}
              </div>
            </div>
          ) : (
            <ScenariosGrid>
              {filteredScenarios.map((scenario) => {
                const hasInstructions = scenario.instructions && Array.isArray(scenario.instructions) && scenario.instructions.length > 0;
                const isTutorial = scenario.name.toLowerCase().includes('tutorial');
                const isScenario = scenario.name.toLowerCase().includes('scenario');
                
                return (
                <ScenarioCard
                  key={scenario.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    borderColor: isTutorial ? '#00ffff' : '#00ff41'
                  }}
                >
                  <ScenarioCardHeader>
                            <ScenarioCardTitle>
                              {scenario.name}
                              <span style={{
                                marginLeft: '10px',
                                fontSize: '0.8rem',
                                color: '#00ffff',
                                background: 'rgba(0, 255, 255, 0.2)',
                                padding: '3px 8px',
                                borderRadius: '5px'
                              }}>
                                Interactive Tutorial
                              </span>
                            </ScenarioCardTitle>
                    <ScenarioCardCategory style={{
                      background: isTutorial ? 'rgba(0, 255, 255, 0.2)' : 'rgba(0, 255, 65, 0.2)',
                      color: isTutorial ? '#00ffff' : '#00ff41'
                    }}>
                      {scenario.category === 'deviceAttacks' ? 'Attack Tutorial' : scenario.category}
                    </ScenarioCardCategory>
                  </ScenarioCardHeader>
                          <ScenarioCardDescription>{scenario.description}</ScenarioCardDescription>
                          
                          <ExecuteButton
                    onClick={() => {
                      navigate('/tutorial', { state: { scenario } });
                    }}
                    style={{
                      background: 'linear-gradient(45deg, #00ffff, #0099cc)',
                      border: '2px solid #00ffff'
                    }}
                  >
                    <FaBook />
                    Understand Tutorial
                  </ExecuteButton>
                </ScenarioCard>
              );
              })}
            </ScenariosGrid>
          )}
        </div>
      </ContentGrid>

      <HistorySection>
        <HistoryHeader>
          <HistoryTitle>
            <FaBook />
            Learning Guide
          </HistoryTitle>
        </HistoryHeader>
        <div style={{ color: '#ccc', lineHeight: '1.8', padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '10px', fontSize: '1.1rem' }}>
              🎯 How to Use Attack Tutorials:
            </div>
            <div style={{ paddingLeft: '20px' }}>
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#00ffff' }}>1. Browse Tutorials:</strong> Scroll through available attack tutorials
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#00ffff' }}>2. Click "Understand Tutorial":</strong> Opens interactive learning page
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#00ffff' }}>3. Follow Step-by-Step:</strong> Read instructions and practice in terminals
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#00ffff' }}>4. Practice Attacks:</strong> Use the provided terminals to practice commands
              </div>
              <div>
                <strong style={{ color: '#00ffff' }}>5. Mark Steps Complete:</strong> Track your progress as you learn
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(0, 255, 65, 0.1)', border: '1px solid #00ff41', borderRadius: '8px' }}>
            <div style={{ color: '#00ff41', fontWeight: 'bold', marginBottom: '10px' }}>
              💡 Pro Tips:
            </div>
            <div style={{ paddingLeft: '20px' }}>
              <div>• Start with "Tutorial: Scan for Devices" - Learn the basics first</div>
              <div>• Practice on weak devices (Security 1-5) before trying harder targets</div>
              <div>• Use the dual terminals - Your terminal for reconnaissance, Target terminal for attacks</div>
              <div>• Follow the instructions in order - Each step builds on the previous one</div>
            </div>
          </div>
        </div>
      </HistorySection>
    </ManagerContainer>
  );
};

export default ScenarioManager;


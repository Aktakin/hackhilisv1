/**
 * Scenario Engine - Executes scenarios and manages game state
 */

import { allScenarios, getScenarioById } from './scenarioConfig';

class ScenarioEngine {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.executionHistory = [];
    this.isExecuting = false;
  }

  /**
   * Execute a single scenario
   * @param {string} scenarioId - ID of the scenario to execute
   * @returns {Promise<Object>} - Execution result
   */
  async executeScenario(scenarioId) {
    const scenario = getScenarioById(scenarioId);
    
    if (!scenario) {
      throw new Error(`Scenario not found: ${scenarioId}`);
    }

    if (this.isExecuting) {
      throw new Error('Another scenario is currently executing');
    }

    this.isExecuting = true;
    const startTime = Date.now();

    try {
      // Execute all actions in the scenario
      for (const action of scenario.actions) {
        await this.executeAction(action);
        // Small delay between actions for smooth execution
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      const executionTime = Date.now() - startTime;
      const result = {
        success: true,
        scenarioId,
        scenarioName: scenario.name,
        executionTime,
        timestamp: new Date().toISOString()
      };

      this.executionHistory.push(result);
      return result;
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const result = {
        success: false,
        scenarioId,
        scenarioName: scenario.name,
        error: error.message,
        executionTime,
        timestamp: new Date().toISOString()
      };

      this.executionHistory.push(result);
      throw error;
    } finally {
      this.isExecuting = false;
    }
  }

  /**
   * Execute a single action
   * @param {Object} action - Action to execute
   */
  async executeAction(action) {
    if (!this.dispatch) {
      throw new Error('Dispatch function not available');
    }

    // Execute the action through the game context dispatch
    this.dispatch(action);
  }

  /**
   * Execute multiple scenarios in sequence
   * @param {string[]} scenarioIds - Array of scenario IDs to execute
   * @returns {Promise<Object[]>} - Array of execution results
   */
  async executeScenarios(scenarioIds) {
    const results = [];
    
    for (const scenarioId of scenarioIds) {
      try {
        const result = await this.executeScenario(scenarioId);
        results.push(result);
      } catch (error) {
        results.push({
          success: false,
          scenarioId,
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * Get execution history
   * @returns {Object[]} - Array of execution history
   */
  getExecutionHistory() {
    return [...this.executionHistory];
  }

  /**
   * Clear execution history
   */
  clearHistory() {
    this.executionHistory = [];
  }

  /**
   * Get execution statistics
   * @returns {Object} - Statistics about scenario executions
   */
  getStatistics() {
    const total = this.executionHistory.length;
    const successful = this.executionHistory.filter(r => r.success).length;
    const failed = total - successful;
    const avgExecutionTime = total > 0
      ? this.executionHistory.reduce((sum, r) => sum + (r.executionTime || 0), 0) / total
      : 0;

    return {
      total,
      successful,
      failed,
      avgExecutionTime: Math.round(avgExecutionTime)
    };
  }
}

export default ScenarioEngine;




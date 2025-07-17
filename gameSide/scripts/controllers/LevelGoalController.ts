// LevelGoalController.ts
import { 
  _decorator, 
  Component, 
  Node, 
  Collider2D, 
  Contact2DType, 
  director 
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelGoalController')
export class LevelGoalController extends Component {
  @property
  currentLevel: number = 1; // Set this in the inspector for each level
  
  @property
  totalLevels: number = 2; // Update this as you add more levels

  start() {
    const collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    } else {
      console.warn("LevelGoalController: no Collider2D found on goal node");
    }
  }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    console.log(`Begin contact goal:`);
    // Check if player reached the goal
    if (otherCollider.node.name === "Player") {
      console.log(`Level ${this.currentLevel} completed!`);
      this.completeLevel();
    }
  }

  completeLevel() {
    const nextLevel = this.currentLevel + 1;
    
    if (nextLevel <= this.totalLevels) {
      // Load next level
      const nextSceneName = `Level${nextLevel}`;
      console.log(`Loading next level: ${nextSceneName}`);
      director.loadScene(nextSceneName);
    } else {
      // All levels completed - return to main menu or show completion screen
      console.log("All levels completed! Returning to main menu.");
      director.loadScene("MainMenu");
    }
  }
}
// File: assets/scripts/managers/GameManager.ts
import { 
  _decorator, 
  Component, 
  Node, 
  director,
  game
} from 'cc';
import { ScoreManager } from './ScoreManager';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
  @property(Node)
  public gameOverPanel: Node = null!;
  
  public static instance: GameManager;
  private currentSceneName: string = '';

  onLoad() {
    // Set up singleton access
    GameManager.instance = this;
    this.currentSceneName = director.getScene()?.name || '';
    
    // Make sure game over panel is hidden at start
    if (this.gameOverPanel) {
      this.gameOverPanel.active = false;
    }
  }

  public gameOver() {
    console.log("Game Over triggered!");
    
    // Pause the game
    game.pause();
    
    // Show game over panel
    if (this.gameOverPanel) {
      this.gameOverPanel.active = true;
    }
  }

  public restartLevel() {
    console.log("Restarting level...");
    
    // Resume game before loading scene
    game.resume();
    
    // Reload current scene
    director.loadScene(this.currentSceneName);
  }

  public goToMainMenu() {
    console.log("Going to main menu...");
    
    // Resume game before loading scene
    game.resume();
    
    // Load main menu scene
    director.loadScene("MainMenu");
  }
}
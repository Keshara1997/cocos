// File: assets/scripts/ui/GameOverUI.ts
import { 
  _decorator, 
  Component, 
  Label, 
  Button 
} from 'cc';
import { GameManager } from '../managers/GameManager';
import { ScoreManager } from '../managers/ScoreManager';

const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {
  @property(Label)
  public finalScoreLabel: Label = null!;
  
  @property(Button)
  public restartButton: Button = null!;
  
  @property(Button)
  public mainMenuButton: Button = null!;

  onLoad() {
    // Set up button events
    if (this.restartButton) {
      this.restartButton.node.on('click', this.onRestartClicked, this);
    }
    
    if (this.mainMenuButton) {
      this.mainMenuButton.node.on('click', this.onMainMenuClicked, this);
    }
  }

  onEnable() {
    // Update the final score when panel becomes active
    this.updateFinalScore();
  }

  private updateFinalScore() {
    if (this.finalScoreLabel && ScoreManager.instance) {
      const finalScore = ScoreManager.instance.getScore();
      this.finalScoreLabel.string = `Final Score: ${finalScore}`;
    }
  }

  private onRestartClicked() {
    console.log("Restart button clicked");
    GameManager.instance?.restartLevel();
  }

  private onMainMenuClicked() {
    console.log("Main menu button clicked");
    GameManager.instance?.goToMainMenu();
  }
}
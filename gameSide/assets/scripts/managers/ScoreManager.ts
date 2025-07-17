// File: assets/scripts/managers/ScoreManager.ts (Updated)
import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {
  @property(Label)
  public scoreLabel: Label = null!;

  private score = 0;
  public static instance: ScoreManager;

  onLoad() {
    // Set up singleton access
    ScoreManager.instance = this;
    this.updateLabel();
  }

  public addScore(points: number) {
    this.score += points;
    this.updateLabel();
  }

  public getScore(): number {
    return this.score;
  }

  public resetScore() {
    this.score = 0;
    this.updateLabel();
  }

  private updateLabel() {
    this.scoreLabel.string = `Score: ${this.score}`;
  }
}
// File: assets/scripts/controllers/HazardController.ts
import { 
  _decorator, 
  Component, 
  Collider2D, 
  Contact2DType 
} from 'cc';
import { GameManager } from '../managers/GameManager';

const { ccclass, property } = _decorator;

@ccclass('HazardController')
export class HazardController extends Component {
  start() {
    const collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    } else {
      console.warn("HazardController: no Collider2D found on hazard node");
    }
  }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    // Check if player touched the hazard
    if (otherCollider.node.name === "Player") {
      console.log("Player touched hazard - Game Over!");
      // Trigger game over through GameManager
      GameManager.instance?.gameOver();
    }
  }
}
// File: assets/scripts/controllers/JumperController.ts
import {
  _decorator,
  Component,
  Node,
  Animation,
  Collider2D,
  Contact2DType,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("JumperController")
export class JumperController extends Component {
  @property(Animation)
  animationComponent: Animation = null!;

  @property
  jumpBoostForce: number = 3000; // Higher than normal jump force

  start() {
    const collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    } else {
      console.warn("JumperController: no Collider2D found on node");
    }
  }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    // Check if the player landed on the jumper
    if (otherCollider.node.name === "Player") {
      console.log("Player landed on jumper!");
      
      // Play jumper animation
      this.playJumperAnimation();
      
      // Get the PlayerController component from the player
      const playerController = otherCollider.node.getComponent("PlayerController") as any;
      if (playerController && playerController.jumperBoost) {
        // Call the jumper boost method
        playerController.jumperBoost(this.jumpBoostForce);
      }
    }
  }

  private playJumperAnimation() {
    if (this.animationComponent) {
      this.animationComponent.play("jumper");
    }
  }
}
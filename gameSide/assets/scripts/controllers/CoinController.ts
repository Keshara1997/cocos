// File: assets/scripts/controllers/CoinController.ts
import { _decorator, Component, Node, Collider2D, Contact2DType } from "cc";
import { ScoreManager } from "../managers/ScoreManager";
const { ccclass, property } = _decorator;

@ccclass("CoinController")
export class CoinController extends Component {
    @property
    scoreValue: number = 1; // How many points this coin gives

    start() {
      console.log("CoinController: start");
        const collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        } else {
            console.warn("CoinController: no Collider2D found on coin");
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
        console.log(`Coin contact123: ${otherCollider.group}`);
        // Check if player touched the coin (assuming player is in group 2 or has specific tag)
        if (otherCollider.group === 4) { // Assuming OBJECT group is 2
            this.collectCoin();
        }
    }

    private collectCoin() {
        console.log("Coin collected!");
        
        // Add score
        const scoreManager = ScoreManager.instance;
        if (scoreManager) {
            scoreManager.addScore(this.scoreValue);
        }

        // Optional: Play collection sound/effect here
        
        // Destroy the coin
        this.node.destroy();
    }
}
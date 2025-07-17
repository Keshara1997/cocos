import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BombController')
export class BombController extends Component {
    @property
    explosionDelay: number = 2.5; // Time in seconds before bomb explodes and gets destroyed

    start() {
        // Schedule the bomb to explode and be destroyed after the specified delay
        this.scheduleOnce(this.explodeAndDestroy, this.explosionDelay);
    }

    update(deltaTime: number) {
        // You can add any per-frame logic here if needed
    }

    explodeAndDestroy() {
        // You can add explosion logic here (play explosion animation, spawn particles, etc.)
        console.log("Bomb exploded!");
        // Destroy the bomb node
        this.RemoveNode();
    }

    RemoveNode() {
        // This method is called to remove the bomb node from the scene
        console.log("Removing bomb node");
        this.node.destroy();
    }
}
import { _decorator, Collider2D, Component, Node, RigidBody2D, ERigidBody2DType, Vec2, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BombExplosion')
export class BombExplosion extends Component {



    @property(Node)
    Bomb_Root: Node | null = null;

    start() {
         const collider = this.getComponent(Collider2D);
        if (collider) {
              collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
              collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            } else {
              console.warn("PlayerController: no Collider2D found on node");
            }

    }

    update(deltaTime: number) {
        
    }



      // Collision detection for ground
      onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {

        if (otherCollider.body.type === ERigidBody2DType.Dynamic && otherCollider.node !== this.Bomb_Root ) {

            let otherPosition= otherCollider.node.getPosition();// Get the position of the other collider node
            let selfPosition = this.Bomb_Root.getPosition();// Get the position of the bomb explosion root(bomb position) node

            let forceVector = otherPosition.subtract(selfPosition).normalize().multiplyScalar(1000); // Calculate force vector away from explosion center

            forceVector = forceVector.normalize(); // Normalize the force vector

            forceVector = forceVector.multiplyScalar(1000); // Scale the force vector to desired strength

            // Convert Vec3 to Vec2 for applyForceToCenter
            const forceVector2D = new Vec2(forceVector.x, forceVector.y);

            otherCollider.body.applyForceToCenter(forceVector2D, true); // Apply force to the other collider's rigid body

          
        }
      }
    

      private onEndContact(
          selfCollider: Collider2D,
          otherCollider: Collider2D,
          contact: IPhysics2DContact
        ) {

         
        }
}



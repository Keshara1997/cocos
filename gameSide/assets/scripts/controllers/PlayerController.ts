// File: assets/scripts/controllers/PlayerController.ts
import {
  _decorator,
  Component,
  Node,
  RigidBody2D,
  input,
  Input,
  EventKeyboard,
  KeyCode,
  Vec2,
  Animation,
  Collider2D,
  Contact2DType,
  IPhysics2DContact,
  Prefab,
  instantiate,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  @property(RigidBody2D)
  rigidBody: RigidBody2D = null!;

  @property(Animation)
  animationComponent: Animation = null!;

  @property(Prefab)
  Bomb_Prefab: Prefab = null!;

  @property
  moveSpeed: number = 2;

  @property
  jumpForce: number = 2000;

  @property
  superJumpMultiplier: number = 1.5; // Multiplier for enhanced jump on jumper

  private isGrounded: boolean = false;
  private moveDirection: number = 0;
  private facingDirection: number = 1;
  private isOnJumper: boolean = false; // Track if player is on a jumper

  start() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    const collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    } else {
      console.warn("PlayerController: no Collider2D found on node");
    }
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
      case KeyCode.ARROW_LEFT:
        this.moveDirection = -1;
        this.facingDirection = -1;
        this.animationComponent.play("player_run");
        break;
      case KeyCode.KEY_D:
      case KeyCode.ARROW_RIGHT:
        this.moveDirection = 1;
        this.facingDirection = 1;
        this.playAnimation("player_run");
        break;
      case KeyCode.KEY_W:
        if (this.isGrounded) {
          console.log("Jump key pressed");
          console.log("isGrounded:", this.isGrounded);
          this.jump();
        }
        break;
      case KeyCode.SPACE:
        this.throwBomb();
        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    console.log(`Key released: ${event.keyCode}`);
    if (
      event.keyCode === KeyCode.KEY_A ||
      event.keyCode === KeyCode.ARROW_LEFT ||
      event.keyCode === KeyCode.KEY_D ||
      event.keyCode === KeyCode.ARROW_RIGHT
    ) {
      this.moveDirection = 0;
      this.playAnimation("player_idle");
      const vel = this.rigidBody.linearVelocity;
      vel.x = 0;
      this.rigidBody.linearVelocity = vel;
    }
  }

  update(deltaTime: number) {
    const vel = this.rigidBody.linearVelocity;
    if (this.moveDirection !== 0) {
      vel.x = this.moveDirection * this.moveSpeed;
      this.rigidBody.linearVelocity = vel;
      this.node.setScale(this.facingDirection, 1);
    } else {
      if (vel.x !== 0) {
        vel.x = 0;
        this.rigidBody.linearVelocity = vel;
      }
    }
  }

  jump() {
    let jumpPower = this.jumpForce;
    
    // If player is on a jumper and manually jumps, give extra boost
    if (this.isOnJumper) {
      jumpPower = this.jumpForce * this.superJumpMultiplier;
      console.log("Super jump activated! Jump power:", jumpPower);
    }
    
    this.rigidBody.applyLinearImpulseToCenter(
      new Vec2(0, jumpPower),
      true
    );
    this.playAnimation("player_jump");
    this.isGrounded = false;
    this.isOnJumper = false; // Reset jumper state after using it
  }

  // Method called by JumperController when player lands on jumper
  jumperBoost(boostForce: number) {
    console.log("Jumper boost applied! Force:", boostForce);
    
    // Apply the jumper boost force
    this.rigidBody.applyLinearImpulseToCenter(
      new Vec2(0, boostForce),
      true
    );
    
    this.playAnimation("player_jump");
    this.isGrounded = false;
    this.isOnJumper = false; // Reset since we just used the jumper
  }

  throwBomb() {
    this.playAnimation("player_throwBomb");
    const bomb = instantiate(this.Bomb_Prefab);
    bomb.parent = this.node.parent;
    const pos = this.node.getPosition();
    pos.x += 30 * this.facingDirection;
    pos.y += 10;
    bomb.setPosition(pos);

    const bombRigidBody = bomb.getComponent(RigidBody2D);
    if (bombRigidBody) {
      const impulseX = 10 * this.facingDirection;
      const impulseY = 5;
      bombRigidBody.applyLinearImpulseToCenter(
        new Vec2(impulseX, impulseY),
        true
      );
    }
  }

  playAnimation(animName: string) {
    if (this.animationComponent) {
      this.animationComponent.play(animName);
    }
  }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D) {
    console.log(
      `Begin contact:1234 ${selfCollider.node.name} ↔ ${otherCollider.group}`
    );
    
    // Ground detection
    if (otherCollider.group === 2) {
      console.log("Ground contact detected");
      this.isGrounded = true;
      console.log("isGrounded:", this.isGrounded);
      if (this.moveDirection === 0) {
        this.playAnimation("player_idle");
      }
    }
    
    // Jumper detection
    if (otherCollider.group === 32) {
      console.log("Jumper contact detected");
      this.isGrounded = true;
      this.isOnJumper = true;
      console.log("isOnJumper:", this.isOnJumper);
    }
    
    // Note: Coin collection is now handled by CoinController
    // This keeps the code cleaner and more modular
  }

  private onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact
  ) {
    if (otherCollider.group === 2) {
      this.isGrounded = false;
      console.log("Left ground, isGrounded:", this.isGrounded);
    }
    
    if (otherCollider.group === 10) {
      // Don't immediately set isOnJumper to false here
      // Let the jump methods handle the reset
      console.log("Left jumper contact");
    }
  }
}
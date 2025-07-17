System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, RigidBody2D, input, Input, KeyCode, Vec2, Animation, Collider2D, Contact2DType, Prefab, instantiate, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, PlayerController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      RigidBody2D = _cc.RigidBody2D;
      input = _cc.input;
      Input = _cc.Input;
      KeyCode = _cc.KeyCode;
      Vec2 = _cc.Vec2;
      Animation = _cc.Animation;
      Collider2D = _cc.Collider2D;
      Contact2DType = _cc.Contact2DType;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "38e66tQWhRJwYpe9q7TsaMK", "PlayerController", undefined); // File: assets/scripts/controllers/PlayerController.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'RigidBody2D', 'input', 'Input', 'EventKeyboard', 'KeyCode', 'Vec2', 'Animation', 'Collider2D', 'Contact2DType', 'IPhysics2DContact', 'Prefab', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlayerController", PlayerController = (_dec = ccclass("PlayerController"), _dec2 = property(RigidBody2D), _dec3 = property(Animation), _dec4 = property(Prefab), _dec(_class = (_class2 = class PlayerController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "rigidBody", _descriptor, this);

          _initializerDefineProperty(this, "animationComponent", _descriptor2, this);

          _initializerDefineProperty(this, "Bomb_Prefab", _descriptor3, this);

          _initializerDefineProperty(this, "moveSpeed", _descriptor4, this);

          _initializerDefineProperty(this, "jumpForce", _descriptor5, this);

          _initializerDefineProperty(this, "superJumpMultiplier", _descriptor6, this);

          // Multiplier for enhanced jump on jumper
          this.isGrounded = false;
          this.moveDirection = 0;
          this.facingDirection = 1;
          this.isOnJumper = false;
        }

        // Track if player is on a jumper
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

        onKeyDown(event) {
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

        onKeyUp(event) {
          console.log(`Key released: ${event.keyCode}`);

          if (event.keyCode === KeyCode.KEY_A || event.keyCode === KeyCode.ARROW_LEFT || event.keyCode === KeyCode.KEY_D || event.keyCode === KeyCode.ARROW_RIGHT) {
            this.moveDirection = 0;
            this.playAnimation("player_idle");
            const vel = this.rigidBody.linearVelocity;
            vel.x = 0;
            this.rigidBody.linearVelocity = vel;
          }
        }

        update(deltaTime) {
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
          let jumpPower = this.jumpForce; // If player is on a jumper and manually jumps, give extra boost

          if (this.isOnJumper) {
            jumpPower = this.jumpForce * this.superJumpMultiplier;
            console.log("Super jump activated! Jump power:", jumpPower);
          }

          this.rigidBody.applyLinearImpulseToCenter(new Vec2(0, jumpPower), true);
          this.playAnimation("player_jump");
          this.isGrounded = false;
          this.isOnJumper = false; // Reset jumper state after using it
        } // Method called by JumperController when player lands on jumper


        jumperBoost(boostForce) {
          console.log("Jumper boost applied! Force:", boostForce); // Apply the jumper boost force

          this.rigidBody.applyLinearImpulseToCenter(new Vec2(0, boostForce), true);
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
            bombRigidBody.applyLinearImpulseToCenter(new Vec2(impulseX, impulseY), true);
          }
        }

        playAnimation(animName) {
          if (this.animationComponent) {
            this.animationComponent.play(animName);
          }
        }

        onBeginContact(selfCollider, otherCollider) {
          console.log(`Begin contact:1234 ${selfCollider.node.name} ↔ ${otherCollider.group}`); // Ground detection

          if (otherCollider.group === 2) {
            console.log("Ground contact detected");
            this.isGrounded = true;
            console.log("isGrounded:", this.isGrounded);

            if (this.moveDirection === 0) {
              this.playAnimation("player_idle");
            }
          } // Jumper detection


          if (otherCollider.group === 32) {
            console.log("Jumper contact detected");
            this.isGrounded = true;
            this.isOnJumper = true;
            console.log("isOnJumper:", this.isOnJumper);
          } // Note: Coin collection is now handled by CoinController
          // This keeps the code cleaner and more modular

        }

        onEndContact(selfCollider, otherCollider, contact) {
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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rigidBody", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "animationComponent", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "Bomb_Prefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "jumpForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2000;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "superJumpMultiplier", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.5;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=41eb5e40ddec18527e423b09c58ed0432a95e811.js.map
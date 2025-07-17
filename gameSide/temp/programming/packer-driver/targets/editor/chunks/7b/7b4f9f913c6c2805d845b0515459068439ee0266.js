System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Animation, Collider2D, Contact2DType, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, JumperController;

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
      Animation = _cc.Animation;
      Collider2D = _cc.Collider2D;
      Contact2DType = _cc.Contact2DType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "83839P96Z5M2pVckJBculdl", "JumperController", undefined); // File: assets/scripts/controllers/JumperController.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Animation', 'Collider2D', 'Contact2DType']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("JumperController", JumperController = (_dec = ccclass("JumperController"), _dec2 = property(Animation), _dec(_class = (_class2 = class JumperController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "animationComponent", _descriptor, this);

          _initializerDefineProperty(this, "jumpBoostForce", _descriptor2, this);
        }

        // Higher than normal jump force
        start() {
          const collider = this.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          } else {
            console.warn("JumperController: no Collider2D found on node");
          }
        }

        onBeginContact(selfCollider, otherCollider) {
          // Check if the player landed on the jumper
          if (otherCollider.node.name === "Player") {
            console.log("Player landed on jumper!"); // Play jumper animation

            this.playJumperAnimation(); // Get the PlayerController component from the player

            const playerController = otherCollider.node.getComponent("PlayerController");

            if (playerController && playerController.jumperBoost) {
              // Call the jumper boost method
              playerController.jumperBoost(this.jumpBoostForce);
            }
          }
        }

        playJumperAnimation() {
          if (this.animationComponent) {
            this.animationComponent.play("jumper");
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "animationComponent", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "jumpBoostForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3000;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7b4f9f913c6c2805d845b0515459068439ee0266.js.map
System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Collider2D, Component, Node, ERigidBody2DType, Vec2, Contact2DType, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, BombExplosion;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Collider2D = _cc.Collider2D;
      Component = _cc.Component;
      Node = _cc.Node;
      ERigidBody2DType = _cc.ERigidBody2DType;
      Vec2 = _cc.Vec2;
      Contact2DType = _cc.Contact2DType;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "cca38oOrOtFMYb5r04uHGTx", "BombExplosion", undefined);

      __checkObsolete__(['_decorator', 'Collider2D', 'Component', 'Node', 'RigidBody2D', 'ERigidBody2DType', 'Vec2', 'Contact2DType', 'IPhysics2DContact']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BombExplosion", BombExplosion = (_dec = ccclass('BombExplosion'), _dec2 = property(Node), _dec(_class = (_class2 = class BombExplosion extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "Bomb_Root", _descriptor, this);
        }

        start() {
          var collider = this.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          } else {
            console.warn("PlayerController: no Collider2D found on node");
          }
        }

        update(deltaTime) {} // Collision detection for ground


        onBeginContact(selfCollider, otherCollider) {
          if (otherCollider.body.type === ERigidBody2DType.Dynamic && otherCollider.node !== this.Bomb_Root) {
            var otherPosition = otherCollider.node.getPosition(); // Get the position of the other collider node

            var selfPosition = this.Bomb_Root.getPosition(); // Get the position of the bomb explosion root(bomb position) node

            var forceVector = otherPosition.subtract(selfPosition).normalize().multiplyScalar(1000); // Calculate force vector away from explosion center

            forceVector = forceVector.normalize(); // Normalize the force vector

            forceVector = forceVector.multiplyScalar(1000); // Scale the force vector to desired strength
            // Convert Vec3 to Vec2 for applyForceToCenter

            var forceVector2D = new Vec2(forceVector.x, forceVector.y);
            otherCollider.body.applyForceToCenter(forceVector2D, true); // Apply force to the other collider's rigid body
          }
        }

        onEndContact(selfCollider, otherCollider, contact) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Bomb_Root", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b44e6b10a3b5e9baa086e904c271003774f0128a.js.map
System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _class2, _descriptor, _crd, ccclass, property, BombController;

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d2cd8tHwedGS6Vja+43r/Lp", "BombController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BombController", BombController = (_dec = ccclass('BombController'), _dec(_class = (_class2 = class BombController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "explosionDelay", _descriptor, this);
        }

        // Time in seconds before bomb explodes and gets destroyed
        start() {
          // Schedule the bomb to explode and be destroyed after the specified delay
          this.scheduleOnce(this.explodeAndDestroy, this.explosionDelay);
        }

        update(deltaTime) {// You can add any per-frame logic here if needed
        }

        explodeAndDestroy() {
          // You can add explosion logic here (play explosion animation, spawn particles, etc.)
          console.log("Bomb exploded!"); // Destroy the bomb node

          this.RemoveNode();
        }

        RemoveNode() {
          // This method is called to remove the bomb node from the scene
          console.log("Removing bomb node");
          this.node.destroy();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "explosionDelay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 2.5;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e356b5fc7ef271b845ec02c60c761ca4cefb99c8.js.map
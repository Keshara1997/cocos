System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Collider2D, Contact2DType, ScoreManager, _dec, _class, _class2, _descriptor, _crd, ccclass, property, CoinController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfScoreManager(extras) {
    _reporterNs.report("ScoreManager", "../managers/ScoreManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Collider2D = _cc.Collider2D;
      Contact2DType = _cc.Contact2DType;
    }, function (_unresolved_2) {
      ScoreManager = _unresolved_2.ScoreManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0fa00dR0lVLnKUbj8iWzcYV", "CoinController", undefined); // File: assets/scripts/controllers/CoinController.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Collider2D', 'Contact2DType']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("CoinController", CoinController = (_dec = ccclass("CoinController"), _dec(_class = (_class2 = class CoinController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "scoreValue", _descriptor, this);
        }

        // How many points this coin gives
        start() {
          console.log("CoinController: start");
          var collider = this.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          } else {
            console.warn("CoinController: no Collider2D found on coin");
          }
        }

        onBeginContact(selfCollider, otherCollider) {
          console.log("Coin contact123: " + otherCollider.group); // Check if player touched the coin (assuming player is in group 2 or has specific tag)

          if (otherCollider.group === 4) {
            // Assuming OBJECT group is 2
            this.collectCoin();
          }
        }

        collectCoin() {
          console.log("Coin collected!"); // Add score

          var scoreManager = (_crd && ScoreManager === void 0 ? (_reportPossibleCrUseOfScoreManager({
            error: Error()
          }), ScoreManager) : ScoreManager).instance;

          if (scoreManager) {
            scoreManager.addScore(this.scoreValue);
          } // Optional: Play collection sound/effect here
          // Destroy the coin


          this.node.destroy();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scoreValue", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=461ecedf48b62c094ec15d39807e943b740e8f2f.js.map
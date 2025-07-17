System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Collider2D, Contact2DType, director, _dec, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, LevelGoalController;

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
      Collider2D = _cc.Collider2D;
      Contact2DType = _cc.Contact2DType;
      director = _cc.director;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "322acC7bF5OU6sz4Y6Fx9/e", "LevelGoalController", undefined); // LevelGoalController.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Collider2D', 'Contact2DType', 'director']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("LevelGoalController", LevelGoalController = (_dec = ccclass('LevelGoalController'), _dec(_class = (_class2 = class LevelGoalController extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "currentLevel", _descriptor, this);

          // Set this in the inspector for each level
          _initializerDefineProperty(this, "totalLevels", _descriptor2, this);
        }

        // Update this as you add more levels
        start() {
          var collider = this.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          } else {
            console.warn("LevelGoalController: no Collider2D found on goal node");
          }
        }

        onBeginContact(selfCollider, otherCollider) {
          console.log("Begin contact goal:"); // Check if player reached the goal

          if (otherCollider.node.name === "Player") {
            console.log("Level " + this.currentLevel + " completed!");
            this.completeLevel();
          }
        }

        completeLevel() {
          var nextLevel = this.currentLevel + 1;

          if (nextLevel <= this.totalLevels) {
            // Load next level
            var nextSceneName = "Level" + nextLevel;
            console.log("Loading next level: " + nextSceneName);
            director.loadScene(nextSceneName);
          } else {
            // All levels completed - return to main menu or show completion screen
            console.log("All levels completed! Returning to main menu.");
            director.loadScene("MainMenu");
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentLevel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "totalLevels", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8bc0a634a89751a30392bbc8da87e4cda61174b3.js.map
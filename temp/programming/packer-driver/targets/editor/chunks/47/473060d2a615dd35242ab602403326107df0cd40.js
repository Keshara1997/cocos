System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Button, GameManager, ScoreManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, GameOverUI;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfGameManager(extras) {
    _reporterNs.report("GameManager", "../managers/GameManager", _context.meta, extras);
  }

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
      Label = _cc.Label;
      Button = _cc.Button;
    }, function (_unresolved_2) {
      GameManager = _unresolved_2.GameManager;
    }, function (_unresolved_3) {
      ScoreManager = _unresolved_3.ScoreManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "85a556ikwZI2oiIRqeXjW8/", "GameOverUI", undefined); // File: assets/scripts/ui/GameOverUI.ts


      __checkObsolete__(['_decorator', 'Component', 'Label', 'Button']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameOverUI", GameOverUI = (_dec = ccclass('GameOverUI'), _dec2 = property(Label), _dec3 = property(Button), _dec4 = property(Button), _dec(_class = (_class2 = class GameOverUI extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "finalScoreLabel", _descriptor, this);

          _initializerDefineProperty(this, "restartButton", _descriptor2, this);

          _initializerDefineProperty(this, "mainMenuButton", _descriptor3, this);
        }

        onLoad() {
          // Set up button events
          if (this.restartButton) {
            this.restartButton.node.on('click', this.onRestartClicked, this);
          }

          if (this.mainMenuButton) {
            this.mainMenuButton.node.on('click', this.onMainMenuClicked, this);
          }
        }

        onEnable() {
          // Update the final score when panel becomes active
          this.updateFinalScore();
        }

        updateFinalScore() {
          if (this.finalScoreLabel && (_crd && ScoreManager === void 0 ? (_reportPossibleCrUseOfScoreManager({
            error: Error()
          }), ScoreManager) : ScoreManager).instance) {
            const finalScore = (_crd && ScoreManager === void 0 ? (_reportPossibleCrUseOfScoreManager({
              error: Error()
            }), ScoreManager) : ScoreManager).instance.getScore();
            this.finalScoreLabel.string = `Final Score: ${finalScore}`;
          }
        }

        onRestartClicked() {
          var _instance;

          console.log("Restart button clicked");
          (_instance = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).instance) == null || _instance.restartLevel();
        }

        onMainMenuClicked() {
          var _instance2;

          console.log("Main menu button clicked");
          (_instance2 = (_crd && GameManager === void 0 ? (_reportPossibleCrUseOfGameManager({
            error: Error()
          }), GameManager) : GameManager).instance) == null || _instance2.goToMainMenu();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "finalScoreLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "restartButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mainMenuButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=473060d2a615dd35242ab602403326107df0cd40.js.map
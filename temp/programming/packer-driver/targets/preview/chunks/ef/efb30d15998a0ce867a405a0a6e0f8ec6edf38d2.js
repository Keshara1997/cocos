System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, director, game, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, GameManager;

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
      Node = _cc.Node;
      director = _cc.director;
      game = _cc.game;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a552dwTC2hMJ79A0jtrYXlY", "GameManager", undefined); // File: assets/scripts/managers/GameManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'director', 'game']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Node), _dec(_class = (_class2 = (_class3 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "gameOverPanel", _descriptor, this);

          this.currentSceneName = '';
        }

        onLoad() {
          var _director$getScene;

          // Set up singleton access
          GameManager.instance = this;
          this.currentSceneName = ((_director$getScene = director.getScene()) == null ? void 0 : _director$getScene.name) || ''; // Make sure game over panel is hidden at start

          if (this.gameOverPanel) {
            this.gameOverPanel.active = false;
          }
        }

        gameOver() {
          console.log("Game Over triggered!"); // Pause the game

          game.pause(); // Show game over panel

          if (this.gameOverPanel) {
            this.gameOverPanel.active = true;
          }
        }

        restartLevel() {
          console.log("Restarting level..."); // Resume game before loading scene

          game.resume(); // Reload current scene

          director.loadScene(this.currentSceneName);
        }

        goToMainMenu() {
          console.log("Going to main menu..."); // Resume game before loading scene

          game.resume(); // Load main menu scene

          director.loadScene("MainMenu");
        }

      }, _class3.instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gameOverPanel", [_dec2], {
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
//# sourceMappingURL=efb30d15998a0ce867a405a0a6e0f8ec6edf38d2.js.map
System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, director, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, MainMenu;

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "66f797/V/VMbIo4C58/fIBc", "MainMenu", undefined); // MainMenu.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'director']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MainMenu", MainMenu = (_dec = ccclass('MainMenu'), _dec2 = property(Node), _dec(_class = (_class2 = class MainMenu extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "buttonsContainer", _descriptor, this);
        }

        // drag ButtonContainer here
        onLoad() {
          this.buttonsContainer.children.forEach(btnNode => {
            btnNode.on('click', () => {
              // Extract level number from button name
              // e.g. btnNode.name = "Btn_Level1" → sceneName = "Level1"
              // e.g. btnNode.name = "Btn_Level2" → sceneName = "Level2"
              var buttonName = btnNode.name;
              var levelMatch = buttonName.match(/Level(\d+)/);

              if (levelMatch) {
                var levelNumber = levelMatch[1];
                var sceneName = "Level" + levelNumber;
                console.log("Loading scene: " + sceneName);
                director.loadScene(sceneName);
              } else {
                console.warn("Could not extract level from button name: " + buttonName);
              }
            });
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "buttonsContainer", [_dec2], {
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
//# sourceMappingURL=69aa7b683d0b8350ae05c024b2bd5e62b9dade89.js.map
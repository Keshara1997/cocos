System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, EditBox, Node, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, loginScearnMgr;

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
      director = _cc.director;
      EditBox = _cc.EditBox;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9e6e1VpvbJBdLUGYSEUubU3", "loginScearnMgr", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'EditBox', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("loginScearnMgr", loginScearnMgr = (_dec = ccclass('loginScearnMgr'), _dec2 = property(Node), _dec(_class = (_class2 = class loginScearnMgr extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "my_EditBox", _descriptor, this);
        }

        start() {
          globalThis.eventTarget.on("login_success", this.onLoginSuccess, this);
        }

        update(deltaTime) {}

        onClickLogin() {
          var str = this.my_EditBox.getComponent(EditBox).string;
          console.log(typeof str);
          console.log("onClickLogin", str);

          globalThis._loginScearnMgr._sendMessage("login", {
            userId: str
          });
        }

        onLoginSuccess(data) {
          console.log("onLoginSuccess", data);

          if (data.success && data.user) {
            globalThis._userInfo.userId = data.user.userId;
            globalThis._userInfo.userName = data.user.userName;
            globalThis._userInfo.userHeadUrl = data.user.userHeadUrl;
            globalThis._userInfo.userRoomCards = data.user.userRoomCards;
            director.loadScene("HallScene");
          } else {
            console.error("Login999 failed:", data.message || "Unknown error"); // You might want to show an error message to the user here
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "my_EditBox", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2ca8c98d475303ce200dacfa9d155f3b8a7c8cff.js.map
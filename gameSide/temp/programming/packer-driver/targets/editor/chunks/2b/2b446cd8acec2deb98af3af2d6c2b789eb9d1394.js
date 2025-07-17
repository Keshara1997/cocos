System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, EditBox, Node, WebSocketManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, signUp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfWebSocketManager(extras) {
    _reporterNs.report("WebSocketManager", "./webSocket/WebSocketManager", _context.meta, extras);
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
      director = _cc.director;
      EditBox = _cc.EditBox;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      WebSocketManager = _unresolved_2.WebSocketManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "67878h+sJpJ15ZOo8a51UJm", "signUp", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'EditBox', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("signUp", signUp = (_dec = ccclass('signUp'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class signUp extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "signUp_UserName_EditBox", _descriptor, this);

          _initializerDefineProperty(this, "signUp_Password_EditBox", _descriptor2, this);

          _initializerDefineProperty(this, "signUp_Name_EditBox", _descriptor3, this);

          this._webSocketManager = null;
        }

        start() {
          console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
          this._webSocketManager = (_crd && WebSocketManager === void 0 ? (_reportPossibleCrUseOfWebSocketManager({
            error: Error()
          }), WebSocketManager) : WebSocketManager).getInstance();

          this._webSocketManager.connectToServer();

          this._webSocketManager.eventTarget.on("signUpResponse", this.onSignUpSuccess, this);

          console.log(`signUp start`);
        }

        update(deltaTime) {}

        onClickBackToLogin() {
          console.log("onClickBackToLogin");
          director.loadScene("LoginScene");
        }

        onClickSignUp() {
          console.log("onClickSignUp");
          let userName = this.signUp_UserName_EditBox.getComponent(EditBox).string;
          let password = this.signUp_Password_EditBox.getComponent(EditBox).string;
          let name = this.signUp_Name_EditBox.getComponent(EditBox).string;
          console.log("onClickSignUp", userName, password, name);

          if (this._webSocketManager && this._webSocketManager.isConnected()) {
            this._webSocketManager.sendMessage("signUp", {
              userName: userName,
              password: password,
              name: name
            });
          } else {
            console.error("WebSocket is not connected. Cannot send signUp message."); // Try to reconnect

            this._webSocketManager.connectToServer();
          }
        }

        onSignUpSuccess(data) {
          console.log("onSignUpSuccess+++++++++++++++++++", data);
          console.log('************signUp success************');

          if (data.success) {
            director.loadScene("Level1");
          } else {
            console.error("SignUp failed:", data.message || "Unknown error");
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "signUp_UserName_EditBox", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "signUp_Password_EditBox", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "signUp_Name_EditBox", [_dec4], {
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
//# sourceMappingURL=2b446cd8acec2deb98af3af2d6c2b789eb9d1394.js.map
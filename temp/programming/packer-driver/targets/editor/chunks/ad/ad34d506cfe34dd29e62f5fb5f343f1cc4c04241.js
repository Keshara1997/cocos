System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, EditBox, Node, WebSocketManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, loginScearnMgr;

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

      _cclegacy._RF.push({}, "9e6e1VpvbJBdLUGYSEUubU3", "loginScearnMgr", undefined);

      __checkObsolete__(['_decorator', 'Component', 'director', 'EditBox', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("loginScearnMgr", loginScearnMgr = (_dec = ccclass('loginScearnMgr'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = class loginScearnMgr extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "my_EditBox", _descriptor, this);

          _initializerDefineProperty(this, "my_EditBox2", _descriptor2, this);

          this._webSocketManager = null;
        }

        start() {
          console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"); // Initialize WebSocketManager and connect to server

          this._webSocketManager = (_crd && WebSocketManager === void 0 ? (_reportPossibleCrUseOfWebSocketManager({
            error: Error()
          }), WebSocketManager) : WebSocketManager).getInstance();

          this._webSocketManager.connectToServer(); // Listen for login response events


          this._webSocketManager.eventTarget.on("loginResponse", this.onLoginSuccess, this);
        }

        update(deltaTime) {}

        onClickSignUp() {
          console.log("onClickSignUp55");
          director.loadScene("SignUp");
        }

        onClickLogin() {
          let userName = this.my_EditBox.getComponent(EditBox).string;
          let password = this.my_EditBox2.getComponent(EditBox).string;
          console.log("onClickLogin", userName); // Use WebSocketManager directly instead of going through loginClient

          if (this._webSocketManager && this._webSocketManager.isConnected()) {
            this._webSocketManager.sendMessage("login", {
              userName: userName,
              password: password
            });
          } else {
            console.error("WebSocket is not connected. Cannot send login message."); // Try to reconnect

            this._webSocketManager.connectToServer();
          }
        }

        onLoginSuccess(data) {
          console.log("onLoginSuccess", data);

          if (data.success && data.user) {
            if (globalThis._userInfo) {
              globalThis._userInfo.userId = data.user.userId;
              globalThis._userInfo.userName = data.user.userName;
              globalThis._userInfo.userHeadUrl = data.user.userHeadUrl;
              globalThis._userInfo.userRoomCards = data.user.userRoomCards;
            }

            director.loadScene("Level1");
          } else {
            console.error("Login999 failed:", data.message || "Unknown error"); // You might want to show an error message to the user here
          }
        } // Cleanup when component is destroyed


        onDestroy() {
          if (this._webSocketManager) {
            this._webSocketManager.eventTarget.off("loginResponse", this.onLoginSuccess, this);
          }

          if (globalThis.eventTarget) {
            globalThis.eventTarget.off("login_success", this.onLoginSuccess, this);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "my_EditBox", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "my_EditBox2", [_dec3], {
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
//# sourceMappingURL=ad34d506cfe34dd29e62f5fb5f343f1cc4c04241.js.map
System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, EventTarget, _dec, _class, _crd, ccclass, property, eventTarget, loginClient;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      EventTarget = _cc.EventTarget;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c500dlV+HlP3KX531J7gDjA", "loginClient", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'EventTarget']);

      ({
        ccclass,
        property
      } = _decorator);
      eventTarget = new EventTarget();
      globalThis.eventTarget = eventTarget;
      eventTarget.on("login_success", data => {
        console.log("Login successful:", data);
      });

      _export("loginClient", loginClient = (_dec = ccclass('loginClient'), _dec(_class = class loginClient extends Component {
        constructor(...args) {
          super(...args);
          this._ws = null;
        }

        start() {
          this._init();

          console.log("loginClient start");
        }

        update(deltaTime) {}

        _init() {
          this._connectToServer();

          console.log("loginClient init");
        }

        _connectToServer() {
          const ws = new WebSocket("ws://127.0.0.1:3000", "echo-protocol");
          this._ws = ws;
          globalThis._loginScearnMgr = this;

          ws.onopen = () => {
            console.log("WebSocket connection opened"); // ws.send('{"type":"login","username":"testUser","password":"testPass"}');
          };

          ws.onmessage = result => {
            console.log("Received message from server:", result.data);
            console.log('result', result); // Parse the incoming message

            let message = JSON.parse(result.data); // let type = JSON.parse(result.data).type;
            // let data = JSON.parse(result.data).data;

            console.log('message', message);
            console.log("Parsed type:", message.type, "data:", message.user);
            this.responseServerMessage(message.type, message);
          };

          ws.onclose = () => {
            console.log("WebSocket connection closed");
          };

          ws.onerror = error => {
            console.error("WebSocket error:", error);
          };
        }

        responseServerMessage(type, message) {
          console.log('response type:', type);
          console.log('success:', message.success);
          console.log("Response from server:", message);

          if (type === "loginResponse" && message.success) {
            globalThis.eventTarget.emit("login_success", message);
          }

          globalThis.eventTarget.emit(type, message);
        }

        _sendMessage(type, data) {
          if (this._ws && this._ws.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
              type,
              data
            });

            this._ws.send(message);

            console.log("Sent message to server:", message);
          } else {
            console.error("WebSocket is not open. Cannot send message.");
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=82b2ed23aa0f563a17dcfac868aaac3203c91962.js.map
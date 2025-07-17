System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, EventTarget, connectToServer, _crd, eventTarget;

  _export("connectToServer", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      EventTarget = _cc.EventTarget;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "083820dAX1FT5Frer1zzar2", "connectToDerver", undefined);

      __checkObsolete__(['EventTarget']);

      eventTarget = new EventTarget();
      globalThis.eventTarget = eventTarget;
      eventTarget.on("login_success", data => {
        console.log("Login successful:", data);
      });

      _export("connectToServer", connectToServer = class connectToServer {
        constructor() {
          this._ws = null;

          this._connectToServer();

          console.log("connectToServer initialized");
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
            console.log('result', result);
            console.log('result.data', result.data); // Parse the incoming message

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

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=91cd0aac9763417782eeb0c75921599313592e95.js.map
// import { _decorator, Component, Node, EventTarget } from 'cc';
// const { ccclass, property } = _decorator;
// const eventTarget = new EventTarget();
// globalThis.eventTarget = eventTarget;
// eventTarget.on("login_success", (data) => {
//     console.log("Login successful:", data);
// });
// @ccclass('loginClient')
// export class loginClient extends Component {
//     private _ws: any = null;
//     start() {
//         this._init();
//         console.log("loginClient start");
//     }
//     update(deltaTime: number) {
//     }
//     private _init() {
//         this._connectToServer();
//         console.log("loginClient init");
//     }
//     private _connectToServer() {
//         const ws = new WebSocket("ws://127.0.0.1:3000", "echo-protocol");
//         this._ws = ws;
//         globalThis._loginScearnMgr = this;
//         ws.onopen = () => {
//             console.log("WebSocket connection opened");
//             // ws.send('{"type":"login","username":"testUser","password":"testPass"}');
//         }
//         ws.onmessage = (result) => {
//             console.log("Received message from server:", result.data);
//             console.log('result', result);
//             // Parse the incoming message
//             let message: { type: string, user: any } = JSON.parse(result.data);
//             // let type = JSON.parse(result.data).type;
//             // let data = JSON.parse(result.data).data;
//             console.log('message', message);
//             console.log("Parsed type:", message.type, "data:", message.user);
//             this.responseServerMessage(message.type, message);
//         }
//         ws.onclose = () => {
//             console.log("WebSocket connection closed");
//         }
//         ws.onerror = (error) => {
//             console.error("WebSocket error:", error);
//         }
//     }
//     public responseServerMessage(type, message) {
//         console.log('response type:', type);
//         console.log('success:', message.success);
//         console.log("Response from server:", message);
//         if (type === "loginResponse" && message.success) {
//             globalThis.eventTarget.emit("login_success", message);
//         }
//         globalThis.eventTarget.emit(type, message);
//     }
//     private _sendMessage(type: string, data: any) {
//         if (this._ws && this._ws.readyState === WebSocket.OPEN) {
//             const message = JSON.stringify({ type, data });
//             this._ws.send(message);
//             console.log("Sent message to server:", message);
//         } else {
//             console.error("WebSocket is not open. Cannot send message.");
//         }
//     }
// }
System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c500dlV+HlP3KX531J7gDjA", "loginClient", undefined);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=14735be2c1b208f46f02c290937f3a426ba01192.js.map
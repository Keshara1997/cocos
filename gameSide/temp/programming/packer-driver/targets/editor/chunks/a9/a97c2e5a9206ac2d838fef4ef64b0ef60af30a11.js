// import { _decorator, Component } from 'cc';
// import { WebSocketManager } from './WebSocketManager';
// const { ccclass, property } = _decorator;
// /**
//  * Example of how to use the WebSocketManager in any component
//  */
// @ccclass('WebSocketUsageExample')
// export class WebSocketUsageExample extends Component {
//     private webSocketManager: WebSocketManager;
//     start() {
//         this.setupWebSocketConnection();
//     }
//     private setupWebSocketConnection() {
//         // Get the singleton instance
//         this.webSocketManager = WebSocketManager.getInstance();
//         // Setup event listeners
//         this.webSocketManager.eventTarget.on("websocket_opened", this.onConnected, this);
//         this.webSocketManager.eventTarget.on("websocket_closed", this.onDisconnected, this);
//         this.webSocketManager.eventTarget.on("websocket_error", this.onError, this);
//         // Listen for specific message types
//         this.webSocketManager.eventTarget.on("gameUpdate", this.onGameUpdate, this);
//         this.webSocketManager.eventTarget.on("chatMessage", this.onChatMessage, this);
//         // Connect to server (if not already connected)
//         if (!this.webSocketManager.isConnected()) {
//             this.webSocketManager.connectToServer();
//         }
//     }
//     // Event handlers
//     private onConnected(event: Event) {
//         console.log("Connected to server in example component");
//         // Send a message when connected
//         this.webSocketManager.sendMessage("joinRoom", { roomId: "12345" });
//     }
//     private onDisconnected(event: CloseEvent) {
//         console.log("Disconnected from server in example component");
//     }
//     private onError(error: Event) {
//         console.error("WebSocket error in example component:", error);
//     }
//     private onGameUpdate(message: any) {
//         console.log("Game update received:", message);
//         // Handle game update logic here
//     }
//     private onChatMessage(message: any) {
//         console.log("Chat message received:", message);
//         // Handle chat message logic here
//     }
//     // Example methods for sending different types of messages
//     public sendChatMessage(text: string) {
//         this.webSocketManager.sendMessage("chatMessage", {
//             text: text,
//             timestamp: Date.now()
//         });
//     }
//     public joinRoom(roomId: string) {
//         this.webSocketManager.sendMessage("joinRoom", { roomId });
//     }
//     public leaveRoom() {
//         this.webSocketManager.sendMessage("leaveRoom", {});
//     }
//     public sendGameAction(action: string, data: any) {
//         this.webSocketManager.sendMessage("gameAction", {
//             action: action,
//             data: data
//         });
//     }
//     // Cleanup when component is destroyed
//     onDestroy() {
//         if (this.webSocketManager) {
//             // Remove event listeners
//             this.webSocketManager.eventTarget.off("websocket_opened", this.onConnected, this);
//             this.webSocketManager.eventTarget.off("websocket_closed", this.onDisconnected, this);
//             this.webSocketManager.eventTarget.off("websocket_error", this.onError, this);
//             this.webSocketManager.eventTarget.off("gameUpdate", this.onGameUpdate, this);
//             this.webSocketManager.eventTarget.off("chatMessage", this.onChatMessage, this);
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

      _cclegacy._RF.push({}, "5d7e5sHSDtPbJo4QI7lokPq", "WebSocketUsageExample", undefined);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a97c2e5a9206ac2d838fef4ef64b0ef60af30a11.js.map
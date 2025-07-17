System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, WebSocketManager, _dec, _class, _crd, ccclass, property, WebSocketUsageExample;

  function _reportPossibleCrUseOfWebSocketManager(extras) {
    _reporterNs.report("WebSocketManager", "./WebSocketManager", _context.meta, extras);
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
    }, function (_unresolved_2) {
      WebSocketManager = _unresolved_2.WebSocketManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5d7e5sHSDtPbJo4QI7lokPq", "WebSocketUsageExample", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass,
        property
      } = _decorator);
      /**
       * Example of how to use the WebSocketManager in any component
       */

      _export("WebSocketUsageExample", WebSocketUsageExample = (_dec = ccclass('WebSocketUsageExample'), _dec(_class = class WebSocketUsageExample extends Component {
        constructor(...args) {
          super(...args);
          this.webSocketManager = void 0;
        }

        start() {
          this.setupWebSocketConnection();
        }

        setupWebSocketConnection() {
          // Get the singleton instance
          this.webSocketManager = (_crd && WebSocketManager === void 0 ? (_reportPossibleCrUseOfWebSocketManager({
            error: Error()
          }), WebSocketManager) : WebSocketManager).getInstance(); // Setup event listeners

          this.webSocketManager.eventTarget.on("websocket_opened", this.onConnected, this);
          this.webSocketManager.eventTarget.on("websocket_closed", this.onDisconnected, this);
          this.webSocketManager.eventTarget.on("websocket_error", this.onError, this); // Listen for specific message types

          this.webSocketManager.eventTarget.on("gameUpdate", this.onGameUpdate, this);
          this.webSocketManager.eventTarget.on("chatMessage", this.onChatMessage, this); // Connect to server (if not already connected)

          if (!this.webSocketManager.isConnected()) {
            this.webSocketManager.connectToServer();
          }
        } // Event handlers


        onConnected(event) {
          console.log("Connected to server in example component"); // Send a message when connected

          this.webSocketManager.sendMessage("joinRoom", {
            roomId: "12345"
          });
        }

        onDisconnected(event) {
          console.log("Disconnected from server in example component");
        }

        onError(error) {
          console.error("WebSocket error in example component:", error);
        }

        onGameUpdate(message) {
          console.log("Game update received:", message); // Handle game update logic here
        }

        onChatMessage(message) {
          console.log("Chat message received:", message); // Handle chat message logic here
        } // Example methods for sending different types of messages


        sendChatMessage(text) {
          this.webSocketManager.sendMessage("chatMessage", {
            text: text,
            timestamp: Date.now()
          });
        }

        joinRoom(roomId) {
          this.webSocketManager.sendMessage("joinRoom", {
            roomId
          });
        }

        leaveRoom() {
          this.webSocketManager.sendMessage("leaveRoom", {});
        }

        sendGameAction(action, data) {
          this.webSocketManager.sendMessage("gameAction", {
            action: action,
            data: data
          });
        } // Cleanup when component is destroyed


        onDestroy() {
          if (this.webSocketManager) {
            // Remove event listeners
            this.webSocketManager.eventTarget.off("websocket_opened", this.onConnected, this);
            this.webSocketManager.eventTarget.off("websocket_closed", this.onDisconnected, this);
            this.webSocketManager.eventTarget.off("websocket_error", this.onError, this);
            this.webSocketManager.eventTarget.off("gameUpdate", this.onGameUpdate, this);
            this.webSocketManager.eventTarget.off("chatMessage", this.onChatMessage, this);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=58f9236996e009cd3cb91d11493333bc50b5b026.js.map
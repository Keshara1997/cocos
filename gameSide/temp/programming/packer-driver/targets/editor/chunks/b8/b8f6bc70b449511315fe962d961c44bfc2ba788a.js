System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, EventTarget, _dec, _class, _class2, _crd, ccclass, property, WebSocketManager;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      EventTarget = _cc.EventTarget;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "00198QlnlNHFJd5jmJ6JcHa", "WebSocketManager", undefined);

      __checkObsolete__(['_decorator', 'EventTarget']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("WebSocketManager", WebSocketManager = (_dec = ccclass('WebSocketManager'), _dec(_class = (_class2 = class WebSocketManager {
        // Singleton pattern
        static getInstance() {
          if (WebSocketManager._instance === null) {
            WebSocketManager._instance = new WebSocketManager();
          }

          return WebSocketManager._instance;
        }

        constructor() {
          this._ws = null;
          this._isConnected = false;
          this._url = "ws://127.0.0.1:3000";
          this._protocol = "echo-protocol";
          this.eventTarget = new EventTarget();
          // Set global reference for easy access
          globalThis._webSocketManager = this;
        } // Connect to WebSocket server


        connectToServer(url, protocol) {
          if (url) this._url = url;
          if (protocol) this._protocol = protocol;

          if (this._ws && this._ws.readyState === WebSocket.OPEN) {
            console.log("WebSocket is already connected");
            return;
          }

          try {
            this._ws = new WebSocket(this._url, this._protocol);

            this._setupEventHandlers();

            console.log(`Attempting to connect to ${this._url}`);
          } catch (error) {
            console.error("Failed to create WebSocket connection:", error);
          }
        } // Setup WebSocket event handlers


        _setupEventHandlers() {
          this._ws.onopen = this._onWebSocketOpen.bind(this);
          this._ws.onmessage = this._onWebSocketMessage.bind(this);
          this._ws.onclose = this._onWebSocketClose.bind(this);
          this._ws.onerror = this._onWebSocketError.bind(this);
        } // WebSocket open event handler


        _onWebSocketOpen(event) {
          console.log("WebSocket connection opened");
          this._isConnected = true;
          this.eventTarget.emit("websocket_opened", event);
        } // WebSocket message event handler


        _onWebSocketMessage(event) {
          console.log("Received message from server:", event.data);

          try {
            const message = JSON.parse(event.data);
            console.log("Parsed message:", message); // Emit specific event based on message type

            if (message.type) {
              this.eventTarget.emit(message.type, message);
            } // Also emit a general message event


            this.eventTarget.emit("websocket_message", message);
          } catch (error) {
            console.error("Error parsing message:", error); // Emit raw message if parsing fails

            this.eventTarget.emit("websocket_raw_message", event.data);
          }
        } // WebSocket close event handler


        _onWebSocketClose(event) {
          console.log("WebSocket connection closed");
          this._isConnected = false;
          this.eventTarget.emit("websocket_closed", event);
        } // WebSocket error event handler


        _onWebSocketError(event) {
          console.error("WebSocket error:", event);
          this._isConnected = false;
          this.eventTarget.emit("websocket_error", event);
        } // Send message to server


        sendMessage(type, data) {
          if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
            console.error("WebSocket is not open. Cannot send message.");
            return false;
          }

          try {
            const message = JSON.stringify({
              type,
              data
            });

            this._ws.send(message);

            console.log("Sent message to server:", message);
            return true;
          } catch (error) {
            console.error("Error sending message:", error);
            return false;
          }
        } // Send raw message to server


        sendRawMessage(message) {
          if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
            console.error("WebSocket is not open. Cannot send message.");
            return false;
          }

          try {
            this._ws.send(message);

            console.log("Sent raw message to server:", message);
            return true;
          } catch (error) {
            console.error("Error sending raw message:", error);
            return false;
          }
        } // Disconnect from server


        disconnect() {
          if (this._ws) {
            this._ws.close();

            this._ws = null;
            this._isConnected = false;
            console.log("WebSocket disconnected");
          }
        } // Check connection status


        isConnected() {
          return this._isConnected && this._ws && this._ws.readyState === WebSocket.OPEN;
        } // Get connection state


        getConnectionState() {
          return this._ws ? this._ws.readyState : WebSocket.CLOSED;
        } // Reconnect to server


        reconnect() {
          console.log("Reconnecting to server...");
          this.disconnect();
          setTimeout(() => {
            this.connectToServer();
          }, 1000);
        }

      }, _class2._instance = null, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b8f6bc70b449511315fe962d961c44bfc2ba788a.js.map
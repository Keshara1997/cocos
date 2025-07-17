import { _decorator, EventTarget } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WebSocketManager')
export class WebSocketManager {
    private static _instance: WebSocketManager = null;
    private _ws: WebSocket = null;
    private _isConnected: boolean = false;
    private _url: string = "ws://127.0.0.1:3000";
    private _protocol: string = "echo-protocol";
    public eventTarget: EventTarget = new EventTarget();

    // Singleton pattern
    public static getInstance(): WebSocketManager {
        if (WebSocketManager._instance === null) {
            WebSocketManager._instance = new WebSocketManager();
        }
        return WebSocketManager._instance;
    }

    private constructor() {
        // Set global reference for easy access
        globalThis._webSocketManager = this;
    }

    // Connect to WebSocket server
    public connectToServer(url?: string, protocol?: string): void {
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
    }

    // Setup WebSocket event handlers
    private _setupEventHandlers(): void {
        this._ws.onopen = this._onWebSocketOpen.bind(this);
        this._ws.onmessage = this._onWebSocketMessage.bind(this);
        this._ws.onclose = this._onWebSocketClose.bind(this);
        this._ws.onerror = this._onWebSocketError.bind(this);
    }

    // WebSocket open event handler
    private _onWebSocketOpen(event: Event): void {
        console.log("WebSocket connection opened");
        this._isConnected = true;
        this.eventTarget.emit("websocket_opened", event);
    }

    // WebSocket message event handler
    private _onWebSocketMessage(event: MessageEvent): void {
        console.log("Received message from server:", event.data);

        try {
            const message = JSON.parse(event.data);
            console.log("Parsed message:", message);

            // Emit specific event based on message type
            if (message.type) {
                this.eventTarget.emit(message.type, message);
            }

            // Also emit a general message event
            this.eventTarget.emit("websocket_message", message);

        } catch (error) {
            console.error("Error parsing message:", error);
            // Emit raw message if parsing fails
            this.eventTarget.emit("websocket_raw_message", event.data);
        }
    }

    // WebSocket close event handler
    private _onWebSocketClose(event: CloseEvent): void {
        console.log("WebSocket connection closed");
        this._isConnected = false;
        this.eventTarget.emit("websocket_closed", event);
    }

    // WebSocket error event handler
    private _onWebSocketError(event: Event): void {
        console.error("WebSocket error:", event);
        this._isConnected = false;
        this.eventTarget.emit("websocket_error", event);
    }

    // Send message to server
    public sendMessage(type: string, data?: any): boolean {
        if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
            console.error("WebSocket is not open. Cannot send message.");
            return false;
        }

        try {
            const message = JSON.stringify({ type, data });
            this._ws.send(message);
            console.log("Sent message to server:", message);
            return true;
        } catch (error) {
            console.error("Error sending message:", error);
            return false;
        }
    }

    // Send raw message to server
    public sendRawMessage(message: string): boolean {
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
    }

    // Disconnect from server
    public disconnect(): void {
        if (this._ws) {
            this._ws.close();
            this._ws = null;
            this._isConnected = false;
            console.log("WebSocket disconnected");
        }
    }

    // Check connection status
    public isConnected(): boolean {
        return this._isConnected && this._ws && this._ws.readyState === WebSocket.OPEN;
    }

    // Get connection state
    public getConnectionState(): number {
        return this._ws ? this._ws.readyState : WebSocket.CLOSED;
    }

    // Reconnect to server
    public reconnect(): void {
        console.log("Reconnecting to server...");
        this.disconnect();
        setTimeout(() => {
            this.connectToServer();
        }, 1000);
    }
} 
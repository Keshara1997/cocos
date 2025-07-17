import { connection, Message } from 'websocket';
import { AuthController } from '../controllers/auth.controller';
import { UserController } from '../controllers/user.controller';
import { ErrorUtil } from '../utils/error.util';
import { IWebSocketMessage, IMessageHandlers } from '../types';
import { WEBSOCKET_MESSAGE_TYPES } from '../config/constants';

export class WebSocketHandler {
    private authController: AuthController;
    private userController: UserController;
    private messageHandlers!: IMessageHandlers;

    constructor() {
        this.authController = new AuthController();
        this.userController = new UserController();
        this.initializeMessageHandlers();
    }

    /**
     * Initialize message handlers mapping
     */
    private initializeMessageHandlers(): void {

        console.log('Initializing WebSocket message handlers999999999999999999999999999999');
        this.messageHandlers = {
            [WEBSOCKET_MESSAGE_TYPES.SIGN_UP]: this.handleSignUp.bind(this),
            [WEBSOCKET_MESSAGE_TYPES.LOGIN]: this.handleLogin.bind(this),
            [WEBSOCKET_MESSAGE_TYPES.GET_USER_INFO]: this.handleGetUserInfo.bind(this),
            [WEBSOCKET_MESSAGE_TYPES.UPDATE_USER_INFO]: this.handleUpdateUserInfo.bind(this),
        };
    }

    /**
     * Handle incoming WebSocket message
     */
    public async handleMessage(wsConnection: connection, message: Message): Promise<void> {
        try {
            if (message.type === 'utf8' && message.utf8Data) {
                console.log('📨 Received message:', message.utf8Data);

                // Parse message
                const parsedMessage: IWebSocketMessage = JSON.parse(message.utf8Data);
                console.log('📋 Parsed message:', {
                    type: parsedMessage.type,
                    hasData: !!parsedMessage.data
                });

                // Route to appropriate handler
                const handler = this.messageHandlers[parsedMessage.type];
                if (handler) {
                    await handler(wsConnection, parsedMessage);
                } else {
                    this.handleUnknownMessage(wsConnection, parsedMessage.type);
                }
            } else if (message.type === 'binary') {
                console.log('📦 Received binary message of', message.binaryData?.length, 'bytes');
                // Echo binary messages back for now
                wsConnection.sendBytes(message.binaryData);
            }
        } catch (error) {
            ErrorUtil.logError('WebSocketHandler.handleMessage', error);
            this.sendParseErrorResponse(wsConnection);
        }
    }

    /**
     * Handle connection establishment
     */
    public handleConnection(wsConnection: connection): void {
        console.log('🔗 New WebSocket connection established');

        // Send welcome message
        const welcomeMessage = {
            type: WEBSOCKET_MESSAGE_TYPES.WELCOME,
            success: true,
            message: 'Welcome to the Game Server!',
            timestamp: new Date().toISOString(),
            data: {
                serverVersion: '1.0.0',
                supportedMessageTypes: Object.values(WEBSOCKET_MESSAGE_TYPES),
            },
        };

        wsConnection.sendUTF(JSON.stringify(welcomeMessage));
    }

    /**
     * Handle connection close
     */
    public handleConnectionClose(reasonCode: number, description: string): void {
        console.log(`🔌 WebSocket connection closed: ${reasonCode} - ${description}`);
    }

    /**
     * Handle sign up message
     */
    private async handleSignUp(wsConnection: connection, message: IWebSocketMessage): Promise<void> {
        await this.authController.handleSignUp(wsConnection, message as any);
    }

    /**
     * Handle login message
     */
    private async handleLogin(wsConnection: connection, message: IWebSocketMessage): Promise<void> {
        await this.authController.handleLogin(wsConnection, message as any);
    }

    /**
     * Handle get user info message
     */
    private async handleGetUserInfo(wsConnection: connection, message: IWebSocketMessage): Promise<void> {
        await this.userController.handleGetUserInfo(wsConnection, message as any);
    }

    /**
     * Handle update user info message
     */
    private async handleUpdateUserInfo(wsConnection: connection, message: IWebSocketMessage): Promise<void> {
        await this.userController.handleUpdateUserInfo(wsConnection, message as any);
    }

    /**
     * Handle unknown message types
     */
    private handleUnknownMessage(wsConnection: connection, messageType: string): void {
        console.log('Unknown message type:', messageType);

        const errorResponse = {
            type: WEBSOCKET_MESSAGE_TYPES.ERROR,
            success: false,
            message: `Unknown message type: ${messageType}`,
            timestamp: new Date().toISOString(),
            data: {
                supportedTypes: Object.values(WEBSOCKET_MESSAGE_TYPES),
            },
        };

        wsConnection.sendUTF(JSON.stringify(errorResponse));
    }

    /**
     * Send JSON parse error response
     */
    private sendParseErrorResponse(wsConnection: connection): void {
        const errorResponse = {
            type: WEBSOCKET_MESSAGE_TYPES.ERROR,
            success: false,
            message: 'Invalid JSON format in message',
            timestamp: new Date().toISOString(),
        };

        wsConnection.sendUTF(JSON.stringify(errorResponse));
    }
} 
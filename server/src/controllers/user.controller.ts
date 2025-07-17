import { connection } from 'websocket';
import { UserService } from '../services/user.service';
import { ErrorUtil } from '../utils/error.util';
import { IWebSocketResponse, IWebSocketMessage } from '../types';
import { WEBSOCKET_MESSAGE_TYPES } from '../config/constants';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    /**
     * Handle get user info request
     */
    public async handleGetUserInfo(
        wsConnection: connection,
        message: IWebSocketMessage<{ userId: number }>
    ): Promise<void> {
        try {
            console.log('🔵 Handling get user info request:', { userId: message.data.userId });

            const { userId } = message.data;

            if (!userId || typeof userId !== 'number') {
                this.sendErrorResponse(
                    wsConnection,
                    WEBSOCKET_MESSAGE_TYPES.GET_USER_INFO_RESPONSE,
                    'Valid user ID is required'
                );
                return;
            }

            // Get user info
            const result = await this.userService.getUserById(userId);

            // Send response
            const response: IWebSocketResponse = {
                type: WEBSOCKET_MESSAGE_TYPES.GET_USER_INFO_RESPONSE,
                success: result.success,
                message: result.message,
                timestamp: new Date().toISOString(),
                user: result.data,
            };

            wsConnection.sendUTF(JSON.stringify(response));
            console.log(`✅ Get user info response sent: ${result.success ? 'SUCCESS' : 'FAILED'}`);
        } catch (error) {
            ErrorUtil.logError('UserController.handleGetUserInfo', error);
            this.sendErrorResponse(
                wsConnection,
                WEBSOCKET_MESSAGE_TYPES.GET_USER_INFO_RESPONSE,
                'Server error during user info retrieval'
            );
        }
    }

    /**
     * Handle update user info request
     */
    public async handleUpdateUserInfo(
        wsConnection: connection,
        message: IWebSocketMessage<{
            userId: number;
            updates: {
                name?: string;
                userHeadUrl?: string;
                userRoomCards?: number;
                roomId?: number
            }
        }>
    ): Promise<void> {
        try {
            console.log('🔵 Handling update user info request:', { userId: message.data.userId });

            const { userId, updates } = message.data;

            if (!userId || typeof userId !== 'number') {
                this.sendErrorResponse(
                    wsConnection,
                    WEBSOCKET_MESSAGE_TYPES.UPDATE_USER_INFO_RESPONSE,
                    'Valid user ID is required'
                );
                return;
            }

            if (!updates || typeof updates !== 'object') {
                this.sendErrorResponse(
                    wsConnection,
                    WEBSOCKET_MESSAGE_TYPES.UPDATE_USER_INFO_RESPONSE,
                    'Updates object is required'
                );
                return;
            }

            // Validate update fields
            const allowedFields = ['name', 'userHeadUrl', 'userRoomCards', 'roomId'];
            const updateFields = Object.keys(updates);
            const invalidFields = updateFields.filter(field => !allowedFields.includes(field));

            if (invalidFields.length > 0) {
                this.sendErrorResponse(
                    wsConnection,
                    WEBSOCKET_MESSAGE_TYPES.UPDATE_USER_INFO_RESPONSE,
                    `Invalid fields: ${invalidFields.join(', ')}`
                );
                return;
            }

            // Update user info
            const result = await this.userService.updateUser(userId, updates);

            // Send response
            const response: IWebSocketResponse = {
                type: WEBSOCKET_MESSAGE_TYPES.UPDATE_USER_INFO_RESPONSE,
                success: result.success,
                message: result.message,
                timestamp: new Date().toISOString(),
                user: result.data,
            };

            wsConnection.sendUTF(JSON.stringify(response));
            console.log(`✅ Update user info response sent: ${result.success ? 'SUCCESS' : 'FAILED'}`);
        } catch (error) {
            ErrorUtil.logError('UserController.handleUpdateUserInfo', error);
            this.sendErrorResponse(
                wsConnection,
                WEBSOCKET_MESSAGE_TYPES.UPDATE_USER_INFO_RESPONSE,
                'Server error during user info update'
            );
        }
    }

    /**
     * Handle update user room cards request
     */
    public async handleUpdateUserRoomCards(
        wsConnection: connection,
        message: IWebSocketMessage<{ userId: number; roomCards: number }>
    ): Promise<void> {
        try {
            const { userId, roomCards } = message.data;

            if (!userId || typeof userId !== 'number' || typeof roomCards !== 'number') {
                this.sendErrorResponse(
                    wsConnection,
                    WEBSOCKET_MESSAGE_TYPES.UPDATE_USER_INFO_RESPONSE,
                    'Valid user ID and room cards count are required'
                );
                return;
            }

            const result = await this.userService.updateUserRoomCards(userId, roomCards);

            const response: IWebSocketResponse = {
                type: WEBSOCKET_MESSAGE_TYPES.UPDATE_USER_INFO_RESPONSE,
                success: result.success,
                message: result.message,
                timestamp: new Date().toISOString(),
                user: result.data,
            };

            wsConnection.sendUTF(JSON.stringify(response));
        } catch (error) {
            ErrorUtil.logError('UserController.handleUpdateUserRoomCards', error);
            this.sendErrorResponse(
                wsConnection,
                WEBSOCKET_MESSAGE_TYPES.UPDATE_USER_INFO_RESPONSE,
                'Server error during room cards update'
            );
        }
    }

    /**
     * Send error response via WebSocket
     */
    private sendErrorResponse(
        wsConnection: connection,
        responseType: string,
        message: string
    ): void {
        const errorResponse: IWebSocketResponse = {
            type: responseType,
            success: false,
            message,
            timestamp: new Date().toISOString(),
        };

        wsConnection.sendUTF(JSON.stringify(errorResponse));
    }
} 
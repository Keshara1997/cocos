import { connection } from 'websocket';
import { AuthService } from '../services/auth.service';
import { ValidationMiddleware } from '../middleware/validation.middleware';
import { ErrorUtil } from '../utils/error.util';
import { IWebSocketResponse, ISignUpMessage, ILoginMessage } from '../types';
import { WEBSOCKET_MESSAGE_TYPES } from '../config/constants';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    /**
     * Handle sign up request
     */
    public async handleSignUp(
        wsConnection: connection,
        message: ISignUpMessage
    ): Promise<void> {
        try {
            console.log('message.data:', message.data);
            console.log('wsConnection:', wsConnection);

            // Validate input data
            const validation = ValidationMiddleware.validateSignUp(message.data);
            console.log('Validation result:', validation);
            console.log('validation.valid:', validation.valid);
            if (!validation.valid) {
                console.log('!validation.valid: in', validation.valid);
                const errorResponse = ErrorUtil.toWebSocketResponse(
                    validation.error!,
                    WEBSOCKET_MESSAGE_TYPES.SIGN_UP_RESPONSE
                );
                wsConnection.sendUTF(JSON.stringify(errorResponse));
                return;
            }


            console.log('++++++++++++++++++++++++++++++++++++++++++++')

            // Process sign up
            const result = await this.authService.signUp(message.data);
            console.log('Sign up result:', result);

            // Send response
            const response: IWebSocketResponse = {
                type: WEBSOCKET_MESSAGE_TYPES.SIGN_UP_RESPONSE,
                success: result.success,
                message: result.message,
                timestamp: new Date().toISOString(),
                token: result.token,
                user: result.user,
            };

            wsConnection.sendUTF(JSON.stringify(response));
            console.log(`Sign up response sent: ${result.success ? 'SUCCESS' : 'FAILED'}`);
        } catch (error) {
            ErrorUtil.logError('AuthController.handleSignUp', error);
            this.sendErrorResponse(
                wsConnection,
                WEBSOCKET_MESSAGE_TYPES.SIGN_UP_RESPONSE,
                'Server error during sign up'
            );
        }
    }

    /**
     * Handle login request
     */
    public async handleLogin(
        wsConnection: connection,
        message: ILoginMessage
    ): Promise<void> {
        try {
            console.log('message.data:', message.data);

            // Validate input data
            const validation = ValidationMiddleware.validateLogin(message.data);
            console.log('Validation result:', validation);
            if (!validation.valid) {

                console.log('!validation.valid:', validation.valid);
                const errorResponse = ErrorUtil.toWebSocketResponse(
                    validation.error!,
                    WEBSOCKET_MESSAGE_TYPES.LOGIN_RESPONSE
                );
                wsConnection.sendUTF(JSON.stringify(errorResponse));
                return;
            }

            // Process login
            const result = await this.authService.login(message.data);

            console.log('Login result:', result);

            // Send response
            const response: IWebSocketResponse = {
                type: WEBSOCKET_MESSAGE_TYPES.LOGIN_RESPONSE,
                success: result.success,
                message: result.message,
                timestamp: new Date().toISOString(),
                token: result.token,
                user: result.user,
            };

            wsConnection.sendUTF(JSON.stringify(response));
            console.log(`Login response sent: ${result.success ? 'SUCCESS' : 'FAILED'}`);
        } catch (error) {
            ErrorUtil.logError('AuthController.handleLogin', error);
            this.sendErrorResponse(
                wsConnection,
                WEBSOCKET_MESSAGE_TYPES.LOGIN_RESPONSE,
                'Server error during login'
            );
        }
    }

    /**
     * Handle token verification request
     */
    public async handleTokenVerification(
        wsConnection: connection,
        token: string
    ): Promise<{ valid: boolean; userId?: number; userName?: string }> {
        try {
            const result = await this.authService.verifyToken(token);

            if (result.success && result.user) {
                return {
                    valid: true,
                    userId: result.user.userId,
                    userName: result.user.userName,
                };
            }

            return { valid: false };
        } catch (error) {
            ErrorUtil.logError('AuthController.handleTokenVerification', error);
            return { valid: false };
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
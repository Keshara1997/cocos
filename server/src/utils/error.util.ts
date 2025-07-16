import { ErrorCode, ICustomError, IWebSocketResponse } from '../types';

export class ErrorUtil {
    /**
     * Create standardized error object
     */
    public static createError(code: ErrorCode, message: string, details?: any): ICustomError {
        return {
            code,
            message,
            details,
        };
    }

    /**
     * Convert error to WebSocket response
     */
    public static toWebSocketResponse(
        error: ICustomError,
        type: string = 'error'
    ): IWebSocketResponse {
        return {
            type,
            success: false,
            message: error.message,
            timestamp: new Date().toISOString(),
            data: {
                code: error.code,
                details: error.details,
            },
        };
    }

    /**
     * Handle database errors
     */
    public static handleDatabaseError(error: any): ICustomError {
        console.error('Database error:', error);

        if (error.code === 'ER_DUP_ENTRY') {
            return this.createError(
                ErrorCode.DUPLICATE_ERROR,
                'A user with this username already exists'
            );
        }

        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return this.createError(
                ErrorCode.VALIDATION_ERROR,
                'Referenced data does not exist'
            );
        }

        return this.createError(
            ErrorCode.DATABASE_ERROR,
            'Database operation failed'
        );
    }

    /**
     * Handle authentication errors
     */
    public static handleAuthError(message: string = 'Authentication failed'): ICustomError {
        return this.createError(ErrorCode.AUTHENTICATION_ERROR, message);
    }

    /**
     * Handle validation errors
     */
    public static handleValidationError(message: string): ICustomError {
        return this.createError(ErrorCode.VALIDATION_ERROR, message);
    }

    /**
     * Handle not found errors
     */
    public static handleNotFoundError(resource: string = 'Resource'): ICustomError {
        return this.createError(ErrorCode.NOT_FOUND, `${resource} not found`);
    }

    /**
     * Log error with context
     */
    public static logError(context: string, error: any): void {
        console.error(`[${context}] Error:`, {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        });
    }
} 
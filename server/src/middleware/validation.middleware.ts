import { IUserCreate, IUserLogin, ErrorCode, ICustomError } from '../types';
import { VALIDATION_RULES } from '../config/constants';
import { PasswordUtil } from '../utils/password.util';

export class ValidationMiddleware {
    /**
     * Validate sign up data
     */
    public static validateSignUp(data: any): { valid: boolean; error?: ICustomError } {
        console.log('Validating sign up data:', data);
        if (!data || typeof data !== 'object') {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Invalid data format',
                },
            };
        }

        const { userName, password, name } = data as IUserCreate;

        // Check required fields
        if (!userName || !password || !name) {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Username, password, and name are required',
                },
            };
        }

        // Validate username
        const usernameValidation = this.validateUsername(userName);
        if (!usernameValidation.valid) {
            return { valid: false, error: usernameValidation.error };
        }

        // Validate password
        const passwordValidation = this.validatePassword(password);
        if (!passwordValidation.valid) {
            return { valid: false, error: passwordValidation.error };
        }

        // Validate name
        const nameValidation = this.validateName(name);
        if (!nameValidation.valid) {
            return { valid: false, error: nameValidation.error };
        }

        return { valid: true };
    }

    /**
     * Validate login data
     */
    public static validateLogin(data: any): { valid: boolean; error?: ICustomError } {
        if (!data || typeof data !== 'object') {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Invalid data format',
                },
            };
        }

        const { userName, password } = data as IUserLogin;

        console.log('userName:', userName);
        console.log('password:', password);

        if (!userName || !password) {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Username and password are required',
                },
            };
        }

        return { valid: true };
    }

    /**
     * Validate username
     */
    private static validateUsername(userName: string): { valid: boolean; error?: ICustomError } {
        if (typeof userName !== 'string') {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Username must be a string',
                },
            };
        }

        if (userName.length < VALIDATION_RULES.USERNAME.MIN_LENGTH) {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: `Username must be at least ${VALIDATION_RULES.USERNAME.MIN_LENGTH} characters long`,
                },
            };
        }

        if (userName.length > VALIDATION_RULES.USERNAME.MAX_LENGTH) {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: `Username must be less than ${VALIDATION_RULES.USERNAME.MAX_LENGTH} characters long`,
                },
            };
        }

        // Check for valid characters (alphanumeric and underscore)
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(userName)) {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Username can only contain letters, numbers, and underscores',
                },
            };
        }

        return { valid: true };
    }

    /**
     * Validate password
     */
    private static validatePassword(password: string): { valid: boolean; error?: ICustomError } {
        if (typeof password !== 'string') {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Password must be a string',
                },
            };
        }

        const strengthValidation = PasswordUtil.validatePasswordStrength(password);
        if (!strengthValidation.valid) {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: strengthValidation.message || 'Invalid password',
                },
            };
        }

        return { valid: true };
    }

    /**
     * Validate name
     */
    private static validateName(name: string): { valid: boolean; error?: ICustomError } {
        if (typeof name !== 'string') {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: 'Name must be a string',
                },
            };
        }

        if (name.trim().length < VALIDATION_RULES.NAME.MIN_LENGTH) {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: `Name must be at least ${VALIDATION_RULES.NAME.MIN_LENGTH} characters long`,
                },
            };
        }

        if (name.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
            return {
                valid: false,
                error: {
                    code: ErrorCode.VALIDATION_ERROR,
                    message: `Name must be less than ${VALIDATION_RULES.NAME.MAX_LENGTH} characters long`,
                },
            };
        }

        return { valid: true };
    }
} 
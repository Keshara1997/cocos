import bcrypt from 'bcrypt';
import { BCRYPT_CONFIG } from '../config/constants';

export class PasswordUtil {
    /**
     * Hash password using bcrypt
     */
    public static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, BCRYPT_CONFIG.SALT_ROUNDS);
    }

    /**
     * Compare password with hash
     */
    public static async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    /**
     * Validate password strength
     */
    public static validatePasswordStrength(password: string): { valid: boolean; message?: string } {
        if (password.length < 6) {
            return { valid: false, message: 'Password must be at least 6 characters long' };
        }

        if (password.length > 50) {
            return { valid: false, message: 'Password must be less than 50 characters long' };
        }

        // Add more validation rules as needed
        const hasNumber = /\d/.test(password);
        const hasLetter = /[a-zA-Z]/.test(password);

        if (!hasNumber || !hasLetter) {
            return { valid: false, message: 'Password must contain at least one letter and one number' };
        }

        return { valid: true };
    }
} 
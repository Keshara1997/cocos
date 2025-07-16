import jwt, { SignOptions } from 'jsonwebtoken';
import { IJWTPayload } from '../types';
import { JWT_CONFIG } from '../config/constants';

export class JWTUtil {
    /**
     * Generate JWT token for user
     */
    public static generateToken(userId: number, userName: string): string {
        const payload: Omit<IJWTPayload, 'iat' | 'exp'> = {
            userId,
            userName,
        };

        // 2. Explicitly type the options object
        const options: SignOptions = {
            expiresIn: JWT_CONFIG.EXPIRES_IN,
            algorithm: JWT_CONFIG.ALGORITHM as jwt.Algorithm,
        };

        // 3. Pass the typed object to the sign function
        return jwt.sign(payload, JWT_CONFIG.SECRET, options);
    }

    /**
     * Verify and decode JWT token
     */
    public static verifyToken(token: string): { valid: boolean; payload?: IJWTPayload; message: string } {
        console.log('Verifying token:', token);
        try {
            console.log('Using secret:', JWT_CONFIG.SECRET);
            const payload = jwt.verify(token, JWT_CONFIG.SECRET) as IJWTPayload;

            console.log('Token payload:', payload);
            return {
                valid: true,
                payload,
                message: 'Token is valid',
            };
        } catch (error) {
            console.error('Token verification error:', error);
            let message = 'Invalid token';

            if (error instanceof jwt.TokenExpiredError) {
                message = 'Token has expired';
            } else if (error instanceof jwt.JsonWebTokenError) {
                message = 'Malformed token';
            }

            return {
                valid: false,
                message,
            };
        }
    }

    /**
     * Extract token from authorization header
     */
    public static extractTokenFromHeader(authHeader?: string): string | null {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        return authHeader.substring(7);
    }
}
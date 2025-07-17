import { Repository } from 'typeorm';
import { UserInfo } from '../entities/user_info';
import { IUserCreate, IUserLogin, IAuthServiceResponse, IUserResponse } from '../types';
import { DatabaseConfig } from '../config/database';
import { JWTUtil } from '../utils/jwt.util';
import { PasswordUtil } from '../utils/password.util';
import { ErrorUtil } from '../utils/error.util';
import { DATABASE_CONFIG } from '../config/constants';

export class AuthService {
    private userRepository: Repository<UserInfo>;

    constructor() {
        this.userRepository = DatabaseConfig.getInstance().getRepository(UserInfo);
    }

    /**
     * Register a new user
     */
    public async signUp(userData: IUserCreate): Promise<IAuthServiceResponse> {

        console.log('userData----------------------------:', userData);

        try {
            // Check if user already exists
            const existingUser = await this.userRepository.findOneBy({
                userName: userData.userName
            });
            console.log('existingUser:', existingUser);


            if (existingUser) {

                console.log('User already exists:', existingUser.userName);
                const error = ErrorUtil.createError(
                    'DUPLICATE_ERROR' as any,
                    'A user with this username already exists'
                );
                return {
                    success: false,
                    message: error.message,
                };
            }

            // Hash password
            const hashedPassword = await PasswordUtil.hashPassword(userData.password);

            console.log('Hashed password:', hashedPassword);

            // Create new user
            const newUser = this.userRepository.create({
                userName: userData.userName,
                password: hashedPassword,
                name: userData.name,
                userRoomCards: DATABASE_CONFIG.DEFAULT_USER_ROOM_CARDS,
                roomId: DATABASE_CONFIG.DEFAULT_ROOM_ID,  
            });

            console.log('New user created:', newUser);

            const savedUser = await this.userRepository.save(newUser);
            console.log('Saved user:', savedUser);


            // Generate JWT token
            const token = JWTUtil.generateToken(savedUser.userId, savedUser.userName);

            console.log('Generated token:', token);
  

            
            // Return user data without password
            const userResponse = this.mapToUserResponse(savedUser);
            console.log('User response:', userResponse);

            console.log('User signed up successfully:', savedUser.userName);
            return {
                success: true,
                message: 'User registered successfully',
                token,
                user: userResponse,
                data: userResponse,
            };
        } catch (error) {
            ErrorUtil.logError('AuthService.signUp', error);
            const customError = ErrorUtil.handleDatabaseError(error);
            return {
                success: false,
                message: customError.message,
            };
        }
    }

    /**
     * Authenticate user login
     */
    public async login(credentials: IUserLogin): Promise<IAuthServiceResponse> {

        console.log('credentials----------------------------:', credentials)



        try {
            // Find user by username
            const user = await this.userRepository.findOneBy({
                userName: credentials.userName
            });

            if (!user) {
                const error = ErrorUtil.handleAuthError('Invalid username or password');
                return {
                    success: false,
                    message: error.message,
                };
            }

            // Verify password
            const isPasswordValid = await PasswordUtil.comparePassword(
                credentials.password,
                user.password
            );

            if (!isPasswordValid) {
                const error = ErrorUtil.handleAuthError('Invalid username or password');
                return {
                    success: false,
                    message: error.message,
                };
            }

            // Generate JWT token
            const token = JWTUtil.generateToken(user.userId, user.userName);

            // Return user data without password
            const userResponse = this.mapToUserResponse(user);

            console.log('✅ User logged in successfully:', user.userName);
            return {
                success: true,
                message: 'Login successful',
                token,
                user: userResponse,
                data: userResponse,
            };
        } catch (error) {
            ErrorUtil.logError('AuthService.login', error);
            const customError = ErrorUtil.handleDatabaseError(error);
            return {
                success: false,
                message: customError.message,
            };
        }
    }

    /**
     * Verify JWT token and get user info
     */
    public async verifyToken(token: string): Promise<IAuthServiceResponse> {
        const verification = JWTUtil.verifyToken(token);

        if (!verification.valid) {
            return {
                success: false,
                message: verification.message,
            };
        }

        try {
            const user = await this.userRepository.findOneBy({
                userId: verification.payload!.userId
            });

            if (!user) {
                const error = ErrorUtil.handleNotFoundError('User');
                return {
                    success: false,
                    message: error.message,
                };
            }

            const userResponse = this.mapToUserResponse(user);
            return {
                success: true,
                message: 'Token is valid',
                user: userResponse,
                data: userResponse,
            };
        } catch (error) {
            ErrorUtil.logError('AuthService.verifyToken', error);
            const customError = ErrorUtil.handleDatabaseError(error);
            return {
                success: false,
                message: customError.message,
            };
        }
    }

    /**
     * Map UserInfo entity to UserResponse (without password)
     */
    private mapToUserResponse(user: UserInfo): IUserResponse {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
} 
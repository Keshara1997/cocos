import { Repository } from 'typeorm';
import { UserInfo } from '../entities/user_info';
import { IServiceResponse, IUserResponse } from '../types';
import { DatabaseConfig } from '../config/database';
import { ErrorUtil } from '../utils/error.util';

export class UserService {
    private userRepository: Repository<UserInfo>;

    constructor() {
        this.userRepository = DatabaseConfig.getInstance().getRepository(UserInfo);
    }

    /**
     * Get user information by ID
     */
    public async getUserById(userId: number): Promise<IServiceResponse<IUserResponse>> {
        try {
            const user = await this.userRepository.findOneBy({ userId });

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
                message: 'User retrieved successfully',
                data: userResponse,
            };
        } catch (error) {
            ErrorUtil.logError('UserService.getUserById', error);
            const customError = ErrorUtil.handleDatabaseError(error);
            return {
                success: false,
                message: customError.message,
            };
        }
    }

    /**
     * Get all users
     */
    public async getAllUsers(): Promise<IServiceResponse<IUserResponse[]>> {
        try {
            const users = await this.userRepository.find();
            const userResponses = users.map(user => this.mapToUserResponse(user));

            return {
                success: true,
                message: 'Users retrieved successfully',
                data: userResponses,
            };
        } catch (error) {
            ErrorUtil.logError('UserService.getAllUsers', error);
            const customError = ErrorUtil.handleDatabaseError(error);
            return {
                success: false,
                message: customError.message,
            };
        }
    }

    /**
     * Update user information
     */
    public async updateUser(
        userId: number,
        updates: Partial<Omit<UserInfo, 'userId' | 'password' | 'createdAt'>>
    ): Promise<IServiceResponse<IUserResponse>> {
        try {
            // Check if user exists
            const existingUser = await this.userRepository.findOneBy({ userId });
            if (!existingUser) {
                const error = ErrorUtil.handleNotFoundError('User');
                return {
                    success: false,
                    message: error.message,
                };
            }

            // Update user
            await this.userRepository.update({ userId }, updates);

            // Get updated user
            const updatedUser = await this.userRepository.findOneBy({ userId });
            const userResponse = this.mapToUserResponse(updatedUser!);

            return {
                success: true,
                message: 'User updated successfully',
                data: userResponse,
            };
        } catch (error) {
            ErrorUtil.logError('UserService.updateUser', error);
            const customError = ErrorUtil.handleDatabaseError(error);
            return {
                success: false,
                message: customError.message,
            };
        }
    }

    /**
     * Update user room cards
     */
    public async updateUserRoomCards(
        userId: number,
        roomCards: number
    ): Promise<IServiceResponse<IUserResponse>> {
        return this.updateUser(userId, { userRoomCards: roomCards });
    }

    /**
     * Update user room ID
     */
    public async updateUserRoomId(
        userId: number,
        roomId: number
    ): Promise<IServiceResponse<IUserResponse>> {
        return this.updateUser(userId, { roomId });
    }

    /**
     * Check if username exists
     */
    public async isUsernameExists(userName: string): Promise<boolean> {
        try {
            const user = await this.userRepository.findOneBy({ userName });
            return !!user;
        } catch (error) {
            ErrorUtil.logError('UserService.isUsernameExists', error);
            return false;
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
import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserInfo } from "../entities/user_info";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginService {
    private static dataSource: DataSource;
    private static readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';
    private static readonly SALT_ROUNDS = 10;

    public static async initializeDatabase(): Promise<void> {
        if (!this.dataSource) {
            this.dataSource = new DataSource({
                type: "mysql",
                host: process.env.MYSQL_HOST ?? "localhost",
                port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
                username: process.env.MYSQL_USER ?? "root",
                password: process.env.MYSQL_PASSWORD ?? "root",
                database: "sys",
                entities: [UserInfo],
                synchronize: true,
                logging: false
            });

            await this.dataSource.initialize();
            console.log("✅ LoginService DataSource has been initialized!");
        }
    }


    // Sign up new user
    public static async signUp(userData: { userName: string; password: string; name: string }): Promise<{ success: boolean; message: string; token?: string; user?: Partial<UserInfo> }> {
        try {
            const userRepository = this.dataSource.getRepository(UserInfo);
            
            // Check if user already exists
            const existingUser = await userRepository.findOneBy({ userName: userData.userName });
            if (existingUser) {
                return {
                    success: false,
                    message: "User with this username already exists"
                };
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(userData.password, this.SALT_ROUNDS);

            // Create new user
            const newUser = userRepository.create({
                userName: userData.userName,
                password: hashedPassword,
                name: userData.name,
                userRoomCards: 0,
                roomId: 0
            });

            const savedUser = await userRepository.save(newUser);

            // Generate JWT token
            const token = this.generateJWT(savedUser.userId, savedUser.userName);

            // Return user data without password
            const { password, ...userWithoutPassword } = savedUser;
            
            console.log('✅ User signed up successfully:', savedUser.userName);
            return {
                success: true,
                message: "User registered successfully",
                token,
                user: userWithoutPassword
            };
        } catch (error) {
            console.error("❌ Sign up error:", error);
            return {
                success: false,
                message: "Database error during sign up"
            };
        }
    }

    // Login user with username and password
    public static async login(credentials: { userName: string; password: string }): Promise<{ success: boolean; message: string; token?: string; user?: Partial<UserInfo> }> {
        try {
            const userRepository = this.dataSource.getRepository(UserInfo);
            
            // Find user by username
            const user = await userRepository.findOneBy({ userName: credentials.userName });
            if (!user) {
                return {
                    success: false,
                    message: "Invalid username or password"
                };
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
            if (!isPasswordValid) {
                return {
                    success: false,
                    message: "Invalid username or password"
                };
            }

            // Generate JWT token
            const token = this.generateJWT(user.userId, user.userName);

            // Return user data without password
            const { password, ...userWithoutPassword } = user;
            
            console.log('✅ User logged in successfully:', user.userName);
            return {
                success: true,
                message: "Login successful",
                token,
                user: userWithoutPassword
            };
        } catch (error) {
            console.error("❌ Login error:", error);
            return {
                success: false,
                message: "Database error during login"
            };
        }
    }

    // Generate JWT token
    private static generateJWT(userId: number, userName: string): string {
        const payload = {
            userId,
            userName,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        };
        
        return jwt.sign(payload, this.JWT_SECRET);
    }

    // Verify JWT token
    public static verifyJWT(token: string): { valid: boolean; payload?: any; message: string } {
        try {
            const payload = jwt.verify(token, this.JWT_SECRET);
            return {
                valid: true,
                payload,
                message: "Token is valid"
            };
        } catch (error) {
            console.error("❌ JWT verification error:", error);
            return {
                valid: false,
                message: "Invalid or expired token"
            };
        }
    }

    // Legacy method - kept for backward compatibility
    public static async authenticateUser(userId: number): Promise<{ success: boolean; data?: UserInfo; message: string }> {
        console.log('authenticateUser (legacy)', userId);
        try {
            const userRepository = this.dataSource.getRepository(UserInfo);
            let user = await userRepository.findOneBy({ userId });

            if (user) {
                console.log('user', user);
                return {
                    success: true,
                    data: user,
                    message: "Login successful"
                };
            } else {
                console.log('user not found');
                return {
                    success: false,
                    message: "User not found"
                };
            }
        } catch (error) {
            console.error("❌ Login authentication error:", error);
            return {
                success: false,
                message: "Database error during authentication"
            };
        }
    }

    public static async getUserInfo(userId: number): Promise<UserInfo | null> {
        try {
            const userRepository = this.dataSource.getRepository(UserInfo);
            return await userRepository.findOneBy({ userId });
        } catch (error) {
            console.error("❌ Error retrieving user info:", error);
            return null;
        }
    }

    public static async getAllUsers(): Promise<UserInfo[]> {
        try {
            const userRepository = this.dataSource.getRepository(UserInfo);
            return await userRepository.find();
        } catch (error) {
            console.error("❌ Error retrieving all users:", error);
            return [];
        }
    }

    public static async updateUserInfo(userId: number, updates: Partial<UserInfo>): Promise<{ success: boolean; message: string }> {
        try {
            const userRepository = this.dataSource.getRepository(UserInfo);
            
            // Don't allow password updates through this method
            const { password, ...safeUpdates } = updates;
            
            const result = await userRepository.update({ userId }, safeUpdates);

            if (result.affected && result.affected > 0) {
                return {
                    success: true,
                    message: "User info updated successfully"
                };
            } else {
                return {
                    success: false,
                    message: "User not found"
                };
            }
        } catch (error) {
            console.error("❌ Error updating user info:", error);
            return {
                success: false,
                message: "Database error during update"
            };
        }
    }
}

export default LoginService; 
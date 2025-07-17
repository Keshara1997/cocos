import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserInfo } from "../entities/user_info";

class LoginService {
    private static dataSource: DataSource;

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


    public static async authenticateUser(userId: number): Promise<{ success: boolean; data?: UserInfo; message: string }> {


        console.log('authenticateUser', userId);





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
            const result = await userRepository.update({ userId }, updates);

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
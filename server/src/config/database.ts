import { DataSource } from 'typeorm';
import { UserInfo } from '../entities/user_info';
import { IDatabaseConfig } from '../types';

export class DatabaseConfig {
    private static instance: DataSource;

    public static getInstance(): DataSource {
        if (!this.instance) {
            this.instance = this.createDataSource();
        }
        return this.instance;
    }

    private static createDataSource(): DataSource {
        const config: IDatabaseConfig = {
            type: 'mysql',
            host: process.env.MYSQL_HOST ?? 'localhost',
            port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
            username: process.env.MYSQL_USER ?? 'root',
            password: process.env.MYSQL_PASSWORD ?? 'root',
            database: process.env.MYSQL_DATABASE ?? 'sys'
        };

        return new DataSource({
            ...config,
            entities: [UserInfo],
            synchronize: process.env.NODE_ENV !== 'production',
            logging: process.env.NODE_ENV === 'development',
            migrations: ['src/migrations/*.ts'],
            subscribers: ['src/subscribers/*.ts'],
        });
    }

    public static async initialize(): Promise<void> {
        try {
            await this.getInstance().initialize();
            console.log('✅ Database connection initialized successfully');
        } catch (error) {
            console.error('❌ Error during database initialization:', error);
            throw error;
        }
    }

    public static async close(): Promise<void> {
        if (this.instance?.isInitialized) {
            await this.instance.destroy();
            console.log('✅ Database connection closed');
        }
    }
} 
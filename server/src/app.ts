import 'reflect-metadata';
import * as http from 'http';
import * as WebSocketServer from 'websocket';
import { DatabaseConfig } from './config/database';
import { WebSocketHandler } from './handlers/websocket.handler';
import { SERVER_CONFIG } from './config/constants';

export class GameServer {
    private server!: http.Server;
    private wsServer!: WebSocketServer.server;
    private wsHandler: WebSocketHandler;

    constructor() {
        this.initializeServer();
        this.wsHandler = new WebSocketHandler();
        this.setupWebSocketServer();



    }



    /**
     * Initialize HTTP server
     */
    private initializeServer(): void {

        console.log('popopopopopopop')

        this.server = http.createServer((request, response) => {
            console.log(`📥 ${new Date().toISOString()} Received HTTP request for ${request.url}`);

            // Handle basic health check
            if (request.url === '/health') {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({
                    status: 'healthy',
                    timestamp: new Date().toISOString(),
                    version: '1.0.0',
                }));
                return;
            }

            // Return 404 for other HTTP requests
            response.writeHead(404);
            response.end();
        });
    }

    /**
     * Setup WebSocket server
     */
    private setupWebSocketServer(): void {
        this.wsServer = new WebSocketServer.server({
            httpServer: this.server,
            autoAcceptConnections: false,
        });

        this.wsServer.on('request', (request) => {
            if (!this.isOriginAllowed(request.origin)) {
                request.reject();
                console.log(`🚫 ${new Date().toISOString()} Connection rejected from origin: ${request.origin}`);
                return;
            }

            const connection = request.accept(SERVER_CONFIG.WS_PROTOCOL, request.origin);
            console.log(`✅ ${new Date().toISOString()} Connection accepted from: ${request.origin}`);

            // Handle connection
            this.wsHandler.handleConnection(connection);

            // Handle messages
            connection.on('message', async (message) => {
                await this.wsHandler.handleMessage(connection, message);
            });

            // Handle connection close
            connection.on('close', (reasonCode, description) => {
                this.wsHandler.handleConnectionClose(reasonCode, description);
            });
        });
    }




    /**
     * Check if origin is allowed to connect
     */
    private isOriginAllowed(origin: string): boolean {
        // In production, implement proper origin validation
        if (SERVER_CONFIG.NODE_ENV === 'production') {
            // Add your allowed origins here
            const allowedOrigins = [
                'http://localhost:3000',
                'http://localhost:8080',
                // Add your production domains
            ];
            return allowedOrigins.includes(origin);
        }

        // Allow all origins in development
        return true;
    }

    /**
     * Initialize database connection
     */
    private async initializeDatabase(): Promise<void> {
        try {
            await DatabaseConfig.initialize();
            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Failed to initialize database:', error);
            throw error;
        }
    }

    /**
     * Start the server
     */
    public async start(): Promise<void> {
        try {
            // Initialize database first
            await this.initializeDatabase();

            // Start HTTP server
            this.server.listen(SERVER_CONFIG.PORT, () => {
                console.log(' ===================================');
                console.log(' Game Server Started Successfully!');
                console.log(' ===================================');
                console.log(` HTTP Server: http://localhost:${SERVER_CONFIG.PORT}`);
                console.log(` WebSocket Server: ws://localhost:${SERVER_CONFIG.PORT}`);
                console.log(` Environment: ${SERVER_CONFIG.NODE_ENV}`);
                console.log(` Protocol: ${SERVER_CONFIG.WS_PROTOCOL}`);
                console.log(' ===================================');
            });

            // Setup graceful shutdown
            this.setupGracefulShutdown();
        } catch (error) {
            console.error(' Failed to start server:', error);
            process.exit(1);
        }
    }

    /**
     * Setup graceful shutdown handling
     */
    private setupGracefulShutdown(): void {
        const shutdown = async (signal: string) => {
            console.log(`\n Received ${signal}. Starting graceful shutdown...`);

            try {
                // Close WebSocket server
                if (this.wsServer) {
                    this.wsServer.shutDown();
                    console.log('🔌 WebSocket server closed');
                }

                // Close HTTP server
                if (this.server) {
                    this.server.close(() => {
                        console.log('📡 HTTP server closed');
                    });
                }

                // Close database connection
                await DatabaseConfig.close();

                console.log(' Graceful shutdown completed');
                process.exit(0);
            } catch (error) {
                console.error(' Error during shutdown:', error);
                process.exit(1);
            }
        };

        // Handle different shutdown signals
        process.on('SIGINT', () => shutdown('SIGINT'));
        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGQUIT', () => shutdown('SIGQUIT'));

        // Handle uncaught exceptions
        process.on('uncaughtException', (error) => {
            console.error(' Uncaught Exception:', error);
            shutdown('uncaughtException');
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (reason, promise) => {
            console.error(' Unhandled Rejection at:', promise, 'reason:', reason);
            shutdown('unhandledRejection');
        });
    }
}

// Start the server if this file is run directly
if (require.main === module) {
    const gameServer = new GameServer();
    gameServer.start().catch((error) => {
        console.error(' Failed to start server:', error);
        process.exit(1);
    });
} 
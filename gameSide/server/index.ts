import * as http from 'http';
import * as WebSocketServer from 'websocket';
// import { createDatabase } from './DB/connect';
import LoginService from './src/module/loginService';
import { UserInfo } from './src/entities/user_info';

const port = process.env.PORT || 3000;

async function initializeServer() {
    try {
        // await createDatabase('sys', 'utf8mb4');
        // console.log('Database created successfully');

        await LoginService.initializeDatabase();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing server:', error);
    }
}

initializeServer();

const server = http.createServer((request, response) => {
    console.log(`${new Date()} Received request for ${request.url}`);
    response.writeHead(404);
    response.end();
});

const wsServer = new WebSocketServer.server({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin: string): boolean {
    return true;
}



wsServer.on('request', (request) => {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log(`${new Date()} Connection from origin ${request.origin} rejected.`);
        return;
    }

    const connection = request.accept('echo-protocol', request.origin);
    console.log(`${new Date()} Connection accepted from ${request.origin}`);

    connection.on('message', async (message) => {
        console.log('Received message:', message);
  
        if (message.type === 'utf8') {
            console.log(`Received Message: ${message.utf8Data}`);

            try {
                const data = JSON.parse(message.utf8Data);
                console.log('Parsed data:', data);

                if (data.type === 'login') {
                    await handleLoginRequest(connection, data);
                }
            } catch (error) {
                console.error('Error parsing message:', error);
                connection.sendUTF(JSON.stringify({
                    type: 'error',
                    message: 'Invalid JSON format',
                    timestamp: new Date().toISOString()
                }));
            }
        } else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', (reasonCode, description) => {
        console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
    });

    connection.sendUTF(JSON.stringify({
        type: 'welcome',
        message: 'Welcome to the WebSocket server!',
        timestamp: new Date().toISOString()
    }));
});

// Handle login requests
async function handleLoginRequest(connection: WebSocketServer.connection, data: any) {


    console.log('handleLoginRequest', data);
    try {
        const { userId, userName } = data.data;

        console.log('userId1', userId);
        console.log('userName1', userName);

        if (!userId) {
            connection.sendUTF(JSON.stringify({
                type: 'loginResponse',
                success: false,
                message: 'User ID is required',
                timestamp: new Date().toISOString()
            }));
            return;
        }

        const result = await LoginService.authenticateUser(parseInt(userId));

        connection.sendUTF(JSON.stringify({
            type: 'loginResponse',
            success: result.success,
            message: result.message,
            user: result.data,
            timestamp: new Date().toISOString()
        }));
    } catch (error) {

        console.error('Login request error:', error);
        connection.sendUTF(JSON.stringify({
            type: 'loginResponse',
            success: false,
            message: 'Server error during login',
            timestamp: new Date().toISOString()
        }));
    }
}

async function handleGetUserInfoRequest(connection: WebSocketServer.connection, data: any) {
    try {
        const { userId } = data;

        if (!userId) {
            connection.sendUTF(JSON.stringify({
                type: 'getUserInfoResponse',
                success: false,
                message: 'User ID is required',
                timestamp: new Date().toISOString()
            }));
            return;
        }

        const user = await LoginService.getUserInfo(parseInt(userId));

        connection.sendUTF(JSON.stringify({
            type: 'getUserInfoResponse',
            success: !!user,
            message: user ? 'User info retrieved successfully' : 'User not found',
            user: user,
            timestamp: new Date().toISOString()
        }));
    } catch (error) {
        console.error('Get user info request error:', error);
        connection.sendUTF(JSON.stringify({
            type: 'getUserInfoResponse',
            success: false,
            message: 'Server error during user info retrieval',
            timestamp: new Date().toISOString()
        }));
    }
}

async function handleUpdateUserInfoRequest(connection: WebSocketServer.connection, data: any) {
    try {
        const { userId, updates } = data;

        if (!userId) {
            connection.sendUTF(JSON.stringify({
                type: 'updateUserInfoResponse',
                success: false,
                message: 'User ID is required',
                timestamp: new Date().toISOString()
            }));
            return;
        }

        const result = await LoginService.updateUserInfo(parseInt(userId), updates);

        connection.sendUTF(JSON.stringify({
            type: 'updateUserInfoResponse',
            success: result.success,
            message: result.message,
            timestamp: new Date().toISOString()
        }));
    } catch (error) {
        console.error('Update user info request error:', error);
        connection.sendUTF(JSON.stringify({
            type: 'updateUserInfoResponse',
            success: false,
            message: 'Server error during user info update',
            timestamp: new Date().toISOString()
        }));
    }
}

server.listen(port, () => {
    console.log(`${new Date()} Server is listening on port ${port}`);
    console.log(`WebSocket server started at ws://localhost:${port}`);
});

process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});
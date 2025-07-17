const WebSocket = require('websocket').client;

const client = new WebSocket();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    
    // Test login functionality
    setTimeout(() => {
        console.log('\n--- Testing Login ---');
        
        // Test 1: Login with new user
        console.log('Test 1: Login with new user (user123, John Doe)');
        connection.sendUTF(JSON.stringify({
            type: 'login',
            userId: 'user123',
            userName: 'John Doe'
        }));
        
        setTimeout(() => {
            // Test 2: Login with existing user
            console.log('\nTest 2: Login with existing user (user123)');
            connection.sendUTF(JSON.stringify({
                type: 'login',
                userId: 'user123'
            }));
            
            setTimeout(() => {
                // Test 3: Get user info
                console.log('\nTest 3: Get user info (user123)');
                connection.sendUTF(JSON.stringify({
                    type: 'getUserInfo',
                    userId: 'user123'
                }));
                
                setTimeout(() => {
                    // Test 4: Update user info
                    console.log('\nTest 4: Update user info (user123)');
                    connection.sendUTF(JSON.stringify({
                        type: 'updateUserInfo',
                        userId: 'user123',
                        updates: {
                            userRoomCards: 100,
                            roomId: 1001
                        }
                    }));
                    
                    setTimeout(() => {
                        // Test 5: Get updated user info
                        console.log('\nTest 5: Get updated user info (user123)');
                        connection.sendUTF(JSON.stringify({
                            type: 'getUserInfo',
                            userId: 'user123'
                        }));
                        
                        setTimeout(() => {
                            connection.close();
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
});

client.connect('ws://localhost:3000/', 'echo-protocol'); 
// Legacy entry point - redirects to new architecture
import { GameServer } from './src/app';

console.log('🔄 Starting server using new architecture...');

const gameServer = new GameServer();
gameServer.start().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
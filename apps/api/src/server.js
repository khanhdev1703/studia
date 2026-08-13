import app from './app.js';
import env from './config/env.js';
import {
    connectDatabase,
    disconnectDatabase,
} from './config/database.js';

const startServer = async () => {
    try {
        // ==========================================
        // Connect database
        // ==========================================

        await connectDatabase();

        // ==========================================
        // Start Express server
        // ==========================================

        const server = app.listen(env.PORT, () => {
            console.log(
                `🚀 Studia API running on http://localhost:${env.PORT}`
            );
        });

        // ==========================================
        // Graceful shutdown
        // ==========================================

        const shutdown = async (signal) => {
            console.log(`\n⚠️ ${signal} received. Shutting down...`);

            server.close(async () => {
                await disconnectDatabase();

                console.log('👋 Studia API stopped');

                process.exit(0);
            });
        };

        process.on('SIGINT', () => shutdown('SIGINT'));
        process.on('SIGTERM', () => shutdown('SIGTERM'));
    } catch (error) {
        console.error('❌ Failed to start Studia API');
        console.error(error);

        process.exit(1);
    }
};

startServer();
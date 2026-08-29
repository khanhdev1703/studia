import app from "./app.js";
import maintenanceApp from "./maintenanceApp.js";

import env from "./config/env.js";

import {
    connectDatabase,
    disconnectDatabase,
} from "./config/database.js";

const MAX_RETRIES = 3;
const RETRY_DELAY = 3000;

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

const startServer = async () => {
    let databaseConnected = false;

    // ==========================================
    // Connect database
    // ==========================================

    for (
        let attempt = 1;
        attempt <= MAX_RETRIES;
        attempt++
    ) {
        try {
            console.log(
                `🔄 Connecting to database... (${attempt}/${MAX_RETRIES})`
            );

            await connectDatabase();

            databaseConnected = true;

            console.log("✅ Database connected");

            break;
        } catch (error) {
            console.error(
                `❌ Database connection failed (${attempt}/${MAX_RETRIES})`
            );

            console.error(error);

            if (attempt < MAX_RETRIES) {
                console.log(
                    `⏳ Retrying in ${RETRY_DELAY / 1000
                    }s...`
                );

                await sleep(RETRY_DELAY);
            }
        }
    }

    // ==========================================
    // Select application
    // ==========================================

    const serverApp = databaseConnected
        ? app
        : maintenanceApp;

    if (!databaseConnected) {
        console.error(
            "❌ Database unavailable after 3 attempts."
        );

        console.log(
            "⚠️ Server is starting in maintenance mode."
        );
    }

    // ==========================================
    // Start Express server
    // ==========================================

    const server = serverApp.listen(
        env.PORT,
        () => {
            if (databaseConnected) {
                console.log(
                    `🚀 API running on http://localhost:${env.PORT}`
                );
            } else {
                console.log(
                    `⚠️ Maintenance server running on http://localhost:${env.PORT}`
                );
            }
        }
    );

    // ==========================================
    // Graceful shutdown
    // ==========================================

    const shutdown = async (signal) => {
        console.log(
            `\n⚠️ ${signal} received. Shutting down...`
        );

        server.close(async () => {
            if (databaseConnected) {
                await disconnectDatabase();
            }

            console.log("👋 API stopped");

            process.exit(0);
        });
    };

    process.on("SIGINT", () =>
        shutdown("SIGINT")
    );

    process.on("SIGTERM", () =>
        shutdown("SIGTERM")
    );
};

startServer();
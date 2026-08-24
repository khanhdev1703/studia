import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDatabase = async () => {
    try {
        await prisma.$connect();

        // Thực sự kiểm tra MongoDB
        await prisma.$runCommandRaw({
            ping: 1,
        });

        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error(
            "❌ MongoDB connection failed"
        );

        console.error(error);

        throw error;
    }
};

const disconnectDatabase = async () => {
    try {
        await prisma.$disconnect();
        console.log("✅ MongoDB disconnected");
    } catch (error) {
        console.error("❌ MongoDB disconnect failed");
    }
};

export {
    prisma,
    connectDatabase,
    disconnectDatabase,
};
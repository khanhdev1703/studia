import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting database seed...\n");

    const now = new Date();

    // =========================================================
    // PASSWORD
    // =========================================================

    const hashedPassword = await bcrypt.hash("123456", 10);

    // =========================================================
    // 1. ADMIN
    // =========================================================

    const admin = await prisma.user.upsert({
        where: {
            email: "admin@gmail.com",
        },
        update: {
            name: "Admin Stady",
            password: hashedPassword,
            role: "ADMIN",
            studentCode: "ADMIN",
            isDelete: false,
            updatedAt: now,
        },
        create: {
            name: "Admin Stady",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "ADMIN",
            studentCode: "ADMIN",
            isDelete: false,
            createdAt: now,
            updatedAt: now,
        },
    });

    // =========================================================
    // 2. TEACHER
    // =========================================================

    const teacher = await prisma.user.upsert({
        where: {
            email: "teacher@gmail.com",
        },
        update: {
            name: "Nguyễn Văn Teacher",
            password: hashedPassword,
            role: "TEACHER",
            studentCode: "TEACHER",
            isDelete: false,
            updatedAt: now,
        },
        create: {
            name: "Nguyễn Văn Teacher",
            email: "teacher@gmail.com",
            password: hashedPassword,
            role: "TEACHER",
            studentCode: "TEACHER",
            isDelete: false,
            createdAt: now,
            updatedAt: now,
        },
    });

    // =========================================================
    // 3. STUDENT
    // =========================================================

    const student = await prisma.user.upsert({
        where: {
            email: "student@gmail.com",
        },
        update: {
            name: "Nguyễn Văn Student",
            password: hashedPassword,
            role: "STUDENT",
            studentCode: "HS0001",
            isDelete: false,
            updatedAt: now,
        },
        create: {
            name: "Nguyễn Văn Student",
            email: "student@gmail.com",
            password: hashedPassword,
            role: "STUDENT",
            studentCode: "HS0001",
            isDelete: false,
            createdAt: now,
            updatedAt: now,
        },
    });

    // =========================================================
    // LOG
    // =========================================================

    console.log("✅ Users created successfully\n");

    console.log(`   Admin:   ${admin.email}`);
    console.log(`   Teacher: ${teacher.email}`);
    console.log(
        `   Student: ${student.email} (${student.studentCode})`
    );

    console.log("\n🌱 Database seed completed.");
}

main()
    .catch((error) => {
        console.error("\n❌ Seed failed:");
        console.error(error);

        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
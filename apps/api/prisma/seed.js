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
            email: "admin@stady.io.vn",
        },
        update: {
            name: "Admin Stady",
            password: hashedPassword,
            role: "ADMIN",
            updatedAt: now,
        },
        create: {
            name: "Admin Stady",
            email: "admin@stady.io.vn",
            password: hashedPassword,
            role: "ADMIN",

            createdAt: now,
            updatedAt: now,
        },
    });

    // =========================================================
    // 2. TEACHER
    // =========================================================

    const teacher = await prisma.user.upsert({
        where: {
            email: "teacher@stady.io.vn",
        },
        update: {
            name: "Nguyễn Văn Teacher",
            password: hashedPassword,
            role: "TEACHER",
            updatedAt: now,
        },
        create: {
            name: "Nguyễn Văn Teacher",
            email: "teacher@stady.io.vn",
            password: hashedPassword,
            role: "TEACHER",

            createdAt: now,
            updatedAt: now,
        },
    });

    // =========================================================
    // 3. STUDENT
    // =========================================================

    const student = await prisma.user.upsert({
        where: {
            email: "student@stady.io.vn",
        },
        update: {
            name: "Nguyễn Văn Student",
            password: hashedPassword,
            role: "STUDENT",
            updatedAt: now,
        },
        create: {
            name: "Nguyễn Văn Student",
            email: "student@stady.io.vn",
            password: hashedPassword,
            role: "STUDENT",

            createdAt: now,
            updatedAt: now,
        },
    });

    console.log("✅ Users");
    console.log(`   Admin:   ${admin.email}`);
    console.log(`   Teacher: ${teacher.email}`);
    console.log(`   Student: ${student.email}`);

    // =========================================================
    // 4. COURSE
    // =========================================================

    let course = await prisma.course.findFirst({
        where: {
            teacherId: teacher.id,
            title: "JavaScript cơ bản",
        },
    });

    if (course) {
        course = await prisma.course.update({
            where: {
                id: course.id,
            },
            data: {
                teacherId: teacher.id,

                title: "JavaScript cơ bản",

                description:
                    "Khóa học JavaScript cơ bản dành cho người mới bắt đầu. " +
                    "Học từ những khái niệm cơ bản đến cách sử dụng JavaScript " +
                    "để xây dựng các chương trình web.",

                thumbnail: null,

                price: 0,

                status: "PUBLISHED",

                deletedAt: null,

                updatedAt: now,
            },
        });
    } else {
        course = await prisma.course.create({
            data: {
                teacherId: teacher.id,

                title: "JavaScript cơ bản",

                description:
                    "Khóa học JavaScript cơ bản dành cho người mới bắt đầu. " +
                    "Học từ những khái niệm cơ bản đến cách sử dụng JavaScript " +
                    "để xây dựng các chương trình web.",

                thumbnail: null,

                price: 0,

                status: "PUBLISHED",

                deletedAt: null,

                createdAt: now,
                updatedAt: now,
            },
        });
    }

    console.log("\n✅ Course");
    console.log(`   Title:     ${course.title}`);
    console.log(`   Teacher:   ${teacher.name}`);
    console.log(`   Price:     ${course.price}`);
    console.log(`   Status:    ${course.status}`);
    console.log(`   Thumbnail: ${course.thumbnail}`);

    // =========================================================
    // 5. LESSONS
    // =========================================================

    const lessons = [
        {
            title: "Giới thiệu về JavaScript",
            description:
                "Tìm hiểu JavaScript là gì, lịch sử phát triển và vai trò của JavaScript trong lập trình web.",
            video: null,
            document: null,
            duration: 15,
            order: 1,
            isLocked: false,
            deletedAt: null,
        },
        {
            title: "Biến và kiểu dữ liệu",
            description:
                "Tìm hiểu cách khai báo biến và các kiểu dữ liệu cơ bản trong JavaScript.",
            video: null,
            document: null,
            duration: 25,
            order: 2,
            isLocked: false,
            deletedAt: null,
        },
        {
            title: "Toán tử và biểu thức",
            description:
                "Tìm hiểu các loại toán tử và cách xây dựng biểu thức trong JavaScript.",
            video: null,
            document: null,
            duration: 20,
            order: 3,
            isLocked: true,
            deletedAt: null,
        },
        {
            title: "Câu điều kiện",
            description:
                "Tìm hiểu if, else if, else và cách xử lý các điều kiện trong JavaScript.",
            video: null,
            document: null,
            duration: 30,
            order: 4,
            isLocked: true,
            deletedAt: null,
        },
        {
            title: "Vòng lặp",
            description:
                "Tìm hiểu for, while, do while và cách sử dụng vòng lặp trong JavaScript.",
            video: null,
            document: null,
            duration: 30,
            order: 5,
            isLocked: true,
            deletedAt: null,
        },
    ];

    for (const lesson of lessons) {
        const existingLesson = await prisma.lesson.findFirst({
            where: {
                courseId: course.id,
                order: lesson.order,
            },
        });

        if (existingLesson) {
            await prisma.lesson.update({
                where: {
                    id: existingLesson.id,
                },
                data: {
                    courseId: course.id,

                    title: lesson.title,
                    description: lesson.description,

                    video: lesson.video,
                    document: lesson.document,

                    duration: lesson.duration,
                    order: lesson.order,

                    isLocked: lesson.isLocked,

                    deletedAt: lesson.deletedAt,

                    updatedAt: now,
                },
            });
        } else {
            await prisma.lesson.create({
                data: {
                    courseId: course.id,

                    title: lesson.title,
                    description: lesson.description,

                    video: lesson.video,
                    document: lesson.document,

                    duration: lesson.duration,
                    order: lesson.order,

                    isLocked: lesson.isLocked,

                    deletedAt: lesson.deletedAt,

                    createdAt: now,
                    updatedAt: now,
                },
            });
        }
    }

    console.log("\n✅ Lessons");

    for (const lesson of lessons) {
        console.log(
            `   ${lesson.order}. ${lesson.title} - ${lesson.duration} phút`
        );
    }

    // =========================================================
    // 6. ENROLLMENT
    // =========================================================

    const existingEnrollment = await prisma.enrollment.findFirst({
        where: {
            studentId: student.id,
            courseId: course.id,
        },
    });

    if (existingEnrollment) {
        await prisma.enrollment.update({
            where: {
                id: existingEnrollment.id,
            },
            data: {
                studentId: student.id,
                courseId: course.id,

                status: "APPROVED",

                enrolledAt: existingEnrollment.enrolledAt,
                updatedAt: now,
            },
        });
    } else {
        await prisma.enrollment.create({
            data: {
                studentId: student.id,
                courseId: course.id,

                status: "APPROVED",

                enrolledAt: now,
                updatedAt: now,
            },
        });
    }

    console.log("\n✅ Enrollment");
    console.log(`   Student: ${student.name}`);
    console.log(`   Course:  ${course.title}`);
    console.log("   Status:  APPROVED");

    // =========================================================
    // SUMMARY
    // =========================================================

    console.log("\n========================================");
    console.log("🌱 DATABASE SEED COMPLETED");
    console.log("========================================");

    console.log("\nAccounts");
    console.log("----------------------------------------");
    console.log("Admin");
    console.log("  Email:    admin@stady.io.vn");
    console.log("  Password: 123456");

    console.log("\nTeacher");
    console.log("  Email:    teacher@stady.io.vn");
    console.log("  Password: 123456");

    console.log("\nStudent");
    console.log("  Email:    student@stady.io.vn");
    console.log("  Password: 123456");

    console.log("\nCourse");
    console.log("----------------------------------------");
    console.log(`  Title:      ${course.title}`);
    console.log(`  Teacher:    ${teacher.name}`);
    console.log(`  Price:      ${course.price}`);
    console.log(`  Status:     ${course.status}`);
    console.log(`  Thumbnail:  ${course.thumbnail}`);
    console.log(`  Deleted At: ${course.deletedAt}`);

    console.log("\nLessons");
    console.log("----------------------------------------");

    lessons.forEach((lesson) => {
        console.log(
            `  ${lesson.order}. ${lesson.title} | ` +
            `${lesson.duration} phút | ` +
            `locked=${lesson.isLocked}`
        );
    });

    console.log("\nEnrollment");
    console.log("----------------------------------------");
    console.log(`  Student: ${student.email}`);
    console.log(`  Course:  ${course.title}`);
    console.log("  Status:  APPROVED");

    console.log("\n========================================\n");
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
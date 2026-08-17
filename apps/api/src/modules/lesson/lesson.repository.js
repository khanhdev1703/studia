import { prisma } from "../../config/database.js";

const lessonRepository = {
    // ==========================================
    // Find lesson by ID
    // ==========================================

    async findById(lessonId) {
        return prisma.lesson.findUnique({
            where: {
                id: lessonId,
            },
        });
    },

    // ==========================================
    // Get all lessons of a course
    // ==========================================

    async findByCourseId(courseId) {
        return prisma.lesson.findMany({
            where: {
                courseId,
            },

            orderBy: {
                order: "asc",
            },
        });
    },

    // ==========================================
    // Create lesson
    // ==========================================

    async create({
        courseId,
        title,
        description,
        video,
        document,
        order,
        duration
    }) {
        return prisma.lesson.create({
            data: {
                courseId,
                title,
                description,
                video,
                document,
                order,
                duration
            },
        });
    },

    // ==========================================
    // Update lesson
    // ==========================================

    async updateById(
        lessonId,
        data
    ) {
        return prisma.lesson.update({
            where: {
                id: lessonId,
            },

            data,
        });
    },

    // ==========================================
    // Delete lesson
    // ==========================================

    async deleteById(lessonId) {
        return prisma.lesson.delete({
            where: {
                id: lessonId,
            },
        });
    },

    // ==========================================
    // Update lesson order
    // ==========================================

    async updateOrder(
        lessonId,
        order
    ) {
        return prisma.lesson.update({
            where: {
                id: lessonId,
            },

            data: {
                order,
            },
        });
    },

    async decreaseOrderAfter(
        courseId,
        order
    ) {
        return prisma.lesson.updateMany({
            where: {
                courseId,
                order: {
                    gt: order,
                },
            },

            data: {
                order: {
                    decrement: 1,
                },
            },
        });
    },
};

export default lessonRepository;
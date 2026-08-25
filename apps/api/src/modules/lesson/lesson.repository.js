// src/modules/lesson/lesson.repository.js

import { prisma } from "../../config/database.js";

const lessonRepository = {
    // ==========================================
    // Find lesson by ID
    //
    // Có thể tìm cả lesson đã soft delete.
    // Cần thiết cho restoreLesson().
    // ==========================================
    async findById(lessonId) {
        return prisma.lesson.findUnique({
            where: {
                id: lessonId,
            },
        });
    },

    // ==========================================
    // Get active lessons of a course
    //
    // Không lấy lesson đã soft delete.
    // ==========================================
    async findByCourseId(courseId) {
        return prisma.lesson.findMany({
            where: {
                courseId,
                deletedAt: null,
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
        duration,
        isLocked = false,
        deletedAt = null,
    }) {
        return prisma.lesson.create({
            data: {
                courseId,
                title,
                description,
                video,
                document,
                order,
                duration,
                isLocked,
                deletedAt,
            },
        });
    },

    // ==========================================
    // Update lesson
    // ==========================================
    async updateById(lessonId, data) {
        return prisma.lesson.update({
            where: {
                id: lessonId,
            },
            data,
        });
    },

    // ==========================================
    // Soft delete lesson
    // ==========================================
    async softDelete(lessonId) {
        return prisma.lesson.update({
            where: {
                id: lessonId,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    },

    // ==========================================
    // Restore lesson
    // ==========================================
    async restoreById(lessonId, order) {
        return prisma.lesson.update({
            where: {
                id: lessonId,
            },
            data: {
                deletedAt: null,
                order,
            },
        });
    },

    // ==========================================
    // Delete all lessons of a course
    //
    // Dùng khi course bị xóa cứng hoặc xử lý
    // dữ liệu liên quan.
    // ==========================================
    async deleteByCourseId(courseId) {
        return prisma.lesson.deleteMany({
            where: {
                courseId,
            },
        });
    },

    // ==========================================
    // Update lesson order
    // ==========================================
    async updateOrder(lessonId, order) {
        return prisma.lesson.update({
            where: {
                id: lessonId,
            },
            data: {
                order,
            },
        });
    },

    // ==========================================
    // Decrease order after deleting a lesson
    //
    // Ví dụ:
    //
    // 1
    // 2 <- deleted
    // 3
    // 4
    //
    // thành:
    //
    // 1
    // 2
    // 3
    // ==========================================
    async decreaseOrderAfter(courseId, order) {
        return prisma.lesson.updateMany({
            where: {
                courseId,
                deletedAt: null,
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

    // ==========================================
    // Find previous lesson
    //
    // Tìm lesson có order lớn nhất nhưng
    // vẫn nhỏ hơn order hiện tại.
    // ==========================================
    async findPrevious(courseId, order) {
        return prisma.lesson.findFirst({
            where: {
                courseId,
                deletedAt: null,
                order: {
                    lt: order,
                },
            },
            orderBy: {
                order: "desc",
            },
        });
    },

    // ==========================================
    // Find next lesson
    //
    // Tìm lesson có order nhỏ nhất nhưng
    // vẫn lớn hơn order hiện tại.
    // ==========================================
    async findNext(courseId, order) {
        return prisma.lesson.findFirst({
            where: {
                courseId,
                deletedAt: null,
                order: {
                    gt: order,
                },
            },
            orderBy: {
                order: "asc",
            },
        });
    },

    // ==========================================
    // Swap order between two lessons
    // ==========================================
    async swapOrder(
        lessonId,
        lessonOrder,
        adjacentLessonId,
        adjacentLessonOrder
    ) {
        return prisma.$transaction(
            async (tx) => {
                // ==================================
                // Bước 1:
                // Đưa lesson hiện tại sang order tạm
                // ==================================

                const temporaryOrder =
                    -1;

                await tx.lesson.update({
                    where: {
                        id: lessonId,
                    },
                    data: {
                        order: temporaryOrder,
                    },
                });

                // ==================================
                // Bước 2:
                // Đưa lesson kế bên sang order
                // của lesson hiện tại
                // ==================================

                await tx.lesson.update({
                    where: {
                        id: adjacentLessonId,
                    },
                    data: {
                        order: lessonOrder,
                    },
                });

                // ==================================
                // Bước 3:
                // Đưa lesson hiện tại sang order
                // của lesson kế bên
                // ==================================

                return tx.lesson.update({
                    where: {
                        id: lessonId,
                    },
                    data: {
                        order: adjacentLessonOrder,
                    },
                });
            }
        );
    },
};

export default lessonRepository;
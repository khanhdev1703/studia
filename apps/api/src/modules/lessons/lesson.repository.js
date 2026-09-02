import { prisma } from "../../config/database.js";

const lessonRepository = {
    /*
     * ==========================================
     * Find lesson by ID
     * ==========================================
     */

    async findById(lessonId) {
        return prisma.lesson.findUnique({
            where: {
                id: lessonId,
            },
            include: {
                documents: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
    },

    /*
     * ==========================================
     * Find lesson by ID + Course
     * ==========================================
     *
     * Dùng để đảm bảo lesson thuộc đúng course.
     */

    async findByCourseAndId(courseId, lessonId) {
        return prisma.lesson.findFirst({
            where: {
                id: lessonId,
                courseId,
            },
        });
    },

    /*
     * ==========================================
     * Find lesson with Course
     * ==========================================
     *
     * Dùng để kiểm tra teacher sở hữu course.
     */

    async findByIdWithCourse(lessonId) {
        return prisma.lesson.findUnique({
            where: {
                id: lessonId,
            },
            include: {
                course: {
                    select: {
                        id: true,
                        teacherId: true,
                        title: true,
                        isDelete: true,
                    },
                },
            },
        });
    },

    /*
     * ==========================================
     * Find lessons by Course
     * ==========================================
     *
     * Luôn sắp xếp theo order tăng dần.
     */

    async findByCourse(courseId) {
        return prisma.lesson.findMany({
            where: {
                courseId,
            },
            orderBy: {
                order: "asc",
            },
        });
    },

    /*
     * ==========================================
     * Create lesson
     * ==========================================
     */

    async create(data) {
        return prisma.lesson.create({
            data,
        });
    },

    /*
     * ==========================================
     * Update lesson
     * ==========================================
     */

    async update(lessonId, data) {
        return prisma.lesson.update({
            where: {
                id: lessonId,
            },
            data,
        });
    },

    /*
     * ==========================================
     * Delete lesson
     * ==========================================
     *
     * Lesson hiện tại chưa có soft delete,
     * nên đây là hard delete.
     */

    async delete(lessonId) {
        return prisma.lesson.delete({
            where: {
                id: lessonId,
            },
        });
    },

    /*
     * ==========================================
     * Count lessons by Course
     * ==========================================
     */

    async countByCourse(courseId) {
        return prisma.lesson.count({
            where: {
                courseId,
            },
        });
    },

    /*
     * ==========================================
     * Find max order
     * ==========================================
     *
     * Dùng khi tạo lesson mới.
     */

    async findMaxOrderByCourse(courseId) {
        return prisma.lesson.aggregate({
            where: {
                courseId,
            },
            _max: {
                order: true,
            },
        });
    },

    /*
     * ==========================================
     * Update lesson order
     * ==========================================
     */

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

    async moveLesson({
        lessonId,
        courseId,
        currentOrder,
        direction,
    }) {
        const adjacentLesson =
            await prisma.lesson.findFirst({
                where: {
                    courseId,
                    order:
                        direction === "up"
                            ? {
                                lt: currentOrder,
                            }
                            : {
                                gt: currentOrder,
                            },
                },
                orderBy: {
                    order:
                        direction === "up"
                            ? "desc"
                            : "asc",
                },
            });

        // ==========================================
        // Already at first / last position
        // ==========================================

        if (!adjacentLesson) {
            return prisma.lesson.findUnique({
                where: {
                    id: lessonId,
                },
            });
        }

        // ==========================================
        // Swap order
        // ==========================================

        return prisma.$transaction(async (tx) => {
            // Tạm thời đưa lesson hiện tại về order âm
            await tx.lesson.update({
                where: {
                    id: lessonId,
                },
                data: {
                    order: -1,
                },
            });

            // Đưa lesson kế bên vào vị trí hiện tại
            await tx.lesson.update({
                where: {
                    id: adjacentLesson.id,
                },
                data: {
                    order: currentOrder,
                },
            });

            // Đưa lesson hiện tại vào vị trí của lesson kế bên
            return tx.lesson.update({
                where: {
                    id: lessonId,
                },
                data: {
                    order: adjacentLesson.order,
                },
            });
        });
    }
};

export default lessonRepository;
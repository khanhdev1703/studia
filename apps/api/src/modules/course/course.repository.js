import { prisma } from "../../config/database.js";

const courseRepository = {
    async create(data) {
        return prisma.course.create({
            data,
        });
    },

    // Có thể lấy cả active và deleted
    async findById(id) {
        return prisma.course.findUnique({
            where: {
                id,
            },
        });
    },

    // Chỉ lấy Course đang active
    async findActiveById(id) {
        return prisma.course.findFirst({
            where: {
                id,
                deletedAt: null,
            },
        });
    },

    // Chỉ lấy Course active của Teacher
    async findByTeacherId(teacherId) {
        return prisma.course.findMany({
            where: {
                teacherId,
                deletedAt: null,
            },

            include: {
                _count: {
                    select: {
                        lessons: true,
                    },
                },
            },

            orderBy: {
                createdAt: "desc",
            },
        });
    },

    // Student → Chỉ lấy Course đã published
    async findPublishedCourses({ search } = {}) {
        const where = {
            status: "PUBLISHED",
            deletedAt: null,
        };

        // Search theo tên khóa học
        if (search?.trim()) {
            where.title = {
                contains: search.trim(),
                mode: "insensitive",
            };
        }

        return prisma.course.findMany({
            where,

            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                    },
                },

                lessons: {
                    where: {
                        deletedAt: null,
                    },
                    select: {
                        duration: true,
                    },
                },

                _count: {
                    select: {
                        lessons: {
                            where: {
                                deletedAt: null,
                            },
                        },
                    },
                },
            },

            orderBy: {
                createdAt: "desc",
            },
        });
    },

    async findPublishedById(id) {
        return prisma.course.findFirst({
            where: {
                id,
                status: "PUBLISHED",
                deletedAt: null,
            },

            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                    },
                },

                lessons: {
                    where: {
                        deletedAt: null,
                    },

                    select: {
                        id: true,
                        title: true,
                        description: true,
                        duration: true,
                        order: true,
                        isLocked: true,
                        video: true
                    },

                    orderBy: {
                        order: "asc",
                    },
                },

                _count: {
                    select: {
                        lessons: {
                            where: {
                                deletedAt: null,
                            },
                        },
                    },
                },
            },
        });
    },

    async updateById(id, data) {
        return prisma.course.update({
            where: {
                id,
            },

            data,
        });
    },

    async softDeleteById(id) {
        return prisma.course.update({
            where: {
                id,
            },

            data: {
                deletedAt: new Date(),
            },
        });
    },

    async restoreById(id) {
        return prisma.course.update({
            where: {
                id,
            },

            data: {
                deletedAt: null,
            },
        });
    },

    async deleteById(id) {
        return prisma.course.delete({
            where: {
                id,
            },
        });
    },
};

export default courseRepository;
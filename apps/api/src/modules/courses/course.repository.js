import { prisma } from "../../config/database.js";

const courseRepository = {
    /*
     * CREATE
     */

    create(data) {
        return prisma.course.create({
            data,
        });
    },

    /*
     * READ - SINGLE
     */

    // Lấy khóa học đang hoạt động theo ID
    findById(id) {
        return prisma.course.findFirst({
            where: {
                id,
                isDelete: false,
            },
        });
    },

    // Lấy khóa học theo ID, bao gồm cả khóa học đã xóa
    findByIdIncludeDeleted(id) {
        return prisma.course.findUnique({
            where: {
                id,
            },
        });
    },

    // Lấy khóa học kèm teacher và thống kê
    findByIdWithDetails(id) {
        return prisma.course.findFirst({
            where: {
                id,
                isDelete: false,
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                    },
                },

                _count: {
                    select: {
                        lessons: true,
                        enrollments: true,
                    },
                },
            },
        });
    },

    /*
     * READ - TEACHER
     */

    // Lấy danh sách khóa học đang hoạt động của teacher
    findCoursesByTeacher({
        teacherId,
        skip,
        take,
    } = {}) {
        return prisma.course.findMany({
            where: {
                teacherId,
                isDelete: false,
            },
            skip,
            take,
            orderBy: {
                createdAt: "desc",
            },
        });
    },

    // Lấy một khóa học cụ thể của teacher
    findCourseByTeacher(courseId, teacherId) {
        return prisma.course.findFirst({
            where: {
                id: courseId,
                teacherId,
                isDelete: false,
            },
        });
    },

    // Đếm số khóa học đang hoạt động của teacher
    countCoursesByTeacher(teacherId) {
        return prisma.course.count({
            where: {
                teacherId,
                isDelete: false,
            },
        });
    },

    /*
     * READ - PUBLIC
     */

    // Tìm kiếm khóa học đang mở
    findPublishedCourses({
        search,
        skip,
        take,
    } = {}) {
        const where = {
            status: true,
            isDelete: false,
        };

        if (search?.trim()) {
            where.title = {
                contains: search.trim(),
                mode: "insensitive",
            };
        }

        return prisma.course.findMany({
            where,
            skip,
            take,
            orderBy: {
                createdAt: "desc",
            },
        });
    },

    // Đếm số khóa học đang mở
    countPublishedCourses({ search } = {}) {
        const where = {
            status: true,
            isDelete: false,
        };

        if (search?.trim()) {
            where.title = {
                contains: search.trim(),
                mode: "insensitive",
            };
        }

        return prisma.course.count({
            where,
        });
    },

    /*
     * READ - ADMIN
     */

    // Lấy tất cả khóa học đang hoạt động
    findActiveCourses({
        skip,
        take,
    } = {}) {
        return prisma.course.findMany({
            where: {
                isDelete: false,
            },
            skip,
            take,
            orderBy: {
                createdAt: "desc",
            },
        });
    },

    // Lấy các khóa học đã soft delete
    findDeletedCourses({
        skip,
        take,
    } = {}) {
        return prisma.course.findMany({
            where: {
                isDelete: true,
            },
            skip,
            take,
            orderBy: {
                updatedAt: "desc",
            },
        });
    },

    /*
     * UPDATE
     */

    update(id, data) {
        return prisma.course.update({
            where: {
                id,
            },
            data,
        });
    },

    /*
     * SOFT DELETE
     */

    softDelete(id) {
        return prisma.course.update({
            where: {
                id,
            },
            data: {
                isDelete: true,
            },
        });
    },

    /*
     * RESTORE
     */

    restore(id) {
        return prisma.course.update({
            where: {
                id,
            },
            data: {
                isDelete: false,
            },
        });
    },
};

export default courseRepository;
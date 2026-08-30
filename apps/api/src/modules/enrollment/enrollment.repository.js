import { prisma } from "../../config/database.js";

const enrollmentRepository = {
    // ==========================================
    // Tìm enrollment theo ID
    // ==========================================

    async findById(id) {
        return prisma.enrollment.findUnique({
            where: {
                id,
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                course: {
                    select: {
                        id: true,
                        title: true,
                        teacherId: true,
                    },
                },
            },
        });
    },

    async findPendingByTeacher(teacherId) {
        return prisma.enrollment.findMany({
            where: {
                status: "PENDING",
                course: {
                    teacherId,
                },
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                course: {
                    select: {
                        id: true,
                        title: true,
                        thumbnail: true,
                    },
                },
            },
            orderBy: {
                enrolledAt: "desc",
            },
        });
    },

    // ==========================================
    // Tìm enrollment của user với course
    // ==========================================

    async findByStudentAndCourse(studentId, courseId) {
        console.log(studentId, courseId);

        return prisma.enrollment.findUnique({
            where: {
                studentId_courseId: {
                    studentId,
                    courseId,
                },
            },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        teacherId: true,
                    },
                },
            },
        });
    },

    // ==========================================
    // Tạo enrollment mới
    // ==========================================

    async create({ studentId, courseId }) {
        return prisma.enrollment.create({
            data: {
                studentId,
                courseId,
                status: "PENDING",
            },
        });
    },

    // ==========================================
    // Đưa enrollment trở lại trạng thái PENDING
    // ==========================================

    async reactivate(id) {
        return prisma.enrollment.update({
            where: {
                id,
            },
            data: {
                status: "PENDING",
                updatedAt: new Date(),
            },
        });
    },

    // ==========================================
    // Teacher approve
    // PENDING → ACTIVE
    // ==========================================

    async approve(id) {
        return prisma.enrollment.update({
            where: {
                id,
            },
            data: {
                status: "APPROVED",
                updatedAt: new Date(),
            },
        });
    },

    // ==========================================
    // Teacher reject
    // PENDING → REJECTED
    // ==========================================

    async reject(id) {
        return prisma.enrollment.update({
            where: {
                id,
            },
            data: {
                status: "REJECTED",
                updatedAt: new Date(),
            },
        });
    },

    // ==========================================
    // Student cancel
    // ACTIVE/PENDING → CANCELLED
    // ==========================================

    async cancel(id) {
        return prisma.enrollment.update({
            where: {
                id,
            },
            data: {
                status: "REJECTED",
                updatedAt: new Date(),
            },
        });
    },

    // ==========================================
    // Lấy danh sách enrollment của course
    // ==========================================

    async findByCourse(
        courseId,
        {
            status,
            skip = 0,
            take = 20,
        } = {}
    ) {
        const where = {
            courseId,
        };

        if (status) {
            where.status = status;
        }

        return prisma.enrollment.findMany({
            where,
            skip,
            take,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    },

    // ==========================================
    // Đếm enrollment của course
    // ==========================================

    async countByCourse(
        courseId,
        status
    ) {
        const where = {
            courseId,
        };

        if (status) {
            where.status = status;
        }

        return prisma.enrollment.count({
            where,
        });
    },

    // ==========================================
    // Lấy danh sách enrollment của student
    // ==========================================
    findByStudent: async (studentId, filters = {}) => {
        const { status } = filters;

        const where = {
            studentId,
        };

        if (status) {
            where.status = status;
        }

        return prisma.enrollment.findMany({
            where,

            orderBy: {
                updatedAt: "desc",
            },

            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        thumbnail: true,
                        price: true,
                        status: true,
                        teacher: true,
                        createdAt: true,
                        updatedAt: true,

                        // Progress của student
                        lessons: {
                            select: {
                                progresses: {
                                    where: {
                                        studentId,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    },
    // ==========================================
    // Đếm enrollment của student
    // ==========================================

    async countByUser(
        userId,
        status
    ) {
        const where = {
            userId,
        };

        if (status) {
            where.status = status;
        }

        return prisma.enrollment.count({
            where,
        });
    },


};

export default enrollmentRepository;
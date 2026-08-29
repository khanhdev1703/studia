import { prisma } from '../../config/database.js';

const userRepository = {
    async findById(id) {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    },

    async findByEmail(email) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    },

    async create(data) {
        return prisma.user.create({
            data,
        });
    },

    async findAll() {
        return prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    },

    async updateProfile(id, data) {
        return prisma.user.update({
            where: {
                id,
            },
            data,
        });
    },

    async updatePassword(id, password) {
        return prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            },
        });
    },

    async searchTeachers({ search } = {}) {
        const keyword = search?.trim() || "";

        const where = {
            role: "TEACHER",
        };

        if (keyword) {
            where.name = {
                contains: keyword,
                mode: "insensitive",
            };
        }

        return prisma.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                createdAt: true,

                courses: {
                    where: {
                        status: "PUBLISHED",
                        deletedAt: null,
                    },
                    select: {
                        id: true,

                        lessons: {
                            where: {
                                deletedAt: null,
                            },
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
        });
    }

};

export default userRepository;
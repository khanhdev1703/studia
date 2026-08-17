import { prisma } from '../../config/database.js';

const courseRepository = {
    async create(data) {
        return prisma.course.create({
            data,
        });
    },

    async findById(id) {
        return prisma.course.findUnique({
            where: {
                id,
            },
        });
    },

    async findByTeacherId(teacherId) {
        return prisma.course.findMany({
            where: {
                teacherId,
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

    async updateById(id, data) {
        return prisma.course.update({
            where: {
                id,
            },
            data,
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
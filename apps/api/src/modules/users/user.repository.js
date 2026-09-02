import { prisma } from "../../config/database.js";

const userRepository = {
    // Tìm user đang hoạt động theo ID
    findById(id) {
        return prisma.user.findFirst({
            where: {
                id,
                isDelete: false,
            },
        });
    },

    // Tìm user đang hoạt động theo email
    findByEmail(email) {
        return prisma.user.findFirst({
            where: {
                email,
                isDelete: false,
            },
        });
    },

    // Tìm user kể cả đã soft delete
    findByIdIncludeDeleted(id) {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    },

    // Tìm email kể cả đã soft delete
    findByEmailIncludeDeleted(email) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    },

    // Tạo user
    create(data) {
        return prisma.user.create({
            data,
        });
    },

    // Cập nhật user
    update(id, data) {
        return prisma.user.update({
            where: {
                id,
            },
            data,
        });
    },

    // Soft delete
    softDelete(id) {
        return prisma.user.update({
            where: {
                id,
            },
            data: {
                isDelete: true,
            },
        });
    },

    // Khôi phục user
    restore(id) {
        return prisma.user.update({
            where: {
                id,
            },
            data: {
                isDelete: false,
            },
        });
    },

    // Lấy danh sách user đang hoạt động
    findMany({ where = {}, skip, take, orderBy = { createdAt: "desc", }, } = {}) {
        return prisma.user.findMany({
            where: {
                ...where,
                isDelete: false,
            },
            skip,
            take,
            orderBy,
        });
    },

    // Đếm user đang hoạt động
    count(where = {}) {
        return prisma.user.count({
            where: {
                ...where,
                isDelete: false,
            },
        });
    },

    // Tìm user đang hoạt động theo code
    findByCode(studentCode) {
        return prisma.user.findFirst({
            where: {
                studentCode,
                isDelete: false,
            },
        });
    }
};

export default userRepository;
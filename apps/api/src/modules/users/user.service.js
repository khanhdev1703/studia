import userRepository from "./user.repository.js";

import AppError from "../../utils/appError.js";

import {
    hashPassword,
    comparePassword,
} from "../../utils/password.js";

const userService = {
    // Lấy thông tin user hiện tại
    async getMe(userId) {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                "Không tìm thấy người dùng",
                404
            );
        }

        const { password: _, ...safeUser } = user;

        return safeUser;
    },

    // Lấy user theo ID
    async getById(userId) {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                "Không tìm thấy người dùng",
                404
            );
        }

        const { password: _, ...safeUser } = user;

        return safeUser;
    },

    // Cập nhật thông tin cá nhân
    async updateMe(userId, { name }) {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                "Không tìm thấy người dùng",
                404
            );
        }

        const data = {};

        if (name !== undefined) {
            const trimmedName = name.trim();

            if (!trimmedName) {
                throw new AppError(
                    "Họ tên không được để trống",
                    400
                );
            }

            data.name = trimmedName;
        }

        const updatedUser = await userRepository.update(
            userId,
            data
        );

        const { password: _, ...safeUser } = updatedUser;

        return safeUser;
    },

    // Đổi mật khẩu
    async changePassword(userId, { currentPassword, newPassword }) {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                "Không tìm thấy người dùng",
                404
            );
        }

        const isPasswordValid = await comparePassword(
            currentPassword,
            user.password
        );

        if (!isPasswordValid) {
            throw new AppError(
                "Mật khẩu hiện tại không chính xác",
                400
            );
        }

        if (newPassword.length < 6) {
            throw new AppError(
                "Mật khẩu mới phải có ít nhất 6 ký tự",
                400
            );
        }

        if (currentPassword === newPassword) {
            throw new AppError(
                "Mật khẩu mới phải khác mật khẩu hiện tại",
                400
            );
        }

        const hashedPassword = await hashPassword(
            newPassword
        );

        await userRepository.update(userId, {
            password: hashedPassword,
        });
    },

    // Soft delete user
    async delete(userId) {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                "Không tìm thấy người dùng",
                404
            );
        }

        await userRepository.softDelete(userId);
    },

    // Khôi phục user
    async restore(userId) {
        const user =
            await userRepository.findByIdIncludeDeleted(userId);

        if (!user) {
            throw new AppError(
                "Không tìm thấy người dùng",
                404
            );
        }

        if (!user.isDelete) {
            throw new AppError(
                "Tài khoản đang hoạt động",
                400
            );
        }

        await userRepository.restore(userId);
    },
};

export default userService;
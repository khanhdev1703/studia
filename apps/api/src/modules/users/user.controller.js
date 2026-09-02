import userService from "./user.service.js";
import AppError from "../../utils/appError.js";

const userController = {
    // GET /users/me
    async getMe(req, res, next) {

        try {
            const user = await userService.getMe(
                req.user.id
            );

            res.status(200).json({
                success: true,
                message: "Lấy thông tin người dùng thành công.",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    },

    // GET /users/:id
    async getById(req, res, next) {
        try {
            const { id } = req.params;

            const user = await userService.getById(id);

            res.status(200).json({
                success: true,
                message: "Lấy thông tin người dùng thành công.",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    },

    // PUT /users/me
    async updateMe(req, res, next) {
        try {
            const { name } = req.body;

            if (name === undefined) {
                throw new AppError(
                    "Không có thông tin cần cập nhật.",
                    400
                );
            }

            const user = await userService.updateMe(
                req.user.userId,
                {
                    name,
                }
            );

            res.status(200).json({
                success: true,
                message: "Cập nhật thông tin thành công.",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    },

    // PUT /users/me/password
    async changePassword(req, res, next) {
        try {
            const {
                currentPassword,
                newPassword,
            } = req.body;

            if (!currentPassword || !newPassword) {
                throw new AppError(
                    "Vui lòng nhập mật khẩu hiện tại và mật khẩu mới.",
                    400
                );
            }

            await userService.changePassword(
                req.user.userId,
                {
                    currentPassword,
                    newPassword,
                }
            );

            res.status(200).json({
                success: true,
                message: "Đổi mật khẩu thành công.",
            });
        } catch (error) {
            next(error);
        }
    },

    // DELETE /users/me
    async deleteMe(req, res, next) {
        try {
            await userService.delete(
                req.user.userId
            );

            res.status(200).json({
                success: true,
                message: "Tài khoản đã được xóa.",
            });
        } catch (error) {
            next(error);
        }
    },

    // PATCH /users/:id/restore
    async restore(req, res, next) {
        try {
            const { id } = req.params;

            await userService.restore(id);

            res.status(200).json({
                success: true,
                message: "Khôi phục tài khoản thành công.",
            });
        } catch (error) {
            next(error);
        }
    },
};

export default userController;
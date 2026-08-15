import userService from './userService.js';

const userController = {
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();

            res.status(200).json({
                success: true,
                data: users,
            });
        } catch (error) {
            next(error);
        }
    },

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;

            const user = await userService.getUserById(id);

            res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            next(error);
        }
    },

    async getMe(req, res, next) {
        try {
            const user = await userService.getUserById(
                req.user.userId
            );

            res.status(200).json({
                success: true,
                message: 'Lấy thông tin người dùng thành công.',
                data: {
                    user,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    async updateProfile(req, res, next) {
        try {
            const userId = req.user.userId;
            const { name } = req.body;

            const user = await userService.updateProfile(
                userId,
                { name }
            );

            res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            next(error);
        }
    },

    async updatePassword(req, res, next) {
        try {
            const userId = req.user.userId;

            const {
                currentPassword,
                newPassword,
            } = req.body;

            await userService.updatePassword(
                userId,
                {
                    currentPassword,
                    newPassword,
                }
            );

            res.status(200).json({
                success: true,
                data: null,
                message: 'Password updated successfully',
            });
        } catch (error) {
            next(error);
        }
    },
};

export default userController;
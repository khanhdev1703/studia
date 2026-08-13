import authService from './authService.js';

const authController = {
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                const error = new Error(
                    'Vui lòng nhập đầy đủ họ tên, email và mật khẩu.'
                );

                error.statusCode = 400;
                throw error;
            }

            if (password.length < 6) {
                const error = new Error(
                    'Mật khẩu phải có ít nhất 6 ký tự.'
                );

                error.statusCode = 400;
                throw error;
            }

            const user = await authService.register({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password,
            });

            res.status(201).json({
                success: true,
                message: 'Đăng ký tài khoản thành công.',
                data: user,
            });
        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                const error = new Error(
                    'Vui lòng nhập email và mật khẩu.'
                );

                error.statusCode = 400;
                throw error;
            }

            const result = await authService.login({
                email: email.trim().toLowerCase(),
                password,
            });

            res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công.',
                data: result,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default authController;
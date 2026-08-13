import jwt from 'jsonwebtoken';

import env from '../config/env.js';

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Không có Authorization header
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Vui lòng đăng nhập để tiếp tục.',
            });
        }

        // Kiểm tra format: Bearer <token>
        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer' || !token) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token không hợp lệ.',
            });
        }

        // Verify JWT
        const decoded = jwt.verify(token, env.JWT_SECRET);

        // Lưu thông tin user vào request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token không hợp lệ hoặc đã hết hạn.',
        });
    }
};

export default auth;
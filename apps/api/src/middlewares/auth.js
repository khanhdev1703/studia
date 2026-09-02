import jwt from "jsonwebtoken";

import env from "../config/env.js";
import AppError from "../utils/appError.js";

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Không có Authorization header
        if (!authHeader) {
            throw new AppError(
                "Vui lòng đăng nhập để tiếp tục.",
                401
            );
        }

        // Kiểm tra format: Bearer <token>
        const [type, token] = authHeader.split(" ");

        if (type !== "Bearer" || !token) {
            throw new AppError(
                "Authorization token không hợp lệ.",
                401
            );
        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            env.JWT_SECRET
        );

        // Lưu thông tin user vào request
        req.user = decoded;

        next();
    } catch (error) {
        // Nếu đã là AppError thì giữ nguyên
        if (error instanceof AppError) {
            return next(error);
        }

        // Lỗi từ jwt.verify()
        return next(
            new AppError(
                "Token không hợp lệ hoặc đã hết hạn.",
                401
            )
        );
    }
};

export default auth;
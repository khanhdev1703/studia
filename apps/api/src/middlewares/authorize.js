import AppError from "../utils/appError.js";

const authorize = (...allowedRoles) => {

    return (req, res, next) => {
        if (!req.user) {
            return next(
                new AppError(
                    "Vui lòng đăng nhập để tiếp tục.",
                    401
                )
            );
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(
                new AppError(
                    "Bạn không có quyền thực hiện thao tác này.",
                    403
                )
            );
        }

        next();
    };
};

export default authorize;
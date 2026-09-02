const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Đã xảy ra lỗi máy chủ",
    });
};

export default errorMiddleware;
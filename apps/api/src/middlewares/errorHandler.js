const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500
                ? "Lỗi hệ thống"
                : err.message,
    });
};

export default errorHandler;
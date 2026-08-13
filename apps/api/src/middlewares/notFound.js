const notFound = (req, res) => {
    res.status(404).json({
        message: 'Không tìm thấy tài nguyên yêu cầu.',
        error_message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
};

export default notFound;
import rateLimit from 'express-rate-limit';

// Rate limit chung cho toàn bộ API
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100,

    standardHeaders: 'draft-8',
    legacyHeaders: false,

    message: {
        success: false,
        message: 'Quá nhiều request. Vui lòng thử lại sau.',
    },
});

// Rate limit riêng cho Auth
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 10,

    standardHeaders: 'draft-8',
    legacyHeaders: false,

    message: {
        success: false,
        message: 'Quá nhiều lần thử. Vui lòng thử lại sau 15 phút.',
    },
});

export {
    globalLimiter,
    authLimiter,
};
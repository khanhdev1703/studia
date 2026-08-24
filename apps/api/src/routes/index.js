import { Router } from 'express';
import userRoutes from '../modules/users/user.routes.js';
import authRoutes from '../modules/auth/auth.routes.js';
import courseRoutes from '../modules/course/course.routes.js';
import lessonRoutes from '../modules/lesson/lesson.routes.js';

const router = Router();

// ==========================================
// API root
// ==========================================

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API',
    });
});

// ==========================================
// Health check
// ==========================================

router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is healthy',
    });
});

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/course', courseRoutes);
router.use('/lesson', lessonRoutes);

export default router;
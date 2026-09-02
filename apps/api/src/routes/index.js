import { Router } from 'express';
import userRoutes from '../modules/users/user.routes.js';
import authRoutes from '../modules/auth/auth.routes.js';
import courseRoutes from '../modules/courses/course.routes.js';
import lessonRoutes from '../modules/lessons/lesson.routes.js';
import enrollmentRoutes from '../modules/enrollments/enrollment.routes.js';
import learningRoutes from '../modules/learning/learning.routes.js';
import documentRoutes from '../modules/documents/document.routes.js';

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

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/lessons', lessonRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use("/learning", learningRoutes);
router.use("/documents", documentRoutes);

export default router;
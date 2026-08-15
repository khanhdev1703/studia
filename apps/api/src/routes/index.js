import { Router } from 'express';
import userRoutes from '../modules/users/user.routes.js';
import authRoutes from '../modules/auth/auth.routes.js';

const router = Router();

// ==========================================
// API root
// ==========================================

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Studia API',
    });
});

// ==========================================
// Health check
// ==========================================

router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Studia API is healthy',
    });
});

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

export default router;
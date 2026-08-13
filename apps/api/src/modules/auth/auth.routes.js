import { Router } from 'express';

import auth from '../../middlewares/auth.js';
import { authLimiter } from '../../middlewares/rateLimiter.js';
import authController from './authController.js';

const router = Router();

router.post(
    '/register',
    authLimiter,
    authController.register
);

router.post(
    '/login',
    authLimiter,
    authController.login
);

export default router;
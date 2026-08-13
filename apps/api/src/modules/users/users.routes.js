import { Router } from 'express';

import auth from '../../middlewares/auth.js';
import authorize from '../../middlewares/authorize.js';

import userController from './userController.js';

const router = Router();

router.use(auth);

router.get(
    '/',
    authorize('ADMIN'),
    userController.getAllUsers
);

router.get(
    '/me',
    userController.getMe
);

router.get(
    '/:id',
    authorize('ADMIN'),
    userController.getUserById
);

export default router;
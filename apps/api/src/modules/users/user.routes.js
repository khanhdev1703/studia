import { Router } from 'express';

import auth from '../../middlewares/auth.js';
import authorize from '../../middlewares/authorize.js';

import userController from './user.controller.js';

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

router.put(
    '/me',
    userController.updateProfile
);

router.put(
    '/me/password',
    userController.updatePassword
);

router.get(
    '/:id',
    authorize('ADMIN'),
    userController.getUserById
);

export default router;
import { Router } from "express";

import userController from "./user.controller.js";

import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";

const router = Router();

/*
 * User hiện tại
 */

// Lấy thông tin bản thân
router.get(
    "/me",
    auth,
    userController.getMe
);

// Cập nhật thông tin bản thân
router.put(
    "/me",
    auth,
    userController.updateMe
);

// Đổi mật khẩu
router.put(
    "/me/password",
    auth,
    userController.changePassword
);

// Xóa tài khoản của chính mình
router.delete(
    "/me",
    auth,
    userController.deleteMe
);

/*
 * User theo ID
 */

// Lấy thông tin user
router.get(
    "/:id",
    auth,
    userController.getById
);

/*
 * Admin
 */

// Khôi phục user đã soft delete
router.patch(
    "/:id/restore",
    auth,
    authorize("ADMIN"),
    userController.restore
);

export default router;
import { Router } from "express";

import auth from "../../middlewares/auth.js";

import authorize from "../../middlewares/authorize.js";

import userController from "./user.controller.js";

const router = Router();

router.use(auth);

// Admin - lấy danh sách users
router.get(
    "/",
    authorize("ADMIN"),
    userController.getAllUsers
);

// Current user
router.get(
    "/me",
    userController.getMe
);

router.put(
    "/me",
    userController.updateProfile
);

router.put(
    "/me/password",
    userController.updatePassword
);

// Student - tìm kiếm giáo viên
router.get(
    "/teachers",
    authorize("STUDENT"),
    userController.searchTeachers
);

// Teacher - tìm kiếm học sinh
// router.get(
//     "/students",
//     authorize("TEACHER"),
//     userController.searchStudents
// );

// Admin - lấy user theo ID
router.get(
    "/:id",
    authorize("ADMIN"),
    userController.getUserById
);

export default router;
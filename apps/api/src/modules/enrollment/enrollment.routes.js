import { Router } from "express";

import enrollmentController from "./enrollment.controller.js";

import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";

const router = Router();
router.use(auth);

// ==========================================
// Student
// ==========================================

// Đăng ký khóa học
// POST /enrollment/:courseId
router.post(
    "/:courseId",
    enrollmentController.enroll
);

// Lấy trạng thái đăng ký của bản thân
// GET /enrollment/course/:courseId
router.get(
    "/course/:courseId",
    enrollmentController.getByCourse
);

// Lấy danh sách khóa học đã đăng ký
// GET /enrollment/me
router.get(
    "/me",
    enrollmentController.getMyEnrollments
);

// Hủy yêu cầu đăng ký
// DELETE /enrollment/:courseId
router.delete(
    "/:courseId",
    enrollmentController.cancel
);

// ==========================================
// Teacher
// ==========================================

// Lấy danh sách enrollment của khóa học
// GET /enrollment/teacher/course/:courseId
router.get(
    "/",
    authorize("TEACHER"),
    enrollmentController.getTeacherPendingRequests
);

// Duyệt enrollment
// PATCH /enrollment/:enrollmentId/approve
router.patch(
    "/:enrollmentId/approve",
    authorize("TEACHER"),
    enrollmentController.approve
);

// Từ chối enrollment
// PATCH /enrollment/:enrollmentId/cancel
router.patch(
    "/:enrollmentId/reject",
    authorize("TEACHER"),
    enrollmentController.reject
);

export default router;
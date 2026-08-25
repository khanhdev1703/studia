import { Router } from "express";

import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";

import lessonController from "./lesson.controller.js";

import { videoUpload } from "../../middlewares/upload.js";

const router = Router();

router.use(auth);

// ================================
// Lesson
// ================================

// Tạo lesson
router.post(
    "/course/:courseId",
    authorize("TEACHER"),
    videoUpload.single("video"),
    lessonController.createLesson
);

// Lấy danh sách lesson của course
router.get(
    "/course/:courseId",
    lessonController.getLessonsByCourse
);

// Lấy chi tiết một lesson
router.get(
    "/:id",
    lessonController.getLessonById
);

// Cập nhật lesson
router.put(
    "/:id",
    authorize("TEACHER"),
    videoUpload.single("video"),
    lessonController.updateLesson
);

// Soft delete lesson
router.delete(
    "/:id",
    authorize("TEACHER"),
    lessonController.deleteLesson
);

// Khôi phục lesson đã xóa
router.patch(
    "/:id/restore",
    authorize("TEACHER"),
    lessonController.restoreLesson
);

// Khóa / mở khóa lesson
router.patch(
    "/:id/lock",
    authorize("TEACHER"),
    lessonController.toggleLock
);

// Di chuyển lesson lên / xuống một vị trí
router.put(
    "/:id/move",
    authorize("TEACHER"),
    lessonController.moveLesson
);

export default router;
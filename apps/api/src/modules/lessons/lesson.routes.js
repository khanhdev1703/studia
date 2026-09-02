import { Router } from "express";

import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";
import { videoUpload } from "../../middlewares/upload.js";

import lessonController from "./lesson.controller.js";

const router = Router();

router.use(auth);

// ==========================================
// Lesson
// ==========================================

// Tạo lesson cho course
// POST /lesson/course/:courseId
router.post(
    "/course/:courseId",
    authorize("TEACHER"),
    videoUpload.single("video"),
    lessonController.createLesson
);

// Lấy danh sách lesson của course
// GET /lesson/course/:courseId
router.get(
    "/course/:courseId",
    lessonController.getLessonsByCourse
);

// Lấy chi tiết lesson
// GET /lesson/:id
router.get(
    "/:id",
    lessonController.getLessonById
);

// Cập nhật lesson
// PUT /lesson/:id
router.put(
    "/:id",
    authorize("TEACHER"),
    videoUpload.single("video"),
    lessonController.updateLesson
);

// Xóa mềm lesson
// DELETE /lesson/:id
router.delete(
    "/:id",
    authorize("TEACHER"),
    lessonController.deleteLesson
);

// Khóa / mở khóa lesson
// PATCH /lesson/:id/lock
router.patch(
    "/:id/lock",
    authorize("TEACHER"),
    lessonController.toggleLock
);

// Di chuyển lesson
// PUT /lesson/:id/move
router.put(
    "/:id/move",
    authorize("TEACHER"),
    lessonController.moveLesson
);

export default router;
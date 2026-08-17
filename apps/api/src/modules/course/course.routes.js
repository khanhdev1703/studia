import { Router } from "express";

import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";
import { imageUpload } from "../../middlewares/upload.js";

import courseController from "./course.controller.js";

const router = Router();

router.use(auth);

// Teacher tạo khóa học
router.post(
    "/",
    authorize("TEACHER"),
    imageUpload.single("thumbnail"),
    courseController.createCourse
);

// Teacher lấy danh sách khóa học của mình
router.get(
    "/",
    authorize("TEACHER"),
    courseController.getTeacherCourses
);

// Xem một khóa học
router.get(
    "/:id",
    courseController.getCourseById
);

// Teacher cập nhật khóa học
router.put(
    "/:id",
    authorize("TEACHER"),
    imageUpload.single("thumbnail"),
    courseController.updateCourse
);

// Teacher xóa khóa học
router.delete(
    "/:id",
    authorize("TEACHER"),
    courseController.deleteCourse
);

export default router;
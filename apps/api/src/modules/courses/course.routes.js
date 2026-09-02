import { Router } from "express";

import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";
import { imageUpload } from "../../middlewares/upload.js";

import courseController from "./course.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

// Tìm kiếm khóa học đang mở
router.get(
    "/search",
    courseController.searchPublishedCourses
);


/*
|--------------------------------------------------------------------------
| TEACHER
|--------------------------------------------------------------------------
*/

// Tạo khóa học
router.post(
    "/",
    auth,
    authorize("TEACHER"),
    imageUpload.single("thumbnail"),
    courseController.createCourse
);

// Lấy danh sách khóa học của Teacher hiện tại
router.get(
    "/my",
    auth,
    authorize("TEACHER"),
    courseController.getTeacherCourses
);

// Cập nhật khóa học
router.put(
    "/:id",
    auth,
    authorize("TEACHER"),
    imageUpload.single("thumbnail"),
    courseController.updateCourse
);

// Xóa mềm khóa học
router.delete(
    "/:id",
    auth,
    authorize("TEACHER"),
    courseController.deleteCourse
);


/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

// Lấy danh sách khóa học đang hoạt động
router.get(
    "/admin/active",
    auth,
    authorize("ADMIN"),
    courseController.getActiveCourses
);

// Lấy danh sách khóa học đã xóa
router.get(
    "/admin/deleted",
    auth,
    authorize("ADMIN"),
    courseController.getDeletedCourses
);

// Khôi phục khóa học
router.patch(
    "/admin/:id/restore",
    auth,
    authorize("ADMIN"),
    courseController.restoreCourse
);


/*
|--------------------------------------------------------------------------
| PUBLIC - COURSE DETAIL
|--------------------------------------------------------------------------
*/

// Xem chi tiết khóa học
router.get(
    "/:id",
    courseController.getCourseDetails
);

export default router;
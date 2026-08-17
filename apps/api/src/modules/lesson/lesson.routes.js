import { Router } from "express";

import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";
import lessonController from "./lesson.controller.js";
import { videoUpload } from "../../middlewares/upload.js";

const router = Router();

router.use(auth);


router.post(
    "/course/:courseId",
    authorize("TEACHER"),
    videoUpload.single("video"),
    lessonController.createLesson
);

router.get(
    "/course/:courseId",
    lessonController.getLessonsByCourse
);

router.delete(
    "/:id",
    authorize("TEACHER"),
    lessonController.deleteVideo
)

export default router;
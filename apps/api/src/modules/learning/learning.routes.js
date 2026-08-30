import { Router } from "express";
import learningController from "./learning.controller.js";
import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";

const router = Router();

router.use(auth);

router.get(
  "/courses/:courseId",
  authorize("STUDENT"),
  learningController.getCourseForLearning
);

router.put(
  "/lessons/:lessonId/access",
  authorize("STUDENT"),
  learningController.accessLesson
);

router.put(
  "/lessons/:lessonId/complete",
  authorize("STUDENT"),
  learningController.completeLesson
);

export default router;
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

export default router;
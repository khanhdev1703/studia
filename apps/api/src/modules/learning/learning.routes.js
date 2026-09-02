// src/modules/learning/learning.routes.js

import { Router } from "express";

import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";

import learningController from "./learning.controller.js";

const router = Router();

// ==========================================
// Authentication
// ==========================================

router.use(auth);

// ==========================================
// Student learning
// ==========================================
// ==========================================
// STUDENT
// ==========================================

// GET /enrollment/my-courses
router.get(
  "/my-courses",
  authorize("STUDENT"),
  learningController.getMyCourses
);

// Get course for learning
// GET /learning/courses/:courseId
router.get(
  "/courses/:courseId",
  authorize("STUDENT"),
  learningController.getCourseForLearning
);

// Get course progress
// GET /learning/courses/:courseId/progress
router.get(
  "/courses/:courseId/progress",
  authorize("STUDENT"),
  learningController.getCourseProgress
);

// Access lesson
// POST /learning/lessons/:lessonId/access
router.post(
  "/lessons/:lessonId/access",
  authorize("STUDENT"),
  learningController.accessLesson
);

// Complete lesson
// POST /learning/lessons/:lessonId/complete
router.post(
  "/lessons/:lessonId/complete",
  authorize("STUDENT"),
  learningController.completeLesson
);

// Get lesson progress
// GET /learning/lessons/:lessonId/progress
router.get(
  "/lessons/:lessonId/progress",
  authorize("STUDENT"),
  learningController.getLessonProgress
);

export default router;
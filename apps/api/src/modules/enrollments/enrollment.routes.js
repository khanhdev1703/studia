// src/modules/enrollments/enrollment.routes.js

import { Router } from "express";

import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";

import enrollmentController from "./enrollment.controller.js";

const router = Router();

router.use(auth);



// ==========================================
// TEACHER
// ==========================================

// GET /enrollment/course/:courseId
router.get(
    "/course/:courseId",
    authorize("TEACHER"),
    enrollmentController.getEnrollmentsByCourse
);

// POST /enrollment/course/:courseId
router.post(
    "/course/:courseId",
    authorize("TEACHER"),
    enrollmentController.enrollStudent
);

// GET /enrollment/:enrollmentId
router.get(
    "/:enrollmentId",
    authorize("TEACHER"),
    enrollmentController.getEnrollmentById
);

// DELETE /enrollment/:enrollmentId
router.delete(
    "/:enrollmentId",
    authorize("TEACHER"),
    enrollmentController.removeEnrollment
);

export default router;
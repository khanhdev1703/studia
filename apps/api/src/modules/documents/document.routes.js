import { Router } from "express";

import auth from "../../middlewares/auth.js";
import authorize from "../../middlewares/authorize.js";
import { documentUpload } from "../../middlewares/upload.js";
import documentController from "./document.controller.js";

const router = Router();

router.use(auth);

// ==========================================
// Get documents by lesson
// GET /document/lesson/:lessonId
// ==========================================

router.get(
  "/lesson/:lessonId",
  documentController.getDocumentsByLesson
);

// ==========================================
// Upload one document
// POST /document/lesson/:lessonId
// ==========================================

router.post(
  "/lesson/:lessonId",
  authorize("TEACHER"),
  documentUpload.single("document"),
  documentController.createDocument
);

// ==========================================
// Delete document
// DELETE /document/:documentId
// ==========================================

router.delete(
  "/:documentId",
  authorize("TEACHER"),
  documentController.deleteDocument
);

// ==========================================
// Download document
// GET /document/:documentId/download
// ==========================================

router.get(
  "/:documentId/download",
  documentController.downloadDocument
);

export default router;
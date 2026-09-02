// src/modules/documents/document.controller.js

import documentService from "./document.service.js";

const documentController = {
  // ==========================================
  // Get documents by lesson
  // GET /document/lesson/:lessonId
  // ==========================================

  async getDocumentsByLesson(req, res, next) {
    try {
      const { lessonId } = req.params;
      const teacherId = req.user.id;

      const documents =
        await documentService.getDocumentsByLesson(
          lessonId,
          teacherId
        );

      return res.status(200).json({
        success: true,
        message:
          "Lấy danh sách tài liệu thành công.",
        data: documents,
      });
    } catch (error) {
      next(error);
    }
  },

  // ==========================================
  // Upload one document
  // POST /document/lesson/:lessonId
  // ==========================================

  async createDocument(req, res, next) {
    try {
      const { lessonId } = req.params;
      const teacherId = req.user.id;

      const file = req.file;


      const documents =
        await documentService.createDocument({
          lessonId,
          teacherId,
          file,
        });

      return res.status(201).json({
        success: true,
        message:
          "Tải tài liệu lên thành công.",
        data: documents,
      });
    } catch (error) {
      next(error);
    }
  },

  // ==========================================
  // Download document
  // GET /document/:documentId/download
  // ==========================================

  async downloadDocument(req, res, next) {
    try {
      const { documentId } = req.params;

      const result =
        await documentService.downloadDocument({
          documentId,
          userId: req.user.id,
          userRole: req.user.role,
        });

      return res.download(
        result.filePath,
        result.fileName,
        (error) => {
          if (
            error &&
            !res.headersSent
          ) {
            next(error);
          }
        }
      );
    } catch (error) {
      next(error);
    }
  },

  // ==========================================
  // Delete document
  // DELETE /document/:documentId
  // ==========================================

  async deleteDocument(req, res, next) {
    try {
      const { documentId } = req.params;
      const teacherId = req.user.id;

      const document =
        await documentService.deleteDocument({
          documentId,
          teacherId,
        });

      return res.status(200).json({
        success: true,
        message:
          "Xóa tài liệu thành công.",
        data: document,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default documentController;
// src/services/documentService.js

import documentAPI from "../api/documentAPI";

const documentService = {
  // ==============================
  // TEACHER
  // ==============================

  // Lấy danh sách tài liệu của bài học
  async getByLesson(lessonId) {
    const response =
      await documentAPI.getByLesson(
        lessonId
      );

    return response.data;
  },

  // Upload một tài liệu
  // Backend trả về toàn bộ danh sách documents mới nhất
  async create(lessonId, formData) {
    const response =
      await documentAPI.create(
        lessonId,
        formData
      );

    return response.data;
  },

  // Tải tài liệu
  async download(documentId) {
    const response =
      await documentAPI.download(
        documentId
      );

    return response;
  },

  // Xóa tài liệu
  async delete(documentId) {
    const response =
      await documentAPI.delete(
        documentId
      );

    return response.data;
  },
};

export default documentService;
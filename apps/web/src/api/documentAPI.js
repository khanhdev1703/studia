// src/api/documentAPI.js

import apiClient from "./apiClient";

const documentAPI = {
  // ==========================================
  // Get documents by lesson
  // GET /document/lesson/:lessonId
  // ==========================================
  getByLesson: (lessonId) =>
    apiClient.get(
      `/documents/lesson/${lessonId}`
    ),

  // ==========================================
  // Upload documents
  // POST /document/lesson/:lessonId
  // ==========================================
  create: (lessonId, formData) =>
    apiClient.post(
      `/documents/lesson/${lessonId}`,
      formData,
      {
        timeout: 0,
      }
    ),

  // ==========================================
  // Download document
  // GET /document/:documentId/download
  // ==========================================
  download: (documentId) =>
    apiClient.get(
      `/documents/${documentId}/download`,
      {
        responseType: "blob",
      }
    ),

  // ==========================================
  // Delete document
  // DELETE /document/:documentId
  // ==========================================
  delete: (documentId) =>
    apiClient.delete(
      `/documents/${documentId}`
    ),
};

export default documentAPI;
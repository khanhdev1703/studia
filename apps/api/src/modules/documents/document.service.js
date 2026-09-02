// src/modules/documents/document.service.js

import fs from "fs/promises";
import path from "path";

import documentRepository from "./document.repository.js";
import lessonRepository from "../lessons/lesson.repository.js";
import courseRepository from "../courses/course.repository.js";
import storage from "../../utils/storage/index.js";
import decodeFilename from "../../utils/decodeFilename.js";

const documentService = {
  // ==========================================
  // Get documents by lesson
  // ==========================================

  async getDocumentsByLesson(lessonId, teacherId) {
    const lesson =
      await lessonRepository.findById(lessonId);

    if (!lesson) {
      const error = new Error(
        "Không tìm thấy bài học."
      );
      error.statusCode = 404;
      throw error;
    }

    const course =
      await courseRepository.findById(
        lesson.courseId
      );

    if (!course) {
      const error = new Error(
        "Không tìm thấy khóa học."
      );
      error.statusCode = 404;
      throw error;
    }

    if (course.isDelete) {
      const error = new Error(
        "Khóa học đã bị xóa."
      );
      error.statusCode = 404;
      throw error;
    }

    if (course.teacherId !== teacherId) {
      const error = new Error(
        "Bạn không có quyền xem tài liệu của bài học này."
      );
      error.statusCode = 403;
      throw error;
    }

    return documentRepository.findByLessonId(
      lessonId
    );
  },

  // ==========================================
  // Create one document
  // ==========================================

  async createDocument({
    lessonId,
    teacherId,
    file,
  }) {
    // ------------------------------------------
    // 1. Kiểm tra file
    // ------------------------------------------

    if (!file) {
      const error = new Error(
        "Vui lòng chọn một tài liệu."
      );
      error.statusCode = 400;
      throw error;
    }

    // ------------------------------------------
    // 2. Kiểm tra lesson
    // ------------------------------------------

    const lesson =
      await lessonRepository.findById(
        lessonId
      );

    if (!lesson) {
      const error = new Error(
        "Không tìm thấy bài học."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 3. Kiểm tra course
    // ------------------------------------------

    const course =
      await courseRepository.findById(
        lesson.courseId
      );

    if (!course) {
      const error = new Error(
        "Không tìm thấy khóa học."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 4. Kiểm tra course đã bị xóa
    // ------------------------------------------

    if (course.isDelete) {
      const error = new Error(
        "Khóa học đã bị xóa."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 5. Kiểm tra quyền teacher
    // ------------------------------------------

    if (course.teacherId !== teacherId) {
      const error = new Error(
        "Bạn không có quyền thêm tài liệu vào bài học này."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 6. Upload file
    // ------------------------------------------

    let uploaded = null;
    let documentCreated = false;

    try {
      uploaded = await storage.upload(
        file,
        "documents"
      );


      // ------------------------------------------
      // 7. Tạo document trong database
      // ------------------------------------------

      await documentRepository.create({
        lessonId,
        name: decodeFilename(file.originalname),
        url: uploaded.url,
        mimeType: file.mimetype,
        size: file.size,
      });

      documentCreated = true;

      // ------------------------------------------
      // 8. Lấy toàn bộ documents mới nhất
      // ------------------------------------------

      const documents =
        await documentRepository.findByLessonId(
          lessonId
        );

      // ------------------------------------------
      // 9. Trả về toàn bộ documents
      // ------------------------------------------

      return documents;
    } catch (error) {
      // ------------------------------------------
      // 10. Rollback file nếu DB chưa tạo document
      // ------------------------------------------

      if (
        uploaded?.url &&
        !documentCreated
      ) {
        try {
          await storage.remove(
            uploaded.url
          );
        } catch (removeError) {
          console.error(
            "Không thể xóa file tài liệu sau khi tạo document thất bại:",
            removeError
          );
        }
      }

      throw error;
    }
  },

  // ==========================================
  // Download document
  // ==========================================

  async downloadDocument({
    documentId,
    userId,
    userRole,
  }) {
    // ------------------------------------------
    // 1. Tìm document
    // ------------------------------------------

    const document =
      await documentRepository.findById(
        documentId
      );

    if (!document) {
      const error = new Error(
        "Không tìm thấy tài liệu."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 2. Tìm lesson
    // ------------------------------------------

    const lesson =
      await lessonRepository.findById(
        document.lessonId
      );

    if (!lesson) {
      const error = new Error(
        "Không tìm thấy bài học."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 3. Tìm course
    // ------------------------------------------

    const course =
      await courseRepository.findById(
        lesson.courseId
      );

    if (!course) {
      const error = new Error(
        "Không tìm thấy khóa học."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 4. Kiểm tra course đã bị xóa
    // ------------------------------------------

    if (course.isDelete) {
      const error = new Error(
        "Khóa học đã bị xóa."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 5. Kiểm tra quyền
    // ------------------------------------------

    if (userRole === "ADMIN") {
      // ADMIN được phép tải
    } else if (userRole === "TEACHER") {
      if (course.teacherId !== userId) {
        const error = new Error(
          "Bạn không có quyền tải tài liệu này."
        );
        error.statusCode = 403;
        throw error;
      }
    } else if (userRole === "STUDENT") {
      // TODO:
      // Kiểm tra enrollment khi triển khai
      // quyền tải tài liệu cho Student.
    } else {
      const error = new Error(
        "Bạn không có quyền tải tài liệu này."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 6. Kiểm tra document có URL
    // ------------------------------------------

    if (!document.url) {
      const error = new Error(
        "Tài liệu không có file để tải xuống."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 7. Chuyển URL thành đường dẫn vật lý
    // ------------------------------------------

    const relativePath =
      document.url.replace(/^\/+/, "");

    const filePath = path.join(
      process.cwd(),
      relativePath
    );

    // ------------------------------------------
    // 8. Kiểm tra file thực tế tồn tại
    // ------------------------------------------

    try {
      await fs.access(filePath);
    } catch (error) {
      const fileError = new Error(
        "Không tìm thấy file tài liệu trên hệ thống."
      );

      fileError.statusCode = 404;

      throw fileError;
    }

    // ------------------------------------------
    // 9. Trả thông tin cho controller
    // ------------------------------------------

    return {
      filePath,
      fileName: document.name,
      mimeType: document.mimeType,
    };
  },

  // ==========================================
  // Delete document
  // ==========================================

  async deleteDocument({
    documentId,
    teacherId,
  }) {
    // ------------------------------------------
    // 1. Tìm document
    // ------------------------------------------

    const document =
      await documentRepository.findById(
        documentId
      );

    if (!document) {
      const error = new Error(
        "Không tìm thấy tài liệu."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 2. Tìm lesson
    // ------------------------------------------

    const lesson =
      await lessonRepository.findById(
        document.lessonId
      );

    if (!lesson) {
      const error = new Error(
        "Không tìm thấy bài học."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 3. Tìm course
    // ------------------------------------------

    const course =
      await courseRepository.findById(
        lesson.courseId
      );

    if (!course) {
      const error = new Error(
        "Không tìm thấy khóa học."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 4. Kiểm tra course đã bị xóa
    // ------------------------------------------

    if (course.isDelete) {
      const error = new Error(
        "Khóa học đã bị xóa."
      );
      error.statusCode = 404;
      throw error;
    }

    // ------------------------------------------
    // 5. Kiểm tra quyền teacher
    // ------------------------------------------

    if (course.teacherId !== teacherId) {
      const error = new Error(
        "Bạn không có quyền xóa tài liệu này."
      );
      error.statusCode = 403;
      throw error;
    }

    // ------------------------------------------
    // 6. Xóa file vật lý
    // ------------------------------------------

    try {
      await storage.remove(
        document.url
      );
    } catch (error) {
      console.error(
        "Không thể xóa file tài liệu:",
        error
      );

      throw error;
    }

    // ------------------------------------------
    // 7. Xóa document trong database
    // ------------------------------------------

    await documentRepository.deleteById(
      documentId
    );

    return document;
  },
};

export default documentService;
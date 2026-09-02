// LessonDocuments/LessonDocuments.jsx

import { useState } from "react";

import {
  Download,
  FileSpreadsheet,
  FileText,
  FileType,
  Presentation,
  Trash2,
  Upload,
} from "lucide-react";

import appToast from "../../../../../utils/toast";
import documentService from "../../../../../services/documentService";

import {
  ALLOWED_DOCUMENT_EXTENSIONS,
  ALLOWED_DOCUMENT_TYPES,
  MAX_DOCUMENT_SIZE,
} from "../../../../../utils/documentConstants";

import {
  formatFileSize,
  getDocumentIconClass,
  getDocumentName,
  getDocumentType,
  isValidDocument,
} from "../../../../../utils/document";

const LessonDocuments = ({
  lesson,
  onDocumentsUpdated,
}) => {
  const documents = Array.isArray(
    lesson?.documents
  )
    ? lesson.documents
    : [];

  const [uploading, setUploading] =
    useState(false);

  const [
    deletingDocumentId,
    setDeletingDocumentId,
  ] = useState(null);

  // ==========================================
  // Select & upload one document
  // ==========================================

  const handleSelectDocument = async (
    event
  ) => {
    const file = event.target.files?.[0];

    // Reset input để có thể chọn lại cùng một file
    event.target.value = "";

    if (!file) {
      return;
    }

    // ==========================================
    // Validate document
    // ==========================================

    const result = isValidDocument(file, {
      allowedTypes:
        ALLOWED_DOCUMENT_TYPES,
      allowedExtensions:
        ALLOWED_DOCUMENT_EXTENSIONS,
      maxSize: MAX_DOCUMENT_SIZE,
    });

    if (!result.valid) {
      appToast.error(result.message);
      return;
    }

    // ==========================================
    // Upload
    // ==========================================

    try {
      setUploading(true);

      const formData = new FormData();

      // BE dùng:
      // documentUpload.single("document")
      formData.append("document", file);

      const response =
        await documentService.create(
          lesson.id,
          formData
        );

      console.log(response);


      // BE trả về toàn bộ documents
      const updatedDocuments =
        Array.isArray(response?.data)
          ? response.data
          : null;

      if (!updatedDocuments) {
        throw new Error(
          "Dữ liệu tài liệu trả về không hợp lệ."
        );
      }

      // ==========================================
      // Update parent lesson
      // ==========================================

      onDocumentsUpdated?.(
        updatedDocuments
      );

      appToast.success(
        "Thêm tài liệu thành công."
      );
    } catch (error) {
      console.error(
        "Upload document error:",
        error
      );

      appToast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Không thể thêm tài liệu."
      );
    } finally {
      setUploading(false);
    }
  };

  // ==========================================
  // Delete document
  // ==========================================

  const handleDeleteDocument = async (
    documentId
  ) => {
    if (
      !documentId ||
      uploading ||
      deletingDocumentId
    ) {
      return;
    }

    try {
      setDeletingDocumentId(documentId);

      await documentService.delete(
        documentId
      );

      // ==================================
      // Update parent lesson
      // ==================================

      const updatedDocuments =
        documents.filter(
          (document) =>
            document.id !==
            documentId
        );

      onDocumentsUpdated?.(
        updatedDocuments
      );

      appToast.success(
        "Xóa tài liệu thành công."
      );
    } catch (error) {
      console.error(
        "Delete document error:",
        error
      );

      appToast.error(
        error?.response?.data?.message ||
        "Không thể xóa tài liệu."
      );
    } finally {
      setDeletingDocumentId(null);
    }
  };

  // ==========================================
  // Download document
  // ==========================================

  const handleDownloadDocument = async (
    document
  ) => {
    if (
      !document?.id ||
      uploading ||
      deletingDocumentId
    ) {
      return;
    }

    try {
      const response =
        await documentService.download(
          document.id
        );

      const blob = new Blob(
        [response.data],
        {
          type:
            document.mimeType ||
            "application/octet-stream",
        }
      );

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        window.document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        document.name ||
        "tai-lieu";

      window.document.body.appendChild(
        link
      );

      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Download document error:",
        error
      );

      appToast.error(
        error?.response?.data?.message ||
        "Không thể tải tài liệu."
      );
    }
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <section
      className="
                overflow-hidden
                rounded-xl
                border
                border-gray-100
                bg-white
                shadow-sm
            "
    >
      {/* Header */}
      <div
        className="
                    border-b
                    border-gray-100
                    px-4
                    py-4
                    sm:px-5
                "
      >
        <div className="flex items-start gap-3">
          <div
            className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-[#0a479d]/10
                            text-[#0a479d]
                        "
          >
            <FileText
              size={17}
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-[#252238]">
              Tài liệu bài học
            </h2>

            <p className="mt-0.5 text-xs text-gray-400">
              Quản lý tài liệu cho bài học.
            </p>
          </div>

          {/* Add button */}
          <label
            className={`
                            inline-flex
                            shrink-0
                            cursor-pointer
                            items-center
                            gap-1.5
                            rounded-lg
                            border
                            border-[#0a479d]/15
                            bg-[#0a479d]/5
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-[#0a479d]
                            transition
                            hover:border-[#0a479d]/30
                            hover:bg-[#0a479d]/10
                            ${uploading
                ? "pointer-events-none opacity-50"
                : ""
              }
                        `}
          >
            <Upload size={14} />

            {uploading
              ? "Đang thêm..."
              : "Thêm"}

            <input
              type="file"
              accept="
                                .pdf,
                                .doc,
                                .docx,
                                .ppt,
                                .pptx,
                                .xls,
                                .xlsx
                            "
              className="hidden"
              disabled={uploading}
              onChange={
                handleSelectDocument
              }
            />
          </label>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Documents */}
        {documents.length > 0 ? (
          <div className="space-y-2">
            {documents.map(
              (
                document,
                index
              ) => {
                const fileName =
                  getDocumentName(
                    document,
                    index
                  );

                const fileType =
                  getDocumentType(
                    fileName,
                    document.mimeType
                  );

                const isDeleting =
                  deletingDocumentId ===
                  document.id;

                return (
                  <div
                    key={
                      document.id ||
                      index
                    }
                    className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-lg
                                            border
                                            border-gray-100
                                            bg-gray-50/60
                                            px-3
                                            py-3
                                        "
                  >
                    {/* Icon */}
                    <div
                      className={`
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                ${getDocumentIconClass(
                        fileName,
                        document.mimeType
                      )}
                                            `}
                    >
                      <DocumentIcon
                        fileName={
                          fileName
                        }
                        mimeType={
                          document.mimeType
                        }
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p
                        className="
                                                    truncate
                                                    text-xs
                                                    font-semibold
                                                    text-gray-700
                                                "
                        title={
                          fileName
                        }
                      >
                        {fileName}
                      </p>

                      <p
                        className="
                                                    mt-0.5
                                                    text-[11px]
                                                    text-gray-400
                                                "
                      >
                        {fileType}

                        {document.size
                          ? ` · ${formatFileSize(
                            document.size
                          )}`
                          : ""}
                      </p>
                    </div>

                    {/* Actions */}
                    <div
                      className="
                                                flex
                                                shrink-0
                                                items-center
                                                gap-1
                                            "
                    >
                      {/* Download */}
                      <button
                        type="button"
                        onClick={() =>
                          handleDownloadDocument(
                            document
                          )
                        }
                        disabled={
                          uploading ||
                          deletingDocumentId
                        }
                        className="
                                                    flex
                                                    h-8
                                                    w-8
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    text-gray-400
                                                    transition
                                                    hover:bg-white
                                                    hover:text-[#0a479d]
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50
                                                "
                        title="Tải tài liệu"
                      >
                        <Download
                          size={
                            15
                          }
                        />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteDocument(
                            document.id
                          )
                        }
                        disabled={
                          uploading ||
                          isDeleting
                        }
                        className="
                                                    flex
                                                    h-8
                                                    w-8
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    text-gray-400
                                                    transition
                                                    hover:bg-red-50
                                                    hover:text-red-500
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-50
                                                "
                        title="Xóa tài liệu"
                      >
                        {isDeleting ? (
                          <span
                            className="
                                                            h-3.5
                                                            w-3.5
                                                            animate-spin
                                                            rounded-full
                                                            border-2
                                                            border-gray-200
                                                            border-t-red-500
                                                        "
                          />
                        ) : (
                          <Trash2
                            size={
                              15
                            }
                          />
                        )}
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          /* Empty */
          <div
            className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-dashed
                            border-gray-200
                            bg-gray-50/60
                            px-4
                            py-8
                            text-center
                        "
          >
            <div
              className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-gray-100
                                text-gray-400
                            "
            >
              <FileText size={18} />
            </div>

            <p
              className="
                                mt-3
                                text-xs
                                font-medium
                                text-gray-500
                            "
            >
              Chưa có tài liệu
            </p>

            <p
              className="
                                mt-1
                                text-[11px]
                                text-gray-400
                            "
            >
              Thêm tài liệu để học viên
              tham khảo.
            </p>
          </div>
        )}

        {/* Upload hint */}
        <p
          className="
                        mt-3
                        text-center
                        text-[11px]
                        text-gray-400
                    "
        >
          PDF, DOC, DOCX, PPT, PPTX, XLS,
          XLSX · tối đa 20MB/file
        </p>
      </div>
    </section>
  );
};

// ==========================================
// Document icon
// ==========================================

const DocumentIcon = ({
  fileName = "",
  mimeType = "",
}) => {
  const type = getDocumentType(
    fileName,
    mimeType
  );

  if (type === "POWERPOINT") {
    return (
      <Presentation
        size={19}
        strokeWidth={1.8}
      />
    );
  }

  if (type === "EXCEL") {
    return (
      <FileSpreadsheet
        size={19}
        strokeWidth={1.8}
      />
    );
  }

  if (type === "WORD") {
    return (
      <FileType
        size={19}
        strokeWidth={1.8}
      />
    );
  }

  return (
    <FileText
      size={19}
      strokeWidth={1.8}
    />
  );
};

export default LessonDocuments;
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  BookOpen,
  Download,
  FileSpreadsheet,
  FileText,
  FileType,
  Presentation,
} from "lucide-react";

import {
  formatFileSize,
  getDocumentIconClass,
  getDocumentName,
  getDocumentType,
} from "../../../utils/document";

import Loading from "../../../components/common/Loading";

import learningService from "../../../services/learningService";

import appToast from "../../../utils/toast";

import documentService from "../../../services/documentService";

import LearningHeader from "./learning/LearningHeader.jsx";

import LearningVideo from "./learning/LearningVideo.jsx";

import LessonDrawer from "./learning/LessonDrawer.jsx";
import DocumentCard from "./DocumentCard.jsx";

const StudentCourseDetailPage = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ==========================================
  // Get course for learning
  // ==========================================

  useEffect(() => {
    if (!courseId) {
      return;
    }

    const fetchCourse = async () => {
      try {
        setLoading(true);

        const response =
          await learningService.getCourseForLearning(
            courseId
          );

        const data = response?.data;

        if (!data) {
          throw new Error(
            "Không tìm thấy dữ liệu khóa học."
          );
        }

        console.log(data);

        const courseData = data.course;

        const lessonList = Array.isArray(
          data.lessons
        )
          ? data.lessons
          : [];

        setCourse(courseData);
        setLessons(lessonList);

        /*
         * API trả về continueLessonId.
         *
         * Nếu có -> chọn bài đó.
         * Nếu không có -> chọn bài đầu tiên.
         */

        const nextLesson = lessonList.find(
          (lesson) =>
            lesson.id === data.continueLessonId
        );

        setSelectedLesson(
          nextLesson ||
          lessonList[0] ||
          null
        );
      } catch (error) {
        console.error(
          "Get course for learning error:",
          error
        );

        appToast.error(
          error?.response?.data?.message ||
          error?.message ||
          "Không thể tải khóa học."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // ==========================================
  // Student select lesson
  // ==========================================

  const handleSelectLesson = async (lesson) => {
    if (
      !lesson ||
      lesson.id === selectedLesson?.id
    ) {
      return;
    }

    try {
      await learningService.accessLesson(
        lesson.id
      );

      setSelectedLesson(lesson);

      setDrawerOpen(false);
    } catch (error) {
      console.error(
        "Access lesson error:",
        error
      );

      appToast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Không thể mở bài học."
      );
    }
  };

  // ==========================================
  // Complete lesson
  // ==========================================

  const handleCompleteLesson = async (lessonId) => {
    if (!lessonId) {
      return;
    }

    try {
      const response =
        await learningService.completeLesson(
          lessonId
        );

      const progress = response?.data;

      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === lessonId
            ? {
              ...lesson,
              isCompleted: true,
              completedAt:
                progress?.completedAt ??
                lesson.completedAt ??
                null,
            }
            : lesson
        )
      );

      setSelectedLesson((prevLesson) =>
        prevLesson?.id === lessonId
          ? {
            ...prevLesson,
            isCompleted: true,
            completedAt:
              progress?.completedAt ??
              prevLesson.completedAt ??
              null,
          }
          : prevLesson
      );
    } catch (error) {
      console.error(
        "Complete lesson error:",
        error
      );

      appToast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Không thể cập nhật tiến độ bài học."
      );
    }
  };

  // ==========================================
  // Download document
  // ==========================================

  const handleDownloadDocument = async (
    document
  ) => {
    if (!document?.id) {
      return;
    }

    try {
      await documentService.download(
        document.id,
        document.name
      );
    } catch (error) {
      console.error(
        "Download document error:",
        error
      );

      appToast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Không thể tải tài liệu."
      );
    }
  };

  // ==========================================
  // Go back
  // ==========================================

  const handleGoBack = () => {
    window.history.back();
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#F7F7FF] p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loading text="Đang tải khoá học ..." />
        </div>
      </div>
    );
  }

  // ==========================================
  // Course not found
  // ==========================================

  if (!course) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#F7F7FF] p-4">
        <div className="text-center">
          <BookOpen
            size={36}
            className="mx-auto mb-3 text-gray-300"
          />

          <p className="text-sm font-medium text-gray-600">
            Không tìm thấy khóa học.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="min-h-full bg-[#F7F7FF]">
      {/* Header */}

      <LearningHeader
        courseTitle={course.title}
        lessonCount={lessons.length}
        onBack={handleGoBack}
        onOpenLessons={() =>
          setDrawerOpen(true)
        }
      />

      {/* Main */}

      <main className="mx-auto w-full max-w-5xl px-3 py-4 pb-8 sm:px-5 sm:py-6">
        {/* Video */}

        <LearningVideo
          lesson={selectedLesson}
          onComplete={handleCompleteLesson}
        />

        {/* Selected lesson information */}

        {selectedLesson && (
          <>
            {/* Lesson information */}

            <section className="mt-4 overflow-hidden rounded-md border border-[#E4E1F2] bg-white shadow-sm">
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    {/* Lesson label */}

                    <div className="flex items-center justify-between text-sm font-medium tracking-wide text-[#8A80D9]">
                      <span>
                        BÀI{" "}
                        {
                          selectedLesson.order
                        }
                      </span>

                      {selectedLesson.isCompleted && (
                        <span
                          className="
                                                        inline-flex
                                                        items-center
                                                        rounded-full
                                                        bg-green-50
                                                        px-2
                                                        py-0.5
                                                        text-[9px]
                                                        font-semibold
                                                        text-green-500
                                                        sm:text-[10px]
                                                    "
                        >
                          Đã hoàn thành
                        </span>
                      )}
                    </div>

                    {/* Lesson title */}

                    <h1 className="mt-0.5 text-base font-semibold leading-6 text-[#252238] sm:text-lg">
                      {
                        selectedLesson.title
                      }
                    </h1>
                  </div>
                </div>

                {/* Description */}

                {selectedLesson.description && (
                  <div className="mt-4 border-t border-[#F0EEF7] pt-4">
                    <p className="whitespace-pre-line text-justify text-sm leading-6 text-[#656277]">
                      {
                        selectedLesson.description
                      }
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Documents */}

            {selectedLesson.documents?.length > 0 && (
              <section className="mt-4">
                <div className="mb-2 px-1">
                  <h2 className="text-sm font-semibold text-[#252238]">
                    Tài liệu bài học
                  </h2>

                  <p className="mt-0.5 text-[11px] text-gray-400">
                    {selectedLesson.documents.length} tài liệu
                  </p>
                </div>

                <div className="space-y-2">
                  {selectedLesson.documents.map(
                    (document) => (
                      <DocumentCard
                        key={document.id}
                        document={document}
                        onDownload={
                          handleDownloadDocument
                        }
                      />
                    )
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Lesson Drawer */}

      <LessonDrawer
        open={drawerOpen}
        lessons={lessons}
        selectedLessonId={
          selectedLesson?.id ?? null
        }
        onSelectLesson={
          handleSelectLesson
        }
        onClose={() =>
          setDrawerOpen(false)
        }
      />
    </div>
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

export default StudentCourseDetailPage;
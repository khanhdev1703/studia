import { useEffect, useState } from "react";

import { BookOpen, CheckCircle2 } from "lucide-react";
import { useParams } from "react-router-dom";

import Loading from "../../../components/common/Loading";

import learningService from "../../../services/learningService";
import documentService from "../../../services/documentService";

import appToast from "../../../utils/toast";

import LearningHeader from "./learning/LearningHeader.jsx";
import LearningVideo from "./learning/LearningVideo.jsx";
import LessonDrawer from "./learning/LessonDrawer.jsx";
import DocumentCard from "./DocumentCard.jsx";

const StudentCourseDetailPage = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ==========================================
  // Get course for learning
  // ==========================================

  useEffect(() => {
    if (!courseId) return;

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

        const courseData = data.course;

        const lessonList = Array.isArray(
          data.lessons
        )
          ? data.lessons
          : [];

        setCourse(courseData);
        setLessons(lessonList);

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
    if (!lessonId) return;

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
    if (!document?.id) return;

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
      <div className="flex min-h-full items-center justify-center bg-[#F7F7F5] p-4">
        <Loading text="Đang tải khóa học..." />
      </div>
    );
  }

  // ==========================================
  // Course not found
  // ==========================================

  if (!course) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#F7F7F5] p-4">
        <div className="w-full max-w-sm rounded-2xl border border-[#E4E4E7] bg-white p-6 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F4F4F5] text-[#71717A]">
            <BookOpen
              size={20}
              strokeWidth={1.8}
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-[#18181B]">
            Không tìm thấy khóa học
          </p>

          <p className="mt-1.5 text-xs leading-5 text-[#71717A]">
            Khóa học không tồn tại hoặc
            bạn không có quyền truy cập.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F7F7F5]">
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

      <main className="mx-auto w-full max-w-5xl px-3 py-4 pb-10 sm:px-5 sm:py-6">
        {/* Video */}

        <LearningVideo
          lesson={selectedLesson}
          onComplete={handleCompleteLesson}
        />

        {selectedLesson && (
          <div className="mt-4 space-y-4">
            {/* Lesson info */}

            <section className="overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white">
              <div className="p-3 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-xs font-semibold tabular-nums text-[#2563EB]">
                    {String(selectedLesson.order).padStart(2, "0")}
                  </div>

                  <h1 className="min-w-0 flex-1 truncate text-sm font-semibold leading-6 tracking-tight text-slate-700 sm:text-lg">
                    {selectedLesson.title}
                  </h1>

                  {selectedLesson.isCompleted && (
                    <CheckCircle2
                      size={20}
                      strokeWidth={2.2}
                      className="shrink-0 text-[#16A34A]"
                      aria-label="Đã hoàn thành"
                    />
                  )}
                </div>

                {selectedLesson.description && (
                  <div className="mt-3 border-t border-[#F4F4F5] pt-3">
                    <p className="whitespace-pre-line text-sm leading-6 text-[#52525B]">
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
              <section className="mt-4 overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white">
                <div className="flex items-center justify-between border-b border-[#F4F4F5] px-4 py-3.5 sm:px-5">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-[#18181B]">
                      Tài liệu
                    </h2>

                    <span className="rounded-md bg-[#EFF6FF] px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-[#2563EB]">
                      {selectedLesson.documents.length}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-[#F4F4F5]">
                  {selectedLesson.documents.map((document) => (
                    <DocumentCard
                      key={document.id}
                      document={document}
                      onDownload={handleDownloadDocument}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Lesson drawer */}

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

export default StudentCourseDetailPage;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BookOpen,
  ChevronRight,
  FileText,
} from "lucide-react";

import Loading from "../../../components/common/Loading";
import learningService from "../../../services/learningService";
import appToast from "../../../utils/toast";
import getUrl from "../../../utils/getUrl";

import LearningHeader from "./learning/LearningHeader.jsx";
import LearningVideo from "./learning/LearningVideo.jsx";
import LessonDrawer from "./learning/LessonDrawer.jsx";

const StudentCourseDetailPage = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  console.log(lessons);

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

  /*
   * Student chọn một bài học.
   */
  const handleSelectLesson = async (lesson) => {
    if (!lesson || lesson.isLocked || lesson.id === selectedLesson.id) {
      return;
    }

    try {
      learningService.accessLesson(lesson.id);

      setSelectedLesson(lesson);
      setDrawerOpen(false);
    } catch (error) {
      console.error("Access lesson error:", error);

      appToast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Không thể mở bài học."
      );
    }
  };

  /*
   * LearningVideo gọi hàm này khi bài học hoàn thành.
   */
  const handleCompleteLesson = async (lessonId) => {
    if (!lessonId) {
      return;
    }

    try {
      await learningService.completeLesson(lessonId);
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === lessonId
            ? {
              ...lesson,
              isCompleted: true,
            }
            : lesson
        )
      );

      setSelectedLesson((prevLesson) =>
        prevLesson?.id === lessonId
          ? {
            ...prevLesson,
            isCompleted: true,
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

  const handleGoBack = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#F7F7FF] p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loading text="Đang tải khoá học ..." />
        </div>
      </div>
    );
  }

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
                  {/* Lesson information */}
                  <div className="min-w-0 flex-1">
                    {/* Lesson label */}
                    <span className="flex align-center justify-between text-sm font-medium tracking-wide text-[#8A80D9]">
                      BÀI {selectedLesson.order}
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
                    </span>

                    {/* Lesson title */}
                    <h1 className="mt-0.5 text-base font-semibold leading-6 text-[#252238] sm:text-lg">
                      {selectedLesson.title}
                    </h1>

                    {/* Completed tag */}

                  </div>

                </div>

                {/* Description */}
                {selectedLesson.description && (
                  <div className="mt-4 border-t border-[#F0EEF7] pt-4">
                    <p className="whitespace-pre-line text-justify text-sm leading-6 text-[#656277]">
                      {selectedLesson.description}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Document */}

            {selectedLesson.document && (
              <section className="mt-3 rounded-md border border-[#E4E1F2] bg-white shadow-sm">
                <a
                  href={getUrl(
                    selectedLesson.document
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="
                                        flex
                                        items-center
                                        gap-3
                                        p-4
                                        transition
                                        hover:bg-[#FAF9FF]
                                        sm:p-5
                                    "
                >
                  <div
                    className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-md
                                            bg-[#F0EEFF]
                                            text-[#6C5CE7]
                                        "
                  >
                    <FileText size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#252238]">
                      Tài liệu bài học
                    </p>

                    <p className="mt-0.5 text-[11px] text-gray-400">
                      Mở tài liệu
                    </p>
                  </div>

                  <ChevronRight
                    size={17}
                    className="shrink-0 text-gray-300"
                  />
                </a>
              </section>
            )}
          </>
        )}
      </main>

      {/* Lesson Drawer */}

      <LessonDrawer
        open={drawerOpen}
        lessons={lessons}
        selectedLessonId={selectedLesson?.id ?? null}
        onSelectLesson={handleSelectLesson}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default StudentCourseDetailPage;
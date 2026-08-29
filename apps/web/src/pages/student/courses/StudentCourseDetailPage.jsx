import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  FileText,
  Loader2,
  Play,
  X,
} from "lucide-react";

import learningService from "../../../services/learningService";
import appToast from "../../../utils/toast";
import formatDuration from "../../../utils/formatDuration";
import getUrl from "../../../utils/getUrl";

const StudentCourseDetailPage = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      const lessonList = Array.isArray(data.lessons)
        ? data.lessons
        : [];

      setCourse(courseData);
      setLessons(lessonList);

      const firstAvailableLesson =
        lessonList.find(
          (lesson) => !lesson.isLocked
        );

      setSelectedLesson(
        firstAvailableLesson || null
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

  useEffect(() => {
    if (!courseId) {
      return;
    }

    fetchCourse();
  }, [courseId]);

  const handleSelectLesson = (lesson) => {
    if (lesson.isLocked) {
      return;
    }

    setSelectedLesson(lesson);
    setDrawerOpen(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#F7F7FF] p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2
            size={18}
            className="animate-spin"
          />
          Đang tải khóa học...
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
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-3 sm:px-5">
          <button
            type="button"
            onClick={() =>
              window.history.back()
            }
            className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            text-gray-500
                            transition
                            hover:bg-gray-100
                            hover:text-gray-700
                        "
            aria-label="Quay lại"
          >
            <ArrowLeft size={19} />
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#252238]">
              {course.title}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setDrawerOpen(true)
            }
            className="
                            flex
                            h-9
                            shrink-0
                            items-center
                            gap-1.5
                            rounded-md
                            border
                            border-[#DED9FF]
                            bg-[#F5F3FF]
                            px-2.5
                            text-xs
                            font-medium
                            text-[#6C5CE7]
                            transition
                            hover:bg-[#ECE9FF]
                        "
            aria-label="Danh sách bài học"
          >
            <BookOpen size={16} />

            <span className="hidden sm:inline">
              Bài học
            </span>

            <span className="text-[10px] text-[#8A80D9]">
              {lessons.length}
            </span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-5xl px-3 py-4 pb-8 sm:px-5 sm:py-6">
        {/* Video */}
        <section className="overflow-hidden rounded-lg border border-[#302C4D] bg-[#17152A] shadow-sm">
          <div className="relative aspect-video w-full">
            {selectedLesson ? (
              selectedLesson.video ? (
                <video
                  key={selectedLesson.id}
                  className="h-full w-full object-contain"
                  controls
                  controlsList="nodownload noplaybackrate"
                  disablePictureInPicture
                  playsInline
                >
                  <source
                    src={getUrl(selectedLesson.video)}
                    type="video/mp4"
                  />

                  Trình duyệt của bạn không hỗ trợ video.
                </video>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-[#211E3A] px-4 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
                    <Play
                      size={22}
                      fill="currentColor"
                    />
                  </div>

                  <p className="text-sm font-medium text-white">
                    {
                      selectedLesson.title
                    }
                  </p>

                  <p className="mt-1 text-xs text-white/50">
                    Bài học chưa có video.
                  </p>
                </div>
              )
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-[#211E3A] px-4 text-center">
                <BookOpen
                  size={30}
                  className="mb-3 text-white/40"
                />

                <p className="text-sm font-medium text-white">
                  Chưa có bài học
                </p>

                <p className="mt-1 text-xs text-white/50">
                  Khóa học chưa có bài học
                  khả dụng.
                </p>
              </div>
            )}
          </div>
        </section>

        {selectedLesson && (
          <>
            {/* Lesson information */}
            <section className="mt-4 overflow-hidden rounded-lg border border-[#E4E1F2] bg-white shadow-sm">
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
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
                    <Play
                      size={17}
                      fill="currentColor"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-[10px] font-medium uppercase tracking-wide text-[#8A80D9]">
                        Bài{" "}
                        {
                          selectedLesson.order
                        }
                      </span>

                      {selectedLesson.duration !=
                        null && (
                          <>
                            <span className="text-gray-300">
                              •
                            </span>

                            <span className="text-[10px] text-gray-400">
                              {formatDuration(
                                selectedLesson.duration
                              )}
                            </span>
                          </>
                        )}
                    </div>

                    <h1 className="mt-1 text-base font-semibold leading-6 text-[#252238] sm:text-lg">
                      {
                        selectedLesson.title
                      }
                    </h1>
                  </div>
                </div>

                {selectedLesson.description && (
                  <div className="mt-4 border-t border-[#F0EEF7] pt-4">
                    <p className="whitespace-pre-line text-sm leading-6 text-[#656277]">
                      {
                        selectedLesson.description
                      }
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Document */}
            {selectedLesson.document && (
              <section className="mt-3 rounded-lg border border-[#E4E1F2] bg-white shadow-sm">
                <a
                  href={
                    selectedLesson.document
                  }
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

      {/* Backdrop */}
      <div
        className={`
                    fixed
                    inset-0
                    z-40
                    bg-black/30
                    transition-opacity
                    duration-300
                    ${drawerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
          }
                `}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Lesson Drawer */}
      <div
        className={`
                    fixed
                    inset-x-0
                    bottom-0
                    z-50
                    mx-auto
                    w-full
                    max-w-2xl
                    rounded-t-xl
                    bg-white
                    shadow-2xl
                    transition-transform
                    duration-300
                    ease-out
                    ${drawerOpen
            ? "translate-y-0"
            : "translate-y-full"
          }
                `}
      >
        {/* Drawer header */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-[#252238]">
              Danh sách bài học
            </h2>

            <p className="mt-0.5 text-[11px] text-gray-400">
              Chọn bài bạn muốn học
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setDrawerOpen(false)
            }
            className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-md
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-600
                        "
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Lesson list */}
        <div className="max-h-[65vh] overflow-y-auto p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {lessons.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <BookOpen
                size={30}
                className="mx-auto mb-2 text-gray-300"
              />

              <p className="text-xs text-gray-400">
                Khóa học chưa có bài học.
              </p>
            </div>
          ) : (
            lessons.map((lesson) => {
              const isSelected =
                selectedLesson?.id ===
                lesson.id;

              const isLocked =
                lesson.isLocked;

              return (
                <button
                  key={lesson.id}
                  type="button"
                  disabled={isLocked}
                  onClick={() =>
                    handleSelectLesson(
                      lesson
                    )
                  }
                  className={`
                                        mb-1
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-md
                                        px-3
                                        py-3
                                        text-left
                                        transition
                                        last:mb-0
                                        ${isSelected
                      ? "bg-[#F0EEFF]"
                      : "hover:bg-gray-50"
                    }
                                        ${isLocked
                      ? "cursor-not-allowed opacity-45"
                      : ""
                    }
                                    `}
                >
                  {/* Lesson number */}
                  <div
                    className={`
                                            flex
                                            h-8
                                            w-8
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            ${isSelected
                        ? "bg-[#6C5CE7] text-white"
                        : "bg-gray-100 text-gray-500"
                      }
                                        `}
                  >
                    {lesson.order}
                  </div>

                  {/* Lesson content */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`
                                                truncate
                                                text-sm
                                                font-medium
                                                ${isSelected
                          ? "text-[#6C5CE7]"
                          : "text-[#252238]"
                        }
                                            `}
                    >
                      {lesson.title}
                    </p>

                    <div className="mt-0.5 flex items-center gap-2">
                      {lesson.duration !=
                        null && (
                          <span className="text-[10px] text-gray-400">
                            {formatDuration(
                              lesson.duration
                            )}
                          </span>
                        )}

                      {isLocked && (
                        <span className="text-[10px] text-gray-400">
                          Đã khóa
                        </span>
                      )}
                    </div>
                  </div>

                  {!isLocked && (
                    <ChevronRight
                      size={16}
                      className={`
                                                shrink-0
                                                ${isSelected
                          ? "text-[#6C5CE7]"
                          : "text-gray-300"
                        }
                                            `}
                    />
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourseDetailPage;
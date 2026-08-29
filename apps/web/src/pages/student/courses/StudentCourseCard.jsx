// src/pages/student/courses/StudentCourseCard.jsx

import {
  ArrowRight,
  BookOpen,
  Check,
  Play,
  UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";

import getUrl from "../../../utils/getUrl";

const StudentCourseCard = ({ enrollment }) => {
  const course = enrollment?.course;
  console.log(enrollment);


  if (!course) {
    return null;
  }

  const completedLessons =
    enrollment?.completedLessons ?? 0;

  const totalLessons =
    enrollment?.lessonCount ??
    course?._count?.lessons ??
    0;

  const progress =
    totalLessons > 0
      ? Math.min(
        100,
        Math.round(
          (completedLessons / totalLessons) * 100
        )
      )
      : 0;

  const teacherName =
    course?.teacher?.name ||
    course?.teacherName ||
    "Giảng viên";

  const hasStarted = completedLessons > 0;

  const isCompleted =
    totalLessons > 0 &&
    completedLessons >= totalLessons;

  const actionLabel = isCompleted
    ? "Học lại"
    : hasStarted
      ? "Tiếp tục học"
      : "Bắt đầu học";

  const ActionIcon = isCompleted ? Check : Play;

  return (
    <article
      className="
                group
                w-full
                overflow-hidden
                rounded-sm
                border
                border-white
                bg-white/90
                shadow-[0_4px_18px_rgba(37,34,56,0.06)]
                backdrop-blur-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[#DDD8FF]
                hover:bg-white
                hover:shadow-[0_8px_28px_rgba(108,92,231,0.10)]
            "
    >
      <div
        className="
                    flex
                    flex-col
                    gap-3
                    p-2.5
                    sm:flex-row
                    sm:gap-4
                    sm:p-3
                "
      >
        {/* ==========================================
                    Thumbnail
                ========================================== */}

        <Link
          to={`/student/courses/${course.id}`}
          className="
                        relative
                        block
                        aspect-video
                        w-full
                        shrink-0
                        overflow-hidden
                        rounded-sm
                        bg-[#EEEAFE]
                        sm:aspect-auto
                        sm:h-[108px]
                        sm:w-[172px]
                    "
        >
          {course.thumbnail ? (
            <>
              <img
                src={getUrl(course.thumbnail)}
                alt={course.title}
                className="
                                    h-full
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-500
                                    group-hover:scale-105
                                "
              />

              <div
                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-black/20
                                    via-transparent
                                    to-transparent
                                "
              />
            </>
          ) : (
            <div
              className="
                                flex
                                h-full
                                w-full
                                items-center
                                justify-center
                                bg-gradient-to-br
                                from-[#EEEAFE]
                                to-[#E5F2EC]
                                text-[#6C5CE7]
                            "
            >
              <BookOpen
                size={30}
                strokeWidth={1.6}
              />
            </div>
          )}
        </Link>

        {/* ==========================================
                    Course information
                ========================================== */}

        <div
          className="
                        flex
                        min-w-0
                        flex-1
                        flex-col
                    "
        >
          {/* Title */}

          <Link
            to={`/student/courses/${course.id}`}
            className="block min-w-0"
          >
            <h2
              className="
                                truncate
                                text-[15px]
                                font-bold
                                leading-5
                                tracking-tight
                                text-[#252238]
                                transition-colors
                                duration-200
                                group-hover:text-[#5F50D5]
                                sm:text-base
                            "
              title={course.title}
            >
              {course.title}
            </h2>
          </Link>

          {/* Teacher */}

          <div
            className="
                            mt-1.5
                            flex
                            min-w-0
                            items-center
                            gap-1.5
                            text-xs
                            font-medium
                            text-gray-500
                        "
          >
            <div
              className="
                                flex
                                h-5
                                w-5
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-[#F0EEFF]
                                text-[#6C5CE7]
                            "
            >
              <UserRound
                size={11}
                strokeWidth={1.9}
              />
            </div>

            <span className="truncate">
              {teacherName}
            </span>
          </div>

          {/* ======================================
                        Progress
                    ====================================== */}

          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span
                className="
                                    text-[10px]
                                    font-semibold
                                    text-gray-500
                                    sm:text-xs
                                "
              >
                {isCompleted
                  ? "Đã hoàn thành"
                  : completedLessons > 0
                    ? "Đang học"
                    : "Chưa bắt đầu"}
              </span>

              <span
                className="
                                    shrink-0
                                    text-[10px]
                                    font-semibold
                                    tabular-nums
                                    text-gray-500
                                    sm:text-xs
                                "
              >
                {completedLessons}/{totalLessons} bài
              </span>
            </div>

            <div
              className="
                                h-1.5
                                w-full
                                overflow-hidden
                                rounded-full
                                bg-[#ECEAF3]
                            "
            >
              <div
                className="
                                    h-full
                                    rounded-full
                                    bg-gradient-to-r
                                    from-[#6C5CE7]
                                    to-[#8A7BEA]
                                    transition-all
                                    duration-500
                                "
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* ======================================
                        Bottom row
                    ====================================== */}

          <div
            className="
                            mt-3
                            flex
                            items-center
                            justify-end
                        "
          >
            <Link
              to={`/student/courses/${course.id}`}
              aria-label={actionLabel}
              className={`
                                inline-flex
                                items-center
                                justify-center
                                gap-1.5
                                rounded-sm
                                px-3
                                py-2
                                text-xs
                                font-semibold
                                transition-all
                                duration-200
                                active:scale-[0.97]
                                ${isCompleted
                  ? `
                                            bg-[#E9F5EF]
                                            text-[#438266]
                                            hover:bg-[#DFF0E8]
                                          `
                  : `
                                            bg-[#6C5CE7]
                                            text-white
                                            shadow-sm
                                            hover:bg-[#5B4BD6]
                                            hover:shadow-md
                                          `
                }
                            `}
            >
              <ActionIcon
                size={14}
                strokeWidth={2.2}
                fill={
                  !isCompleted
                    ? "currentColor"
                    : "none"
                }
              />

              <span>{actionLabel}</span>

              {!isCompleted && (
                <ArrowRight
                  size={13}
                  strokeWidth={2.2}
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default StudentCourseCard;
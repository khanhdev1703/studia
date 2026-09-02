// src/pages/student/courses/StudentCourseCard.jsx

import {
  ArrowRight,
  BookOpen,
  LockKeyhole,
  Play,
} from "lucide-react";

import { Link } from "react-router-dom";

import getUrl from "../../../utils/getUrl";

const StudentCourseCard = ({ enrollment }) => {
  const course = enrollment?.course;

  if (!course) {
    return null;
  }

  // Course status:
  // true  = đang mở
  // false = tạm khoá
  const isLocked = !course.status;

  const completedLessons =
    course.completedLessons ?? 0;

  const totalLessons =
    course.totalLessons ?? 0;

  const progress =
    totalLessons > 0
      ? Math.min(
        100,
        Math.round(
          (completedLessons /
            totalLessons) *
          100
        )
      )
      : 0;

  const hasStarted =
    completedLessons > 0;

  const isCompleted =
    totalLessons > 0 &&
    completedLessons >= totalLessons;

  const actionLabel = isCompleted
    ? "Xem lại khóa học"
    : hasStarted
      ? "Tiếp tục học"
      : "Bắt đầu học";

  const courseUrl =
    `/student/courses/${course.id}`;

  return (
    <article
      className="
                group
                flex
                w-full
                flex-col
                overflow-hidden
                rounded-xl
                border
                border-gray-100
                bg-white
                shadow-[0_4px_18px_rgba(37,34,56,0.06)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[#DDD8FF]
                hover:shadow-[0_10px_30px_rgba(108,92,231,0.10)]
            "
    >
      {/* ==========================================
                Thumbnail
            ========================================== */}

      <Link
        to={isLocked ? "#" : courseUrl}
        onClick={(event) => {
          if (isLocked) {
            event.preventDefault();
          }
        }}
        className="
                    relative
                    block
                    aspect-[16/9]
                    w-full
                    overflow-hidden
                    bg-[#EEEAFE]
                "
      >
        {course.thumbnail ? (
          <>
            <img
              src={getUrl(
                course.thumbnail
              )}
              alt={course.title}
              className={`
                                h-full
                                w-full
                                object-cover
                                transition-transform
                                duration-500
                                ${!isLocked
                  ? "group-hover:scale-105"
                  : ""
                }
                            `}
            />

            <div
              className={`
                                pointer-events-none
                                absolute
                                inset-0
                                ${isLocked
                  ? "bg-black/40"
                  : "bg-gradient-to-t from-black/25 via-transparent to-transparent"
                }
                            `}
            />

            {/* Locked badge - chỉ hiển thị trên thumbnail */}
            {isLocked && (
              <div
                className="
                                    absolute
                                    inset-0
                                    flex
                                    items-center
                                    justify-center
                                "
              >
                <div
                  className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-white/90
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-semibold
                                        text-[#55516A]
                                        shadow-sm
                                        backdrop-blur-sm
                                    "
                >
                  <LockKeyhole
                    size={14}
                    strokeWidth={2}
                  />

                  <span>
                    Tạm khoá
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            className={`
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            ${isLocked
                ? "bg-[#E7E5EC] text-[#9995A8]"
                : "bg-gradient-to-br from-[#EEEAFE] to-[#E5F2EC] text-[#6C5CE7]"
              }
                        `}
          >
            {isLocked ? (
              <LockKeyhole
                size={42}
                strokeWidth={1.4}
              />
            ) : (
              <BookOpen
                size={42}
                strokeWidth={1.4}
              />
            )}
          </div>
        )}
      </Link>

      {/* ==========================================
                Content
            ========================================== */}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Course title */}
        <Link
          to={isLocked ? "#" : courseUrl}
          onClick={(event) => {
            if (isLocked) {
              event.preventDefault();
            }
          }}
          className="block"
        >
          <h2
            className={`
                            line-clamp-2
                            text-base
                            font-bold
                            leading-6
                            tracking-tight
                            text-[#252238]
                            ${!isLocked
                ? "transition-colors duration-200 group-hover:text-[#5F50D5]"
                : ""
              }
                            sm:text-[17px]
                        `}
            title={course.title}
          >
            {course.title}
          </h2>
        </Link>

        {/* ======================================
                    Progress
                ====================================== */}

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-400">
              Tiến độ học tập
            </span>

            <span
              className={`
                                text-xs
                                font-bold
                                tabular-nums
                                ${isCompleted
                  ? "text-[#438266]"
                  : "text-[#6C5CE7]"
                }
                            `}
            >
              {progress}%
            </span>
          </div>

          {/* Progress bar */}
          <div
            className="
                            mt-2
                            h-2
                            w-full
                            overflow-hidden
                            rounded-full
                            bg-[#ECEAF3]
                        "
          >
            <div
              className={`
                                h-full
                                rounded-full
                                transition-all
                                duration-500
                                ${isCompleted
                  ? "bg-[#438266]"
                  : "bg-gradient-to-r from-[#6C5CE7] to-[#8A7BEA]"
                }
                            `}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Progress detail */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] font-medium text-gray-400">
              {completedLessons}/
              {totalLessons} bài học
            </span>

            {isCompleted ? (
              <span className="text-[11px] font-semibold text-[#438266]">
                Hoàn thành
              </span>
            ) : hasStarted ? (
              <span className="text-[11px] font-semibold text-[#6C5CE7]">
                Đang học
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-gray-400">
                Chưa bắt đầu
              </span>
            )}
          </div>
        </div>

        {/* ======================================
                    Action
                ====================================== */}

        {!isLocked && (
          <Link
            to={isLocked ? "#" : courseUrl}
            onClick={(event) => {
              if (isLocked) {
                event.preventDefault();
              }
            }}
            className={`
                        mt-5
                        flex
                        h-10
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        text-xs
                        font-semibold
                        transition-all
                        duration-200
                        active:scale-[0.98]
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
                                    shadow-[#6C5CE7]/20
                                    hover:bg-[#5B4BD6]
                                    hover:shadow-md
                                `
              }
                    `}
          >
            {!isCompleted && (
              <Play
                size={15}
                strokeWidth={2.2}
                fill="currentColor"
              />
            )}

            <span>
              {actionLabel}
            </span>

            <ArrowRight
              size={15}
              strokeWidth={2.2}
            />
          </Link>)}
      </div>
    </article>
  );
};

export default StudentCourseCard;
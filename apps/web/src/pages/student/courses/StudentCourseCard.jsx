// src/pages/student/courses/StudentCourseCard.jsx

import {
  ArrowRight,
  BookOpen,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";
import getUrl from "../../../utils/getUrl";

const StudentCourseCard = ({ enrollment }) => {
  const course = enrollment?.course;

  if (!course) {
    return null;
  }

  const completedLessons = course.completedLessons ?? 0;
  const totalLessons = course.totalLessons ?? 0;

  const progress =
    totalLessons > 0
      ? Math.min(
        100,
        Math.round(
          (completedLessons / totalLessons) * 100
        )
      )
      : 0;

  const hasStarted = completedLessons > 0;

  const isCompleted =
    totalLessons > 0 &&
    completedLessons >= totalLessons;

  const actionLabel = isCompleted
    ? "Xem lại"
    : hasStarted
      ? "Tiếp tục học"
      : "Bắt đầu học";

  const courseUrl = `/student/courses/${course.id}`;

  return (
    <article
      className="
                group
                flex
                w-full
                min-w-0
                items-center
                gap-3
                rounded-md
                border
                border-white/80
                bg-white/90
                p-2
                shadow-[0_4px_18px_rgba(37,34,56,0.06)]
                backdrop-blur-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-[#DDD8FF]
                hover:bg-white
                hover:shadow-[0_8px_28px_rgba(108,92,231,0.10)]
                sm:gap-4
                sm:p-2.5
            "
    >
      {/* Thumbnail */}
      <Link
        to={courseUrl}
        className="
                    relative
                    h-[72px]
                    w-[108px]
                    shrink-0
                    overflow-hidden
                    rounded-md
                    bg-[#EEEAFE]
                    sm:h-[88px]
                    sm:w-[140px]
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
              size={27}
              strokeWidth={1.6}
            />
          </div>
        )}
      </Link>

      {/* Course information */}
      <div className="min-w-0 flex-1">
        {/* Title */}
        <Link
          to={courseUrl}
          className="block min-w-0"
        >
          <h2
            className="
                            truncate
                            text-sm
                            font-bold
                            leading-5
                            tracking-tight
                            text-[#252238]
                            transition-colors
                            duration-200
                            group-hover:text-[#5F50D5]
                            sm:text-[15px]
                        "
            title={course.title}
          >
            {course.title}
          </h2>
        </Link>

        {/* Progress */}
        <div className="mt-2.5">
          <div className="flex items-center gap-2">
            {/* Progress bar */}
            <div
              className="
                                h-1.5
                                min-w-0
                                flex-1
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

            {/* Percentage */}
            <span
              className={`
                                shrink-0
                                text-[10px]
                                font-bold
                                tabular-nums
                                sm:text-xs
                                ${isCompleted
                  ? "text-[#438266]"
                  : "text-[#6C5CE7]"
                }
                            `}
            >
              {progress}%
            </span>
          </div>

          {/* Progress detail */}
          <div
            className="
                            mt-1
                            flex
                            items-center
                            gap-1.5
                            text-[9px]
                            sm:text-[10px]
                        "
          >
            <span className="font-medium text-gray-400">
              {completedLessons}/{totalLessons} bài học
            </span>

            {!isCompleted && (
              <>
                <span className="text-gray-300">
                  ·
                </span>

                <span
                  className={
                    hasStarted
                      ? "font-semibold text-[#6C5CE7]"
                      : "font-semibold text-gray-400"
                  }
                >
                  {hasStarted
                    ? "Đang học"
                    : "Chưa bắt đầu"}
                </span>
              </>
            )}

            {isCompleted && (
              <>
                <span className="text-gray-300">
                  ·
                </span>

                <span className="font-semibold text-[#438266]">
                  Hoàn thành
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action */}
      <Link
        to={courseUrl}
        aria-label={actionLabel}
        title={actionLabel}
        className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    transition-all
                    duration-200
                    active:scale-95
                    sm:h-auto
                    sm:w-auto
                    sm:gap-1.5
                    sm:px-3
                    sm:py-2.5
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
        {isCompleted ? (
          <ArrowRight
            size={15}
            strokeWidth={2.2}
          />
        ) : (
          <Play
            size={15}
            strokeWidth={2.2}
            fill="currentColor"
          />
        )}

        <span
          className="
                        hidden
                        text-xs
                        font-semibold
                        sm:inline
                    "
        >
          {actionLabel}
        </span>

        {!isCompleted && (
          <ArrowRight
            size={13}
            strokeWidth={2.2}
            className="hidden sm:block"
          />
        )}
      </Link>
    </article>
  );
};

export default StudentCourseCard;
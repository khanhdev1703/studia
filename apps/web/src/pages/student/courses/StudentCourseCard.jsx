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

  const completedLessons = course.completedLessons ?? 0;

  const totalLessons = course.totalLessons ?? 0;

  const progress =
    totalLessons > 0
      ? Math.min(
        100,
        Math.round((completedLessons / totalLessons) * 100)
      )
      : 0;

  const hasStarted = completedLessons > 0;

  const isCompleted =
    totalLessons > 0 && completedLessons >= totalLessons;

  const actionLabel = isCompleted
    ? "Xem lại khóa học"
    : hasStarted
      ? "Tiếp tục học"
      : "Bắt đầu học";

  const courseUrl = `/student/courses/${course.id}`;

  return (
    <article
      className={[
        "group",
        "flex",
        "w-full",
        "flex-col",
        "overflow-hidden",
        "rounded-xl",
        "border",
        "border-[#E5E7EB]",
        "bg-white",
        "shadow-[0_2px_12px_rgba(15,23,42,0.04)]",
        "transition-all",
        "duration-200",
        "hover:-translate-y-0.5",
        "hover:border-[#BFDBFE]",
        "hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)]",
      ].join(" ")}
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
        className={[
          "relative",
          "block",
          "aspect-[16/9]",
          "w-full",
          "overflow-hidden",
          "bg-[#EFF6FF]",
        ].join(" ")}
      >
        {course.thumbnail ? (
          <>
            <img
              src={getUrl(course.thumbnail)}
              alt={course.title}
              className={[
                "h-full",
                "w-full",
                "object-cover",
                "transition-transform",
                "duration-500",
                !isLocked
                  ? "group-hover:scale-105"
                  : "",
              ].join(" ")}
            />

            <div
              className={[
                "pointer-events-none",
                "absolute",
                "inset-0",
                isLocked
                  ? "bg-black/40"
                  : "bg-gradient-to-t from-slate-950/25 via-transparent to-transparent",
              ].join(" ")}
            />

            {/* Locked badge - chỉ hiển thị trên thumbnail */}
            {isLocked && (
              <div
                className={[
                  "absolute",
                  "inset-0",
                  "flex",
                  "items-center",
                  "justify-center",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex",
                    "items-center",
                    "gap-2",
                    "rounded-full",
                    "bg-white/95",
                    "px-3",
                    "py-1.5",
                    "text-xs",
                    "font-semibold",
                    "text-[#475569]",
                    "shadow-sm",
                    "backdrop-blur-sm",
                  ].join(" ")}
                >
                  <LockKeyhole
                    size={14}
                    strokeWidth={2}
                  />

                  <span>Tạm khoá</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div
            className={[
              "flex",
              "h-full",
              "w-full",
              "items-center",
              "justify-center",
              isLocked
                ? "bg-[#E5E7EB] text-[#94A3B8]"
                : "bg-gradient-to-br from-[#EFF6FF] to-[#F1F5F9] text-[#2563EB]",
            ].join(" ")}
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
            className={[
              "line-clamp-2",
              "text-base",
              "font-bold",
              "leading-6",
              "tracking-tight",
              "text-[#1E293B]",
              !isLocked
                ? "transition-colors duration-200 group-hover:text-[#2563EB]"
                : "",
              "sm:text-[17px]",
            ].join(" ")}
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
            <span className="text-xs font-medium text-[#94A3B8]">
              Tiến độ học tập
            </span>

            <span
              className={[
                "text-xs",
                "font-bold",
                "tabular-nums",
                isCompleted
                  ? "text-[#16A34A]"
                  : "text-[#2563EB]",
              ].join(" ")}
            >
              {progress}%
            </span>
          </div>

          {/* Progress bar */}
          <div
            className={[
              "mt-2",
              "h-2",
              "w-full",
              "overflow-hidden",
              "rounded-full",
              "bg-[#E2E8F0]",
            ].join(" ")}
          >
            <div
              className={[
                "h-full",
                "rounded-full",
                "transition-all",
                "duration-500",
                isCompleted
                  ? "bg-[#16A34A]"
                  : "bg-[#2563EB]",
              ].join(" ")}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Progress detail */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#94A3B8]">
              {completedLessons}/{totalLessons} bài học
            </span>

            {isCompleted ? (
              <span className="text-[11px] font-semibold text-[#16A34A]">
                Hoàn thành
              </span>
            ) : hasStarted ? (
              <span className="text-[11px] font-semibold text-[#2563EB]">
                Đang học
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-[#94A3B8]">
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
            className={[
              "mt-5",
              "flex",
              "h-10",
              "w-full",
              "items-center",
              "justify-center",
              "gap-2",
              "rounded-lg",
              "text-xs",
              "font-semibold",
              "transition-all",
              "duration-200",
              "active:scale-[0.98]",
              isCompleted
                ? [
                  "bg-[#ECFDF3]",
                  "text-[#15803D]",
                  "hover:bg-[#DCFCE7]",
                ].join(" ")
                : [
                  "bg-[#2563EB]",
                  "text-white",
                  "shadow-sm",
                  "shadow-[#2563EB]/20",
                  "hover:bg-[#1D4ED8]",
                  "hover:shadow-md",
                ].join(" "),
            ].join(" ")}
          >
            {!isCompleted && (
              <Play
                size={15}
                strokeWidth={2.2}
                fill="currentColor"
              />
            )}

            <span>{actionLabel}</span>

            <ArrowRight
              size={15}
              strokeWidth={2.2}
            />
          </Link>
        )}
      </div>
    </article>
  );
};

export default StudentCourseCard;
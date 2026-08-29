// src/pages/student/courses/StudentCourseCard.jsx

import {
  ArrowRight,
  BookOpen,
  UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";

import getUrl from "../../../utils/getUrl";

const StudentCourseCard = ({ enrollment }) => {
  const course = enrollment?.course;

  if (!course) {
    return null;
  }

  const completedLessons =
    enrollment?.completedLessons ?? 0;

  const totalLessons =
    enrollment?.lessonCount ??
    course?.lessonCount ??
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
    ? "Xem lại"
    : hasStarted
      ? "Tiếp tục học"
      : "Bắt đầu học";

  return (
    <div
      className="
                group
                flex
                w-full
                min-w-0
                items-center
                gap-3
                rounded-md
                border
                border-gray-200
                bg-white
                p-2
                shadow-sm
                transition
                hover:border-[#DCD6FF]
                hover:shadow-md
                sm:gap-3.5
                sm:p-2.5
            "
    >
      {/* Thumbnail */}
      <Link
        to={`/student/courses/${course.id}`}
        className="
                    relative
                    h-[64px]
                    w-[100px]
                    shrink-0
                    overflow-hidden
                    rounded
                    bg-gray-100
                    sm:h-[76px]
                    sm:w-[120px]
                "
      >
        {course.thumbnail ? (
          <img
            src={getUrl(course.thumbnail)}
            alt={course.title}
            className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-300
                            group-hover:scale-105
                        "
          />
        ) : (
          <div
            className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            bg-[#F0EEFF]
                            text-[#6C5CE7]
                        "
          >
            <BookOpen
              size={22}
              strokeWidth={1.8}
            />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Title */}
        <Link
          to={`/student/courses/${course.id}`}
          className="
                        block
                        min-w-0
                    "
        >
          <h2
            className="
                            truncate
                            text-sm
                            font-semibold
                            leading-5
                            text-[#252238]
                            transition-colors
                            group-hover:text-[#6C5CE7]
                            sm:text-[15px]
                        "
            title={course.title}
          >
            {course.title}
          </h2>
        </Link>

        {/* Teacher */}
        <div
          className="
                        mt-1
                        flex
                        min-w-0
                        items-center
                        gap-1
                        text-[10px]
                        font-medium
                        text-gray-500
                        sm:text-xs
                    "
        >
          <UserRound
            size={11}
            className="shrink-0"
          />

          <span className="truncate">
            {teacherName}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-2 flex items-center gap-2">
          <div
            className="
                            h-1.5
                            min-w-0
                            flex-1
                            overflow-hidden
                            rounded-full
                            bg-gray-100
                        "
          >
            <div
              className="
                                h-full
                                rounded-full
                                bg-[#6C5CE7]
                                transition-all
                                duration-300
                            "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <span
            className="
                            shrink-0
                            text-[10px]
                            font-medium
                            tabular-nums
                            text-gray-500
                            sm:text-xs
                        "
          >
            {completedLessons}/{totalLessons}
          </span>
        </div>
      </div>

      {/* Action */}
      <Link
        to={`/student/courses/${course.id}`}
        className="
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    gap-1
                    rounded-md
                    bg-[#6C5CE7]
                    px-2.5
                    py-2
                    text-[10px]
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#5B4BD6]
                    active:scale-[0.97]
                    sm:px-3
                    sm:py-2
                    sm:text-xs
                "
      >
        <span className="hidden xs:inline sm:inline">
          {actionLabel}
        </span>

        <ArrowRight
          size={14}
          strokeWidth={2.2}
        />
      </Link>
    </div>
  );
};

export default StudentCourseCard;
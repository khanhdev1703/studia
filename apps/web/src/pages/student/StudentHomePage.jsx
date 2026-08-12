import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  myCourses,
  pendingCourses,
} from '../../features/courses/mockCourses';

function StudentHomePage() {
  const latestCourse = myCourses[0];
  const otherCourses = myCourses.slice(1);

  // Mock data - sau này lấy từ API
  const progress = 72;
  const completedLessons = 18;
  const totalLessons = 25;

  return (
    <div className="space-y-6 pb-4">

      {/* =========================
          Statistics
      ========================== */}
      <section className="grid grid-cols-2 gap-3">
        {/* Courses */}
        <Link
          to="/student/courses"
          className="rounded-2xl bg-[#6C5CE7] px-4 py-3.5 text-white transition hover:bg-[#6252D9]"
        >
          <p className="text-2xl font-semibold leading-none">
            {myCourses.length}
          </p>

          <p className="mt-2 text-xs text-white/75">
            Khóa học
          </p>
        </Link>

        {/* Pending requests */}
        <Link
          to="/student/requests"
          className="rounded-2xl bg-[#5142B8] px-4 py-3.5 text-white transition hover:bg-[#493BA8]"
        >
          <p className="text-2xl font-semibold leading-none">
            {pendingCourses.length}
          </p>

          <p className="mt-2 text-xs text-white/75">
            Yêu cầu đang chờ
          </p>
        </Link>
      </section>

      {/* =========================
          Latest Course
      ========================== */}
      {latestCourse && (
        <section>
          <div className="mb-3">
            <h2 className="text-lg font-semibold tracking-tight text-[#252238]">
              Khóa học gần đây
            </h2>
          </div>

          <Link
            to={`/courses/${latestCourse.id}`}
            className="group block overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_rgba(40,30,80,0.06)]"
          >
            {/* Thumbnail */}
            <div className="aspect-[16/8] overflow-hidden bg-[#F0EFF3]">
              {latestCourse.thumbnail ? (
                <img
                  src={latestCourse.thumbnail}
                  alt={latestCourse.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#999999]">
                  Chưa có ảnh
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate text-[17px] font-medium text-[#252238]">
                    {latestCourse.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#858585]">
                    {latestCourse.teacher}
                  </p>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F0EEFF] text-[#6C5CE7]">
                  <ArrowRight
                    size={16}
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-[#858585]">
                    Đang học
                  </span>

                  <span className="text-sm font-medium text-[#6C5CE7]">
                    {progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#EEEAFB]">
                  <div
                    className="h-full rounded-full bg-[#6C5CE7]"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-[#858585]">
                  {completedLessons} / {totalLessons} bài học
                </p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* =========================
          My Courses
      ========================== */}
      {otherCourses.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-[#252238]">
              Khóa học của tôi
            </h2>

            <Link
              to="/student/courses"
              className="flex items-center gap-1 text-sm text-[#6C5CE7]"
            >
              Tất cả

              <ArrowRight
                size={15}
                strokeWidth={1.8}
              />
            </Link>
          </div>

          <div className="divide-y divide-[#EEEAF3] overflow-hidden rounded-2xl border border-[#E7E3F5] bg-white">
            {otherCourses.slice(0, 3).map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-[#FAF9FF]"
              >
                {/* Thumbnail */}
                <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F0EFF3]">
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* Information */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#252238]">
                    {course.title}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-[#858585]">
                    {course.teacher}
                  </p>
                </div>

                <ArrowRight
                  size={16}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#A0A0A0]"
                />
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

export default StudentHomePage;
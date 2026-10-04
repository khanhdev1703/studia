// src/pages/student/courses/StudentCoursesPage.jsx

import { useEffect, useState } from "react";
import { BookOpen, RefreshCw } from "lucide-react";

import appToast from "../../../utils/toast";
import learningService from "../../../services/learningService";

import StudentCourseCard from "./StudentCourseCard";

const StudentCoursesPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await learningService.getMyCourses();

      setEnrollments(response?.data || []);
    } catch (error) {
      console.error("Get student courses error:", error);

      appToast.error(
        error?.response?.data?.message ||
        "Không thể tải danh sách khóa học."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-full bg-[#F5F7FA]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Page header skeleton */}
          <div className="mb-6">
            <div className="h-7 w-40 animate-pulse rounded-md bg-[#E5E7EB]" />

            <div className="mt-2 h-4 w-64 animate-pulse rounded-md bg-[#E5E7EB]" />
          </div>

          {/* Course skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={[
                  "flex h-24",
                  "overflow-hidden",
                  "rounded-xl",
                  "border border-[#E5E7EB]",
                  "bg-white",
                ].join(" ")}
              >
                <div className="h-full w-[100px] shrink-0 animate-pulse bg-[#E5E7EB] sm:w-[120px]" />

                <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-4">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-[#E5E7EB]" />

                  <div className="h-3 w-1/3 animate-pulse rounded bg-[#E5E7EB]" />

                  <div className="h-2 w-full animate-pulse rounded bg-[#F0F0F1]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F5F7FA]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* =====================================================
                    PAGE HEADER
                ====================================================== */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight text-[#18181B] sm:text-2xl">
            Khóa học của tôi
          </h1>

          <p className="mt-1 text-sm text-[#71717A]">
            Chọn một khóa học để tiếp tục học tập.
          </p>
        </div>

        {/* =====================================================
                    EMPTY STATE
                ====================================================== */}
        {enrollments.length === 0 && (
          <div
            className={[
              "flex flex-col items-center justify-center",
              "rounded-xl",
              "border border-[#E5E7EB]",
              "bg-white",
              "px-6 py-16",
              "text-center",
            ].join(" ")}
          >
            <div
              className={[
                "flex h-12 w-12 items-center justify-center",
                "rounded-full",
                "bg-[#F1F2F4]",
                "text-[#52525B]",
              ].join(" ")}
            >
              <BookOpen
                size={22}
                strokeWidth={1.8}
              />
            </div>

            <h2 className="mt-4 text-sm font-semibold text-[#18181B]">
              Bạn chưa đăng ký khóa học nào
            </h2>

            <p className="mt-1.5 max-w-sm text-sm leading-5 text-[#71717A]">
              Hãy khám phá các khóa học để bắt đầu học tập.
            </p>
          </div>
        )}

        {/* =====================================================
                    COURSE LIST
                ====================================================== */}
        {enrollments.length > 0 && (
          <section>
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <StudentCourseCard
                  key={enrollment.id}
                  enrollment={enrollment}
                />
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
                    OPTIONAL RETRY
                ====================================================== */}
        {!loading && enrollments.length === 0 && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={fetchCourses}
              className={[
                "inline-flex items-center gap-2",
                "rounded-lg",
                "border border-[#E5E7EB]",
                "bg-white px-4 py-2.5",
                "text-sm font-medium text-[#52525B]",
                "transition-colors duration-150",
                "hover:bg-[#F6F6F7]",
                "hover:text-[#18181B]",
              ].join(" ")}
            >
              <RefreshCw
                size={16}
                strokeWidth={1.9}
              />

              Thử tải lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCoursesPage;
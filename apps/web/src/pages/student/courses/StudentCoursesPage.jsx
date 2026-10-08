// src/pages/student/courses/StudentCoursesPage.jsx

import { useEffect, useState } from "react";
import {
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import appToast from "../../../utils/toast";
import learningService from "../../../services/learningService";

import StudentCourseCard from "./StudentCourseCard";

const StudentCoursesPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-dvh bg-[#F7F8FC]">
      {/* =====================================================
                PAGE HEADER
            ====================================================== */}
      <header className="border-b border-[#E8EAF0] bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold tracking-tight text-[#18181B] sm:text-xl">
            Khóa học của tôi
          </h1>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {/* =====================================================
                    EMPTY STATE
                ====================================================== */}
        {enrollments.length === 0 && (
          <EmptyState onExplore={() => navigate("/student/explore")} />
        )}

        {/* =====================================================
                    COURSE LIST
                ====================================================== */}
        {enrollments.length > 0 && (
          <section>
            <div className="grid gap-4 lg:grid-cols-2">
              {enrollments.map((enrollment) => (
                <StudentCourseCard
                  key={enrollment.id}
                  enrollment={enrollment}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

/* =========================================================
   LOADING
========================================================= */

const LoadingState = () => {
  return (
    <div className="min-h-dvh bg-[#F7F8FC]">
      <header className="border-b border-[#E8EAF0] bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <div className="h-5 w-36 animate-pulse rounded-md bg-[#E5E7EB]" />
            <div className="hidden h-3 w-56 animate-pulse rounded bg-[#F0F1F4] sm:block" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {/* Summary skeleton */}
        <div className="mb-6 space-y-3">
          <div className="h-8 w-40 animate-pulse rounded-md bg-[#E5E7EB]" />
          <div className="h-4 w-64 animate-pulse rounded bg-[#F0F1F4]" />
        </div>

        {/* Course skeletons */}
        <div className="grid gap-4 lg:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white"
            >
              <div className="flex">
                <div className="h-28 w-28 shrink-0 animate-pulse bg-[#E5E7EB] sm:h-32 sm:w-36" />

                <div className="min-w-0 flex-1 space-y-3 p-4">
                  <div className="h-4 w-4/5 animate-pulse rounded bg-[#E5E7EB]" />

                  <div className="h-3 w-2/5 animate-pulse rounded bg-[#F0F1F4]" />

                  <div className="h-2 w-full animate-pulse rounded-full bg-[#F0F1F4]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = ({ onExplore }) => {
  return (
    <section className="flex min-h-[55vh] items-center justify-center bg-white rounded-lg px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E2E5EA] bg-white text-[#52525B] shadow-sm">
          <BookOpen size={24} strokeWidth={1.7} />
        </div>

        <div className="mt-5">
          <h2 className="text-base font-semibold text-[#18181B]">
            Chưa có khóa học nào
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#71717A]">
            Khám phá các khóa học phù hợp với bạn và bắt đầu xây
            dựng kỹ năng mới.
          </p>
        </div>

        <button
          type="button"
          onClick={onExplore}
          className={[
            "mt-5 inline-flex items-center gap-2",
            "rounded-lg",
            "bg-[#18181B] px-4 py-2.5",
            "text-sm font-medium text-white",
            "transition-colors duration-150",
            "hover:bg-[#27272A]",
            "cursor-pointer",
          ].join(" ")}
        >
          <Sparkles size={15} strokeWidth={1.9} />
          Khám phá khóa học
        </button>
      </div>
    </section>
  );
};

export default StudentCoursesPage;
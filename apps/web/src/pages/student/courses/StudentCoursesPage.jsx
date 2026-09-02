// src/pages/student/courses/StudentCoursesPage.jsx

import { useEffect, useState } from "react";

import {
  BookOpen,
  Flower2,
  Leaf,
  Sparkles,
} from "lucide-react";

import appToast from "../../../utils/toast";

import StudentCourseCard from "./StudentCourseCard";
import learningService from "../../../services/learningService";

const StudentCoursesPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const response =
          await learningService.getMyCourses();
        setEnrollments(response?.data || []);
      } catch (error) {
        console.error(
          "Get student courses error:",
          error
        );

        appToast.error(
          error?.response?.data?.message ||
          "Không thể tải danh sách khóa học."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="relative min-h-full overflow-hidden bg-[#F7F7FF]">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
                            absolute
                            -left-20
                            -top-20
                            h-64
                            w-64
                            rounded-full
                            bg-[#E8E4FF]
                            opacity-60
                            blur-3xl
                        "
          />

          <div
            className="
                            absolute
                            -right-20
                            top-1/3
                            h-72
                            w-72
                            rounded-full
                            bg-[#E2F3EC]
                            opacity-60
                            blur-3xl
                        "
          />
        </div>

        <div className="relative space-y-5 p-3 sm:p-5">
          {/* Header skeleton */}
          <div
            className="
                            h-[125px]
                            animate-pulse
                            rounded-lg
                            bg-white/70
                            shadow-sm
                        "
          />

          {/* Course skeleton */}
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                                    flex
                                    h-24
                                    animate-pulse
                                    overflow-hidden
                                    rounded-lg
                                    bg-white/80
                                    shadow-sm
                                "
              >
                <div className="h-full w-[100px] shrink-0 bg-gray-200 sm:w-[120px]" />

                <div
                  className="
                                        flex
                                        min-w-0
                                        flex-1
                                        flex-col
                                        justify-center
                                        gap-2
                                        px-3
                                    "
                >
                  <div className="h-4 w-3/4 rounded bg-gray-200" />

                  <div className="h-3 w-1/3 rounded bg-gray-200" />

                  <div className="h-2 w-full rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full overflow-hidden bg-[#F7F7FF]">
      {/* ==========================================
                Page background
            ========================================== */}

      <div
        className="
                    pointer-events-none
                    absolute
                    inset-0
                    overflow-hidden
                "
      >
        {/* Top left purple */}
        <div
          className="
                        absolute
                        -left-24
                        -top-24
                        h-72
                        w-72
                        rounded-full
                        bg-[#E8E4FF]
                        opacity-70
                        blur-3xl
                    "
        />

        {/* Top right green */}
        <div
          className="
                        absolute
                        -right-28
                        top-24
                        h-80
                        w-80
                        rounded-full
                        bg-[#E1F2EA]
                        opacity-70
                        blur-3xl
                    "
        />

        {/* Bottom purple */}
        <div
          className="
                        absolute
                        -bottom-40
                        left-1/3
                        h-96
                        w-96
                        rounded-full
                        bg-[#EEEAFE]
                        opacity-50
                        blur-3xl
                    "
        />

        {/* Decorative flower */}
        <Flower2
          className="
                        absolute
                        left-[5%]
                        top-[34%]
                        rotate-12
                        text-[#B5ADEB]/30
                    "
          size={54}
          strokeWidth={1}
        />

        {/* Decorative leaf */}
        <Leaf
          className="
                        absolute
                        right-[6%]
                        top-[58%]
                        -rotate-12
                        text-[#8CB7A2]/30
                    "
          size={48}
          strokeWidth={1.2}
        />

        {/* Small sparkle */}
        <Sparkles
          className="
                        absolute
                        right-[18%]
                        bottom-[12%]
                        text-[#9D95DD]/25
                    "
          size={32}
          strokeWidth={1.2}
        />
      </div>

      {/* ==========================================
                Content
            ========================================== */}

      <div className="relative z-10 space-y-2 sm:p-5">

        {/* ==========================================
                    Header
                ========================================== */}

        <section
          className="
                        relative
                        overflow-hidden
                        border
                        border-[#DED8FF]
                        bg-white
                        from-[#EDEAFF]
                        via-[#F4F2FF]
                        to-[#EAF5F0]
                        shadow-[0_8px_30px_rgba(108,92,231,0.08)]
                        p-3 
                        sm:px-6
                        sm:py-6
                    "
        >


          <Flower2
            className="
                            pointer-events-none
                            absolute
                            right-7
                            top-5
                            rotate-12
                            text-[#8D83DC]/30
                        "
            size={60}
            strokeWidth={1}
          />

          {/* Header content */}

          <div className="relative z-10">
            <h1
              className="
                                text-xl
                                font-bold
                                tracking-tight
                                text-[#252238]
                                sm:text-2xl
                            "
            >
              Khóa học của tôi
            </h1>

            <p
              className="
                                mt-1
                                max-w-lg
                                text-xs
                                leading-5
                                text-[#625E75]
                                sm:text-sm
                            "
            >
              Chọn 1 khoá học để tiếp tục
            </p>

            {/* <div
              className="
                                mt-3
                                inline-flex
                                items-center
                                gap-1.5
                                text-xs
                                font-medium
                                text-[#625E75]
                            "
            >
              <span
                className="
                                    flex
                                    h-6
                                    min-w-6
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-white
                                    px-1.5
                                    font-bold
                                    text-[#6C5CE7]
                                    shadow-sm
                                "
              >
                {enrollments.length}
              </span>

              <span>
                {enrollments.length === 1
                  ? "khóa học"
                  : "khóa học"}
              </span>
            </div> */}
          </div>
        </section>

        {/* ==========================================
                    Empty
                ========================================== */}

        {enrollments.length === 0 && (
          <div
            className="
            m-3
                            relative
                            overflow-hidden
                            rounded-lg
                            border
                            border-white/80
                            bg-white/75
                            px-5
                            py-14
                            text-center
                            shadow-sm
                            backdrop-blur-sm
                        "
          >
            <div
              className="
                                pointer-events-none
                                absolute
                                -right-10
                                -top-10
                                h-28
                                w-28
                                rounded-full
                                bg-[#E9E5FF]
                                opacity-70
                            "
            />

            <div
              className="
                                pointer-events-none
                                absolute
                                -bottom-10
                                -left-10
                                h-28
                                w-28
                                rounded-full
                                bg-[#E4F3EC]
                                opacity-70
                            "
            />

            <div
              className="
                                relative
                                z-10
                                mx-auto
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-full
                                bg-[#EEEAFE]
                                text-[#6C5CE7]
                            "
            >
              <BookOpen
                size={22}
                strokeWidth={1.8}
              />
            </div>

            <h2
              className="
                                relative
                                z-10
                                mt-3
                                text-sm
                                font-semibold
                                text-[#252238]
                            "
            >
              Bạn chưa đăng ký khóa học nào
            </h2>

            <p
              className="
                                relative
                                z-10
                                mx-auto
                                mt-1.5
                                max-w-sm
                                text-xs
                                leading-5
                                text-gray-500
                                sm:text-sm
                            "
            >
              Hãy khám phá để bắt đầu học tập.
            </p>
          </div>
        )}

        {/* ==========================================
                    Course list
                ========================================== */}

        {enrollments.length > 0 && (
          <section className="p-3">

            <div className="space-y-2">
              {enrollments.map(
                (enrollment) => (
                  <StudentCourseCard
                    key={enrollment.id}
                    enrollment={
                      enrollment
                    }
                  />
                )
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default StudentCoursesPage;
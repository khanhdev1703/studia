import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

import enrollmentService from "../../../services/enrollmentService";
import appToast from "../../../utils/toast";

import StudentCourseCard from "./StudentCourseCard";

const StudentCoursesPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(enrollments);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const response =
          await enrollmentService.getMyEnrollments();

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
      <div className="space-y-4 p-3 sm:p-5">
        <div className="space-y-1.5">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="space-y-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                                flex
                                h-24
                                animate-pulse
                                rounded-md
                                bg-white
                                shadow-sm
                            "
            >
              <div className="aspect-video h-full rounded-l-md bg-gray-200" />

              <div className="flex flex-1 flex-col justify-center gap-2 px-3">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-1/3 rounded bg-gray-200" />
                <div className="h-2 w-full rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="space-y-4 p-3 sm:p-5">
      {/* Header */}
      <div>
        <h1
          className="
                        text-lg
                        font-semibold
                        tracking-tight
                        text-[#252238]
                        sm:text-xl
                    "
        >
          Khóa học của tôi
        </h1>

        <p
          className="
                        mt-0.5
                        text-xs
                        font-medium
                        text-gray-500
                        sm:text-sm
                    "
        >
          {enrollments.length} khóa học
        </p>
      </div>

      {/* Empty */}
      {enrollments.length === 0 && (
        <div
          className="
                        rounded-md
                        border
                        border-gray-200
                        bg-white
                        px-5
                        py-14
                        text-center
                        shadow-sm
                    "
        >
          <div
            className="
                            mx-auto
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-[#6C5CE7]/10
                            text-[#6C5CE7]
                        "
          >
            <BookOpen size={21} />
          </div>

          <h2
            className="
                            mt-3
                            text-sm
                            font-semibold
                            text-[#252238]
                        "
          >
            Bạn chưa có khóa học nào
          </h2>

          <p
            className="
                            mx-auto
                            mt-1.5
                            max-w-sm
                            text-xs
                            leading-5
                            text-gray-500
                            sm:text-sm
                        "
          >
            Hãy khám phá và đăng ký một khóa học
            để bắt đầu học tập.
          </p>
        </div>
      )}

      {/* Course list */}
      {enrollments.length > 0 && (
        <div className="space-y-2">
          {enrollments.map((enrollment) => (
            <StudentCourseCard
              key={enrollment.id}
              enrollment={enrollment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCoursesPage;
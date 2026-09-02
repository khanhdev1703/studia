import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import courseService from "../../../../services/courseService";
import CourseCard from "../components/CourseCard";
import CourseCardSkeleton from "../components/CourseCardSkeleton";
import EmptyCourses from "../components/EmptyCourses";

const CoursesPage = () => {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await courseService.getMyCourses();

            setCourses(response.data || []);
        } catch (error) {
            console.error(error);

            setError(
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

    const handleCreateCourse = () => {
        navigate("/teacher/courses/create");
    };

    const handleManageCourse = (courseId) => {
        navigate(`/teacher/courses/${courseId}`);
    };

    const handleEditCourse = (courseId) => {
        navigate(`/teacher/courses/${courseId}/edit`);
    };

    const handleDeleteCourse = async (courseId) => {
        // Xử lý sau khi có API delete course.
        console.log("Delete course:", courseId);
    };

    return (
        <div className="space-y-4">
            {/* Page Header */}
            <div className="flex items-center justify-between gap-4 border-b border-[#e2e8f0] bg-white p-4 sm:p-6">
                <div>
                    <h2 className="text-xl font-bold text-[#082f63] sm:text-2xl">
                        Khóa học
                    </h2>

                    <p className="mt-1 text-sm text-[#64748b]">
                        Quản lý các khóa học của bạn.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCreateCourse}
                    className="group relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-md bg-gradient-to-r from-[#0a479d] via-[#1258ba] to-[#083b82] bg-[length:200%_auto] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(10,71,157,0.35)] transition-all duration-300 hover:bg-[right_center] hover:shadow-[0_6px_20px_rgba(10,71,157,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                >
                    {/* ===== Trang trí các chấm sao ===== */}
                    {/* Chấm sao 1: Góc trên bên trái */}


                    {/* Chấm sao 2: Góc dưới bên phải */}
                    <span className="pointer-events-none absolute bottom-1.5 right-2 flex h-1.5 w-1.5 items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-200 shadow-[0_0_5px_#bae6fd] transition-transform duration-300 group-hover:scale-150" />
                    </span>

                    {/* Chấm sao 3: Ngôi sao bốn cánh nhỏ ở gần giữa */}
                    <span className="pointer-events-none absolute right-12 top-1.5 opacity-70 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
                        <svg className="h-2.5 w-2.5 fill-white" viewBox="0 0 24 24">
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                        </svg>
                    </span>
                    {/* ================================== */}

                    {/* Nhãn nút bấm */}
                    <span className="relative z-10 font-medium tracking-wide">
                        <span className="hidden sm:inline">Tạo khóa học</span>
                        <span className="sm:hidden">Tạo</span>
                    </span>

                    {/* Viền nổi nhẹ */}
                    <span className="pointer-events-none absolute inset-0 rounded-md border border-white/20" />
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="grid grid-cols-1 gap-5 px-2 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <CourseCardSkeleton key={index} />
                    ))}
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="mx-2 flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center">
                    <p className="text-sm font-medium text-red-600">{error}</p>

                    <button
                        type="button"
                        onClick={fetchCourses}
                        className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-100"
                    >
                        Thử lại
                    </button>
                </div>
            )}

            {/* Empty */}
            {!loading && !error && courses.length === 0 && (
                <EmptyCourses onCreate={handleCreateCourse} />
            )}

            {/* Courses */}
            {!loading && !error && courses.length > 0 && (
                <div className="grid grid-cols-1 gap-5 px-2 md:grid-cols-2 xl:grid-cols-3">
                    {courses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            onManage={handleManageCourse}
                            onEdit={handleEditCourse}
                            onDelete={handleDeleteCourse}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CoursesPage;
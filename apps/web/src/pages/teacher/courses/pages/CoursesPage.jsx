import { Plus } from "lucide-react";
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

            const response =
                await courseService.getTeacherCourses();

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
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#252238]">
                        Khóa học
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Quản lý các khóa học của bạn.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCreateCourse}
                    className="flex shrink-0 items-center gap-2 rounded-sm bg-[#6C5CE7] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5b4bd6]"
                >
                    <Plus size={18} />

                    <span className="hidden sm:inline">
                        Tạo khóa học
                    </span>

                    <span className="sm:hidden">
                        Tạo
                    </span>
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 3 }).map(
                        (_, index) => (
                            <CourseCardSkeleton
                                key={index}
                            />
                        )
                    )}
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-6 py-12 text-center">
                    <p className="text-sm font-medium text-red-600">
                        {error}
                    </p>

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
            {!loading &&
                !error &&
                courses.length === 0 && (
                    <EmptyCourses
                        onCreate={handleCreateCourse}
                    />
                )}

            {/* Courses */}
            {!loading &&
                !error &&
                courses.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
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
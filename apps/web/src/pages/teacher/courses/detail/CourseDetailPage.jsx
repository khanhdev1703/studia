import { useEffect, useState } from "react";
import {
    BookOpen,
    ChevronRight,
} from "lucide-react";
import {
    Link,
    NavLink,
    Outlet,
    useParams,
} from "react-router-dom";

import courseService from "../../../../services/courseService";

const CourseDetailPage = () => {
    const { courseId } = useParams();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await courseService.getCourseById(courseId);

                setCourse(response.data);
            } catch (error) {
                console.error(error);

                setError(
                    error?.response?.data?.message ||
                    "Không thể tải thông tin khóa học."
                );
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);

    if (loading) {
        return (
            <div className="space-y-5">
                {/* Breadcrumb skeleton */}
                <div className="h-5 w-64 animate-pulse rounded bg-gray-200" />

                {/* Tabs skeleton */}
                <div className="h-10 animate-pulse rounded-xl bg-gray-200" />

                {/* Content skeleton */}
                <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="
                    rounded-2xl
                    border
                    border-red-100
                    bg-red-50
                    px-4
                    py-5
                    text-sm
                    text-red-600
                "
            >
                {error}
            </div>
        );
    }

    if (!course) {
        return null;
    }

    return (
        <div className="space-y-5">
            {/* ==========================================
                Breadcrumb
            ========================================== */}
            <div
                className="
                    flex
                    min-w-0
                    items-center
                    gap-1.5
                    text-sm
                "
            >
                <Link
                    to="/teacher/courses"
                    className="
                        inline-flex
                        shrink-0
                        items-center
                        gap-1.5
                        text-gray-500
                        transition
                        hover:text-[#6C5CE7]
                    "
                >
                    <BookOpen size={16} />

                    <span>Khóa học</span>
                </Link>

                <ChevronRight
                    size={16}
                    className="shrink-0 text-gray-300"
                />

                <span
                    className="
                        min-w-0
                        truncate
                        font-medium
                        text-[#252238]
                    "
                    title={course.title}
                >
                    {course.title}
                </span>
            </div>

            {/* ==========================================
                Tabs
            ========================================== */}
            <div
                className="
                    overflow-x-auto
                    border-b
                    border-gray-200
                "
            >
                <nav
                    className="
                        flex
                        min-w-max
                        gap-5
                    "
                >
                    {/* Overview */}
                    <NavLink
                        to={`/teacher/courses/${courseId}`}
                        end
                        className={({ isActive }) =>
                            `
                            relative
                            pb-3
                            text-sm
                            font-medium
                            transition

                            ${isActive
                                ? "text-[#6C5CE7]"
                                : "text-gray-500 hover:text-gray-700"
                            }
                            `
                        }
                    >
                        {({ isActive }) => (
                            <>
                                Tổng quan

                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            bottom-0
                                            left-0
                                            h-0.5
                                            w-full
                                            rounded-full
                                            bg-[#6C5CE7]
                                        "
                                    />
                                )}
                            </>
                        )}
                    </NavLink>

                    {/* Lessons */}
                    <NavLink
                        to={`/teacher/courses/${courseId}/lessons`}
                        className={({ isActive }) =>
                            `
                            relative
                            pb-3
                            text-sm
                            font-medium
                            transition

                            ${isActive
                                ? "text-[#6C5CE7]"
                                : "text-gray-500 hover:text-gray-700"
                            }
                            `
                        }
                    >
                        {({ isActive }) => (
                            <>
                                Bài học

                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            bottom-0
                                            left-0
                                            h-0.5
                                            w-full
                                            rounded-full
                                            bg-[#6C5CE7]
                                        "
                                    />
                                )}
                            </>
                        )}
                    </NavLink>

                    {/* Students */}
                    <NavLink
                        to={`/teacher/courses/${courseId}/students`}
                        className={({ isActive }) =>
                            `
                            relative
                            pb-3
                            text-sm
                            font-medium
                            transition

                            ${isActive
                                ? "text-[#6C5CE7]"
                                : "text-gray-500 hover:text-gray-700"
                            }
                            `
                        }
                    >
                        {({ isActive }) => (
                            <>
                                Học viên

                                {isActive && (
                                    <span
                                        className="
                                            absolute
                                            bottom-0
                                            left-0
                                            h-0.5
                                            w-full
                                            rounded-full
                                            bg-[#6C5CE7]
                                        "
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                </nav>
            </div>

            {/* ==========================================
                Child Route
            ========================================== */}

            <Outlet
                context={{
                    course,
                    setCourse,
                }}
            />
        </div>
    );
};

export default CourseDetailPage;
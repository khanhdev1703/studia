import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import courseService from "../../../../services/courseService";
import CourseNavigation from "./components/CourseNavigation";

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
                    await courseService.getCourseDetails(courseId);

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
            <div className="min-h-full bg-[#F7F7FF]">
                <div className="space-y-4 p-4 lg:p-5">
                    {/* Navigation skeleton */}
                    <div className="h-5 w-64 animate-pulse rounded bg-gray-200" />

                    {/* Tabs skeleton */}
                    <div className="h-10 animate-pulse rounded bg-gray-200" />

                    {/* Content skeleton */}
                    <div className="h-64 animate-pulse rounded bg-gray-200" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-full bg-[#F7F7FF] p-4 lg:p-5">
                <div
                    className={[
                        "rounded-lg",
                        "border border-red-100",
                        "bg-red-50",
                        "px-4 py-5",
                        "text-sm text-red-600",
                    ].join(" ")}
                >
                    {error}
                </div>
            </div>
        );
    }

    if (!course) {
        return null;
    }

    return (
        <div className="min-h-full bg-[#F7F7FF] relative">
            <CourseNavigation
                course={course}
            />

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
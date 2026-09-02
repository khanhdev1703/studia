import { useEffect, useState } from "react";
import {
    BookOpen,
} from "lucide-react";
import {
    Outlet,
    useParams,
} from "react-router-dom";

import Breadcrumb from "../../../../components/common/Breadcrumb"

import courseService from "../../../../services/courseService";
import CourseDetailTabs from "./components/CourseDetailTabs";

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
            <div className="space-y-5">
                {/* Breadcrumb skeleton */}
                <div className="h-5 w-64 animate-pulse rounded bg-gray-200" />

                {/* Tabs skeleton */}
                <div className="h-10 animate-pulse rounded-md bg-gray-200" />

                {/* Content skeleton */}
                <div className="h-64 animate-pulse rounded-md bg-gray-200" />
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="
                    rounded-md
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
        <div className="space-y-2 pb-2 bg-[#F7F7FF]">
            {/* ==========================================
                Breadcrumb
            ========================================== */}
            <div className="sticky top-0 z-30 border-b border-gray-100 bg-white p-4">
                <Breadcrumb
                    items={[
                        {
                            label: "Khóa học",
                            to: "/teacher/courses",
                            icon: BookOpen,
                        },
                        {
                            label: course.title,
                        },
                    ]}
                />
            </div>

            <div className="bg-white p-2 pl-4 pb-0">
                <CourseDetailTabs courseId={courseId} />
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
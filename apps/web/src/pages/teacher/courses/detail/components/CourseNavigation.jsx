import { ArrowLeft, BookOpen, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Breadcrumb from "../../../../../components/common/Breadcrumb";
import CourseDetailTabs from "./CourseDetailTabs";

const CourseNavigation = ({ course }) => {
    const navigate = useNavigate();

    return (
        <div
            className={[
                "z-30",
                "bg-white",
                // Mobile
                "sticky top-0",
                // Desktop
                "lg:static",
            ].join(" ")}
        >
            {/* =====================================================
                DESKTOP
            ====================================================== */}
            <div className="hidden border-b border-gray-100 px-5 py-3 lg:block">
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

            {/* =====================================================
                MOBILE COURSE HEADER
            ====================================================== */}
            <div
                className={[
                    "flex h-12 items-center",
                    "border-b border-gray-100",
                    "px-3",
                    "lg:hidden",
                ].join(" ")}
            >
                <button
                    type="button"
                    onClick={() => navigate("/teacher/courses")}
                    aria-label="Quay lại danh sách khóa học"
                    className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center",
                        "rounded-lg",
                        "text-[#52525B]",
                        "transition-colors",
                        "active:bg-[#F4F4F5]",
                    ].join(" ")}
                >
                    <ArrowLeft
                        size={20}
                        strokeWidth={2}
                    />
                </button>

                <h1
                    className={[
                        "min-w-0 flex-1",
                        "truncate",
                        "px-2",
                        "text-[14px] font-semibold",
                        "text-[#18181B]",
                    ].join(" ")}
                >
                    {course.title}
                </h1>

                <button
                    type="button"
                    aria-label="Thêm tùy chọn"
                    className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center",
                        "rounded-lg",
                        "text-[#52525B]",
                        "transition-colors",
                        "active:bg-[#F4F4F5]",
                    ].join(" ")}
                >
                    <MoreVertical
                        size={20}
                        strokeWidth={2}
                    />
                </button>
            </div>

            {/* =====================================================
                COURSE TABS
            ====================================================== */}
            <CourseDetailTabs courseId={course.id} />
        </div>
    );
};

export default CourseNavigation;
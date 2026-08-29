import { ArrowRight, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import getUrl from "../../../../utils/getUrl";

const statusConfig = {
    DRAFT: {
        label: "Khoá",
        className: "bg-amber-50 text-amber-600",
        dotClassName: "bg-amber-500",
    },
    PUBLISHED: {
        label: "Mở",
        className: "bg-green-50 text-green-600",
        dotClassName: "bg-green-500",
    },
    ARCHIVED: {
        label: "Archived",
        className: "bg-gray-100 text-gray-500",
        dotClassName: "bg-gray-400",
    },
};

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    const thumbnail =
        course.thumbnail ? getUrl(course.thumbnail) :
            `https://picsum.photos/seed/${course.id}/600/340`;

    const status =
        statusConfig[course.status] ||
        statusConfig.DRAFT;

    const lessonCount = course._count?.lessons ?? 0;
    const studentCount = course._count?.enrollments ?? 0;

    const updatedDate = course.updatedAt
        ? new Date(course.updatedAt).toLocaleDateString(
            "vi-VN",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }
        )
        : null;

    const handleCardClick = () => {
        navigate(`/teacher/courses/${course.id}`);
    };

    return (
        <article
            onClick={handleCardClick}
            className="
                group
                cursor-pointer
                overflow-hidden
                rounded-lg
                border
                border-gray-100
                bg-white
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
            "
        >
            {/* Thumbnail */}
            <div
                className="
                    w-full
                    overflow-hidden
                    bg-gray-100
                    aspect-video
                "
            >
                <img
                    src={thumbnail}
                    alt={course.title}
                    className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-300
                        group-hover:scale-105
                    "
                />
            </div>

            {/* Content */}
            <div
                className="
                    flex
                    min-w-0
                    flex-col
                    p-3.5

                    sm:p-4
                "
            >
                {/* Title + Manage */}
                <div className="flex items-center gap-2">
                    <h3
                        title={course.title}
                        className="
                            line-clamp-2
                            min-w-0
                            flex-1
                            text-sm
                            font-semibold
                            leading-5
                            text-[#252238]

                            sm:text-base
                        "
                    >
                        {course.title}
                    </h3>

                    {/* Manage icon */}
                    <button
                        type="button"
                        aria-label="Quản lý khóa học"
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            text-gray-400
                            transition
                            hover:bg-[#6C5CE7]/10
                            hover:text-[#6C5CE7]
                        "
                    >
                        <ArrowRight size={17} />
                    </button>
                </div>

                {/* Description */}
                <p
                    className="
                        mt-1.5
                        line-clamp-2
                        text-xs
                        leading-5
                        text-gray-500

                        sm:text-sm
                    "
                >
                    {course.description ||
                        "Chưa có mô tả cho khóa học này."}
                </p>

                {/* Stats */}
                <div
                    className="
                        mt-3
                        flex
                        items-center
                        gap-3
                        text-xs
                        text-gray-500
                    "
                >
                    <span className="inline-flex items-center gap-1">
                        <BookOpen size={14} />
                        {lessonCount} bài học
                    </span>

                    <span className="h-3.5 w-px bg-gray-200" />

                    <span className="inline-flex items-center gap-1">
                        <Users size={14} />
                        {studentCount} học viên
                    </span>
                </div>

                {/* Status + Date */}
                <div
                    className="
                        mt-3
                        flex
                        items-center
                        justify-between
                        gap-2
                    "
                >
                    <span
                        className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            px-2.5
                            py-1
                            text-[11px]
                            font-medium
                            ${status.className}
                        `}
                    >
                        <span
                            className={`
                                h-1.5
                                w-1.5
                                rounded-full
                                ${status.dotClassName}
                            `}
                        />

                        {status.label}
                    </span>

                    {updatedDate && (
                        <span className="truncate text-[11px] text-gray-400">
                            Cập nhật {updatedDate}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};

export default CourseCard;
import { useEffect, useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    MoreVertical,
    Pencil,
    Plus,
    Trash2,
} from "lucide-react";
import {
    Link,
    useParams,
} from "react-router-dom";

import lessonService from "../../../../../services/lessonService";
import appToast from "../../../../../utils/toast";
import formatTime from "../../../../../utils/formatTime";

const CourseLessonsList = () => {
    const { courseId } = useParams();

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    // ==========================================
    // Fetch lessons
    // ==========================================

    useEffect(() => {
        const fetchLessons = async () => {
            if (!courseId) {
                return;
            }

            try {
                setLoading(true);

                const response =
                    await lessonService.getLessonsByCourse(
                        courseId
                    );

                const lessonList =
                    response?.data || [];

                setLessons(
                    [...lessonList].sort(
                        (a, b) =>
                            (a.order ?? 0) -
                            (b.order ?? 0)
                    )
                );
            } catch (error) {
                console.error(
                    "Get lessons error:",
                    error
                );

                appToast.error(
                    error?.response?.data?.message ||
                    "Không thể tải danh sách bài học."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [courseId]);

    // ==========================================
    // Delete lesson
    // ==========================================

    const handleDelete = async (lessonId) => {
        if (!lessonId) {
            return;
        }

        const confirmed = window.confirm(
            "Bạn có chắc muốn xóa bài học này?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await lessonService.delete(
                lessonId
            );

            setLessons((prev) =>
                prev
                    .filter(
                        (lesson) =>
                            lesson.id !== lessonId
                    )
                    .map((lesson, index) => ({
                        ...lesson,
                        order: index,
                    }))
            );

            appToast.success(
                "Xóa bài học thành công."
            );
        } catch (error) {
            console.error(
                "Delete lesson error:",
                error
            );

            appToast.error(
                error?.response?.data?.message ||
                "Không thể xóa bài học."
            );
        }
    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {
        return (
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
                        <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                    </div>

                    <div className="h-10 w-32 animate-pulse rounded-xl bg-gray-200" />
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="
                                h-24
                                animate-pulse
                                rounded-xl
                                bg-white
                                shadow-sm
                            "
                        />
                    ))}
                </div>
            </div>
        );
    }

    // ==========================================
    // Render
    // ==========================================

    return (
        <div className="space-y-2">
            {/* ======================================
                Header
            ====================================== */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    bg-white
                    p-2
                    px-4
                "
            >
                <div>
                    <h2
                        className="
                            font-semibold
                            tracking-tight
                            text-[#252238]
                            sm:text-xl
                        "
                    >
                        Nội dung
                    </h2>

                    <p
                        className="
                            text-xs
                            font-medium
                            text-gray-500

                            sm:text-sm
                        "
                    >
                        {lessons.length} bài học
                    </p>
                </div>

                <Link
                    to="create"
                    className="
                        inline-flex
                        shrink-0
                        items-center
                        gap-1.5
                        rounded-sm
                        bg-[#6C5CE7]
                        px-3
                        py-2.5
                        text-xs
                        font-semibold
                        text-white
                        shadow-sm
                        transition
                        hover:bg-[#5B4BD6]
                        active:scale-[0.98]

                        sm:px-4
                        sm:text-sm
                    "
                >
                    <Plus size={14} />
                    Thêm
                </Link>
            </div>

            {/* ======================================
                Empty
            ====================================== */}

            {lessons.length === 0 && (
                <div
                    className="
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        px-5
                        py-16
                        text-center
                        shadow-sm
                    "
                >
                    <h3
                        className="
                            text-sm
                            font-semibold
                            text-[#252238]
                        "
                    >
                        Chưa có bài học
                    </h3>

                    <p
                        className="
                            mx-auto
                            mt-2
                            max-w-sm
                            text-xs
                            leading-5
                            text-gray-500

                            sm:text-sm
                        "
                    >
                        Thêm bài học đầu tiên để
                        bắt đầu xây dựng nội dung
                        cho khóa học.
                    </p>

                    <Link
                        to="create"
                        className="
                            mt-5
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-xl
                            bg-[#6C5CE7]
                            px-4
                            py-2.5
                            text-xs
                            font-semibold
                            text-white
                            transition
                            hover:bg-[#5B4BD6]
                        "
                    >
                        <Plus size={15} />
                        Thêm bài học
                    </Link>
                </div>
            )}


            {lessons.length > 0 && (
                <div className="space-y-2 p-2">
                    {lessons.map((lesson, index) => {
                        const hasVideo =
                            Boolean(lesson.video);

                        const hasDuration =
                            hasVideo &&
                            lesson.duration !== null &&
                            lesson.duration !== undefined;

                        const isPublished =
                            lesson.status === "PUBLISHED";

                        return (
                            <div
                                key={lesson.id}
                                className="group flex items-center gap-3 rounded-sm border border-gray-200 bg-white px-3 py-3 transition
                        hover:border-[#DCD6FF]
                        hover:shadow-sm
                        sm:gap-4
                        sm:px-4
                        sm:py-3.5
                    "
                            >


                                <div
                                    className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#6C5CE7]/10
                            text-xs
                            font-semibold
                            tabular-nums
                            text-[#6C5CE7]

                            sm:h-10
                            sm:w-10
                            sm:text-sm
                        "
                                >
                                    {String(
                                        (lesson.order ??
                                            index) + 1
                                    ).padStart(2, "0")}
                                </div>

                                {/* ==================================
                        Content
                    ================================== */}

                                <Link
                                    to={lesson.id}
                                    className="
                            min-w-0
                            flex-1
                        "
                                >
                                    {/* Title */}

                                    <h3
                                        className="
                                truncate
                                text-sm
                                font-semibold
                                leading-5
                                text-[#252238]
                                transition

                                group-hover:text-[#6C5CE7]

                                sm:text-[15px]
                            "
                                        title={lesson.title}
                                    >
                                        {lesson.title}
                                    </h3>

                                    {/* Meta */}

                                    <div
                                        className="
                                mt-1.5
                                flex
                                min-w-0
                                items-center
                                gap-2
                                text-xs
                                leading-4
                            "
                                    >
                                        {/* Duration */}

                                        {hasDuration && (
                                            <span
                                                className="
                                        shrink-0
                                        font-medium
                                        tabular-nums
                                        text-gray-500
                                    "
                                            >
                                                {formatTime(
                                                    lesson.duration
                                                )}
                                            </span>
                                        )}

                                        {/* Separator */}

                                        {hasDuration && (
                                            <span
                                                className="
                                        shrink-0
                                        text-gray-300
                                    "
                                            >
                                                •
                                            </span>
                                        )}

                                        {/* Status */}

                                        <span
                                            className={`
                                    truncate
                                    font-medium

                                    ${isPublished
                                                    ? "text-emerald-500"
                                                    : "text-gray-400"
                                                }
                                `}
                                        >
                                            {isPublished
                                                ? "Đã xuất bản"
                                                : "Khóa"}
                                        </span>
                                    </div>
                                </Link>

                                {/* Reorder Actions */}

                                <div
                                    className="
        ml-2
        flex
        shrink-0
        items-center
        gap-2
        p-1
    "
                                >
                                    {/* Move up */}

                                    <button
                                        type="button"
                                        disabled={index === 0}
                                        // onClick={() =>
                                        //     handleMove(index, "up")
                                        // }
                                        className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            transition
            hover:bg-[#6C5CE7]
            hover:text-white
            disabled:cursor-not-allowed
            disabled:text-[#C9C3E8]
            disabled:hover:bg-transparent
            disabled:hover:text-[#C9C3E8]
        "
                                        title="Đưa bài học lên"
                                        aria-label="Đưa bài học lên"
                                    >
                                        <ChevronUp
                                            size={19}
                                            strokeWidth={2.5}
                                        />
                                    </button>

                                    {/* Move down */}

                                    <button
                                        type="button"
                                        disabled={
                                            index === lessons.length - 1
                                        }
                                        // onClick={() =>
                                        //     handleMove(index, "down")
                                        // }
                                        className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            transition
            hover:bg-[#6C5CE7]
            hover:text-white
            disabled:cursor-not-allowed
            disabled:text-[#C9C3E8]
            disabled:hover:bg-transparent
            disabled:hover:text-[#C9C3E8]
        "
                                        title="Đưa bài học xuống"
                                        aria-label="Đưa bài học xuống"
                                    >
                                        <ChevronDown
                                            size={19}
                                            strokeWidth={2.5}
                                        />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CourseLessonsList;

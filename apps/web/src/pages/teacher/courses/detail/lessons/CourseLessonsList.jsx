import { useEffect, useState } from "react";
import {
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
        <div className="space-y-6">
            {/* ======================================
                Header
            ====================================== */}

            <div
                className="
                    flex
                    items-end
                    justify-between
                    gap-4
                "
            >
                <div>
                    <h2
                        className="
                            text-lg
                            font-semibold
                            tracking-tight
                            text-[#252238]

                            sm:text-xl
                        "
                    >
                        Nội dung khóa học
                    </h2>

                    <p
                        className="
                            mt-1
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
                        rounded-xl
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
                    <Plus size={17} />
                    Thêm bài học
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

            {/* ======================================
                Timeline
            ====================================== */}

            {lessons.length > 0 && (
                <div className="relative">
                    {/* Timeline line */}

                    <div
                        className="
                            absolute
                            bottom-7
                            left-[18px]
                            top-7
                            w-px
                            bg-gray-300

                            sm:left-[21px]
                        "
                    />

                    <div className="space-y-4">
                        {lessons.map(
                            (lesson, index) => {
                                const hasVideo =
                                    Boolean(
                                        lesson.video
                                    );

                                const hasDuration =
                                    hasVideo &&
                                    lesson.duration !==
                                    null &&
                                    lesson.duration !==
                                    undefined;

                                return (
                                    <div
                                        key={
                                            lesson.id
                                        }
                                        className="
                                            group
                                            relative
                                            flex
                                            items-start
                                            gap-3

                                            sm:gap-4
                                        "
                                    >
                                        {/* ==================
                                            Number
                                        ================== */}

                                        <div
                                            className="
                                                relative
                                                z-10
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                border-2
                                                border-[#F7F7FF]
                                                bg-white
                                                text-[11px]
                                                font-semibold
                                                text-gray-500
                                                shadow-sm
                                                transition

                                                group-hover:border-[#E8E4FF]
                                                group-hover:bg-[#6C5CE7]
                                                group-hover:text-white

                                                sm:h-11
                                                sm:w-11
                                                sm:text-xs
                                            "
                                        >
                                            {String(
                                                index +
                                                1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </div>

                                        {/* ==================
                                            Lesson card
                                        ================== */}

                                        <div
                                            className="
                                                min-w-0
                                                flex-1
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-white
                                                px-4
                                                py-3.5
                                                shadow-sm
                                                transition

                                                group-hover:border-[#DCD6FF]
                                                group-hover:shadow-md

                                                sm:px-5
                                                sm:py-4
                                            "
                                        >
                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    gap-4
                                                "
                                            >
                                                {/* Content */}

                                                <Link
                                                    to={
                                                        lesson.id
                                                    }
                                                    className="
                                                        min-w-0
                                                        flex-1
                                                    "
                                                >
                                                    <h3
                                                        className="
                                                            truncate
                                                            text-sm
                                                            font-semibold
                                                            leading-5
                                                            text-[#252238]
                                                            transition
                                                            group-hover:text-[#6C5CE7]

                                                            sm:text-base
                                                        "
                                                    >
                                                        {
                                                            lesson.title
                                                        }
                                                    </h3>

                                                    {lesson.description && (
                                                        <p
                                                            className="
                                                                mt-1
                                                                line-clamp-2
                                                                text-xs
                                                                leading-5
                                                                text-gray-500

                                                                sm:text-sm
                                                            "
                                                        >
                                                            {
                                                                lesson.description
                                                            }
                                                        </p>
                                                    )}
                                                </Link>

                                                {/* Duration */}

                                                {hasDuration && (
                                                    <div
                                                        className="
                                                            shrink-0
                                                            rounded-lg
                                                            bg-gray-50
                                                            px-2.5
                                                            py-1.5
                                                            text-xs
                                                            font-semibold
                                                            tabular-nums
                                                            text-gray-600
                                                        "
                                                    >
                                                        {formatTime(
                                                            lesson.duration
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Bottom actions */}

                                            <div
                                                className="
                                                    mt-3
                                                    flex
                                                    items-center
                                                    justify-end
                                                    gap-1
                                                    border-t
                                                    border-gray-100
                                                    pt-2.5

                                                    sm:opacity-0
                                                    sm:transition
                                                    sm:group-hover:opacity-100
                                                "
                                            >
                                                <Link
                                                    to={
                                                        lesson.id
                                                    }
                                                    className="
                                                        inline-flex
                                                        h-7
                                                        items-center
                                                        gap-1.5
                                                        rounded-lg
                                                        px-2
                                                        text-xs
                                                        font-medium
                                                        text-gray-400
                                                        transition
                                                        hover:bg-gray-100
                                                        hover:text-[#6C5CE7]
                                                    "
                                                    title="Chỉnh sửa"
                                                >
                                                    <Pencil
                                                        size={
                                                            14
                                                        }
                                                    />

                                                    <span>
                                                        Chỉnh sửa
                                                    </span>
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            lesson.id
                                                        )
                                                    }
                                                    className="
                                                        inline-flex
                                                        h-7
                                                        items-center
                                                        gap-1.5
                                                        rounded-lg
                                                        px-2
                                                        text-xs
                                                        font-medium
                                                        text-gray-400
                                                        transition
                                                        hover:bg-red-50
                                                        hover:text-red-500
                                                    "
                                                    title="Xóa"
                                                >
                                                    <Trash2
                                                        size={
                                                            14
                                                        }
                                                    />

                                                    <span>
                                                        Xóa
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseLessonsList;

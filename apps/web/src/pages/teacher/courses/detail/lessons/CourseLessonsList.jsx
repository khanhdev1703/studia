import { useEffect, useState } from "react";

import {
    ChevronDown,
    ChevronUp,
    Clock3,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

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

    // Lesson đang reorder
    const [reorderingId, setReorderingId] = useState(null);

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
    // Reorder lesson
    // ==========================================

    const handleMove = async (
        index,
        direction
    ) => {
        if (
            reorderingId ||
            index < 0 ||
            index >= lessons.length
        ) {
            return;
        }

        const targetIndex =
            direction === "up"
                ? index - 1
                : index + 1;

        // Không thể di chuyển ra ngoài danh sách
        if (
            targetIndex < 0 ||
            targetIndex >= lessons.length
        ) {
            return;
        }

        const currentLesson =
            lessons[index];

        const targetLesson =
            lessons[targetIndex];

        if (
            !currentLesson?.id ||
            !targetLesson?.id
        ) {
            return;
        }

        // ======================================
        // Lưu state cũ để rollback
        // ======================================

        const previousLessons = [...lessons];

        // ======================================
        // Optimistic update
        // ======================================

        setLessons((prev) => {
            const next = [...prev];

            next[index] = targetLesson;
            next[targetIndex] = currentLesson;

            return next;
        });

        try {
            setReorderingId(
                currentLesson.id
            );

            await lessonService.move(
                currentLesson.id,
                direction
            );
        } catch (error) {
            console.error(
                "Move lesson error:",
                error
            );

            // Rollback
            setLessons(
                previousLessons
            );

            appToast.error(
                error?.response?.data?.message ||
                "Không thể thay đổi vị trí bài học."
            );
        } finally {
            setReorderingId(null);
        }
    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {
        return (
            <div className="space-y-2">
                <div
                    className="
                        h-16
                        animate-pulse
                        rounded-sm
                        bg-white
                    "
                />

                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="
                            h-20
                            animate-pulse
                            rounded-sm
                            bg-white
                        "
                    />
                ))}
            </div>
        );
    }

    // ==========================================
    // Render
    // ==========================================

    return (
        <div className="space-y-2">
            {/* ==================================
                Header
            ================================== */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    border-b
                    border-slate-100
                    bg-white
                    px-4
                    py-3
                "
            >
                <div className="min-w-0">
                    <h2
                        className="
                            text-base
                            font-bold
                            leading-tight
                            tracking-tight
                            text-[#252238]
                            sm:text-lg
                        "
                    >
                        Nội dung
                    </h2>

                    <div className="mt-0.5 flex items-center gap-1.5">
                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-[#0a479d]
                            "
                        />

                        <p className="text-xs font-medium text-slate-500">
                            {lessons.length} bài học
                        </p>
                    </div>
                </div>

                <Link
                    to="create"
                    className="
                        shrink-0
                        rounded-lg
                        bg-[#0a479d]
                        px-3.5
                        py-2
                        text-xs
                        font-semibold
                        text-white
                        shadow-sm
                        transition
                        hover:bg-[#083b82]
                        active:scale-95
                        sm:px-4
                    "
                >
                    <span className="sm:hidden">
                        Thêm
                    </span>

                    <span className="hidden sm:inline">
                        Thêm bài học
                    </span>
                </Link>
            </div>

            {/* ==================================
                Empty
            ================================== */}

            {lessons.length === 0 && (
                <div
                    className="
                        rounded-sm
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
                            rounded-lg
                            bg-[#0a479d]
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-white
                            transition
                            hover:bg-[#083b82]
                        "
                    >
                        Thêm bài học
                    </Link>
                </div>
            )}

            {/* ==================================
                Lesson list
            ================================== */}

            {lessons.length > 0 && (
                <div className="space-y-2 p-2">
                    <AnimatePresence initial={false}>
                        {lessons.map(
                            (lesson, index) => {
                                const hasDuration =
                                    lesson.duration !==
                                    null &&
                                    lesson.duration !==
                                    undefined;

                                const isReordering =
                                    reorderingId ===
                                    lesson.id;

                                return (
                                    <motion.div
                                        key={lesson.id}
                                        layout="position"
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 25,
                                            mass: 0.8,
                                        }}
                                        className={`
                                            group
                                            relative
                                            flex
                                            items-center
                                            gap-3
                                            rounded-sm
                                            border
                                            border-slate-200/80
                                            bg-white
                                            px-3
                                            py-3
                                            shadow-sm
                                            transition
                                            hover:border-slate-300
                                            hover:shadow-md
                                            sm:gap-3.5
                                            sm:px-4
                                            sm:py-3.5
                                            ${isReordering
                                                ? "pointer-events-none opacity-70"
                                                : ""
                                            }
                                        `}
                                    >
                                        {/* ==================================
                                            Lesson number
                                        ================================== */}

                                        <div
                                            className="
                                                flex
                                                h-8
                                                w-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-blue-50
                                                text-[11px]
                                                font-bold
                                                tabular-nums
                                                text-blue-600
                                                ring-1
                                                ring-inset
                                                ring-blue-500/10
                                                transition-colors
                                                group-hover:bg-blue-600
                                                group-hover:text-white
                                                sm:h-9
                                                sm:w-9
                                                sm:text-xs
                                            "
                                        >
                                            {String(
                                                index + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}
                                        </div>

                                        {/* ==================================
                                            Content
                                        ================================== */}

                                        <Link
                                            to={lesson.id}
                                            className="
                                                min-w-0
                                                flex-1
                                                focus:outline-none
                                            "
                                        >
                                            <h3
                                                title={
                                                    lesson.title
                                                }
                                                className="
                                                    truncate
                                                    text-sm
                                                    font-semibold
                                                    leading-5
                                                    text-slate-800
                                                    transition-colors
                                                    group-hover:text-blue-600
                                                    sm:text-[15px]
                                                "
                                            >
                                                {
                                                    lesson.title
                                                }
                                            </h3>

                                            <div
                                                className="
                                                    mt-1
                                                    flex
                                                    flex-wrap
                                                    items-center
                                                    gap-x-2
                                                    gap-y-1
                                                "
                                            >
                                                {/* Duration */}

                                                {hasDuration && (
                                                    <span
                                                        className="
                                                            inline-flex
                                                            items-center
                                                            gap-1
                                                            text-[11px]
                                                            font-medium
                                                            tabular-nums
                                                            text-slate-400
                                                        "
                                                    >
                                                        <Clock3
                                                            size={12}
                                                            strokeWidth={2}
                                                        />
                                                        {formatTime(
                                                            lesson.duration
                                                        )}
                                                    </span>
                                                )}

                                                {/* Divider */}

                                                {hasDuration && (
                                                    <span className="text-[10px] text-slate-300">
                                                        •
                                                    </span>
                                                )}


                                            </div>
                                        </Link>

                                        {/* ==================================
                                            Reorder actions
                                        ================================== */}

                                        {/* ==================================
    Right actions
================================== */}

                                        <div
                                            className="
        flex
        shrink-0
        items-center
        gap-2
        sm:gap-3
        sm:pl-3
    "
                                        >
                                            {/* Free badge */}

                                            {lesson.isFree && (
                                                <span
                                                    className="
                rounded-full
                bg-emerald-50
                px-2
                py-1
                text-[10px]
                font-semibold
                text-emerald-600
                whitespace-nowrap
                sm:text-[11px]
            "
                                                >
                                                    Miễn phí
                                                </span>
                                            )}

                                            {/* Reorder buttons */}

                                            <div
                                                className="
            flex
            flex-col
            items-center
            justify-center
            border-l
        border-slate-100
        pl-2
        "
                                            >
                                                {/* Move up */}

                                                <button
                                                    type="button"
                                                    disabled={
                                                        index === 0 ||
                                                        Boolean(reorderingId)
                                                    }
                                                    onClick={() =>
                                                        handleMove(index, "up")
                                                    }
                                                    title="Đưa bài học lên"
                                                    aria-label="Đưa bài học lên"
                                                    className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-blue-600
                active:scale-90
                disabled:cursor-not-allowed
                disabled:opacity-20
            "
                                                >
                                                    <ChevronUp
                                                        size={14}
                                                        strokeWidth={2.5}
                                                    />
                                                </button>

                                                {/* Move down */}

                                                <button
                                                    type="button"
                                                    disabled={
                                                        index === lessons.length - 1 ||
                                                        Boolean(reorderingId)
                                                    }
                                                    onClick={() =>
                                                        handleMove(index, "down")
                                                    }
                                                    title="Đưa bài học xuống"
                                                    aria-label="Đưa bài học xuống"
                                                    className="
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded
                text-slate-400
                transition
                hover:bg-slate-100
                hover:text-blue-600
                active:scale-90
                disabled:cursor-not-allowed
                disabled:opacity-20
            "
                                                >
                                                    <ChevronDown
                                                        size={14}
                                                        strokeWidth={2.5}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        {/* ==================================
                                            Reordering overlay
                                        ================================== */}

                                        {isReordering && (
                                            <div
                                                className="
                                                    absolute
                                                    inset-0
                                                    z-10
                                                    flex
                                                    items-center
                                                    justify-center
                                                    rounded-sm
                                                    bg-white/60
                                                    backdrop-blur-[1px]
                                                "
                                            >
                                                <div
                                                    className="
                                                        h-4
                                                        w-4
                                                        animate-spin
                                                        rounded-full
                                                        border-2
                                                        border-blue-600
                                                        border-t-transparent
                                                    "
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            }
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default CourseLessonsList;
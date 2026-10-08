import { useEffect, useState } from "react";

import {
    ChevronDown,
    ChevronUp,
    Clock3,
    Plus,
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

const CourseLessonsPage = () => {
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

        const previousLessons = [...lessons];

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

            setLessons(previousLessons);

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
            <div className="space-y-3">
                <div className="h-[76px] animate-pulse rounded-2xl bg-white" />

                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="h-[78px] animate-pulse rounded-2xl bg-white"
                    />
                ))}
            </div>
        );
    }

    // ==========================================
    // Render
    // ==========================================

    return (
        <div className="min-h-full bg-[#F7F7F5]">
            <div className="mx-auto w-full max-w-6xl">
                {/* ==================================
                    Header
                ================================== */}

                <div className="border-b border-black/[0.06] bg-white px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h2 className="truncate text-[15px] font-semibold tracking-[-0.01em] text-[#18181B] sm:text-base">
                                    Nội dung
                                </h2>

                                <span className="rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[10px] font-medium tabular-nums text-[#52525B]">
                                    {lessons.length}
                                </span>
                            </div>

                            <p className="mt-1 text-[11px] text-[#71717A] sm:text-xs">
                                Quản lý và sắp xếp nội dung
                                khóa học.
                            </p>
                        </div>

                        <Link
                            to="create"
                            className={[
                                "group inline-flex shrink-0 items-center gap-1.5",
                                "rounded-xl",
                                "bg-[#18181B]",
                                "px-3 py-2",
                                "text-[11px] font-semibold text-white",
                                "shadow-sm",
                                "transition-all duration-200",
                                "hover:bg-[#27272A]",
                                "hover:shadow-md",
                                "active:scale-[0.97]",
                                "sm:px-3.5 sm:py-2.5 sm:text-xs",
                            ].join(" ")}
                        >
                            <Plus
                                size={14}
                                strokeWidth={2.2}
                            />

                            <span className="sm:hidden">
                                Thêm
                            </span>

                            <span className="hidden sm:inline">
                                Thêm bài học
                            </span>
                        </Link>
                    </div>
                </div>

                {/* ==================================
                    Empty
                ================================== */}

                {lessons.length === 0 && (
                    <div className="px-2 py-3 sm:px-4">
                        <div className="rounded-2xl border border-dashed border-[#D4D4D8] bg-white px-5 py-16 text-center">
                            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4F4F5] text-[#52525B]">
                                <Plus
                                    size={19}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <h3 className="mt-4 text-sm font-semibold text-[#18181B]">
                                Chưa có bài học
                            </h3>

                            <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-[#71717A] sm:text-sm">
                                Thêm bài học đầu tiên để
                                bắt đầu xây dựng nội dung
                                cho khóa học.
                            </p>

                            <Link
                                to="create"
                                className={[
                                    "mt-5 inline-flex items-center",
                                    "rounded-xl",
                                    "bg-[#18181B]",
                                    "px-4 py-2.5",
                                    "text-xs font-semibold text-white",
                                    "transition-colors",
                                    "hover:bg-[#27272A]",
                                ].join(" ")}
                            >
                                Thêm bài học
                            </Link>
                        </div>
                    </div>
                )}

                {/* ==================================
                    Lesson list
                ================================== */}

                {lessons.length > 0 && (
                    <div className="px-2 py-3 sm:px-4 sm:py-4">
                        <div className="mb-2 flex items-center justify-between px-1">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
                                Danh sách bài học
                            </p>

                            <p className="text-[10px] text-[#A1A1AA]">
                                Dùng ↑ ↓ để sắp xếp
                            </p>
                        </div>

                        <div className="space-y-2">
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
                                                className={[
                                                    "group relative flex items-center gap-3",
                                                    "rounded-2xl",
                                                    "border border-black/[0.07]",
                                                    "bg-white",
                                                    "px-3 py-3",
                                                    "shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
                                                    "transition-all duration-200",
                                                    "hover:border-black/[0.12]",
                                                    "hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]",
                                                    "sm:gap-3.5 sm:px-4 sm:py-3.5",
                                                    isReordering
                                                        ? "pointer-events-none opacity-60"
                                                        : "",
                                                ].join(" ")}
                                            >
                                                {/* Lesson number */}

                                                <div
                                                    className={[
                                                        "flex h-8 w-8 shrink-0 items-center justify-center",
                                                        "rounded-xl",
                                                        "bg-[#F4F4F5]",
                                                        "text-[10px] font-semibold tabular-nums",
                                                        "text-[#52525B]",
                                                        "ring-1 ring-inset ring-black/[0.04]",
                                                        "transition-all duration-200",
                                                        "group-hover:bg-[#18181B]",
                                                        "group-hover:text-white",
                                                        "sm:h-9 sm:w-9 sm:text-[11px]",
                                                    ].join(" ")}
                                                >
                                                    {String(
                                                        index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </div>

                                                {/* Content */}

                                                <Link
                                                    to={
                                                        lesson.id
                                                    }
                                                    className="min-w-0 flex-1 focus:outline-none"
                                                >
                                                    <h3
                                                        title={
                                                            lesson.title
                                                        }
                                                        className={[
                                                            "truncate",
                                                            "text-sm font-semibold leading-5",
                                                            "tracking-[-0.01em]",
                                                            "text-[#27272A]",
                                                            "transition-colors",
                                                            "group-hover:text-[#18181B]",
                                                            "sm:text-[15px]",
                                                        ].join(" ")}
                                                    >
                                                        {
                                                            lesson.title
                                                        }
                                                    </h3>

                                                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                                                        {hasDuration && (
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-medium tabular-nums text-[#A1A1AA] sm:text-[11px]">
                                                                <Clock3
                                                                    size={
                                                                        12
                                                                    }
                                                                    strokeWidth={
                                                                        1.9
                                                                    }
                                                                />

                                                                {formatTime(
                                                                    lesson.duration
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                </Link>

                                                {/* Right actions */}

                                                <div className="flex shrink-0 items-center gap-2 sm:gap-3 sm:pl-3">
                                                    {/* Free badge */}

                                                    {lesson.isFree && (
                                                        <span className="rounded-full bg-[#ECFDF5] px-2 py-1 text-[9px] font-semibold whitespace-nowrap text-[#15803D] sm:text-[10px]">
                                                            Miễn phí
                                                        </span>
                                                    )}

                                                    {/* Reorder */}

                                                    <div className="flex flex-col items-center justify-center border-l border-[#F0F0F1] pl-2">
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                index ===
                                                                0 ||
                                                                Boolean(
                                                                    reorderingId
                                                                )
                                                            }
                                                            onClick={() =>
                                                                handleMove(
                                                                    index,
                                                                    "up"
                                                                )
                                                            }
                                                            title="Đưa bài học lên"
                                                            aria-label="Đưa bài học lên"
                                                            className={[
                                                                "flex h-5 w-5 items-center justify-center rounded-md",
                                                                "text-[#A1A1AA]",
                                                                "transition-colors",
                                                                "hover:bg-[#F4F4F5]",
                                                                "hover:text-[#18181B]",
                                                                "active:scale-90",
                                                                "disabled:cursor-not-allowed",
                                                                "disabled:opacity-20",
                                                            ].join(" ")}
                                                        >
                                                            <ChevronUp
                                                                size={
                                                                    14
                                                                }
                                                                strokeWidth={
                                                                    2.4
                                                                }
                                                            />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                index ===
                                                                lessons.length -
                                                                1 ||
                                                                Boolean(
                                                                    reorderingId
                                                                )
                                                            }
                                                            onClick={() =>
                                                                handleMove(
                                                                    index,
                                                                    "down"
                                                                )
                                                            }
                                                            title="Đưa bài học xuống"
                                                            aria-label="Đưa bài học xuống"
                                                            className={[
                                                                "flex h-5 w-5 items-center justify-center rounded-md",
                                                                "text-[#A1A1AA]",
                                                                "transition-colors",
                                                                "hover:bg-[#F4F4F5]",
                                                                "hover:text-[#18181B]",
                                                                "active:scale-90",
                                                                "disabled:cursor-not-allowed",
                                                                "disabled:opacity-20",
                                                            ].join(" ")}
                                                        >
                                                            <ChevronDown
                                                                size={
                                                                    14
                                                                }
                                                                strokeWidth={
                                                                    2.4
                                                                }
                                                            />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Reordering overlay */}

                                                {isReordering && (
                                                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-[1px]">
                                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#18181B] border-t-transparent" />
                                                    </div>
                                                )}
                                            </motion.div>
                                        );
                                    }
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseLessonsPage;
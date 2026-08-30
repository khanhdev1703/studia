// src/pages/student/courses/learning/LessonDrawer.jsx

import {
    BookOpen,
    Check,
    ChevronRight,
    X,
} from "lucide-react";

import formatDuration from "../../../../utils/formatDuration";

const LessonDrawer = ({
    open,
    lessons,
    selectedLessonId,
    onSelectLesson,
    onClose,
}) => {
    const completedCount = lessons.filter(
        (lesson) => lesson.isCompleted
    ).length;

    const totalLessons = lessons.length;

    const isCourseCompleted =
        totalLessons > 0 &&
        completedCount === totalLessons;

    const progress =
        totalLessons > 0
            ? Math.round(
                (completedCount / totalLessons) * 100
            )
            : 0;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`
                    fixed
                    inset-0
                    z-40
                    bg-black/30
                    transition-opacity
                    duration-300
                    ${open
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                    }
                `}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`
                    fixed
                    inset-x-0
                    bottom-0
                    z-50
                    mx-auto
                    w-full
                    max-w-2xl
                    rounded-t-xl
                    bg-white
                    shadow-2xl
                    transition-transform
                    duration-300
                    ease-out
                    ${open
                        ? "translate-y-0"
                        : "translate-y-full"
                    }
                `}
            >
                {/* Header */}
                <div className="border-b border-gray-100 px-4 py-3.5">
                    <div className="flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-sm font-semibold text-[#252238]">
                                    Danh sách bài học
                                </h2>

                                {isCourseCompleted && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E9F8F0] text-[#2E9B61]">
                                        <Check
                                            size={12}
                                            strokeWidth={2.5}
                                        />
                                    </span>
                                )}
                            </div>

                            <p className="mt-0.5 text-[11px] text-gray-400">
                                {isCourseCompleted
                                    ? "Đã hoàn thành toàn bộ khóa học"
                                    : `${completedCount} / ${totalLessons} bài đã hoàn thành`}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-md
                                text-gray-400
                                transition
                                hover:bg-gray-100
                                hover:text-gray-600
                            "
                            aria-label="Đóng"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Progress */}
                    {totalLessons > 0 && (
                        <div className="mt-3">
                            <div className="mb-1.5 flex items-center justify-between">
                                <span className="text-[10px] font-medium text-gray-400">
                                    Tiến độ
                                </span>

                                <span
                                    className={`
                                        text-[10px]
                                        font-semibold
                                        ${isCourseCompleted
                                            ? "text-[#2E9B61]"
                                            : "text-[#6C5CE7]"
                                        }
                                    `}
                                >
                                    {progress}%
                                </span>
                            </div>

                            <div className="h-1.5 overflow-hidden rounded-full bg-[#EEEAFB]">
                                <div
                                    className={`
                                        h-full
                                        rounded-full
                                        transition-all
                                        duration-300
                                        ${isCourseCompleted
                                            ? "bg-[#2E9B61]"
                                            : "bg-[#6C5CE7]"
                                        }
                                    `}
                                    style={{
                                        width: `${progress}%`,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Lesson list */}
                <div className="max-h-[65vh] overflow-y-auto p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
                    {lessons.length === 0 ? (
                        <div className="px-4 py-10 text-center">
                            <BookOpen
                                size={30}
                                className="mx-auto mb-2 text-gray-300"
                            />

                            <p className="text-xs text-gray-400">
                                Khóa học chưa có bài học.
                            </p>
                        </div>
                    ) : (
                        lessons.map((lesson) => {
                            const isSelected =
                                selectedLessonId === lesson.id;

                            const isCompleted =
                                lesson.isCompleted;

                            const isLocked =
                                lesson.isLocked;

                            /*
                             * Bài hiện tại không được click lại.
                             * Bài bị khóa cũng không được click.
                             */
                            const isDisabled =
                                isSelected || isLocked;

                            return (
                                <button
                                    key={lesson.id}
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={() =>
                                        onSelectLesson(lesson)
                                    }
                                    className={`
                                        mb-1
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-md
                                        px-3
                                        py-3
                                        text-left
                                        transition
                                        last:mb-0

                                        ${isSelected
                                            ? "cursor-default bg-[#F0EEFF]"
                                            : "hover:bg-gray-50"
                                        }

                                        ${isLocked
                                            ? "cursor-not-allowed opacity-45"
                                            : ""
                                        }
                                    `}
                                >
                                    {/* Lesson status / number */}
                                    <div
                                        className={`
                                            flex
                                            h-8
                                            w-8
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            text-xs
                                            font-semibold

                                            ${isCompleted
                                                ? "bg-[#E9F8F0] text-[#2E9B61]"
                                                : isSelected
                                                    ? "bg-[#6C5CE7] text-white"
                                                    : "bg-gray-100 text-gray-500"
                                            }
                                        `}
                                    >
                                        {isCompleted ? (
                                            <Check
                                                size={15}
                                                strokeWidth={2.5}
                                            />
                                        ) : (
                                            lesson.order
                                        )}
                                    </div>

                                    {/* Lesson content */}
                                    <div className="min-w-0 flex-1">
                                        <p
                                            className={`
                                                min-w-0
                                                truncate
                                                text-sm
                                                font-medium
                                                ${isSelected
                                                    ? "text-[#6C5CE7]"
                                                    : "text-[#252238]"
                                                }
                                            `}
                                        >
                                            {lesson.title}
                                        </p>

                                        <div className="mt-0.5 flex items-center gap-2">
                                            {lesson.duration !=
                                                null && (
                                                    <span className="text-[10px] text-gray-400">
                                                        {formatDuration(
                                                            lesson.duration
                                                        )}
                                                    </span>
                                                )}

                                            {isCompleted && (
                                                <span className="text-[10px] font-medium text-[#2E9B61]">
                                                    Đã hoàn thành
                                                </span>
                                            )}

                                            {isLocked && (
                                                <span className="text-[10px] text-gray-400">
                                                    Đã khóa
                                                </span>
                                            )}

                                            {!isCompleted && isSelected && (
                                                <span className="text-[10px] font-medium text-[#6C5CE7]">
                                                    Đang học
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    {!isLocked &&
                                        !isSelected && (
                                            <ChevronRight
                                                size={16}
                                                className="shrink-0 text-gray-300"
                                            />
                                        )}
                                </button>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default LessonDrawer;
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    BookOpen,
    Clock3,
    Heart,
    LockKeyhole,
    PlayCircle,
    UserRound,
    X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import courseService from "../../../services/courseService";
import formatPrice from "../../../utils/formatPrice";
import formatDuration from "../../../utils/formatDuration";
import getUrl from "../../../utils/getUrl";

const ExploreCourseDetailPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [isFavorite, setIsFavorite] = useState(false);
    const [course, setCourse] = useState(null);
    const [previewLesson, setPreviewLesson] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleBack = () => {
        navigate("/student/explore");
    };

    const handleLessonClick = (lesson) => {
        if (!lesson?.isFree) {
            return;
        }

        setPreviewLesson(lesson);
    };

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);

                const response =
                    await courseService.getCourseDetails(courseId);

                setCourse(response?.data || null);
            } catch (error) {
                console.error(
                    "Không thể lấy thông tin khóa học:",
                    error
                );

                setCourse(null);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);

    /*
     * ============================================================
     * LOADING
     * ============================================================
     */

    if (loading) {
        return (
            <div className="min-h-full bg-[#F8FAFC]">
                <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white">
                    <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
                        <button
                            type="button"
                            onClick={handleBack}
                            aria-label="Quay lại"
                            className={[
                                "flex h-9 w-9 items-center justify-center",
                                "rounded-lg text-[#52525B]",
                                "transition-colors",
                                "hover:bg-[#F6F6F7]",
                                "hover:text-[#18181B]",
                            ].join(" ")}
                        >
                            <ArrowLeft
                                size={19}
                                strokeWidth={1.8}
                            />
                        </button>

                        <div className="h-4 w-24 animate-pulse rounded bg-[#F1F2F4]" />

                        <div className="h-9 w-9" />
                    </div>
                </header>

                <main className="mx-auto w-full max-w-7xl">
                    <div className="aspect-[16/7] animate-pulse bg-[#F1F2F4] sm:aspect-[16/6] lg:aspect-[16/5]" />

                    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-7">
                        <div className="space-y-4 animate-pulse">
                            <div className="h-6 w-2/3 rounded bg-[#F1F2F4]" />

                            <div className="h-4 w-40 rounded bg-[#F1F2F4]" />

                            <div className="h-4 w-24 rounded bg-[#F1F2F4]" />

                            <div className="h-16 w-full max-w-3xl rounded bg-[#F1F2F4]" />

                            <div className="border-t border-[#E5E7EB] pt-4">
                                <div className="h-4 w-1/2 rounded bg-[#F1F2F4]" />
                            </div>
                        </div>

                        <div className="mt-8 animate-pulse">
                            <div className="border-b border-[#E5E7EB] pb-3">
                                <div className="h-4 w-36 rounded bg-[#F1F2F4]" />
                            </div>

                            <div className="space-y-0">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 border-b border-[#F0F0F1] py-4"
                                    >
                                        <div className="h-7 w-7 rounded bg-[#F1F2F4]" />

                                        <div className="flex-1 space-y-2">
                                            <div className="h-3.5 w-2/3 rounded bg-[#F1F2F4]" />
                                            <div className="h-3 w-20 rounded bg-[#F1F2F4]" />
                                        </div>

                                        <div className="h-4 w-4 rounded bg-[#F1F2F4]" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    /*
     * ============================================================
     * NOT FOUND
     * ============================================================
     */

    if (!course) {
        return (
            <div className="min-h-full bg-[#F8FAFC]">
                <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white">
                    <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={handleBack}
                                aria-label="Quay lại"
                                className={[
                                    "flex h-9 w-9 items-center justify-center",
                                    "rounded-lg text-[#52525B]",
                                    "transition-colors",
                                    "hover:bg-[#F6F6F7]",
                                    "hover:text-[#18181B]",
                                ].join(" ")}
                            >
                                <ArrowLeft
                                    size={19}
                                    strokeWidth={1.8}
                                />
                            </button>

                            <span className="text-sm font-semibold text-[#18181B]">
                                Chi tiết
                            </span>
                        </div>

                        <div className="h-9 w-9" />
                    </div>
                </header>

                <main className="mx-auto flex min-h-[420px] w-full max-w-5xl items-center justify-center px-4">
                    <div className="text-center">
                        <div
                            className={[
                                "mx-auto flex h-11 w-11 items-center justify-center",
                                "rounded-full bg-[#F1F2F4]",
                                "text-[#52525B]",
                            ].join(" ")}
                        >
                            <BookOpen
                                size={20}
                                strokeWidth={1.7}
                            />
                        </div>

                        <h2 className="mt-4 text-sm font-semibold text-[#18181B]">
                            Không tìm thấy khóa học
                        </h2>

                        <p className="mt-1.5 text-sm text-[#71717A]">
                            Khóa học có thể không tồn tại
                            hoặc đã bị xóa.
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    /*
     * ============================================================
     * DATA
     * ============================================================
     */

    const lessons = course.lessons || [];

    const lessonCount =
        course.lessonCount ?? lessons.length;

    const teacherName =
        typeof course.teacher === "string"
            ? course.teacher
            : course.teacher?.name;

    const isFree = Number(course.price || 0) <= 0;

    const isLocked = course.status === false;

    /*
     * ============================================================
     * PAGE
     * ============================================================
     */

    return (
        <div className="min-h-full bg-[#F8FAFC]">
            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white">
                <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            onClick={handleBack}
                            aria-label="Quay lại"
                            className={[
                                "flex h-9 w-9 items-center justify-center",
                                "rounded-lg text-[#52525B]",
                                "transition-colors",
                                "hover:bg-[#F6F6F7]",
                                "hover:text-[#18181B]",
                            ].join(" ")}
                        >
                            <ArrowLeft
                                size={19}
                                strokeWidth={1.8}
                            />
                        </button>

                        <span className="text-sm font-semibold text-[#18181B]">
                            Chi tiết
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setIsFavorite((prev) => !prev)
                        }
                        aria-label={
                            isFavorite
                                ? "Bỏ yêu thích"
                                : "Thêm vào yêu thích"
                        }
                        className={[
                            "flex h-9 w-9 items-center justify-center",
                            "rounded-lg text-[#52525B]",
                            "transition-colors",
                            "hover:bg-[#F6F6F7]",
                            "hover:text-[#18181B]",
                        ].join(" ")}
                    >
                        <Heart
                            size={19}
                            strokeWidth={1.8}
                            fill={
                                isFavorite
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    </button>
                </div>
            </header>

            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="w-full">
                {/* =================================================
                    THUMBNAIL
                ================================================= */}

                <div className="w-full bg-[#F1F2F4]">
                    <div className="mx-auto w-full max-w-7xl">
                        <div className="relative aspect-[16/7] overflow-hidden sm:aspect-[16/6] lg:aspect-[16/5]">
                            {course.thumbnail ? (
                                <img
                                    src={getUrl(
                                        course.thumbnail
                                    )}
                                    alt={course.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-[#A1A1AA]">
                                    <BookOpen
                                        size={40}
                                        strokeWidth={1.3}
                                    />
                                </div>
                            )}

                            {isLocked && (
                                <div className="absolute left-4 top-4">
                                    <span
                                        className={[
                                            "inline-flex items-center gap-1.5",
                                            "rounded-md bg-black/60",
                                            "px-2 py-1",
                                            "text-[11px] font-medium text-white",
                                            "backdrop-blur-sm",
                                        ].join(" ")}
                                    >
                                        <LockKeyhole size={11} />
                                        Tạm khóa
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* =================================================
                    COURSE INFORMATION
                ================================================= */}

                <section className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-7">
                    {/* TITLE */}

                    <h1 className="max-w-3xl text-xl font-semibold leading-7 tracking-tight text-[#18181B] sm:text-[22px]">
                        {course.title}
                    </h1>

                    {/* TEACHER */}

                    <div className="mt-2 flex items-center gap-1.5 text-[13px] text-[#71717A]">
                        <UserRound
                            size={14}
                            strokeWidth={1.7}
                        />

                        <span>
                            {teacherName || "Chưa cập nhật"}
                        </span>
                    </div>

                    {/* PRICE */}

                    <div className="mt-4 flex items-baseline gap-2">
                        <span
                            className={[
                                "text-[15px] font-semibold",
                                isFree
                                    ? "text-[#166534]"
                                    : "text-[#18181B]",
                            ].join(" ")}
                        >
                            {isFree
                                ? "Miễn phí"
                                : formatPrice(course.price)}
                        </span>

                        {course.durationMonths > 0 && (
                            <span className="text-xs text-[#A1A1AA]">
                                / {course.durationMonths} tháng
                            </span>
                        )}
                    </div>

                    {/* DESCRIPTION */}

                    {course.description?.trim() && (
                        <p className="mt-4 max-w-3xl text-[13px] leading-6 text-[#52525B]">
                            {course.description}
                        </p>
                    )}

                    {/* META */}

                    <div className="mt-5 flex items-center gap-5 border-t border-[#E5E7EB] pt-4">
                        <span className="flex items-center gap-1.5 text-xs text-[#71717A]">
                            <BookOpen
                                size={14}
                                strokeWidth={1.7}
                            />

                            {lessonCount} bài học
                        </span>

                        {course.totalDuration > 0 && (
                            <span className="flex items-center gap-1.5 text-xs text-[#71717A]">
                                <Clock3
                                    size={14}
                                    strokeWidth={1.7}
                                />

                                {formatDuration(
                                    course.totalDuration
                                )}
                            </span>
                        )}
                    </div>
                </section>

                {/* =================================================
                    LESSONS
                ================================================= */}

                <section className="mx-auto w-full max-w-5xl px-4 pb-10 sm:px-6 sm:pb-12">
                    {/* SECTION HEADER */}

                    <div className="flex items-end justify-between gap-4 border-b border-[#E5E7EB] pb-3">
                        <div>
                            <h2 className="text-sm font-semibold text-[#18181B]">
                                Nội dung khóa học
                            </h2>

                            <p className="mt-1 text-xs text-[#71717A]">
                                {lessonCount} bài học
                            </p>
                        </div>

                        {course.totalDuration > 0 && (
                            <span className="shrink-0 text-xs text-[#71717A]">
                                {formatDuration(
                                    course.totalDuration
                                )}
                            </span>
                        )}
                    </div>

                    {/* LESSON LIST */}

                    {lessons.length > 0 ? (
                        <div>
                            {lessons.map((lesson, index) => {
                                const lessonLocked =
                                    !lesson.isFree;

                                return (
                                    <div
                                        key={lesson.id}
                                        className={[
                                            "flex items-center gap-3",
                                            "border-b border-[#F0F0F1]",
                                            "py-3.5",
                                            "transition-colors",
                                            !lessonLocked
                                                ? "hover:bg-[#FAFAFA]"
                                                : "",
                                        ].join(" ")}
                                    >
                                        {/* NUMBER */}

                                        <span className="w-7 shrink-0 text-xs font-medium text-[#A1A1AA]">
                                            {String(
                                                lesson.order ??
                                                index + 1
                                            ).padStart(2, "0")}
                                        </span>

                                        {/* CONTENT */}

                                        <div className="min-w-0 flex-1">
                                            <p
                                                className={[
                                                    "truncate text-[13px] font-medium",
                                                    lessonLocked
                                                        ? "text-[#71717A]"
                                                        : "text-[#18181B]",
                                                ].join(" ")}
                                            >
                                                {lesson.title}
                                            </p>

                                            <div className="mt-1 flex items-center gap-2 text-[11px] text-[#A1A1AA]">
                                                {lesson.duration !=
                                                    null && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock3
                                                                size={
                                                                    11
                                                                }
                                                                strokeWidth={
                                                                    1.8
                                                                }
                                                            />

                                                            {formatDuration(
                                                                lesson.duration
                                                            )}
                                                        </span>
                                                    )}

                                                {lesson.isFree && (
                                                    <span className="rounded bg-[#F0FDF4] px-1.5 py-0.5 text-[10px] font-medium text-[#166534]">
                                                        Miễn phí
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* ACTION */}

                                        {lessonLocked ? (
                                            <LockKeyhole
                                                size={15}
                                                strokeWidth={1.8}
                                                className="shrink-0 text-[#A1A1AA]"
                                            />
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleLessonClick(
                                                        lesson
                                                    )
                                                }
                                                aria-label={`Xem trước ${lesson.title}`}
                                                className={[
                                                    "flex h-8 w-8 shrink-0",
                                                    "items-center justify-center",
                                                    "rounded-full",
                                                    "text-[#71717A]",
                                                    "transition-colors",
                                                    "hover:bg-[#F1F2F4]",
                                                    "hover:text-[#18181B]",
                                                ].join(" ")}
                                            >
                                                <PlayCircle
                                                    size={18}
                                                    strokeWidth={
                                                        1.8
                                                    }
                                                />
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-sm text-[#71717A]">
                            Khóa học chưa có bài học.
                        </div>
                    )}
                </section>
            </main>

            {/* =====================================================
                FREE LESSON PREVIEW
            ===================================================== */}

            {previewLesson && (
                <div
                    className={[
                        "fixed inset-0 z-[100]",
                        "flex items-center justify-center",
                        "bg-black/70 p-4",
                    ].join(" ")}
                    onClick={() => setPreviewLesson(null)}
                >
                    <div
                        className={[
                            "w-full max-w-4xl overflow-hidden",
                            "rounded-xl bg-white",
                            "shadow-2xl",
                        ].join(" ")}
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        {/* MODAL HEADER */}

                        <div className="flex h-12 items-center justify-between gap-4 border-b border-[#E5E7EB] pl-4">
                            <h3 className="min-w-0 truncate text-sm font-semibold text-[#18181B]">
                                Bài{" "}
                                {previewLesson.order}:{" "}
                                {previewLesson.title}
                            </h3>

                            <button
                                type="button"
                                onClick={() =>
                                    setPreviewLesson(null)
                                }
                                aria-label="Đóng"
                                className={[
                                    "flex h-10 w-10 shrink-0",
                                    "items-center justify-center",
                                    "text-[#71717A]",
                                    "transition-colors",
                                    "hover:bg-[#F6F6F7]",
                                    "hover:text-[#18181B]",
                                ].join(" ")}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* VIDEO */}

                        <div className="aspect-video w-full bg-black">
                            <video
                                key={previewLesson.id}
                                src={getUrl(
                                    previewLesson.video
                                )}
                                controls
                                controlsList="nodownload noplaybackrate"
                                disablePictureInPicture
                                autoPlay
                                playsInline
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExploreCourseDetailPage;
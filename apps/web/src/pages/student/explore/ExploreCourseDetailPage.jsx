import { useEffect, useState } from "react";

import {
    ArrowLeft,
    BookOpen,
    CalendarDays,
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
        if (!lesson?.isFree) return;

        setPreviewLesson(lesson);
    };

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                setLoading(true);

                const response =
                    await courseService.getCourseDetails(courseId);

                setCourse(response?.data || null);
            } catch (error) {
                console.error(
                    "Lỗi khi lấy chi tiết khóa học:",
                    error
                );

                setCourse(null);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourseDetail();
        }
    }, [courseId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC]">
                <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mb-6 h-6 w-40 animate-pulse rounded-lg bg-gray-200" />

                    <div className="overflow-hidden rounded-2xl bg-white">
                        <div className="aspect-[16/9] animate-pulse bg-gray-200 sm:aspect-[16/7]" />
                    </div>

                    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_260px]">
                        <div className="space-y-4">
                            <div className="h-7 w-3/4 animate-pulse rounded bg-gray-200" />
                            <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
                            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
                        </div>

                        <div className="h-36 animate-pulse rounded-2xl bg-gray-200" />
                    </div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                        <BookOpen
                            size={24}
                            className="text-gray-400"
                        />
                    </div>

                    <h2 className="text-lg font-semibold text-[#18181B]">
                        Không tìm thấy khóa học
                    </h2>

                    <p className="mt-1 text-sm text-[#71717A]">
                        Khóa học có thể đã bị xóa hoặc không tồn tại.
                    </p>

                    <button
                        onClick={handleBack}
                        className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[#2563EB] px-5 text-sm font-medium text-white transition hover:bg-[#1D4ED8]"
                    >
                        <ArrowLeft size={15} />
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    const lessons = course.lessons || [];

    const lessonCount = lessons.length;

    const teacherName =
        typeof course.teacher === "string"
            ? course.teacher
            : course.teacher?.name || "Chưa cập nhật";

    const isFree = Number(course.price || 0) <= 0;

    const isLocked = course.status === false;

    const durationMonths = Number(
        course.durationMonths || 0
    );

    return (
        <div className="min-h-screen bg-white text-[#18181B]">
            {/* HEADER */}
            <header className="border-b border-[#E5E7EB] bg-white">
                <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 text-[13px] font-medium text-[#52525B] transition hover:text-[#18181B]"
                    >
                        <ArrowLeft
                            size={17}
                            strokeWidth={2}
                        />

                        <span>Chi tiết khóa học</span>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setIsFavorite((prev) => !prev)
                        }
                        aria-label="Yêu thích"
                        className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#F4F4F5]"
                    >
                        <Heart
                            size={18}
                            strokeWidth={1.8}
                            className={
                                isFavorite
                                    ? "fill-red-500 text-red-500"
                                    : "text-[#71717A]"
                            }
                        />
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-3 py-4 sm:px-6 sm:py-8 lg:px-8">
                {/* THUMBNAIL */}
                <section>
                    <div className="relative overflow-hidden rounded-xl bg-[#F1F2F4]">
                        <div className="aspect-[16/9] sm:aspect-[16/7] lg:aspect-[16/6]">
                            {course.thumbnail ? (
                                <img
                                    src={getUrl(
                                        course.thumbnail
                                    )}
                                    alt={course.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <BookOpen
                                        size={48}
                                        strokeWidth={1.2}
                                        className="text-gray-400"
                                    />
                                </div>
                            )}
                        </div>

                        {/* OVERLAY */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                        {/* LOCKED */}
                        {isLocked && (
                            <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1.5 text-[10px] font-medium text-white backdrop-blur-md">
                                    <LockKeyhole size={11} />
                                    Tạm khóa
                                </span>
                            </div>
                        )}

                        {/* PRICE */}
                        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                            <span
                                className={[
                                    "inline-flex items-center rounded-full",
                                    "px-3 py-1.5",
                                    "text-[11px] font-semibold",
                                    "shadow-sm backdrop-blur-md",
                                    isFree
                                        ? "bg-[#ECFDF3]/95 text-[#15803D]"
                                        : "bg-white/95 text-[#18181B]",
                                ].join(" ")}
                            >
                                {isFree
                                    ? "Miễn phí"
                                    : formatPrice(
                                        course.price
                                    )}
                            </span>
                        </div>
                    </div>
                </section>

                {/* COURSE INFO */}
                <section className="mt-5">
                    <div className="min-w-0">
                        {/* TITLE */}
                        <h1 className="text-[18px] font-semibold leading-6 tracking-[-0.01em] text-[#18181B] sm:text-[20px]">
                            {course.title}
                        </h1>


                        {/* COURSE META */}
                        <div className="mt-4 flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-6">
                            <div className="flex items-center gap-2 text-[12px] text-[#71717A]">
                                <UserRound
                                    size={14}
                                    className="text-[#71717A]"
                                />

                                <span className="font-medium text-[#52525B]">
                                    {teacherName}
                                </span>
                            </div>
                            <span className="h-1 w-1 rounded-full bg-[#18181B]" />
                            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#52525B]">
                                <CalendarDays
                                    size={18}
                                    strokeWidth={1.8}
                                    className="text-[#71717A]"
                                />

                                <span>
                                    {durationMonths}{" "}
                                    {durationMonths === 1
                                        ? "tháng"
                                        : "tháng"}
                                </span>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        {course.description && (
                            <div className="mt-5">
                                <p className="max-w-3xl whitespace-pre-line text-[13px] leading-6 text-[#52525B]">
                                    {course.description}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* LESSONS */}
                <section className="mt-4 border-t border-[#E5E7EB] pt-5">
                    <div className="mb-3">
                        <h2 className="text-[15px] font-semibold text-[#18181B]">
                            Nội dung khóa học
                        </h2>

                        <p className="mt-1 text-[11px] text-[#71717A]">
                            {lessonCount} bài học
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
                        {lessons.length > 0 ? (
                            lessons.map((lesson, index) => {
                                const lessonLocked =
                                    !lesson.isFree;

                                return (
                                    <div
                                        key={
                                            lesson.id ||
                                            lesson._id ||
                                            index
                                        }
                                        className={[
                                            "group flex min-h-[62px]",
                                            "items-center gap-3",
                                            "border-b border-[#F0F0F1]",
                                            "px-3.5 py-3",
                                            "last:border-b-0",
                                            "transition",
                                            lesson.isFree
                                                ? "hover:bg-[#FAFAFA]"
                                                : "bg-white",
                                        ].join(" ")}
                                    >
                                        {/* NUMBER */}
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F5] text-[10px] font-semibold text-[#71717A]">
                                            {String(
                                                index + 1
                                            ).padStart(2, "0")}
                                        </div>

                                        {/* CONTENT */}
                                        <div className="min-w-0 flex-1">
                                            <div
                                                className={[
                                                    "truncate text-[12px] font-medium",
                                                    lessonLocked
                                                        ? "text-[#71717A]"
                                                        : "text-[#27272A]",
                                                ].join(" ")}
                                            >
                                                {lesson.title}
                                            </div>

                                            <div className="mt-1 flex items-center gap-2">
                                                {lesson.duration && (
                                                    <span className="text-[10px] text-[#A1A1AA]">
                                                        {formatDuration(
                                                            lesson.duration
                                                        )}
                                                    </span>
                                                )}

                                                {lesson.isFree && (
                                                    <span className="inline-flex items-center rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[9px] font-medium text-[#15803D]">
                                                        Miễn phí
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* ACTION */}
                                        <div className="shrink-0">
                                            {lessonLocked ? (
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F4F5]">
                                                    <LockKeyhole
                                                        size={14}
                                                        className="text-[#A1A1AA]"
                                                    />
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleLessonClick(
                                                            lesson
                                                        )
                                                    }
                                                    className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB] transition hover:bg-[#DBEAFE]"
                                                    aria-label={`Xem ${lesson.title}`}
                                                >
                                                    <PlayCircle
                                                        size={16}
                                                        strokeWidth={
                                                            1.8
                                                        }
                                                    />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="px-5 py-10 text-center">
                                <BookOpen
                                    size={28}
                                    className="mx-auto text-[#A1A1AA]"
                                    strokeWidth={1.5}
                                />

                                <p className="mt-3 text-[12px] text-[#71717A]">
                                    Khóa học chưa có bài học.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* PREVIEW MODAL */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm transition-all duration-200 sm:p-6 ${previewLesson
                    ? "visible opacity-100"
                    : "invisible pointer-events-none opacity-0"
                    }`}
                onClick={() => setPreviewLesson(null)}
            >
                <div
                    className={`flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ${previewLesson
                        ? "translate-y-0 scale-100"
                        : "translate-y-2 scale-[0.98]"
                        }`}
                    onClick={(event) => event.stopPropagation()}
                >
                    {/* HEADER */}
                    <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#E5E7EB] bg-white px-4 sm:px-5">
                        <div className="min-w-0 pr-4">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[10px] font-semibold text-[#2563EB]">
                                    {previewLesson
                                        ? String(
                                            lessons.findIndex(
                                                (lesson) =>
                                                    lesson.id === previewLesson.id ||
                                                    lesson._id === previewLesson._id
                                            ) + 1
                                        ).padStart(2, "0")
                                        : "01"}
                                </span>

                                <p className="truncate text-[12px] font-medium text-[#18181B]">
                                    {previewLesson?.title || ""}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setPreviewLesson(null)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#71717A] transition hover:bg-[#F4F4F5] hover:text-[#18181B]"
                            aria-label="Đóng"
                        >
                            <X size={19} strokeWidth={1.8} />
                        </button>
                    </div>

                    {/* VIDEO */}
                    <div className="flex w-full items-center justify-center bg-[#F4F4F5] p-2 sm:p-4">
                        {previewLesson?.video ? (
                            <video
                                src={getUrl(previewLesson.video)}
                                className="aspect-video w-full max-h-[75vh] rounded-lg bg-black object-contain"
                                controls
                                controlsList="nodownload noplaybackrate"
                                disablePictureInPicture
                                autoPlay
                                playsInline
                            />
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-[#F4F4F5]">
                                <div className="text-center">
                                    <PlayCircle
                                        size={42}
                                        strokeWidth={1.2}
                                        className="mx-auto text-[#A1A1AA]"
                                    />

                                    <p className="mt-4 text-[12px] text-[#71717A]">
                                        Video chưa khả dụng
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreCourseDetailPage;
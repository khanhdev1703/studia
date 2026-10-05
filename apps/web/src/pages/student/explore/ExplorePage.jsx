import { useEffect, useState } from "react";

import {
    BookOpen,
    Clock3,
    CalendarDays,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Loading from "../../../components/common/Loading";

import courseService from "../../../services/courseService";

import formatDuration from "../../../utils/formatDuration";
import formatPrice from "../../../utils/formatPrice";
import getUrl from "../../../utils/getUrl";

const ExplorePage = () => {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);

                const response =
                    await courseService.searchPublishedCourses({
                        search: "",
                    });

                setCourses(response?.data || []);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseClick = (courseId) => {
        navigate(`/student/explore/${courseId}`);
    };

    return (
        <div className="min-h-full bg-[#F8FAFC]">
            {/* HEADER */}
            <header className="border-b border-[#E5E7EB] bg-white">
                <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
                    <h1 className="text-lg font-semibold tracking-tight text-[#18181B]">
                        Khám phá
                    </h1>

                    {!loading && (
                        <span
                            className={[
                                "flex h-7 min-w-7 items-center justify-center",
                                "rounded-full bg-[#18181B] px-2",
                                "text-xs font-semibold text-white",
                            ].join(" ")}
                        >
                            {courses.length}
                        </span>
                    )}
                </div>
            </header>

            {/* BODY */}
            <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6">
                {/* LOADING */}
                {loading && (
                    <div
                        className={[
                            "flex min-h-[280px]",
                            "items-center justify-center",
                            "rounded-2xl",
                            "border border-[#E5E7EB]",
                            "bg-white",
                        ].join(" ")}
                    >
                        <Loading
                            text="Đang tải khóa học..."
                            fullScreen={false}
                        />
                    </div>
                )}

                {/* COURSES */}
                {!loading && courses.length > 0 && (
                    <div
                        className={[
                            "grid grid-cols-1 gap-5",
                            "sm:grid-cols-2",
                            "lg:grid-cols-3",
                            "xl:grid-cols-4",
                        ].join(" ")}
                    >
                        {courses.map((course) => {
                            const isFree =
                                Number(course.price || 0) <= 0;

                            const durationMonths =
                                Number(course.durationMonths || 0);

                            return (
                                <div
                                    key={course.id}
                                    role="button"
                                    tabIndex={0}
                                    onClick={() =>
                                        handleCourseClick(course.id)
                                    }
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Enter" ||
                                            event.key === " "
                                        ) {
                                            event.preventDefault();
                                            handleCourseClick(course.id);
                                        }
                                    }}
                                    className={[
                                        "group flex h-full cursor-pointer flex-col",
                                        "overflow-hidden rounded-2xl",
                                        "border border-[#E5E7EB]",
                                        "bg-white",
                                        "text-left",
                                        "transition-all duration-200",
                                        "hover:-translate-y-1",
                                        "hover:border-[#D4D4D8]",
                                        "hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]",
                                        "focus:outline-none",
                                        "focus:ring-2 focus:ring-[#2563EB]/20",
                                    ].join(" ")}
                                >
                                    {/* THUMBNAIL */}
                                    <div className="relative aspect-[16/9] overflow-hidden bg-[#F1F2F4]">
                                        {course.thumbnail ? (
                                            <img
                                                src={getUrl(
                                                    course.thumbnail
                                                )}
                                                alt={course.title}
                                                className={[
                                                    "h-full w-full object-cover",
                                                    "transition-transform duration-300",
                                                    "group-hover:scale-[1.03]",
                                                ].join(" ")}
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-[#A1A1AA]">
                                                <BookOpen
                                                    size={32}
                                                    strokeWidth={1.5}
                                                />
                                            </div>
                                        )}

                                        {/* DARK OVERLAY */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                                        {/* PRICE */}
                                        <div className="absolute bottom-3 right-3">
                                            <span
                                                className={[
                                                    "inline-flex items-center",
                                                    "rounded-full",
                                                    "px-3 py-1.5",
                                                    "text-[11px] font-semibold",
                                                    "shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
                                                    "backdrop-blur-sm",
                                                    isFree
                                                        ? "bg-white/95 text-[#15803D]"
                                                        : "bg-[#18181B]/95 text-white",
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

                                    {/* CONTENT */}
                                    <div className="flex flex-1 flex-col p-4">
                                        {/* TITLE */}
                                        <h2 className="line-clamp-2 text-[15px] font-semibold leading-[21px] text-[#18181B]">
                                            {course.title}
                                        </h2>

                                        {/* TEACHER */}
                                        <p className="mt-2 truncate text-xs text-[#71717A]">
                                            {course.teacher?.name ||
                                                "Giáo viên Stady"}
                                        </p>

                                        {/* META */}
                                        <div className="mt-4 border-t border-[#F0F0F1] pt-3.5">
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[#71717A]">
                                                {/* LESSON COUNT */}
                                                <span className="flex items-center gap-1.5">
                                                    <BookOpen
                                                        size={13}
                                                        strokeWidth={1.8}
                                                    />

                                                    <span>
                                                        {course.lessonCount ??
                                                            0}{" "}
                                                        bài
                                                    </span>
                                                </span>

                                                {/* DIVIDER */}
                                                <span className="h-3.5 w-px bg-[#E5E7EB]" />

                                                {/* DURATION */}
                                                <span className="flex items-center gap-1.5">
                                                    <Clock3
                                                        size={13}
                                                        strokeWidth={1.8}
                                                    />

                                                    <span>
                                                        {formatDuration(
                                                            course.totalDuration ??
                                                            0
                                                        )}
                                                    </span>
                                                </span>

                                                {/* MONTHS */}
                                                {durationMonths > 0 && (
                                                    <>
                                                        <span className="h-3.5 w-px bg-[#E5E7EB]" />

                                                        <span className="flex items-center gap-1.5">
                                                            <CalendarDays
                                                                size={13}
                                                                strokeWidth={
                                                                    1.8
                                                                }
                                                            />

                                                            <span>
                                                                {
                                                                    durationMonths
                                                                }{" "}
                                                                tháng
                                                            </span>
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* VIEW BUTTON */}
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-[11px] text-[#A1A1AA]">
                                                Xem chi tiết
                                            </span>

                                            <span
                                                className={[
                                                    "inline-flex items-center",
                                                    "rounded-full",
                                                    "bg-[#2563EB]",
                                                    "px-3.5 py-1.5",
                                                    "text-[11px] font-semibold",
                                                    "text-white",
                                                    "shadow-sm",
                                                    "transition-all duration-200",
                                                    "group-hover:bg-[#1D4ED8]",
                                                    "group-hover:shadow-md",
                                                ].join(" ")}
                                            >
                                                Xem
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* EMPTY */}
                {!loading && courses.length === 0 && (
                    <div
                        className={[
                            "mx-auto flex min-h-[280px] max-w-xl",
                            "flex-col items-center justify-center",
                            "rounded-2xl",
                            "border border-[#E5E7EB]",
                            "bg-white",
                            "px-6",
                            "text-center",
                        ].join(" ")}
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F4F5]">
                            <BookOpen
                                size={22}
                                strokeWidth={1.5}
                                className="text-[#A1A1AA]"
                            />
                        </div>

                        <h2 className="mt-4 text-sm font-semibold text-[#18181B]">
                            Chưa có khóa học
                        </h2>

                        <p className="mt-1 text-xs text-[#71717A]">
                            Hiện tại chưa có khóa học nào để hiển thị.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ExplorePage;
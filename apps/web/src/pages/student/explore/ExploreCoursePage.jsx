import { useEffect, useState } from "react";
import { BookOpen, Clock3 } from "lucide-react";
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
                console.error(
                    "Failed to fetch courses:",
                    error
                );

                setCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseClick = (courseId) => {
        navigate(`/student/explore/courses/${courseId}`);
    };

    return (
        <div className="min-h-full bg-[#F8FAFC]">
            <div className="mx-auto w-full max-w-[1080px] px-4 py-4 sm:px-6 sm:py-2">
                {/* SIMPLE HEADER */}
                <div className="mb-5">
                    <h1 className="text-lg font-semibold text-[#18181B] sm:text-xl">
                        Khóa học
                    </h1>

                    {!loading && courses.length > 0 && (
                        <p className="mt-1 text-xs text-[#71717A]">
                            {courses.length} khóa học đang có sẵn
                        </p>
                    )}
                </div>

                {/* LOADING */}
                {loading && (
                    <div
                        className={[
                            "flex min-h-[280px]",
                            "items-center justify-center",
                            "rounded-xl",
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
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => {
                            const isFree =
                                Number(course.price || 0) <= 0;

                            return (
                                <button
                                    key={course.id}
                                    type="button"
                                    onClick={() =>
                                        handleCourseClick(
                                            course.id
                                        )
                                    }
                                    className={[
                                        "group overflow-hidden",
                                        "rounded-xl",
                                        "border border-[#E5E7EB]",
                                        "bg-white",
                                        "text-left",
                                        "transition-all duration-200",
                                        "hover:-translate-y-0.5",
                                        "hover:border-[#D4D4D8]",
                                        "hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)]",
                                    ].join(" ")}
                                >
                                    {/* THUMBNAIL */}
                                    <div className="aspect-[16/9] overflow-hidden bg-[#F1F2F4]">
                                        {course.thumbnail ? (
                                            <img
                                                src={getUrl(
                                                    course.thumbnail
                                                )}
                                                alt={course.title}
                                                className={[
                                                    "h-full w-full object-cover",
                                                    "transition-transform duration-300",
                                                    "group-hover:scale-[1.02]",
                                                ].join(" ")}
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-[#A1A1AA]">
                                                <BookOpen
                                                    size={26}
                                                    strokeWidth={1.5}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-4">
                                        <h2 className="line-clamp-2 min-h-[40px] text-sm font-semibold leading-5 text-[#18181B]">
                                            {course.title}
                                        </h2>

                                        <p className="mt-1.5 truncate text-xs text-[#71717A]">
                                            {course.teacher?.name ||
                                                "Giáo viên Stady"}
                                        </p>

                                        <div className="mt-3.5 flex items-center justify-between border-t border-[#E5E7EB] pt-3">
                                            <div className="flex min-w-0 items-center gap-2.5 text-[11px] text-[#71717A]">
                                                <span className="flex shrink-0 items-center gap-1">
                                                    <BookOpen
                                                        size={12}
                                                        strokeWidth={1.8}
                                                    />
                                                    {course.lessonCount ??
                                                        0}{" "}
                                                    bài
                                                </span>

                                                <span className="flex min-w-0 items-center gap-1">
                                                    <Clock3
                                                        size={12}
                                                        strokeWidth={1.8}
                                                    />
                                                    <span className="truncate">
                                                        {formatDuration(
                                                            course.totalDuration ??
                                                            0
                                                        )}
                                                    </span>
                                                </span>
                                            </div>

                                            <span
                                                className={[
                                                    "ml-2 shrink-0 text-xs font-semibold",
                                                    isFree
                                                        ? "text-[#166534]"
                                                        : "text-[#18181B]",
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
                                </button>
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
                            "rounded-xl",
                            "border border-[#E5E7EB]",
                            "bg-white",
                            "px-6",
                            "text-center",
                        ].join(" ")}
                    >
                        <div
                            className={[
                                "flex h-11 w-11 items-center justify-center",
                                "rounded-full",
                                "bg-[#F1F2F4]",
                                "text-[#52525B]",
                            ].join(" ")}
                        >
                            <BookOpen
                                size={20}
                                strokeWidth={1.7}
                            />
                        </div>

                        <h2 className="mt-4 text-sm font-semibold text-[#18181B]">
                            Chưa có khóa học
                        </h2>

                        <p className="mt-1.5 text-sm text-[#71717A]">
                            Hiện chưa có khóa học nào để khám phá.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExplorePage;
import { useEffect, useState } from "react";
import { BookOpen, Clock3, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import formatPrice from "../../../utils/formatPrice";
import getUrl from "../../../utils/getUrl";
import formatDuration from "../../../utils/formatDuration";

import courseService from "../../../services/courseService";
import Loading from "../../../components/common/Loading";

const ExploreCoursePage = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true);

            try {
                const response = await courseService.searchCourse({
                    search: search.trim(),
                });

                setCourses(response.data || []);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    const handleCourseClick = (courseId) => {
        navigate(`/student/explore/courses/${courseId}`);
    };

    return (
        <section className="mt-3">
            {/* Search */}
            <div className="relative">
                <Search
                    size={19}
                    strokeWidth={1.8}
                    className="
                        absolute
                        left-4
                        top-1/2
                        z-10
                        -translate-y-1/2
                        text-[#9B98AD]
                    "
                />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm khóa học..."
                    className="
                        w-full
                        rounded-lg
                        border
                        border-white/80
                        bg-white/90
                        py-3.5
                        pl-11
                        pr-4
                        text-[13px]
                        text-[#24234D]
                        outline-none
                        shadow-[0_10px_30px_rgba(60,55,110,0.08)]
                        backdrop-blur-sm
                        transition
                        placeholder:text-[#AAA8B8]
                        focus:border-[#DCD7FF]
                        focus:ring-4
                        focus:ring-[#6C5CE7]/10
                    "
                />
            </div>

            {/* Courses */}
            <div className="mt-5">
                <div className="mb-4">
                    <h2
                        className="
                            text-[17px]
                            font-semibold
                            text-[#24234D]
                        "
                    >
                        {search.trim()
                            ? "Kết quả tìm kiếm"
                            : "Khóa học nổi bật"}
                    </h2>

                    <p
                        className="
                            mt-1
                            text-[11px]
                            text-[#9997AA]
                        "
                    >
                        {search.trim()
                            ? loading
                                ? "Đang tìm kiếm..."
                                : `${courses.length} khóa học được tìm thấy`
                            : "Bắt đầu hành trình học tập của bạn."}
                    </p>
                </div>

                {loading ? (
                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-dashed
                            border-[#DDD9EF]
                            bg-white/80
                            px-6
                            py-14
                            text-center
                            shadow-sm
                            backdrop-blur-sm
                        "
                    >
                        <Loading
                            text="Đang tải khoá học ..."
                            fullScreen={false}
                        />
                    </div>

                ) : courses.length > 0 ? (
                    <div
                        className="
                            grid
                            gap-4
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >
                        {courses.map((course) => {
                            const isFree = course.price <= 0;

                            return (
                                <button
                                    key={course.id}
                                    type="button"
                                    onClick={() =>
                                        handleCourseClick(course.id)
                                    }
                                    className="
                                        group
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-white/80
                                        bg-white
                                        text-left
                                        shadow-[0_8px_25px_rgba(60,55,110,0.06)]
                                        transition-all
                                        duration-200
                                        hover:-translate-y-1
                                        hover:shadow-[0_15px_35px_rgba(60,55,110,0.12)]
                                    "
                                >
                                    {/* Thumbnail */}
                                    <div
                                        className="
                                            relative
                                            h-[165px]
                                            overflow-hidden
                                            bg-[#EEEAFE]
                                        "
                                    >
                                        <img
                                            src={getUrl(
                                                course.thumbnail
                                            )}
                                            alt={course.title}
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                                transition
                                                duration-500
                                                group-hover:scale-105
                                            "
                                        />

                                        {/* Overlay */}
                                        <div
                                            className="
                                                pointer-events-none
                                                absolute
                                                inset-x-0
                                                bottom-0
                                                h-20
                                                bg-gradient-to-t
                                                from-black/20
                                                to-transparent
                                            "
                                        />

                                        {/* Badge */}
                                        <span
                                            className={`
                                                absolute
                                                left-3
                                                top-3
                                                rounded-full
                                                px-2.5
                                                py-1
                                                text-[10px]
                                                font-semibold
                                                shadow-sm
                                                backdrop-blur-md
                                                ${isFree
                                                    ? "bg-[#E9F9F0]/95 text-[#24965A]"
                                                    : "bg-white/90 text-[#6C5CE7]"
                                                }
                                            `}
                                        >
                                            {isFree
                                                ? "Miễn phí"
                                                : "Nổi bật"}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3
                                            className="
                                                line-clamp-1
                                                text-[14px]
                                                font-semibold
                                                text-[#24234D]
                                            "
                                        >
                                            {course.title}
                                        </h3>

                                        <p
                                            className="
                                                mt-1.5
                                                line-clamp-2
                                                text-[11px]
                                                leading-4
                                                text-[#9997AA]
                                            "
                                        >
                                            {course.description ||
                                                "Khóa học chưa có mô tả."}
                                        </p>

                                        {/* Teacher */}
                                        <p
                                            className="
                                                mt-2.5
                                                text-[11px]
                                                font-medium
                                                text-[#77758A]
                                            "
                                        >
                                            {course.teacher?.name ||
                                                "Giáo viên Stady"}
                                        </p>

                                        {/* Course information */}
                                        <div
                                            className="
                                                mt-3
                                                flex
                                                items-center
                                                justify-between
                                                border-t
                                                border-[#F1F0F6]
                                                pt-3
                                            "
                                        >
                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                    text-[10px]
                                                    text-[#9997AA]
                                                "
                                            >
                                                <span className="flex items-center gap-1">
                                                    <BookOpen size={12} />

                                                    {course.lessonCount ?? 0}{" "}
                                                    bài
                                                </span>

                                                <span className="flex items-center gap-1">
                                                    <Clock3 size={12} />

                                                    {formatDuration(
                                                        course.duration ?? 0
                                                    )}
                                                </span>
                                            </div>

                                            {/* Price */}
                                            <span
                                                className={`
                                                    rounded-full
                                                    px-2.5
                                                    py-1
                                                    text-[11px]
                                                    font-bold
                                                    ${isFree
                                                        ? "bg-[#E9F9F0] text-[#24965A]"
                                                        : "bg-[#EEEAFE] text-[#6C5CE7]"
                                                    }
                                                `}
                                            >
                                                {formatPrice(course.price)}
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-dashed
                            border-[#DDD9EF]
                            bg-white/80
                            px-6
                            py-14
                            text-center
                            shadow-sm
                            backdrop-blur-sm
                        "
                    >
                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#EEEAFE]
                                text-[#6C5CE7]
                            "
                        >
                            <Search size={21} />
                        </div>

                        <h3
                            className="
                                mt-3
                                text-[14px]
                                font-semibold
                                text-[#24234D]
                            "
                        >
                            {search.trim()
                                ? "Không tìm thấy khóa học"
                                : "Chưa có khóa học"}
                        </h3>

                        <p
                            className="
                                mt-1
                                text-[11px]
                                text-[#9997AA]
                            "
                        >
                            {search.trim()
                                ? "Thử tìm kiếm với từ khóa khác."
                                : "Hiện chưa có khóa học nào để khám phá."}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ExploreCoursePage;
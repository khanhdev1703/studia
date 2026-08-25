import { useEffect, useState } from "react";
import { BookOpen, Clock3, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import formatPrice from "../../../utils/formatPrice";
import getImageUrl from "../../../utils/getImageUrl"
import courseService from "../../../services/courseService";
import formatDuration from "../../../utils/formatDuration";

import Loading from "../../../components/common/Loading"

const ExplorePage = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

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
        navigate(`/student/explore/${courseId}`);
    };

    return (
        <div className="relative min-h-full overflow-hidden bg-[#F4F3FF]">
            {/* Background Decorations */}

            {/* Large purple glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -left-24
                    -top-24
                    h-72
                    w-72
                    rounded-full
                    bg-[#8B7CF6]/20
                    blur-3xl
                "
            />

            {/* Blue glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    right-[-100px]
                    top-24
                    h-80
                    w-80
                    rounded-full
                    bg-[#72C7FF]/15
                    blur-3xl
                "
            />

            {/* Bottom pink glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-[-120px]
                    left-1/3
                    h-72
                    w-72
                    rounded-full
                    bg-[#D9A7FF]/15
                    blur-3xl
                "
            />

            {/* Decorative circle */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-[8%]
                    top-[180px]
                    h-3
                    w-3
                    rounded-full
                    bg-[#6C5CE7]/30
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    right-[12%]
                    top-[330px]
                    h-4
                    w-4
                    rounded-full
                    bg-[#72C7FF]/30
                "
            />

            {/* Decorative ring */}
            <div
                className="
                    pointer-events-none
                    absolute
                    right-[-45px]
                    top-[470px]
                    h-32
                    w-32
                    rounded-full
                    border-[18px]
                    border-[#6C5CE7]/5
                "
            />

            {/* Decorative small ring */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-[-30px]
                    top-[620px]
                    h-20
                    w-20
                    rounded-full
                    border-[10px]
                    border-[#72C7FF]/5
                "
            />

            {/* Content */}
            <div
                className="
                    relative
                    z-10
                    mx-auto
                    w-full
                    max-w-5xl
                    px-4
                    pb-24
                    sm:px-6
                    lg:px-8
                "
            >
                {/* Header */}
                <header>
                    <h1
                        className="
                            mt-3
                            text-[24px]
                            font-bold
                            tracking-tight
                            text-[#24234D]
                        "
                    >
                        Khám phá
                    </h1>

                    <p
                        className="
                            mt-1
                            max-w-md
                            text-[12px]
                            leading-5
                            text-[#85839A]
                        "
                    >
                        Tìm khóa học phù hợp và bắt đầu hành trình
                        học tập của bạn.
                    </p>
                </header>

                {/* Search */}
                <div className="relative mt-4">
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
                <section className="mt-4">
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
                        <Loading text="Đang tải khoá học ..." />
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
                                            "
                                        >
                                            <img
                                                src={getImageUrl(course.thumbnail)}
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

                                            {/* Thumbnail overlay */}
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
                                                {course.description}
                                            </p>

                                            <p
                                                className="
                                                    mt-2.5
                                                    text-[11px]
                                                    font-medium
                                                    text-[#77758A]
                                                "
                                            >
                                                {course.teacher?.name}
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
                                                        {course.lessonCount} bài
                                                    </span>

                                                    <span className="flex items-center gap-1">
                                                        <Clock3 size={12} />
                                                        {formatDuration(course.duration)}
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
                </section>
            </div>
        </div>
    );
};

export default ExplorePage;
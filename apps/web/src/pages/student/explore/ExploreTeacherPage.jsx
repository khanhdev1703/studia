import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import userService from "../../../services/userService";
import Loading from "../../../components/common/Loading";

const ExploreTeacherPage = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(async () => {
            setLoading(true);

            try {
                const response = await userService.searchTeachers({
                    search: search.trim(),
                });

                setTeachers(response.data || []);
            } catch (error) {
                console.error("Failed to fetch teachers:", error);
                setTeachers([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    const handleTeacherClick = (teacherId) => {
        navigate(`/student/explore/teachers/${teacherId}`);
    };

    return (
        <section className="mt-5">
            {/* Search */}
            <div className="relative">
                <Search
                    size={18}
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
                    placeholder="Tìm kiếm giáo viên..."
                    className="
                        w-full
                        rounded-full
                        border
                        border-white/80
                        bg-white/90
                        py-3
                        pl-11
                        pr-4
                        text-[13px]
                        text-[#24234D]
                        outline-none
                        shadow-[0_8px_25px_rgba(60,55,110,0.06)]
                        backdrop-blur-sm
                        transition
                        placeholder:text-[#AAA8B8]
                        focus:border-[#DCD7FF]
                        focus:ring-4
                        focus:ring-[#6C5CE7]/10
                    "
                />
            </div>

            {/* Teachers */}
            <div className="mt-5">
                {/* Section Header */}
                <div className="mb-3.5">
                    <h2
                        className="
                            text-[16px]
                            font-semibold
                            text-[#24234D]
                        "
                    >
                        {search.trim()
                            ? "Kết quả tìm kiếm"
                            : "Giáo viên nổi bật"}
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
                                : `${teachers.length} giáo viên được tìm thấy`
                            : "Khám phá những giáo viên đang chia sẻ kiến thức trên Stady."}
                    </p>
                </div>

                {/* Loading */}
                {loading ? (
                    <Loading
                        text="Đang tải giáo viên ..."
                        fullScreen={false}
                    />
                ) : teachers.length > 0 ? (
                    <div
                        className="
                            grid
                            gap-3
                            sm:grid-cols-2
                            lg:grid-cols-3
                        "
                    >
                        {teachers.map((teacher) => (
                            <button
                                key={teacher.id}
                                type="button"
                                onClick={() =>
                                    handleTeacherClick(teacher.id)
                                }
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    border
                                    border-white/80
                                    bg-white
                                    p-3.5
                                    text-left
                                    shadow-[0_6px_20px_rgba(60,55,110,0.05)]
                                    transition-all
                                    duration-200
                                    hover:-translate-y-0.5
                                    hover:shadow-[0_10px_25px_rgba(60,55,110,0.10)]
                                "
                            >
                                {/* Avatar */}
                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#EEEAFE]
                                        text-[15px]
                                        font-bold
                                        text-[#6C5CE7]
                                        transition
                                        duration-200
                                        group-hover:bg-[#6C5CE7]
                                        group-hover:text-white
                                    "
                                >
                                    {teacher.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "T"}
                                </div>

                                {/* Teacher Info */}
                                <div className="min-w-0 flex-1">
                                    <h3
                                        className="
                                            truncate
                                            text-[13px]
                                            font-semibold
                                            text-[#24234D]
                                        "
                                    >
                                        {teacher.name}
                                    </h3>

                                    {/* Stats */}
                                    <div
                                        className="
                                            mt-2
                                            flex
                                            items-center
                                            gap-3
                                            text-[10px]
                                            text-[#9997AA]
                                        "
                                    >
                                        <span className="flex items-center gap-1">
                                            <BookOpen size={12} />
                                            {teacher.courseCount ?? 0} khóa học
                                        </span>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div
                                    className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-[#AAA8B8]
            transition-all
            duration-200
            group-hover:bg-[#EEEAFE]
            group-hover:text-[#6C5CE7]
        "
                                >
                                    <ArrowRight
                                        size={14}
                                        className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
            "
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-dashed
                            border-[#DDD9EF]
                            bg-white/80
                            px-6
                            py-12
                            text-center
                            shadow-sm
                            backdrop-blur-sm
                        "
                    >
                        <div
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                bg-[#EEEAFE]
                                text-[#6C5CE7]
                            "
                        >
                            <Search size={19} />
                        </div>

                        <h3
                            className="
                                mt-3
                                text-[13px]
                                font-semibold
                                text-[#24234D]
                            "
                        >
                            {search.trim()
                                ? "Không tìm thấy giáo viên"
                                : "Chưa có giáo viên"}
                        </h3>

                        <p
                            className="
                                mt-1
                                text-[10px]
                                text-[#9997AA]
                            "
                        >
                            {search.trim()
                                ? "Thử tìm kiếm với tên giáo viên khác."
                                : "Hiện chưa có giáo viên nào để khám phá."}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ExploreTeacherPage;
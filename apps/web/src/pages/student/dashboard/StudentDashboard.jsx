import {
    ArrowRight,
    Bell,
    BookOpen,
    ChevronRight,
    Clock3,
    GraduationCap,
    Play,
    Sparkles,
} from "lucide-react";

import useAuthStore from "../../../stores/authStore";

const StudentDashboard = () => {
    const user = useAuthStore((state) => state.user);

    const currentCourse = {
        id: "course-1",
        title: "React cơ bản",
        lessonTitle: "Bài 8: React Router",
        thumbnail:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
        progress: 72,
        completedLessons: 8,
        totalLessons: 12,
    };

    const myCourses = [
        {
            id: "course-1",
            title: "React cơ bản",
            teacher: "Nguyễn Văn An",
            progress: 72,
            completedLessons: 8,
            totalLessons: 12,
            thumbnail:
                "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=700&q=80",
        },
        {
            id: "course-2",
            title: "Node.js & Express",
            teacher: "Trần Minh Đức",
            progress: 35,
            completedLessons: 4,
            totalLessons: 11,
            thumbnail:
                "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=700&q=80",
        },
        {
            id: "course-3",
            title: "MongoDB cơ bản",
            teacher: "Lê Hoàng Nam",
            progress: 18,
            completedLessons: 2,
            totalLessons: 10,
            thumbnail:
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80",
        },
    ];

    const recommendedCourses = [
        {
            id: "course-4",
            title: "JavaScript từ cơ bản",
            teacher: "Nguyễn Minh Anh",
            lessons: 16,
            duration: "4 giờ",
            thumbnail:
                "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=700&q=80",
        },
        {
            id: "course-5",
            title: "UI/UX Design",
            teacher: "Phạm Thu Hà",
            lessons: 14,
            duration: "3 giờ",
            thumbnail:
                "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=700&q=80",
        },
    ];

    const getFirstName = (name) => {
        if (!name) return "bạn";

        return name.trim().split(" ").pop();
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#F8F7FF]">
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#DCD6FF]/50 blur-3xl" />

                <div className="absolute right-[-100px] top-[320px] h-72 w-72 rounded-full bg-[#FFE0EC]/50 blur-3xl" />

                <div className="absolute bottom-[200px] left-[-120px] h-72 w-72 rounded-full bg-[#D8F7EF]/40 blur-3xl" />

                {/* Flower 1 */}
                <div className="absolute left-[5%] top-[90px] hidden rotate-12 text-[#B9AEFF]/40 sm:block">
                    <div className="relative h-14 w-14">
                        <span className="absolute left-5 top-0 h-7 w-7 rounded-full bg-current" />
                        <span className="absolute bottom-0 left-5 h-7 w-7 rounded-full bg-current" />
                        <span className="absolute left-0 top-5 h-7 w-7 rounded-full bg-current" />
                        <span className="absolute right-0 top-5 h-7 w-7 rounded-full bg-current" />
                        <span className="absolute left-5 top-5 h-5 w-5 rounded-full bg-[#FFF3B8]" />
                    </div>
                </div>

                {/* Flower 2 */}
                <div className="absolute right-[8%] top-[520px] hidden -rotate-12 text-[#FFB8D0]/40 lg:block">
                    <div className="relative h-16 w-16">
                        <span className="absolute left-6 top-0 h-8 w-8 rounded-full bg-current" />
                        <span className="absolute bottom-0 left-6 h-8 w-8 rounded-full bg-current" />
                        <span className="absolute left-0 top-6 h-8 w-8 rounded-full bg-current" />
                        <span className="absolute right-0 top-6 h-8 w-8 rounded-full bg-current" />
                        <span className="absolute left-6 top-6 h-6 w-6 rounded-full bg-[#FFE8A8]" />
                    </div>
                </div>

                {/* Decorative stars */}
                <Sparkles
                    className="absolute right-[12%] top-[100px] text-[#F6B8D2]/70"
                    size={24}
                />

                <Sparkles
                    className="absolute left-[12%] top-[470px] text-[#B8DFF5]/70"
                    size={20}
                />

                {/* Small dots */}
                <div className="absolute right-[18%] top-[230px] h-2 w-2 rounded-full bg-[#FFB5C8]" />
                <div className="absolute left-[20%] top-[350px] h-2.5 w-2.5 rounded-full bg-[#B8AFFF]" />
                <div className="absolute right-[5%] bottom-[180px] h-3 w-3 rounded-full bg-[#AEE7D5]" />
            </div>

            <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-8 lg:pt-8">

                {/* Header */}
                <header className="flex items-center justify-between">
                    <div>
                        <p className="text-[12px] font-medium text-[#8C8AA5]">
                            Chào mừng trở lại
                        </p>

                        <h1 className="mt-1 text-[22px] font-bold tracking-tight text-[#24234D] sm:text-2xl">
                            Xin chào, {getFirstName(user?.name)}!
                        </h1>
                    </div>

                    <button
                        type="button"
                        aria-label="Thông báo"
                        className="
                            relative
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white
                            bg-white
                            text-[#24234D]
                            shadow-[0_6px_20px_rgba(70,60,130,0.08)]
                            transition
                            hover:-translate-y-0.5
                            hover:text-[#6C5CE7]
                        "
                    >
                        <Bell size={19} strokeWidth={1.8} />

                        <span className="absolute right-[8px] top-[7px] h-2 w-2 rounded-full bg-[#FF6B81] ring-2 ring-white" />
                    </button>
                </header>

                {/* Continue Learning */}
                <section className="mt-6">
                    <div className="mb-3 flex items-end justify-between">
                        <div>
                            <div className="flex items-center gap-1.5">
                                <Sparkles
                                    size={14}
                                    className="text-[#FFB84D]"
                                />

                                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6C5CE7]">
                                    Tiếp tục học
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-[#7162E8] via-[#7768E9] to-[#9587F5] p-4 shadow-[0_18px_45px_rgba(108,92,231,0.24)] sm:p-5">
                        {/* Decorative shapes */}
                        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border-[20px] border-white/10" />

                        <div className="pointer-events-none absolute -bottom-16 right-20 h-32 w-32 rounded-full bg-[#FFD6E5]/10" />

                        <div className="pointer-events-none absolute right-6 top-7 rotate-12 text-white/20">
                            <GraduationCap size={76} strokeWidth={1} />
                        </div>

                        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                            {/* Thumbnail */}
                            <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-white/10 sm:h-32 sm:w-48">
                                <img
                                    src={currentCourse.thumbnail}
                                    alt={currentCourse.title}
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                        transition
                                        duration-500
                                        group-hover:scale-105
                                    "
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

                                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#5C4FD0] shadow-sm">
                                    <Play
                                        size={11}
                                        fill="currentColor"
                                    />
                                    Đang học
                                </div>
                            </div>

                            {/* Course info */}
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/65">
                                    Khóa học của bạn
                                </p>

                                <h2 className="mt-1 text-[19px] font-bold text-white">
                                    {currentCourse.title}
                                </h2>

                                <p className="mt-1 truncate text-[12px] text-white/80">
                                    {currentCourse.lessonTitle}
                                </p>

                                <div className="mt-4">
                                    <div className="mb-1.5 flex items-center justify-between">
                                        <span className="text-[10px] text-white/65">
                                            Tiến độ học tập
                                        </span>

                                        <span className="text-[11px] font-bold text-white">
                                            {currentCourse.progress}%
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-black/10">
                                        <div
                                            className="h-full rounded-full bg-[#FFE68A]"
                                            style={{
                                                width: `${currentCourse.progress}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-1.5 text-[10px] text-white/70">
                                        <BookOpen size={13} />
                                        {currentCourse.completedLessons}/
                                        {currentCourse.totalLessons} bài học
                                    </span>

                                    <button
                                        type="button"
                                        className="
                                            flex
                                            shrink-0
                                            items-center
                                            gap-1.5
                                            rounded-xl
                                            bg-white
                                            px-3.5
                                            py-2
                                            text-[11px]
                                            font-bold
                                            text-[#6657DA]
                                            shadow-sm
                                            transition
                                            hover:-translate-y-0.5
                                            hover:bg-[#FFFDFE]
                                            hover:shadow-md
                                        "
                                    >
                                        Tiếp tục
                                        <ArrowRight size={13} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* My Courses */}
                <section className="mt-8">
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <h2 className="text-[17px] font-bold text-[#24234D]">
                                Khóa học của tôi
                            </h2>

                            <p className="mt-0.5 text-[11px] text-[#9694AA]">
                                Tiếp tục những khóa học đang học
                            </p>
                        </div>

                        <button
                            type="button"
                            className="
                                flex
                                items-center
                                gap-0.5
                                text-[11px]
                                font-bold
                                text-[#6C5CE7]
                                transition
                                hover:text-[#5142CC]
                            "
                        >
                            Xem tất cả
                            <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="-mx-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0">
                        <div className="flex gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                            {myCourses.map((course) => (
                                <article
                                    key={course.id}
                                    className="
                                        w-[245px]
                                        shrink-0
                                        overflow-hidden
                                        rounded-[20px]
                                        border
                                        border-white
                                        bg-white
                                        shadow-[0_8px_28px_rgba(63,55,120,0.07)]
                                        transition
                                        duration-300
                                        hover:-translate-y-1
                                        hover:shadow-[0_15px_35px_rgba(63,55,120,0.12)]
                                        sm:w-auto
                                    "
                                >
                                    <div className="relative h-32 overflow-hidden">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                                transition
                                                duration-500
                                                hover:scale-105
                                            "
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold text-[#6C5CE7] shadow-sm">
                                            ĐANG HỌC
                                        </span>
                                    </div>

                                    <div className="p-3.5">
                                        <h3 className="truncate text-[14px] font-bold text-[#24234D]">
                                            {course.title}
                                        </h3>

                                        <p className="mt-1 truncate text-[10px] text-[#9997AC]">
                                            {course.teacher}
                                        </p>

                                        <div className="mt-3">
                                            <div className="mb-1.5 flex items-center justify-between">
                                                <span className="text-[10px] text-[#9997AC]">
                                                    {course.completedLessons}/
                                                    {course.totalLessons} bài
                                                </span>

                                                <span className="text-[10px] font-bold text-[#6C5CE7]">
                                                    {course.progress}%
                                                </span>
                                            </div>

                                            <div className="h-1.5 overflow-hidden rounded-full bg-[#ECEAFF]">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#9A8EF5]"
                                                    style={{
                                                        width: `${course.progress}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Discovery */}
                <section className="mt-7">
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <h2 className="text-[17px] font-bold text-[#24234D]">
                                Khám phá khóa học
                            </h2>

                            <p className="mt-0.5 text-[11px] text-[#9694AA]">
                                Có thể bạn sẽ thích những khóa học này
                            </p>
                        </div>

                        <button
                            type="button"
                            className="
                                flex
                                items-center
                                gap-0.5
                                text-[11px]
                                font-bold
                                text-[#6C5CE7]
                                transition
                                hover:text-[#5142CC]
                            "
                        >
                            Xem tất cả
                            <ChevronRight size={14} />
                        </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {recommendedCourses.map((course, index) => (
                            <article
                                key={course.id}
                                className="
                                    group
                                    overflow-hidden
                                    rounded-[20px]
                                    border
                                    border-white
                                    bg-white
                                    shadow-[0_8px_28px_rgba(63,55,120,0.06)]
                                    transition
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-[0_15px_35px_rgba(63,55,120,0.11)]
                                "
                            >
                                <div className="relative h-36 overflow-hidden">
                                    <img
                                        src={course.thumbnail}
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

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                    <span
                                        className={`
                                            absolute
                                            right-3
                                            top-3
                                            rounded-full
                                            px-2.5
                                            py-1
                                            text-[9px]
                                            font-bold
                                            shadow-sm
                                            ${index === 0
                                                ? "bg-[#FFF0B8] text-[#9A7200]"
                                                : "bg-[#DDF7EF] text-[#26856D]"
                                            }
                                        `}
                                    >
                                        {index === 0
                                            ? "PHỔ BIẾN"
                                            : "MỚI"}
                                    </span>
                                </div>

                                <div className="p-3.5">
                                    <h3 className="text-[14px] font-bold text-[#24234D]">
                                        {course.title}
                                    </h3>

                                    <p className="mt-1 text-[10px] text-[#9997AC]">
                                        {course.teacher}
                                    </p>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-[10px] text-[#9290A5]">
                                            <span className="flex items-center gap-1">
                                                <BookOpen size={12} />
                                                {course.lessons} bài
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <Clock3 size={12} />
                                                {course.duration}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            className="
                                                flex
                                                items-center
                                                gap-1
                                                rounded-xl
                                                bg-[#F0EDFF]
                                                px-2.5
                                                py-1.5
                                                text-[10px]
                                                font-bold
                                                text-[#6C5CE7]
                                                transition
                                                hover:bg-[#E4DFFF]
                                            "
                                        >
                                            Xem
                                            <ArrowRight size={12} />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <div className="h-2" />
            </div>
        </div>
    );
};

export default StudentDashboard;
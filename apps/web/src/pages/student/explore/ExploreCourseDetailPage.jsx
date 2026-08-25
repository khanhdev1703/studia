import { useEffect, useState } from "react";

import {
    ArrowLeft,
    BookOpen,
    Clock3,
    GraduationCap,
    LockKeyhole,
    PlayCircle,
    UserRound,
} from "lucide-react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import formatPrice from "../../../utils/formatPrice";
import formatDuration from "../../../utils/formatDuration";
import getImageUrl from "../../../utils/getImageUrl";
import courseService from "../../../services/courseService";

const StudentCourseDetailPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    /*
     * =========================================
     * Get course detail
     * =========================================
     */
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);

                const response = await courseService.getStudentCourseDetail(courseId);
                setCourse(response.data);
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
     * =========================================
     * Handlers
     * =========================================
     */

    const handleBack = () => {
        navigate("/student/explore");
    };

    const handleEnroll = () => {
        // Sau này:
        // enrollmentService.create(course.id);

        console.log("Enroll course:", course.id);
    };

    const handleLessonClick = (lesson) => {
        // Lesson bị khóa thì không cho học
        if (lesson.isLocked) {
            return;
        }

        /*
         * Sau này:
         *
         * navigate(
         *     `/student/courses/${course.id}/lessons/${lesson.id}`
         * );
         */

        console.log("Open lesson:", lesson.id);
    };

    /*
     * =========================================
     * Loading
     * =========================================
     */

    if (loading) {
        return (
            <div className="relative min-h-full overflow-hidden bg-[#F4F3FF]">
                <div className="mx-auto w-full max-w-5xl px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
                    <div className="animate-pulse">
                        <div className="mb-3 h-7 w-20 rounded-lg bg-white/80" />

                        <div className="overflow-hidden rounded-lg bg-white shadow-[0_8px_25px_rgba(60,55,110,0.06)]">
                            <div className="h-[170px] bg-[#E8E6F5] sm:h-[260px]" />

                            <div className="space-y-3 p-4 sm:p-6">
                                <div className="h-7 w-2/3 rounded bg-[#EEEAFE]" />
                                <div className="h-4 w-40 rounded bg-[#F1F0F6]" />
                                <div className="h-16 w-full rounded bg-[#F1F0F6]" />
                            </div>
                        </div>

                        <div className="mt-4 h-80 rounded-lg bg-white" />
                    </div>
                </div>
            </div>
        );
    }

    /*
     * =========================================
     * Course not found
     * =========================================
     */

    if (!course) {
        return (
            <div className="relative min-h-full overflow-hidden bg-[#F4F3FF]">
                <div className="mx-auto flex min-h-[400px] w-full max-w-5xl items-center justify-center px-4">
                    <div className="text-center">
                        <h2 className="text-[16px] font-semibold text-[#24234D]">
                            Không tìm thấy khóa học
                        </h2>

                        <p className="mt-1 text-[11px] text-[#9997AA]">
                            Khóa học có thể không tồn tại hoặc
                            đã bị xóa.
                        </p>

                        <button
                            type="button"
                            onClick={handleBack}
                            className="
                                mt-4
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-lg
                                bg-[#6C5CE7]
                                px-4
                                py-2.5
                                text-[11px]
                                font-semibold
                                text-white
                                transition
                                hover:bg-[#5B4BD6]
                            "
                        >
                            <ArrowLeft size={14} />
                            Quay lại khám phá
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /*
     * =========================================
     * Course data
     * =========================================
     */

    const lessons = course.lessons || [];

    const lessonCount =
        course.lessonCount ?? lessons.length;

    const teacherName =
        typeof course.teacher === "string"
            ? course.teacher
            : course.teacher?.name;

    const isFree = Number(course.price) <= 0;

    return (
        <div className="relative min-h-full overflow-hidden bg-[#F4F3FF]">
            {/* =================================
                Background decorations
            ================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -left-28
                    -top-28
                    h-72
                    w-72
                    rounded-full
                    bg-[#8B7CF6]/15
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    right-[-100px]
                    top-[300px]
                    h-72
                    w-72
                    rounded-full
                    bg-[#72C7FF]/10
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-[-100px]
                    left-1/3
                    h-72
                    w-72
                    rounded-full
                    bg-[#D9A7FF]/10
                    blur-3xl
                "
            />

            {/* =================================
                Main content
            ================================== */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    w-full
                    max-w-5xl
                    px-3
                    pb-4
                    pt-3
                    sm:px-6
                    sm:pt-4
                    lg:px-8
                "
            >
                {/* Back button */}

                <button
                    type="button"
                    onClick={handleBack}
                    className="
                        mb-3
                        flex
                        items-center
                        gap-1
                        rounded-lg
                        px-1
                        py-1
                        text-[12px]
                        font-medium
                        text-[#77758A]
                        transition
                        hover:text-[#6C5CE7]
                    "
                >
                    <ArrowLeft size={16} />
                    Quay lại
                </button>

                {/* =================================
                    Course information
                ================================== */}

                <section
                    className="
                        overflow-hidden
                        rounded-lg
                        border
                        border-white
                        bg-white
                        shadow-[0_8px_25px_rgba(60,55,110,0.06)]
                    "
                >
                    {/* Thumbnail */}

                    <div
                        className="
                            relative
                            h-[170px]
                            overflow-hidden
                            sm:h-[260px]
                        "
                    >
                        <img
                            src={getImageUrl(course.thumbnail)}
                            alt={course.title}
                            className="
                                h-full
                                w-full
                                object-cover
                            "
                        />

                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/45
                                via-black/5
                                to-transparent
                            "
                        />

                        {/* Price */}

                        <span
                            className={`
                                absolute
                                right-3
                                top-3
                                rounded-full
                                px-2.5
                                py-1
                                text-[11px]
                                font-bold
                                shadow-sm
                                backdrop-blur-sm
                                ${isFree
                                    ? "bg-[#E9F9F0]/95 text-[#24965A]"
                                    : "bg-white/95 text-[#6C5CE7]"
                                }
                            `}
                        >
                            {formatPrice(course.price)}
                        </span>
                    </div>

                    {/* Information */}

                    <div className="p-4 sm:p-6">
                        <h1
                            className="
                                text-[20px]
                                font-bold
                                leading-tight
                                text-[#24234D]
                                sm:text-[27px]
                            "
                        >
                            {course.title}
                        </h1>

                        {/* Teacher */}

                        <div
                            className="
                                mt-2
                                flex
                                items-center
                                gap-1.5
                                text-[11px]
                                text-[#77758A]
                            "
                        >
                            <UserRound size={13} />

                            <span>
                                {teacherName || "Chưa cập nhật"}
                            </span>
                        </div>

                        {/* Description */}

                        <div className="mt-4">
                            <h2
                                className="
                                    text-[14px]
                                    font-semibold
                                    text-[#24234D]
                                "
                            >
                                Về khóa học
                            </h2>

                            <p
                                className="
                                    mt-1.5
                                    text-[11px]
                                    leading-[1.7]
                                    text-[#77758A]
                                "
                            >
                                {course.description ||
                                    "Chưa có mô tả cho khóa học này."}
                            </p>
                        </div>
                    </div>
                </section>

                {/* =================================
                    Lessons
                ================================== */}

                <section className="mt-4">
                    <div
                        className="
                            overflow-hidden
                            rounded-lg
                            border
                            border-white
                            bg-white
                            shadow-[0_6px_20px_rgba(60,55,110,0.05)]
                        "
                    >
                        {/* Lessons header */}

                        <div
                            className="
                                border-b
                                border-[#F1F0F6]
                                px-4
                                py-3.5
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
                            >
                                <div>
                                    <h2
                                        className="
                                            text-[15px]
                                            font-semibold
                                            text-[#24234D]
                                        "
                                    >
                                        Nội dung khóa học
                                    </h2>

                                    <p
                                        className="
                                            mt-0.5
                                            text-[10px]
                                            text-[#9997AA]
                                        "
                                    >
                                        Các bài học trong khóa học
                                    </p>
                                </div>

                                {/* Course stats */}

                                <div
                                    className="
                                        flex
                                        shrink-0
                                        items-center
                                        gap-3
                                        text-[10px]
                                        text-[#85839A]
                                    "
                                >
                                    <span
                                        className="
                                            flex
                                            items-center
                                            gap-1
                                        "
                                    >
                                        <BookOpen
                                            size={13}
                                            className="text-[#6C5CE7]"
                                        />

                                        {lessonCount} bài
                                    </span>

                                    {course.totalDuration && (
                                        <>
                                            <span
                                                className="
                                                    h-3
                                                    w-px
                                                    bg-[#E5E3EC]
                                                "
                                            />

                                            <span
                                                className="
                                                    flex
                                                    items-center
                                                    gap-1
                                                "
                                            >
                                                <Clock3
                                                    size={13}
                                                    className="text-[#3D9AD8]"
                                                />

                                                {formatDuration(course.totalDuration)}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Lesson list */}

                        {lessons.length > 0 ? (
                            <div>
                                {lessons.map(
                                    (lesson, index) => {
                                        const isLocked =
                                            lesson.isLocked === true;

                                        return (
                                            <button
                                                key={lesson.id}
                                                type="button"
                                                onClick={() =>
                                                    handleLessonClick(
                                                        lesson
                                                    )
                                                }
                                                disabled={isLocked}
                                                className={`
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-2.5
                                                    px-3
                                                    py-3
                                                    text-left
                                                    transition

                                                    ${index !==
                                                        lessons.length - 1
                                                        ? "border-b border-[#F1F0F6]"
                                                        : ""
                                                    }

                                                    ${!isLocked
                                                        ? "hover:bg-[#F9F8FF]"
                                                        : "cursor-default"
                                                    }
                                                `}
                                            >
                                                {/* Lesson number */}

                                                <div
                                                    className="
                                                        flex
                                                        h-7
                                                        w-7
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        bg-[#F4F3FF]
                                                        text-[9px]
                                                        font-semibold
                                                        text-[#6C5CE7]
                                                    "
                                                >
                                                    {String(
                                                        lesson.order ??
                                                        index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </div>

                                                {/* Lesson information */}

                                                <div className="min-w-0 flex-1">
                                                    <p
                                                        className="
                                                            truncate
                                                            text-[11px]
                                                            font-medium
                                                            text-[#24234D]
                                                        "
                                                    >
                                                        {lesson.title}
                                                    </p>

                                                    <div
                                                        className="
                                                            mt-0.5
                                                            flex
                                                            items-center
                                                            gap-2
                                                            text-[9px]
                                                            text-[#9997AA]
                                                        "
                                                    >
                                                        {lesson.duration !=
                                                            null && (
                                                                <span
                                                                    className="
                                                                    flex
                                                                    items-center
                                                                    gap-1
                                                                "
                                                                >
                                                                    <Clock3
                                                                        size={
                                                                            10
                                                                        }
                                                                    />

                                                                    {formatDuration(
                                                                        lesson.duration
                                                                    )}
                                                                </span>
                                                            )}
                                                    </div>
                                                </div>

                                                {/* Lesson status */}

                                                {isLocked ? (
                                                    <LockKeyhole
                                                        size={15}
                                                        className="
                                                            shrink-0
                                                            text-[#B5B2C2]
                                                        "
                                                    />
                                                ) : (
                                                    <PlayCircle
                                                        size={17}
                                                        className="
                                                            shrink-0
                                                            text-[#6C5CE7]
                                                        "
                                                    />
                                                )}
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        ) : (
                            <div
                                className="
                                    px-4
                                    py-10
                                    text-center
                                    text-[11px]
                                    text-[#9997AA]
                                "
                            >
                                Khóa học chưa có bài học.
                            </div>
                        )}
                    </div>
                </section>

                {/* =================================
                    Enrollment
                ================================== */}

                <section className="mt-4">
                    <button
                        type="button"
                        onClick={handleEnroll}
                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            bg-[#6C5CE7]
                            px-4
                            py-2.5
                            text-[12px]
                            font-semibold
                            text-white
                            shadow-[0_6px_18px_rgba(108,92,231,0.22)]
                            transition
                            hover:bg-[#5B4BD6]
                            active:scale-[0.99]
                        "
                    >
                        <GraduationCap size={16} />

                        {isFree
                            ? "Đăng ký khóa học miễn phí"
                            : `Đăng ký khóa học · ${formatPrice(
                                course.price
                            )}`}
                    </button>
                </section>
            </div>
        </div>
    );
};

export default StudentCourseDetailPage;
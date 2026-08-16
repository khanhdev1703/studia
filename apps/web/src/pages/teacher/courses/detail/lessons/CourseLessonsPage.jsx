import { useEffect, useState } from "react";
import {
    BookOpen,
    FileText,
    GripVertical,
    Pencil,
    Plus,
    Trash2,
    Video,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import lessonService from "../../../../../services/lessonService";

const CourseLessonsPage = () => {
    const { courseId } = useParams();

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await lessonService.getByCourse(courseId);

                setLessons(response.data || []);
            } catch (error) {
                console.error(error);

                setError(
                    error?.response?.data?.message ||
                    "Không thể tải danh sách bài học."
                );
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchLessons();
        }
    }, [courseId]);

    const handleDelete = async (lessonId) => {
        const confirmed = window.confirm(
            "Bạn có chắc muốn xóa bài học này?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await lessonService.delete(lessonId);

            setLessons((prev) =>
                prev.filter(
                    (lesson) => lesson.id !== lessonId
                )
            );
        } catch (error) {
            console.error(error);

            alert(
                error?.response?.data?.message ||
                "Không thể xóa bài học."
            );
        }
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="
                            h-20
                            animate-pulse
                            rounded-2xl
                            bg-white
                            shadow-sm
                        "
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-base font-semibold text-[#252238]">
                        Bài học
                    </h2>

                    <p className="mt-0.5 text-xs text-gray-500">
                        {lessons.length} bài học
                    </p>
                </div>

                <Link
                    to={`/teacher/courses/${courseId}/lessons/create`}
                    className="
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-lg
                        bg-[#6C5CE7]
                        px-3
                        py-2
                        text-xs
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#5b4bd6]

                        sm:px-4
                        sm:text-sm
                    "
                >
                    <Plus size={16} />
                    <span>Thêm bài học</span>
                </Link>
            </div>

            {/* Error */}
            {error && (
                <div
                    className="
                        rounded-xl
                        border
                        border-red-100
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-600
                    "
                >
                    {error}
                </div>
            )}

            {/* Empty */}
            {!error && lessons.length === 0 && (
                <div
                    className="
                        flex
                        min-h-60
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-dashed
                        border-gray-200
                        bg-white
                        px-5
                        text-center
                    "
                >
                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-[#6C5CE7]/10
                            text-[#6C5CE7]
                        "
                    >
                        <BookOpen size={22} />
                    </div>

                    <h3 className="mt-3 text-sm font-semibold text-[#252238]">
                        Chưa có bài học
                    </h3>

                    <p className="mt-1 max-w-sm text-xs leading-5 text-gray-500">
                        Hãy thêm bài học đầu tiên để bắt đầu
                        xây dựng nội dung cho khóa học.
                    </p>

                    <Link
                        to={`/teacher/courses/${courseId}/lessons/create`}
                        className="
                            mt-4
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-lg
                            bg-[#6C5CE7]
                            px-4
                            py-2
                            text-xs
                            font-semibold
                            text-white
                        "
                    >
                        <Plus size={15} />
                        Thêm bài học
                    </Link>
                </div>
            )}

            {/* Lesson List */}
            {lessons.length > 0 && (
                <div className="space-y-2">
                    {lessons.map((lesson, index) => (
                        <div
                            key={lesson.id}
                            className="
                                group
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-gray-100
                                bg-white
                                p-3
                                shadow-sm
                                transition
                                hover:border-gray-200

                                sm:p-4
                            "
                        >
                            {/* Drag handle */}
                            <button
                                type="button"
                                className="
                                    hidden
                                    shrink-0
                                    text-gray-300
                                    transition
                                    hover:text-gray-500

                                    sm:block
                                "
                                title="Kéo để sắp xếp"
                            >
                                <GripVertical size={18} />
                            </button>

                            {/* Order */}
                            <div
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-[#6C5CE7]/10
                                    text-xs
                                    font-bold
                                    text-[#6C5CE7]
                                "
                            >
                                {String(index + 1).padStart(
                                    2,
                                    "0"
                                )}
                            </div>

                            {/* Lesson type icon */}
                            <div
                                className="
                                    hidden
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-gray-50
                                    text-gray-500

                                    sm:flex
                                "
                            >
                                {lesson.type === "VIDEO" ? (
                                    <Video size={17} />
                                ) : (
                                    <FileText size={17} />
                                )}
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                <Link
                                    to={`./${lesson.id}`}
                                    className="
                                        block
                                        truncate
                                        text-sm
                                        font-semibold
                                        text-[#252238]
                                        transition
                                        hover:text-[#6C5CE7]
                                    "
                                >
                                    {lesson.title}
                                </Link>

                                <div className="mt-1 flex items-center gap-2">
                                    <span className="text-xs text-gray-400">
                                        {lesson.type ===
                                            "VIDEO"
                                            ? "Video"
                                            : "Tài liệu"}
                                    </span>

                                    {lesson.status && (
                                        <>
                                            <span className="text-gray-300">
                                                •
                                            </span>

                                            <span
                                                className={`
                                                    text-xs
                                                    ${lesson.status ===
                                                        "PUBLISHED"
                                                        ? "text-green-500"
                                                        : "text-amber-500"
                                                    }
                                                `}
                                            >
                                                {lesson.status ===
                                                    "PUBLISHED"
                                                    ? "Công khai"
                                                    : "Nháp"}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex shrink-0 items-center gap-1">
                                <Link
                                    to={`./${lesson.id}/edit`}
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-gray-400
                                        transition
                                        hover:bg-gray-100
                                        hover:text-[#6C5CE7]
                                    "
                                    title="Chỉnh sửa"
                                >
                                    <Pencil size={16} />
                                </Link>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(
                                            lesson.id
                                        )
                                    }
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-gray-400
                                        transition
                                        hover:bg-red-50
                                        hover:text-red-500
                                    "
                                    title="Xóa"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseLessonsPage;
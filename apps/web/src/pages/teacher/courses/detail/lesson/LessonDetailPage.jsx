import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import lessonService from "../../../../../services/lessonService";

import LessonInfoForm from "./LessonInfoForm";
import LessonDocuments from "./LessonDocuments";

const LessonDetailPage = () => {
    const { lessonId } = useParams();

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // Fetch lesson
    // ==========================================

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await lessonService.getById(
                        lessonId
                    );

                const data = response?.data;

                if (!data) {
                    throw new Error(
                        "Không tìm thấy bài học."
                    );
                }

                setLesson(data);
            } catch (error) {
                console.error(
                    "Get lesson detail error:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Không thể tải thông tin bài học."
                );
            } finally {
                setLoading(false);
            }
        };

        if (lessonId) {
            fetchLesson();
        }
    }, [lessonId]);

    // ==========================================
    // Update lesson
    // ==========================================

    const handleLessonUpdated = (updatedLesson) => {
        setLesson(updatedLesson);
    };

    // ==========================================
    // Update documents
    // ==========================================

    const handleDocumentsUpdated = (documents) => {
        setLesson((prev) => {
            if (!prev) {
                return prev;
            }

            return {
                ...prev,
                documents,
            };
        });
    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="h-20 animate-pulse bg-white" />

                <div className="h-72 animate-pulse bg-white" />

                <div className="h-72 animate-pulse bg-white" />
            </div>
        );
    }

    // ==========================================
    // Error
    // ==========================================

    if (error) {
        return (
            <div className="space-y-4">
                <div className="border border-gray-100 bg-white p-4">
                    <h1 className="text-base font-semibold text-[#252238]">
                        Chỉnh sửa bài học
                    </h1>
                </div>

                <div className="border border-red-100 bg-red-50 px-4 py-5 text-sm text-red-600">
                    {error}
                </div>

                <div className="p-2">
                    <Link
                        to=".."
                        relative="path"
                        className="
                            inline-flex
                            items-center
                            gap-1.5
                            text-xs
                            font-medium
                            text-gray-500
                            transition
                            hover:text-[#0a479d]
                        "
                    >
                        <ArrowLeft size={15} />

                        Quay lại danh sách bài học
                    </Link>
                </div>
            </div>
        );
    }

    if (!lesson) {
        return null;
    }

    // ==========================================
    // Render
    // ==========================================

    return (
        <div className="space-y-2">
            {/* ==================================
                Header
            ================================== */}

            <div
                className="
                    relative
                    isolate
                    overflow-hidden
                    border
                    border-[#0a479d]/10
                    bg-gradient-to-br
                    from-[#0a479d]
                    via-[#0b52ad]
                    to-[#1769c2]
                    px-5
                    py-5
                    shadow-sm
                "
            >
                <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/10 blur-sm" />

                <div className="pointer-events-none absolute -bottom-20 right-20 h-32 w-32 rounded-full border-[18px] border-white/5" />

                <div className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-[#5da9ff]/20 blur-2xl" />

                <div className="pointer-events-none absolute right-8 top-5 grid grid-cols-3 gap-1.5 opacity-30">
                    {Array.from({ length: 9 }).map(
                        (_, index) => (
                            <span
                                key={index}
                                className="
                                    h-1
                                    w-1
                                    rounded-full
                                    bg-white
                                "
                            />
                        )
                    )}
                </div>

                <div className="relative">
                    <h1 className="text-lg font-semibold tracking-tight text-white">
                        Cập nhật bài học
                    </h1>
                </div>
            </div>

            {/* ==================================
                Back
            ================================== */}

            <div className="pl-2">
                <Link
                    to=".."
                    relative="path"
                    className="
                        inline-flex
                        items-center
                        gap-1.5
                        text-xs
                        font-medium
                        text-gray-500
                        transition
                        hover:text-[#0a479d]
                    "
                >
                    <ArrowLeft size={15} />

                    Quay lại danh sách bài học
                </Link>
            </div>

            {/* ==================================
                Lesson content
            ================================== */}

            <div className="p-2">
                {/* Lesson information */}

                <LessonInfoForm
                    lesson={lesson}
                    onUpdated={handleLessonUpdated}
                />

                <br />

                {/* Documents */}

                <LessonDocuments
                    lesson={lesson}
                    onDocumentsUpdated={
                        handleDocumentsUpdated
                    }
                />
            </div>
        </div>
    );
};

export default LessonDetailPage;
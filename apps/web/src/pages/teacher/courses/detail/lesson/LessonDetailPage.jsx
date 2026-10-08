import { useEffect, useState } from "react";
import {
    ArrowLeft,
    BookOpen,
    FileText,
} from "lucide-react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import lessonService from "../../../../../services/lessonService";

import LessonInfoForm from "./LessonInfoForm";
import LessonDocuments from "./LessonDocuments";

const LessonDetailPage = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLesson = async () => {
            if (!lessonId) return;

            try {
                setLoading(true);
                setError("");

                const response = await lessonService.getById(lessonId);

                setLesson(response?.data || null);
            } catch (error) {
                console.error("Get lesson error:", error);

                const message =
                    error?.response?.data?.message ||
                    "Không thể tải thông tin bài học.";

                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [lessonId]);

    const handleLessonUpdated = (updatedLesson) => {
        setLesson((prev) => ({
            ...prev,
            ...updatedLesson,
        }));
    };

    const handleDocumentsUpdated = (documents) => {
        setLesson((prev) => ({
            ...prev,
            documents,
        }));
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="mx-auto w-full max-w-6xl">
                {/* Header skeleton */}
                <div className="h-14 border-b border-[#E4E4E7]">
                    <div className="grid h-full grid-cols-[40px_1fr_40px] items-center px-3 sm:px-5">
                        <div className="h-9 w-9 animate-pulse rounded-xl bg-[#F4F4F5]" />

                        <div className="mx-auto h-4 w-40 animate-pulse rounded bg-[#F4F4F5]" />

                        <div className="justify-self-end">
                            <div className="h-6 w-12 animate-pulse rounded-full bg-[#F4F4F5]" />
                        </div>
                    </div>
                </div>

                {/* Content skeleton */}
                <div className="grid gap-4 py-5 sm:gap-5 sm:py-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <div className="rounded-2xl border border-[#E4E4E7] bg-white">
                        <div className="border-b border-[#F4F4F5] px-4 py-4 sm:px-5">
                            <div className="h-4 w-32 animate-pulse rounded bg-[#F4F4F5]" />
                            <div className="mt-2 h-3 w-52 animate-pulse rounded bg-[#F4F4F5]" />
                        </div>

                        <div className="space-y-5 p-4 sm:p-5">
                            <div className="space-y-2">
                                <div className="h-3 w-20 animate-pulse rounded bg-[#F4F4F5]" />
                                <div className="h-10 w-full animate-pulse rounded-xl bg-[#F4F4F5]" />
                            </div>

                            <div className="space-y-2">
                                <div className="h-3 w-24 animate-pulse rounded bg-[#F4F4F5]" />
                                <div className="h-48 w-full animate-pulse rounded-xl bg-[#F4F4F5]" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#E4E4E7] bg-white">
                        <div className="border-b border-[#F4F4F5] px-4 py-4 sm:px-5">
                            <div className="h-4 w-24 animate-pulse rounded bg-[#F4F4F5]" />
                        </div>

                        <div className="space-y-3 p-4 sm:p-5">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="h-14 animate-pulse rounded-xl bg-[#F4F4F5]"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !lesson) {
        return (
            <div className="mx-auto flex min-h-[50vh] w-full max-w-6xl items-center justify-center px-4">
                <div className="w-full max-w-md rounded-2xl border border-[#E4E4E7] bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#FEF2F2] text-[#DC2626]">
                        <FileText size={20} strokeWidth={1.8} />
                    </div>

                    <h2 className="mt-4 text-sm font-semibold text-[#18181B]">
                        Không thể tải bài học
                    </h2>

                    <p className="mt-1.5 text-xs leading-5 text-[#71717A]">
                        {error || "Bài học không tồn tại hoặc đã bị xoá."}
                    </p>

                    <button
                        type="button"
                        onClick={handleBack}
                        className={[
                            "mt-5",
                            "inline-flex items-center gap-2",
                            "rounded-xl",
                            "bg-[#18181B]",
                            "px-4 py-2.5",
                            "text-xs font-semibold text-white",
                            "transition-colors",
                            "hover:bg-[#27272A]",
                            "active:scale-[0.98]",
                        ].join(" ")}
                    >
                        <ArrowLeft size={15} />
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-6xl pb-8 sm:pb-10">
            {/* Compact lesson header */}
            <header className="border-b border-[#E4E4E7] bg-white sticky top-0 z-10">
                <div className="relative grid grid-cols-[40px_minmax(0,1fr)_40px] items-center gap-2 p-2 sm:px-5">
                    {/* Back */}
                    <button
                        type="button"
                        onClick={handleBack}
                        aria-label="Quay lại"
                        className={[
                            "flex h-9 w-9 items-center justify-center",
                            "rounded-xl",
                            "text-[#52525B]",
                            "transition-colors",
                            "hover:bg-white",
                            "hover:text-[#18181B]",
                            "active:scale-95",
                        ].join(" ")}
                    >
                        <ArrowLeft size={18} strokeWidth={2} />
                    </button>

                    {/* Center title */}
                    <h1
                        title={lesson.title}
                        className={[
                            "min-w-0",
                            "px-2",
                            "text-center",
                            "text-sm font-semibold",
                            "leading-5 tracking-tight",
                            "text-[#18181B]",
                            "line-clamp-1",
                            "sm:text-[15px]",
                        ].join(" ")}
                    >
                        {lesson.title}
                    </h1>
                </div>
            </header>

            {/* Editor workspace */}
            <div className="grid items-start gap-4 p-3 sm:gap-5 sm:py-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                {/* Main editor */}
                <main className="min-w-0">
                    <section className="overflow-hidden rounded-xl border border-[#E4E4E7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                        <div className="flex items-center gap-3 border-b border-[#F4F4F5] px-4 py-4 sm:px-5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F5] text-[#52525B]">
                                <BookOpen
                                    size={16}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div className="min-w-0">
                                <h2 className="text-[13px] font-semibold text-[#18181B]">
                                    Thông tin bài học
                                </h2>

                                <p className="mt-0.5 text-[11px] text-[#A1A1AA]">
                                    Nội dung và thông tin cơ bản
                                </p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5">
                            <LessonInfoForm
                                lesson={lesson}
                                onLessonUpdated={handleLessonUpdated}
                            />
                        </div>
                    </section>
                </main>

                {/* Documents */}
                <aside className="min-w-0 lg:sticky lg:top-5">
                    <section className="overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                        <div className="p-4 sm:p-5">
                            <LessonDocuments
                                lesson={lesson}
                                documents={lesson.documents || []}
                                onDocumentsUpdated={
                                    handleDocumentsUpdated
                                }
                            />
                        </div>
                    </section>

                </aside>
            </div>
        </div>
    );
};

export default LessonDetailPage;
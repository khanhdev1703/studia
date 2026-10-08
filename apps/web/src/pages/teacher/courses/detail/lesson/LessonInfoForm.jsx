import { useEffect, useState } from "react";

import {
    Clock3,
    Save,
    Trash2,
    Upload,
} from "lucide-react";

import appToast from "../../../../../utils/toast";
import getUrl from "../../../../../utils/getUrl";
import lessonService from "../../../../../services/lessonService";

const MAX_VIDEO_SIZE = 500 * 1024 * 1024;

const ALLOWED_VIDEO_TYPES = [
    "video/mp4",
    "video/webm",
    "video/quicktime",
];

const createInitialForm = (lesson) => ({
    title: lesson?.title || "",
    description: lesson?.description || "",
    videoFile: null,
    isFree: lesson?.isFree || false,
});

const LessonInfoForm = ({ lesson, onUpdated }) => {
    const [form, setForm] = useState(
        () => createInitialForm(lesson)
    );

    const [saving, setSaving] = useState(false);
    const [videoPreview, setVideoPreview] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        if (!lesson) return;

        setForm((prev) => ({
            ...prev,
            title: lesson.title || "",
            description: lesson.description || "",
            isFree: lesson.isFree || false,
        }));
    }, [
        lesson?.id,
        lesson?.title,
        lesson?.description,
        lesson?.isFree,
    ]);

    useEffect(() => {
        return () => {
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }
        };
    }, [videoPreview]);

    const updateForm = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const formatFileSize = (bytes) => {
        if (!bytes || bytes <= 0) return "0 KB";

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(0)} KB`;
        }

        return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    };

    const formatDuration = (seconds) => {
        if (
            seconds === null ||
            seconds === undefined ||
            seconds <= 0
        ) {
            return "--:--";
        }

        const totalSeconds = Math.floor(seconds);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor(
            (totalSeconds % 3600) / 60
        );
        const remainingSeconds = totalSeconds % 60;

        if (hours > 0) {
            return `${String(hours).padStart(2, "0")}:${String(
                minutes
            ).padStart(2, "0")}:${String(
                remainingSeconds
            ).padStart(2, "0")}`;
        }

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    const handleSelectVideo = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
            appToast.error(
                "Chỉ hỗ trợ video MP4, WebM hoặc MOV."
            );

            event.target.value = "";
            return;
        }

        if (file.size > MAX_VIDEO_SIZE) {
            appToast.error(
                "Video không được vượt quá 500MB."
            );

            event.target.value = "";
            return;
        }

        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }

        setVideoPreview(URL.createObjectURL(file));

        setForm((prev) => ({
            ...prev,
            videoFile: file,
        }));

        setUploadProgress(0);

        event.target.value = "";
    };

    const handleRemoveNewVideo = () => {
        if (saving) return;

        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }

        setVideoPreview("");

        setForm((prev) => ({
            ...prev,
            videoFile: null,
        }));

        setUploadProgress(0);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (saving) return;

        if (!form.title.trim()) {
            appToast.error(
                "Vui lòng nhập tên bài học."
            );

            return;
        }

        try {
            setSaving(true);
            setUploadProgress(0);

            const formData = new FormData();

            formData.append(
                "title",
                form.title.trim()
            );

            formData.append(
                "description",
                form.description.trim()
            );

            formData.append(
                "isFree",
                String(form.isFree)
            );

            if (form.videoFile) {
                formData.append(
                    "video",
                    form.videoFile
                );
            }

            const response =
                await lessonService.update(
                    lesson.id,
                    formData,
                    (progress) => {
                        setUploadProgress(progress);
                    }
                );

            const updatedLesson = response?.data;

            if (updatedLesson) {
                onUpdated?.(updatedLesson);
            }

            appToast.success(
                response?.message ||
                "Cập nhật bài học thành công."
            );

            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }

            setVideoPreview("");
            setUploadProgress(0);

            if (updatedLesson) {
                setForm({
                    title: updatedLesson.title || "",
                    description:
                        updatedLesson.description || "",
                    videoFile: null,
                    isFree:
                        updatedLesson.isFree || false,
                });
            } else {
                setForm((prev) => ({
                    ...prev,
                    videoFile: null,
                }));
            }
        } catch (error) {
            console.error(
                "Update lesson error:",
                error
            );

            appToast.error(
                error?.response?.data?.message ||
                "Không thể cập nhật bài học."
            );

            setUploadProgress(0);
        } finally {
            setSaving(false);
        }
    };

    if (!lesson) return null;

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            {/* Basic information */}
            <section className="space-y-5">
                <div>
                    <label
                        htmlFor="lesson-title"
                        className="mb-1.5 block text-xs font-medium text-[#3F3F46]"
                    >
                        Tên bài học
                        <span className="ml-1 text-[#DC2626]">
                            *
                        </span>
                    </label>

                    <input
                        id="lesson-title"
                        type="text"
                        value={form.title}
                        onChange={(event) =>
                            updateForm(
                                "title",
                                event.target.value
                            )
                        }
                        disabled={saving}
                        placeholder="Nhập tên bài học..."
                        className={[
                            "w-full rounded-lg",
                            "border border-[#E4E4E7]",
                            "bg-white px-3 py-2.5",
                            "text-sm text-[#18181B]",
                            "outline-none",
                            "placeholder:text-[#A1A1AA]",
                            "focus:border-[#18181B]",
                            "focus:ring-2 focus:ring-black/[0.04]",
                            "disabled:bg-[#F4F4F5]",
                        ].join(" ")}
                    />
                </div>

                <div>
                    <div className="mb-1.5 flex items-center justify-between">
                        <label
                            htmlFor="lesson-description"
                            className="text-xs font-medium text-[#3F3F46]"
                        >
                            Mô tả
                        </label>

                        <span className="text-[10px] text-[#A1A1AA]">
                            Không bắt buộc
                        </span>
                    </div>

                    <textarea
                        id="lesson-description"
                        value={form.description}
                        onChange={(event) =>
                            updateForm(
                                "description",
                                event.target.value
                            )
                        }
                        disabled={saving}
                        rows={4}
                        placeholder="Mô tả ngắn về bài học..."
                        className={[
                            "w-full resize-y rounded-lg",
                            "border border-[#E4E4E7]",
                            "bg-white px-3 py-2.5",
                            "text-sm leading-6 text-[#18181B]",
                            "outline-none",
                            "placeholder:text-[#A1A1AA]",
                            "focus:border-[#18181B]",
                            "focus:ring-2 focus:ring-black/[0.04]",
                            "disabled:bg-[#F4F4F5]",
                        ].join(" ")}
                    />
                </div>

                <div>
                    <div className="mb-2">
                        <p className="text-xs font-medium text-[#3F3F46]">
                            Quyền truy cập
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            updateForm("isFree", !form.isFree)
                        }
                        disabled={saving}
                        className={[
                            "flex w-full items-center justify-between",
                            "rounded-lg border px-3 py-2.5",
                            "text-left transition-colors",
                            form.isFree
                                ? "border-[#BBF7D0] bg-[#F0FDF4]"
                                : "border-[#E4E4E7] bg-white hover:bg-[#FAFAFA]",
                            saving
                                ? "cursor-not-allowed opacity-60"
                                : "",
                        ].join(" ")}
                    >
                        <div>
                            <p
                                className={[
                                    "text-xs font-medium",
                                    form.isFree
                                        ? "text-[#15803D]"
                                        : "text-[#3F3F46]",
                                ].join(" ")}
                            >
                                Bài học miễn phí
                            </p>

                            <p className="mt-0.5 text-[10px] text-[#A1A1AA]">
                                {form.isFree
                                    ? "Học viên có thể xem miễn phí."
                                    : "Chỉ dành cho học viên của khóa học."}
                            </p>
                        </div>

                        <span
                            className={[
                                "relative h-5 w-9 shrink-0 rounded-full",
                                "transition-colors",
                                form.isFree
                                    ? "bg-[#16A34A]"
                                    : "bg-[#D4D4D8]",
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "absolute top-0.5 h-4 w-4 rounded-full",
                                    "bg-white shadow-sm",
                                    "transition-transform",
                                    form.isFree
                                        ? "translate-x-4"
                                        : "translate-x-0.5",
                                ].join(" ")}
                            />
                        </span>
                    </button>
                </div>
            </section>

            {/* Video */}
            <section className="border-t border-[#F4F4F5] pt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs font-medium text-[#3F3F46]">
                            Video bài học
                        </p>

                        <p className="mt-1 text-[10px] text-[#A1A1AA]">
                            MP4, WebM, MOV · tối đa 500MB
                        </p>
                    </div>

                    {lesson.duration > 0 && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F4F4F5] px-2 py-1 text-[10px] text-[#71717A]">
                            <Clock3 size={11} />
                            {formatDuration(
                                lesson.duration
                            )}
                        </span>
                    )}
                </div>

                {form.videoFile ? (
                    <div className="overflow-hidden rounded-lg border border-[#E4E4E7]">
                        <video
                            src={videoPreview}
                            controls
                            className="max-h-[400px] w-full bg-black"
                        />

                        <div className="flex items-center justify-between gap-3 p-3">
                            <div className="min-w-0">
                                <p className="truncate text-xs font-medium text-[#3F3F46]">
                                    {form.videoFile.name}
                                </p>

                                <p className="mt-0.5 text-[10px] text-[#A1A1AA]">
                                    {formatFileSize(
                                        form.videoFile.size
                                    )}
                                </p>
                            </div>

                            {!saving && (
                                <button
                                    type="button"
                                    onClick={
                                        handleRemoveNewVideo
                                    }
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#A1A1AA] hover:bg-[#FEF2F2] hover:text-[#DC2626]"
                                >
                                    <Trash2 size={15} />
                                </button>
                            )}
                        </div>

                        {saving && (
                            <div className="px-3 pb-3">
                                <div className="mb-1 flex justify-between text-[10px] text-[#71717A]">
                                    <span>
                                        {uploadProgress >=
                                            100
                                            ? "Đang xử lý..."
                                            : "Đang tải..."}
                                    </span>

                                    <span>
                                        {uploadProgress}%
                                    </span>
                                </div>

                                <div className="h-1 overflow-hidden rounded-full bg-[#E4E4E7]">
                                    <div
                                        className="h-full rounded-full bg-[#18181B] transition-all"
                                        style={{
                                            width: `${uploadProgress}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ) : lesson.video ? (
                    <div className="overflow-hidden rounded-lg border border-[#E4E4E7]">
                        <video
                            src={getUrl(lesson.video)}
                            controls
                            className="max-h-[400px] w-full bg-black"
                        />

                        <div className="flex flex-col gap-2.5 p-3 sm:flex-row sm:items-center sm:justify-between">

                            <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-[11px] font-medium text-[#52525B] hover:bg-[#FAFAFA] hover:text-[#18181B]">
                                <Upload size={13} />
                                Thay video

                                <input
                                    type="file"
                                    accept="video/mp4,video/webm,video/quicktime"
                                    onChange={
                                        handleSelectVideo
                                    }
                                    disabled={saving}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                ) : (
                    <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#D4D4D8] bg-[#FAFAFA] px-4 text-center hover:border-[#A1A1AA] hover:bg-white">
                        <Upload
                            size={20}
                            className="text-[#71717A]"
                        />

                        <span className="mt-2 text-xs font-medium text-[#3F3F46]">
                            Chọn video
                        </span>

                        <span className="mt-1 text-[10px] text-[#A1A1AA]">
                            MP4, WebM, MOV · tối đa 500MB
                        </span>

                        <input
                            type="file"
                            accept="video/mp4,video/webm,video/quicktime"
                            onChange={handleSelectVideo}
                            disabled={saving}
                            className="hidden"
                        />
                    </label>
                )}
            </section>

            {/* Save */}
            <div className="flex justify-end border-t border-[#F4F4F5] pt-4">
                <button
                    type="submit"
                    disabled={saving}
                    className={[
                        "inline-flex w-full items-center justify-center gap-2",
                        "rounded-lg bg-[#18181B]",
                        "px-4 py-2.5",
                        "text-xs font-semibold text-white",
                        "hover:bg-[#27272A]",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "sm:w-auto",
                    ].join(" ")}
                >
                    <Save size={14} />

                    {saving
                        ? form.videoFile
                            ? uploadProgress >= 100
                                ? "Đang xử lý..."
                                : `Đang tải ${uploadProgress}%...`
                            : "Đang lưu..."
                        : "Lưu thay đổi"}
                </button>
            </div>
        </form>
    );
};

export default LessonInfoForm;
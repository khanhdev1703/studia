import { useEffect, useState } from "react";

import {
    AlignLeft,
    BookOpen,
    Check,
    Clock3,
    Save,
    Trash2,
    Upload,
    Video,
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

const LessonInfoForm = ({
    lesson,
    onUpdated,
}) => {
    const [form, setForm] = useState(
        () => createInitialForm(lesson)
    );

    const [saving, setSaving] = useState(false);

    const [videoPreview, setVideoPreview] =
        useState("");

    const [uploadProgress, setUploadProgress] =
        useState(0);

    // ==========================================
    // Sync lesson data
    // ==========================================

    useEffect(() => {
        if (!lesson) {
            return;
        }

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

    // ==========================================
    // Cleanup video preview
    // ==========================================

    useEffect(() => {
        return () => {
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }
        };
    }, [videoPreview]);

    // ==========================================
    // Update form
    // ==========================================

    const updateForm = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // ==========================================
    // Format file size
    // ==========================================

    const formatFileSize = (bytes) => {
        if (!bytes || bytes <= 0) {
            return "0 KB";
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(0)} KB`;
        }

        return `${(
            bytes /
            1024 /
            1024
        ).toFixed(1)} MB`;
    };

    // ==========================================
    // Format duration
    // ==========================================

    const formatDuration = (seconds) => {
        if (
            seconds === null ||
            seconds === undefined ||
            seconds <= 0
        ) {
            return "--:--";
        }

        const totalSeconds = Math.floor(seconds);

        const hours = Math.floor(
            totalSeconds / 3600
        );

        const minutes = Math.floor(
            (totalSeconds % 3600) / 60
        );

        const remainingSeconds =
            totalSeconds % 60;

        if (hours > 0) {
            return `${String(hours).padStart(
                2,
                "0"
            )}:${String(minutes).padStart(
                2,
                "0"
            )}:${String(
                remainingSeconds
            ).padStart(2, "0")}`;
        }

        return `${String(minutes).padStart(
            2,
            "0"
        )}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    // ==========================================
    // Select video
    // ==========================================

    const handleSelectVideo = (event) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        if (
            !ALLOWED_VIDEO_TYPES.includes(
                file.type
            )
        ) {
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
            URL.revokeObjectURL(
                videoPreview
            );
        }

        const previewUrl =
            URL.createObjectURL(file);

        setVideoPreview(previewUrl);

        setForm((prev) => ({
            ...prev,
            videoFile: file,
        }));

        setUploadProgress(0);

        event.target.value = "";
    };

    // ==========================================
    // Remove new video
    // ==========================================

    const handleRemoveNewVideo = () => {
        if (saving) {
            return;
        }

        if (videoPreview) {
            URL.revokeObjectURL(
                videoPreview
            );
        }

        setVideoPreview("");

        setForm((prev) => ({
            ...prev,
            videoFile: null,
        }));

        setUploadProgress(0);
    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (saving) {
            return;
        }

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
                        setUploadProgress(
                            progress
                        );
                    }
                );

            const updatedLesson =
                response?.data;

            if (updatedLesson) {
                onUpdated?.(updatedLesson);
            }

            appToast.success(
                response?.message ||
                "Cập nhật bài học thành công."
            );

            // ==================================
            // Reset temporary video state
            // ==================================

            if (videoPreview) {
                URL.revokeObjectURL(
                    videoPreview
                );
            }

            setVideoPreview("");

            setUploadProgress(0);

            // Giữ lại dữ liệu form theo lesson
            // mới từ server.
            if (updatedLesson) {
                setForm({
                    title:
                        updatedLesson.title ||
                        "",

                    description:
                        updatedLesson.description ||
                        "",

                    videoFile: null,

                    isFree:
                        updatedLesson.isFree ||
                        false,
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

    if (!lesson) {
        return null;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            {/* ==================================
                Basic information
            ================================== */}

            <section
                className="
                    border
                    border-gray-100
                    bg-white
                    p-4
                    shadow-sm
                    sm:p-5
                "
            >
                <div className="mb-5">
                    <h2
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-[#252238]
                        "
                    >
                        <BookOpen
                            size={17}
                            strokeWidth={1.8}
                            className="text-[#0a479d]"
                        />

                        Thông tin bài học
                    </h2>
                </div>

                <div className="space-y-5">
                    {/* ==================================
                        Title
                    ================================== */}

                    <div>
                        <label
                            className="
                                mb-1.5
                                flex
                                items-center
                                gap-1.5
                                text-xs
                                font-medium
                                text-gray-700
                            "
                        >
                            <BookOpen
                                size={14}
                                strokeWidth={1.8}
                                className="text-[#0a479d]"
                            />

                            <span>
                                Tên bài học

                                <span className="ml-1 text-red-500">
                                    *
                                </span>
                            </span>
                        </label>

                        <input
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
                            className="
                                w-full
                                rounded-sm
                                border
                                border-gray-200
                                bg-white
                                px-3
                                py-2.5
                                text-sm
                                text-[#252238]
                                outline-none
                                transition
                                placeholder:text-gray-300
                                hover:border-gray-300
                                focus:border-[#0a479d]
                                focus:ring-2
                                focus:ring-[#0a479d]/10
                                disabled:cursor-not-allowed
                                disabled:bg-gray-50
                            "
                        />
                    </div>

                    {/* ==================================
                        Description
                    ================================== */}

                    <div>
                        <div className="mb-1.5 flex items-center justify-between">
                            <label
                                className="
                                    flex
                                    items-center
                                    gap-1.5
                                    text-xs
                                    font-medium
                                    text-gray-700
                                "
                            >
                                <AlignLeft
                                    size={13}
                                    className="text-[#0a479d]"
                                />

                                Mô tả
                            </label>

                            <span className="text-[11px] text-gray-400">
                                Không bắt buộc
                            </span>
                        </div>

                        <textarea
                            value={
                                form.description
                            }
                            onChange={(event) =>
                                updateForm(
                                    "description",
                                    event.target.value
                                )
                            }
                            disabled={saving}
                            rows={4}
                            placeholder="Mô tả ngắn về bài học..."
                            className="
                                w-full
                                resize-none
                                rounded-sm
                                border
                                border-gray-200
                                bg-white
                                px-3
                                py-2.5
                                text-sm
                                leading-6
                                text-[#252238]
                                outline-none
                                transition
                                placeholder:text-gray-300
                                hover:border-gray-300
                                focus:border-[#0a479d]
                                focus:ring-2
                                focus:ring-[#0a479d]/10
                                disabled:cursor-not-allowed
                                disabled:bg-gray-50
                            "
                        />
                    </div>

                    {/* ==================================
                        Free lesson
                    ================================== */}

                    <div>
                        <div className="mb-2">
                            <p
                                className="
                                    text-xs
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Quyền truy cập
                            </p>

                            <p className="mt-0.5 text-[11px] text-gray-400">
                                Cho phép học viên xem bài học này mà không cần đăng ký khóa học.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                updateForm(
                                    "isFree",
                                    !form.isFree
                                )
                            }
                            disabled={saving}
                            className={`
                                flex
                                w-full
                                items-center
                                justify-between
                                rounded-lg
                                border
                                px-3
                                py-3
                                text-left
                                transition
                                ${form.isFree
                                    ? "border-emerald-200 bg-emerald-50"
                                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                                }
                                ${saving
                                    ? "cursor-not-allowed opacity-60"
                                    : ""
                                }
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-full
                                        ${form.isFree
                                            ? "bg-emerald-100 text-emerald-600"
                                            : "bg-gray-200 text-gray-400"
                                        }
                                    `}
                                >
                                    <Check
                                        size={17}
                                        strokeWidth={2}
                                    />
                                </div>

                                <div>
                                    <p
                                        className={`
                                            text-xs
                                            font-semibold
                                            ${form.isFree
                                                ? "text-emerald-700"
                                                : "text-gray-600"
                                            }
                                        `}
                                    >
                                        Bài học miễn phí
                                    </p>

                                    <p className="mt-0.5 text-[11px] text-gray-400">
                                        {form.isFree
                                            ? "Học viên có thể xem bài học này miễn phí."
                                            : "Bài học chỉ dành cho học viên đã đăng ký khóa học."}
                                    </p>
                                </div>
                            </div>

                            <span
                                className={`
                                    relative
                                    h-5
                                    w-9
                                    shrink-0
                                    rounded-full
                                    transition
                                    ${form.isFree
                                        ? "bg-emerald-500"
                                        : "bg-gray-300"
                                    }
                                `}
                            >
                                <span
                                    className={`
                                        absolute
                                        top-0.5
                                        h-4
                                        w-4
                                        rounded-full
                                        bg-white
                                        shadow-sm
                                        transition
                                        ${form.isFree
                                            ? "left-[18px]"
                                            : "left-0.5"
                                        }
                                    `}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* ==================================
                Video
            ================================== */}

            <section
                className="
                    border
                    border-gray-100
                    bg-white
                    p-4
                    shadow-sm
                    sm:p-5
                "
            >
                <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        <h2
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                text-[#252238]
                            "
                        >
                            <Video
                                size={17}
                                strokeWidth={1.8}
                                className="text-[#0a479d]"
                            />

                            Video bài học
                        </h2>

                        <p className="mt-1 text-[11px] text-gray-400">
                            Thời lượng sẽ được hệ thống tự động cập nhật từ video.
                        </p>
                    </div>

                    {lesson.duration > 0 && (
                        <div
                            className="
                                inline-flex
                                shrink-0
                                items-center
                                gap-1
                                rounded-full
                                bg-gray-50
                                px-2.5
                                py-1
                                text-[11px]
                                font-medium
                                text-gray-500
                            "
                        >
                            <Clock3
                                size={12}
                                strokeWidth={2}
                            />

                            {formatDuration(
                                lesson.duration
                            )}
                        </div>
                    )}
                </div>

                {/* ==================================
                    New video selected
                ================================== */}

                {form.videoFile ? (
                    <div className="overflow-hidden rounded-sm border border-gray-100">
                        <video
                            src={videoPreview}
                            controls
                            className="
                                max-h-80
                                w-full
                                bg-black
                            "
                        />

                        <div className="p-3">
                            <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate text-xs font-medium text-gray-700">
                                        {
                                            form
                                                .videoFile
                                                .name
                                        }
                                    </p>

                                    <p className="mt-0.5 text-[11px] text-gray-400">
                                        {formatFileSize(
                                            form
                                                .videoFile
                                                .size
                                        )}
                                    </p>
                                </div>

                                {!saving && (
                                    <button
                                        type="button"
                                        onClick={
                                            handleRemoveNewVideo
                                        }
                                        className="
                                            flex
                                            h-8
                                            w-8
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-sm
                                            text-gray-400
                                            transition
                                            hover:bg-red-50
                                            hover:text-red-500
                                        "
                                        title="Hủy video mới"
                                    >
                                        <Trash2
                                            size={16}
                                        />
                                    </button>
                                )}
                            </div>

                            {saving && (
                                <div className="mt-4">
                                    <div className="mb-1.5 flex items-center justify-between">
                                        <span className="text-xs text-gray-500">
                                            {uploadProgress >=
                                                100
                                                ? "Đang xử lý video..."
                                                : "Đang tải video..."}
                                        </span>

                                        <span className="text-xs font-semibold text-[#0a479d]">
                                            {
                                                uploadProgress
                                            }
                                            %
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="
                                                h-full
                                                rounded-full
                                                bg-[#0a479d]
                                                transition-all
                                                duration-200
                                            "
                                            style={{
                                                width: `${uploadProgress}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : lesson.video ? (
                    /* ==================================
                       Current video
                    ================================== */

                    <div className="overflow-hidden rounded-sm border border-gray-100">
                        <video
                            src={getUrl(
                                lesson.video
                            )}
                            controls
                            className="
                                max-h-80
                                w-full
                                bg-black
                            "
                        />

                        <div className="flex items-center justify-between gap-3 p-3">
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-700">
                                    Video hiện tại
                                </p>

                                <p className="mt-0.5 text-[11px] text-gray-400">
                                    Thời lượng:{" "}
                                    {formatDuration(
                                        lesson.duration
                                    )}
                                </p>
                            </div>

                            <label
                                className="
                                    inline-flex
                                    shrink-0
                                    cursor-pointer
                                    items-center
                                    gap-1.5
                                    rounded-lg
                                    border
                                    border-gray-200
                                    bg-white
                                    px-3
                                    py-2
                                    text-xs
                                    font-medium
                                    text-gray-600
                                    transition
                                    hover:border-[#0a479d]/30
                                    hover:bg-[#0a479d]/5
                                    hover:text-[#0a479d]
                                "
                            >
                                <Upload size={14} />

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
                    /* ==================================
                       No video
                    ================================== */

                    <label
                        className="
                            flex
                            min-h-40
                            cursor-pointer
                            flex-col
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-dashed
                            border-gray-200
                            bg-gray-50
                            transition
                            hover:border-[#0a479d]/40
                            hover:bg-[#0a479d]/5
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
                                bg-[#0a479d]/10
                                text-[#0a479d]
                            "
                        >
                            <Upload size={21} />
                        </div>

                        <span className="mt-3 text-sm font-medium text-gray-600">
                            Chọn video
                        </span>

                        <span className="mt-1 text-xs text-gray-400">
                            MP4, WebM, MOV · tối đa 500MB
                        </span>

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
                )}
            </section>

            {/* ==================================
                Save
            ================================== */}

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={saving}
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-1.5
                        rounded-sm
                        bg-[#0a479d]
                        px-5
                        py-2.5
                        text-xs
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#083d86]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    <Save size={14} />

                    {saving
                        ? form.videoFile
                            ? uploadProgress >= 100
                                ? "Đang xử lý..."
                                : `Đang tải ${uploadProgress}%...`
                            : "Đang lưu..."
                        : "Lưu thông tin"}
                </button>
            </div>
        </form>
    );
};

export default LessonInfoForm;
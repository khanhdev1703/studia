import { useEffect, useState } from "react";

import {
    ArrowLeft,
    LockOpen,
    Upload,
    Trash2,
    Video,
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import appToast from "../../../../../utils/toast";
import lessonService from "../../../../../services/lessonService";

const LessonCreatePage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // ==========================================
    // Form state
    // ==========================================

    const [form, setForm] = useState({
        title: "",
        description: "",
        isFree: false,
        videoFile: null,
    });

    // ==========================================
    // UI state
    // ==========================================

    const [videoPreview, setVideoPreview] = useState("");
    const [saving, setSaving] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // ==========================================
    // Cleanup preview
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
    // Select video
    // ==========================================

    const handleSelectVideo = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        // ======================================
        // Validate type
        // ======================================

        const allowedTypes = [
            "video/mp4",
            "video/webm",
            "video/quicktime",
        ];

        if (!allowedTypes.includes(file.type)) {
            appToast.error(
                "Chỉ hỗ trợ video MP4, WebM hoặc MOV."
            );

            event.target.value = "";
            return;
        }

        // ======================================
        // Validate size
        // ======================================

        const maxSize = 500 * 1024 * 1024;

        if (file.size > maxSize) {
            appToast.error(
                "Video không được vượt quá 500MB."
            );

            event.target.value = "";
            return;
        }

        // ======================================
        // Release old preview
        // ======================================

        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
        }

        // ======================================
        // Create preview
        // ======================================

        const previewUrl = URL.createObjectURL(file);

        setForm((prev) => ({
            ...prev,
            videoFile: file,
        }));

        setVideoPreview(previewUrl);
        setUploadProgress(0);

        // Cho phép chọn lại cùng một file
        event.target.value = "";
    };

    // ==========================================
    // Remove video
    // ==========================================

    const handleRemoveVideo = () => {
        if (saving) {
            return;
        }

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

    // ==========================================
    // Toggle free lesson
    // ==========================================

    const handleFreeToggle = () => {
        if (saving) {
            return;
        }

        updateForm("isFree", !form.isFree);
    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (saving) {
            return;
        }

        // ======================================
        // Validate course
        // ======================================

        if (!courseId) {
            appToast.error(
                "Không tìm thấy khóa học."
            );

            return;
        }

        // ======================================
        // Validate title
        // ======================================

        if (!form.title.trim()) {
            appToast.error(
                "Vui lòng nhập tên bài học."
            );

            return;
        }

        // ======================================
        // Validate video
        // ======================================

        if (!form.videoFile) {
            appToast.error(
                "Vui lòng chọn video cho bài học."
            );

            return;
        }

        try {
            setSaving(true);
            setUploadProgress(0);

            // ==================================
            // FormData
            // ==================================

            const formData = new FormData();

            formData.append(
                "title",
                form.title.trim()
            );

            if (form.description.trim()) {
                formData.append(
                    "description",
                    form.description.trim()
                );
            }

            formData.append(
                "isFree",
                String(form.isFree)
            );

            formData.append(
                "video",
                form.videoFile
            );

            // ==================================
            // Create lesson
            // ==================================
            //
            // Không gửi:
            // - order
            // - duration
            // - documents
            // - isLocked
            //
            // BE sẽ tự xử lý:
            // - order
            // - duration
            //
            // documents là relation riêng:
            // LessonDocument[]
            //

            const response = await lessonService.create(
                courseId,
                formData,
                (progress) => {
                    setUploadProgress(progress);
                }
            );

            // ==================================
            // Success
            // ==================================

            appToast.success(
                response?.message ||
                "Tạo bài học thành công."
            );

            navigate(
                `/teacher/courses/${courseId}/lessons`
            );
        } catch (error) {
            console.error(
                "Create lesson error:",
                error
            );

            appToast.error(
                error?.response?.data?.message ||
                "Không thể tạo bài học."
            );

            setUploadProgress(0);
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // Render
    // ==========================================

    return (
        <div className="space-y-2">
            {/* Header */}

            <div className="border border-gray-100 bg-white p-4">
                <h1 className="text-base font-semibold text-[#252238]">
                    Thêm bài học
                </h1>

                <p className="mt-0.5 text-xs text-gray-500">
                    Thêm nội dung mới vào khóa học.
                </p>
            </div>

            {/* Back */}

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
                        hover:text-[#6C5CE7]
                    "
                >
                    <ArrowLeft size={15} />
                    Quay lại danh sách bài học
                </Link>
            </div>

            {/* Form */}

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
                    {/* Title */}

                    <div>
                        <label
                            className="
                                mb-1.5
                                block
                                text-xs
                                font-medium
                                text-gray-700
                            "
                        >
                            Tên bài học
                            <span className="ml-1 text-red-500">
                                *
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
                            placeholder="Ví dụ: Giới thiệu React"
                            className="
                                w-full
                                rounded-lg
                                border
                                border-gray-200
                                px-3
                                py-2.5
                                text-sm
                                outline-none
                                transition
                                placeholder:text-gray-300
                                focus:border-[#6C5CE7]
                                focus:ring-2
                                focus:ring-[#6C5CE7]/10
                                disabled:bg-gray-50
                            "
                        />
                    </div>

                    {/* Description */}

                    <div className="mt-4">
                        <label
                            className="
                                mb-1.5
                                block
                                text-xs
                                font-medium
                                text-gray-700
                            "
                        >
                            Mô tả
                        </label>

                        <textarea
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
                            className="
                                w-full
                                resize-none
                                rounded-lg
                                border
                                border-gray-200
                                px-3
                                py-2.5
                                text-sm
                                outline-none
                                transition
                                placeholder:text-gray-300
                                focus:border-[#6C5CE7]
                                focus:ring-2
                                focus:ring-[#6C5CE7]/10
                                disabled:bg-gray-50
                            "
                        />
                    </div>

                    {/* Free lesson */}

                    <div
                        className="
                            mt-4
                            flex
                            items-center
                            justify-between
                            gap-4
                            rounded-lg
                            border
                            border-gray-100
                            bg-gray-50
                            p-3
                        "
                    >
                        <div className="flex items-start gap-3">
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
                                    text-[#6C5CE7]
                                "
                            >
                                <LockOpen size={16} />
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-gray-700">
                                    Bài học miễn phí
                                </p>

                                <p className="mt-0.5 text-[11px] leading-5 text-gray-400">
                                    Cho phép người chưa tham gia
                                    khóa học xem bài học này.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={form.isFree}
                            disabled={saving}
                            onClick={handleFreeToggle}
                            className={`
                                relative
                                inline-flex
                                h-5
                                w-9
                                shrink-0
                                items-center
                                rounded-full
                                transition-colors
                                duration-200
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#6C5CE7]/20
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                ${form.isFree
                                    ? "bg-[#6C5CE7]"
                                    : "bg-gray-300"
                                }
                            `}
                        >
                            <span
                                className={`
                                    inline-block
                                    h-4
                                    w-4
                                    rounded-full
                                    bg-white
                                    shadow-md
                                    transition-transform
                                    duration-200
                                    ${form.isFree
                                        ? "translate-x-4"
                                        : "translate-x-0.5"
                                    }
                                `}
                            />
                        </button>
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
                    <div className="mb-4">
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
                                className="text-[#6C5CE7]"
                            />

                            Video bài học

                            <span className="text-red-500">
                                *
                            </span>
                        </h2>

                        <p className="mt-1 text-xs text-gray-400">
                            MP4, WebM hoặc MOV. Tối đa 500MB.
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            Thời lượng video sẽ được hệ thống tự động xác định.
                        </p>
                    </div>

                    {!videoPreview ? (
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
                                hover:border-[#6C5CE7]/40
                                hover:bg-[#6C5CE7]/5
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
                                <Upload size={21} />
                            </div>

                            <span
                                className="
                                    mt-3
                                    text-sm
                                    font-medium
                                    text-gray-600
                                "
                            >
                                Chọn video
                            </span>

                            <span
                                className="
                                    mt-1
                                    text-xs
                                    text-gray-400
                                "
                            >
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
                    ) : (
                        <div
                            className="
                                overflow-hidden
                                rounded-xl
                                border
                                border-gray-100
                            "
                        >
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
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-3
                                    "
                                >
                                    <div className="min-w-0">
                                        <p
                                            className="
                                                truncate
                                                text-xs
                                                font-medium
                                                text-gray-700
                                            "
                                        >
                                            {form.videoFile?.name}
                                        </p>

                                        <p
                                            className="
                                                mt-0.5
                                                text-[11px]
                                                text-gray-400
                                            "
                                        >
                                            {form.videoFile
                                                ? (
                                                    form
                                                        .videoFile
                                                        .size /
                                                    1024 /
                                                    1024
                                                ).toFixed(1)
                                                : "0.0"}{" "}
                                            MB
                                        </p>
                                    </div>

                                    {!saving && (
                                        <button
                                            type="button"
                                            onClick={
                                                handleRemoveVideo
                                            }
                                            className="
                                                flex
                                                h-8
                                                w-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                text-gray-400
                                                transition
                                                hover:bg-red-50
                                                hover:text-red-500
                                            "
                                            title="Xóa video"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                {/* Upload progress */}

                                {saving && (
                                    <div className="mt-4">
                                        <div
                                            className="
                                                mb-1.5
                                                flex
                                                items-center
                                                justify-between
                                            "
                                        >
                                            <span
                                                className="
                                                    text-xs
                                                    text-gray-500
                                                "
                                            >
                                                {uploadProgress >=
                                                    100
                                                    ? "Đang xử lý video..."
                                                    : "Đang tải video..."}
                                            </span>

                                            <span
                                                className="
                                                    text-xs
                                                    font-semibold
                                                    text-[#6C5CE7]
                                                "
                                            >
                                                {uploadProgress}%
                                            </span>
                                        </div>

                                        <div
                                            className="
                                                h-2
                                                overflow-hidden
                                                rounded-full
                                                bg-gray-100
                                            "
                                        >
                                            <div
                                                className="
                                                    h-full
                                                    rounded-full
                                                    bg-[#6C5CE7]
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
                    )}
                </section>

                {/* ==================================
                    Actions
                ================================== */}

                <div
                    className="
                        flex
                        justify-end
                        gap-2
                        p-4
                    "
                >
                    <Link
                        to=".."
                        relative="path"
                        className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-sm
                            border
                            border-gray-200
                            bg-white
                            px-4
                            py-2.5
                            text-xs
                            font-medium
                            text-gray-600
                            transition
                            hover:bg-gray-50
                        "
                    >
                        Hủy
                    </Link>

                    <button
                        type="submit"
                        disabled={saving}
                        className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-sm
                            bg-[#6C5CE7]
                            px-5
                            py-2.5
                            text-xs
                            font-semibold
                            text-white
                            transition
                            hover:bg-[#5b4bd6]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {saving
                            ? uploadProgress >= 100
                                ? "Đang xử lý..."
                                : `Đang tải ${uploadProgress}%...`
                            : "Tạo bài học"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LessonCreatePage;
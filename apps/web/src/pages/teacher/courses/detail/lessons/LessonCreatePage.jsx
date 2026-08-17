import { useEffect, useState } from "react";
import {
    ArrowLeft,
    FileText,
    Trash2,
    Upload,
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
        document: "",
        videoFile: null,
    });

    // ==========================================
    // UI state
    // ==========================================

    const [videoPreview, setVideoPreview] =
        useState("");

    const [saving, setSaving] =
        useState(false);

    const [uploadProgress, setUploadProgress] =
        useState(0);

    // ==========================================
    // Cleanup preview
    // ==========================================

    useEffect(() => {
        return () => {
            if (videoPreview) {
                URL.revokeObjectURL(
                    videoPreview
                );
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
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

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

        // 500MB
        if (
            file.size >
            500 * 1024 * 1024
        ) {
            appToast.error(
                "Video không được vượt quá 500MB."
            );

            event.target.value = "";
            return;
        }

        // Release old preview
        if (videoPreview) {
            URL.revokeObjectURL(
                videoPreview
            );
        }

        const previewUrl =
            URL.createObjectURL(file);

        setForm((prev) => ({
            ...prev,
            videoFile: file,
        }));

        setVideoPreview(previewUrl);

        setUploadProgress(0);
    };

    // ==========================================
    // Remove video
    // ==========================================

    const handleRemoveVideo = () => {
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

            const formData =
                new FormData();

            formData.append(
                "title",
                form.title.trim()
            );

            formData.append(
                "description",
                form.description.trim()
            );

            formData.append(
                "document",
                form.document.trim()
            );

            formData.append(
                "video",
                form.videoFile
            );

            // ==================================
            // Create lesson
            // ==================================

            const response =
                await lessonService.create(
                    courseId,
                    formData,
                    (progress) => {
                        setUploadProgress(
                            progress
                        );
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
        <div className="space-y-4">

            {/* Header */}

            <div>
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

                    Quay lại bài học
                </Link>

                <h1
                    className="
                        mt-2
                        text-base
                        font-semibold
                        text-[#252238]
                    "
                >
                    Thêm bài học
                </h1>

                <p
                    className="
                        mt-0.5
                        text-xs
                        text-gray-500
                    "
                >
                    Thêm nội dung mới vào khóa học.
                </p>
            </div>

            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                {/* Basic information */}

                <section
                    className="
                        rounded-xl
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
                                text-sm
                                font-semibold
                                text-[#252238]
                            "
                        >
                            Thông tin bài học
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-gray-400
                            "
                        >
                            Nhập thông tin cơ bản của bài học.
                        </p>
                    </div>

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
                </section>

                {/* Video */}

                <section
                    className="
                        rounded-xl
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
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-gray-400
                            "
                        >
                            MP4, WebM hoặc MOV. Tối đa 500MB.
                        </p>
                    </div>

                    {!videoPreview ? (
                        <label
                            className="
                                flex
                                min-h-48
                                cursor-pointer
                                flex-col
                                items-center
                                justify-center
                                rounded-xl
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
                                onChange={
                                    handleSelectVideo
                                }
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
                                            {(
                                                form.videoFile
                                                    ?.size /
                                                1024 /
                                                1024
                                            ).toFixed(1)}
                                            {" MB"}
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
                                            <Trash2
                                                size={16}
                                            />
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
                                                    ? "Đang hoàn tất..."
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

                {/* Document */}

                <section
                    className="
                        rounded-xl
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
                            <FileText
                                size={17}
                                className="text-[#6C5CE7]"
                            />

                            Tài liệu
                        </h2>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-gray-400
                            "
                        >
                            Nội dung tài liệu của bài học.
                        </p>
                    </div>

                    <textarea
                        value={form.document}
                        onChange={(event) =>
                            updateForm(
                                "document",
                                event.target.value
                            )
                        }
                        disabled={saving}
                        rows={8}
                        placeholder="Nhập nội dung tài liệu..."
                        className="
                            w-full
                            resize-y
                            rounded-lg
                            border
                            border-gray-200
                            px-3
                            py-2.5
                            text-sm
                            leading-6
                            outline-none
                            transition
                            placeholder:text-gray-300
                            focus:border-[#6C5CE7]
                            focus:ring-2
                            focus:ring-[#6C5CE7]/10
                            disabled:bg-gray-50
                        "
                    />
                </section>

                {/* Actions */}

                <div
                    className="
                        flex
                        flex-col-reverse
                        gap-2
                        sm:flex-row
                        sm:justify-end
                    "
                >
                    <Link
                        to=".."
                        relative="path"
                        className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-gray-200
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
                            rounded-lg
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
                                ? "Đang hoàn tất..."
                                : `Đang tải ${uploadProgress}%...`
                            : "Tạo bài học"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LessonCreatePage;
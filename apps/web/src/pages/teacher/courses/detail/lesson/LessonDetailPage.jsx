import { useEffect, useState } from "react";

import {
    ArrowLeft,
    FileText,
    Save,
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
import getImageUrl from "../../../../../utils/getImageUrl"
import lessonService from "../../../../../services/lessonService";

const LessonDetailPage = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();

    // ==========================================
    // Lesson state
    // ==========================================

    const [lesson, setLesson] = useState(null);

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

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [videoPreview, setVideoPreview] = useState("");
    const [newVideoSelected, setNewVideoSelected] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // ==========================================
    // Fetch lesson
    // ==========================================

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await lessonService.getById(lessonId);
                const data = response?.data;

                if (!data) {
                    throw new Error("Không tìm thấy bài học.");
                }

                setLesson(data);

                setForm({
                    title: data.title || "",
                    description: data.description || "",
                    document: data.document || "",
                    videoFile: null,
                });
            } catch (error) {
                console.error("Get lesson detail error:", error);

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
    // Select new video
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

        setVideoPreview(previewUrl);

        setForm((prev) => ({
            ...prev,
            videoFile: file,
        }));

        setNewVideoSelected(true);
        setUploadProgress(0);
    };

    // ==========================================
    // Remove selected new video
    // ==========================================

    const handleRemoveNewVideo = () => {
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

        setNewVideoSelected(false);
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
        // Validate params
        // ======================================

        if (!courseId || !lessonId) {
            appToast.error(
                "Không tìm thấy thông tin bài học."
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

            formData.append(
                "description",
                form.description.trim()
            );

            formData.append(
                "document",
                form.document.trim()
            );

            // Chỉ gửi video nếu teacher
            // thực sự chọn video mới.
            if (form.videoFile) {
                formData.append(
                    "video",
                    form.videoFile
                );
            }

            // ==================================
            // Update lesson
            // ==================================

            const response =
                await lessonService.update(
                    lessonId,
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
                "Cập nhật bài học thành công."
            );

            navigate(
                `/teacher/courses/${courseId}/lessons`
            );
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

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="border border-gray-100 bg-white p-4">
                    <div className="h-5 w-48 animate-pulse rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-64 animate-pulse rounded bg-gray-100" />
                </div>

                <div className="border border-gray-100 bg-white p-5">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />

                    <div className="mt-5 space-y-4">
                        <div className="h-10 animate-pulse rounded bg-gray-100" />
                        <div className="h-24 animate-pulse rounded bg-gray-100" />
                    </div>
                </div>

                <div className="border border-gray-100 bg-white p-5">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="mt-5 h-64 animate-pulse rounded bg-gray-100" />
                </div>
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
                            hover:text-[#6C5CE7]
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

            <div className="border border-gray-100 bg-white p-4">
                <h1 className="text-base font-semibold text-[#252238]">
                    Chỉnh sửa bài học
                </h1>

                <p className="mt-0.5 text-xs text-gray-500">
                    Cập nhật nội dung bài học của bạn.
                </p>
            </div>

            {/* ==================================
                Back
            ================================== */}

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

            {/* ==================================
                Form
            ================================== */}

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
                    <div className="mb-4">
                        <h2 className="text-sm font-semibold text-[#252238]">
                            Thông tin bài học
                        </h2>

                        <p className="mt-1 text-xs text-gray-400">
                            Chỉnh sửa thông tin cơ bản của bài học.
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
                        </h2>

                        <p className="mt-1 text-xs text-gray-400">
                            Video hiện tại của bài học.
                        </p>
                    </div>

                    {/* ==================================
                        New video selected
                    ================================== */}

                    {newVideoSelected ? (
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
                                            ).toFixed(1)}{" "}
                                            MB
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
                                                rounded-lg
                                                text-gray-400
                                                transition
                                                hover:bg-red-50
                                                hover:text-red-500
                                            "
                                            title="Hủy video mới"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                {/* Upload progress */}

                                {saving &&
                                    form.videoFile && (
                                        <div className="mt-4">
                                            <div
                                                className="
                                                    mb-1.5
                                                    flex
                                                    items-center
                                                    justify-between
                                                "
                                            >
                                                <span className="text-xs text-gray-500">
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
                    ) : (
                        <>
                            {/* ==================================
                                Current video
                            ================================== */}

                            {lesson.video ? (
                                <div
                                    className="
                                        overflow-hidden
                                        rounded-xl
                                        border
                                        border-gray-100
                                    "
                                >
                                    <video
                                        src={getImageUrl(lesson.video)}
                                        controls
                                        className="
                                            max-h-80
                                            w-full
                                            bg-black
                                        "
                                    />

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                            p-3
                                        "
                                    >
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-gray-700">
                                                Video hiện tại
                                            </p>

                                            <p className="mt-0.5 text-[11px] text-gray-400">
                                                Chọn video mới nếu muốn thay thế.
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
                                                hover:border-[#6C5CE7]/30
                                                hover:bg-[#6C5CE7]/5
                                                hover:text-[#6C5CE7]
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
                                        onChange={
                                            handleSelectVideo
                                        }
                                        disabled={saving}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </>
                    )}
                </section>

                {/* ==================================
                    Document
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
                            <FileText
                                size={17}
                                className="text-[#6C5CE7]"
                            />

                            Tài liệu
                        </h2>

                        <p className="mt-1 text-xs text-gray-400">
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
                        rows={5}
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
                            gap-1.5
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
        </div>
    );
};

export default LessonDetailPage;
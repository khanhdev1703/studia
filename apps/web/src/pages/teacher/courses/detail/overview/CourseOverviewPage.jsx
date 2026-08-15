import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import CourseBasicInfo from "./CourseBasicInfo";

const CourseOverviewPage = () => {
    const {
        course,
        setCourse,
    } = useOutletContext();

    // ==========================================
    // Form state
    // ==========================================

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("DRAFT");

    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState(null);

    // ==========================================
    // UI state
    // ==========================================

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ==========================================
    // Sync course -> form
    // ==========================================

    useEffect(() => {
        if (!course) {
            return;
        }

        setTitle(course.title || "");
        setDescription(course.description || "");
        setStatus(course.status || "DRAFT");

        setThumbnailPreview(
            course.thumbnail || ""
        );

        setThumbnailFile(null);
        setError("");
        setSuccess("");
    }, [course]);

    // ==========================================
    // Select thumbnail
    // ==========================================

    const handleSelectImage = (file) => {
        if (!file) {
            return;
        }

        // Max 5MB
        if (file.size > 5 * 1024 * 1024) {
            setError(
                "Ảnh không được vượt quá 5MB."
            );

            return;
        }

        // Allowed image types
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError(
                "Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP."
            );

            return;
        }

        setError("");
        setSuccess("");

        setThumbnailFile(file);

        const previewUrl =
            URL.createObjectURL(file);

        setThumbnailPreview(previewUrl);
    };

    // ==========================================
    // Save
    // ==========================================

    const handleSave = async () => {
        setError("");
        setSuccess("");

        // Basic validation
        if (!title.trim()) {
            setError(
                "Vui lòng nhập tên khóa học."
            );

            return;
        }

        try {
            setSaving(true);

            /*
             * TODO:
             *
             * Gọi courseService.update()
             *
             * Nếu có upload thumbnail:
             * sử dụng FormData để gửi:
             *
             * title
             * description
             * status
             * thumbnailFile
             */

            const updatedCourse = {
                ...course,

                title: title.trim(),

                description:
                    description.trim(),

                status,

                /*
                 * Tạm thời sử dụng preview.
                 * Sau khi backend upload ảnh hoàn chỉnh,
                 * thay bằng URL ảnh trả về từ API.
                 */
                thumbnail:
                    thumbnailPreview ||
                    course.thumbnail,
            };

            // Update course ở CourseDetailPage
            setCourse(updatedCourse);

            setSuccess(
                "Đã lưu thông tin khóa học."
            );
        } catch (error) {
            console.error(error);

            setError(
                error?.response?.data?.message ||
                "Không thể cập nhật khóa học."
            );
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // Loading / empty
    // ==========================================

    if (!course) {
        return null;
    }

    // ==========================================
    // Render
    // ==========================================

    return (
        <div className="space-y-4">
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

            {/* Success */}
            {success && (
                <div
                    className="
                        rounded-xl
                        border
                        border-green-100
                        bg-green-50
                        px-4
                        py-3
                        text-sm
                        text-green-600
                    "
                >
                    {success}
                </div>
            )}

            {/* Course basic information */}
            <CourseBasicInfo
                title={title}
                description={description}
                status={status}
                thumbnailPreview={
                    thumbnailPreview
                }
                thumbnailFile={thumbnailFile}
                saving={saving}
                onTitleChange={setTitle}
                onDescriptionChange={
                    setDescription
                }
                onStatusChange={setStatus}
                onSelectImage={
                    handleSelectImage
                }
                onSave={handleSave}
            />
        </div>
    );
};

export default CourseOverviewPage;
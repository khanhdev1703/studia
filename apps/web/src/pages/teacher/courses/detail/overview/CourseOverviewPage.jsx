import { useEffect, useState } from "react";
import {
    useOutletContext,
    useParams,
    useNavigate,
} from "react-router-dom";

import appToast from "../../../../../utils/toast";

import courseService from "../../../../../services/courseService";

import CourseBasicInfo from "./CourseBasicInfo";
import CourseDangerZone from "./CourseDangerZone";
import DeleteCourseModal from "./DeleteCourseModal";

const CourseOverviewPage = () => {
    const {
        course,
        setCourse,
    } = useOutletContext();

    const { courseId } = useParams();
    const navigate = useNavigate();

    // ==========================================
    // Form state
    // ==========================================

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "DRAFT",
        thumbnailFile: null,
    });

    // ==========================================
    // UI state
    // ==========================================

    const [thumbnailPreview, setThumbnailPreview] =
        useState("");

    const [saving, setSaving] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [deleting, setDeleting] =
        useState(false);

    // ==========================================
    // Sync course -> form
    // ==========================================

    useEffect(() => {
        if (!course) {
            return;
        }

        setForm({
            title: course.title || "",
            description: course.description || "",
            status: course.status || "DRAFT",
            thumbnailFile: null,
        });

        setThumbnailPreview(
            course.thumbnail || ""
        );
    }, [course]);

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
    // Select thumbnail
    // ==========================================

    const handleSelectImage = (file) => {
        if (!file) {
            return;
        }

        // Max 5MB
        if (file.size > 5 * 1024 * 1024) {
            appToast.error(
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
            appToast.error(
                "Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP."
            );

            return;
        }

        // Save file into form
        setForm((prev) => ({
            ...prev,
            thumbnailFile: file,
        }));

        // Preview
        const previewUrl =
            URL.createObjectURL(file);

        setThumbnailPreview(previewUrl);
    };

    // ==========================================
    // Save
    // ==========================================

    const handleSave = async (event) => {
        event?.preventDefault();

        if (!courseId) {
            appToast.error(
                "Không tìm thấy khóa học."
            );

            return;
        }

        // ======================================
        // Validation
        // ======================================

        if (!form.title.trim()) {
            appToast.error(
                "Vui lòng nhập tên khóa học."
            );

            return;
        }

        try {
            setSaving(true);

            // ==================================
            // Create FormData
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
                "status",
                form.status
            );

            // Chỉ gửi file nếu chọn ảnh mới
            if (form.thumbnailFile) {
                formData.append(
                    "thumbnail",
                    form.thumbnailFile
                );
            }

            // ==================================
            // Service
            // ==================================

            const response =
                await courseService.updateCourse(
                    courseId,
                    formData
                );

            const updatedCourse = response.data;

            // Cập nhật CourseDetail context
            setCourse(updatedCourse);

            // Reset thumbnail file
            setForm((prev) => ({
                ...prev,
                thumbnailFile: null,
            }));

            // Preview sử dụng URL thật từ BE
            setThumbnailPreview(
                updatedCourse.thumbnail || ""
            );

            appToast.success(
                response.message ||
                "Cập nhật khóa học thành công."
            );
        } catch (error) {
            console.error(
                "Update course error:",
                error
            );

            appToast.error(
                error?.response?.data?.message ||
                "Không thể cập nhật khóa học."
            );
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // Delete course
    // ==========================================

    const handleDelete = async () => {
        if (!courseId || deleting) {
            return;
        }

        try {
            setDeleting(true);

            await courseService.deleteCourse(
                courseId
            );

            appToast.success(
                "Đã xóa khóa học."
            );

            setCourse(null);

            navigate("/teacher/courses", {
                replace: true,
            });
        } catch (error) {
            console.error(
                "Delete course error:",
                error
            );

            appToast.error(
                error?.response?.data?.message ||
                "Không thể xóa khóa học."
            );
        } finally {
            setDeleting(false);
            setDeleteModalOpen(false);
        }
    };

    // ==========================================
    // Empty
    // ==========================================

    if (!course) {
        return null;
    }

    // ==========================================
    // Render
    // ==========================================

    return (
        <div className="space-y-4">
            {/* Basic information */}

            <CourseBasicInfo
                form={form}
                thumbnailPreview={thumbnailPreview}
                saving={saving}
                onFormChange={updateForm}
                onSelectImage={
                    handleSelectImage
                }
                onSave={handleSave}
            />

            {/* Danger zone */}

            <CourseDangerZone
                courseTitle={course.title}
                deleting={deleting}
                onDelete={() =>
                    setDeleteModalOpen(true)
                }
            />
            <DeleteCourseModal
                open={deleteModalOpen}
                courseTitle={course.title}
                deleting={deleting}
                onClose={() => {
                    if (!deleting) {
                        setDeleteModalOpen(false);
                    }
                }}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default CourseOverviewPage;
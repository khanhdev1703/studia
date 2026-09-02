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
    const { course, setCourse } = useOutletContext();
    const { courseId } = useParams();
    const navigate = useNavigate();

    // ==========================================
    // Form state
    // ==========================================
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: 0,
        durationMonths: 6,
        status: true,
        thumbnailFile: null,
    });

    // ==========================================
    // UI state
    // ==========================================
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [saving, setSaving] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

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
            price: course.price ?? 0,
            durationMonths: course.durationMonths ?? 0,
            status: course.status ?? true,
            thumbnailFile: null,
        });

        setThumbnailPreview(course.thumbnail || "");
    }, [course]);

    // ==========================================
    // Cleanup object URL
    // ==========================================
    useEffect(() => {
        return () => {
            if (
                thumbnailPreview &&
                thumbnailPreview.startsWith("blob:")
            ) {
                URL.revokeObjectURL(thumbnailPreview);
            }
        };
    }, [thumbnailPreview]);

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
            appToast.error("Ảnh không được vượt quá 5MB.");
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

        // Revoke old preview URL
        if (
            thumbnailPreview &&
            thumbnailPreview.startsWith("blob:")
        ) {
            URL.revokeObjectURL(thumbnailPreview);
        }

        const previewUrl = URL.createObjectURL(file);

        setForm((prev) => ({
            ...prev,
            thumbnailFile: file,
        }));

        setThumbnailPreview(previewUrl);
    };

    // ==========================================
    // Save
    // ==========================================
    const handleSave = async (event) => {
        event?.preventDefault();

        if (!courseId) {
            appToast.error("Không tìm thấy khóa học.");
            return;
        }

        // ======================================
        // Validate title
        // ======================================
        const title = form.title.trim();

        if (!title) {
            appToast.error("Vui lòng nhập tên khóa học.");
            return;
        }

        // ======================================
        // Validate price
        // ======================================
        const price = Number(form.price);

        if (!Number.isInteger(price) || price < 0) {
            appToast.error(
                "Giá khóa học phải là số nguyên không âm."
            );
            return;
        }

        // ======================================
        // Validate duration
        // ======================================
        const durationMonths = Number(
            form.durationMonths
        );

        if (
            !Number.isInteger(durationMonths) ||
            durationMonths < 0
        ) {
            appToast.error(
                "Thời hạn sở hữu phải là số nguyên không âm."
            );
            return;
        }

        try {
            setSaving(true);

            // ==================================
            // Create FormData
            // ==================================
            const formData = new FormData();

            formData.append("title", title);

            formData.append(
                "description",
                form.description.trim()
            );

            formData.append(
                "price",
                String(price)
            );

            formData.append(
                "durationMonths",
                String(durationMonths)
            );

            formData.append(
                "status",
                Boolean(form.status)
            );

            // ==================================
            // Thumbnail
            // ==================================
            if (form.thumbnailFile) {
                formData.append(
                    "thumbnail",
                    form.thumbnailFile
                );
            }

            // ==================================
            // Update course
            // ==================================
            const response =
                await courseService.updateCourse(
                    courseId,
                    formData
                );

            const updatedCourse = response.data;

            // ==================================
            // Update CourseDetail context
            // ==================================
            setCourse(updatedCourse);

            // ==================================
            // Sync form
            // ==================================
            setForm({
                title: updatedCourse.title || "",
                description:
                    updatedCourse.description || "",
                price: updatedCourse.price ?? 0,
                durationMonths:
                    updatedCourse.durationMonths ?? 0,
                status: updatedCourse.status ?? true,
                thumbnailFile: null,
            });

            // ==================================
            // Update thumbnail preview
            // ==================================
            if (
                thumbnailPreview &&
                thumbnailPreview.startsWith("blob:")
            ) {
                URL.revokeObjectURL(thumbnailPreview);
            }

            setThumbnailPreview(
                updatedCourse.thumbnail || ""
            );

            // ==================================
            // Success
            // ==================================
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

            await courseService.deleteCourse(courseId);

            appToast.success("Đã xóa khóa học.");

            // Soft delete ở backend
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
            <CourseBasicInfo
                form={form}
                thumbnailPreview={thumbnailPreview}
                saving={saving}
                onFormChange={updateForm}
                onSelectImage={handleSelectImage}
                onSave={handleSave}
            />

            <CourseDangerZone
                courseTitle={course.title}
                deleting={deleting}
                onDelete={() => setDeleteModalOpen(true)}
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
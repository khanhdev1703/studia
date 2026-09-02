// src/pages/teacher/courses/CourseEnrollmentsPage.jsx

import { useEffect, useState } from "react";

import {
    ChevronRight,
    Plus,
    Users,
    X,
} from "lucide-react";

import { useNavigate, useOutletContext } from "react-router-dom";

import enrollmentService from "../../../../../services/enrollmentService";
import appToast from "../../../../../utils/toast";

const formatDate = (date) => {
    if (!date) return "--";

    return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
};

const CourseEnrollmentsPage = () => {
    const { course } = useOutletContext();
    const navigate = useNavigate();

    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Add student modal
    const [showAddModal, setShowAddModal] = useState(false);
    const [studentId, setStudentId] = useState("");
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const courseId = course?.id;

        if (!courseId) return;

        const fetchEnrollments = async () => {
            try {
                setLoading(true);

                const response =
                    await enrollmentService.getByCourse(
                        courseId
                    );

                setEnrollments(
                    response?.data ?? response ?? []
                );
            } catch (error) {
                appToast.error(
                    error?.response?.data?.message ||
                    "Không thể tải danh sách học sinh."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [course?.id]);

    const handleOpenAddModal = () => {
        setStudentId("");
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        if (adding) return;

        setShowAddModal(false);
        setStudentId("");
    };

    const handleViewStudent = (enrollmentId) => {
        if (!course?.id || !enrollmentId) return;

        navigate(
            `/teacher/courses/${course.id}/enrollments/${enrollmentId}`
        );
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();

        const trimmedStudentId = studentId.trim();

        if (!trimmedStudentId) {
            appToast.error(
                "Vui lòng nhập mã học sinh."
            );
            return;
        }

        if (!course?.id) {
            appToast.error(
                "Không xác định được khóa học."
            );
            return;
        }

        try {
            setAdding(true);

            const response =
                await enrollmentService.enrollStudent(
                    course.id,
                    trimmedStudentId
                );

            const newEnrollment =
                response?.data ?? response;

            setEnrollments((prev) => [
                newEnrollment,
                ...prev,
            ]);

            appToast.success(
                "Thêm học sinh vào khóa học thành công."
            );

            setShowAddModal(false);
            setStudentId("");
        } catch (error) {
            appToast.error(
                error?.response?.data?.message ||
                "Không thể thêm học sinh vào khóa học."
            );
        } finally {
            setAdding(false);
        }
    };

    return (
        <>
            <section className="overflow-hidden border border-gray-100 bg-white shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-5">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <Users
                                size={18}
                                strokeWidth={1.8}
                            />
                        </div>

                        <div className="min-w-0">
                            <h2 className="text-sm font-semibold text-gray-800">
                                Học sinh tham gia
                            </h2>

                            <p className="mt-0.5 text-xs text-gray-400">
                                {enrollments.length} học sinh
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleOpenAddModal}
                        className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-violet-600 px-3 text-xs font-medium text-white shadow-sm shadow-violet-200 transition hover:bg-violet-700 active:scale-[0.98]"
                    >
                        <Plus
                            size={15}
                            strokeWidth={2}
                        />

                        <span>Thêm</span>
                    </button>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="divide-y divide-gray-100">
                        {Array.from({ length: 5 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 px-4 py-4 sm:px-5"
                                >
                                    {/* Number */}
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                                        <div className="h-3 w-3 animate-pulse rounded bg-gray-100" />
                                    </div>

                                    {/* Student */}
                                    <div className="min-w-0 flex-1">
                                        <div className="h-3 w-32 animate-pulse rounded bg-gray-100" />

                                        <div className="mt-2 h-2.5 w-40 max-w-full animate-pulse rounded bg-gray-100" />

                                        <div className="mt-2 h-2.5 w-24 animate-pulse rounded bg-gray-100" />
                                    </div>

                                    {/* Action */}
                                    <div className="h-8 w-8 shrink-0 animate-pulse rounded-lg bg-gray-100" />
                                </div>
                            )
                        )}
                    </div>
                ) : enrollments.length > 0 ? (
                    /* Student List */
                    <div className="divide-y divide-gray-100">
                        {enrollments.map(
                            (enrollment, index) => (
                                <button
                                    key={enrollment.id}
                                    type="button"
                                    onClick={() =>
                                        handleViewStudent(
                                            enrollment.id
                                        )
                                    }
                                    className="group flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-violet-50/30 active:bg-gray-50 sm:px-5"
                                >
                                    {/* STT */}
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                                        <span className="text-xs font-medium text-gray-400">
                                            {index + 1}
                                        </span>
                                    </div>

                                    {/* Student Info */}
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-xs font-semibold text-gray-800">
                                            {enrollment.student
                                                ?.name ||
                                                enrollment.studentName ||
                                                "Học sinh"}
                                        </p>

                                        <p className="mt-0.5 truncate text-[11px] text-gray-400">
                                            {enrollment.student
                                                ?.email ||
                                                enrollment.studentEmail ||
                                                "--"}
                                        </p>

                                        <p className="mt-1.5 text-[11px] text-gray-500">
                                            Hết hạn{" "}
                                            <span className="font-medium text-gray-600">
                                                {formatDate(
                                                    enrollment.expiresAt
                                                )}
                                            </span>
                                        </p>
                                    </div>

                                    {/* View */}
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-300 transition group-hover:bg-violet-50 group-hover:text-violet-600">
                                        <ChevronRight
                                            size={18}
                                            strokeWidth={1.8}
                                        />
                                    </div>
                                </button>
                            )
                        )}
                    </div>
                ) : (
                    /* Empty */
                    <div className="flex min-h-[280px] flex-col items-center justify-center px-5 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-500">
                            <Users
                                size={22}
                                strokeWidth={1.6}
                            />
                        </div>

                        <h3 className="mt-4 text-sm font-semibold text-gray-700">
                            Chưa có học sinh
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                            Thêm học sinh vào khóa học để
                            bắt đầu.
                        </p>

                        <button
                            type="button"
                            onClick={handleOpenAddModal}
                            className="mt-4 inline-flex h-8 items-center gap-1.5 rounded-lg bg-violet-600 px-3 text-xs font-medium text-white transition hover:bg-violet-700 active:scale-[0.98]"
                        >
                            <Plus
                                size={15}
                                strokeWidth={2}
                            />

                            <span>
                                Thêm học sinh
                            </span>
                        </button>
                    </div>
                )}
            </section>

            {/* Add Student Modal */}
            {showAddModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-[2px]"
                    onMouseDown={handleCloseAddModal}
                >
                    <div
                        className="w-full max-w-md rounded-2xl bg-white shadow-xl"
                        onMouseDown={(e) =>
                            e.stopPropagation()
                        }
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800">
                                    Thêm học sinh
                                </h3>

                                <p className="mt-1 text-xs text-gray-400">
                                    Nhập mã học sinh để thêm
                                    vào khóa học.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={
                                    handleCloseAddModal
                                }
                                disabled={adding}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label="Đóng"
                            >
                                <X
                                    size={17}
                                    strokeWidth={1.8}
                                />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form
                            onSubmit={handleAddStudent}
                        >
                            <div className="px-5 py-5">
                                <label
                                    htmlFor="studentId"
                                    className="mb-1.5 block text-xs font-medium text-gray-700"
                                >
                                    Mã học sinh
                                </label>

                                <input
                                    id="studentId"
                                    type="text"
                                    value={studentId}
                                    onChange={(e) =>
                                        setStudentId(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Nhập mã học sinh"
                                    autoFocus
                                    disabled={adding}
                                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                                />

                                <p className="mt-2 text-[11px] text-gray-400">
                                    Mã học sinh là ID của tài
                                    khoản có vai trò học sinh.
                                </p>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end gap-2 border-t border-gray-100 px-5 py-4">
                                <button
                                    type="button"
                                    onClick={
                                        handleCloseAddModal
                                    }
                                    disabled={adding}
                                    className="h-9 rounded-lg border border-gray-200 px-4 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Hủy
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        adding ||
                                        !studentId.trim()
                                    }
                                    className="inline-flex h-9 items-center justify-center rounded-lg bg-violet-600 px-4 text-xs font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {adding ? (
                                        <>
                                            <span className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Đang thêm...
                                        </>
                                    ) : (
                                        "Thêm học sinh"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CourseEnrollmentsPage;
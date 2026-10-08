import { useCallback, useEffect, useState } from "react";

import { ArrowRight, Plus, Users } from "lucide-react";

import { useNavigate, useOutletContext } from "react-router-dom";

import appToast from "../../../../../utils/toast";
import formatDate from "../../../../../utils/formatDate";
import enrollmentService from "../../../../../services/enrollmentService";

import AddStudentModal from "./AddStudentModal";


// ==========================================
// Helpers
// ==========================================

const getRemainingDays = (expiresAt) => {
    if (!expiresAt) return null;

    const expiry = new Date(expiresAt);

    if (Number.isNaN(expiry.getTime())) {
        return null;
    }

    const now = new Date();

    // So sánh theo ngày, không phụ thuộc giờ/phút
    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const expiryDate = new Date(
        expiry.getFullYear(),
        expiry.getMonth(),
        expiry.getDate()
    );

    const diffTime = expiryDate.getTime() - today.getTime();

    return Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
    );
};


const getRemainingLabel = (expiresAt) => {
    const remainingDays = getRemainingDays(expiresAt);

    if (remainingDays === null) {
        return "Không giới hạn";
    }

    if (remainingDays < 0) {
        return "Đã hết hạn";
    }

    if (remainingDays === 0) {
        return "Hết hạn hôm nay";
    }

    if (remainingDays === 1) {
        return "Còn 1 ngày";
    }

    return `Còn ${remainingDays} ngày`;
};


const getRemainingClassName = (expiresAt) => {
    const remainingDays = getRemainingDays(expiresAt);

    if (remainingDays === null) {
        return "text-[#52525B]";
    }

    if (remainingDays < 0) {
        return "text-[#DC2626]";
    }

    if (remainingDays <= 7) {
        return "text-[#D97706]";
    }

    return "text-[#16A34A]";
};


// ==========================================
// Component
// ==========================================

export default function CourseEnrollmentsPage() {
    const navigate = useNavigate();

    const { course } = useOutletContext();

    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const courseId = course?.id;


    // ==========================================
    // Fetch enrollments
    // ==========================================

    useEffect(() => {
        if (!courseId) {
            setEnrollments([]);
            setLoading(false);
            return;
        }

        const fetchEnrollments = async () => {
            try {
                setLoading(true);

                const res =
                    await enrollmentService.getByCourse(
                        courseId
                    );

                setEnrollments(res.data || []);
            } catch (error) {
                console.error(error);

                appToast.error(
                    "Không thể tải danh sách học sinh."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, [courseId]);


    // ==========================================
    // Student added
    // ==========================================

    const handleStudentAdded = useCallback(
        (newEnrollment) => {
            if (!newEnrollment) return;

            setEnrollments((prev) => [
                newEnrollment,
                ...prev,
            ]);
        },
        []
    );


    // ==========================================
    // View student detail
    // ==========================================

    const handleViewStudent = useCallback(
        (enrollmentId) => {
            if (!courseId || !enrollmentId) return;

            navigate(
                `/teacher/courses/${courseId}/enrollments/${enrollmentId}`
            );
        },
        [courseId, navigate]
    );


    // ==========================================
    // Render
    // ==========================================

    return (
        <>
            <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">

                {/* ======================================
                    Header
                ======================================= */}

                <div className="flex gap-3 border-b border-[#F0F0F1] px-4 py-4 sm:flex-row sm:items-center justify-between sm:px-5">

                    <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                            <Users size={17} />
                        </div>

                        <div className="min-w-0">
                            <h2 className="truncate text-[14px] font-semibold text-[#18181B]">
                                Học sinh tham gia
                            </h2>

                            <p className="mt-0.5 text-[11px] text-[#71717A]">
                                {enrollments.length} học sinh
                            </p>
                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            setShowAddModal(true)
                        }
                        className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 text-[12px] font-medium text-white transition hover:bg-[#1D4ED8] sm:w-auto"
                    >
                        <Plus size={15} />
                        Thêm
                    </button>

                </div>


                {/* ======================================
                    Loading
                ======================================= */}

                {loading ? (
                    <div className="divide-y divide-[#F0F0F1]">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 px-4 py-4 sm:gap-4 sm:px-5"
                            >

                                {/* Index */}
                                <div className="h-8 w-8 shrink-0 animate-pulse rounded-lg bg-[#F4F4F5]" />

                                {/* Student */}
                                <div className="min-w-0 flex-1">

                                    <div className="h-3.5 w-32 animate-pulse rounded bg-[#F4F4F5]" />

                                    <div className="mt-2 h-3 w-40 animate-pulse rounded bg-[#F4F4F5]" />

                                </div>

                                {/* Expiry */}
                                <div className="hidden w-24 shrink-0 sm:block">

                                    <div className="ml-auto h-3.5 w-16 animate-pulse rounded bg-[#F4F4F5]" />

                                    <div className="mt-2 ml-auto h-3 w-20 animate-pulse rounded bg-[#F4F4F5]" />

                                </div>

                                {/* Action */}
                                <div className="h-8 w-8 shrink-0 animate-pulse rounded-lg bg-[#F4F4F5]" />

                            </div>
                        ))}

                    </div>
                ) : enrollments.length === 0 ? (

                    /* ======================================
                       Empty
                    ======================================= */

                    <div className="px-5 py-14 text-center">

                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F4F5] text-[#71717A]">
                            <Users size={18} />
                        </div>

                        <p className="mt-3 text-[13px] font-medium text-[#52525B]">
                            Chưa có học sinh
                        </p>

                        <p className="mt-1 text-[11px] text-[#A1A1AA]">
                            Thêm học sinh đầu tiên vào khóa học.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                setShowAddModal(true)
                            }
                            className="mx-auto mt-4 flex h-8 items-center gap-1.5 rounded-lg border border-[#E4E4E7] px-3 text-[11px] font-medium text-[#52525B] transition hover:bg-[#FAFAFA]"
                        >
                            <Plus size={14} />
                            Thêm học sinh
                        </button>

                    </div>

                ) : (

                    /* ======================================
                       Enrollment list
                    ======================================= */

                    <div className="divide-y divide-[#F0F0F1]">

                        {enrollments.map(
                            (enrollment, index) => {

                                const studentName =
                                    enrollment.student?.name ||
                                    enrollment.studentName ||
                                    "Chưa có tên";

                                const studentCode =
                                    enrollment.student?.studentCode ||
                                    enrollment.studentCode ||
                                    "—";

                                const expiresAt =
                                    enrollment.expiresAt;

                                const remainingLabel =
                                    getRemainingLabel(
                                        expiresAt
                                    );

                                const remainingClass =
                                    getRemainingClassName(
                                        expiresAt
                                    );

                                return (
                                    <div
                                        key={enrollment.id}
                                        className="flex items-center gap-3 px-4 py-4 transition hover:bg-[#FAFAFA] sm:gap-4 sm:px-5"
                                    >

                                        {/* ==================================
                                            Index
                                        =================================== */}

                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F4F5] text-[11px] font-medium text-[#71717A]">
                                            {index + 1}
                                        </div>


                                        {/* ==================================
                                            Student information
                                        =================================== */}

                                        <div className="min-w-0 flex-1">

                                            <p className="truncate text-[13px] font-medium text-[#18181B]">
                                                {studentName}
                                            </p>

                                            <p className="mt-0.5 truncate text-[11px] text-[#71717A]">
                                                {studentCode}
                                            </p>

                                        </div>


                                        {/* ==================================
                                            Expiration
                                        =================================== */}

                                        <div className="shrink-0 text-right">

                                            <p
                                                className={`text-[12px] font-semibold ${remainingClass}`}
                                            >
                                                {remainingLabel}
                                            </p>

                                            {expiresAt ? (
                                                <p className="mt-0.5 text-[10px] text-[#A1A1AA]">
                                                    Hết hạn{" "}
                                                    {formatDate(
                                                        expiresAt
                                                    )}
                                                </p>
                                            ) : (
                                                <p className="mt-0.5 text-[10px] text-[#A1A1AA]">
                                                    Không giới hạn
                                                </p>
                                            )}

                                        </div>


                                        {/* ==================================
                                            View detail
                                        =================================== */}

                                        <button
                                            type="button"
                                            aria-label={`Xem chi tiết ${studentName}`}
                                            onClick={() =>
                                                handleViewStudent(
                                                    enrollment.id
                                                )
                                            }
                                            className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E4E4E7] text-[#71717A] transition hover:border-[#BFDBFE] hover:bg-[#EFF6FF] hover:text-[#2563EB]"
                                        >
                                            <ArrowRight
                                                size={15}
                                                className="transition group-hover:translate-x-0.5"
                                            />
                                        </button>

                                    </div>
                                );
                            }
                        )}

                    </div>
                )}

            </section>


            {/* ==========================================
                Add Student Modal
            =========================================== */}

            <AddStudentModal
                open={showAddModal}
                courseId={courseId}
                onClose={() =>
                    setShowAddModal(false)
                }
                onAdded={handleStudentAdded}
            />
        </>
    );
}
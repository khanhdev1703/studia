import {
    ArrowLeft,
    Eye,
    EyeOff,
    LockKeyhole,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/userService";
import appToast from "../../../utils/toast";

const ChangePasswordPage = () => {
    const navigate = useNavigate();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (loading) return;

        const currentPassword = form.currentPassword.trim();
        const newPassword = form.newPassword.trim();
        const confirmPassword = form.confirmPassword.trim();

        // Kiểm tra mật khẩu hiện tại
        if (!currentPassword) {
            appToast.error("Vui lòng nhập mật khẩu hiện tại.");
            return;
        }

        // Kiểm tra mật khẩu mới
        if (!newPassword) {
            appToast.error("Vui lòng nhập mật khẩu mới.");
            return;
        }

        // Kiểm tra độ dài
        if (newPassword.length < 8) {
            appToast.error("Mật khẩu mới phải có ít nhất 8 ký tự.");
            return;
        }

        // Không cho dùng lại mật khẩu cũ
        if (currentPassword === newPassword) {
            appToast.error(
                "Mật khẩu mới phải khác mật khẩu hiện tại."
            );
            return;
        }

        // Kiểm tra xác nhận mật khẩu
        if (!confirmPassword) {
            appToast.error("Vui lòng xác nhận mật khẩu mới.");
            return;
        }

        if (newPassword !== confirmPassword) {
            appToast.error("Mật khẩu xác nhận không khớp.");
            return;
        }

        try {
            setLoading(true);

            const response = await userService.changePassword({
                currentPassword,
                newPassword,
                confirmPassword,
            });

            appToast.success(
                response?.message || "Đổi mật khẩu thành công."
            );

            // Xóa dữ liệu sau khi đổi thành công
            setForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);

            // Quay lại trang trước sau một khoảng ngắn
            setTimeout(() => {
                navigate(-1);
            }, 800);
        } catch (error) {
            appToast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Đổi mật khẩu thất bại."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full bg-[#FAFAFA] text-[#18181B]">
            {/* HEADER */}
            <header className="border-b border-[#E4E4E7] bg-white">
                <div className="mx-auto flex h-14 w-full max-w-[720px] items-center gap-2 px-4 sm:px-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-[#52525B] transition hover:bg-[#F4F4F5] hover:text-[#18181B]"
                        aria-label="Quay lại"
                    >
                        <ArrowLeft
                            size={18}
                            strokeWidth={1.8}
                        />
                    </button>

                    <h1 className="text-[17px] font-semibold text-[#18181B]">
                        Đổi mật khẩu
                    </h1>

                    <LockKeyhole
                        size={16}
                        strokeWidth={2}
                        className="text-[#52525B]"
                    />
                </div>
            </header>

            <div className="mx-auto w-full max-w-[720px] px-4 pb-10 pt-5 sm:px-6">
                <form
                    onSubmit={handleSubmit}
                    className="mt-5 overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white"
                >
                    {/* CURRENT PASSWORD */}
                    <div className="border-b border-[#F0F0F1] p-4">
                        <label
                            htmlFor="currentPassword"
                            className="block text-[12px] font-medium text-[#18181B]"
                        >
                            Mật khẩu hiện tại
                        </label>

                        <div className="relative mt-2">
                            <input
                                id="currentPassword"
                                name="currentPassword"
                                type={
                                    showCurrentPassword
                                        ? "text"
                                        : "password"
                                }
                                value={form.currentPassword}
                                onChange={handleChange}
                                placeholder="Nhập mật khẩu hiện tại"
                                disabled={loading}
                                className="h-10 w-full rounded-xl border border-[#E4E4E7] bg-white px-3 pr-10 text-[12px] text-[#18181B] outline-none transition placeholder:text-[#A1A1AA] focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] disabled:bg-[#F4F4F5]"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowCurrentPassword(
                                        (current) => !current
                                    )
                                }
                                disabled={loading}
                                className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-[#A1A1AA] transition hover:text-[#52525B] disabled:cursor-not-allowed"
                                aria-label={
                                    showCurrentPassword
                                        ? "Ẩn mật khẩu"
                                        : "Hiện mật khẩu"
                                }
                            >
                                {showCurrentPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* NEW PASSWORD */}
                    <div className="border-b border-[#F0F0F1] p-4">
                        <label
                            htmlFor="newPassword"
                            className="block text-[12px] font-medium text-[#18181B]"
                        >
                            Mật khẩu mới
                        </label>

                        <div className="relative mt-2">
                            <input
                                id="newPassword"
                                name="newPassword"
                                type={
                                    showNewPassword
                                        ? "text"
                                        : "password"
                                }
                                value={form.newPassword}
                                onChange={handleChange}
                                placeholder="Nhập mật khẩu mới"
                                disabled={loading}
                                className="h-10 w-full rounded-xl border border-[#E4E4E7] bg-white px-3 pr-10 text-[12px] text-[#18181B] outline-none transition placeholder:text-[#A1A1AA] focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] disabled:bg-[#F4F4F5]"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowNewPassword(
                                        (current) => !current
                                    )
                                }
                                disabled={loading}
                                className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-[#A1A1AA] transition hover:text-[#52525B] disabled:cursor-not-allowed"
                                aria-label={
                                    showNewPassword
                                        ? "Ẩn mật khẩu"
                                        : "Hiện mật khẩu"
                                }
                            >
                                {showNewPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>

                        <p className="mt-2 text-[10px] leading-4 text-[#A1A1AA]">
                            Nên sử dụng ít nhất 8 ký tự, bao gồm chữ và số.
                        </p>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="p-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-[12px] font-medium text-[#18181B]"
                        >
                            Xác nhận mật khẩu mới
                        </label>

                        <div className="relative mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Nhập lại mật khẩu mới"
                                disabled={loading}
                                className="h-10 w-full rounded-xl border border-[#E4E4E7] bg-white px-3 pr-10 text-[12px] text-[#18181B] outline-none transition placeholder:text-[#A1A1AA] focus:border-[#93C5FD] focus:ring-2 focus:ring-[#DBEAFE] disabled:bg-[#F4F4F5]"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (current) => !current
                                    )
                                }
                                disabled={loading}
                                className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-[#A1A1AA] transition hover:text-[#52525B] disabled:cursor-not-allowed"
                                aria-label={
                                    showConfirmPassword
                                        ? "Ẩn mật khẩu"
                                        : "Hiện mật khẩu"
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={16} />
                                ) : (
                                    <Eye size={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ACTION */}
                    <div className="border-t border-[#F0F0F1] bg-[#FAFAFA] px-4 py-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="h-10 w-full rounded-xl bg-[#2563EB] text-[12px] font-medium text-white transition hover:bg-[#1D4ED8] active:bg-[#1E40AF] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Đang cập nhật..."
                                : "Cập nhật mật khẩu"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
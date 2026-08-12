import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import authService from '../../services/authService';

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi khi người dùng bắt đầu sửa form
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    // Validate password
    if (form.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    // Validate confirm password
    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      setLoading(true);

      await authService.register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      // Đăng ký thành công → chuyển sang Login
      navigate('/login');
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Đăng ký thất bại. Vui lòng thử lại.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF9FF] px-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="mb-6 flex flex-col items-center">
          <Link
            to="/"
            aria-label="Về trang chủ"
            className="block"
          >
            <Logo className="h-20 w-20" showText={false} />
          </Link>
          <h1 className="mt-3 text-xl font-semibold text-[#252238]">
            Tạo tài khoản
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-[#E7E3F5] bg-white p-5"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-[#252238]"
            >
              Họ và tên
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              autoComplete="name"
              required
              disabled={loading}
              className="h-11 w-full rounded-xl border border-[#DDD9E9] px-3 text-sm text-[#252238] outline-none placeholder:text-[#A5A1AD] focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/10 disabled:bg-[#F7F6FA]"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-[#252238]"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
              disabled={loading}
              className="h-11 w-full rounded-xl border border-[#DDD9E9] px-3 text-sm text-[#252238] outline-none placeholder:text-[#A5A1AD] focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/10 disabled:bg-[#F7F6FA]"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-[#252238]"
            >
              Mật khẩu
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Ít nhất 6 ký tự"
              autoComplete="new-password"
              required
              disabled={loading}
              className="h-11 w-full rounded-xl border border-[#DDD9E9] px-3 text-sm text-[#252238] outline-none placeholder:text-[#A5A1AD] focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/10 disabled:bg-[#F7F6FA]"
            />
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium text-[#252238]"
            >
              Xác nhận mật khẩu
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              autoComplete="new-password"
              required
              disabled={loading}
              className="h-11 w-full rounded-xl border border-[#DDD9E9] px-3 text-sm text-[#252238] outline-none placeholder:text-[#A5A1AD] focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/10 disabled:bg-[#F7F6FA]"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-full bg-[#6C5CE7] text-sm font-medium text-white transition hover:bg-[#6252D9] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        {/* Login */}
        <p className="mt-5 text-center text-sm text-[#858585]">
          Đã có tài khoản?{' '}

          <Link
            to="/login"
            className="font-medium text-[#6C5CE7] hover:underline"
          >
            Đăng nhập
          </Link>
        </p>

      </div>
    </main>
  );
}

export default RegisterPage;
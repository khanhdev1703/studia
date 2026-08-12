import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import authService from '../../services/authService';
import Logo from '../../components/common/Logo';

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      setLoading(true);

      const response = await authService.login({
        email: form.email.trim(),
        password: form.password,
      });

      console.log('Login success:', response);

      // TODO:
      // Lưu access token sau khi BE hoàn thiện
      //
      // localStorage.setItem(
      //   'accessToken',
      //   response.accessToken
      // );

      navigate('/student');
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Email hoặc mật khẩu không chính xác.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF9FF] px-4">
      <div className="w-full max-w-sm">

        {/* Logo + Header */}
        <div className="mb-6 flex flex-col items-center">
          <Link
            to="/"
            aria-label="Về trang chủ"
            className="block"
          >
            <Logo className="h-20 w-20" showText={false} size='lg' />
          </Link>

          <h1 className="mt-3 text-2xl font-semibold text-[#252238]">
            Đăng nhập
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-[#E7E3F5] bg-white p-5"
        >
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
              className="h-11 w-full rounded-xl border border-[#DDD9E9] px-3 text-sm outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/10 disabled:bg-[#F7F6FA]"
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
              placeholder="Nhập mật khẩu"
              autoComplete="current-password"
              required
              disabled={loading}
              className="h-11 w-full rounded-xl border border-[#DDD9E9] px-3 text-sm outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/10 disabled:bg-[#F7F6FA]"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-full bg-[#6C5CE7] text-sm font-medium text-white transition hover:bg-[#6252D9] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        {/* Register */}
        <p className="mt-5 text-center text-sm text-[#858585]">
          Chưa có tài khoản?{' '}

          <Link
            to="/register"
            className="font-medium text-[#6C5CE7] hover:underline"
          >
            Đăng ký
          </Link>
        </p>

      </div>
    </main>
  );
}

export default LoginPage;
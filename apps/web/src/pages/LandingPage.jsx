import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";

import Logo from "../components/common/Logo";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#F7F7FF]">
            {/* Header */}
            <header className="px-5 py-5 sm:px-8">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <Logo />

                    <Link
                        to="/login"
                        className="rounded-lg border border-[#6C5CE7] px-4 py-2 text-sm font-semibold text-[#6C5CE7] transition hover:bg-[#6C5CE7] hover:text-white"
                    >
                        Đăng nhập
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <main>
                <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
                    {/* Decorative circles */}
                    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#6C5CE7]/10" />
                    <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#6C5CE7]/5" />

                    <div className="relative mx-auto max-w-4xl text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#6C5CE7]/10">
                            <GraduationCap
                                size={32}
                                className="text-[#6C5CE7]"
                            />
                        </div>

                        <h1 className="text-4xl font-bold leading-tight text-[#252238] sm:text-5xl md:text-6xl">
                            Học tập hôm nay,
                            <span className="block text-[#6C5CE7]">
                                tốt hơn ngày mai.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                            Stady giúp bạn học tập theo cách đơn giản,
                            tập trung và hiệu quả hơn. Khám phá những
                            khóa học phù hợp và từng bước xây dựng kiến
                            thức của riêng mình.
                        </p>

                        {/* CTA */}
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                to="/login"
                                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#6C5CE7] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6C5CE7]/20 transition hover:bg-[#5b4bd6] sm:w-auto"
                            >
                                Bắt đầu học

                                <ArrowRight
                                    size={18}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </Link>

                            <Link
                                to="/register"
                                className="w-full rounded-lg border border-gray-200 bg-white px-6 py-3.5 text-center text-sm font-semibold text-gray-700 transition hover:border-[#6C5CE7] hover:text-[#6C5CE7] sm:w-auto"
                            >
                                Tạo tài khoản
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Quotes */}
                <section className="px-5 pb-20 sm:px-8 sm:pb-28">
                    <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
                        <QuoteCard
                            icon={<BookOpen size={22} />}
                            quote="Mỗi ngày học một điều mới, mỗi ngày tiến thêm một bước."
                        />

                        <QuoteCard
                            icon={<GraduationCap size={22} />}
                            quote="Kiến thức không chỉ để biết, mà để tạo nên những thay đổi."
                        />

                        <QuoteCard
                            icon={<ArrowRight size={22} />}
                            quote="Đừng chờ đến khi hoàn hảo. Hãy bắt đầu từ hôm nay."
                        />
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="px-5 pb-16 sm:px-8">
                    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#6C5CE7] px-6 py-12 text-center sm:px-12">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">
                            Sẵn sàng bắt đầu hành trình học tập?
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/80">
                            Bắt đầu với Stady và biến mỗi giờ học thành
                            một bước tiến mới.
                        </p>

                        <Link
                            to="/login"
                            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#6C5CE7] transition hover:bg-gray-50"
                        >
                            Tham gia ngay
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100 px-5 py-6 sm:px-8">
                <div className="mx-auto max-w-6xl text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Stady. Học tập mỗi ngày.
                </div>
            </footer>
        </div>
    );
};

const QuoteCard = ({ icon, quote }) => {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#6C5CE7]/10 text-[#6C5CE7]">
                {icon}
            </div>

            <p className="text-sm font-medium leading-6 text-gray-600">
                “{quote}”
            </p>
        </div>
    );
};

export default LandingPage;
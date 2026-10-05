import {
    ChevronDown,
    ChevronLeft,
    CircleHelp,
    Mail,
    MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HelpPage = () => {
    const navigate = useNavigate();

    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "Làm thế nào để tham gia một khóa học?",
            answer:
                "Bạn vào mục Khám phá, chọn khóa học muốn học và xem thông tin chi tiết. Sau đó thực hiện đăng ký khóa học theo hướng dẫn.",
        },
        {
            question: "Làm thế nào để xem bài học?",
            answer:
                "Sau khi tham gia khóa học, bạn có thể vào khóa học từ danh sách khóa học của mình để xem các bài học và nội dung được mở.",
        },
        {
            question: "Tôi có thể xem trước bài học không?",
            answer:
                "Một số bài học được giảng viên cho phép xem trước miễn phí. Những bài học này sẽ có nhãn Miễn phí và bạn có thể mở để xem ngay.",
        },
        {
            question: "Tôi quên mật khẩu thì phải làm gì?",
            answer:
                "Tại màn hình đăng nhập, chọn Quên mật khẩu và thực hiện các bước xác minh để đặt lại mật khẩu.",
        },
        {
            question: "Làm thế nào để thay đổi thông tin cá nhân?",
            answer:
                "Vào Hồ sơ → Thông tin cá nhân để cập nhật tên, ảnh đại diện và các thông tin tài khoản được phép thay đổi.",
        },
        {
            question: "Tôi cần hỗ trợ thêm thì liên hệ ở đâu?",
            answer:
                "Bạn có thể liên hệ với đội ngũ hỗ trợ thông qua email hỗ trợ được cung cấp bên dưới.",
        },
    ];

    const toggleFaq = (index) => {
        setOpenIndex((currentIndex) =>
            currentIndex === index ? null : index
        );
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
                        <ChevronLeft
                            size={19}
                            strokeWidth={1.8}
                        />
                    </button>

                    <h1 className="text-[17px] font-semibold text-[#18181B]">
                        Trợ giúp
                    </h1>
                    <CircleHelp
                        size={22}
                        strokeWidth={1.7}
                    />
                </div>
            </header>

            <div className="mx-auto w-full max-w-[720px] px-4 pb-10 pt-5 sm:px-6">
                {/* FAQ */}
                <section className="">
                    <div className="mb-2.5 flex items-center justify-between">
                        <h3 className="text-[13px] font-semibold text-[#18181B]">
                            Câu hỏi thường gặp
                        </h3>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white">
                        {faqs.map((item, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={item.question}
                                    className={
                                        index !== faqs.length - 1
                                            ? "border-b border-[#F0F0F1]"
                                            : ""
                                    }
                                >
                                    {/* QUESTION */}
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(index)}
                                        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-[#FAFAFA]"
                                    >
                                        <span className="min-w-0 flex-1 text-[12px] font-medium leading-5 text-[#18181B]">
                                            {item.question}
                                        </span>

                                        <ChevronDown
                                            size={16}
                                            strokeWidth={1.8}
                                            className={`shrink-0 text-[#A1A1AA] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* ANSWER - SLIDE */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-4 pb-4 pr-10">
                                                <p className="text-[11px] leading-5 text-[#71717A]">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* CONTACT */}
                <section className="mt-5">
                    <h3 className="mb-2.5 text-[13px] font-semibold text-[#18181B]">
                        Cần hỗ trợ thêm?
                    </h3>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <a
                            href="mailto:support@example.com"
                            className="flex items-center gap-3 rounded-2xl border border-[#E4E4E7] bg-white p-4 transition hover:border-[#BFDBFE] hover:bg-[#F8FBFF]"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                                <Mail
                                    size={17}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[12px] font-medium text-[#18181B]">
                                    Email hỗ trợ
                                </p>

                                <p className="mt-0.5 truncate text-[10px] text-[#71717A]">
                                    support@example.com
                                </p>
                            </div>
                        </a>

                        <button
                            type="button"
                            className="flex items-center gap-3 rounded-2xl border border-[#E4E4E7] bg-white p-4 text-left transition hover:border-[#BFDBFE] hover:bg-[#F8FBFF]"
                        >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F4F5] text-[#52525B]">
                                <MessageCircle
                                    size={17}
                                    strokeWidth={1.8}
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[12px] font-medium text-[#18181B]">
                                    Liên hệ hỗ trợ
                                </p>

                                <p className="mt-0.5 text-[10px] text-[#71717A]">
                                    Gửi yêu cầu hỗ trợ
                                </p>
                            </div>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HelpPage;
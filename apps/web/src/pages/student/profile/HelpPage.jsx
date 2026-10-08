import {
    ArrowUpRight,
    ChevronDown,
    ChevronLeft,
    CircleHelp,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "/logo.png";
import { faqs } from "../../../constants/faqs";

const FB_URL = "https://www.facebook.com/achan.phuong";

const HelpPage = () => {
    const navigate = useNavigate();

    const [openIndex, setOpenIndex] = useState(null);

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

                <section className="mt-6">
                    <div className="mb-2.5">
                        <h3 className="text-[13px] font-semibold text-[#18181B]">
                            Cần hỗ trợ thêm?
                        </h3>
                        <p className="mt-0.5 text-[11px] text-[#71717A]">
                            Liên hệ trực tiếp với người phụ trách.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#E4E4E7] bg-white p-4">
                        <div className="flex items-center gap-3">
                            {/* Avatar */}
                            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#EFF6FF]">
                                <img
                                    src={Logo}
                                    alt="Achan Phương"
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="truncate text-[13px] font-semibold text-[#18181B]">
                                        Achan Phương
                                    </p>

                                    <span className="shrink-0 rounded-full bg-[#F0FDF4] px-1.5 py-0.5 text-[9px] font-medium text-[#16A34A]">
                                        Giáo viên
                                    </span>
                                </div>

                                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-[#94A3B8]">
                                    {/* <Facebook size={12} /> */}
                                    <span className="truncate">
                                        {FB_URL.replace("https://www.", "")}
                                    </span>
                                </div>
                            </div>

                            {/* Facebook button */}
                            <a
                                href={FB_URL}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Liên hệ Facebook"
                                className={[
                                    "flex h-9 w-9 shrink-0 items-center justify-center",
                                    "rounded-xl",
                                    "bg-[#EFF6FF]",
                                    "text-[#2563EB]",
                                    "transition-all duration-200",
                                    "hover:bg-[#DBEAFE]",
                                    "hover:text-[#1D4ED8]",
                                ].join(" ")}
                            >
                                <ArrowUpRight size={16} strokeWidth={2} />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HelpPage;
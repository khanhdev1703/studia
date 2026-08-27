import { BookOpen } from "lucide-react";

const Loading = ({
    text = "Đang tải...",
    fullScreen = false,
}) => {
    return (
        <div
            className={`
                relative
                flex
                items-center
                justify-center
                overflow-hidden
                ${fullScreen ? "min-h-screen" : "min-h-full"}
            `}
        >
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Small dots */}
                <span className="absolute left-[20%] top-[25%] h-2 w-2 rounded-full bg-[#A89DF2]/50" />

                <span className="absolute right-[22%] top-[32%] h-2.5 w-2.5 rounded-full bg-[#FFB5D0]/60" />

                <span className="absolute bottom-[25%] left-[25%] h-2.5 w-2.5 rounded-full bg-[#9FE3CF]/60" />

                {/* Decorative flower */}
                <div className="absolute right-[15%] bottom-[27%] rotate-12 text-[#B9AEFF]/30">
                    <div className="relative h-12 w-12">
                        <span className="absolute left-4 top-0 h-6 w-6 rounded-full bg-current" />
                        <span className="absolute bottom-0 left-4 h-6 w-6 rounded-full bg-current" />
                        <span className="absolute left-0 top-4 h-6 w-6 rounded-full bg-current" />
                        <span className="absolute right-0 top-4 h-6 w-6 rounded-full bg-current" />

                        <span className="absolute left-4 top-4 h-4 w-4 rounded-full bg-[#FFE7A8]" />
                    </div>
                </div>
            </div>

            {/* Loading content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Icon */}
                <div className="relative flex h-20 w-20 items-center justify-center">
                    {/* Outer ring */}
                    <div
                        className="
                            absolute
                            inset-0
                            rounded-full
                            border-[3px]
                            border-[#E5E1FF]
                        "
                    />

                    {/* Spinning ring */}
                    <div
                        className="
                            absolute
                            inset-0
                            animate-spin
                            rounded-full
                            border-[3px]
                            border-transparent
                            border-t-[#6C5CE7]
                        "
                    />

                    {/* Icon background */}
                    <div
                        className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            from-[#6C5CE7]
                            to-[#8D80F0]
                            text-white
                            shadow-[0_8px_25px_rgba(108,92,231,0.25)]
                        "
                    >
                        <BookOpen
                            size={23}
                            strokeWidth={1.8}
                        />
                    </div>
                </div>

                {/* Brand */}
                <div className="mt-5 text-center">
                    <h2 className="text-[17px] font-bold tracking-tight text-[#24234D]">
                        Stady
                    </h2>

                    <p className="mt-1 text-[12px] text-[#9997AC]">
                        {text}
                    </p>
                </div>

                {/* Loading dots */}
                <div className="mt-4 flex items-center gap-1.5">
                    <span
                        className="
                            h-1.5
                            w-1.5
                            animate-bounce
                            rounded-full
                            bg-[#6C5CE7]
                        "
                    />

                    <span
                        className="
                            h-1.5
                            w-1.5
                            animate-bounce
                            rounded-full
                            bg-[#8174EA]
                            [animation-delay:150ms]
                        "
                    />

                    <span
                        className="
                            h-1.5
                            w-1.5
                            animate-bounce
                            rounded-full
                            bg-[#9A8EF5]
                            [animation-delay:300ms]
                        "
                    />
                </div>
            </div>
        </div>
    );
};

export default Loading;
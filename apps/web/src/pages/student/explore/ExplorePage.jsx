import { Outlet } from "react-router-dom";

const ExplorePage = () => {
    return (
        <div className="relative min-h-full overflow-hidden">
            {/* Background Decorations */}

            {/* Large purple glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    -left-24
                    -top-24
                    h-72
                    w-72
                    rounded-full
                    bg-[#8B7CF6]/20
                    blur-3xl
                "
            />

            {/* Blue glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    right-[-100px]
                    top-24
                    h-80
                    w-80
                    rounded-full
                    bg-[#72C7FF]/15
                    blur-3xl
                "
            />

            {/* Bottom pink glow */}
            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-[-120px]
                    left-1/3
                    h-72
                    w-72
                    rounded-full
                    bg-[#D9A7FF]/15
                    blur-3xl
                "
            />

            {/* Decorative circle */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-[8%]
                    top-[180px]
                    h-3
                    w-3
                    rounded-full
                    bg-[#6C5CE7]/30
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    right-[12%]
                    top-[330px]
                    h-4
                    w-4
                    rounded-full
                    bg-[#72C7FF]/30
                "
            />

            {/* Decorative ring */}
            <div
                className="
                    pointer-events-none
                    absolute
                    right-[-45px]
                    top-[470px]
                    h-32
                    w-32
                    rounded-full
                    border-[18px]
                    border-[#6C5CE7]/5
                "
            />

            {/* Decorative small ring */}
            <div
                className="
                    pointer-events-none
                    absolute
                    left-[-30px]
                    top-[620px]
                    h-20
                    w-20
                    rounded-full
                    border-[10px]
                    border-[#72C7FF]/5
                "
            />

            {/* Content */}
            <div
                className="
                    relative
                    z-10
                    mx-auto
                    w-full
                    max-w-5xl
                    p-3
                    sm:px-6
                    lg:px-8
                "
            >
                {/* Header */}
                <header>
                    <h1
                        className="
                            text-[24px]
                            font-bold
                            tracking-tight
                            text-[#24234D]
                        "
                    >
                        Khám phá
                    </h1>
                </header>
                {/* Tab Content */}
                <Outlet />
            </div>
        </div>
    );
};

export default ExplorePage;
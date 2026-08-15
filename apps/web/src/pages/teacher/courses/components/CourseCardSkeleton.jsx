const CourseCardSkeleton = () => {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* Image */}
            <div className="aspect-video animate-pulse bg-gray-200" />

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

                {/* Description */}
                <div className="mt-2 space-y-2">
                    <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
                </div>

                {/* Stats */}
                <div className="mt-4 flex gap-4">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />

                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                </div>

                {/* Button */}
                <div className="mt-4 h-10 w-full animate-pulse rounded-xl bg-gray-200" />
            </div>
        </div>
    );
};

export default CourseCardSkeleton;
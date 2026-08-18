import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Breadcrumb = ({
    items = [],
    className = "",
}) => {
    return (
        <nav
            aria-label="Breadcrumb"
            className={`
                flex
                min-w-0
                items-center
                gap-1.5
                text-sm
                ${className}
            `}
        >
            {items.map((item, index) => {
                const isLast =
                    index === items.length - 1;

                return (
                    <div
                        key={`${item.label}-${index}`}
                        className="
                            flex
                            min-w-0
                            items-center
                            gap-1.5
                        "
                    >
                        {index > 0 && (
                            <ChevronRight
                                size={15}
                                className="
                                    shrink-0
                                    text-gray-300
                                "
                            />
                        )}

                        {isLast || !item.to ? (
                            <span
                                className={`
                                    min-w-0
                                    truncate
                                    ${isLast
                                        ? "font-medium text-[#252238]"
                                        : "text-gray-500"
                                    }
                                `}
                                title={item.label}
                            >
                                {item.icon && (
                                    <item.icon
                                        size={16}
                                        className="
                                            mr-1.5
                                            inline-block
                                            align-[-3px]
                                        "
                                    />
                                )}

                                {item.label}
                            </span>
                        ) : (
                            <Link
                                to={item.to}
                                className="
                                    inline-flex
                                    min-w-0
                                    shrink-0
                                    items-center
                                    text-gray-500
                                    transition
                                    hover:text-[#6C5CE7]
                                "
                                title={item.label}
                            >
                                {item.icon && (
                                    <item.icon
                                        size={16}
                                        className="
                                            mr-1.5
                                            shrink-0
                                        "
                                    />
                                )}

                                <span className="truncate">
                                    {item.label}
                                </span>
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
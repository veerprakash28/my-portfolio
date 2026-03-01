import React from "react";

interface BrowserTabProps {
    label: string;
    icon: string;
    isActive: boolean;
    onClick: () => void;
}

const BrowserTab: React.FC<BrowserTabProps> = ({
    label,
    icon,
    isActive,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={`browser-tab group relative flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-t-lg transition-all duration-200 min-w-[120px] max-w-[180px] ${isActive
                    ? "browser-tab-active bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white shadow-sm z-10"
                    : "bg-gray-200/60 dark:bg-gray-700/40 text-gray-500 dark:text-gray-400 hover:bg-gray-200/90 dark:hover:bg-gray-700/70 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
        >
            <span className="text-sm flex-shrink-0">{icon}</span>
            <span className="truncate">{label}</span>
            {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 dark:bg-blue-400 rounded-t-full" />
            )}
        </button>
    );
};

export default BrowserTab;

import {
    ArrowLeft,
    ArrowRight,
    Download,
    Github,
    Instagram,
    Linkedin,
    Lock,
    Maximize2,
    Menu,
    Minimize2,
    Moon,
    Plus,
    RotateCw,
    Star,
    Sun,
    X,
    Youtube,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { portfolioData } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";
import BrowserTab from "./BrowserTab";

interface BrowserChromeProps {
    children: React.ReactNode;
}

const TABS = [
    { id: "hero", label: "Home", icon: "🏠", href: "#hero" },
    { id: "about", label: "About", icon: "👤", href: "#about" },
    { id: "experience", label: "Experience", icon: "💼", href: "#experience" },
    { id: "work", label: "Projects", icon: "🚀", href: "#work" },
    { id: "tech", label: "Tech Stack", icon: "⚡", href: "#tech" },
    { id: "contact", label: "Contact", icon: "📬", href: "#contact" },
];

const SECTION_PATHS: Record<string, string> = {
    hero: "",
    about: "about",
    experience: "experience",
    work: "projects",
    tech: "tech-stack",
    contact: "contact",
};

const socialLinks = [
    {
        name: "GitHub",
        icon: Github,
        url: portfolioData.social.github,
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        url: portfolioData.social.linkedin,
    },
    {
        name: "YouTube",
        icon: Youtube,
        url: portfolioData.social.youtube,
    },
    {
        name: "Instagram",
        icon: Instagram,
        url: portfolioData.social.instagram,
    },
];

const BrowserChrome: React.FC<BrowserChromeProps> = ({ children }) => {
    const activeSection = useActiveSection();
    const { isDark, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Trigger loading bar on section change
    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [activeSection]);

    const scrollToSection = (href: string) => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    const handleRefresh = () => {
        scrollToSection("#hero");
    };

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleResumeDownload = () => {
        window.open("/Resume.pdf", "_blank");
    };

    // Add keyboard shortcut for fullscreen
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                // Check if we are not in an input/textarea
                const target = e.target as HTMLElement;
                if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                    handleFullscreen();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const currentPath = SECTION_PATHS[activeSection] || "";
    const hostname = typeof window !== 'undefined' ? window.location.hostname : 'veerprakash.netlify.app';
    const displayHostname = hostname === 'localhost' ? 'localhost:5173' : hostname; // Handle local dev more naturally
    const fullUrl = `${displayHostname}${currentPath ? "/" + currentPath : ""}`;

    return (
        <div className="browser-desktop min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6">
            {/* Browser Window */}
            <div
                className={`browser-window w-full max-w-[1800px] h-[calc(100vh-16px)] sm:h-[calc(100vh-32px)] md:h-[calc(100vh-48px)] flex flex-col rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50`}
            >
                {/* ===== TITLE BAR ===== */}
                <div className="browser-titlebar flex items-center justify-between px-3 sm:px-4 py-2 bg-gray-100/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
                    {/* macOS Window Controls */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <button
                                className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors group relative"
                                title="Close"
                            >
                                <X
                                    size={8}
                                    className="absolute inset-0 m-auto text-[#FF5F57]/0 group-hover:text-red-900/70 transition-colors"
                                />
                            </button>
                            <button
                                className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:bg-[#FEBC2E]/80 transition-colors group relative"
                                title="Minimize"
                            >
                                <Minimize2
                                    size={7}
                                    className="absolute inset-0 m-auto text-[#FEBC2E]/0 group-hover:text-yellow-900/70 transition-colors"
                                />
                            </button>
                            <button
                                onClick={handleFullscreen}
                                className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/80 transition-colors group relative"
                                title="Fullscreen"
                            >
                                <Maximize2
                                    size={7}
                                    className="absolute inset-0 m-auto text-[#28C840]/0 group-hover:text-green-900/70 transition-colors"
                                />
                            </button>
                        </div>
                    </div>

                    {/* Center Title */}
                    <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-medium">
                            {portfolioData.personal.name}
                        </span>
                    </div>

                    {/* Right Side Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleResumeDownload}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-500/20 dark:hover:bg-blue-400/20 transition-colors"
                        >
                            <Download size={12} />
                            <span>Resume</span>
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
                            title={isDark ? "Light mode" : "Dark mode"}
                        >
                            {isDark ? <Sun size={14} /> : <Moon size={14} />}
                        </button>
                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="sm:hidden p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                        </button>
                    </div>
                </div>

                {/* ===== TAB BAR ===== */}
                <div className="browser-tabbar hidden sm:flex items-end gap-0.5 px-2 pt-1 bg-gray-100/90 dark:bg-gray-900/90 backdrop-blur-xl flex-shrink-0 overflow-x-auto scrollbar-hide">
                    {TABS.map((tab) => (
                        <BrowserTab
                            key={tab.id}
                            label={tab.label}
                            icon={tab.icon}
                            isActive={activeSection === tab.id}
                            onClick={() => scrollToSection(tab.href)}
                        />
                    ))}
                    {/* + New Tab (Design / Pinterest) */}
                    <button
                        onClick={() =>
                            window.open(
                                "https://in.pinterest.com/prakash_veer28/",
                                "_blank"
                            )
                        }
                        className="flex items-center justify-center w-7 h-7 mb-0.5 ml-1 rounded-md text-gray-400 dark:text-gray-500 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
                        title="Design Portfolio"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                {/* ===== ADDRESS BAR ===== */}
                <div className="browser-addressbar flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
                    {/* Navigation buttons */}
                    <div className="hidden sm:flex items-center gap-0.5">
                        <button className="p-1 rounded text-gray-400 dark:text-gray-500 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors">
                            <ArrowLeft size={14} />
                        </button>
                        <button className="p-1 rounded text-gray-400 dark:text-gray-500 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors">
                            <ArrowRight size={14} />
                        </button>
                        <button
                            onClick={handleRefresh}
                            className="p-1 rounded text-gray-400 dark:text-gray-500 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
                        >
                            <RotateCw size={14} />
                        </button>
                    </div>

                    {/* URL Bar */}
                    <div className="flex-1 flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-lg px-3 py-1.5 border border-gray-200/60 dark:border-gray-600/40 transition-all hover:border-blue-300/60 dark:hover:border-blue-500/40 focus-within:border-blue-400 dark:focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-400/30">
                        <Lock
                            size={12}
                            className="text-green-600 dark:text-green-400 flex-shrink-0"
                        />
                        <div className="flex-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-mono truncate">
                            <span className="text-gray-400 dark:text-gray-500">
                                https://
                            </span>
                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                                {fullUrl}
                            </span>
                        </div>
                        <Star
                            size={14}
                            className="text-gray-300 dark:text-gray-600 hover:text-yellow-400 dark:hover:text-yellow-400 transition-colors flex-shrink-0 cursor-pointer"
                        />
                    </div>

                    {/* Download on mobile */}
                    <button
                        onClick={handleResumeDownload}
                        className="sm:hidden p-1.5 rounded text-gray-400 dark:text-gray-500 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-colors"
                    >
                        <Download size={14} />
                    </button>
                </div>

                {/* ===== MOBILE MENU DROPDOWN ===== */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0 animate-slide-down">
                        <div className="px-3 py-2 space-y-1">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => scrollToSection(tab.href)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeSection === tab.id
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                        }`}
                                >
                                    <span className="text-base">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                                <button
                                    onClick={() => {
                                        window.open(
                                            "https://in.pinterest.com/prakash_veer28/",
                                            "_blank"
                                        );
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    <span className="text-base">🎨</span>
                                    <span>Design Portfolio</span>
                                </button>
                                <button
                                    onClick={() => {
                                        handleResumeDownload();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                >
                                    <Download size={16} />
                                    <span>Download Resume</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== LOADING BAR ===== */}
                <div className="browser-loading-bar h-[2px] bg-gray-100 dark:bg-gray-800 flex-shrink-0 relative overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 loading-shimmer" />
                    )}
                </div>

                {/* ===== CONTENT VIEWPORT ===== */}
                <div
                    ref={contentRef}
                    className="browser-content flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900 scroll-smooth"
                >
                    {children}
                </div>

                {/* ===== STATUS BAR ===== */}
                <div className="browser-statusbar grid grid-cols-2 sm:grid-cols-3 items-center px-3 sm:px-4 py-1.5 bg-gray-100/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 flex-shrink-0 text-[10px] sm:text-xs text-gray-500 dark:text-gray-500">
                    {/* Left — connection status */}
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="hidden sm:inline">Connected</span>
                        </span>
                        <span className="hidden md:inline text-gray-400 dark:text-gray-600">
                            •
                        </span>
                        <span className="hidden md:inline">
                            © {new Date().getFullYear()} {portfolioData.personal.name}
                        </span>
                    </div>

                    {/* Center — active page (Perfectly centered now) */}
                    <div className="hidden sm:flex justify-center text-gray-400 dark:text-gray-600 font-medium">
                        {activeSection === "hero"
                            ? "Home"
                            : activeSection.charAt(0).toUpperCase() +
                            activeSection.slice(1)}{" "}
                        — Ready
                    </div>

                    {/* Right — social links & Fullscreen */}
                    <div className="flex items-center justify-end gap-3">
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 rounded hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    title={social.name}
                                >
                                    <social.icon size={12} />
                                </a>
                            ))}
                        </div>
                        <div className="h-3 w-[1px] bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
                        <button
                            onClick={handleFullscreen}
                            className="hidden sm:flex items-center gap-1 p-1 rounded hover:bg-gray-200/80 dark:hover:bg-gray-700/80 text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors"
                            title="Toggle Fullscreen (F)"
                        >
                            <Maximize2 size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowserChrome;

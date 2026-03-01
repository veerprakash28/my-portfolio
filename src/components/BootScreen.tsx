import React, { useState, useEffect } from 'react';

interface BootScreenProps {
    onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
    const [logs, setLogs] = useState<{ text: string, time: string }[]>([]);
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const currentYear = new Date().getFullYear();

    const bootLogs = [
        "VERIFYING SYSTEM INTEGRITY...",
        "CHECKING MEMORY: 64.0GB OK",
        "LOADING VEER-OS KERNEL V2.4.0...",
        "INITIALIZING GPUS: NVIDIA RTX-DESIGN-PRO OK",
        "MOUNTING FILE SYSTEM: /Users/veerp/portfolio OK",
        "STARTING NETWORK SERVICES... OK",
        "CONNECTING TO CLOUD INFRASTRUCTURE... OK",
        "SYSTEM SCAN COMPLETE: 0 ERRORS",
        "WARMING UP LLM ASSISTANTS... OK",
        "LAUNCHING PORTFOLIO ENVIRONMENT...",
        "READY."
    ];

    useEffect(() => {
        let currentLogIndex = 0;

        const handleArchitectureTrigger = (e: KeyboardEvent) => {
            const isF12 = e.key === 'F12';
            const isInspectMac = (e.metaKey && e.altKey && e.key.toLowerCase() === 'i');
            const isAKey = e.key.toLowerCase() === 'a'; // Simple fallback key for reliability

            if (isF12 || isInspectMac || isAKey) {
                // If it's a browser shortcut, we don't preventDefault so the console actually opens
                // but we stop propagation to ensure our listener catches it cleanly
                e.stopPropagation();

                console.log(
                    "%c 🛠️ ARCHITECTURE INSIGHT %c\n\n" +
                    "Stack: React 18 + Vite + Tailwind CSS\n" +
                    "Patterns: Atomic Components, Custom Hooks for State, Intersection Observer for Navigation.\n" +
                    "Performance: 100/100 Lighthouse target, Hardware Accelerated Animations.\n" +
                    "Kernel: Veer-OS v4.2.0 (Custom Boot Logic)\n",
                    "background: #3b82f6; color: #fff; padding: 5px 10px; border-radius: 4px; font-weight: bold;",
                    "color: #3b82f6; font-family: monospace;"
                );

                const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
                setLogs(prev => {
                    if (prev.some(l => l.text.includes("ARCHITECTURE DATA"))) return prev;
                    return [...prev.slice(-7), { text: "ACCESSING ARCHITECTURE DATA... DONE (SEE CONSOLE)", time }];
                });
            }
        };

        window.addEventListener('keydown', handleArchitectureTrigger);

        const processNextLog = () => {
            if (currentLogIndex < bootLogs.length) {
                const newLog = {
                    text: bootLogs[currentLogIndex],
                    time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
                };

                setLogs(prev => [...prev.slice(-8), newLog]);
                setProgress(((currentLogIndex + 1) / bootLogs.length) * 100);
                currentLogIndex++;

                // Randomized delay for more realism (between 150ms and 450ms)
                const delay = Math.random() * 300 + 150;
                setTimeout(processNextLog, delay);
            } else {
                setTimeout(() => {
                    setIsFinished(true);
                    setTimeout(onComplete, 500);
                }, 800);
            }
        };

        const initialTimeout = setTimeout(processNextLog, 400);
        return () => {
            clearTimeout(initialTimeout);
            window.removeEventListener('keydown', handleArchitectureTrigger);
        };
    }, []);

    if (isFinished) return null;

    return (
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-6 font-mono selection:bg-blue-500/30">
            <div className="max-w-2xl w-full space-y-8">
                {/* BIOS Header */}
                <div className="flex justify-between items-start text-blue-500/80 text-[10px] sm:text-xs">
                    <div>
                        <p>VEER-OS BIOS v4.2.0</p>
                        <p>(C) {currentYear} VEER PRAKASH TECH</p>
                    </div>
                    <div className="text-right">
                        <p>BA55-CODE-ENG-{currentYear}</p>
                        <p>MODE: SOFTWARE_ENG_V8</p>
                    </div>
                </div>

                {/* Terminal Output */}
                <div className="space-y-1 sm:space-y-2 h-[200px] overflow-hidden">
                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-3 text-sm sm:text-base">
                            <span className="text-gray-600">[{log.time}]</span>
                            <span className={log.text === "READY." ? "text-blue-400 font-bold" : "text-gray-300"}>
                                {log.text}
                            </span>
                        </div>
                    ))}
                    {!isFinished && <div className="w-2 h-5 bg-blue-500 animate-cursor-blink inline-block align-middle ml-1" />}
                </div>

                {/* Progress Section */}
                <div className="space-y-3">
                    <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                        <span>Loading System...</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-900 overflow-hidden rounded-full border border-gray-800">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="text-[10px] text-gray-700 text-center animate-pulse">
                    PRESS F12 FOR ARCHITECTURE DETAILS
                </div>
            </div>
        </div>
    );
};

export default BootScreen;

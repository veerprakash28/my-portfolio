import React, { useState, useRef } from "react";
import { Calendar, MapPin, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolioData } from "../data/portfolio";

const Experience: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use full company name from portfolio data, uppercased
  const getCompanyHeaderName = (company: string) => {
    return company.toUpperCase();
  };

  // Chronological order: oldest first (Gemini -> Fracto -> Shipthis)
  const sortedExperience = [...portfolioData.experience].reverse();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollWidth - target.clientWidth;
    if (maxScroll <= 0) return;
    const progress = (target.scrollLeft / maxScroll) * 100;
    setScrollProgress(progress);
  };

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = trackRef.current.clientWidth * 0.75;
      const offset = direction === "left" ? -scrollAmount : scrollAmount;
      trackRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="experience-section" className="py-20 relative overflow-hidden bg-gray-50/10 dark:bg-gray-900/10">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header with Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 font-sans">
              My
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                {" "}
                Journey
              </span>
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl">
              A timeline of my professional growth and key achievements
            </p>
          </div>

          {/* Stepper Arrow Controllers */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-850 hover:text-gray-900 dark:hover:text-white transition-all shadow-sm active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Direct Native Horizontal Scroll Track */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-6 scrollbar-none w-full scroll-smooth"
        >
          {/* SLIDE 0: Typographic Intro Slide */}
          <div className="flex-shrink-0 w-[80vw] max-w-[280px] md:w-[320px] snap-center flex flex-col justify-center pr-4 select-none">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-600 dark:text-teal-400 uppercase mb-3">
              01 // History
            </span>
            <h3 className="text-3xl font-black text-gray-950 dark:text-white leading-tight font-sans">
              Navigate left to right to track my milestone progression.
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mt-6"></div>
          </div>

          {/* SLIDES 1-3: Experience cards */}
          {sortedExperience.map((exp, index) => {
            return (
              <div
                key={exp.id}
                className="flex-shrink-0 w-[85vw] max-w-[450px] md:w-[500px] snap-center"
              >
                {/* Minimalist, high-end typographic card */}
                <div className="h-[52vh] min-h-[420px] max-h-[480px] flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">

                  {/* Card Top: Header Metadata */}
                  <div>
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3.5 mb-3.5 select-none">
                      <span className="text-xs font-mono font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider">
                        {`[0${index + 2}] ${getCompanyHeaderName(exp.company)}`}
                      </span>
                      <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                        {exp.period.split(" ").slice(-1)[0]}
                      </span>
                    </div>

                    <h4 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                      {exp.roles ? exp.roles[0].title : exp.title}
                    </h4>

                    {/* Metadata strip */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 items-center mt-3 text-xs font-mono text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Single role description */}
                    {!exp.roles && exp.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-4 line-clamp-3">
                        {exp.description}
                      </p>
                    )}

                    {/* Multi-role history nested timelines (e.g. Shipthis Inc) */}
                    {exp.roles && (
                      <div className="mt-4 space-y-3.5 pl-3.5 border-l border-gray-200 dark:border-gray-800 ml-1">
                        {exp.roles.map((role: { title: string; period: string; description: string }, rIndex: number) => (
                          <div key={rIndex} className="relative">
                            <div className="absolute -left-[18.5px] top-1.5 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                              <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                                {role.title}
                              </h5>
                              <span className="text-[9px] font-mono text-gray-400 sm:ml-2">
                                {role.period}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                              {role.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Key Accomplishments */}
                  <div className="border-t border-gray-100 dark:border-gray-800/80 pt-3.5 mt-3.5 overflow-y-auto max-h-[140px] scrollbar-none">
                    <div className="space-y-3">
                      {exp.achievements.map((ach, aIndex) => (
                        <div key={aIndex} className="flex items-start gap-3">
                          <span className="text-[9px] font-mono font-bold text-gray-400 dark:text-gray-500 mt-0.5 select-none">
                            {`[0${aIndex + 1}]`}
                          </span>
                          <span className="text-xs text-gray-650 dark:text-gray-300 leading-normal">
                            {ach}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

          {/* FINAL SLIDE: Download Resume Card */}
          <div className="flex-shrink-0 w-[80vw] max-w-[280px] md:w-[320px] snap-center">
            <div className="h-[52vh] min-h-[420px] max-h-[480px] flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-teal-600 text-white shadow-lg relative overflow-hidden select-none">
              {/* Corner abstract background pattern */}
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

              <div>
                <span className="text-xs font-mono font-bold text-blue-100 uppercase tracking-widest">
                  {`[0${sortedExperience.length + 2}] RESUME`}
                </span>
                <h3 className="text-2xl font-black leading-tight mt-6">
                  Need a offline copy?
                </h3>
                <p className="text-xs text-blue-100 mt-3 leading-relaxed">
                  Download my full PDF resume containing detail summaries, academics, and project highlights.
                </p>
              </div>

              <button
                onClick={() => window.open("/Resume.pdf", "_blank")}
                className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 shadow-md active:scale-97"
              >
                <ExternalLink size={15} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Scroll Progress Bar Indicator */}
        <div className="flex justify-center items-center mt-6">
          <div className="w-40 h-[3px] bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative">
            <div
              className="absolute left-0 top-0 h-full bg-teal-500 rounded-full transition-all duration-100"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;

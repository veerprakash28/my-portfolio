import { useState, useEffect } from "react";

const SECTION_IDS = ["hero", "about", "experience", "work", "tech", "contact"];

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let active = true;
    let root: Element | null = null;
    let handleScroll: (() => void) | null = null;

    const init = () => {
      root = document.querySelector(".browser-content");
      if (!root) {
        if (active) setTimeout(init, 50);
        return;
      }

      handleScroll = () => {
        if (!root) return;
        const S = root.scrollTop;
        const maxScroll = root.scrollHeight - root.clientHeight;

        if (S <= 20) { setActiveSection("hero"); return; }
        if (S >= maxScroll - 50) { setActiveSection("contact"); return; }

        const isDesktop = window.innerWidth >= 768;
        const track = root.querySelector(".horizontal-track") as HTMLElement | null;

        if (isDesktop && track) {
          // Desktop: derive active section from each section's offsetLeft in the track
          const trackScrollable = track.scrollWidth - (root as HTMLElement).clientWidth;
          if (trackScrollable <= 0) return;

          // Build list of { id, scrollStart } sorted by position
          const sections = SECTION_IDS.map((id) => {
            const el = track.querySelector(`[data-section="${id}"]`) as HTMLElement | null;
            const scrollStart = el
              ? (el.offsetLeft / trackScrollable) * maxScroll
              : 0;
            return { id, scrollStart };
          });

          // The active section is the last one whose scrollStart we've passed
          // Use a 30% lookahead buffer so it activates before fully scrolled in
          const BUFFER = (root as HTMLElement).clientHeight * 0.3;
          let activeId = "hero";
          for (const sec of sections) {
            if (S + BUFFER >= sec.scrollStart) {
              activeId = sec.id;
            }
          }
          setActiveSection(activeId);
        } else {
          // Mobile: use offsetTop on the stacked <section id="..."> elements
          const offsets = SECTION_IDS.map((id) => {
            const el = root!.querySelector(`#${id}`) as HTMLElement | null;
            return { id, offset: el ? el.offsetTop : 0 };
          });
          const BUFFER = (root as HTMLElement).clientHeight * 0.3;
          let activeId = "hero";
          for (const sec of offsets) {
            if (S + BUFFER >= sec.offset) activeId = sec.id;
          }
          setActiveSection(activeId);
        }
      };

      root.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
      handleScroll();
    };

    init();

    return () => {
      active = false;
      if (root && handleScroll) root.removeEventListener("scroll", handleScroll);
      if (handleScroll) window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return activeSection;
};

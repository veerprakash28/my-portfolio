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

        if (S <= 20) {
          setActiveSection("hero");
          return;
        }
        if (S >= maxScroll - 50) {
          setActiveSection("contact");
          return;
        }

        const offsets = SECTION_IDS.map((id) => {
          const el = document.getElementById(id);
          return { id, offset: el ? el.offsetTop : 0 };
        });

        // Find the last section anchor that the scroll has passed
        // Use a small look-ahead buffer so it activates slightly before the anchor
        const ACTIVATION_BUFFER = root.clientHeight * 0.3;
        let activeId = "hero";
        for (let i = 0; i < offsets.length; i++) {
          if (S + ACTIVATION_BUFFER >= offsets[i].offset) {
            activeId = offsets[i].id;
          }
        }
        setActiveSection(activeId);
      };

      root.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
      handleScroll();
    };

    init();

    return () => {
      active = false;
      if (root && handleScroll) {
        root.removeEventListener("scroll", handleScroll);
      }
      if (handleScroll) {
        window.removeEventListener("resize", handleScroll);
      }
    };
  }, []);

  return activeSection;
};


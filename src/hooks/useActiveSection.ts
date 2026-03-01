import { useState, useEffect } from "react";

const SECTION_IDS = ["hero", "about", "experience", "work", "tech", "contact"];

export const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const root = document.querySelector(".browser-content");
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el || !root) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          root,
          threshold: 0.2, // Lowered threshold for better detection
          rootMargin: "-20% 0px -20% 0px", // Balanced margins
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return activeSection;
};

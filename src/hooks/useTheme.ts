import { useState, useEffect } from "react";

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage or default to false (light mode)
    const saved = localStorage.getItem("theme");
    return saved === "dark";
  });

  useEffect(() => {
    // Apply the theme immediately on mount
    const applyTheme = (dark: boolean) => {
      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    applyTheme(isDark);
  }, [isDark]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return { isDark, toggleTheme };
};
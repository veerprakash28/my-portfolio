import { useState, useEffect } from "react";

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Always start by removing dark class to ensure clean state
    document.documentElement.classList.remove("dark");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      // Ensure we're in light mode
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      // Set default theme if none exists
      if (!savedTheme) {
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  const toggleTheme = () => {
    console.log("GETTING CALLED");
    const newIsDark = !isDark;
    console.log(newIsDark, "DARK");
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return { isDark, toggleTheme };
};

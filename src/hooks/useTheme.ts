import { useState } from "react";

export const useTheme = () => {
  // Always light theme - no dark mode
  const [isDark] = useState(false);

  // No-op function since we're removing dark mode
  const toggleTheme = () => {
    // Do nothing - always stay in light mode
  };

  return { isDark, toggleTheme };
};
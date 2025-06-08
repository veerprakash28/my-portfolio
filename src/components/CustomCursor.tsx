import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const addHoverListeners = () => {
      const hoverTargets = document.querySelectorAll(
        "a, button, .cursor-hover"
      );

      hoverTargets.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0)`,
      }}
    >
      <div
        className={`w-5 h-5 rounded-full border transition-all duration-300 ease-out ${
          isHovered
            ? "border-blue-500 scale-[2.2] opacity-60"
            : "border-blue-500 scale-100 opacity-90"
        }`}
        style={{
          borderWidth: "1.5px",
        }}
      />
    </div>
  );
};

export default CustomCursor;

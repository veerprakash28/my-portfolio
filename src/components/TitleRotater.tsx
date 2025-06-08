import { useEffect, useState } from "react";

export const TitleRotator = ({ titles }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeOutDuration = 300;
    const stayDuration = 2000;

    const timer = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length);
        setFade(true);
      }, fadeOutDuration);
    }, stayDuration);

    return () => clearTimeout(timer);
  }, [index, titles]);

  return (
    <p
      className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium transition-opacity duration-300 ease-in-out ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {titles[index]}
    </p>
  );
};

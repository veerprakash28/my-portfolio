import { ArrowDown, Mail, MapPin } from "lucide-react";
import React from "react";
import { portfolioData } from "../data/portfolio";
import { TitleRotator } from "./TitleRotater";

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 lg:order-1 order-2">
            <div className="space-y-4 animate-fade-in-up">
              <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
                Hello, I'm
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                {portfolioData.personal.name.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className={`block ${index === 1 ? "shimmer-gradient" : ""}`}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              <TitleRotator titles={portfolioData.personal.title} />
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
                {portfolioData.personal.tagline}
              </p>
            </div>

            {/* Quick Contact Info */}
            <div
              className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}
            >
              <div className="flex items-center space-x-2">
                <MapPin
                  size={16}
                  className="text-blue-600 dark:text-blue-400"
                />
                <span>{portfolioData.personal.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-600 dark:text-blue-400" />
                <span>{portfolioData.personal.email}</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="lg:order-2 order-1 flex justify-center lg:justify-end">
            <div
              className="relative animate-fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-70"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-70"></div>

              {/* Main image container */}
              <div className="relative z-10 w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src={portfolioData.personal.image}
                  alt={portfolioData.personal.name}
                  className="w-full h-full object-cover rounded-full"
                />
                {/* Optional overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-full"></div>
              </div>

              {/* Floating badge */}
              <div
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="cursor-hover absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-xl border-2 border-gray-100 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300  dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 z-20 transition-all duration-200 hover:scale-105 "
              >
                <p className="text-sm font-semibold whitespace-nowrap">
                  Let's Connect
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ArrowDown
          className="text-gray-400 dark:text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          size={24}
        />
      </button>
    </section>
  );
};

export default Hero;

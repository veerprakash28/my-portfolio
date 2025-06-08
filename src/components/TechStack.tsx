import React from "react";
import { portfolioData } from "../data/portfolio";

const TechStack: React.FC = () => {
  const techCategories = [
    {
      name: "Frontend",
      techs: portfolioData.techStack.frontend,
      color: "blue",
    },
    { name: "Backend", techs: portfolioData.techStack.backend, color: "teal" },
    { name: "Mobile", techs: portfolioData.techStack.mobile, color: "orange" },
    {
      name: "Database",
      techs: portfolioData.techStack.database,
      color: "purple",
    },
    {
      name: "Cloud & DevOps",
      techs: portfolioData.techStack.cloud,
      color: "green",
    },
    {
      name: "Tools & Design",
      techs: portfolioData.techStack.tools,
      color: "pink",
    },
    {
      name: "AI & ML",
      techs: portfolioData.techStack.aiml,
      color: "yellow",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
      orange:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
      purple:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      green:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
      pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800",
      yellow:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="tech" className="py-20 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tech
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {" "}
              Stack
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Tech Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {techCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.techs.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 hover:scale-105 cursor-default ${getColorClasses(
                      category.color
                    )}`}
                    style={{
                      animationDelay: `${
                        categoryIndex * 100 + techIndex * 50
                      }ms`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

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
      blue: "bg-blue-100 text-blue-700 border-blue-200",
      teal: "bg-teal-100 text-teal-700 border-teal-200",
      orange: "bg-orange-100 text-orange-700 border-orange-200",
      purple: "bg-purple-100 text-purple-700 border-purple-200",
      green: "bg-green-100 text-green-700 border-green-200",
      pink: "bg-pink-100 text-pink-700 border-pink-200",
      yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="tech" className="py-20 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tech
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {" "}
              Stack
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Tech Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {techCategories.map((category, categoryIndex) => (
            <div
              key={category.name}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
              style={{ animationDelay: `${categoryIndex * 100}ms` }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
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

        {/* Skill Level Indicators */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Proficiency Overview
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Frontend Development", level: 95, color: "blue" },
              { name: "Backend Development", level: 90, color: "teal" },
              { name: "Mobile Development", level: 85, color: "orange" },
              { name: "UI/UX Design", level: 80, color: "purple" },
            ].map((skill) => (
              <div key={skill.name} className="text-center space-y-3">
                <div className="relative w-24 h-24 mx-auto">
                  <svg
                    className="w-24 h-24 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`text-${skill.color}-600`}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={`${skill.level}, 100`}
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-lg font-bold text-${skill.color}-600`}
                    >
                      {skill.level}%
                    </span>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {skill.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
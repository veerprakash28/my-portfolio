import React from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { portfolioData } from "../data/portfolio";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {" "}
              Journey
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A timeline of my professional growth and key achievements
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-teal-600 to-orange-600"></div>

          {/* Experience items */}
          <div className="space-y-12">
            {portfolioData.experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-4 border-blue-600 rounded-full z-10"></div>

                {/* Content card */}
                <div
                  className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                          <Calendar size={16} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-teal-600 dark:text-teal-400 font-semibold">
                          {exp.company}
                        </p>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                          Key Achievements
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li
                              key={achIndex}
                              className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Download Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Want to know more?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Download my complete resume to see detailed information about my
              experience, education, and skills.
            </p>
            <button
              onClick={() => window.open("/Resume.pdf", "_blank")}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <ExternalLink size={20} />
              <span>Download Full Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

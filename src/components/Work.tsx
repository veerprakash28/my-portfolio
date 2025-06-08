import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { portfolioData } from "../data/portfolio";

const Work: React.FC = () => {
  return (
    <section
      id="work"
      className="py-20 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {" "}
              Work
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent projects and creative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 obj  ect-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlay buttons */}
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:scale-110 transform"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:scale-110 transform"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center space-x-4 pt-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm transition-colors duration-200"
                  >
                    <Github size={16} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Want to see more of my work?
            </p>
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <Github size={20} />
              <span>View All Projects on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;

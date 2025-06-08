import React from "react";
import { CheckCircle } from "lucide-react";
import { portfolioData } from "../data/portfolio";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gray-50 relative overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                About
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  {" "}
                  Me
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {portfolioData.about.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {portfolioData.about.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle
                    className="text-blue-600 flex-shrink-0"
                    size={24}
                  />
                  <span className="text-gray-700 font-medium">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  30+
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  Projects Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">
                  3+
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  Years Experience
                </div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  15+
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  Happy Clients
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600 font-mono text-sm">
                      const
                    </div>
                    <div className="text-gray-700 font-mono text-sm">
                      {"developer = {"}
                    </div>
                  </div>
                  <div className="pl-6 space-y-2">
                    <div className="flex">
                      <span className="text-gray-600 font-mono text-sm">
                        name:
                      </span>
                      <span className="text-green-600 font-mono text-sm ml-2">
                        '{portfolioData.personal.name}'
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 font-mono text-sm">
                        skills:
                      </span>
                      <span className="text-green-600 font-mono text-sm ml-2">
                        ['Javascript', 'MEARN', 'Python', 'CICD', 'Design']
                      </span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-600 font-mono text-sm">
                        passion:
                      </span>
                      <span className="text-green-600 font-mono text-sm ml-2">
                        'Creating amazing experiences'
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-700 font-mono text-sm">
                    {"}"}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-70"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal-100 rounded-full blur-2xl opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
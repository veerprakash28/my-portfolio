import About from "./components/About";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TechStack from "./components/TechStack";
import Work from "./components/Work";
import { portfolioData } from "./data/portfolio";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <CustomCursor />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Work />
        <TechStack />
        <Contact />
      </main>

      <footer className="bg-gray-200 dark:bg-black text-gray-600 dark:text-white py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-4 md:mb-0">
              <p className="text-sm">
                © {new Date().getFullYear()} {portfolioData.personal.name}. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

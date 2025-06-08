import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TechStack from "./components/TechStack";
import Work from "./components/Work";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none"></div>

      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Work />
        <TechStack />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © 2025 Veer Prakash. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

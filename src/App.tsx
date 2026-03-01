import About from "./components/About";
import BrowserChrome from "./components/BrowserChrome";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Work from "./components/Work";

function App() {
  return (
    <>
      <CustomCursor />
      <BrowserChrome>
        <main className="relative">
          <Hero />
          <About />
          <Experience />
          <Work />
          <TechStack />
          <Contact />
        </main>

        <footer className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 py-6 relative border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <div className="text-center">
                <p className="text-xs">
                  Built with ❤️ by Veer Prakash  •  © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </BrowserChrome>
    </>
  );
}

export default App;

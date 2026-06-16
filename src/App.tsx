import { useState } from "react";
import BrowserChrome from "./components/BrowserChrome";
import BootScreen from "./components/BootScreen";
import CustomCursor from "./components/CustomCursor";
import { StorytellingCanvas } from "./components/StorytellingCanvas";

function App() {
  const [isBooted, setIsBooted] = useState(false);

  const handleBootComplete = () => {
    setIsBooted(true);
  };

  if (!isBooted) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  return (
    <>
      <CustomCursor />
      <BrowserChrome>
        <StorytellingCanvas />
      </BrowserChrome>
    </>
  );
}

export default App;

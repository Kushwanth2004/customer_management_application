import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Routes from "./routes";
import { customTheme } from "./themes";
import { Toaster } from "react-hot-toast";

import 'primereact/resources/themes/saga-blue/theme.css'; // Choose a theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useState, useEffect, useRef } from "react"; // Add useState

// toaster options
const toasterOptions = {
  style: { fontWeight: 500 },
};

function App() {
  const appTheme = customTheme();
  const observedDivRef = useRef(null);
  const resizingDelayTimer = useRef(null);
  const [matchingDivWidth, setMatchingDivWidth] = useState(0); // Define state

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      clearTimeout(resizingDelayTimer.current);
      resizingDelayTimer.current = setTimeout(() => {
        if (observedDivRef.current) {
          setMatchingDivWidth(observedDivRef.current.clientWidth); // Update state
        }
      }, 100);
    });

    if (observedDivRef.current) {
      observer.observe(observedDivRef.current);
    }

    return () => {
      if (observer && observedDivRef.current) {
        observer.unobserve(observedDivRef.current);
      }
    };
  }, []);   
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Toaster toastOptions={toasterOptions} />
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

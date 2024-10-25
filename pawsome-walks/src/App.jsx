import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import getAllWalks from "./hooks/apiCalls/getAllWalks.js";

import ThemeProvider from "./comps/ThemeProvider.jsx";
import AppContainer from "./comps/AppContainer.jsx";

import "./App.css";
import "./styles/small.css";
import "./styles/medium.css";
import "./styles/large.css";
import "./styles/index.css";
import { ThemeContext } from "./comps/ThemeProvider.jsx";
import MainContent from "./comps/MainContent.jsx";
import ScrollToTop from "./comps/ScrollToTop.jsx";

function App() {
  const { darkTheme } = useContext(ThemeContext);
  const [allWalks, setAllWalks] = useState();

  useEffect(() => {
    async function fetchWalksData() {
      const walksData = await getAllWalks();
      setAllWalks(walksData);
    }
    fetchWalksData();
  }, []);

  return (
    <ThemeProvider>
      <AppContainer>
        <Router>
          <ScrollToTop />
          <MainContent allWalks={allWalks} darkTheme={darkTheme} />
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

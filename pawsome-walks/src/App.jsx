import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import getAllWalks from "./hooks/apiCalls/getAllWalks.js";

import ThemeProvider from "./comps/ThemeProvider.jsx";
import AppContainer from "./comps/AppContainer.jsx";
import { AuthProvider } from "./comps/AuthContext.jsx";
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
  const [allWalks, setAllWalks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isSorted, setIsSorted] = useState(false);
  const [sortedWalks, setSortedWalks] = useState([]);
  const [distanceSort, setDistanceSort] = useState(false);
  const [nameSort, setNameSort] = useState(false);

  useEffect(() => {
    async function fetchWalksData() {
      const walksData = await getAllWalks();
      setAllWalks(walksData);
      setSortedWalks(walksData);
      // console.log("walksData", walksData);
    }
    fetchWalksData();
  }, []);

  const sortProps = {
    isSorted,
    setIsSorted,
    sortedWalks,
    setSortedWalks,
    distanceSort,
    setDistanceSort,
    nameSort,
    setNameSort,
  };
  const navBarProps = {
    isOpen,
    setIsOpen,
    profilePicture,
    setProfilePicture,
  };
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContainer>
            <ScrollToTop />
            <MainContent
              allWalks={allWalks}
              darkTheme={darkTheme}
              navBarProps={navBarProps}
              sortProps={sortProps}
            />
          </AppContainer>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

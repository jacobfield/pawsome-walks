import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import getAllWalks from "./hooks/getAllWalks.js";
import Footer from "./comps/Footer.jsx";
import WalkDetail from "./comps/WalkDetail.jsx";
import ThemeProvider from "./comps/ThemeProvider.jsx";
import AppContainer from "./comps/AppContainer.jsx";
import Header from "./comps/Header.jsx";
import Main from "./comps/Main.jsx";
import "./App.css";
import "./styles/small.css";
import "./styles/medium.css";
import "./styles/large.css";
import "./styles/index.css";
import { ThemeContext } from "./comps/ThemeProvider.jsx";

function App() {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const [allWalks, setAllWalks] = useState();

  useEffect(() => {
    async function fetchWalksData() {
      const walksData = await getAllWalks();
      setAllWalks(walksData);
      console.log("App.jsx walks data", walksData);
    }
    fetchWalksData();
    if (allWalks) {
      console.log("Walks Data:");
      console.log(allWalks);
    }
  }, []);

  return (
    <ThemeProvider>
      <AppContainer>
        <Router>
          <div className="app">
            <Header />
            <div className={`mainContent ${!darkTheme ? "icon-right" : ""}`}>
              {/* // HERE */}
              <Routes>
                <Route path="/" element={<Main allWalks={allWalks} />} />
                <Route path="/walk/:walkid" element={<WalkDetail />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

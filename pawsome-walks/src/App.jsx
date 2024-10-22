import "./App.css";
import "./styles/small.css";
import "./styles/medium.css";
import "./styles/large.css";
import "./styles/index.css";
import ThemeProvider from "./comps/ThemeProvider.jsx";
import AppContainer from "./comps/AppContainer.jsx";
import Header from "./comps/Header.jsx";
import Main from "./comps/Main.jsx";
import { useEffect, useState } from "react";
import getAllWalks from "./hooks/getAllWalks.js";
import Footer from "./comps/Footer.jsx";
function App() {
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
        <div className="app">
          <Header></Header>
          <Main allWalks={allWalks}></Main>
          <Footer></Footer>
        </div>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

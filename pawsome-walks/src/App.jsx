import "./App.css";
import "./styles/small.css";
import "./styles/medium.css";
import "./styles/large.css";
import "./styles/index.css";
import ThemeProvider from "./comps/ThemeProvider.jsx";
import AppContainer from "./comps/AppContainer.jsx";
import Header from "./comps/Header.jsx";
import Main from "./comps/Main.jsx";
function App() {
  return (
    <ThemeProvider>
      <AppContainer>
        <div className="app">
          <Header></Header>
          <Main></Main>
        </div>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

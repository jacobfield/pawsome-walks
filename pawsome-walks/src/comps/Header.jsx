import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
export default function Header() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <header className={`header fade ${darkTheme ? "dark" : "light"}`}>
      <img
        className={`logo ${darkTheme ? "dark" : "light"}`}
        alt="Pawsome Walks Logo"
        src="/logo.png"
        // logo updated to use transparent background
      ></img>
      <div className="searchBarContainer">
        <SearchBar></SearchBar>
      </div>
      <nav className="navBarContainer">
        <NavBar></NavBar>
      </nav>
    </header>
  );
}

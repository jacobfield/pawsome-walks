import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { Link } from "react-router-dom";
export default function Header() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <header className={`header fade ${darkTheme ? "dark" : "light"}`}>
      <Link className="noTextDecoration" to="/">
        <img
          className={`logo ${darkTheme ? "dark" : "light"}`}
          alt="Pawsome Walks Logo"
          src="/logo.png"
        ></img>
      </Link>
      <div className="searchBarContainer">
        <SearchBar></SearchBar>
      </div>
      <nav className="navBarContainer">
        <NavBar></NavBar>
      </nav>
    </header>
  );
}

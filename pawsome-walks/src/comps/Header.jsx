import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { Link } from "react-router-dom";
import Overlay from "./Overlay";
export default function Header({
  navBarProps,
  showFavourites,
  setShowFavourites,
  filterFunctions,
}) {
  function toggleFavourites() {
    setShowFavourites(!showFavourites);
  }
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
        <SearchBar filterFunctions={filterFunctions}></SearchBar>
      </div>
      <nav className="navBarContainer">
        <NavBar
          navBarProps={navBarProps}
          toggleFavourites={toggleFavourites}
          showFavourites={showFavourites}
        ></NavBar>
        <Overlay navBarProps={navBarProps} />
      </nav>
    </header>
  );
}

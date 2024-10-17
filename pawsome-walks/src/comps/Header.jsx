import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="header">
      <img
        className="logo"
        alt="Pawsome Walks Logo"
        src="../../public/logo.jpg"
      ></img>
      {/* flex-start left*/}
      <div className="searchBarContainer">
        <SearchBar></SearchBar>
      </div>{" "}
      {/* flex-start center*/}
      <nav className="navBarContainer">
        <NavBar></NavBar>
      </nav>{" "}
      {/* flexstart right*/}
    </header>
  );
}

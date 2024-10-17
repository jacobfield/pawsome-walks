import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="header">
      <img className="logo" alt="Pawsome Walks Logo" src="/logo.jpg"></img>
      {/* flex-start left*/}
      <div className="searchBarDiv">
        <SearchBar></SearchBar>
      </div>{" "}
      {/* flex-start center*/}
      <nav className="navBar"></nav> {/* flexstart right*/}
    </header>
  );
}

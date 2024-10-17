export default function Header() {
  return (
    <header className="header">
      <img
        className="logo"
        alt="Pawsome Walks Logo"
        src="../../public/logo.jpg"
      ></img>
      {/* flex-start left*/}
      <div className="searchBar"></div> {/* flex-start center*/}
      <nav className="navBar"></nav> {/* flexstart right*/}
    </header>
  );
}

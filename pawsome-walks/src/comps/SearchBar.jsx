export default function SearchBar() {
  return (
    <div className="searchBar">
      <input
        className="searchInput"
        type="text"
        placeholder="Search for a walk"
      ></input>
      <button className="searchButton">Search</button>
    </div>
  );
}

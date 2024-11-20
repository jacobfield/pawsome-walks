export default function SearchBar({ filterFunctions }) {
  const { handleFilter } = filterFunctions;
  return (
    <div className="searchBar">
      <input
        className="searchInput"
        type="text"
        placeholder="Search walks..."
        onChange={handleFilter}
      ></input>
      {/* <button className="searchButton">Search</button> */}
    </div>
  );
}

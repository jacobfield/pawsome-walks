export default function SearchBar({ filterFunctions }) {
  return (
    <div className="searchBar">
      <input
        className="searchInput"
        type="text"
        placeholder="Search walks..."
      ></input>
      {/* <button className="searchButton">Search</button> */}
    </div>
  );
}

// Create shallow state copy of all walks in MainContent. This needs to be passed down to siblings Main and Header -> SearchBar
// Also pass down an 'isFiltered' boolean setter to Search Bar, and value to Main
// Main: if isFiltered, show filtered list of walks
// SearchBar: if searchbar populated, set isFiltered to true, once it is empty,set it to false. Do this in the handle change function. I don't want a submit button, I want it to be filtered when typing.
// Return spinner if nothing found in filter. If nothing found, return a message saying 'No walks found'
// upon search bar value changing, this must be sent back up to Main Content, then displayed in Main, just the list of filtered walks.
//Once the search bar is empty, the full list of walks should be displayed again.

import FilterBoxes from "./FilterBoxes";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
export default function FilterOverlay({
  filterIsOpen,
  setFilterIsOpen,
  setIsFiltered,
  allWalks,
  setFilteredWalks,
  filteredWalks,
}) {
  const { darkTheme } = useContext(ThemeContext);
  const handleChange = () => {
    setFilterIsOpen(!filterIsOpen);
  };

  return (
    <div className="filterOverlayContainer">
      <div className="container1">
        <button
          className={`filterOverlayButton ${darkTheme ? "dark" : "light"} ${
            filterIsOpen ? "open" : ""
          }`}
          onClick={handleChange}
        >
          {filterIsOpen ? "Hide" : "Show"} Filters
        </button>
      </div>
      <div className="container2">
        <div
          className={`filterSlide ${filterIsOpen ? "open" : ""} ${
            darkTheme ? "dark" : "light"
          }`}
        >
          <FilterBoxes
            handleChange={handleChange}
            setIsFiltered={setIsFiltered}
            allWalks={allWalks}
            setFilteredWalks={setFilteredWalks}
            filteredWalks={filteredWalks}
            filterIsOpen={filterIsOpen}
          />
        </div>
      </div>
    </div>
  );
}

// Add New Walk Plan:
// Might be best, in terms of UI and Props, to have it be a conditionally rendered component, similar to the FilterOverlay comp.
// Can even have it rendered in this same FilterOverlay.jsx comp, so that it's all in one place.

//BACKEND:
// POST request will need to be added to the Walks table, so that all walks are rendered in the same place, and so that it has the required table columns:
// - walkid - sequence, will be automatically populated
// - photopath - this can be the URL, pulling from uploads table. When walks are being mapped through, will need a condition for either in folder path or url path.
// - walkname - provided by user in form
// - location - provided by user
// lat & lng - these will have to be retrieved based on the location. Will need to pass it through useGeolocation.js to get these, then extracted
// walkType - provided by user. Will need to be a dropdown menu, with options being the walk types that are already in the database.
// offleadareas - provided by user, will be a checkbox
// paths - provided by user, will be a checkbox
// animalsonroute - provided by user, will be a checkbox
// toilets - provided by user, will be a checkbox
// wateronroute - provided by user, will be a checkbox
// scenic - provided by user, will be a checkbox
// parking - provided by user, will be a dropdown menu, with options being the parking options that are already in the database.

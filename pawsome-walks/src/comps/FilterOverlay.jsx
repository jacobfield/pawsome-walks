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

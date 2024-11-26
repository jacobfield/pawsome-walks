/* eslint-disable react/prop-types */
import FilterBoxes from "./FilterBoxes";
import AddWalkContainer from "./AddWalkContainer";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import { useAuth } from "./AuthContext";

export default function FilterOverlay({
  filterIsOpen,
  setFilterIsOpen,
  setIsFiltered,
  allWalks,
  setFilteredWalks,
  filteredWalks,
  setAddWalkIsOpen,
  addWalkIsOpen,
  sortProps,
  isFiltered,
}) {
  const { darkTheme } = useContext(ThemeContext);
  const { isLoggedIn } = useAuth();

  const handleOverlayChange = () => {
    setFilterIsOpen(!filterIsOpen);
    if (!isFiltered) {
      setIsFiltered(true);
    }
    if (isFiltered) {
      setIsFiltered(false);
    }
    console.log("Filter Overlay Is Filtered", isFiltered);
  };

  const handleAddWalkChange = () => {
    setAddWalkIsOpen(!addWalkIsOpen);
  };

  return (
    <div className="filterOverlayContainer">
      <div className="overlayButtonContainer">
        <button
          className={`filterOverlayButton ${darkTheme ? "dark" : "light"} ${
            filterIsOpen ? "open" : ""
          }`}
          onClick={handleOverlayChange}
        >
          {filterIsOpen ? "Hide" : "Show"} Filters
        </button>
        {isLoggedIn ? (
          <button
            className={`filterOverlayButton ${darkTheme ? "dark" : "light"} ${
              addWalkIsOpen ? "open" : ""
            }`}
            onClick={handleAddWalkChange}
          >
            Add a walk?
          </button>
        ) : (
          <></>
        )}
      </div>
      {/* Starts */}
      <div className={`filterOverlayContentContainer`}>
        <div
          className={`slideToggle ${filterIsOpen ? "open" : ""} ${
            darkTheme ? "dark" : "light"
          }`}
        >
          <FilterBoxes
            setIsFiltered={setIsFiltered}
            allWalks={allWalks}
            setFilteredWalks={setFilteredWalks}
            filteredWalks={filteredWalks}
            filterIsOpen={filterIsOpen}
            sortProps={sortProps}
          />
        </div>
        {/* Ends */}
        <div
          className={`filterSlide ${addWalkIsOpen ? "open" : ""} ${
            darkTheme ? "dark" : "light"
          }`}
        >
          <AddWalkContainer allWalks={allWalks}></AddWalkContainer>
        </div>
      </div>
    </div>
  );
}

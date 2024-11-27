/* eslint-disable react/prop-types */
import FilterBoxes from "./FilterBoxes";
import AddWalkContainer from "./AddWalkContainer";
import { useContext, useEffect } from "react";
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
    // with the setISFiltered, it breaks the slide transition, but without, it requires two clicks to trigger a render :/
    setIsFiltered(!isFiltered);
  };

  const handleAddWalkChange = () => {
    setAddWalkIsOpen(!addWalkIsOpen);
  };

  // const handleFilterOpen = (e) => {};

  return (
    <div className="filterOverlayContainer">
      <div className="overlayButtonContainer">
        <button
          className={`filterOverlayButton ${darkTheme ? "dark" : "light"}  ${
            filterIsOpen ? "open" : ""
          }  `}
          onClick={handleOverlayChange}
        >
          {filterIsOpen ? "Hide" : "Show"} Filters
        </button>
        {isLoggedIn ? (
          <button
            // index only, no impact on height
            className={`filterOverlayButton ${darkTheme ? "dark" : "light"} ${
              filterIsOpen ? "open" : ""
            } `}
            onClick={handleAddWalkChange}
          >
            Add a walk?
          </button>
        ) : (
          <></>
        )}
      </div>
      {/* Starts */}
      <div
        className={`filterSlide ${filterIsOpen ? "open" : ""} ${
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
  );
}

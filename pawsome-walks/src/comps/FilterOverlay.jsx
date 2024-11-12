/* eslint-disable react/prop-types */
import FilterBoxes from "./FilterBoxes";
import AddWalkContainer from "./AddWalkContainer";
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
export default function FilterOverlay({
  filterIsOpen,
  setFilterIsOpen,
  setIsFiltered,
  allWalks,
  setFilteredWalks,
  filteredWalks,
  setAddWalkIsOpen,
  addWalkIsOpen,
}) {
  const { darkTheme } = useContext(ThemeContext);
  const handleOverlayChange = () => {
    setFilterIsOpen(!filterIsOpen);
  };

  const handleAddWalkChange = () => {
    setAddWalkIsOpen(!addWalkIsOpen);
  };

  return (
    <div className="filterOverlayContainer">
      <div className="overlayButtonContainer">
        {/* Filters Overlay Button */}
        <button
          className={`filterOverlayButton ${darkTheme ? "dark" : "light"} ${
            filterIsOpen ? "open" : ""
          }`}
          onClick={handleOverlayChange}
        >
          {filterIsOpen ? "Hide" : "Show"} Filters
        </button>
        {/* Add Walk Overlay Button */}
        <button
          className={`filterOverlayButton ${darkTheme ? "dark" : "light"} ${
            addWalkIsOpen ? "open" : ""
          }`}
          onClick={handleAddWalkChange}
        >
          Add a walk?
        </button>
      </div>
      <div className="filterOverlayContentContainer">
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
          />
        </div>
        <div
          className={`filterSlide ${addWalkIsOpen ? "open" : ""} ${
            darkTheme ? "dark" : "light"
          }`}
        >
          <AddWalkContainer></AddWalkContainer>
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
// - walkid - sequence, will be automatically populated | HOWEVER, this will need to be passed through to the photo upload function, so that the photo can be associated with the walk. Therefore, when the POST request is made to the Walks table, the walkid will need to be returned, so that it can be passed through to the photo upload function.

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
// approved - will be false by default, and will be set to true by an admin user - no need for it to be included in the form.

// Photo will also need to be attached as well. This means we making use of uploadPhotosController.js, supabaseBucketUploader.js, supabaseStorageHelper.js and supabaseDbInserter.js.
// The photo will be uploaded to the uploads table, and the url will be passed to the Walks table, as photopath.

// Will need to build out the UI with advanced error handling

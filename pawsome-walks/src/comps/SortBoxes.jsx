import { useEffect } from "react";
export default function SortBoxes({ sortProps }) {
  const {
    isSorted,
    setIsSorted,
    distanceSort,
    setDistanceSort,
    nameSort,
    setNameSort,
  } = sortProps;

  const handleChange = () => {
    setIsSorted(!isSorted);
  };

  const handleDistanceCheckboxChange = () => {
    if (isSorted) {
      setIsSorted(false);

      if (distanceSort) {
        setDistanceSort(false);
      }
      if (!distanceSort) {
        setDistanceSort(true);
      }
    }
    if (!isSorted) {
      setIsSorted(true);
      if (distanceSort) {
        setDistanceSort(false);
      }
      if (!distanceSort) {
        setDistanceSort(true);
      }
    }
  };

  const handleNameCheckboxChange = () => {
    console.log("handleNameCheckboxChange called");
    if (isSorted) {
      console.log("isSorted is true");
      setIsSorted(false);
      console.log("setIsSorted called with false");
      if (nameSort) {
        console.log("nameSort is true");
        setNameSort(false);
        console.log("setNameSort called with false");
      }
      if (!nameSort) {
        console.log("nameSort is false");
        setNameSort(true);
        console.log("setNameSort called with true");
      }
    }
    if (!isSorted) {
      console.log("isSorted is false");
      setIsSorted(true);
      console.log("setIsSorted called with true");
      if (nameSort) {
        console.log("nameSort is true");
        setNameSort(false);
        console.log("setNameSort called with false");
      }
      if (!nameSort) {
        console.log("nameSort is false");
        setNameSort(true);
        console.log("setNameSort called with true");
      }
    }
  };

  return (
    <>
      <label>
        <input
          type="checkbox"
          id="sortByDistance"
          value="true"
          onChange={handleDistanceCheckboxChange}
          checked={distanceSort}
        />
        Sort By Distance
      </label>
      <label>
        <input
          type="checkbox"
          id="sortByName"
          value="true"
          onChange={handleNameCheckboxChange}
          checked={nameSort}
        />
        Sort Alphabetically
      </label>
    </>
  );
}

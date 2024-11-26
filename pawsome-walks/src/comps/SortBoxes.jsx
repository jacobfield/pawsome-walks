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
    setDistanceSort(!distanceSort);
    setNameSort(false);
    setIsSorted(!distanceSort);
  };

  const handleNameCheckboxChange = () => {
    setNameSort(!nameSort);
    setDistanceSort(false);
    setIsSorted(!nameSort);
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

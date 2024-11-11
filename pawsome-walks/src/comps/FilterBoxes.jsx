import { useState, useEffect } from "react";
import useFilterBoxes from "../hooks/useFilterBoxes";
export default function FilterBoxes({ allWalks }) {
  const [filteredWalks, setFilteredWalks] = useState(allWalks);
  const [currentWalk, setCurrentWalk] = useState("All");

  // allWalks.flatMap((walk) => walk.walktype) flattens the walktype arrays into one array.
  // new Set changes it to a set, which removes duplicates.
  // the Spread operator (...) converts the set back into an array
  const walkTypeArr = [...new Set(allWalks.flatMap((walk) => walk.walktype))];

  const handleFilterChange = (e) => {
    let filterValue = e.target.value;
    setCurrentWalk(filterValue);
  };

  useFilterBoxes(currentWalk, setFilteredWalks, allWalks);

  return (
    <div className="filterBoxesContainer">
      <select onChange={handleFilterChange}>
        {walkTypeArr.map((walktype) => (
          <option key={walktype} value={walktype}>
            {walktype}
          </option>
        ))}
      </select>
    </div>
  );
}

// build out the form, and the select options / checkboxes
// create state that is passed down to useFilterBoxes, which declares what it is that allWalks is being filtered by: eg. walktype, parking, scenic, etc.
// create a handleChange function that will update the state with the value of the select option / checkbox

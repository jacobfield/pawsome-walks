import { useState, useEffect } from "react";
import useFilterBoxes from "../hooks/useFilterBoxes";
export default function FilterBoxes({ allWalks }) {
  const [filteredWalks, setFilteredWalks] = useState(allWalks);
  const [currentWalk, setCurrentWalk] = useState("All");
  const [filterType, setFilterType] = useState("");

  // allWalks.flatMap((walk) => walk.walktype) flattens the walktype arrays into one array.
  // new Set changes it to a set, which removes duplicates.
  // the Spread operator (...) converts the set back into an array
  const walkTypeArr = [...new Set(allWalks.flatMap((walk) => walk.walktype))];

  const handleFilterChange = (e) => {
    let filterValue = e.target.value;
    let filterType = e.target.id;
    setCurrentWalk(filterValue);
    setFilterType(filterType);
  };

  useFilterBoxes(currentWalk, setFilteredWalks, allWalks);

  return (
    <div className="filterBoxesContainer">
      <select onChange={handleFilterChange} id="walktype">
        {walkTypeArr.map((walktype) => (
          <option key={walktype} value={walktype}>
            {walktype}
          </option>
        ))}
      </select>
      <button
        type="checkbox"
        id="offleadareas"
        value="true"
        onClick={handleFilterChange}
      >
        Off Lead Areas
      </button>
      <button
        type="checkbox"
        id="paths"
        value="true"
        onClick={handleFilterChange}
      >
        Paved routes
      </button>
      <button
        type="checkbox"
        id="animalsonroute"
        value="true"
        onClick={handleFilterChange}
      >
        Animals On Route
      </button>
      <button
        type="checkbox"
        id="toilets"
        value="true"
        onClick={handleFilterChange}
      >
        Toilets Available
      </button>
      <button
        type="checkbox"
        id="wateronroute"
        value="true"
        onClick={handleFilterChange}
      >
        Water On Route
      </button>
      <button
        type="checkbox"
        id="scenic"
        value="true"
        onClick={handleFilterChange}
      >
        Scenic Views
      </button>
      <select onChange={handleFilterChange} id="parking">
        <option value="free">Free Parking</option>
        <option value="paid">Paid Parking</option>
      </select>
    </div>
  );
}

// build out the form, and the select options / checkboxes
// create state that is passed down to useFilterBoxes, which declares what it is that allWalks is being filtered by: eg. walktype, parking, scenic, etc.
// create a handleChange function that will update the state with the value of the select option / checkbox

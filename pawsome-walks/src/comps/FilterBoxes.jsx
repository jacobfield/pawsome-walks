import { useState } from "react";
import useFilterBoxes from "../hooks/useFilterBoxes";

export default function FilterBoxes({
  allWalks,
  setFilteredWalks,
  filteredWalks,
}) {
  const [currentWalk, setCurrentWalk] = useState("All");
  const [filterType, setFilterType] = useState("");

  const walkTypeArr = [...new Set(allWalks.flatMap((walk) => walk.walktype))];

  const handleFilterChange = (e) => {
    let filterValue = e.target.value;
    let filterType = e.target.id;
    setCurrentWalk(filterValue);
    setFilterType(filterType);
  };

  useFilterBoxes(currentWalk, setFilteredWalks, allWalks, filterType);

  return (
    <div className="filterBoxesContainer">
      <select onChange={handleFilterChange} id="walktype">
        {walkTypeArr.map((walktype) => (
          <option key={walktype} value={walktype}>
            {walktype}
          </option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          id="offleadareas"
          value="true"
          onClick={handleFilterChange}
        />
        Off Lead Areas
      </label>

      <label>
        <input
          type="checkbox"
          id="paths"
          value="true"
          onClick={handleFilterChange}
        />
        Paved Routes
      </label>

      <label>
        <input
          type="checkbox"
          id="animalsonroute"
          value="true"
          onClick={handleFilterChange}
        />
        Animals On Route
      </label>

      <label>
        <input
          type="checkbox"
          id="toilets"
          value="true"
          onClick={handleFilterChange}
        />
        Toilets Available
      </label>

      <label>
        <input
          type="checkbox"
          id="wateronroute"
          value="true"
          onClick={handleFilterChange}
        />
        Water On Route
      </label>

      <label>
        <input
          type="checkbox"
          id="scenic"
          value="true"
          onClick={handleFilterChange}
        />
        Scenic Views
      </label>

      <select onChange={handleFilterChange} id="parking">
        <option value="free">Free Parking</option>
        <option value="paid">Paid Parking</option>
      </select>
    </div>
  );
}

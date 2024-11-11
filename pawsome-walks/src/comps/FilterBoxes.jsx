import { useState } from "react";
import useFilterBoxes from "../hooks/useFilterBoxes";

export default function FilterBoxes({
  allWalks,
  setFilteredWalks,
  filteredWalks,
  setIsFiltered,
}) {
  const [currentWalk, setCurrentWalk] = useState("All");
  const [filterType, setFilterType] = useState("");

  const walkTypeArr = [...new Set(allWalks.flatMap((walk) => walk.walktype))];

  const handleFilterChange = (e) => {
    let filterType = e.target.id;
    setFilterType(filterType);

    if (e.target.type === "checkbox") {
      const filterValue = e.target.checked ? true : "All";
      setCurrentWalk(filterValue);
    } else {
      let filterValue = e.target.value;
      setCurrentWalk(filterValue);
    }
    setIsFiltered(true);
  };

  useFilterBoxes(currentWalk, setFilteredWalks, allWalks, filterType);

  return (
    <div className="filterBoxesContainer">
      <select onChange={handleFilterChange} id="walktype">
        <option value="All">Walk Type</option>
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
          onChange={handleFilterChange}
        />
        Off Lead Areas
      </label>

      <label>
        <input
          type="checkbox"
          id="paths"
          value="true"
          onChange={handleFilterChange}
        />
        Paved Routes
      </label>

      <label>
        <input
          type="checkbox"
          id="animalsonroute"
          value="true"
          onChange={handleFilterChange}
        />
        Animals On Route
      </label>

      <label>
        <input
          type="checkbox"
          id="toilets"
          value="true"
          onChange={handleFilterChange}
        />
        Toilets Available
      </label>

      <label>
        <input
          type="checkbox"
          id="wateronroute"
          value="true"
          onChange={handleFilterChange}
        />
        Water On Route
      </label>

      <label>
        <input
          type="checkbox"
          id="scenic"
          value="true"
          onChange={handleFilterChange}
        />
        Scenic Views
      </label>

      <select onChange={handleFilterChange} id="parking">
        <option value="All">Parking available</option>
        <option value="free">Free Parking</option>
        <option value="paid">Paid Parking</option>
      </select>
    </div>
  );
}

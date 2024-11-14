import { useState, useContext } from "react";
import useFilterBoxes from "../hooks/useFilterBoxes";
import { ThemeContext } from "./ThemeProvider";
export default function FilterBoxes({
  allWalks,
  setFilteredWalks,
  setIsFiltered,
  filterIsOpen,
}) {
  const { darkTheme } = useContext(ThemeContext);
  const [filters, setFilters] = useState({
    walktype: "All",
    offleadareas: false,
    paths: false,
    animalsonroute: false,
    toilets: false,
    wateronroute: false,
    scenic: false,
    parking: "All",
  });
  const walkTypeArr = [...new Set(allWalks.flatMap((walk) => walk.walktype))];

  const handleFilterChange = (e) => {
    let filterType = e.target.id;
    let filterValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: filterValue,
    }));

    setIsFiltered(true);
  };

  useFilterBoxes(filters, setFilteredWalks, allWalks);

  return (
    <>
      <div className={`filterSlide ${filterIsOpen ? "open" : ""}`}>
        <div className={`filterBoxesContainer ${darkTheme ? "dark" : "light"}`}>
          <select onChange={handleFilterChange} id="walktype">
            <option value="All">Walk Type?</option>
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
              checked={filters.offleadareas}
            />
            Off Lead Areas
          </label>

          <label>
            <input
              type="checkbox"
              id="paths"
              value="true"
              onChange={handleFilterChange}
              checked={filters.paths}
            />
            Paved Routes
          </label>

          <label>
            <input
              type="checkbox"
              id="animalsonroute"
              value="true"
              onChange={handleFilterChange}
              checked={filters.animalsonroute}
            />
            Animals On Route
          </label>

          <label>
            <input
              type="checkbox"
              id="toilets"
              value="true"
              onChange={handleFilterChange}
              checked={filters.toilets}
            />
            Toilets Available
          </label>

          <label>
            <input
              type="checkbox"
              id="wateronroute"
              value="true"
              onChange={handleFilterChange}
              checked={filters.wateronroute}
            />
            Water On Route
          </label>

          <label>
            <input
              type="checkbox"
              id="scenic"
              value="true"
              onChange={handleFilterChange}
              checked={filters.scenic}
            />
            Scenic Views
          </label>

          <select onChange={handleFilterChange} id="parking">
            <option value="All">Parking available?</option>
            <option value="free">Free parking</option>
            <option value="paid">Paid parking</option>
          </select>
        </div>
      </div>
    </>
  );
}

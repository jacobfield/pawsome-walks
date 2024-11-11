import { useState, useEffect } from "react";
import useFilterBoxes from "../hooks/useFilterBoxes";
export default function FilterBoxes({ allWalks }) {
  const [filteredWalks, setFilteredWalks] = useState(allWalks);
  const [currentWalk, setCurrentWalk] = useState("All");

  const handleChange = (e) => {
    let filterValue = e.target.value;
    setCurrentWalk(filterValue);
  };
  useFilterBoxes(currentWalk, setFilteredWalks, allWalks);

  return <></>;
}

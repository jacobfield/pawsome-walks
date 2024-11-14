import { useEffect } from "react";

export default function useFilterBoxes(filters, setFilteredWalks, allWalks) {
  useEffect(() => {
    let filtered = allWalks;

    Object.entries(filters).forEach(([filterType, filterValue]) => {
      // Only filter if the value is not the default
      if (filterValue !== "All" && filterValue !== false) {
        filtered = filtered.filter((walk) => {
          switch (filterType) {
            case "walktype":
              return (
                walk.walktype === filterValue ||
                walk.walktype.includes(filterValue)
              );
            case "offleadareas":
              return walk.offleadareas === filterValue;
            case "paths":
              return walk.paths === filterValue;
            case "animalsonroute":
              return walk.animalsonroute === filterValue;
            case "toilets":
              return walk.toilets === filterValue;
            case "wateronroute":
              return walk.wateronroute === filterValue;
            case "scenic":
              return walk.scenic === filterValue;
            case "parking":
              return (
                walk.parking === filterValue ||
                walk.parking.includes(filterValue)
              );
            default:
              return true;
          }
        });
      }
    });
    // console.log("filtered", filtered);
    setFilteredWalks(filtered);
  }, [filters, allWalks, setFilteredWalks]);
}

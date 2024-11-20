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

// When a filter is clicked for the first time, isFiltered is set to true. This triggers a rerender of the page, and removes any to be approved walks. I need it to only set isFiltered to true if a filter is clicked, not on the first render.

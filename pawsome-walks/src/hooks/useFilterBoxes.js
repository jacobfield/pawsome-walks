import { useEffect } from "react";

export default function useFilterBoxes(
  currentWalk,
  setFilteredWalks,
  allWalks,
  filterType
) {
  // MAKE SWITCH STATEMENT FOR FILTER TYPE
  useEffect(() => {
    if (currentWalk === "All") {
      setFilteredWalks(allWalks);
    } else {
      const filtered = allWalks.filter((walk) => {
        switch (filterType) {
          case "walktype":
            return (
              walk.walktype == currentWalk ||
              walk.walktype.includes(currentWalk)
            );
          case "offleadareas":
            return walk.offleadareas == currentWalk;
          case "paths":
            return walk.paths == currentWalk;
          case "animalsonroute":
            return walk.animalsonroute == currentWalk;
          case "toilets":
            return walk.toilets == currentWalk;
          case "wateronroute":
            return walk.wateronroute == currentWalk;
          case "scenic":
            return walk.scenic == currentWalk;
          case "parking":
            return (
              walk.parking == currentWalk || walk.parking.includes(currentWalk)
            );
          default:
            return allWalks;
        }
      });
      console.log("Filtered", filtered);
      setFilteredWalks(filtered);
    }
  }, [currentWalk, filterType, allWalks, setFilteredWalks]);
}

// Might just need to make the 'value' for each of the boolean options a boolean, and then when the filter checks it will just return the ones with matching truthy values.
// walktype and parking will need to be select options

// for the true / false, at the moment, is it just filtering by the first true / false value that it finds?
// So, if it is intended to be walk.scenic, and is set to true, would it just filter walk.offleadareas first, seeing as it is the first true / false value in the list?
// potentially this is not built to handle different sources of input, maybe will have to go through a type filter before going on to the secondary filter?

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
        return (
          walk.walktype == currentWalk ||
          walk.walkType.includes(currentWalk) ||
          walk.offleadareas == currentWalk || // true or false
          walk.paths == currentWalk || // true or false
          walk.animalsonroute == currentWalk || // true or false
          walk.toilets == currentWalk || // true or false
          walk.wateronroute == currentWalk || // true or false
          walk.scenic == currentWalk || // true or false
          walk.parking == currentWalk ||
          walk.parking.includes(currentWalk)
        );
      });
      setFilteredWalks(filtered);
    }
  }, [currentWalk]);
}

// Might just need to make the 'value' for each of the boolean options a boolean, and then when the filter checks it will just return the ones with matching truthy values.
// walktype and parking will need to be select options

// for the true / false, at the moment, is it just filtering by the first true / false value that it finds?
// So, if it is intended to be walk.scenic, and is set to true, would it just filter walk.offleadareas first, seeing as it is the first true / false value in the list?
// potentially this is not built to handle different sources of input, maybe will have to go through a type filter before going on to the secondary filter?

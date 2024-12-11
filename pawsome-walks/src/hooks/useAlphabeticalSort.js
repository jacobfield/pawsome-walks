import { useEffect } from "react";

export default function useAlphabeticalSort(
  walks,
  setSortedWalks,
  isSorted,
  distanceSort,
  nameSort
) {
  useEffect(() => {
    if (isSorted && nameSort && !distanceSort) {
      const sortByName = () => {
        const walksCopy = [...walks];
        console.log("walksCopy", walksCopy);
        const walksSortedByName = walksCopy
          .filter((walk) => walk.walkname && typeof walk.walkname === "string")
          .sort((a, b) => a.walkname.localeCompare(b.walkname));
        setSortedWalks(walksSortedByName);
        console.log("walksSortedByName", walksSortedByName);
      };
      sortByName();
    }
  }, [walks, isSorted, nameSort, distanceSort, setSortedWalks]);

  useEffect(() => {
    // console.log("final isSorted", isSorted);
    // console.log("final nameSort", nameSort);
  }, [isSorted, nameSort]);
}

import { useEffect } from "react";

export default function useSortByName(sortBy, allWalks, setSortedWalks) {
  useEffect(() => {
    if (sortBy === "name") {
      const sortedByName = [...allWalks].sort((a, b) =>
        a.walkname.localeCompare(b.walkname)
      );
      setSortedWalks(sortedByName);
    }
  }, [sortBy, allWalks, setSortedWalks]);
}

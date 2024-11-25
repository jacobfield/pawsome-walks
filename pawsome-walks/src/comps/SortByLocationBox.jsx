import { useState, useEffect } from "react";
import calculateDistance from "../hooks/calculateDistance";

export default function SortByLocationBox({ sortProps }) {
  const { isSorted, setIsSorted, sortedWalks, setSortedWalks, allWalks } =
    sortProps;

  // State to store user's coordinates
  const [userCoordinates, setUserCoordinates] = useState({
    latitude: null,
    longitude: null,
    success: null,
  });

  // Fetch user's location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            success: true,
          });
        },
        (error) => {
          console.error("Error retrieving geolocation:", error);
          setUserCoordinates({ success: false });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setUserCoordinates({ success: false });
    }
  }, []);

  // Sort walks by distance
  useEffect(() => {
    console.log("Sorting walks by location...");
    if (
      isSorted &&
      userCoordinates.success &&
      userCoordinates.latitude !== null
    ) {
      console.log("User coordinates valid. Sorting...");
      const sortedByDistance = [...allWalks].sort((a, b) => {
        const distanceA = calculateDistance(
          parseFloat(a.lat),
          parseFloat(a.lng),
          userCoordinates.latitude,
          userCoordinates.longitude
        );
        const distanceB = calculateDistance(
          parseFloat(b.lat),
          parseFloat(b.lng),
          userCoordinates.latitude,
          userCoordinates.longitude
        );
        console.log(`Distances: ${distanceA} vs ${distanceB}`);
        return distanceA - distanceB;
      });
      setSortedWalks(sortedByDistance);
    } else if (!isSorted) {
      console.log("Sorting disabled. Resetting...");
      setSortedWalks(allWalks);
    }
  }, [isSorted, userCoordinates, allWalks, setSortedWalks]);

  // Toggle sorting
  function toggleSorted() {
    setIsSorted(!isSorted);
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          id="sortByLocation"
          checked={isSorted}
          onChange={toggleSorted}
          disabled={!userCoordinates.success} // Disable if geolocation fails
        />
        Sort by Location?
      </label>
    </div>
  );
}

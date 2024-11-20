import { useEffect } from "react";
import calculateDistance from "./calculateDistance";

export default function useDistanceFromUser(
  sortedWalks,
  setSortedWalks,
  isSorted
) {
  useEffect(() => {
    function fetchUserLocationAndCalculateDistances() {
      if (!Array.isArray(sortedWalks) || sortedWalks.length === 0) {
        // console.warn("No walks to process.");Main.jsx: Walks to display
        return;
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            console.log("userLat", userLat);
            console.log("userLng", userLng);
            const walksWithDistances = sortedWalks.map((walk) => {
              const distance = calculateDistance(
                walk.lat,
                walk.lng,
                userLat,
                userLng
              );

              return { ...walk, distanceToUser: distance };
            });

            const sortedBydistance = walksWithDistances.sort(
              (a, b) => a.distanceToUser - b.distanceToUser
            );

            console.log("Updated sortedWalks with distances:", sortedWalks);
            setSortedWalks(sortedBydistance);
            console.log("Updated ordered walks:", sortedBydistance);
          },
          (error) => {
            console.error("Error getting user's location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
    fetchUserLocationAndCalculateDistances();
  }, [isSorted]);
}

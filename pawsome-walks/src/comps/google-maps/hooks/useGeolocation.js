import { useEffect, useState } from "react";

export default function useGeolocation(lat, lng) {
  // Initializing state
  const [coordinates, setCoordinates] = useState({
    latitude: lat,
    longitude: lng,
    success: null,
  });

  // Using useEffect to run the geolocation logic once the component mounts
  useEffect(() => {
    // Checking if the browser supports geolocation
    if (navigator.geolocation) {
      // If supported, get the current position
      navigator.geolocation.getCurrentPosition(success, error);
    }

    // Success callback function for geolocation
    function success(position) {
      // Extracting latitude and longitude from the position object
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Updating the state with the retrieved coordinates
      setCoordinates({ latitude, longitude, success: true });
    }

    // Error callback function for geolocation
    function error() {
      const latitude = coordinates.latitude;
      const longitude = coordinates.longitude;

      setCoordinates({ latitude, longitude, success: false });
    }
  }, []);

  // Returning the coordinates from the hook
  return coordinates;
}
// Retrieving location data from user definitely working
// Coordinates are set correctly to the default values when location isn't active
// They are getting passed back correctly
// Map is loading them as the correct initial location
// However the searchLocation - set to Barnes Park - is then immediately being loaded

// Plan:
// 1) create custom hook (useReverseGeolocation) that is passed coordinates from useGeolocation
// 2) return newly returned place and pass it in as initial searchLocation in Map.jsx
// 3) Test that the map is now loading the correct location

// Alternate Plan:
// 1) find url string that takes coordinates
// 2) if useGeolocation can return coordinates, initially search using those coordinates
// 3) else use default searchLocation - Hayfield House
// 4) run this at top level useEffect with an if else statement in Map.jsx
//  where if user location is found, use that, else use default searchLocation
// 5) Ensure that user search function is always possible - which it should be, so long as the initial location is only run once,
// then its search location all the way

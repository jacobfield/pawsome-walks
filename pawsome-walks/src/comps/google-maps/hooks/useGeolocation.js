import { useEffect, useState } from "react";

export default function useGeolocation() {
  // Initializing state
  const [coordinates, setCoordinates] = useState({
    latitude: 53.20126,
    longitude: -1.43371,
    success: null,
  });

  // Using useEffect to run the geolocation logic once the component mounts
  useEffect(() => {
    // Checking if the browser supports geolocation
    if (navigator.geolocation) {
      // If supported, get the current position
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      // If not supported, log a message and set default coordinates
      console.log("Geolocation not supported - using default location");
      // setCoordinates({ latitude: 51.508114, longitude: -0.075949 });
    }

    // Success callback function for geolocation
    function success(position) {
      // Extracting latitude and longitude from the position object
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Logging the coordinates
      console.log("Successfully retrieved location");
      // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      // Updating the state with the retrieved coordinates
      setCoordinates({ latitude, longitude, success: true });
    }

    // Error callback function for geolocation
    function error() {
      // Logging an error message and setting default coordinates
      console.log("Unable to retrieve your location - using default location");
      const latitude = coordinates.latitude;
      const longitude = coordinates.longitude;
      // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      // Updating the state with the default coordinates
      setCoordinates({ latitude, longitude, success: false });
      console.log("G'day Mate - Welcome to Australia!");
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

import { useState, useEffect } from "react";

export default function useReverseGeolocation(latitude, longitude, success) {
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    if (!success) return;
    // console.log("useReverseGeolocation If/Else is running");

    async function geocodeLatLng(latitude, longitude) {
      //   console.log(
      //     "geocodeLatLng function is running within useReverseGeolocation"
      //   );
      // console.log("Success registered in useReverseGeolocation");
      try {
        const geocoder = new google.maps.Geocoder();
        const latlng = {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        };
        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK" && results[0]) {
            setLocationName(results[0].formatted_address);
          } else {
            console.error("Geocoder failed due to: " + status);
          }
        });
      } catch (error) {
        console.error("Error connecting to Google Maps API: " + error);
      }
    }

    geocodeLatLng(latitude, longitude);
  }, [latitude, longitude, success]);

  return locationName;
}

import { useEffect, useState } from "react";

const useReverseGeolocation = (lat, lng, success) => {
  const [locationName, setLocationName] = useState("");

  useEffect(() => {

    if (!success || !lat || !lng) return;

    const geocodeLatLng = () => {
      if (!window.google || !google.maps) {
        console.error("Google Maps API is not available.");
        return;
      }

      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {

            setLocationName(results[0].formatted_address);
          } else {
            console.log("No results found");
          }
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    };

    geocodeLatLng();
  }, [lat, lng, success]);

  return locationName;
};

export default useReverseGeolocation;

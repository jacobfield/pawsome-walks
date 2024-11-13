import { useEffect, useState } from "react";

export default function useGetLatLng(walkNameAndLocation) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat, lng });

  try {
    useEffect(() => {
      if (!walkNameAndLocation) return;

      const latitude = walkNameAndLocation.coords.latitude;
      const longitude = walkNameAndLocation.coords.longitude;
    }, [walkNameAndLocation]);
  } catch (error) {
    console.error(
      "Error extracting coordinates from walkNameAndLocation (useGetLatLan)",
      error
    );
  }
}

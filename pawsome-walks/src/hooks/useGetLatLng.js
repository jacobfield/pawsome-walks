import { useEffect, useState } from "react";

export default function useGetLatLng(walkNameAndLocation) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat, lng });

  try {
    useEffect(() => {
      if (!walkNameAndLocation) return;
    }, [walkNameAndLocation]);
  } catch (error) {
    console.error(
      "Error extracting coordinates from walkNameAndLocation (useGetLatLan)",
      error
    );
  }
}

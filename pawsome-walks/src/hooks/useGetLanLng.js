import { useEffect, useState } from "react";

export default function useGetLatLng(location) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat, lng });
  
}

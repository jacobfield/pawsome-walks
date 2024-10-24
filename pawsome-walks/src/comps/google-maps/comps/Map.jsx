import { useState, useEffect, useRef } from "react";
import useReverseGeolocation from "../hooks/useReverseGeolocation";
import MapSearch from "./MapSearch";
import loadGoogleMaps from "../utils/loadGoogleMaps"; // Ensure loadGoogleMaps function is imported
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function Map({
  success,
  latitude,
  longitude,
  walkName,
  walkLocation,
  walkType,
}) {
  // Declare state variables
  const [searchLocation, setSearchLocation] = useState("Derbyshire");
  const [locationAccess, setLocationAccess] = useState(false);
  const [input, setInput] = useState("");

  const mapRef = useRef(null);
  const serviceRef = useRef(null);
  const infowindowRef = useRef(null);

  // Handle input changes for the search
  const handleChange = (e) => setInput(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchLocation(input);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const props = {
    searchLocation,
    setSearchLocation,
    input,
    setInput,
    handleChange,
    handleSubmit,
    handleEnter,
  };

  const revGeoLocStr = useReverseGeolocation(latitude, longitude, success);

  // Manage geolocation permission state
  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          setLocationAccess(true);
        }
        permissionStatus.onchange = () => {
          setLocationAccess(permissionStatus.state === "granted");
        };
      });
  }, []);


  // Initialize the map
  useEffect(() => {
    const loadGoogleMapsScript = async () => {
      try {
        // Load Google Maps API
        await loadGoogleMaps();

        // Ensure the Google Maps object is available
        if (typeof google !== "undefined" && google.maps) {
          const initialLocation = new google.maps.LatLng(latitude, longitude);
          const map = new google.maps.Map(document.getElementById("map"), {
            center: initialLocation,
            zoom: 16,
            mapId: "DEMO_MAP_ID", // Must be added for advanced markers
            mapTypeId: google.maps.MapTypeId.HYBRID,
          });

          const infowindow = new google.maps.InfoWindow();
          const service = new google.maps.places.PlacesService(map);

          mapRef.current = map;
          serviceRef.current = service;
          infowindowRef.current = infowindow;

          // Create and add marker for the walk location
          const marker = new google.maps.Marker({
            position: initialLocation,
            map: map,
            title: walkName,
          });

          marker.addListener("click", () => {
            const contentString = `
              <div style="font-family: Arial, sans-serif; width: 220px;">
                <h3 style="margin: 0; color: #007BFF;">${walkName}</h3>
                <p style="margin: 5px 0; color: #000;"><strong>Location:</strong> ${walkLocation}</p>
                <p style="margin: 5px 0; color: #000;"><strong>Type:</strong> ${walkType.join(
                  ", "
                )}</p>
                <br />
                <p style="margin: 5px 0; color: #000;"><strong>Coordinates:</strong></p>
                <ul style="padding-left: 15px; list-style-type: none; color: #000;">
                  <li><strong>Latitude:</strong> ${latitude}</li>
                  <li><strong>Longitude:</strong> ${longitude}</li>
                </ul>
              </div>
            `;
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
          });

          // Update map location based on geolocation success or search
          if (success) {
            updateMapLocation(revGeoLocStr);
            // console.log("Geolocation successful - Updating to user's location");
          } else {
            updateMapLocation(searchLocation);
          }
        }
      } catch (error) {
        console.error("Error loading Google Maps: ", error);

      }
    };

    loadGoogleMapsScript();
  }, [latitude, longitude, success, revGeoLocStr, searchLocation]);

  // Update the map location based on the user's search or geolocation
  useEffect(() => {
    if (mapRef.current && serviceRef.current) {
      updateMapLocation(searchLocation);
    }
    // console.log("Updated search location:", searchLocation);
  }, [searchLocation]);

  const updateMapLocation = (location) => {
    const request = {
      query: location,
      fields: ["name", "geometry"],
    };

    serviceRef.current.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach((place) => {
          createMarker(place, mapRef.current, infowindowRef.current);
        });
        mapRef.current.setCenter(results[0].geometry.location);
      }
    });
  };

  // Create marker function
  const createMarker = (place, map, infowindow) => {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name || "Location",
    });

    marker.addListener("click", () => {
      infowindow.setContent(place.name || "");
      infowindow.open(map, marker);
    });
  };

  return (
    <>
      <div id="map" style={{ height: "400px", width: "100vw" }}></div>
    </>
  );
}

import { geocode, RequestType, setDefaults, setKey } from "react-geocode";

export default async function getLatLng(walkNameAndLocation) {
  // Set the API key independently
  setKey(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  // Set other default options
  setDefaults({
    language: "en", // Default language for responses.
    region: "uk", // Default region for responses (UK).
  });

  if (!walkNameAndLocation.walkname || !walkNameAndLocation.location) {
    return { lat: null, lng: null };
  }

  try {
    const addressString = `${walkNameAndLocation.walkname}, ${walkNameAndLocation.location}`;
    const { results } = await geocode(RequestType.ADDRESS, addressString);
    const { lat, lng } = results[0].geometry.location;
    console.log(" getLatLng lat", lat);
    console.log(" getLatLng lng", lng);
    return { lat, lng };
  } catch (error) {
    console.error(
      "Error extracting coordinates from walkNameAndLocation (useGetLatLng)",
      error
    );
    alert(
      "Error finding a walk with that name and location. Please try again, and be more specific."
    );
    return { lat: null, lng: null };
  }
}

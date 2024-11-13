import { geocode, RequestType } from "react-geocode";
//
export default async function getLatLng(walkNameAndLocation) {
  if (!walkNameAndLocation.walkname || !walkNameAndLocation.location)
    return { lat: null, lng: null };

  try {
    const addressString = `${walkNameAndLocation.walkname}, ${walkNameAndLocation.location}`;
    const { results } = await geocode(RequestType.ADDRESS, addressString);
    const { lat, lng } = results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error(
      "Error extracting coordinates from walkNameAndLocation (useGetLatLan)",
      error
    );
    return { lat: null, lng: null };
  }
}

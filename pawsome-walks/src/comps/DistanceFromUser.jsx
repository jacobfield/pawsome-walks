import useGeolocation from "./google-maps/hooks/useGeolocation";
import calculateDistance from "../hooks/calculateDistance";
export default function DistanceFromUser({ walk }) {
  const walkLat = walk.lat;
  const walkLng = walk.lng;

  const userCoordinates = useGeolocation(walkLat, walkLng);
  const { latitude, longitude, success } = userCoordinates;
  const userLat = latitude;
  const userLng = longitude;

  const distance = calculateDistance(walkLat, walkLng, userLat, userLng);
  return (
    <div className="onOfferContainer">
      <h3 className="onOfferHeader">{walk.walkname} is</h3>
      <ul className="onOfferList">
        <li>
          <span className="distance">{distance}</span> miles
        </li>
        <br></br>
        <li>from your current location</li>
      </ul>
    </div>
  );
}

// import use geolocaiton
// return users current location as coordinates
//figure out distance from user to walk in miles
// display distance from user in miles on walk detail page, via DistanceFromUser comp.

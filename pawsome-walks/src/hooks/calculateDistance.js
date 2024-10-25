// calculate distance using the 'Haversine' formula
export default function calculateDistance(walkLat, walkLng, userLat, userLng) {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const R = 3958.8; //Radius of Earth in miles
  const dLat = toRadians(userLat - walkLat);
  const dLon = toRadians(userLng - walkLng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(walkLat)) *
      Math.cos(toRadians(userLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  const roundedDistance = Math.round(distance * 10) / 10;
  // console.log("distance in miles", roundedDistance);
  return roundedDistance; // distance in miles
}

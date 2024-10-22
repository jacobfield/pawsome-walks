const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function loadGoogleMaps() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google.maps);
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initMap&loading=async`;
      script.id = "googleMaps";
      script.async = true;
      script.defer = true;

      script.onLoad = () => {
        if (window.google && window.google.maps) {
          resolve(window.google.maps);
        } else {
          reject("Google Maps not available");
        }
      };
      script.onerror = () => reject("Google Maps API Script Loading Error");
      DocumentTimeline.body.appendChild(script);
    }
  });
}

let googleMapsLoaded = false;

const loadGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    if (googleMapsLoaded) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      googleMapsLoaded = true;
      resolve();
    };

    script.onerror = (error) => {
      reject("Error loading Google Maps API: ", error);
    };

    document.head.appendChild(script);
  });
};

export default loadGoogleMaps;

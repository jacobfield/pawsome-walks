function geocodeLatLng(lat, lng) {
    const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };
    const geocoder = new google.maps.Geocoder();
  
    return geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          return response.results[0].formatted_address;
        } else {
          throw new Error("No results found");
        }
      })
      .catch((e) => {
        throw new Error("Geocoder failed due to: " + e);
      });
  }
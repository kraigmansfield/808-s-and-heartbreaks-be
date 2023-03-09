Google_Maps_API_Key = 'AIzaSyDuMCSDPuEw8GnQnvkHSN10dMWawij0yMY';


// Check if geolocation is supported by the browser
if (navigator.geolocation) {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(function(position) {
      // Retrieve the latitude and longitude values
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }, function(error) {
      console.log(error);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }


ReverseGeocoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=ROOFTOP&result_type=locality&key=${Google_Maps_API_Key}`

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

//---------------------Secondary method for React----------------------
import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props);
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null
  };
  this.getLocation = this.getLocation.bind(this);
  this.getCoordinates = this.getCoordinates.bind(this);
}

getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
  } else {
    alert("Geolocation is not supported by this browser.")
  }
}

getCoordinates(position) {
  this.setState({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  })
}

handleLocationError (error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      alert = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      alert = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      alert = "An unknown error occurred."
      break;
  }
}

//---------------------------------------------------------------------

ReverseGeocoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=ROOFTOP&result_type=locality&key=${env.process.Google_Maps_API_Key}`


fetch(url)
  .then(response => response.json())
  .then(data => {
    // Retrieve the formatted address from the response
    const city = data.results[0].formatted_address;
    console.log(`The address is in: ${city}`);
    console.log(city);

  })
  .catch(error => console.log(error));
import './App.css';
import React,{useState} from 'react';
// import dotenv from "dotenv";


function App() {
  const [city,setCity] = useState('');
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {

      console.log(position)
      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&location_type=ROOFTOP&result_type=locality&key=${process.env.GOOGLE_MAPS_API_KEY}`
      
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
          // Retrieve the formatted address from the response
          const cityName = data.plus_code.compound_code.split(',')[0].split(' ').splice(1,3).join(' ').trim();
      
          console.log(`The address is in: ${cityName}`);
          console.log(cityName);
      
          setCity(cityName)
        })
        .catch(error => console.log(error));
    })
  })
  return (
    <div className="App">
        <h1>{city}</h1>
    </div>
  );
}


export default App;
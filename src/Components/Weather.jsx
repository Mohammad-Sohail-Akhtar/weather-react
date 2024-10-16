import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import humidity_icon from "../assets/humidity.png"

const Weather = () => {

  const [weatherData, setWeatherData] = useState(false);

  const inputRef = useRef();

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

    const search = async (city) =>{
      // here if you click search button without writing any city name then alert will be shown and program will be stoppedd. And if city name is give then try block will run
      if(city === ""){
        alert("Enter Your City");
        return;
      }

     try {
      // call the api with the use of fetch.
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
  
        const response = await fetch(url);
        const data = await response.json();
      
        // Here if we mistake the spelling of city then it will show alert message.
        if(!response.ok){
          alert(data.message);
          return;
        }
        console.log(data)
        const icon = allIcons[data.
          weather[0].icon] || clear_icon;

          // assigned the data into the setweatherdata.
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.round( data.main.temp),
          location: data.name,
          icon: icon
        })

     } catch (error) {
    setWeatherData(false)
    console.error("Error in fetching data")
    }
   }

   useEffect(()=>{
    search("London");
   },[])

  return (
    <>
      <div className='weather'>
        <div className='search-bar'>
          <input
          ref={inputRef}
            type='text'
            placeholder='Search'
          /> 
          <img onClick={()=>search(inputRef.current.value)} src={search_icon} alt=''/>
        </div>
        {weatherData?<>
          <img src={weatherData.icon} alt='' className='weather-icon'/>
        <p className='temp'>{weatherData.temperature} ºC</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
          <div className='col'>
            <img src={humidity_icon} alt=''/>
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className='col'>
            <img src={wind_icon} alt=''/>
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </>:<></>}
        
      </div>
    </>
  )
}

export default Weather

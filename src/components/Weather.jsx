import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import SearchIcon from "../assets/search.png";
import ClearIcon from "../assets/clear.png";
import CloudIcon from "../assets/cloud.png";
import DrizzleIcon from "../assets/drizzle.png";
import HumidityIcon from "../assets/humidity.png";
import RainIcon from "../assets/rain.png";
import SnowIcon from "../assets/snow.png";
import WindIcon from "../assets/wind.png";

const Weather = () => {
  const InputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": ClearIcon,
    "01n": ClearIcon,
    "02d": CloudIcon,
    "02n": CloudIcon,
    "03d": CloudIcon,
    "03n": CloudIcon,
    "04d": DrizzleIcon,
    "04n": DrizzleIcon,
    "09d": RainIcon,
    "09n": RainIcon,
    "10d": RainIcon,
    "10n": RainIcon,
    "13d": SnowIcon,
    "13n": SnowIcon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Please Enter City Name!");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || ClearIcon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data!!!");
    }
  };

  useEffect(() => {
    search("Tashkent");
  }, []);

  return (
    <div className="weather">
      <div className="search_bar">
        <input ref={InputRef} type="text" placeholder="Search" />
        <img
          src={SearchIcon}
          alt=""
          onClick={() => search(InputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather_icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather_data">
            <div className="col">
              <img src={HumidityIcon} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={WindIcon} alt="" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;

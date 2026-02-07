// components/WeatherIcons.jsx
import React from "react";
import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiThermometer,
} from "react-icons/wi";
import {
  FaTemperatureHigh,
  FaWind,
  FaTint,
  FaCompressAlt,
} from "react-icons/fa";

const WeatherIcons = {
  humidity: WiHumidity,
  wind: WiStrongWind,
  pressure: WiBarometer,
  feels_like: WiThermometer,
  // Alternative avec FontAwesome
  humidityAlt: FaTint,
  windAlt: FaWind,
  pressureAlt: FaCompressAlt,
  feels_likeAlt: FaTemperatureHigh,
};

export const WeatherIcon = ({ type, size = 24, className = "", alt = false }) => {
  const IconComponent = alt 
    ? WeatherIcons[`${type}Alt`] || WeatherIcons[type]
    : WeatherIcons[type];
  
  if (!IconComponent) return null;
  
  return <IconComponent size={size} className={className} />;
};
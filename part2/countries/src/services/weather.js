import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = import.meta.env.VITE_OPENWEATHER_APIKEY;

const getWeather = (lat, lon) =>
  axios
    .get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then((response) => response.data);

export default { getWeather };

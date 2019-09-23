const fillTable = require('./historyTable');
const setLocation = require('./map');
const { addMyHistory, myHistoryData } = require('./searchHistory');
const errorMessage = document.querySelector('.error-message');

const URL_WEATHER = "http://api.weatherstack.com/current";
const KEY_WEATHER = "9e0ef0c0ec3e7f47a8528679289dfc0f";

async function getWeather (cityName) {
    try {
      const data = await fetch(`${URL_WEATHER}?access_key=${KEY_WEATHER}&query=${cityName}`);
      const parsedData = await data.json();
      const { current: { weather_icons, weather_descriptions, temperature, wind_speed}, location: { country, name, lon, lat } } = parsedData;
      addMyHistory ({ country, name, temperature, wind_speed, description: weather_descriptions[0]})
      setLocation (lat, lon, `${name}: ${temperature}&deg<img src="${weather_icons[0]}">`);
      fillTable(myHistoryData);
    } catch (err) {
      errorMessage.innerHTML = 'incorrect city name';
    }
}  

module.exports = getWeather;
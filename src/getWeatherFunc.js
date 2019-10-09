const URL_WEATHER = "http://api.weatherstack.com/current";
const KEY_WEATHER = "9e0ef0c0ec3e7f47a8528679289dfc0f";

async function getWeather (cityName) {
    try {
      const data = await fetch(`${URL_WEATHER}?access_key=${KEY_WEATHER}&query=${cityName}`);
      const parsedData = await data.json();
      return parsedData;
    } catch (err) {
      console.log(err)
    }
}  

module.exports = getWeather;
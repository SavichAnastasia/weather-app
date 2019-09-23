const getWeather = require('./getWeatherFunc');

async function getMyWeather () {
    try {
      const getLocation = new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej)
      })
      
      const { coords: { latitude, longitude } } = await getLocation;
      getWeather(`${latitude}, ${longitude}`);
    } catch (err) {
      alert('your location is not defined');
    }
}
    
module.exports = getMyWeather;
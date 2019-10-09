const getWeather = require('./getWeatherFunc');
const getMyLocation = require('./getMyLocation');
const fillTable = require('./historyTable');
const setLocation = require('./map');
const { addMyHistory, getCurrentHistoryData } = require('./searchHistory');

const form = document.querySelector('form');
const input = document.querySelector('.field');
const errorMessage = document.querySelector('.error-message');
const getMyWeatherBtn= document.querySelector('.get-my-weather');

input.addEventListener('input', function () {
    if (this.classList.contains('red')) {
      this.classList.remove('red');
    }
    errorMessage.innerHTML = ''
  })

form.addEventListener('submit', async function(e) {

    e.preventDefault();

    let cityName = input.value;

    if (cityName) {
      try {
        const {
          current:
              { 
                weather_icons,
                weather_descriptions, 
                temperature, wind_speed
              },
              location: { 
                country, 
                name,
                lon, 
                lat }
              } =  await getWeather(cityName);
        addMyHistory ({ country, name, temperature, wind_speed, description: weather_descriptions[0]})
        setLocation (lat, lon, `${name}: ${temperature}&deg<img src="${weather_icons[0]}">`); 
        const currentHistory = getCurrentHistoryData();
        fillTable(currentHistory)
      } catch {
        errorMessage.innerHTML = 'incorrect city name';
      }
    } else {
      input.classList.add('red');
      errorMessage.innerHTML = 'type a city';
    }
});

getMyWeatherBtn.addEventListener('click', async function (e) {
  e.preventDefault();
  try {
    const myCoords = await getMyLocation();
    const {
      current:
          { 
            weather_icons,
            weather_descriptions, 
            temperature, wind_speed
          },
          location: { 
            country, 
            name,
            lon, 
            lat }
          } = await getWeather(myCoords);
    addMyHistory ({ country, name, temperature, wind_speed, description: weather_descriptions[0]});
    setLocation (lat, lon, `${name}: ${temperature}&deg<img src="${weather_icons[0]}">`); 
    const currentHistory = getCurrentHistoryData();
    fillTable(currentHistory)
  } catch (err) {
    console.log(err)
  }
});
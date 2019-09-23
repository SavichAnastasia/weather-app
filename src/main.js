const getWeather = require('./getWeatherFunc');
const getMyWeather = require('./myWeather');
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

    if (!cityName) {
        input.classList.add('red');
        errorMessage.innerHTML = 'type a city';
        return;
    }

    getWeather(cityName);

});

getMyWeatherBtn.addEventListener('click', function (e) {
  e.preventDefault();
  getMyWeather();
});
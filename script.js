const form = document.querySelector('form');
const input = document.querySelector('.field');
const error_message = document.querySelector('.error_message');
const result = document.querySelector('.result');

const URL_WEATHER = "https://api.apixu.com/v1/current.json";
const KEY_WEATHER = "26d10df7710a4383bda172954190909";

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  
  let city = input.value;

  if (!city) {
    input.classList.add('red');
    error_message.innerHTML = 'type a city';
    return;
  }

  try {
    const data = await fetch(`${URL_WEATHER}?key=${KEY_WEATHER}&q=${city}`);
    const parsedData = await data.json();
    const { current: { condition: { icon }, temp_c}, location: { name } } = parsedData;
    result.innerHTML = `${name}: ${temp_c}&deg<img src="https:${icon}">`;
  } catch (err) {
   error_message.innerHTML = 'incorrect city name';
  }
});

input.addEventListener('input', function () {
  if (this.classList.contains('red')) {
    this.classList.remove('red');
  }
  error_message.innerHTML = ''
})
const form = document.querySelector('form');
const input = document.querySelector('.field');
const error_message = document.querySelector('.error_message');

const URL_WEATHER = "https://api.apixu.com/v1/current.json";
const KEY_WEATHER = "26d10df7710a4383bda172954190909"

const KEY_MAP = 'c0f490ce1a533c';
let marker;
const streets = L.tileLayer.Unwired({key: KEY_MAP, scheme: "streets"});
const map = L.map('map', {
  center: [51.505, -0.09],
  zoom: 7,
  scrollWheelZoom: false,
  layers: [streets] 
});
L.control.scale().addTo(map);

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  
  let city = input.value;

  if (!city) {
    input.classList.add('red');
    error_message.innerHTML = 'type a city';
    return;
  }

  if (marker) {
    marker.remove();
  }

  try {
    const data = await fetch(`${URL_WEATHER}?key=${KEY_WEATHER}&q=${city}`);
    const parsedData = await data.json();
    const { current: { condition: { icon }, temp_c}, location: { name, lon, lat } } = parsedData;
    await map.setView([lat, lon], 7);
    marker = await L.marker([lat, lon]).addTo(map).bindPopup(`${name}: ${temp_c}&deg<img src="https:${icon}">`).openPopup();
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
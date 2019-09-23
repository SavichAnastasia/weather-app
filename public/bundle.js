(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./historyTable":2,"./map":4,"./searchHistory":6}],2:[function(require,module,exports){
const searchHistoryTable = document.querySelector('.search-history-table');
const searchHistoryTableBody = document.querySelector('.search-history-table-body');
const searchHistoryBtn = document.querySelector('.search-history');

function fillTable (data) {
    searchHistoryTableBody.innerHTML = '';
    data.forEach(obj => {
      let tr = `<tr><td>${obj.name}</td><td>${obj.country}</td><td>${obj.temperature}</td><td>${obj.wind_speed}</td><td>${obj.description}</td></tr>`
      searchHistoryTableBody.innerHTML += tr;
    })
  }

  searchHistoryBtn.addEventListener('click', function () {
    searchHistoryTable.classList.toggle('active')
    searchHistoryBtn.classList.toggle('active');
  });

  module.exports = fillTable;
},{}],3:[function(require,module,exports){
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
},{"./getWeatherFunc":1,"./myWeather":5}],4:[function(require,module,exports){
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

function setLocation (lat, lon, message) {
    if (marker) {
        marker.remove();
    }
    map.setView([lat, lon], 7);
    marker = L.marker([lat, lon]).addTo(map).bindPopup(message).openPopup();
}

module.exports = setLocation;
},{}],5:[function(require,module,exports){
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
},{"./getWeatherFunc":1}],6:[function(require,module,exports){
let fillTable = require('./historyTable');
const clearSearchHistoryBtn = document.querySelector('.clear-search-history');
let myHistoryData = [];
(function init () {
    if (localStorage.getItem('myHistoryData')) {
    myHistoryData = JSON.parse(localStorage.getItem('myHistoryData'));
    }
    fillTable(myHistoryData);
})();

function clearMyHistory () {
    localStorage.removeItem('myHistoryData');
    myHistoryData = [];
    fillTable(myHistoryData);
}

function addMyHistory (newItem) {
    checkUniqueKey(myHistoryData, newItem);
    localStorage.setItem('myHistoryData', JSON.stringify(myHistoryData));
}

function checkUniqueKey (arr, newItem) {
    let needToPush = true;
    arr.forEach((item, i) => {
        if (item.name === newItem.name) {
        arr.splice(i, 1, newItem);
        needToPush = false;
        }
    });
    if (needToPush) {
        arr.push(newItem);
    }
};

clearSearchHistoryBtn.addEventListener('click', clearMyHistory); 

module.exports = { addMyHistory, myHistoryData, clearMyHistory };
},{"./historyTable":2}]},{},[3]);

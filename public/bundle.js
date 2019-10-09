(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
async function getMyLocation () {
    try {
      const getLocation = new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej)
      })
      
      const { coords: { latitude, longitude } } = await getLocation;
      return `${latitude}, ${longitude}`;
    } catch (err) {
      alert('your location is not defined');
    }
}
    
module.exports = getMyLocation;
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{"./getMyLocation":1,"./getWeatherFunc":2,"./historyTable":3,"./map":5,"./searchHistory":6}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
    localStorage.setItem('myHistoryData', JSON.stringify(checkUniqueKey(myHistoryData, newItem)));
    myHistoryData = checkUniqueKey(myHistoryData, newItem);
}

const getCurrentHistoryData = () => myHistoryData;          

function checkUniqueKey (arr, newItem) {
    let needToPush = true;
    let newArr = arr.map((item) => {
        if (item.name === newItem.name) {
            needToPush = false;
            return newItem;
        } else return item;
        })
    if (needToPush) {
        newArr.push(newItem);
    }
    return newArr;
};

clearSearchHistoryBtn.addEventListener('click', clearMyHistory); 

module.exports = { addMyHistory, getCurrentHistoryData, clearMyHistory };
},{"./historyTable":3}]},{},[4]);

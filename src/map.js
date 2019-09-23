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
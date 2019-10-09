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
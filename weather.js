/*Weather widget*/
const weather = document.querySelector(".js-weather");
const API_KEY = '90f91896e44f43c199f3f5e3cd5b0259';
const COORDS =  'coords';
function getWeather(lat,lng)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place  = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}
function saveCoords(coordsObj)
{
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError()
{
    console.log('Cant access geo location');
}
function askForCoords()
{
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}
function loadCoords()
{
    const loadedCoord = localStorage.getItem(COORDS);
    if(loadedCoord === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoord);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}
function init()
{
    loadCoords();
}
init();
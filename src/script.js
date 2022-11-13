let time = new Date();
let days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
let day = days[time.getDay()];
let hour = time.getHours();
let minutes = time.getMinutes();
if (minutes < 10){
    minutes = "0"+minutes;
}
if (hour < 10){
    hour = "0"+hour;
}

let dayTime = document.querySelector("#dayTime");
dayTime.innerHTML = `${day} ${hour}:${minutes}`;

function displayTemparature(response){
    let cityName = document.querySelector("#city");
    let desc = document.querySelector("#description");
    let deg = document.querySelector("#degrees");
    let feelLike = document.querySelector("#feelsLike");
    let hum = document.querySelector("#humidity");
    let windVal = document.querySelector("#wind");
    let iconElem = document.querySelector("#icon");
    celsiusTemp = response.data.main.temp;
    
    cityName.innerHTML = `${response.data.name}`;
    desc.innerHTML = `${response.data.weather[0].description}`;
    deg.innerHTML = `${Math.round(response.data.main.temp)}°`;
    feelLike.innerHTML = `feels like: ${Math.round(response.data.main.feels_like)}°C`
    hum.innerHTML = `humidity: ${response.data.main.humidity}%`;
    windVal.innerHTML = `wind: ${response.data.wind.speed} km/h`;
    iconElem.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElem.setAttribute("alt", `${response.data.weather[0].description}`);
}

function DefaultWeather(){
    let city = "Kyiv";
    let apiKey = "64e797c428bddfb60f42d1075443623c";
    let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiWeather).then(displayTemparature);
}
DefaultWeather()

function geoWeather(){
    function getGeo(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let apiKey = "64e797c428bddfb60f42d1075443623c";
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        axios.get(url).then(displayTemparature);
    }
    navigator.geolocation.getCurrentPosition(getGeo);
}
//geoWeather();

function search(event){
    event.preventDefault();
    let city = document.querySelector("#city-input");
    let newCity = document.querySelector("#city");
    if(city.value){
        newCity.innerHTML = `${city.value}`;
    } else {
        alert ("Please input your city");
    }

    let apiKey = "64e797c428bddfb60f42d1075443623c";
    let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
    axios.get(apiWeather).then(displayTemparature);
}
let form = document.querySelector("#input-form");
form.addEventListener("submit", search);

function changeToFarengheit(event){
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrengheitLink.classList.add("active");
    let baseTemp = document.querySelector("#degrees");
    fahrengheitTemp = Math.round((celsiusTemp * 9)/5 + 32);
    baseTemp.innerHTML = `${fahrengheitTemp}°`;
}

function changeToCelsius(event){
    event.preventDefault();
    fahrengheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let baseTemp = document.querySelector("#degrees");
    baseTemp.innerHTML = `${Math.round(celsiusTemp)}°`;
}

let celsiusTemp = null;

let fahrengheitLink = document.querySelector("#fahrengheit");
fahrengheitLink.addEventListener("click", changeToFarengheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius)
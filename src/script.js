let time = new Date();
let days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
let day = days[time.getDay()];
let hour = time.getHours();
let minutes = time.getMinutes();
if (minutes < 10){
    minutes = "0"+minutes;
}

let dayTime = document.querySelector("#dayTime");
dayTime.innerHTML = `${day} ${hour}:${minutes}`;

function displayTemparature(response){
    console.log(response);
    let cityName = document.querySelector("#city");
    cityName.innerHTML = `${response.data.name}`
    let desc = document.querySelector("#description");
    weatherVal = response.data.weather[0];
    desc.innerHTML = `${weatherVal.description}`;
    let deg = document.querySelector("#degrees");
    deg.innerHTML = `${Math.round(response.data.main.temp)}°`;
    let feelLike = document.querySelector("#feelsLike");
    feelLike.innerHTML = `feels like: ${Math.round(response.data.main.feels_like)}°C`
    let hum = document.querySelector("#humidity");
    hum.innerHTML = `humidity: ${response.data.main.humidity}%`;
    let windVal = document.querySelector("#wind");
    windVal.innerHTML = `wind: ${response.data.wind.speed} km/h`;
}

let apiKey = "64e797c428bddfb60f42d1075443623c";
let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=Florence&appid=${apiKey}&units=metric`;


axios.get(apiWeather).then(displayTemparature);
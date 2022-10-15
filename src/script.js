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
    let iconElem = document.querySelector("#icon");
    let cityName = document.querySelector("#city");
    let desc = document.querySelector("#description");
    let deg = document.querySelector("#degrees");
    let feelLike = document.querySelector("#feelsLike");
    let hum = document.querySelector("#humidity");
    let windVal = document.querySelector("#wind");
    
    cityName.innerHTML = `${response.data.name}`;
    desc.innerHTML = `${response.data.weather[0].description}`;
    deg.innerHTML = `${Math.round(response.data.main.temp)}°`;
    feelLike.innerHTML = `feels like: ${Math.round(response.data.main.feels_like)}°C`
    hum.innerHTML = `humidity: ${response.data.main.humidity}%`;
    windVal.innerHTML = `wind: ${response.data.wind.speed} km/h`;
    iconElem.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElem.setAttribute("alt", `${response.data.weatehr[0].description}`);
}

let apiKey = "64e797c428bddfb60f42d1075443623c";
let city = "Kyiv";
let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiWeather).then(displayTemparature);
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
    let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    function displayTemparature(response){
        let cityName = document.querySelector("#city");
        let desc = document.querySelector("#description");
        let deg = document.querySelector("#degrees");
        let feelLike = document.querySelector("#feelsLike");
        let hum = document.querySelector("#humidity");
        let windVal = document.querySelector("#wind");
        let iconElem = document.querySelector("#icon");
        
        cityName.innerHTML = `${response.data.name}`;
        desc.innerHTML = `${response.data.weather[0].description}`;
        deg.innerHTML = `${Math.round(response.data.main.temp)}°`;
        feelLike.innerHTML = `feels like: ${Math.round(response.data.main.feels_like)}°C`
        hum.innerHTML = `humidity: ${response.data.main.humidity}%`;
        windVal.innerHTML = `wind: ${response.data.wind.speed} km/h`;
        iconElem.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        iconElem.setAttribute("alt", `${response.data.weather[0].description}`);
    }
    axios.get(apiWeather).then(displayTemparature);
}
let form = document.querySelector("#input-form");
form.addEventListener("submit", search);

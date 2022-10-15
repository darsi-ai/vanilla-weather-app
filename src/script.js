function displayTemparature(response){
    console.log(response);
    //let desc = document.querySelector("#description");
    //desc.innerHTML = `${response.data.weather[description]}`;
    let deg = document.querySelector("#degrees");
    deg.innerHTML = `${Math.round(response.data.main.temp)}°`;
    let hum = document.querySelector("#humidity");
    hum.innerHTML = `humidity: ${response.data.main.humidity}%`;
    let windVal = document.querySelector("#wind");
    windVal.innerHTML = `wind: ${response.data.wind.speed} km/h`;
}

let apiKey = "64e797c428bddfb60f42d1075443623c";
let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=Florence&appid=${apiKey}&units=metric`;


axios.get(apiWeather).then(displayTemparature);
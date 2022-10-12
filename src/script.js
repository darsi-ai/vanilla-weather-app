let time = new Date();
let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
let day = days[time.getDay()];
let hour = time.getHours();
let minutes = time.getMinutes();
if (minutes < 10){
    minutes = "0"+minutes;
}

let dayTime = document.querySelector("#day-time");
dayTime.innerHTML = `${day}, ${hour}:${minutes}`;

function changeInfo(event) {
  event.preventDefault();
  let inputData = document.querySelector("#formGroupExampleInput");
  let newCity = document.querySelector("#city");
  if(inputData.value){
    newCity.innerHTML = `${inputData.value}`;
  } else {
    alert ("Please input your city");
  }

  let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${inputData.value}&appid=${apiKey}&units=metric`;
  console.log(apiWeather)
  function getWeather(response) {
    console.log(response);
    let weather = Math.round(response.data.main.temp);
    let degreesVal = document.querySelector("#degrees");
    degreesVal.innerHTML = `${weather}°C`;
    let humidityVal = document.querySelector("#humidity");
    humidityVal.innerHTML = `humidity: ${Math.round(response.data.main.humidity)}%`;
    let feelsLikeVal = document.querySelector("#feelsLike");
    feelsLikeVal.innerHTML = `feels like: ${Math.round(response.data.main.feels_like)}°C`;
  }
  axios.get(apiWeather).then(getWeather);
}


let submitButton = document.querySelector("#submitbutton");
submitButton.addEventListener("click", changeInfo);


function celsiusToFarengheit(event){
    event.preventDefault();
    let degrees = document.querySelector("#degrees");
    let intDegrees = parseInt(degrees.innerHTML, 10);
    let farDeg = intDegrees + 34;
    degrees.innerHTML = `${farDeg}°F`;
}

let farenLink = document.querySelector("#farengheit");
farenLink.addEventListener("click", celsiusToFarengheit)

function farengheitToCelsius(event){
    event.preventDefault();
    let degrees = document.querySelector("#degrees");
    let intDegrees = parseInt(degrees.innerHTML, 10);
    let celDeg = intDegrees - 34;
    degrees.innerHTML = `${celDeg}°C`;
}

let celsLink = document.querySelector("#celsius");
celsLink.addEventListener("click", farengheitToCelsius);

function currentWeather(event){
  event.preventDefault();

  function getGeo(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "b2d9fa1f2b35557e4615dd5fab218834";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    function getWeather(response) {
      console.log(response);
      let cityVal = document.querySelector("#city");
      cityVal.innerHTML = `${response.data.name}`
      let weather = Math.round(response.data.main.temp);
      let degreesVal = document.querySelector("#degrees");
      degreesVal.innerHTML = `${weather}°C`;
      let humidityVal = document.querySelector("#humidity");
      humidityVal.innerHTML = `humidity: ${Math.round(response.data.main.humidity)}%`;
      let feelsLikeVal = document.querySelector("#feelsLike");
      feelsLikeVal.innerHTML = `feels like: ${Math.round(response.data.main.feels_like)}°C`;
    }
    axios.get(url).then(getWeather);
  }

  navigator.geolocation.getCurrentPosition(getGeo);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentWeather);

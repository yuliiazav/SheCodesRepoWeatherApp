//1 the current date and time using JavaScript 

let now = new Date();
console.log(now);

let currentTime = document.querySelector(".current-time");
let currentDay = document.querySelector(".current-day");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thuesday", "Friday", "Saturday"];
let day = days[now.getDay()];
console.log(day);
let hours = now.getHours();
let minutes = now.getMinutes();

currentTime.innerHTML = `Local time: ${hours} : ${minutes}, `;
currentDay.innerHTML = `${day}`;

/*2   a search engine, when searching for a city
 (i.e. Paris),   the city name is displayed on
  the page after the user submits the form.

function showSelectedCity(event) {
    event.preventDefault();
    let city = document.querySelector(".search-cityinput");
    let selectedCity = document.querySelector(".selectedcity-name");
    selectedCity.innerHTML = city.value;

}

let searchCityForm = document.querySelector(".search-field");
searchCityForm.addEventListener("submit", showSelectedCity);*/

/*Displaying a fake temperature (i.e 17) in Celsius and
 adding a link to convert it to Fahrenheit. 
 When clicking on it, it should convert the temperature
  to Fahrenheit. When clicking on Celsius, 
  it should convert it back to Celsius.*/

function toFahrenheit(event) {
    event.preventDefault();
    let temperatureUnit = document.querySelector(".selectedcity-temperature");
    temperatureUnit.innerHTML = 66;
}

function toCelsius(event) {
    event.preventDefault();
    let temperatureUnit = document.querySelector(".selectedcity-temperature");
    temperatureUnit.innerHTML = 17;
}

let fahrenheitUnitLink = document.querySelector(".fahrenheit-unitlink");
fahrenheitUnitLink.addEventListener("click", toFahrenheit);
let celsiusUnitLink = document.querySelector(".celcius-unitlink");
celsiusUnitLink.addEventListener("click", toCelsius);

/*In your project, when a user searches for a city (example: New York),
it should display the name of the city on the result page and the current temperature of the city.
Bonus point:
Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS
coordinates and display and the city and current temperature using the OpenWeather API.*/

function showWeather(response) {
    let cityTemperature = document.querySelector(".selectedcity-temperature");
    let temperature = Math.round(response.data.main.temp);
    cityTemperature.innerHTML = `${temperature}°`;
    let cityName = document.querySelector(".selectedcity-name");
    cityName.innerHTML = ` ${response.data.name}`;
    let weatherCondition = document.querySelector(".selectedcity__weather-condition");
    weatherCondition.innerHTML = `${response.data.weather[0].main}`;
}

function showLocation(position) {
    let apiKey = "3bef8ed4a084d48e251eb598a85f1b9d";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
}
function searchCity() {
    let city = document.querySelector("#city").value;
    let apiKey = "3bef8ed4a084d48e251eb598a85f1b9d";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showLocation);
}
function handleSubmit(event) {
    event.preventDefault();
    searchCity();
}
let currentBtn = document.querySelector(".current-btn");
currentBtn.addEventListener("click", getCurrentLocation);

let submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", handleSubmit);


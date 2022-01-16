function currentTime(inputDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[inputDate.getDay()];
  let date = inputDate.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[inputDate.getMonth()];
  let hour = inputDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = inputDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let replaceDate = document.querySelector("#today-date");
  replaceDate.innerHTML = `${day}, ${date} ${month}, ${hour}:${minute}`;
}

let now = new Date();
currentTime(now);

//Change city

function searchCity(city) {
  let apiKey = "677a0d74bb153df8022c5d432026b13a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#current-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#weather-symbol")
    .setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  document
    .querySelector("#weather-symbol")
    .setAttribute("alt", response.data.weather[0].description);
  currentTime(response.data.dt * 1000);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "677a0d74bb153df8022c5d432026b13a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

searchCity("Gold Coast");

let inputCity = document.querySelector("#search-bar");
inputCity.addEventListener("submit", handleSubmit);

let searchCurrentCity = document.querySelector(".current-location-button");
searchCurrentCity.addEventListener("click", getCurrentPosition);

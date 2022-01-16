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
  celciusTemperature = response.data.main.temp;
  let weatherSymbolCode = response.data.weather[0].icon;
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);
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
    .setAttribute("src", `images/${weatherSymbolCode}.png`);
  document
    .querySelector("#weather-symbol")
    .setAttribute("alt", response.data.weather[0].description);
  if (
    weatherSymbolCode === "01d" ||
    weatherSymbolCode === "02d" ||
    weatherSymbolCode === "03d" ||
    weatherSymbolCode === "04d" ||
    weatherSymbolCode === "09d" ||
    weatherSymbolCode === "10d" ||
    weatherSymbolCode === "11d" ||
    weatherSymbolCode === "13d" ||
    weatherSymbolCode === "50d"
  ) {
    document.querySelector("#day-night").innerHTML =
      '<i class="far fa-sun"></i>';
  } else {
    document.querySelector("#day-night").innerHTML =
      '<i class="far fa-moon"></i>';
  }
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    (celciusTemperature * 9) / 5 + 32
  );
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);
}

let celciusTemperature = null;

let inputCity = document.querySelector("#search-bar");
inputCity.addEventListener("submit", handleSubmit);

let searchCurrentCity = document.querySelector(".current-location-button");
searchCurrentCity.addEventListener("click", getCurrentPosition);

let convertFahrenheit = document.querySelector(".change-f");
convertFahrenheit.addEventListener("click", displayFahrenheitTemperature);

let convertCelcius = document.querySelector(".change-c");
convertCelcius.addEventListener("click", displayCelciusTemperature);

searchCity("Gold Coast");

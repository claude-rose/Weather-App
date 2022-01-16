function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
      <div class="col">
        <div class="card forecast-card">
          <div class="card-body">
            <h5 class="card-title">
             ${formatDay(
               forecastDay.dt
             )} <span class="forecast-temp">${Math.round(
          forecastDay.temp.day
        )}°</span>
            </h5>
           <p class="card-text">
             <img src="images/${
               forecastDay.weather[0].icon
             }.png" class="card-img" alt="storm" />
            </p>
          </div>
        </div>
      </div>
   `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function retrieveForecast(coords) {
  let apiKey = "677a0d74bb153df8022c5d432026b13a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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
  retrieveForecast(response.data.coord);
}

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

let celciusTemperature = null;

let inputCity = document.querySelector("#search-bar");
inputCity.addEventListener("submit", handleSubmit);

let searchCurrentCity = document.querySelector(".current-location-button");
searchCurrentCity.addEventListener("click", getCurrentPosition);

searchCity("Gold Coast");
currentTime(now);

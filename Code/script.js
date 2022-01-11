// Global Variables

var cities = [];
var weatherApiUrl = "https://api.openweathermap.org";
var weatherApiKey = "1235ceb3341c3c7db44a7f1a34a49d30";

// DOM Elements
var cityInput = $("#enter-city");
var cityNameEl = $("#city-name");
var searchButton = $("#searchBtn");
var clearButton = $("#clearBtn");
var timeDisplayEl = $("#currentDay");
var currentTemp = $("#temperature");
var currentPic = $("#current-picture");
var currentHumid = $("#humidity");
var currentWind = $("#wind-speed");
var currentUV = $("#uv-index");
var historyEle = $("#history");
var fiveDays = $("#fiveday-contained");
var todaysWeather = $("#todaysWeather");
var cardRow = $(".card-row");

// Timer and Date

function displayTime() {
  var rightNow = moment().format("MMMM Do YYYY, h:mm:ss a");
  timeDisplayEl.text(rightNow);
}

setInterval(displayTime, 1000);

// Functions

if (JSON.parse(localStorage.getItem("history")) === null) {
  console.log("history not found");
} else {
  console.log("history loaded into searchHistoryArray");
  renderSearchHistory();
}

searchButton.on("click", function (e) {
  e.preventDefault();
  if (cityInput.val() === "") {
    alert("You must enter a city");
    return;
  }
  console.log("clicked button");
  getWeather(cityInput.val());
});

$(document).on("click", ".historyEntry", function () {
  console.log("clicked history item");
  let thisElement = $(this);
  getWeather(thisElement.text());
});

function renderSearchHistory(cityName) {
  historyEl.empty();
  let searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory"));
  for (let i = 0; i < searchHistoryArray.length; i++) {
    let newListItem = $("<li>").attr("class", "historyEntry");
    newListItem.text(searchHistoryArray[i]);
    searchHistoryEl.prepend(newListItem);
  }
}

function clearSearch() {
  return localStorage.clear("searchHistory");
}

clearButton.on("click", clearSearch);

function renderWeatherData(
  cityName,
  cityTemp,
  cityHumidity,
  cityWindSpeed,
  uvVal
) {
  cityNameEl.text(cityName);
  currentTemp.text(`Temperature: ${cityTemp} °F`);
  currentHumid.text(`Humidity: ${cityHumidity}%`);
  currentWind.text(`Wind Speed: ${cityWindSpeed} MPH`);
  currentUV.text(`UV Index: ${uvVal}`);
}

function getWeather(desiredCity) {
  let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&APPID=${weatherApiKey}&units=imperial`;
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (weatherData) {
    let cityObj = {
      cityName: weatherData.name,
      cityTemp: weatherData.main.temp,
      cityHumidity: weatherData.main.humidity,
      cityWindSpeed: weatherData.wind.speed,
      cityUVIndex: weatherData.coord,
    };
    let queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${weatherApiKey}&units=imperial`;
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (uvData) {
      if (JSON.parse(localStorage.getItem("searchHistory")) == null) {
        let searchHistoryArr = [];

        if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
          searchHistoryArr.push(cityObj.cityName);
          localStorage.setItem(
            "searchHistory",
            JSON.stringify(searchHistoryArr)
          );
          let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
          renderWeatherData(
            cityObj.cityName,
            cityObj.cityTemp,
            cityObj.cityHumidity,
            cityObj.cityWindSpeed,
            renderedWeatherIcon,
            uvData.value
          );
          renderSearchHistory(cityObj.cityName);
        } else {
          console.log(
            "City already in searchHistory. Not adding to history list"
          );
          let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
          renderWeatherData(
            cityObj.cityName,
            cityObj.cityTemp,
            cityObj.cityHumidity,
            cityObj.cityWindSpeed,
            renderedWeatherIcon,
            uvData.value
          );
        }
      } else {
        let searchHistoryArr = JSON.parse(
          localStorage.getItem("searchHistory")
        );
        if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
          searchHistoryArr.push(cityObj.cityName);
          localStorage.setItem(
            "searchHistory",
            JSON.stringify(searchHistoryArr)
          );
          let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
          renderWeatherData(
            cityObj.cityName,
            cityObj.cityTemp,
            cityObj.cityHumidity,
            cityObj.cityWindSpeed,
            renderedWeatherIcon,
            uvData.value
          );
          renderSearchHistory(cityObj.cityName);
        } else {
          console.log(
            "City already in searchHistory. Not adding to history list"
          );
          let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
          renderWeatherData(
            cityObj.cityName,
            cityObj.cityTemp,
            cityObj.cityHumidity,
            cityObj.cityWindSpeed,
            renderedWeatherIcon,
            uvData.value
          );
        }
      }
    });
  });

  getFiveDayForecast();

  function getFiveDayForecast() {
    cardRow.empty();
    let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${desiredCity}&APPID=${weatherApiKey}&units=imperial`;
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (fiveDayReponse) {
      for (let i = 0; i != fiveDayReponse.list.length; i += 8) {
        let cityObj = {
          date: fiveDayReponse.list[i].dt_txt,
          icon: fiveDayReponse.list[i].weather[0].icon,
          temp: fiveDayReponse.list[i].main.temp,
          humidity: fiveDayReponse.list[i].main.humidity,
        };
        let dateStr = cityObj.date;
        let trimmedDate = dateStr.substring(0, 10);
        let weatherIco = `https:///openweathermap.org/img/w/${cityObj.icon}.png`;
        createForecastCard(
          trimmedDate,
          weatherIco,
          cityObj.temp,
          cityObj.humidity
        );
      }
    });
  }
}

function createForecastCard(date, icon, temp, humidity) {
  // HTML elements we will create to later
  let fiveDayCardEl = $("<div>").attr("class", "five-day-card");
  let cardDate = $("<h3>").attr("class", "card-text");
  let cardIcon = $("<img>").attr("class", "weatherIcon");
  let cardTemp = $("<p>").attr("class", "card-text");
  let cardHumidity = $("<p>").attr("class", "card-text");

  cardRow.append(fiveDayCardEl);
  cardDate.text(date);
  cardIcon.attr("src", icon);
  cardTemp.text(`Temp: ${temp} °F`);
  cardHumidity.text(`Humidity: ${humidity}%`);
  fiveDayCardEl.append(cardDate, cardIcon, cardTemp, cardHumidity);
}

// Event Listeners

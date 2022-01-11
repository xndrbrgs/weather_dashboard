// Global Variables

var cities = [];
var weatherApiUrl = "https://api.openweathermap.org";
var weatherApiKey = "1235ceb3341c3c7db44a7f1a34a49d30";

// DOM Elements
var cityInput = $("#enter-city");
var cityNameEl = $('#city-name');
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

$(document).on("click", ".historyEntry", function() {
  console.log("clicked history item")
  let thisElement = $(this);
  getWeather(thisElement.text());
})

function renderSearchHistory(cityName) {
  historyEl.empty();
  let searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory"));
  for (let i = 0; i < searchHistoryArr.length; i++) {
      let newListItem = $("<li>").attr("class", "historyEntry");
      newListItem.text(searchHistoryArray[i]);
      searchHistoryEl.prepend(newListItem);
  }
}

function renderWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvVal) {
  cityNameEl.text(cityName)
  currentTemp.text(`Temperature: ${cityTemp} °F`);
  currentHumid.text(`Humidity: ${cityHumidity}%`);
  currentWind.text(`Wind Speed: ${cityWindSpeed} MPH`);
  currentUV.text(`UV Index: ${uvVal}`);
  weatherIconEl.attr("src", cityWeatherIcon);
}

function getWeather(desiredCity) {
  let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&APPID=${weatherApiKey}&units=imperial`;
  $.ajax({
      url: queryUrl,
      method: "GET"
  })
  .then(function(weatherData) {
      let cityObj = {
          cityName: weatherData.name,
          cityTemp: weatherData.main.temp,
          cityHumidity: weatherData.main.humidity,
          cityWindSpeed: weatherData.wind.speed,
          cityUVIndex: weatherData.coord,
          cityWeatherIconName: weatherData.weather[0].icon
      }
  let queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObj.cityUVIndex.lat}&lon=${cityObj.cityUVIndex.lon}&APPID=${apiKey}&units=imperial`
  $.ajax({
      url: queryUrl,
      method: 'GET'
  })
  .then(function(uvData) {
      if (JSON.parse(localStorage.getItem("searchHistory")) == null) {
          let searchHistoryArr = [];
          // Keeps user from adding the same city to the searchHistory array list more than once
          if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
              searchHistoryArr.push(cityObj.cityName);
              // store our array of searches and save 
              localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
              let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
              renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
              renderSearchHistory(cityObj.cityName);
          }else{
              console.log("City already in searchHistory. Not adding to history list")
              let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
              renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
          }
      }else{
          let searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
          // Keeps user from adding the same city to the searchHistory array list more than once
          if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
              searchHistoryArr.push(cityObj.cityName);
              // store our array of searches and save 
              localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
              let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
              renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
              renderSearchHistory(cityObj.cityName);
          }else{
              console.log("City already in searchHistory. Not adding to history list")
              let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
              renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
          }
      }
  })
      
  });

  

// Event Listeners
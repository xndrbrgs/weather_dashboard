// Global Variables

var cities = [];
var weatherApiUrl = "https://api.openweathermap.org";
var weatherApiKey = "1235ceb3341c3c7db44a7f1a34a49d30";

// DOM Elements
var cityInput = $('#enter-city');
var searchButton = $('#searchBtn');
var clearButton = $('#clearBtn');
var timeDisplayEl = $('#currentDay');
var currentTemp = $('#temperature');
var currentPic = $('#current-picture');
var currentHumid = $('#humidity');
var currentWind = $('#wind-speed');
var currentUV = $('#uv-index');
var historyEle = $('#history');
var fiveDays = $('#fiveday-contained');
var todaysWeather = $('#todaysWeather');

// Timer and Date

function displayTime() {
    var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
    timeDisplayEl.text(rightNow);
  }
  
  setInterval(displayTime, 1000);

// Functions

var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    getFiveDay(city);
    cities.unshift({city});
    cityInput.value = "";
  } else {
    alert("Please Enter A City!");
  }
  savedSearch();
  pastSearched(city);
};

function savedSearch() {
  localStorage.setItem("cities", JSON.stringify(cities));
};

function getTheWeather(city) {
  fetch("api.openweathermap.org/data/2.5/weather?q=" + ${city} + "&appid=" + weatherApiKey)
    .then(function(response) {
      response.JSON().then(function(data) {
        weatherDisplay(data, city);
      });
    });  
};

function weatherDisplay(weather, searchButton)

// Event Listeners



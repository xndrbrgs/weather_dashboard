// Global Variables

var cities = [];
var weatherApiUrl = "https://api.openweathermap.org";
var weatherApiKey = "1235ceb3341c3c7db44a7f1a34a49d30";

// DOM Elements
var cityInput = $("#enter-city");
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
  console.log("history loaded into searchHistoryArr");
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


// Event Listeners

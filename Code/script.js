// Function to save to local storage
//Way to pull items from LS
//Utilize weather API
//Use info from API to build display
//

// Global Variables

var searchHistory = [];
var weatherApiUrl = "https://api.openweathermap.org";
var weatherApiKey = "1235ceb3341c3c7db44a7f1a34a49d30";

// DOM Elements
var searchButton = $('#searchBtn');
var clearButton = $('#clearBtn');
var timeDisplayEl = $('#currentDay');
var currentTemp = $('#temperature');
var currentPic = $('#current-picture');
var currentHumid = $('#humidity');
var 

// Functions

function displayTime() {
  var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a');
  timeDisplayEl.text(rightNow);
}

setInterval(displayTime, 1000);
// Event Listeners

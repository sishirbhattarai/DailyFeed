// Our JavaScript goes here

// WeatherBit API
var weatherbitURL = "https://api.weatherbit.io/v2.0/current?city=" + weatherbitCity + "key=aa00598f57b74bddb364a7b526faf997";
var weatherbitCity = "";
// MapQuest API Global Variables
var locationBtn = $("#location-btn");
var cityEl = $("#location");
var userLat;
var userLong;
var mapURL;
// GuardianAPI Global Variables
var guardianSearch = "";
var guardianURL = "https://content.guardianapis.com/search?q=" + guardianSearch + "&api-key=199bdec0-409f-48d7-a79a-6ff10791c23e";
// Covid19API Global Variables


function callGuardian () {
    $.ajax({
        url: guardianURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
}
callGuardian();

// Asks permission to get user's location data
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, function() {
            cityEl.text("Please refresh the page and allow location services for the app to function properly.")
        });
    } else {
        cityEl.text("Geolocation is not supported by the browser.")
    };
};

// If user gives location permission, coords are sent to mapquest API
function showPosition(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    mapURL = "http://www.mapquestapi.com/geocoding/v1/reverse?key=jHLf4uATR4fijVkLOmrimhIJE79Xp0kx&location=" + userLat + "," + userLong;
    $.ajax({
        url: mapURL,
        method: "GET"
    }).then(function (response) {
        cityEl.text("Your current location is " + (response.results[0].locations[0].adminArea5) + "," + (response.results[0].locations[0].adminArea3) + ".");
        console.log(response)
    });
};
getLocation();

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
      console.log(position)
  }
  function error() {}
  getWeather();

  function getWeather() {
  
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

//Ajax call on weather
  var queryURL = "https://api.weatherbit.io/v2.0/current" + "?lat=" + latitude + "&lon=" + longitude + "&key=b2da4d28d2ce4023b0d33cbef6a3f959";
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {

        console.log(response);

        // Log the resulting object
        console.log(response.data[0].temp);
        var tempF = response.data[0].temp * 1.80 + 32;
        var icon =  $("<img>").attr("src", "https://www.weatherbit.io/api/codes" + response.data[0].weather.icon + ".png")
        //Console loging temperature on Farenheit
        console.log(tempF);
        $("#datetime").text(response.data[0].datetime);
        $("#temperature").text("Temp: " + response.data[0].temp);
        $("#temperature").text("Temp: " + tempF.toFixed(2) + "°F");
        $("#description").text( response.data[0].weather.description);
        $("#uv").text("UV Index: " + response.data[0].uv);
        //$("#icon").text(imag);
     
        // var queryURL = "https://api.weatherbit.io/v2.0/current/airquality" + "?lat=" + latitude + "&lon=" + longitude + "&key=b2da4d28d2ce4023b0d33cbef6a3f959";
        // $.ajax({
        //   url: queryURL,
        //   method: "GET"
        // })
        // .then(function(response) {
  
        //   console.log(response);
  
        //   // Log the resulting object
        //  // console.log(response.data[0].temp);
        // })
      });
    }}

   
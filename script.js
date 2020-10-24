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
var guardianURL = "https://content.guardianapis.com/search?api-key=199bdec0-409f-48d7-a79a-6ff10791c23e";
// Covid19API Global Variables

function callGuardian () {
    $.ajax({
        url: guardianURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        cityEl.text("Geolocation is not supported by the browser.")
    };
};

function showPosition(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    mapURL = "http://www.mapquestapi.com/geocoding/v1/reverse?key=jHLf4uATR4fijVkLOmrimhIJE79Xp0kx&location=" + userLat + "," + userLong;
    $.ajax({
        url: mapURL,
        method: "GET"
    }).then(function (response) {
        cityEl.text("You live in " + (response.results[0].locations[0].adminArea5) + ".");
    });
};
getLocation();
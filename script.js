// Our JavaScript goes here
// Zomato API Global Variables
// var zomatoCityID = "";
// var zomatoQuery = "";
// var zomatoLat = "";
// var zomatoLon = "";
var zomSearch = $("#search-btn");
var zomInput = "";
// WeatherBit API
var weatherbitURL = "https://api.weatherbit.io/v2.0/current?city=" + weatherbitCity + "key=aa00598f57b74bddb364a7b526faf997";
var weatherbitCity = "";
// Uber API Global Variables
var uberURL = "";
// MapQuest API Global Variables
var locationBtn = $("#location-btn");
var cityEl = $("#location");
var userLat;
var userLong;
var mapURL;

function zomatoCall() {
    var zomatoURL = "https://developers.zomato.com/api/v2.1/cities?q=" + zomInput + "&apikey=54aedad9a5cf457cabacf6702d606833";
    $.ajax({
        url: zomatoURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        
    });
}

$(zomSearch).on('click', function (event) {
    event.preventDefault();
    zomInput = $("#zomatoInput").val().trim();
    
    zomatoCall();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        locationEl.innerHTML = "Geolocation is not supported by this browser.";
    };
};

function showPosition(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    mapURL = "http://www.mapquestapi.com/geocoding/v1/reverse?key=jHLf4uATR4fijVkLOmrimhIJE79Xp0kx&location=" + userLat + "," + userLong
};
getLocation();

// This ajax must run AFTER user allows geolocation; that's why it's behind a button
locationBtn.on('click', function () {

    $.ajax({
        header: {
            'user-key': 'jHLf4uATR4fijVkLOmrimhIJE79Xp0kx'
        },
        url: mapURL,
        method: "GET"
    }).then(function (response) {
        cityEl.text("You live in " + (response.results[0].locations[0].adminArea5) + ".");
    });
})
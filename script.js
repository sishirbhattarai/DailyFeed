// Our JavaScript goes here
$(document).ready(function () {

    // WeatherBit API
    var icon = $("<i>");
    var tempDiv = $("#temperature");
    var tempIcon = $("#temp-icon");
    var weather = $("#description");
    var weatherImg = $("<img>");
    var uvDiv = $("#uv");
    var uvIcon = $("<i class=\"fas fa-sun\">");
    // MapQuest API Global Variables
    var cityEl = $("#location");
    var userLat;
    var userLong;
    // GuardianAPI Global Variables
    var guardianSearch;
    var searchBtn = $("#search-btn");
    var articles = $("#articles");
    // Covid19API Global Variables


    searchBtn.on('click', function (event) {
        event.preventDefault();
        guardianSearch = $("#news-search").val().trim();
        articles.empty();
        console.log(guardianSearch);
        var guardianFields = "&show-fields=headline,thumbnail";
        $.ajax({
            url: "https://content.guardianapis.com/search?q=" + guardianSearch + guardianFields + "&api-key=199bdec0-409f-48d7-a79a-6ff10791c23e",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.response.results[0]);
            for (i = 0; i < 5; i++) {
                articles.append("<hr>");
                var story = $("<a>");
                story.attr({
                    href: response.response.results[i].webUrl,
                    class: "guardian-headline"
                });
                var guardianImg = $("<img>");
                guardianImg.attr({
                    src: response.response.results[i].fields.thumbnail,
                    id: "guardian-img"
                });
                story.text(response.response.results[i].fields.headline);
                articles.append(guardianImg, story);
            }
        });
    });

    // Asks permission to get user's location data
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, function () {
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
        $.ajax({
            url: "http://www.mapquestapi.com/geocoding/v1/reverse?key=jHLf4uATR4fijVkLOmrimhIJE79Xp0kx&location=" + userLat + "," + userLong,
            method: "GET"
        }).then(function (response) {
            var cityIcon = $("<i>");
            cityIcon.addClass("fas fa-city");
            cityEl.prepend(cityIcon + " ");
            cityEl.text((response.results[0].locations[0].adminArea5) + ", " + (response.results[0].locations[0].adminArea3));
            console.log(response);
            getWeather()
        });
    };

    getLocation();

    // Passes user coords into weather api, returns local weather info
    function getWeather() {

        $.ajax({
            url: "https://api.weatherbit.io/v2.0/current?lat=" + userLat + "&lon=" + userLong + "&key=b2da4d28d2ce4023b0d33cbef6a3f959",
            method: "GET"
        }).then(function (response) {

            console.log(response);
            console.log("Celsuis temperature: " + response.data[0].temp);
            var tempF = response.data[0].temp * 1.80 + 32;
            console.log("Fahrenheit temperature: " + tempF);

            if (tempF < 60) {
                icon.addClass("fas fa-temperature-low");
                tempIcon.append(icon)
            } else {
                icon.addClass("fas fa-temperature-high");
                tempIcon.append(icon)
            };
            tempDiv.append(" " + tempF.toFixed(0) + "° F");
            weatherImg.attr("src", "icons/" + response.data[0].weather.icon + ".png");
            weather.append(weatherImg);
            weather.append(response.data[0].weather.description);
            uvDiv.append(uvIcon);
            uvDiv.append(" UV Index: " + response.data[0].uv.toFixed(1));
        });
    }
})
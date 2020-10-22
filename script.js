// Our JavaScript goes here
var zomatoCityID = "";
var zomatoQuery = "";
var zomatoLat = "";
var zomatoLon = "";
var weatherbitCity = "";

var zomatoURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomatoCityID + "&entity_type=city&q=" + zomatoQuery + "&count=10&lat=" + zomatoLat + "&lon=" + zomatoLon + "&radius=10000&sort=rating&order=desc";
var weatherbitURL = "https://api.weatherbit.io/v2.0/current?city=" + weatherbitCity + "key=aa00598f57b74bddb364a7b526faf997";
var uberURL = "";

var zomSearch = $("#search-btn");
var zomInput = $("#zomatoInput").val();

$.ajax({
    header: {
        'user-key': '54aedad9a5cf457cabacf6702d606833'
    },
    url: zomatoURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
});

$(zomSearch).on('click', function(event) {
    event.preventDefault();
    zomSearch = zomInput;
})

function zomatoSearch () {

}
zomatoSearch();
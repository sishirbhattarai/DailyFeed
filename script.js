// Our JavaScript goes here
var zomatoCityID = "1213";
var zomatoQuery = "Sushi";
var zomatoLat = "40.75952";
var zomatoLon = "-111.888229";

var zomatoURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + zomatoCityID + "&entity_type=city&q=" + zomatoQuery + "&count=10&lat=" + zomatoLat + "&lon=" + zomatoLon + "&radius=10000&sort=rating&order=desc";
var weatherbitURL = "";
var uberURL = "";



$.ajax({
    header: {
        'user-key': '54aedad9a5cf457cabacf6702d606833'
    },
    url: zomatoURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
});

$("#search-btn").on('click', function(event) {
    event.preventDefault();
});

function zomatoSearch () {

}
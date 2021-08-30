var APIKey = "c96ff37ce7e15d7cf6a6ddc995e12f66";
var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
var cityName;

var searchButton = document.getElementById('search-button');
var searchField = document.getElementById('text-field');

function searchForCity() {
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
};

searchButton.addEventListener('click', searchForCity);

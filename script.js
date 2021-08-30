var APIKey = "c96ff37ce7e15d7cf6a6ddc995e12f66";

var today = moment();
var currentDate = document.getElementById('current-date');
var tomorrow = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');
var currentDateAtSearch = today.format('dddd - MMM D, YYYY');

var searchButton = document.getElementById('search-button');
var searchField = document.getElementById('text-field');

var currentSection = document.querySelector('.current');
var currentTemp = document.getElementById('current-temp');
var currentWind = document.getElementById('current-wind');
var currentHumidity = document.getElementById('current-humidity');
var currentUvi = document.getElementById('current-uvi');

var forecastTemp = document.querySelector('.forecast-temp');

function searchForCity() {
    var cityName = searchField.value.trim(); // text field in html's value
    // formats temperature to F°
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;
    var requestUrlForecast = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + "&cnt=5&units=imperial&appid=" + APIKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentTemp.textContent = parseInt(data.main.temp) + "°"; // logs temp as forced whole num
            currentWind.textContent = "Wind: " + parseInt(data.wind.speed) + "mph";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
            currentUvi.textContent = "UVi: 0.55";
            currentDate.textContent = currentDateAtSearch;
            tomorrow.textContent = today.add(1, 'd').format('ddd, MMM D'); // today +1
            day2.textContent = today.add(1, 'd').format('ddd, MMM D'); // plus a day count followed
            day3.textContent = today.add(1, 'd').format('ddd, MMM D');
            day4.textContent = today.add(1, 'd').format('ddd, MMM D');
            day5.textContent = today.add(1, 'd').format('ddd, MMM D');
        });
};

searchButton.addEventListener('click', searchForCity);
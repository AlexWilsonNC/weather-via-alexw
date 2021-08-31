var APIKey = "c96ff37ce7e15d7cf6a6ddc995e12f66";
var APIKeyX5 = "2843ffe10fd5dc14d3db387170013c66";

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
var iconCurrent = document.getElementById('iconCurrent');

var cityList = [];

function searchForCity(event) {
    event.preventDefault();
    var cityName = searchField.value.charAt(0).toUpperCase() + searchField.value.slice(1).toLowerCase();
    // forcing any value entered, first char capitalized since I'm displaying their searched city on the page afterwards
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;
    var requestUrlForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + APIKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            currentTemp.textContent = parseInt(data.main.temp) + "°"; // logs temp as forced whole num
            currentWind.textContent = "Wind: " + parseInt(data.wind.speed) + "mph";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
            currentUvi.textContent = "UVi: 0.55"; // example, replace
            var weatherIcon = document.getElementById('iconCurrent');
            var currentIcon = data.weather[0].icon;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${currentIcon}.png`);
            weatherIcon.setAttribute('alt', data.weather[0].icon)
            currentDate.textContent = currentDateAtSearch;
            tomorrow.textContent = today.add(1, 'd').format('ddd, MMM D'); // today +1
            day2.textContent = today.add(1, 'd').format('ddd, MMM D'); // plus a day each count followed
            day3.textContent = today.add(1, 'd').format('ddd, MMM D');
            day4.textContent = today.add(1, 'd').format('ddd, MMM D');
            day5.textContent = today.add(1, 'd').format('ddd, MMM D');
            var header = document.getElementById('current-header').textContent = cityName;
            // if (data.weather[0].description === "overcast clouds") {
            //     document.getElementById('cloud-current').classList.remove('hide');
            // }
        });

    fetch(requestUrlForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i = 6; i < data.list.length; i += 8) {
                document.getElementById('forecast-temp' + i).textContent = parseInt(data.list[i].main.temp) + "°";
                document.getElementById('forecast-wind' + i).textContent = parseInt(data.list[i].wind.speed) + "mph";
                document.getElementById('forecast-humidity' + i).textContent = parseInt(data.list[i].main.humidity) + "%";
            }
        });
};

searchButton.addEventListener('click', searchForCity);
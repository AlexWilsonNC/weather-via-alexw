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

var forecastTemp1 = document.querySelector('.forecast-temp1');
var forecastTemp2 = document.querySelector('.forecast-temp2');
var forecastTemp3 = document.querySelector('.forecast-temp3');
var forecastTemp4 = document.querySelector('.forecast-temp4');
var forecastTemp5 = document.querySelector('.forecast-temp5');

function searchForCity() {
    var cityName = searchField.value.trim(); // text field in html's value
// formats temperature to F°
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
            currentUvi.textContent = "UVi: 0.55";
            currentDate.textContent = currentDateAtSearch;
            tomorrow.textContent = today.add(1, 'd').format('ddd, MMM D'); // today +1
            day2.textContent = today.add(1, 'd').format('ddd, MMM D'); // plus an day count followed
            day3.textContent = today.add(1, 'd').format('ddd, MMM D');
            day4.textContent = today.add(1, 'd').format('ddd, MMM D');
            day5.textContent = today.add(1, 'd').format('ddd, MMM D');
        });

    fetch(requestUrlForecast)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for(var i = 6; i < data.list.length; i += 8) {
                document.getElementById('forecast-temp' + i).textContent = parseInt(data.list[i].main.temp) + "°";
            }
        });
};

searchButton.addEventListener('click', searchForCity);
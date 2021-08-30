var APIKey = "c96ff37ce7e15d7cf6a6ddc995e12f66";

var searchButton = document.getElementById('search-button');
var searchField = document.getElementById('text-field');
var currentSection = document.querySelector('.current');

function searchForCity() {
    var cityName = searchField.value.trim();

    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var mainTemp = document.createElement('h2');
                mainTemp.classList.add('main-temp');
                mainTemp.textContent = data[i].main.temp;
                currentSection.appendChild(mainTemp);
            };
        })
};

searchButton.addEventListener('click', searchForCity);
var weatherBtn = document.getElementById('weatherBtn');
var clearBtn = document.getElementById('clearBtn');
var city = document.getElementById('city');
var cityName = document.getElementById('cityName');
var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('windSpeed');
var uvIndex = document.getElementById('uvIndex');
var savedCities = document.getElementById('savedCities');
var btnClass;
var iconDailyDiv;
var iconDailyAppend;
var savedCitiesArray = JSON.parse(localStorage.getItem("savedCities")) || [];

weatherBtn.addEventListener('click', getWeather);
clearBtn.addEventListener('click', clearCities);

loadSavedCities();

function loadSavedCities() {
    for (var i = 0; i < savedCitiesArray.length; i++) {
        var savedCityButton = document.createElement('button');
        savedCityButton.innerText = savedCitiesArray[i];
        savedCityButton.setAttribute('class', 'btn btn-block btn-light text-left border');
        savedCityButton.setAttribute('type', 'button');
        savedCities.appendChild(savedCityButton);
        savedCityButton.addEventListener('click', weatherLink);
    }
};

function clearCities() {
    localStorage.clear();
}

function getWeather(event) {
    event.preventDefault();
    getApi(city.value);
    saveCity(city.value);
    displayWeather();
}

function displayWeather() {
    $('#forecasts').addClass('show');
};

function getApi(city) {

    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6228aa56dae01537d986f1962f109fb7`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var temp = data.main.temp;
            var tempF = (1.8 * (temp - 273) + 32).toFixed(1);
            var humidityText = data.main.humidity;
            var windSpeedText = (data.wind.speed).toFixed(1);
            var icon = data.weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/w/" + icon + ".png";
            var iconAppend = document.createElement('img');
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            cityName.textContent = city + " " + moment().format('(M/DD/YYYY)');
            iconAppend.setAttribute('src', iconUrl);
            cityName.appendChild(iconAppend);
            temperature.innerHTML = tempF + "&nbsp;&#176;F";
            humidity.textContent = humidityText + "%";
            windSpeed.textContent = windSpeedText + " MPH";
            getUv(lat, lon);
            getFiveDay(lat, lon);
        })
};

function getUv(lat, lon) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=6228aa56dae01537d986f1962f109fb7`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            var uvIndexText = data.value;
            uvIndex.textContent = uvIndexText;
            if (uvIndexText < 2) {
                uvIndex.setAttribute('class', 'badge badge-success h6 p-2');
            } else if (uvIndexText < 5) {
                uvIndex.setAttribute('class', 'badge badge-primary h6 p-2');
            } else if (uvIndexText < 7) {
                uvIndex.setAttribute('class', 'badge badge-warning h6 p-2');
            } else {
                uvIndex.setAttribute('class', 'badge badge-danger h6 p-2');
            }
        })
    };

function getFiveDay(lat, lon) {

    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=6228aa56dae01537d986f1962f109fb7`;

    fetch(requestUrl) 
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            for (var i = 1; i < 6; i++) {
                var date = moment.unix(`${data.daily[i].dt}`).format("M/DD/YYYY");
                var dateText = document.getElementById(`date${i}`);
                dateText.textContent = date;
                var temp = data.daily[i].temp.day;
                var tempF = (1.8 * (temp - 273) + 32).toFixed(1);
                var tempText = document.getElementById(`temp${i}`);
                tempText.innerHTML = tempF + "&nbsp;&#176;F";
                var humidity = data.daily[i].humidity;
                var humidityText = document.getElementById(`humidity${i}`);
                humidityText.textContent = humidity + "%";
                iconDailyDiv = document.getElementById(`icon${i}`)
                var iconDaily = data.daily[i].weather[0].icon;
                var iconDailyUrl = "https://openweathermap.org/img/w/" + iconDaily + ".png";        
                iconDailyDiv.setAttribute('src', iconDailyUrl);
                iconDailyDiv.innerHTML = `src=${iconDailyUrl}`;
            }
        })
};

function saveCity(city) {
    createCity(city);
    function createCity(city) {
        var cityName = city;
        if (!savedCitiesArray.includes(cityName)) {
            savedCitiesArray.push(cityName);
            localStorage.setItem("savedCities", JSON.stringify(savedCitiesArray));
            var savedCityButton = document.createElement('button');
            savedCityButton.innerText = cityName;
            savedCityButton.setAttribute('class', 'btn btn-block btn-light text-left border');
            savedCityButton.setAttribute('type', 'button');
            savedCities.appendChild(savedCityButton);
            savedCityButton.addEventListener('click', weatherLink);
        }
    }
};

function weatherLink() {
    var cityLink = this.textContent;
    getApi(cityLink);
    displayWeather();
};

let defferedPrompt;
const btnAdd = document.querySelector('.add-button');
btnAdd.setAttribute('class', 'btn btn-sm mt-4 ml-4');
btnAdd.setAttribute('style', 'background-color: rgb(83, 163, 206); color: white; position: absolute; top: 1px; left: 1px;');
btnAdd.style.display = 'none';
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btnAdd.style.display = 'block';

    btnAdd.addEventListener('click', (e) => {
        btnAdd.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log("User dismissed the A2HS prompt");
            }
            deferredPrompt = null;
        })
    })
})

window.addEventListener('appinstalled', (evt) => {
    applicationCache.logEvent('a2hs', 'isntalled');
})
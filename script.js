var weatherBtn = document.getElementById('weatherBtn');
var city = document.getElementById('city');
var cityName = document.getElementById('cityName');
var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('windSpeed');
var uvIndex = document.getElementById('uvIndex');
var savedCities = document.getElementById('savedCities');
var btnClass;

weatherBtn.addEventListener('click', getWeather);

function getWeather(event) {
    event.preventDefault();
    getApi(city.value); // capitalize first letter
    saveCity(city.value);
    // create hotlink that triggers getApi with city so we don't get duplicates of the same city
}

function getApi(city) {

    var requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6228aa56dae01537d986f1962f109fb7`;

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
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
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
            // weather icon
        })
};

function getUv(lat, lon) {
    var requestUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=6228aa56dae01537d986f1962f109fb7`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            var uvIndexText = data.value;
            uvIndex.textContent = uvIndexText;
            console.log(uvIndexText);
            console.log('hello');
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
        .then (function (data) {;
            for (var i = 1; i < 6; i++) {
                console.log(data);
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
                var iconDailyDiv = document.getElementById(`icon${i}`)
                var iconDaily = data.daily[i].weather[0].icon;
                console.log(iconDaily);
                var iconDailyUrl = "http://openweathermap.org/img/w/" + iconDaily + ".png";
                var iconDailyAppend = document.createElement('img');            
                iconDailyAppend.setAttribute('src', iconDailyUrl);
                iconDailyDiv.appendChild(iconDailyAppend);
            }
        })
};

function saveCity(city) {
    createCity(city);
    function createCity(city) {
        var cityName = city;
        var savedCity = document.createElement('li');
        var savedCityButton = document.createElement('button');
        savedCityButton.innerText = cityName;
        savedCity.setAttribute('class', 'list-group-item');
        savedCityButton.setAttribute('class', 'btn btn-light');
        savedCityButton.setAttribute('type', 'button');
        // savedCityButton.setAttribute('id', cityName);
        // id = `#${cityName}`;
        // btnClass = document.getElementsByClassName('btn-light');
        savedCities.appendChild(savedCity);
        savedCity.appendChild(savedCityButton);
        savedCityButton.addEventListener('click', weatherLink);
    }
    
};

function weatherLink() {
    console.log('hello');
    console.log(this.textContent);
    var cityLink = this.textContent;
    getApi(cityLink);
};
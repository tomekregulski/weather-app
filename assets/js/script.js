var weatherBtn = document.getElementById('weatherBtn');
var city = document.getElementById('city');
var cityName = document.getElementById('cityName');
// var date = document.getElementById('date');
var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('windSpeed');
var uvIndex = document.getElementById('uvIndex');

weatherBtn.addEventListener('click', test);

function test(event) {
    event.preventDefault();
    getApi(city.value);
}



// getApi('New York');
// getFiveDay();

function getApi(city) {

    var requestUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6228aa56dae01537d986f1962f109fb7`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var temp = data.main.temp;
            var tempF = 1.8 * (temp - 273) + 32;
            var tempC = temp - 273;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            var description = data.weather[0].description;
            var icon = data.weather[0].icon;
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            cityName.textContent = city;
            temperature.textContent = tempF;
            humidity.textContent = humidity;
            windSpeed.textContent = windSpeed;
            console.log(temp);
            console.log(tempF);
            console.log(tempC);
            console.log(humidity);
            console.log(windSpeed);
            console.log(description);
            console.log(icon);
            console.log(lat);
            console.log(lon);
            getUv(lat, lon);
        })
    
};

function getUv(lat, lon) {
    var requestUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=6228aa56dae01537d986f1962f109fb7`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            console.log(data);
            var uvIndex = data.value;
            console.log(uvIndex);
            uvIndex.textContent = uvIndex;
        })
};

function getFiveDay() {

    var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=London&appid=6228aa56dae01537d986f1962f109fb7';

    fetch(requestUrl) 
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            console.log(data);
        })
};
var weatherBtn = document.getElementById('weatherBtn');
var city = document.getElementById('city');
var cityName = document.getElementById('cityName');
var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('windSpeed');
var uvIndex = document.getElementById('uvIndex');

weatherBtn.addEventListener('click', getWeather);

function getWeather(event) {
    event.preventDefault();
    getApi(city.value); // capitalize first letter
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
            // var tempC = temp - 273;
            var humidityText = data.main.humidity;
            var windSpeedText = (data.wind.speed).toFixed(1);
            var description = data.weather[0].description;
            // var icon = data.weather[0].icon;
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            cityName.textContent = city + " " + moment().format('(M/DD/YYYY)');
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
            // badge color based on range
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
                // weather icon
            }
        })
};
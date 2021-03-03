getApi();
getFiveDay();

function getApi() {

    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=6228aa56dae01537d986f1962f109fb7';

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
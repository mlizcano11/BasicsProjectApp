function updateWeather(response) {
    let temperatureElement =document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    
    console.log(response.data);

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    timeElement.innerHTML = formatDate(date);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} mph`;
    temperatureElement.innerHTML = Math.round(temperature);    

    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuseday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;

}

function searchCity(city) {
    //make api call and update interface
    let apiKey = "0da3f0051b47b44c6b1o0t3aafd76c05";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}

// Install function to format timestamp
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

//install forecast function
function getForecast(city) {
    let apiKey = "0da3f0051b47b44c6b1o0t3aafd76c05"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}   


function displayForecast(response) {
    console.log(response.data);
    let forecastHtml = "";

    response.data.daily.forEach(function (day,index) {
        if (index < 5) { 
        forecastHtml = 
            forecastHtml +
            `
            <div class="weather-forecast-day"> 
                <div class="weather-forecast-date"> ${formatDay(day.time)} </div>
                <img src="${day.condition.icon.url}" class="weather-forecast-icon"/>    
                <div class="weather-forecast-temperatures">
                <div class="weather-forecast-high"> 
                <strong>${Math.round(day.temperature.maximum)}°F</strong></div>
                <div class="weahter-forecast-low"> ${Math.round(day.temperature.minimum)}°F</div>
                </div>
            </div>
            `;
        }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Los Angeles");
//displayForecast();
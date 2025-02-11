function updateWeather(response) {
    let temperatureElement =document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city")

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);    
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
    searchCity(searchInput.value)
}
let searchFormElement =document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Los Angeles");


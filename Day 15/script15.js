const apiKey = "37b43ed10c16d7120c00bc6f9dd6cc51";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('mylocationInput');
const searchButton = document.getElementById('mysearchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature4');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location =  locationInput.value;
    if(location){
        fetchWeather(location);
    }
});

function fetchWeather(location){
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error("Error fetching weather data: ", error);
        });
}
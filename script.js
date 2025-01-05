const apiKey = "e7030ed9ba490a0b1e9e61cc8434c0cf"; // Replace with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data based on city name
async function getWeather(city) {
    try {
        const weatherResponse = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }

        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);
    } catch (error) {
        alert(error.message);
    }
}

// Function to display weather data on the page
function displayWeather(data) {
    const { name, weather, main, wind } = data;
    document.getElementById("city-name").textContent = name;
    document.getElementById("weather-description").textContent = weather[0].description;
    document.getElementById("temperature").textContent = `Temperature: ${Math.round(main.temp)}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${main.humidity}%`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${wind.speed} m/s`;

    // Set weather icon
    const iconCode = weather[0].icon;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Add event listener to search button
document.getElementById("search-button").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

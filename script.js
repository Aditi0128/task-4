// Define the OpenWeatherMap API key and URL
const apiKey = "YOUR_API_KEY_HERE"; // Replace with your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Function to fetch weather data based on city name
async function getWeather(city) {
    const weatherResponse = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const weatherData = await weatherResponse.json();

    if (weatherData.cod === "404") {
        alert("City not found");
        return;
    }

    displayWeather(weatherData);
    getForecast(city);
}

// Function to display the current weather data
function displayWeather(data) {
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("weather-description").textContent = data.weather[0].description;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Function to fetch and display the 5-day weather forecast
async function getForecast(city) {
    const forecastResponse = await fetch(`${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const forecastData = await forecastResponse.json();

    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";

    // Display 5-day forecast (every 24 hours)
    for (let i = 0; i < forecastData.list.length; i += 8) {
        const forecast = forecastData.list[i];
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
            <p>${new Date(forecast.dt_txt).toLocaleDateString()}</p>
            <p>${Math.round(forecast.main.temp)}°C</p>
            <p>${forecast.weather[0].main}</p>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}

// Add event listener for search button
document.getElementById("search-button").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) {
        getWeather(city);
    }
});

// Optional: You can add more event listeners here for other features like temperature unit switch

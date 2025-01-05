const apiKey = "e7030ed9ba490a0b1e9e61cc8434c0cf"; // Replace with your actual API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
let currentUnit = "metric"; // Default to Celsius

// Function to fetch weather data based on city name
async function getWeather(city) {
    try {
        const weatherResponse = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=${currentUnit}`);
        
        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }

        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);
        getForecast(city);
    } catch (error) {
        alert(error.message); // Display an alert if an error occurs
    }
}

// Function to fetch weather based on user's geolocation
async function getWeatherByLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const weatherResponse = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${currentUnit}`);
        
        if (!weatherResponse.ok) {
            throw new Error('Weather data not found');
        }

        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);
        getForecastByLocation(lat, lon);
    });
}

// Function to fetch and display the 5-day weather forecast
async function getForecast(city) {
    const forecastResponse = await fetch(`${forecastUrl}?q=${city}&appid=${apiKey}&units=${currentUnit}`);
    const forecastData = await forecastResponse.json();
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";

    // Display 5-day forecast (every 8th entry is a new day)
    for (let i = 0; i < forecastData.list.length; i += 8) {
        const forecast = forecastData.list[i];
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
            <p>${new Date(forecast.dt_txt).toLocaleDateString()}</p>
            <p>${Math.round(forecast.main.temp)}°</p>
            <p>${forecast.weather[0].main}</p>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}

// Function to fetch and display the 5-day weather forecast by location
async function getForecastByLocation(lat, lon) {
    const forecastResponse = await fetch(`${forecastUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${currentUnit}`);
    const forecastData = await forecastResponse.json();
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";

    // Display 5-day forecast (every 8th entry is a new day)
    for (let i = 0; i < forecastData.list.length; i += 8) {
        const forecast = forecastData.list[i];
        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");
        forecastItem.innerHTML = `
            <p>${new Date(forecast.dt_txt).toLocaleDateString()}</p>
            <p>${Math.round(forecast.main.temp)}°</p>
            <p>${forecast.weather[0].main}</p>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}

// Function to display the current weather data
function displayWeather(data) {
    const { name, weather, main, wind } = data;
    document.getElementById("city-name").textContent = name;
    document.getElementById("weather-description").textContent = weather[0].description;
    document.getElementById("temperature").textContent = `${Math.round(main.temp)}°`;
    document.getElementById("humidity").textContent = `Humidity: ${main.humidity}%`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${wind.speed} m/s`;

    // Display weather icon
    const iconCode = weather[0].icon;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Toggle temperature unit between Celsius and Fahrenheit
document.getElementById("unit-toggle").addEventListener("click", () => {
    currentUnit = currentUnit === "metric" ? "imperial" : "metric";
    const unitSymbol = currentUnit === "metric" ? "°C" : "°F";
    document.getElementById("unit-toggle").textContent = unitSymbol;

    const city = document.getElementById("city-input").value.trim();
    if (city) {
        getWeather(city);
    }
});

// Add event listener for search button
document.getElementById("search-button").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

// Add event listener for location button
document.getElementById("location-button").addEventListener("click", () => {
    getWeatherByLocation();
});

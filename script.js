const apiKey = "e7030ed9ba490a0b1e9e61cc8434c0cf"; // Replace with your actual API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

// Function to fetch weather data based on city name
async function getWeather(city) {
    try {
        const weatherResponse = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        // Check if the city is valid
        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }

        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);
        getForecast(city);
    } catch (error) {
        alert(error.message);  // Display an alert if an error occurs
    }
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
    try {
        const forecastResponse = await fetch(`${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!forecastResponse.ok) {
            throw new Error('Forecast data not found');
        }

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
                <p>${Math.round(forecast.main.temp)}°C</p>
                <p>${forecast.weather[0].main}</p>
            `;
            forecastContainer.appendChild(forecastItem);
        }
    } catch (error) {
        console.error(error.message);  // Log any forecast-related errors
    }
}

// Add event listener for search button
document.getElementById("search-button").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

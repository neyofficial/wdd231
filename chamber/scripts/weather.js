const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastContainer = document.querySelector("#forecast");

// 🔑 Replace with YOUR OpenWeatherMap API key
const apiKey = "YOUR_API_KEY_HERE";

// 📍 Chamber location (example: Accra, Ghana)
const lat = 5.6037;
const lon = -0.1870;

const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeatherData() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) {
      throw new Error("Weather data not available");
    }

    const data = await response.json();

    // ---- Current Weather ----
    currentTemp.textContent = Math.round(data.list[0].main.temp);
    weatherDesc.textContent = data.list[0].weather[0].description;

    // ---- 3-Day Forecast ----
    forecastContainer.innerHTML = "";

    const forecastDays = data.list.filter(item =>
      item.dt_txt.includes("12:00:00")
    ).slice(0, 3);

    forecastDays.forEach(day => {
      const li = document.createElement("li");
      const date = new Date(day.dt_txt).toLocaleDateString();
      li.textContent = `${date}: ${Math.round(day.main.temp)}°C`;
      forecastContainer.appendChild(li);
    });

  } catch (error) {
    console.error(error);
  }
}

getWeatherData();

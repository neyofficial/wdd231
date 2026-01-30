// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = navMenu.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', isExpanded);
  });
}

// ===== WEATHER SECTION =====
const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const weatherDesc = document.getElementById('weather-desc');
const forecastContainer = document.getElementById('forecast-container');

// Accra, Ghana coordinates (replace with your city)
const lat = 5.56;
const lon = -0.20;
const apiKey = 'YOUR_API_KEY_HERE'; // ⚠️ REPLACE WITH YOUR ACTUAL API KEY

// API URLs
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Fetch current weather
async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error('Weather fetch error:', error);
    currentTemp.textContent = 'N/A';
    weatherDesc.textContent = 'Weather data currently unavailable';
    weatherIcon.style.display = 'none';
  }
}

// Display current weather
function displayWeather(data) {
  const temp = Math.round(data.main.temp);
  currentTemp.innerHTML = `${temp}&deg;F`;
  
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  
  weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
  weatherIcon.setAttribute('alt', description);
  weatherIcon.style.display = 'block';
  weatherDesc.textContent = description;
}

// Fetch 3-day forecast
async function fetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error('Forecast fetch error:', error);
    forecastContainer.innerHTML = '<p>Forecast data currently unavailable</p>';
  }
}

// Display 3-day forecast
function displayForecast(data) {
  forecastContainer.innerHTML = '';
  
  // Get noon forecasts for next 3 days
  const noonForecasts = data.list.filter(item => 
    item.dt_txt.includes('12:00:00')
  ).slice(0, 3);
  
  // If not enough noon forecasts, use any 3 future forecasts
  const forecasts = noonForecasts.length >= 3 ? noonForecasts : data.list.slice(0, 3);
  
  forecasts.forEach(forecast => {
    const date = new Date(forecast.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const temp = Math.round(forecast.main.temp);
    const description = forecast.weather[0].description;
    
    const forecastDay = document.createElement('div');
    forecastDay.className = 'forecast-day';
    forecastDay.innerHTML = `
      <h4>${dayName}</h4>
      <p class="forecast-temp">${temp}&deg;F</p>
      <p class="forecast-desc">${description}</p>
    `;
    
    forecastContainer.appendChild(forecastDay);
  });
}

// ===== COMPANY SPOTLIGHTS =====
const spotlightContainer = document.getElementById('spotlight-container');
const membersUrl = 'data/members.json';

// Fetch members data
async function fetchMembers() {
  try {
    const response = await fetch(membersUrl);
    if (response.ok) {
      const members = await response.json();
      displaySpotlights(members);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error('Members fetch error:', error);
    spotlightContainer.innerHTML = '<p>Unable to load member spotlights at this time</p>';
  }
}

// Display random gold/silver member spotlights
function displaySpotlights(members) {
  // Filter for gold (3) and silver (2) members only
  const qualifiedMembers = members.filter(member => 
    member.membershipLevel === 2 || member.membershipLevel === 3
  );
  
  // Check if we have enough qualified members
  if (qualifiedMembers.length === 0) {
    spotlightContainer.innerHTML = '<p>No qualified members available for spotlight</p>';
    return;
  }
  
  // Randomly select 2 or 3 members
  const numSpotlights = Math.random() < 0.5 ? 2 : 3;
  const count = Math.min(numSpotlights, qualifiedMembers.length);
  const spotlights = getRandomMembers(qualifiedMembers, count);
  
  // Clear container
  spotlightContainer.innerHTML = '';
  
  // Create cards for each spotlight
  spotlights.forEach(member => {
    const card = document.createElement('article');
    card.className = 'spotlight-card';
    
    const membershipText = member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';
    const badgeClass = member.membershipLevel === 3 ? 'badge-gold' : 'badge-silver';
    
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="150" height="150">
      <h3>${member.name}</h3>
      <p class="address">${member.address}</p>
      <p class="phone">📞 ${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener" aria-label="Visit ${member.name} website">${member.website}</a></p>
      <span class="membership-badge ${badgeClass}">${membershipText}</span>
    `;
    
    spotlightContainer.appendChild(card);
  });
}

// Get random members from array
function getRandomMembers(array, count) {
  // Create a copy to avoid modifying original
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// ===== FOOTER DYNAMIC CONTENT =====
function updateFooter() {
  const yearSpan = document.getElementById('current-year');
  const modifiedSpan = document.getElementById('last-modified');
  
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  if (modifiedSpan) {
    modifiedSpan.textContent = document.lastModified;
  }
}

// ===== INITIALIZE ALL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  fetchForecast();
  fetchMembers();
  updateFooter();
});
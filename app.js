const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

async function getWeather(city) {
  loading.classList.remove('hidden');
  error.classList.add('hidden');
  weatherResult.classList.add('hidden');

  try {
    const res = await fetch(
      `/.netlify/functions/weather?city=${encodeURIComponent(city)}`
    );
    if (!res.ok) throw new Error('Magaalada lama helin');
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    error.textContent = `❌ ${err.message}`;
    error.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
  }
}

function displayWeather(data) {
  document.getElementById('cityName').textContent = 
    `${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent = 
    `${Math.round(data.main.temp)}°C`;
  document.getElementById('description').textContent = 
    data.weather[0].description;
  document.getElementById('humidity').textContent = 
    `${data.main.humidity}%`;
  document.getElementById('wind').textContent = 
    `${data.wind.speed} m/s`;
  document.getElementById('weatherIcon').textContent = 
    getWeatherEmoji(data.weather[0].main);

  weatherResult.classList.remove('hidden');
}

function getWeatherEmoji(condition) {
  const map = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Fog: '🌫️',
    Haze: '🌫️'
  };
  return map[condition] || '🌤️';
}

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchBtn.click();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('✅ SW registered:', reg.scope))
      .catch(err => console.log('❌ SW error:', err));
  });
}

getWeather('Mogadishu');

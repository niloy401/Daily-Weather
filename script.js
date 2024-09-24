const apiKey = '93dce8df1b6345f18ad105654242209';
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const weatherDataContainer = document.getElementById('weather-data');

searchBtn.addEventListener('click', async () => {
    const location = searchInput.value.trim();
    if (location) {
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
            const data = await response.json();
            displayWeatherData(data);
        } catch (error) {
            console.error(error);
            displayError('Failed to fetch weather data. Please try again.');
        }
    } else {
        displayError('Please enter a location.');
    }
});

function displayWeatherData(data) {
    const weatherCard = document.createElement('div');
    weatherCard.className = 'weather-card';

    const location = document.createElement('h2');
    location.textContent = data.location.name;

    const condition = document.createElement('p');
    condition.textContent = `Condition: ${data.current.condition.text}`;

    const temperature = document.createElement('p');
    temperature.textContent = `Temperature: ${data.current.temp_c}°C`;

    weatherCard.appendChild(location);
    weatherCard.appendChild(condition);
    weatherCard.appendChild(temperature);

    weatherDataContainer.innerHTML = '';
    weatherDataContainer.appendChild(weatherCard);
}

function displayError(message) {
    const errorElement = document.createElement('p');
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    weatherDataContainer.innerHTML = '';
    weatherDataContainer.appendChild(errorElement);
}
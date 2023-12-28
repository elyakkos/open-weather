class WeatherApp {
    constructor() {
        this.apiUrl = 'https://geocoding-api.open-meteo.com/v1/search';
        this.weatherUrl = 'https://api.open-meteo.com/v1/forecast';
        this.weatherDisplay = document.getElementById('weatherDisplay');
    }

    async getWeatherData(city) {
        try {
            const geocodingResponse = await fetch(`${this.apiUrl}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
            const geocodingData = await geocodingResponse.json();

            const latitude = geocodingData[0].latitude;
            const longitude = geocodingData[0].longitude;

            const weatherResponse = await fetch(`${this.weatherUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m`);
            const weatherData = await weatherResponse.json();

            const temperature = weatherData.current.temperature_2m;
            const humidity = weatherData.current.relative_humidity_2m;

            this.displayWeather(city, temperature, humidity);
        } catch (error) {
            console.error('Error fetching data:', error);
            this.weatherDisplay.innerHTML = 'Error fetching data. Please try again.';
        }
    }

    displayWeather(city, temperature, humidity) {
        this.weatherDisplay.innerHTML = `Weather in ${city}: Temperature - ${temperature}°C, Humidity - ${humidity}%`;
    }
}

const weatherApp = new WeatherApp();

function getWeather() {
    const city = document.getElementById('cityInput').value;
    weatherApp.getWeatherData(city);
}

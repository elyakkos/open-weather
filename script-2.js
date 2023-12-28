function loadWeather() {
    const city = document.getElementById('city-input').value;
    const urlGeocoding = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    fetch(urlGeocoding)
    .then(response => response.json())
    .then(data => {
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;

        const urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m`;

        fetch(urlWeather)
        .then(response => response.json())
        .then(data => {
            const currentCondition = data.current;

            const html = `<h5>Погода для города "${city}"</h5>
                <ul>
                <li>Время: ${currentCondition.time}</li>
                <li>Температура: ${currentCondition.temperature_2m}°C</li>
                <li>Влажность: ${currentCondition.relative_humidity_2m} %</li>
                </ul>`;

            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = html;
            weatherContainer.style.display = 'block';
        });
    });
}

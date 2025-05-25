document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const locationSelect = document.getElementById('location-select');
    const getWeatherBtn = document.getElementById('get-weather');
    const weatherResults = document.getElementById('weather-results');
    const forecastGrid = document.getElementById('forecast-grid');
    const recommendationsDiv = document.getElementById('recommendations');
    
    // Weather data for different locations
    const weatherData = {
        'Greater Accra': {
            name: 'Greater Accra',
            current: {
                temp: 28,
                desc: 'Partly Cloudy',
                icon: 'cloud-sun',
                humidity: 75,
                wind: 12,
                rain: 0
            },
            forecast: [
                { day: 'Mon', temp: { max: 29, min: 25 }, icon: 'cloud-sun', rain: 0 },
                { day: 'Tue', temp: { max: 30, min: 26 }, icon: 'sun', rain: 0 },
                { day: 'Wed', temp: { max: 28, min: 25 }, icon: 'cloud-showers-heavy', rain: 15 },
                { day: 'Thu', temp: { max: 27, min: 24 }, icon: 'cloud-rain', rain: 8 },
                { day: 'Fri', temp: { max: 29, min: 25 }, icon: 'cloud-sun', rain: 2 },
                { day: 'Sat', temp: { max: 30, min: 26 }, icon: 'sun', rain: 0 },
                { day: 'Sun', temp: { max: 29, min: 25 }, icon: 'cloud-sun', rain: 0 }
            ]
        },
        'Upper East Region': {
            name: 'Upper East Region',
            current: {
                temp: 32,
                desc: 'Sunny',
                icon: 'sun',
                humidity: 45,
                wind: 8,
                rain: 1
            },
            forecast: [
                { day: 'Mon', temp: { max: 33, min: 22 }, icon: 'sun', rain: 0 },
                { day: 'Tue', temp: { max: 34, min: 23 }, icon: 'sun', rain: 0 },
                { day: 'Wed', temp: { max: 32, min: 23 }, icon: 'cloud-sun', rain: 0 },
                { day: 'Thu', temp: { max: 31, min: 22 }, icon: 'cloud-sun', rain: 0 },
                { day: 'Fri', temp: { max: 33, min: 23 }, icon: 'sun', rain: 0 },
                { day: 'Sat', temp: { max: 34, min: 24 }, icon: 'sun', rain: 0 },
                { day: 'Sun', temp: { max: 33, min: 23 }, icon: 'sun', rain: 0 }
            ]
        },
        'Northern Region': {
            name: 'Northern Region',
            current: {
                temp: 28,
                desc: 'Partly Cloudy',
                icon: 'cloud-sun',
                humidity: 60,
                wind: 10,
                rain: 0
            },
            forecast: [
                { day: 'Mon', temp: { max: 30, min: 18 }, icon: 'cloud-sun', rain: 0 },
                { day: 'Tue', temp: { max: 28, min: 19 }, icon: 'sun', rain: 0 },
                { day: 'Wed', temp: { max: 26, min: 18 }, icon: 'cloud-showers-heavy', rain: 12 },
                { day: 'Thu', temp: { max: 29, min: 19 }, icon: 'cloud-rain', rain: 5 },
                { day: 'Fri', temp: { max: 27, min: 18 }, icon: 'cloud-sun', rain: 1 },
                { day: 'Sat', temp: { max: 31, min: 19 }, icon: 'sun', rain: 0 },
                { day: 'Sun', temp: { max: 27, min: 18 }, icon: 'cloud-sun', rain: 0 }
            ]
        },
        'Upper West Region': {
            name: 'Upper West Region',
            current: {
                temp: 31,
                desc: 'Cloudy',
                icon: 'cloud',
                humidity: 50,
                wind: 6,
                rain: 5
            },
            forecast: [
                { day: 'Mon', temp: { max: 33, min: 21 }, icon: 'cloud', rain: 3 },
                { day: 'Tue', temp: { max: 29, min: 22 }, icon: 'cloud-sun', rain: 1 },
                { day: 'Wed', temp: { max: 27, min: 21 }, icon: 'cloud-showers-heavy', rain: 20 },
                { day: 'Thu', temp: { max: 29, min: 21 }, icon: 'cloud-rain', rain: 10 },
                { day: 'Fri', temp: { max: 30, min: 22 }, icon: 'cloud-sun', rain: 2 },
                { day: 'Sat', temp: { max: 34, min: 22 }, icon: 'sun', rain: 0 },
                { day: 'Sun', temp: { max: 21, min: 22 }, icon: 'cloud-sun', rain: 1 }
            ]
        },
        'North East Region': {
            name: 'North East Region',
            current: {
                temp: 30,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 75,
                wind: 9,
                rain: 8
            },
            forecast: [
                { day: 'Mon', temp: { max: 30, min: 24 }, icon: 'cloud-rain', rain: 10 },
                { day: 'Tue', temp: { max: 31, min: 24 }, icon: 'cloud-sun', rain: 2 },
                { day: 'Wed', temp: { max: 29, min: 24 }, icon: 'cloud-showers-heavy', rain: 25 },
                { day: 'Thu', temp: { max: 28, min: 24 }, icon: 'cloud-rain', rain: 15 },
                { day: 'Fri', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 3 },
                { day: 'Sat', temp: { max: 31, min: 25 }, icon: 'sun', rain: 0 },
                { day: 'Sun', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 1 }
            ]
        },
        'Ashanti Region': {
            name: 'Ashanti Region',
            current: {
                temp: 25,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 95,
                wind: 9,
                rain: 18
            },
            forecast: [
                { day: 'Mon', temp: { max: 25, min: 24 }, icon: 'cloud-rain', rain: 10 },
                { day: 'Tue', temp: { max: 23, min: 24 }, icon: 'cloud-sun', rain: 7 },
                { day: 'Wed', temp: { max: 28, min: 24 }, icon: 'cloud-showers-heavy', rain: 25 },
                { day: 'Thu', temp: { max: 28, min: 24 }, icon: 'cloud-rain', rain: 15 },
                { day: 'Fri', temp: { max: 26, min: 24 }, icon: 'cloud-sun', rain: 3 },
                { day: 'Sat', temp: { max: 26, min: 25 }, icon: 'sun', rain: 0 },
                { day: 'Sun', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 8 }
            ]
        },
        'Volta Region': {
            name: 'Volta Region',
            current: {
                temp: 29,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 75,
                wind: 13,
                rain: 11
            },
            forecast: [
                { day: 'Mon', temp: { max: 29, min: 24 }, icon: 'cloud-rain', rain: 10 },
                { day: 'Tue', temp: { max: 27, min: 24 }, icon: 'cloud-sun', rain: 33 },
                { day: 'Wed', temp: { max: 31, min: 24 }, icon: 'cloud-showers-heavy', rain: 25 },
                { day: 'Thu', temp: { max: 28, min: 24 }, icon: 'cloud-rain', rain: 15 },
                { day: 'Fri', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 30 },
                { day: 'Sat', temp: { max: 31, min: 25 }, icon: 'sun', rain: 0 },
                { day: 'Sun', temp: { max: 25, min: 24 }, icon: 'cloud-sun', rain: 13 }
            ]
        },
        'Ahafo Region': {
            name: 'Ahafo Region',
            current: {
                temp: 27,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 85,
                wind: 7,
                rain: 19
            },
            forecast: [
                { day: 'Mon', temp: { max: 31, min: 20 }, icon: 'cloud-rain', rain: 10 },
                { day: 'Tue', temp: { max: 25, min: 22 }, icon: 'cloud-sun', rain: 2 },
                { day: 'Wed', temp: { max: 29, min: 24 }, icon: 'cloud-showers-heavy', rain: 25 },
                { day: 'Thu', temp: { max: 28, min: 27 }, icon: 'cloud-rain', rain: 15 },
                { day: 'Fri', temp: { max: 30, min: 25 }, icon: 'cloud-sun', rain: 3 },
                { day: 'Sat', temp: { max: 31, min: 25 }, icon: 'sun', rain: 10 },
                { day: 'Sun', temp: { max: 30, min: 22 }, icon: 'cloud-sun', rain: 2 }
            ]
        },
        'Oti Region': {
            name: 'Oti Region',
            current: {
                temp: 26,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 75,
                wind: 3,
                rain: 45
            },
            forecast: [
                { day: 'Mon', temp: { max: 29, min: 23 }, icon: 'cloud-rain', rain: 10 },
                { day: 'Tue', temp: { max: 31, min: 24 }, icon: 'cloud-sun', rain: 2 },
                { day: 'Wed', temp: { max: 28, min: 27 }, icon: 'cloud-showers-heavy', rain: 25 },
                { day: 'Thu', temp: { max: 28, min: 24 }, icon: 'cloud-rain', rain: 15 },
                { day: 'Fri', temp: { max: 27, min: 21 }, icon: 'cloud-sun', rain: 3 },
                { day: 'Sat', temp: { max: 31, min: 25 }, icon: 'sun', rain: 0 },
                { day: 'Sun', temp: { max: 30, min: 25 }, icon: 'cloud-sun', rain: 1 }
            ]
        },
        'Savannah Region': {
            name: 'Savannah Region',
            current: {
                temp: 32,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 66,
                wind: 22,
                rain: 6
            },
            forecast: [
                { day: 'Mon', temp: { max: 32, min: 25 }, icon: 'cloud-rain', rain: 1 },
                { day: 'Tue', temp: { max: 30, min: 21 }, icon: 'cloud-sun', rain: 2 },
                { day: 'Wed', temp: { max: 33, min: 19 }, icon: 'cloud-showers-heavy', rain: 2 },
                { day: 'Thu', temp: { max: 28, min: 23 }, icon: 'cloud-rain', rain: 15 },
                { day: 'Fri', temp: { max: 35, min: 29 }, icon: 'cloud-sun', rain: 3 },
                { day: 'Sat', temp: { max: 31, min: 26 }, icon: 'sun', rain: 10 },
                { day: 'Sun', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 1 }
            ]
        },
        'Bono East Region': {
            name: 'Bono East Region',
            current: {
                temp: 25,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 58,
                wind: 21,
                rain: 14
            },
            forecast: [
                { day: 'Mon', temp: { max: 29, min: 25 }, icon: 'cloud-rain', rain: 50 },
                { day: 'Tue', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 2 },
                { day: 'Wed', temp: { max: 27, min: 22 }, icon: 'cloud-showers-heavy', rain: 65 },
                { day: 'Thu', temp: { max: 25, min: 23 }, icon: 'cloud-rain', rain: 15 },
                { day: 'Fri', temp: { max: 30, min: 20 }, icon: 'cloud-sun', rain: 3 },
                { day: 'Sat', temp: { max: 28, min: 25 }, icon: 'sun', rain: 20 },
                { day: 'Sun', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 11 }
            ]
        },
        'Western Region': {
            name: 'Western Region',
            current: {
                temp: 24,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 88,
                wind: 3,
                rain: 13
            },
            forecast: [
                { day: 'Mon', temp: { max: 25, min: 21 }, icon: 'cloud-rain', rain: 8 },
                { day: 'Tue', temp: { max: 29, min: 23 }, icon: 'cloud-sun', rain: 2 },
                { day: 'Wed', temp: { max: 25, min: 24 }, icon: 'cloud-showers-heavy', rain: 15 },
                { day: 'Thu', temp: { max: 28, min: 24 }, icon: 'cloud-rain', rain: 25 },
                { day: 'Fri', temp: { max: 29, min: 27 }, icon: 'cloud-sun', rain: 4 },
                { day: 'Sat', temp: { max: 31, min: 25 }, icon: 'sun', rain: 10 },
                { day: 'Sun', temp: { max: 27, min: 24 }, icon: 'cloud-sun', rain: 1 }
            ]
        },
        'Western North Region': {
            name: 'Western North Region',
            current: {
                temp: 28,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 75,
                wind: 10,
                rain: 12
            },
            forecast: [
                { day: 'Mon', temp: { max: 27, min: 24 }, icon: 'cloud-rain', rain: 12 },
                { day: 'Tue', temp: { max: 24, min: 24 }, icon: 'cloud-sun', rain: 2 },
                { day: 'Wed', temp: { max: 27, min: 24 }, icon: 'cloud-showers-heavy', rain: 15 },
                { day: 'Thu', temp: { max: 28, min: 24 }, icon: 'cloud-rain', rain: 9 },
                { day: 'Fri', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 3 },
                { day: 'Sat', temp: { max: 25, min: 25 }, icon: 'sun', rain: 2 },
                { day: 'Sun', temp: { max: 26, min: 24 }, icon: 'cloud-sun', rain: 0 }
            ]
        },
        'Central Region': {
            name: 'Central Region',
            current: {
                temp: 28,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 77,
                wind: 11,
                rain: 7
            },
            forecast: [
                { day: 'Mon', temp: { max: 30, min: 24 }, icon: 'cloud-rain', rain: 10 },
                { day: 'Tue', temp: { max: 31, min: 24 }, icon: 'cloud-sun', rain: 2 },
                { day: 'Wed', temp: { max: 29, min: 24 }, icon: 'cloud-showers-heavy', rain: 25 },
                { day: 'Thu', temp: { max: 28, min: 24 }, icon: 'cloud-rain', rain: 15 },
                { day: 'Fri', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 3 },
                { day: 'Sat', temp: { max: 31, min: 25 }, icon: 'sun', rain: 0 },
                { day: 'Sun', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 1 }
            ]
        },
        'Eastern Region': {
            name: 'Eastern Region',
            current: {
                temp: 26,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 65,
                wind: 13,
                rain: 7
            },
            forecast: [
                { day: 'Mon', temp: { max: 22, min: 18 }, icon: 'cloud-rain', rain: 30 },
                { day: 'Tue', temp: { max: 27, min: 25 }, icon: 'cloud-sun', rain: 11 },
                { day: 'Wed', temp: { max: 29, min: 26 }, icon: 'cloud-showers-heavy', rain: 15 },
                { day: 'Thu', temp: { max: 25, min: 20 }, icon: 'cloud-rain', rain: 12 },
                { day: 'Fri', temp: { max: 26, min: 24 }, icon: 'cloud-sun', rain: 30 },
                { day: 'Sat', temp: { max: 21, min: 17 }, icon: 'sun', rain: 10 },
                { day: 'Sun', temp: { max: 23, min: 20 }, icon: 'cloud-sun', rain: 11 }
            ]
        },
        'Brong Ahafo Region': {
            name: 'Brong Ahafo Region',
            current: {
                temp: 29,
                desc: 'Rainy',
                icon: 'cloud-rain',
                humidity: 81,
                wind: 7,
                rain: 5
            },
            forecast: [
                { day: 'Mon', temp: { max: 30, min: 24 }, icon: 'cloud-rain', rain: 14 },
                { day: 'Tue', temp: { max: 31, min: 24 }, icon: 'cloud-sun', rain: 2 },
                { day: 'Wed', temp: { max: 29, min: 24 }, icon: 'cloud-showers-heavy', rain: 25 },
                { day: 'Thu', temp: { max: 28, min: 24 }, icon: 'cloud-rain', rain: 12 },
                { day: 'Fri', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 3 },
                { day: 'Sat', temp: { max: 31, min: 25 }, icon: 'sun', rain: 10 },
                { day: 'Sun', temp: { max: 30, min: 24 }, icon: 'cloud-sun', rain: 3 }
            ]
        },
    };

    // Get current date
    function getCurrentDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    }

    // Update current weather display
    function updateCurrentWeather(location) {
        const data = weatherData[location];
        const current = data.current;
        
        document.getElementById('current-location').textContent = data.name;
        document.getElementById('current-date').textContent = getCurrentDate();
        document.getElementById('current-temp').textContent = current.temp;
        document.getElementById('current-desc').textContent = current.desc;
        document.getElementById('current-icon').className = `fas fa-${current.icon}`;
        document.getElementById('humidity').textContent = `${current.humidity}%`;
        document.getElementById('wind').textContent = `${current.wind} km/h`;
        document.getElementById('rain').textContent = `${current.rain} mm`;
    }

    // Update forecast display
    function updateForecast(location) {
        const forecast = weatherData[location].forecast;
        forecastGrid.innerHTML = forecast.map(day => `
            <div class="forecast-item">
                <div class="forecast-day">${day.day}</div>
                <div class="forecast-icon">
                    <i class="fas fa-${day.icon}"></i>
                </div>
                <div class="forecast-temp">
                    <span class="max-temp">${day.temp.max}°</span>
                    <span class="min-temp">${day.temp.min}°</span>
                </div>
                <div class="forecast-rain">
                    <i class="fas fa-tint"></i> ${day.rain}mm
                </div>
            </div>
        `).join('');
    }

    // Generate farming recommendations
    function generateRecommendations(location) {
        const current = weatherData[location].current;
        const forecast = weatherData[location].forecast;
        const recommendations = [];
        
        // Current weather recommendations
        if (current.rain > 5) {
            recommendations.push("Delay irrigation as significant rain is expected");
        }
        
        if (current.humidity > 80) {
            recommendations.push("High humidity expected - watch for fungal diseases");
        }
        
        // Forecast recommendations
        const willRain = forecast.some(day => day.rain > 10);
        const willBeHot = forecast.some(day => day.temp.max > 32);
        const willBeCold = forecast.some(day => day.temp.min < 18);
        
        if (willRain) {
            recommendations.push("Prepare drainage for expected heavy rainfall later in the week");
        }
        
        if (willBeHot) {
            recommendations.push("Provide shade for sensitive crops during peak heat days");
        }
        
        if (willBeCold) {
            recommendations.push("Protect sensitive crops from potential cold temperatures");
        }
        
        // Default recommendation if none apply
        if (recommendations.length === 0) {
            recommendations.push("Weather conditions are favorable for most farming activities");
        }
        
        // Update recommendations display
        const recommendationList = recommendationsDiv.querySelector('.recommendation-list');
        recommendationList.innerHTML = recommendations.map(rec => 
            `<div class="recommendation-item"><i class="fas fa-check-circle"></i> ${rec}</div>`
        ).join('');
    }

    // Get weather for selected location
    function getWeather() {
        const location = locationSelect.value;
        if (!location) {
            alert('Please select a location');
            return;
        }
        
        updateCurrentWeather(location);
        updateForecast(location);
        generateRecommendations(location);
        
        // Show results
        weatherResults.style.display = 'block';
    }

    // Event listeners
    getWeatherBtn.addEventListener('click', getWeather);
    
    // Initialize with current date
    document.getElementById('current-date').textContent = getCurrentDate();
});
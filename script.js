const dogApi = document.getElementById('dog-api');
const dogOutput = document.getElementById('dog-output');
const catApi = document.getElementById('cat-api');
const catOutput = document.getElementById('cat-output');
const weatherApi = document.getElementById('weather-api');
const weatherOutput = document.getElementById('weather-output');
const currencyApi = document.getElementById('currency-api');
const currencyOutput = document.getElementById('currency-output');
const movieApi = document.getElementById('movie-api');
const movieOutput = document.getElementById('movie-output');
const gitHubApi = document.getElementById('github-api');
const gitHubOutput = document.getElementById('github-output');
const jokeApi = document.getElementById('joke-api');
const jokeOutput = document.getElementById('joke-output');
const publiicApi = document.getElementById('public-api');
const publicOutput = document.getElementById('publicapi-output');

// Function to fetch and display a random dog image
async function fetchDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    console.log(data);

    dogOutput.innerHTML = "";

    const img = document.createElement('img');
    img.src = data.message;

    dogOutput.appendChild(img);
}

// Add event listener to the dog API button
if (dogApi) dogApi.addEventListener('click', fetchDogImage);

//function to fetch and display a random cat image
async function fetchCatImage() {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    console.log(data);

    catOutput.innerHTML = "";

    const img = document.createElement('img');
    img.src = data[0].url;

    catOutput.appendChild(img);
}

// Add event listener to the cat API button
if (catApi) catApi.addEventListener('click', fetchCatImage);

// Placeholder fetchWeather function (kept for compatibility)
async function fetchWeather() {
    const city = 'New York'; // placeholder - not used here
    console.log('fetchWeather placeholder for', city);
}

// Fetch and display current weather for Phoenix, AZ using Open-Meteo
// Element references
const dogApi = document.getElementById('dog-api');
const dogOutput = document.getElementById('dog-output');
const catApi = document.getElementById('cat-api');
const catOutput = document.getElementById('cat-output');
const weatherApi = document.getElementById('weather-api');
const weatherOutput = document.getElementById('weather-output');
const currencyApi = document.getElementById('currency-api');
const currencyOutput = document.getElementById('currency-output');
const movieApi = document.getElementById('movie-api');
const movieOutput = document.getElementById('movie-output');
const gitHubApi = document.getElementById('github-api');
const gitHubOutput = document.getElementById('github-output');
const jokeApi = document.getElementById('joke-api');
const jokeOutput = document.getElementById('joke-output');
const publicApi = document.getElementById('public-api');
const publicOutput = document.getElementById('publicapi-output');

// Dog image
async function fetchDogImage() {
    const resp = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await resp.json();
    if (dogOutput) {
        dogOutput.innerHTML = '';
        const img = document.createElement('img');
        img.src = data.message;
        dogOutput.appendChild(img);
    }
}
if (dogApi) dogApi.addEventListener('click', fetchDogImage);

// Cat image
async function fetchCatImage() {
    const resp = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await resp.json();
    if (catOutput) {
        catOutput.innerHTML = '';
        const img = document.createElement('img');
        img.src = data[0].url;
        catOutput.appendChild(img);
    }
}
if (catApi) catApi.addEventListener('click', fetchCatImage);

// Placeholder
async function fetchWeather() {
    console.log('fetchWeather placeholder');
}

// Fetch current weather for Phoenix using Open-Meteo
async function fetchWeatherPhoenix() {
    // Phoenix coordinates
    const lat = 33.4484;
    const lon = -112.0740;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
        if (weatherOutput) weatherOutput.innerHTML = 'Loading current weather for Phoenix...';

        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

        const json = await resp.json();
        const cw = json.current_weather;
        if (!cw) throw new Error('No current_weather in response');

        const tempC = cw.temperature;
        const tempF = Math.round((tempC * 9) / 5 + 32);

        if (weatherOutput) {
            weatherOutput.innerHTML = '';
            const h = document.createElement('h3');
            h.textContent = 'Phoenix, AZ';

            const tempP = document.createElement('p');
            tempP.textContent = `Temperature: ${tempF}°F (${tempC}°C)`;

            const windP = document.createElement('p');
            windP.textContent = `Wind: ${cw.windspeed} km/h, direction ${cw.winddirection}°`;

            const codeP = document.createElement('p');
            codeP.textContent = `Weather code: ${cw.weathercode}`;

            weatherOutput.appendChild(h);
            weatherOutput.appendChild(tempP);
            weatherOutput.appendChild(windP);
            weatherOutput.appendChild(codeP);
        }
    } catch (err) {
        console.error('fetchWeatherPhoenix error:', err);
        if (weatherOutput) weatherOutput.innerHTML = 'Unable to load Phoenix weather. See console.';
    }
}

if (weatherApi) weatherApi.addEventListener('click', fetchWeatherPhoenix);

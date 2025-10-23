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
async function fetchWeatherPhoenix() {
    const latitude = 33.4484;
    const longitude = -112.0740;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
        if (weatherOutput) weatherOutput.innerHTML = 'Loading current weather for Phoenix...';
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();

        const cw = json.current_weather;
        if (!cw) throw new Error('No current_weather in response');

        const tempC = cw.temperature;
        const tempF = Math.round((tempC * 9) / 5 + 32);

        if (weatherOutput) weatherOutput.innerHTML = '';

        const h = document.createElement('h3');
        h.textContent = 'Phoenix, AZ';

        const p1 = document.createElement('p');
        p1.textContent = `Temperature: ${tempF}°F (${tempC}°C)`;

        const p2 = document.createElement('p');
        p2.textContent = `Wind: ${cw.windspeed} km/h, direction ${cw.winddirection}°`;

        const p3 = document.createElement('p');
        p3.textContent = `Weather code: ${cw.weathercode}`;

        weatherOutput.appendChild(h);
        weatherOutput.appendChild(p1);
        weatherOutput.appendChild(p2);
        weatherOutput.appendChild(p3);
    } catch (err) {
        console.error('Error fetching Phoenix weather', err);
        if (weatherOutput) weatherOutput.innerHTML = 'Unable to load Phoenix weather. See console for details.';
    }
}

// Wire the weather button to Phoenix function
if (weatherApi) weatherApi.addEventListener('click', fetchWeatherPhoenix);


//write me a code to exchange currency using await fetch and display the result in currencyOutput
async function fetchCurrencyExchange() {
    // Try to read inputs from the page first
    const fromInput = document.getElementById('from-currency');
    const toInput = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');

    let fromCurrency = fromInput ? fromInput.value.trim().toUpperCase() : '';
    let toCurrency = toInput ? toInput.value.trim().toUpperCase() : '';
    let amount = amountInput ? parseFloat(amountInput.value) : NaN;

    // Fallback to prompts if inputs not present or empty
    if (!fromCurrency) fromCurrency = (prompt('From currency (e.g. USD)') || 'USD').trim().toUpperCase();
    if (!toCurrency) toCurrency = (prompt('To currency (e.g. EUR)') || 'EUR').trim().toUpperCase();
    if (!amount || Number.isNaN(amount)) {
        const amtStr = prompt('Amount (numeric)', '1') || '1';
        amount = parseFloat(amtStr);
    }

    if (!fromCurrency || !toCurrency || Number.isNaN(amount)) {
        if (currencyOutput) currencyOutput.innerHTML = 'Invalid currency or amount.';
        return;
    }

    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        if (currencyOutput) currencyOutput.innerHTML = 'Loading currency exchange rate...';
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();

        const rate = json.rates && json.rates[toCurrency];
        if (!rate) throw new Error(`No rate for ${toCurrency}`);

        const exchangedAmount = (amount * rate).toFixed(2);
        if (currencyOutput) currencyOutput.innerHTML = `${amount} ${fromCurrency} = ${exchangedAmount} ${toCurrency} (Rate: ${rate})`;
    } catch (err) {
        console.error('Error fetching currency exchange', err);
        if (currencyOutput) currencyOutput.innerHTML = 'Unable to load currency exchange rate. See console for details.';
    }
}

// Wire the currency button to the function
if (currencyApi) currencyApi.addEventListener('click', fetchCurrencyExchange);

// Small global wrappers so the inline onclicks in index.html keep working
function getDogImage() { fetchDogImage(); }
function getCatImage() { fetchCatImage(); }
function getWeather() { fetchWeatherPhoenix(); }
function getExchangeRates() { fetchCurrencyExchange(); }
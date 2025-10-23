const dogApi = document.getElementById('dog-api');
const dogOutput = document.getElementById('dog-output');
const catApi = document.getElementById('cat-api');
const catOutput = document.getElementById('cat-output');
const weatherApi = document.getElementById('weather-api');
const weatherOutput = document.getElementById('weather-output');
const currencyApi = document.getElementById('currency-api');
const currencyOutput = document.getElementById('currency-output');
const movieApi = document.getElementById('movies-api');
const movieOutput = document.getElementById('movies-output');
const gitHubApi = document.getElementById('github-api');
const gitHubOutput = document.getElementById('github-output');
const jokeApi = document.getElementById('joke-api');
const jokeOutput = document.getElementById('joke-output');
const meowApi = document.getElementById('meowfacts');
const meowOutput = document.getElementById('meowfacts-output');


// Helper to show loading spinner
function showLoading(outputElement, message = 'Loading...') {
    if (!outputElement) return;
    outputElement.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <div>${message}</div>
        </div>
    `;
}

// Function to fetch and display a random dog image
async function fetchDogImage() {
    showLoading(dogOutput, 'Fetching a dog...');
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
    showLoading(catOutput, 'Fetching a cat...');
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
        showLoading(weatherOutput, 'Loading current weather for Phoenix...');
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


//function for the currency exchange API
async function fetchCurrencyExchange() {
    const fromInput = document.getElementById('from-currency');
    const toInput = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');

    // Validate that all inputs exist and have values
    if (!fromInput || !toInput || !amountInput) {
        if (currencyOutput) currencyOutput.innerHTML = 'Currency converter inputs not found.';
        return;
    }

    const fromCurrency = fromInput.value.trim().toUpperCase();
    const toCurrency = toInput.value.trim().toUpperCase();
    const amount = parseFloat(amountInput.value);

    // Validate input values
    if (!fromCurrency || !toCurrency) {
        if (currencyOutput) currencyOutput.innerHTML = 'Please enter both currencies (e.g., USD, EUR, GBP).';
        return;
    }
    
    if (!amount || Number.isNaN(amount)) {
        if (currencyOutput) currencyOutput.innerHTML = 'Please enter a valid amount.';
        return;
    }

    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        showLoading(currencyOutput, 'Loading currency exchange rate...');
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

//function to fetch and display a random movie using tmdb API
async function fetchRandomMovie() {
    const apiKey = '35a4d64e9d1a9de5605be34e14009290';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    try {
        showLoading(movieOutput, 'Loading random movie...');
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();
        const movies = json.results;
        if (!movies || movies.length === 0) throw new Error('No movies found');

        const randomIndex = Math.floor(Math.random() * movies.length);
        const movie = movies[randomIndex];
        if (movieOutput) movieOutput.innerHTML = '';

        const h = document.createElement('h3');
        h.textContent = movie.title;
        const p = document.createElement('p');
        p.textContent = movie.overview;
        movieOutput.appendChild(h);
        movieOutput.appendChild(p);
    } catch (err) {
        console.error('Error fetching random movie', err);
        if (movieOutput) movieOutput.innerHTML = 'Unable to load random movie. See console for details.';
    }
}   
// Wire the movie button to the function
if (movieApi) movieApi.addEventListener('click', fetchRandomMovie);

// Inline wrapper used by index.html
function getMovies() { fetchRandomMovie(); }

// Fetch and display a GitHub user by username. If username is falsy, fall back to random.
async function fetchGitHubUser(username) {
    try {
        showLoading(gitHubOutput, username ? `Loading ${username}...` : 'Loading a random GitHub user...');

        let userData = null;
        if (username) {
            const resp = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
            if (!resp.ok) {
                if (resp.status === 404) throw new Error('User not found');
                throw new Error(`HTTP ${resp.status}`);
            }
            userData = await resp.json();
        } else {
            // fetch list and pick one at random
            const listResp = await fetch('https://api.github.com/users?since=0&per_page=100');
            if (!listResp.ok) throw new Error(`HTTP ${listResp.status}`);
            const list = await listResp.json();
            if (!list || list.length === 0) throw new Error('No users found');
            const randomIndex = Math.floor(Math.random() * list.length);
            const user = list[randomIndex];
            // fetch full user data
            const resp = await fetch(user.url);
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            userData = await resp.json();
        }

        if (!userData) throw new Error('No user data');

        if (gitHubOutput) gitHubOutput.innerHTML = '';
        const h = document.createElement('h3');
        h.textContent = userData.login;

        const avatar = document.createElement('img');
        avatar.src = userData.avatar_url;
        avatar.alt = `${userData.login} avatar`;
        avatar.style.width = '64px';
        avatar.style.height = '64px';
        avatar.style.borderRadius = '6px';
        avatar.style.display = 'block';

        const p = document.createElement('p');
        p.innerHTML = `Profile: <a href="${userData.html_url}" target="_blank" rel="noopener noreferrer">${userData.html_url}</a>`;

        const bio = document.createElement('p');
        bio.textContent = userData.bio || '';

        const stats = document.createElement('p');
        stats.textContent = `Repos: ${userData.public_repos} • Followers: ${userData.followers} • Following: ${userData.following}`;

        gitHubOutput.appendChild(avatar);
        gitHubOutput.appendChild(h);
        gitHubOutput.appendChild(p);
        gitHubOutput.appendChild(bio);
        gitHubOutput.appendChild(stats);
    } catch (err) {
        console.error('Error fetching GitHub user', err);
        if (gitHubOutput) gitHubOutput.innerHTML = `Unable to load GitHub user: ${err.message}`;
    }
}

// Wrapper that reads the input and calls fetchGitHubUser
function getGitHubUser() {
    const input = document.getElementById('github-username');
    const username = input && input.value.trim() ? input.value.trim() : '';
    fetchGitHubUser(username);
}

// Wire the GitHub section click to fetch a random user only if someone clicks the section itself (keeps parity with other items)
if (gitHubApi) gitHubApi.addEventListener('click', () => { const input = document.getElementById('github-username'); if (!input || !input.value.trim()) fetchGitHubUser(''); });

//function to fetch and display a random joke
async function fetchRandomJoke() {
    const url = 'https://official-joke-api.appspot.com/random_joke';
    try {
        showLoading(jokeOutput, 'Loading random joke...');
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();
        if (jokeOutput) jokeOutput.innerHTML = '';

        const h = document.createElement('h3');
        h.textContent = json.setup;
        const p = document.createElement('p');
        p.textContent = json.punchline;
        jokeOutput.appendChild(h);
        jokeOutput.appendChild(p);
    } catch (err) {
        console.error('Error fetching random joke', err);
        if (jokeOutput) jokeOutput.innerHTML = 'Unable to load random joke. See console for details.';
    }
}
// Wire the joke button to the function
if (jokeApi) jokeApi.addEventListener('click', fetchRandomJoke);    

// Fetch and display a Meowfact (integrates with Meowfacts API)
async function fetchMeowFact() {
    const apiUrl = 'https://meowfacts.herokuapp.com/';

    // local fallback facts if the network/API fails
    const localFacts = [
        'Cats sleep for 70% of their lives.',
        'A group of cats is called a clowder.',
        'Cats have five toes on their front paws, but only four on the back ones.'
    ];

    try {
        showLoading(meowOutput, 'Loading a meowfact...');
        const resp = await fetch(apiUrl);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();

        // meowfacts returns { data: ["fact..."] }
        const fact = json && json.data && json.data[0] ? json.data[0] : null;
        if (!fact) throw new Error('No fact found in response');

        if (meowOutput) meowOutput.innerHTML = '';

        const h = document.createElement('h3');
        h.textContent = 'Meowfact';

        const p = document.createElement('p');
        p.textContent = fact;

        const controls = document.createElement('div');
        controls.style.marginTop = '8px';

        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy fact';
        copyBtn.addEventListener('click', async () => {
            if (navigator.clipboard && fact) {
                try { await navigator.clipboard.writeText(fact); copyBtn.textContent = 'Copied!'; setTimeout(() => copyBtn.textContent = 'Copy fact', 1500); } catch (e) { console.warn('Clipboard write failed', e); }
            }
        });

        const src = document.createElement('a');
        src.href = 'https://github.com/wh-iterabb-it/meowfacts';
        src.target = '_blank';
        src.rel = 'noopener noreferrer';
        src.textContent = 'API source';
        src.style.marginLeft = '12px';

        controls.appendChild(copyBtn);
        controls.appendChild(src);

        meowOutput.appendChild(h);
        meowOutput.appendChild(p);
        meowOutput.appendChild(controls);
    } catch (err) {
        console.warn('Meowfacts fetch failed:', err);
        // Render a local fallback fact
        if (!meowOutput) return;
        meowOutput.innerHTML = '';
        const h = document.createElement('h3');
        h.textContent = 'Meowfact (offline)';
        const p = document.createElement('p');
        p.textContent = localFacts[Math.floor(Math.random() * localFacts.length)];
        const src = document.createElement('a');
        src.href = 'https://github.com/wh-iterabb-it/meowfacts';
        src.target = '_blank';
        src.rel = 'noopener noreferrer';
        src.textContent = 'API source';

        meowOutput.appendChild(h);
        meowOutput.appendChild(p);
        meowOutput.appendChild(src);
    }
}

// Wire the Meowfacts button to the Meowfact function
if (meowApi) meowApi.addEventListener('click', fetchMeowFact);
// Inline wrapper used by index.html
function getMeowFactsInfo() { fetchMeowFact(); }


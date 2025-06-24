

//✅ Task 1: Planning & Environment Setup
// This part is done before you create the pages:
// - Choose framework
// - Initialize project folder
// - Design wireframe
// - Select API
// - Plan data handling



//✅ Task 2: Country Search Feature
// Create search input on the main page
// Users type country name here

// Fetch country data from API when input is submitted
// Use fetch() inside a function like handleSearch()

// Display country information below the search input
// Show: country name, capital, population, languages, currency, flag

// Add a link or button labeled "View on Map"
// When clicked, open Google Maps with the country's location

const searchInput = document.getElementById("searchInput");
const countryInfoDiv = document.getElementById("country-info");

searchInput.addEventListener("keyup", (e) => {
  const query = e.target.value.trim();

  if (query.length === 0) {
    countryInfoDiv.innerHTML = "";
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${query}`)
    .then(res => {
      if (!res.ok) throw new Error("Country not found");
      return res.json();
    })
    .then(data => {
      const country = data[0];

      const flag = country.flags.svg || country.flags.png;
      const name = country.name.common;
      const capital = country.capital?.[0] || "N/A";
      const population = country.population.toLocaleString();
      const languages = Object.values(country.languages || {}).join(", ");
      const currency = Object.values(country.currencies || {})[0]?.name || "N/A";
      const lat = country.latlng?.[0] || 0;
      const lng = country.latlng?.[1] || 0;
      const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
      countryInfoDiv.innerHTML = `
        <div class="image">
          <img src="${flag}" alt="${name} flag">
          <div class="info">
            <h2>${name}</h2>
          </div>
          <div class="info">
            <i class="fa-solid fa-landmark"></i>
            <span>Capital:</span>
            <span>${capital}</span>
          </div>
          <div class="info">
            <i class="fa-solid fa-user-group"></i>
            <span>Population:</span>
            <span>${population}</span>
          </div>
          <div class="info">
            <i class="fa-solid fa-language"></i>
            <span>Languages:</span>
            <span>${languages}</span>
          </div>
          <div class="info">
            <i class="fa-solid fa-money-bill-wave"></i>
            <span>Currencies:</span>
            <span>${currency}</span>
          </div>
          <div class="info">
            <i class="fa-solid fa-earth-europe"></i>
            <a href="${mapLink}" target="_blank" style="color: #007bff; text-decoration: underline;">View on Maps</a>
          </div>
        </div>
      `;
    })
    .catch(() => {
      countryInfoDiv.innerHTML = `<p style="color:red;">Country not found. Try again.</p>`;
    });
});




//✅ Task 3: Flag Guessing Game
// Create a flag game section on its own page or a component
// Show a random flag to the user

// Add an input box where the user guesses the country name
// Use onChange to track user input

// Include "Submit Guess" and "Get Hint" buttons
// Submit checks correctness, hint gives a clue (like region or language)

// Show result message: "Correct!" or "Wrong! It was _____"
// Display it below the input field

// Add "Try Another" button to fetch a new random flag
// This resets the game and shows a different country

const flagImage = document.getElementById("flagImage");
// console.log(flagImage);
const inputGuess = document.getElementById("guessInput");
const submitButton = document.getElementById("submitGuess");
const hintButton = document.getElementById("hintBtn");
const tryAnotherButton = document.getElementById("anotherBtn");

let correctCountry = "";
let hintUsed = false;

const countryCodes = [
  "dz", "ao", "bj", "bw", "bf", "bi", "cv", "cm", "cf", "td", "km", "cd", "cg", "ci",
  "dj", "eg", "gq", "er", "et", "ga", "gm", "gh", "gn", "gw", "gy", "ht", "hn", "id",
  "iq", "ir", "jo", "ke", "kw", "lb", "lr", "ly", "mg", "mw", "ml", "mr", "mu", "yt",
  "ma", "mz", "na", "ne", "ng", "om", "ps", "qa", "rw", "sa", "sn", "sc", "sl", "so",
  "sd", "ss", "st", "sy", "td", "tg", "tn", "tz", "ug", "eh", "ye", "zm", "zw"
];

function getRandomCountry() {
  const randomIndex = Math.floor(Math.random() * countryCodes.length);
  const countryCode = countryCodes[randomIndex];

  fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
    .then(res => {
      if (!res.ok) throw new Error("Country fetch error");
      return res.json();
    })
    .then(data => {
      const country = data[0];
      correctCountry = country.name.common;
      const flag = country.flags?.svg || country.flags?.png || "";

      flagImage.src = flag;
      flagImage.alt = `${correctCountry} flag`;
      inputGuess.value = "";
      hintUsed = false;

      console.log("🗺️ Country:", correctCountry);
    })
    .catch(error => {
      console.error("Error loading country:", error);
      alert("Error loading country. Please try again.");
    });
}

submitButton.addEventListener("click", () => {
  const guess = inputGuess.value.trim().toLowerCase();
  if (!guess) return;

  if (guess === correctCountry.toLowerCase()) {
    alert("Correct!");
    getRandomCountry();
  } else {
    alert("Incorrect. Try again.");
  }
});

hintButton.addEventListener("click", () => {
  if (!correctCountry) return;
  const hint = correctCountry[0] + "*".repeat(correctCountry.length - 1);
  alert("Hint: " + hint);
  hintUsed = true;
});

tryAnotherButton.addEventListener("click", getRandomCountry);
getRandomCountry();



//✅ Task 4: UI/UX Styling
// Apply consistent colors, fonts, and spacing across the site
// Define styles in CSS or use Tailwind classes

// Make sure layout is responsive across mobile/tablet/desktop
// Use CSS grid/flexbox or responsive frameworks

// Show a loader/spinner when waiting for API response
// Example: show "Loading..." text while fetch is pending

// Add smooth transitions (fade in/out, hover effects)
// Use CSS transitions or animation libraries



//✅ Task 5: Testing & Deployment
// Check that search and game features work correctly
// Manually test by searching, guessing, and clicking links

// Ask a friend to try your site and watch how they use it
// Fix any confusing parts they run into

// Deploy the final version to a platform like Netlify, Vercel, or GitHub Pages
// Make sure your build works and the site is live online
// 🌍 Country Search Feature
const searchInput = document.getElementById("searchInput");
const countryInfoDiv = document.getElementById("country-info");

searchInput.addEventListener("keyup", (e) => {
  const query = e.target.value.trim();

  if (query.length === 0) {
    countryInfoDiv.innerHTML = "";
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${query}`)
    .then((res) => {
      if (!res.ok) throw new Error("Country not found");
      return res.json();
    })
    .then((data) => {
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
        </div>
        <div class="info"><h2>${name}</h2></div>
        <div class="info"><i class="fa-solid fa-landmark"></i><span>Capital:</span><span>${capital}</span></div>
        <div class="info"><i class="fa-solid fa-user-group"></i><span>Population:</span><span>${population}</span></div>
        <div class="info"><i class="fa-solid fa-language"></i><span>Languages:</span><span>${languages}</span></div>
        <div class="info"><i class="fa-solid fa-money-bill-wave"></i><span>Currencies:</span><span>${currency}</span></div>
        <div class="info"><i class="fa-solid fa-earth-europe"></i><a href="${mapLink}" target="_blank" style="color: #007bff;">View on Maps</a></div>
      `;
    })
    .catch(() => {
      countryInfoDiv.innerHTML = `<p style="color:red;">Country not found. Try again.</p>`;
    });
});


// 🎌 Flag Guessing Game Logic
const guessInput = document.querySelector(".flaginput input");
const submitBtn = document.querySelector(".btn button:first-child");
const hintBtn = document.querySelector(".btn button:last-child");
const tryAnotherBtn = document.querySelector(".othercountrybtn button");
const flagImage = document.querySelector(".Guess-country img");
const guessInfoDiv = document.querySelector("#Guess .info");
let currentCountry = null;

function fetchRandomCountry() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      const randomIndex = Math.floor(Math.random() * data.length);
      currentCountry = data[randomIndex];
      flagImage.src = currentCountry.flags.svg || currentCountry.flags.png;
      flagImage.alt = `Flag of ${currentCountry.name.common}`;
      guessInput.value = "";
      guessInfoDiv.innerHTML = `<h2>Guess the Country!</h2>`;
    });
}

// ✅ Check user guess
submitBtn.addEventListener("click", () => {
  const userGuess = guessInput.value.trim().toLowerCase();
  if (!currentCountry) return;

  const correctAnswer = currentCountry.name.common.toLowerCase();
  if (userGuess === correctAnswer) {
    guessInfoDiv.innerHTML = `<h2 style="color:green;">✅ Correct! It was ${currentCountry.name.common}</h2>`;
  } else {
    guessInfoDiv.innerHTML = `<h2 style="color:red;">❌ Wrong! It was ${currentCountry.name.common}</h2>`;
  }
});

// 💡 Hint button
hintBtn.addEventListener("click", () => {
  if (!currentCountry) return;
  const region = currentCountry.region || "Unknown region";
  const languages = currentCountry.languages
    ? Object.values(currentCountry.languages).join(", ")
    : "Unknown language";

  alert(`Hint:\nRegion: ${region}\nLanguages: ${languages}`);
});

// 🔄 Try another country
tryAnotherBtn.addEventListener("click", fetchRandomCountry);

// Load first flag on page load
window.addEventListener("DOMContentLoaded", fetchRandomCountry);

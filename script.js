const apiKey = "aab4fc996c02eda24b83041fd8a2c4ce8";

const iconMap = {
  "01d": "https://cdn-icons-png.flaticon.com/512/869/869869.png", // clear day
  "01n": "https://cdn-icons-png.flaticon.com/512/869/869869.png", // clear night
  "02d": "https://cdn-icons-png.flaticon.com/512/1163/1163661.png", // few clouds
  "02n": "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
  "03d": "https://cdn-icons-png.flaticon.com/512/414/414825.png", // scattered clouds
  "04d": "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  "09d": "https://cdn-icons-png.flaticon.com/512/1163/1163620.png", // shower rain
  "10d": "https://cdn-icons-png.flaticon.com/512/1163/1163657.png", // rain
  "11d": "https://cdn-icons-png.flaticon.com/512/1146/1146860.png", // thunderstorm
  "13d": "https://cdn-icons-png.flaticon.com/512/642/642102.png", // snow
  "50d": "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"  // mist
};

document.getElementById("searchBtn").addEventListener("click", getWeather);

//  Allow pressing Enter key to trigger search
document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");
  const loadingSpinner = document.getElementById("loadingSpinner");

  if (city === "") {
    weatherResult.innerHTML = `<p class="error">Please enter a city name.</p>`;
    return;
  }

  // Show loading spinner
  loadingSpinner.classList.remove("hidden");
  weatherResult.innerHTML = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      //  Hide spinner
      loadingSpinner.classList.add("hidden");

      const tempC = data.main.temp;
      const tempF = (tempC * 9) / 5 + 32;
      const desc = data.weather[0].description;
      const humidity = data.main.humidity;
      const icon = data.weather[0].icon;
      const iconUrl = iconMap[icon] || `https://openweathermap.org/img/wn/${icon}@2x.png`;


      weatherResult.innerHTML = `
        <h3>${data.name}</h3>
        <img src="${iconUrl}" alt="${desc}">
        <p><strong>Temperature:</strong> ${tempC.toFixed(
          1
        )} °C | ${tempF.toFixed(1)} °F</p>
        <p><strong>Condition:</strong> ${desc}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
      `;
    })
    .catch((error) => {
      //  Hide spinner and show red error message
      loadingSpinner.classList.add("hidden");
      weatherResult.innerHTML = `<p class="error">${error.message}</p>`;
    });
}

const toggleButton = document.getElementById("modeToggle");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    toggleButton.textContent = "☀️ Light Mode";
  } else {
    toggleButton.textContent = "🌙 Dark Mode";
  }
});

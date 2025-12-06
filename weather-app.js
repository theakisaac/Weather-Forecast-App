const apiKey = "51b9771f102b0c13e77ed72bda8fa638";

const weatherDataElement = document.getElementById("weather-data");
const cityInputElement = document.getElementById("city-input");
const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputElement.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Sorry, Network response is unfavourable");
    }
    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed} m/s`,
    ];
    weatherDataElement.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

    weatherDataElement.querySelector(
      ".temperature"
    ).textContent = `${temperature}°C`;

    weatherDataElement.querySelector(".description").textContent = description;

    weatherDataElement.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherDataElement.querySelector(".icon").innerHTML = "";

    weatherDataElement.querySelector(".temperature").textContent = "";

    weatherDataElement.querySelector(".description").textContent =
      "An error occured, please try again later!";

    weatherDataElement.querySelector(".details").innerHTML = "";
  }
}

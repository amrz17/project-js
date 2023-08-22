const apiKey = "9fabe88f4c0dc7e1d173dffcbd1f3888";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWheater(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else{

        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&#176;c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "&percnt;";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km&#47;h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";   
        } 
        else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";   
        }
        else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";   
        } 
        else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } 
        else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// CONTOH MENGGUNAKAN GLOBAL EVENT HANDLER
// searchBtn.onclick = function() {
//     checkWheater(searchBox.value);
// }

searchBtn.addEventListener("click", ()=>{
    checkWheater(searchBox.value);
})

// Execute a function when the user presses a key on the keyboard
searchBox.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Running this code
    checkWheater(searchBox.value);
    // Cancel the default action, if needed
    event.preventDefault();
  }
});

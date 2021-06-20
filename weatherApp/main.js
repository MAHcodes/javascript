const api_key = "24c317f671b0e2b463eb8400f053aabc";
let city = "Lebanon";
const date = document.getElementById("date");
const time = document.getElementById("time");
const ico = document.getElementById("icon");
const temp = document.getElementById("temp");
const locations = document.getElementById("location");
const min = document.getElementById("min");
const max = document.getElementById("max");
const avg = document.getElementById("avg");
const search = document.getElementById("search");
const status = document.getElementById("status");

search.value = "";

search.addEventListener("focusout", getWeather);
search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        getWeather();
    }
});
window.addEventListener("load", getWeather);

function getWeather() {
    if (search.value !== "") {
        city = search.value;
    } else {
        city = "Lebanon";
    };
    const url = `http://api.weatherstack.com/forecast?access_key=${api_key}&query=${city}`;
    fetch(url).then(respone => {return respone.json()})
    .then(data => {
        const fullDate = data.location.localtime;
        const splitDate = fullDate.split(" ");
        date.innerText = splitDate[0];
        time.innerText = splitDate[1];
        ico.src = data.current.weather_icons;
        temp.innerText = data.current.temperature;
        locations.innerText = data.request.query;
        let forecastDate = splitDate[0].split("-");
        let resultDate = forecastDate[forecastDate.length -1 ] -1;
        let last = (forecastDate[0] + "-" + forecastDate[1] + "-" + resultDate);
        min.innerText = data.forecast[last].mintemp;
        max.innerText = data.forecast[last].maxtemp;
        avg.innerText = data.forecast[last].avgtemp;
        status.innerText = data.current.weather_descriptions;
    })
    .catch(err => console.error("error"));
}
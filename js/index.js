const emptyInput = document.getElementById('empty-input');
const searchBtn = document.getElementById('search-button');
document.getElementById("search-city").addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
})

// load search button
const searchButton = () => {
    const searchInput = document.getElementById('search-city');
    const cityName = searchInput.value;
    emptyInput.textContent = "";
    if (cityName === "") {
        emptyInput.innerHTML = `
            <h4 class="text-start text-danger mt-2">Please enter a city name to search...</h4>
        `;
    }
    // clear search
    searchInput.value = "";
    loadsearch(cityName);
}


//load weather url
const loadsearch = async (city) => {
    const api = "f4a4bef64fe882562aa59498af0f4ee0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    displayWeather(data);
}

// display weather
const displayWeather = (temparature) => {
    console.log(temparature);
    if (temparature.message === "city not found") {
        emptyInput.innerHTML = `
        <h4 class="text-start text-danger mt-2">No results found</h4>`
    }
    const container = document.getElementById('container');
    container.textContent = "";
    const localDate = convertUnixTimeToLocal(temparature.dt);
    const sunriseTime = convertUnixTimeToLocal(temparature.sys.sunrise)
    const sunsetTime = convertUnixTimeToLocal(temparature.sys.sunset)
    const div = document.createElement('div');
    div.innerHTML = `
        <h4 class="fs-1 fw-bold">${temparature.name}, ${temparature.sys.country}</h4>
        <h6 class="fs-5 py-3">${localDate.fullDate}</h6>
        <img src="https://openweathermap.org/img/wn/${temparature.weather[0].icon}@2x.png" alt="">
        <h5 class="fs-2 fw-bolder">${temparature.main.temp} &deg;C</h5>
        <h5 class="fs-4 py-3">${temparature.weather[0].main}</h5>
        <h5 class="fs-3 sun_sun"><span class="me-3">Sunrise: ${sunriseTime.time12h}</span> & <span class="ms-3">Sunset: ${sunsetTime.time12h}</span></h5>
    `;
    container.appendChild(div);
}

loadsearch("Faridpur")

// convert unix time to local format
const convertUnixTimeToLocal = (unixTime) => {
    const milliSeconds = unixTime * 1000;
    const humanDateFormat = new Date(milliSeconds);
    const convertedTimeObject = {
        fullDate: humanDateFormat.toLocaleString("en-US", {
            day:"numeric",
            month: "short",
            year: "numeric",
        }),
        time12h: humanDateFormat.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        })
    }
    return convertedTimeObject;
}
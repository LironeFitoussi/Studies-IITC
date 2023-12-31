console.log("test");
document.getElementById("cityValid").addEventListener("submit", (e) => {
    e.preventDefault()
    const cityInputValue = document.getElementById("cityInput").value
    console.log(cityInputValue);
    document.getElementById("cityInput").value = ""
    fetchWeather(`q=${cityInputValue}`)
})

const searchByLocation = () => {
    navigator.geolocation.getCurrentPosition((successCallBack, errorCallBack) => {
        console.log(successCallBack.coords);
        const userLat = successCallBack.coords.latitude;
        const userLon = successCallBack.coords.longitude;
        fetchWeather(`lat=${userLat}&lon=${userLon}`)
    });
}

setTimeout(() => {
    document.getElementById("loadImage").style.display = "none";
}, 3000);

const fetchWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?${city}&cnt=7&appid=38457dab3383d5ed2ed06f87db57c7b3&units=metric`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            document.getElementsByTagName("header")[0].style.position = "sticky"
            document.getElementById("mainContainer").classList.add("mainContainer");

            if (data.cod == 404) {
                document.getElementById("mainContainer").innerHTML = `
                <h1>We haven't found ${city} in the database. Please try again.</h1>
                <img src="https://media0.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif?cid=6c09b952s7vam390djhdmac6cbqhmpzqppsk3rh3sa5y4kql&ep=v1_gifs_search&rid=giphy.gif&ct=g">
            `
            }
            document.getElementById("mainContainer").innerHTML = `
                <h1>Weather Forecast <br> ${data.city.name}, ${data.city.country} <br> for the next Week</h1>
                <span>Fun Fact: ${data.city.name} has ${data.city.population} citizens</span>
            `
            

            data.list.forEach((element, index) => {
                console.log(element);
                const today = new Date()
                const nextDay = new Date(today.getTime() + ((index+1)*(60 * 60 * 24 * 1000)))
                function getDayAbbreviation(nextDay) {
                    switch (nextDay.getDay()) {
                        case 0:
                            return 'SUN';
                        case 1:
                            return 'MON';
                        case 2:
                            return 'TUE';
                        case 3:
                            return 'WED';
                        case 4:
                            return 'THU';
                        case 5:
                            return 'FRI';
                        case 6:
                            return 'SAT';
                        default:
                            return 'Invalid day';
                    }
                }
                const dateDay = nextDay.getDate()
                const dateMonth = nextDay.getMonth()
                const weatherElem = document.createElement("div")
                const milesToKm = miles => miles * 1.609344
                weatherElem.className = "dayDiv"
                const weatherContent = `
                <div class="headWeather">
                    <div class="dayWeather">
                        <p class="weekDay">${getDayAbbreviation(nextDay)}</p>
                        <p class="dateFormat">${dateMonth}/${dateDay < 10? "0" + dateDay: dateDay}</p>
                    </div>
                    <img src=" https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" alt="weather-logo" class="weather-icon">
                    <div class="highLowTemp">
                        <span class="high-temp">${parseInt(element.main.temp_max)}°</span>
                        <span class="low-temp">/${parseInt(element.main.temp_min)}°</span>
                    </div>
                </div>
                <div class="maintemps">
                    <p class="weather-decriptions">${element.weather[0].main}, ${element.weather[0].description}</p>
                    <div class="tempKind">
                        <p>Average Temperature</p>
                        <span>${element.main.temp}°</span> 
                    </div>
                    <div class="tempKind">
                        <p>Wind</p>
                        <span>${milesToKm(element.wind.speed).toFixed(2)} km/h</span>
                    </div>
                    <div class="tempKind">
                        <p>Feels Like:</p>
                        <span>${element.main.feels_like}°</span>
                    </div>
                    <div class="tempKind">
                        <p>Humidity</p>
                        <span>${element.main.humidity}%</span>
                    </div>
                </div>
                `
                weatherElem.id = `day_${index + 1}`
                weatherElem.innerHTML = weatherContent
                document.getElementById("mainContainer").innerHTML += weatherElem.outerHTML          
            });
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


const cityname = document.getElementById("cityName");
const citybtn = document.getElementById("searchBtn");
const searchByLocation = document.getElementById("search-by-Location");
const d = new Date();

const cntryInfo = document.getElementById("cntryInfo");
const loading = document.querySelector(".loading");


const cityName = document.getElementById("cityinfo");
const currentDate = document.getElementById("currentdate");
const regionname = document.getElementById("regionname");
const countryname = document.getElementById("countryname");

const first = document.querySelector('.first');
const second = document.querySelector('.second');
const third = document.querySelector('.third');

const imgIcon = document.querySelector(".img");

const forecastInfo1 = document.getElementById("forecast-info1");
const forecastInfo2 = document.getElementById("forecast-info2");
const forecastInfo3 = document.getElementById("forecast-info3");

const forecastImg1 = document.getElementById("forecast-img1");
const fdate1 = document.getElementById("date1");
const forecastImg2 = document.getElementById("forecast-img2");
const fdate2 = document.getElementById("date2");
const forecastImg3 = document.getElementById("forecast-img3");
const fdate3 = document.getElementById("date3");




citybtn.addEventListener("click", () => {    
    showCityLocation(cityname.value)
})

async function showCityLocation(cityname){
    const cityLocation =await getcityData(cityname);

    console.log(cityLocation);

    cntryInfo.innerHTML = `<span id="regionname"><b> Region : </b>${cityLocation.location.region} </span> <span id="countryname"> <b> Country : </b> ${cityLocation.location.country } </span>`

    cityName.innerHTML = cityLocation.location.name;
    currentDate.innerHTML=` ( ${cityLocation.forecast.forecastday[0].date} )`;

    var daynight = cityLocation.current.condition.is_day;
    var day;
    if(daynight == 1){
        day = "Day"
    }else{
        day="Night"
    }

   first.innerHTML=` <p class="condition">☁️ Condition: ${cityLocation.current.condition.text}</i></p>
                    <p id="daynight">⛺ Day/Night: ${day}</p>
                    <p id="TimeZone">🕑 TimeZone:  - ${cityLocation.location.tz_id}</p>`

   second.innerHTML = `<p id="temp">🔥 Temp :  ${cityLocation.current.temp_c} ℃</p>
                        <p id="wind">🫧 wind: ${cityLocation.current.wind_mph} M/s</p>
                        <p id="humidity">💧 Humidity: ${cityLocation.current.humidity} % </p>`

    third.innerHTML = `<p id="sunrise">🌥️ SunRise : ${cityLocation.forecast.forecastday[0].astro.sunrise} </p>
                        <p id="sunset">🌇SunSet : ${cityLocation.forecast.forecastday[0].astro.sunset} </p>
                        <p id="moonrise">🌙 MoonRise: ${cityLocation.forecast.forecastday[0].astro.moonrise }</p> ` 

    imgIcon.innerHTML = `<img src="${cityLocation.current.condition.icon}" width="100px" > `

    fdate1.innerHTML = cityLocation.forecast.forecastday[1].date;
    forecastImg1.innerHTML = `<img src="${cityLocation.forecast.forecastday[1].hour[d.getHours()].condition.icon} " >`

    forecastInfo1.innerHTML=  ` 
                <p>☁️ Condition: ${cityLocation.forecast.forecastday[1].hour[d.getHours()].condition.text} </p>
                <p>🔥 Temp : ${cityLocation.forecast.forecastday[1].hour[d.getHours()].temp_c} ℃ </p>
                <p>🌥️ SunRise : ${cityLocation.forecast.forecastday[1].astro.sunrise} </p>`
    
    fdate2.innerHTML = cityLocation.forecast.forecastday[2].date;
    forecastImg2.innerHTML = `<img src="${cityLocation.forecast.forecastday[2].hour[d.getHours()].condition.icon} " >`

    forecastInfo2.innerHTML=  ` 
                <p>☁️ Condition: ${cityLocation.forecast.forecastday[2].hour[d.getHours()].condition.text} </p>
                <p>🔥 Temp : ${cityLocation.forecast.forecastday[2].hour[d.getHours()].temp_c}  ℃</p>
                <p>🌥️ SunRise : ${cityLocation.forecast.forecastday[2].astro.sunrise} </p>`
    
    fdate3.innerHTML = cityLocation.forecast.forecastday[3].date;
    forecastImg3.innerHTML = `<img src="${cityLocation.forecast.forecastday[3].hour[d.getHours()].condition.icon} " >`

    forecastInfo3.innerHTML=  ` 
                <p>☁️ Condition: ${cityLocation.forecast.forecastday[3].hour[d.getHours()].condition.text} </p>
                <p>🔥 Temp : ${cityLocation.forecast.forecastday[3].hour[d.getHours()].temp_c} ℃</p>
                <p>🌥️ SunRise : ${cityLocation.forecast.forecastday[3].astro.sunrise} </p>`

    loading.innerHTML = ``

    } 
    
async function getcityData(cityname){
    loading.innerHTML = `<h2>Loading..</h2>`
    const result = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a1cc789886654f54a43102044231912&q=${cityname}&days=4&aqi=yes&alerts=no`);
    const js_result = await result.json();
    return await js_result;
}


// Search By Coordinate:

searchByLocation.addEventListener("click" , ()=>{
    navigator.geolocation.getCurrentPosition(getPosition,getError);
})

async function getPosition(position){
    loading.innerHTML = `<h2>Loading..</h2>`
    const loc = await getData(position.coords.latitude,position.coords.longitude);
    showCityLocation(loc.location.name);
}

function getError(Error){
    console.log(Error);
}

async function getData(lat,lon){
    const data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a1cc789886654f54a43102044231912&q=${lat},${lon}&days=4&aqi=yes&alerts=no`);
    const data_js = await data.json();
    return data_js;
}
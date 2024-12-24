
const getDataBtn = document.getElementById("btn");
const searchInput = document.querySelector(".inputLocation");
const locationDetails = document.querySelector(".content");
const locationLabel = document.querySelector(".location");
let locationName;
const Information = document.querySelector(".Information");
const ConditionsInfo = document.querySelector(".conditions");
const maxTempInfo = document.querySelector(".maxTempInfo");
const minTempInfo = document.querySelector(".minTempInfo");
const dateInfo = document.querySelector(".day");
const imgBackground = document.querySelector(".imgDisplayingWeatherDetails");
let today;
let tomorrow;
let Overmorrow;
let Wednesday;
const DateofToday = new Date();
let aDayIntheWeek;
let inpDate; 
// const api = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Helsingborg?unitGroup=metric&key=BQCKAUVPQLEJMCVWXVDCAJDVU&contentType=json"; 



function getData() {
locationName = searchInput.value;

fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=metric&key=BQCKAUVPQLEJMCVWXVDCAJDVU&contentType=json`).then((res) => res.json()).then((data) => displayWeather(data.days[0].temp, data.days[0].datetime, data.days[0].conditions, data.days[0].tempmax, data.days[0].tempmin));

fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=metric&include=days&key=BQCKAUVPQLEJMCVWXVDCAJDVU&contentType=json`).then((res) => res.json()).then((weekData) => WeeklyInfo(weekData));

fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=metric&include=days&key=BQCKAUVPQLEJMCVWXVDCAJDVU&contentType=json`).then((res) => res.json()).then((dataVisualization) => addIcon(dataVisualization.days));
}


getData();


function displayWeather(weather, day, localWeather, maxTemp, minTemp) {

let todaysDate;

locationLabel.innerHTML =  " " + locationName[0].toUpperCase() + locationName.substring(1);

locationDetails.innerHTML = " " + weather + "°C";

maxTempInfo.innerHTML = " " + maxTemp + "°C";

minTempInfo.innerHTML = " " + minTemp + "°C";

let currDate = new Date();
let inpDate = new Date(day)

if (currDate.toDateString() == inpDate.toDateString()) {
    todaysDate = "Today";
} else 
{
    switch (inpDate.getDay()) {

        case 0: 
        todaysDate = "Sunday";
        break;
        case 1: 
        todaysDate = "Monday";
        break;
        case 2: 
        todaysDate = "Tuesday";
        case 3: 
        todaysDate = "Wedneseday";
        case 4: 
        todaysDate = "Thursday";
        case 5: 
        todaysDate = "Friday";
        case 6: 
        todaysDate = "Saturday";
    }    
}

dateInfo.innerHTML = " " + todaysDate;

ConditionsInfo.innerHTML = " " + localWeather;

if (localWeather == "Clear") {
    
    imgBackground.style.backgroundImage = "url('https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-22.png')";
    document.getElementById("initialImg").style.opacity = "0";
}

if (localWeather == "Rain, Partially cloudy") {
    
    imgBackground.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/256/4724/4724092.png')";
    document.getElementById("initialImg").style.opacity = "0";
}

if (localWeather == "Partially cloudy")
    {
        imgBackground.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/256/7084/7084505.png')"
        document.getElementById("initialImg").style.opacity = "0";
    }


if (localWeather == "Rain, Overcast") 
    {
        imgBackground.style.backgroundImage = "url('https://cdn2.iconfinder.com/data/icons/weather-icon-set/256/rain.png')"
        document.getElementById("initialImg").style.opacity = "0";

    }

if (localWeather == "Overcast") {

    imgBackground.style.backgroundImage = "url('https://www.iconarchive.com/download/i18091/icons-land/weather/Overcast.ico')"
    document.getElementById("initialImg").style.opacity = "0";

}

}

function WeeklyInfo(weekDay) {    


for (let i = 0; i < 7; i++) {   
    
    let currDay = new Date();
    inpDate = new Date(weekDay.days[i].datetime);
    aDayIntheWeek = inpDate.toDateString();
    const strArray = aDayIntheWeek.split(" ");

    var diffDays = currDay.getDate() - inpDate.getDate(); 

    if (diffDays >= 3) {
    document.querySelectorAll(".weekDays")[i].innerHTML = strArray.slice(0, 3).join(" ");   
    }

    else {

    document.querySelectorAll(".weekDays")[i].innerHTML = strArray[0]; }
    
}

    const day7 = new Date(weekDay.days[7].datetime);
    const todayDate = new Date();
    let formatedDay7 = day7.toDateString();
    const day7strArray = formatedDay7.split(" ");  

    if (todayDate.getDate() == day7.getDate()) {
    document.querySelector(".day7").innerHTML = day7strArray[0];
    }

    else {
    document.querySelector(".day7").innerHTML = day7strArray.slice(0, 3).join(" ");}
    //firstDay.getDay() < firstDay.setDate(firstDay.getDate() + 3)) 

    for (let i = 0; i < 8; i++) {
    document.querySelectorAll(".temp")[i].innerHTML = weekDay.days[i].temp + "°C";
    }

}

function addIcon(dayOfWeek) {

let weatherIcon;
let i;

for (i = 0; i < 8; i++) {

 switch (dayOfWeek[i].conditions) {

    case "Clear": 
    weatherIcon = '<ion-icon name="sunny-outline" size="large"></ion-icon>';   
    break;

    case "Rain, Partially cloudy":
    weatherIcon = '<ion-icon name="rainy-outline" size="large"></ion-icon>';  
    break;

    case "Partially cloudy":
    weatherIcon = '<ion-icon name="cloudy-night-outline" size="large"></ion-icon>';
    break;

    case "Rain, Overcast":
    weatherIcon = '<ion-icon name="rainy-outline" size="large"></ion-icon>';    
    break;

    case "Overcast":
    weatherIcon = '<ion-icon name="cloud-outline" size="large"></ion-icon>';
    break;

    default: 
    weatherIcon = "";
    break;}   

    document.querySelectorAll(".icon")[i].innerHTML = weatherIcon;   

 }
   
}


searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        getDataBtn.click();
    }
})
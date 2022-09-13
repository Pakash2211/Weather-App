var datashow = document.querySelector("#data_show");
let API_key = "cf3e4168f67b969c4edd7a4a6963e84f";



function buttonclick() {
    let city = document.getElementById("cityname").value;
    dataFind(city);
    last7dayData(city);
}



async function last7dayData(city) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${API_key}`
        let res = await fetch(url);
        let data = await res.json();
        display7_dayData(data);
    } catch (err) {
        console.log(err);
    }

}



async function dataFind(city) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`
        let res = await fetch(url);
        let data = await res.json();
        displayData(data);
    } catch (err) {
        console.log(err);
    }

}



function displayData(fdata) {

    datashow.innerText = "";

    let mdiv = document.createElement("div");
    // Symbol

    let div1 = document.createElement("div");

    let cname = document.createElement("p");
    cname.innerHTML = fdata.name + "   " + "&#x2601;";

    let temp = document.createElement("p");
    temp.innerHTML = "Temp: " + "&#127777;" + " " + fdata.main.temp + "&#8451;";


    let wind = document.createElement("p");
    wind.innerHTML = "Wind: " + "&#127744;" + fdata.wind.speed;


    let sunrise = document.createElement("p");
    sunrise.innerHTML = "Sunrise: " + "&#128262;" + " " + fdata.sys.sunrise + "&#176;";

    let sunset = document.createElement("p");
    sunset.innerHTML = "Sunset: " + "&#128261;" + " " + fdata.sys.sunset + "&#176;";

    div1.append(cname, temp, wind, sunrise, sunset)


    // non-Symbol part

    let div2 = document.createElement("div");

    let mintemp = document.createElement("p");
    mintemp.innerHTML = "Min-temp: " + fdata.main.temp_min + "&#8451;";


    let maxtemp = document.createElement("p");
    maxtemp.innerHTML = "Max-temp: " + fdata.main.temp_max + "&#8451;";



    let pressure = document.createElement("p");
    pressure.innerText = "Pressure: " + fdata.main.pressure;

    let humidity = document.createElement("p");
    humidity.innerText = "Humidity: " + fdata.main.humidity;

    div2.append(mintemp, maxtemp, pressure, humidity)


    mdiv.append(div1, div2);
    var citymap = document.createElement("iframe");
    citymap.src = `https://maps.google.com/maps?q=${fdata.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    citymap.width = "650px";
    citymap.height = "400px";
    citymap.border = "2px solid white"


    datashow.append(mdiv, citymap);

}

let temp = [];

function display7_dayData(data) {
    temp = [];
    let dis = document.getElementById("data7_days");
    dis.innerText = "";
    data.list.map(function(ele) {
        let obj = {
            mintemp: ele.main.temp_max,
            maxtemp: ele.main.temp_min
        }
        temp.push(obj)
    })
    let i = 1;
    temp.map(function(ele) {
        let box = document.createElement("div");

        let day = document.createElement("p");
        day.innerText = "Day-" + i;
        let sym = document.createElement("p");
        sym.style.fontSize = "50px"
        if (i == 1 || i == 6) {

            sym.innerHTML = "&#128262;"
        }

        if (i == 3) {
            sym.innerHTML = "&#x26C5;"
        }
        if (i == 5) {
            sym.innerHTML = "&#9729;"
        }
        if (i == 4 || i == 2) {
            sym.innerHTML = "&#x1F326;"
            sym.style.color = "yellow"
        }
        if (i == 7) {
            sym.innerHTML = "&#x1F327;"
                // sym.color = "blue";
        }
        i++;

        let max_temp = document.createElement("p");
        max_temp.innerHTML = ele.maxtemp + "&#8451;"

        let min_temp = document.createElement("p");
        min_temp.innerHTML = ele.mintemp + "&#8451;"

        box.append(day, sym, max_temp, min_temp);



        dis.append(box);
    })
}
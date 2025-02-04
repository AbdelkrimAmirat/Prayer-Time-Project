

    let cities =["Annaba", "Guelma", "Constantine", "Alger", "Souk Ahras"];
    document.getElementById('city-name').innerHTML = cities[0];
    getPrayerTime(cities[0]);

    for (let city of cities) {
    const content =`
        <option>${city}</option>
    `
    document.getElementById('cities-select').innerHTML += content;  
    }

    document.getElementById('cities-select').addEventListener('change', function(){
    getPrayerTime(this.value);
    document.getElementById('city-name').innerHTML = this.value;
    })

    function getPrayerTime(cityName){

    let params = {
        d: Date.now(),
        county: "DZ",
        city: cityName,
        method: 19,
        shafaq: "general",
        tune: "5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6",
        timezonestring: "UTC",
        calendarMethod: "UAQ"
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity/d?city=Annaba&country=DZ&method=19&shafaq=general&tune=5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6&timezonestring=UTC&calendarMethod=UAQ',{
        params: params
    })
    .then(function (response) {
        
        document.getElementById('fajr-time').innerText = response.data.data.timings.Fajr;   
        document.getElementById('sunrise-time').innerText = response.data.data.timings.Sunrise;
        document.getElementById('dhuhr-time').innerText = response.data.data.timings.Dhuhr;
        document.getElementById('asr-time').innerText = response.data.data.timings.Asr;
        document.getElementById('maghrib-time').innerText = response.data.data.timings.Maghrib;
        document.getElementById('isha-time').innerText = response.data.data.timings.Isha;

        const redeableDate = response.data.data.date.readable;
        const weekday = response.data.data.date.gregorian.weekday.en;
        document.getElementById('date').innerText = `${weekday} ${redeableDate}`
    })

    .catch(function (error) {
        console.log(error);
    })

    }


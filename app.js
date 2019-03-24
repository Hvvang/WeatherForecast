window.addEventListener('load', () => {

    let toggle = false;
    let locationIcon = document.querySelector(".location-icon");
    let input = document.querySelector("input");
    let temperatureDesctiption = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureLureSpan = document.querySelector(".temperature span");
    let long,
        lat;
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    var log;

    let listLocation = [{
            name: "Kiev",
            lat: 50.45466,
            long: 30.5238,
            timeZone: +2.00
        },
        {
            name: "New York",
            lat: 40.730610,
            long: -73.935242,
            timeZone: -5.00
        },
        {
            name: "Marrero",
            lat: 29.89937,
            long: -90.10035,
            timeZone: -6.00
        }
    ];

    input.addEventListener('keypress', function location(e) {

        if (e.keyCode === 13) {
            log = this.value;
            input.value = "";

            for (let i = 0; i < listLocation.length; i++) {

                if (listLocation[i].name == log) {
                    lat = listLocation[i].lat;
                    long = listLocation[i].long;
                    const API = `${proxy}https://api.darksky.net/forecast/74d75245c374a4511710aba98b2c88e8/${lat},${long}`;

                    fetch(API)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            console.log(data);
                            const {
                                temperature,
                                summary,
                                icon,
                            } = data.currently;

                            temperatureDegree.textContent = Math.floor((temperature - 32) * 5 / 9);
                            temperatureLureSpan.textContent = '°C';
                            temperatureDesctiption.textContent = summary;
                            locationTimezone.textContent = data.timezone;

                            setIcons(icon, document.querySelector('.icon'));
                        });
                }
            }
        }
    });

    locationIcon.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;


                const API = `${proxy}https://api.darksky.net/forecast/74d75245c374a4511710aba98b2c88e8/${lat},${long}`;

                fetch(API)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {

                        const {
                            temperature,
                            summary,
                            icon
                        } = data.currently;

                        temperatureDegree.textContent = ((temperature - 32) * 5 / 9).toFixed(0);
                        temperatureLureSpan.textContent = '°C';
                        temperatureDesctiption.textContent = summary;
                        locationTimezone.textContent = data.timezone;

                        setIcons(icon, document.querySelector('.icon'));
                    });

            });
        }
    })


    function setIcons(icon, iconID) {
        const skycons = new Skycons({
            color: "white"
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


});
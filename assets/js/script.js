var APIKey = "2d21806c273ae4d5ad203a6f6347f868";
let locations = [];


$(document).ready(function () {


    $("#searchBtn").click(function () {  //event handler for the city search input
        // var element = event.target; //set element to the div that was clicked
        var searchCriteria = $("#zipCode").val();  //get the user input
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchCriteria + ",us&appid=" + APIKey;
        // var weatherContainer = $("#weatherContainer");
        // var data = response.json()
        // var lat = response.city.coord.lat;


        $.ajax({
            url: queryURL,
            method: "GET",

            // We store all of the retrieved data inside of an object called "response"
            success: function (response) {
                // console.log(response);
                // var res = response;
                var lat = (response.city.coord.lat);
                var lon = (response.city.coord.lon);
                var city = (response.city.name);

                console.log(lat);
                console.log(lon);
                localStorage.setItem("lati", lat);
                localStorage.setItem("long", lon);
                localStorage.setItem("city", city)
            },


        });
        console.log(queryURL);
        console.log(searchCriteria);
        function getWeatherData() {

            var lat = localStorage.lati;
            var lon = localStorage.long;

            console.log(lat, lon);

            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=,minutely,hourly,alerts&units=imperial&appid=" + APIKey;
            console.log(queryURL);
            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET",

                // We store all of the retrieved data inside of an object called "response"
                success: function (response) {
                    console.log(response);

                    showWeather(response);
                },


            });

        };
        getWeatherData();


        function showWeather(response) {
            var city = localStorage.city;
            var temp = (response.current.temp);
            var uvIndex = (response.current.uvi);
            var bgColor = "";  //holds the background color for UV Index
            var textColor = "";  //holds the text color for UV Index
            var iconURL = "http://openweathermap.org/img/w/" + response.current.weather[0].icon + ".png";  //get weather icon

            if (uvIndex < 3) //if uv index is low (1-2)
            {
                bgColor = "bg-success";
                textColor = "text-light";
            }
            else if (uvIndex > 2 && uvIndex < 6)  //if uv index is mocerate (3-5)
            {
                bgColor = "bg-warning";
                textColor = "text-dark";
            }
            else  //if uv index is high (6+)
            {
                bgColor = "bg-danger";
                textColor = "text-light";
            }

            $("#cityDate").html(city + " (" + new Date().toLocaleDateString() + ") <img id=\"icon\" src=\"" + iconURL + "\" alt=\"Weather icon\"/>");
            console.log(temp);
            $("#currentTemp").html(" " + temp + "  &degF");
            $("#currentHumidity").html(response.current.humidity + "%");
            $("#currentWindSpeed").html(response.current.wind_speed + " MPH");
            $("#currentUVIndex").html(uvIndex).addClass(bgColor + " p-1 " + textColor); //set the UVIndex and color to the html

            var ul5 = $("#fiveDay");
            ul5.empty();

            for (i = 1; i < 6; i++)  //we want the days 1-5
            {
                //make the elements to display the 5 day forecast and append to the parent div
                var div = $("<div>").addClass("bg-primary");

                var dateTime = (response.daily[i].dt);
                var dateHeading = $("<h6>").text(new Date(dateTime * 1000).toLocaleDateString());  //convert unix time to javascript date
                var iconDayURL = "http://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png";  //get weather icon
                var icon = $("<img>").attr("src", iconDayURL);

                temp = (response.daily[i].temp.day);  //convert kelvin to Fahrenheit
                // temp = Math.round(((temp - 273.15) * 1.8) + 32);  //convert kelvin to Fahrenheit
                var temp5 = $("<p>").html("Temp: " + temp + "  &degF");

                var humidity5 = $("<p>").html("Humidity: " + response.daily[i].humidity + "%");

                div.append(dateHeading);
                div.append(icon);
                div.append(temp5);
                div.append(humidity5);
                ul5.append(div);

            }

        };

    });




});






// function getWeatherData(lat, lon, city) {


//     // Here we run our AJAX call to the OpenWeatherMap API
//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         success: function (data) {

//             console.log(data)

//         }
//     })

//     // lat= 
//     //     // We store all of the retrieved data inside of an object called "response"
//     //     .then(function (response) {

//     //          console.log(response);

//     //         showWeatherData(response, city);

//     //     });
// };











// // function weatherZip() {

// // var queryUrl = "api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}";


// }


// function weatherCity() {
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&appid=" + APIKey;

// }


// function loadWeatherZip(zipCode, isClicked) {

//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&appid=" + APIKey;
//     var weatherContainer = $("#weatherContainer");

//     // Here we run our AJAX call to the OpenWeatherMap API
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     })
//         // We store all of the retrieved data inside of an object called "response"
//         .then(function (response) {

//             console.log(response);

//             if (!isClicked) {
//                 saveLocations(response);  //save the city and zip to local storage
//                 renderLocations();
//             }


//             //load weather
//             getWeatherData(response.city.coord.lat, response.city.coord.lon, response.city.name);

//         }).catch(function (response) {
//             alert("Not a vaild Zip Code")
//         });
// }

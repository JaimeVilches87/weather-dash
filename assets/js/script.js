$(document).ready(function () {

    var APIKey = "2d21806c273ae4d5ad203a6f6347f868";
    let locations = [];

  //event handler for the city search input
    $("#searchBtn").click(function () {

        loadLocations();
        //get the user input
        var searchCriteria = $("#zipCode").val();
        getWeather(searchCriteria);
    });


    function loadLocations() {
        var locationsArray = localStorage.getItem("locations");
        if (locationsArray) //if not undefined
        {
            locations = JSON.parse(locationsArray);  //make sure there is a locations object in local storage
            renderLocations();
        }
        else {
            localStorage.setItem("locations", JSON.stringify(locations));  //if not make one and store it to local storage
        }
    };

    function renderLocations() {
        var divLocations = $("#locationHistory");
        divLocations.empty();  //clear the cities list before rendering it from the local storage object

        $.each(locations, function (index) {
            var a = $("<a>").addClass("list-group-item list-group-item-action city").attr("data-city", locations[index]).text(locations[index]);
            divLocations.append(a);
        });

        $("#locationHistory > a").off();

        $("#locationHistory > a").click(function (event) {
            var element = event.target;
            var city = $(element).attr("data-city");

            getWeather(city);

        });

    };

    //save locations to the locations array and local storage
    function saveLocations(city) {

        locations.unshift(city);
        localStorage.setItem("locations", JSON.stringify(locations));

    };

      function getWeather(city) {

        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",us&appid=" + APIKey;


        //First call to the OpenWeatherMap API to get lat and lon
        $.ajax({
            url: queryURL,
            method: "GET",

            // We store all of the retrieved data inside "response"
            success: function (response) {
                var lat = response.city.coord.lat;
                var lon = response.city.coord.lon;
                var city = response.city.name;
                localStorage.setItem("city", city);

                saveLocations(city);
                renderLocations();
                showWeather(lat, lon);
            },

        });
    };

    //Function to get one call API data
    function showWeather(lat, lon) {

        // console.log(lat, lon);
        renderLocations(lat, lon);
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=,minutely,hourly,alerts&units=imperial&appid=" + APIKey;
        console.log(queryURL);

        // Second call to the OpenWeatherMap API for one call 
        $.ajax({
            url: queryURL,
            method: "GET",

            // We store all of the retrieved data inside "response"
            success: function (response) {
                console.log(response);


                var city = localStorage.city;
                var temp = Math.round(response.current.temp);
                var uvIndex = response.current.uvi;

                //holds the colors for UV Index
                var bgColor = "";
                var textColor = "";
                var iconURL = "http://openweathermap.org/img/w/" + response.current.weather[0].icon + ".png";  //get weather icon

                //if uv index is low (1-2)
                if (uvIndex < 3) {
                    bgColor = "bg-success";
                    textColor = "text-light";
                }
                //if uv index is mocerate (3-5)
                else if (uvIndex > 2 && uvIndex < 6) {
                    bgColor = "bg-warning";
                    textColor = "text-dark";
                }
                //if uv index is high (6+)
                else {
                    bgColor = "bg-danger";
                    textColor = "text-light";
                }


                //posts infor on screen
                $("#cityDate").html(city + " (" + new Date().toLocaleDateString() + ") <img id=\"icon\" src=\"" + iconURL + "\" alt=\"Weather icon\"/>");
                console.log(temp);
                $("#currentTemp").html(" " + temp + "  &degF");
                $("#currentHumidity").html(response.current.humidity + "%");
                $("#currentWindSpeed").html(response.current.wind_speed + " MPH");
                $("#currentUVIndex").html(uvIndex).addClass(bgColor + " p-1 " + textColor);

                //we want the 5 day forecast
                var ul5 = $("#fiveDay");
                ul5.empty();

                for (i = 1; i < 6; i++) {
                    //make the data display the 5 day forecast and append to the parent div
                    var div = $("<div>").addClass("bg-primary");

                    var dateTime = (response.daily[i].dt);
                    var dateHeading = $("<h6>").text(new Date(dateTime * 1000).toLocaleDateString());  //convert unix time to javascript date
                    var iconDayURL = "http://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png";  //get weather icon
                    var icon = $("<img>").attr("src", iconDayURL);
                    temp = (response.daily[i].temp.day);
                    temp = Math.round(temp);
                    var temp5 = $("<p>").html("Temp: " + temp + "  &degF");
                    var humidity5 = $("<p>").html("Humidity: " + response.daily[i].humidity + "%");

                    //appends info on page
                    div.append(dateHeading, icon, temp5, humidity5);
                    ul5.append(div);

                }



            },


        });

    };


});
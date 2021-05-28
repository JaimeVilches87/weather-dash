var APIKey = "2d21806c273ae4d5ad203a6f6347f868";
// var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;



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

                console.log(lat);
                console.log(lon);
               localStorage.setItem("lati", lat);
               localStorage.setItem("long", lon);
            }
            

        });
        console.log(queryURL);
        console.log(searchCriteria);

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

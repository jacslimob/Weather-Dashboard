var APIKey = '071ca59d9b444070ece6e43cbc7c3ad3';
var userInput = document.querySelector('.input');
var display = document.querySelector('#cities');
var savedCities = [];
var btn = document.querySelector('.button');
//will keep function but disable on page
var clear = document.querySelector('#clear');
var savedOne = document.getElementById('savedOne');
var savedTwo = document.getElementById('savedTwo');
var savedThree = document.getElementById('savedThree');
var savedFour = document.getElementById('savedFour');
var savedFive = document.getElementById('savedFive')

function getApi() {

    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + savedCities[0] + '&appid=' + APIKey + '&units=imperial';
    //first request to get latitude and longitude to put in 5 day forecast call
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var icon = data.weather[0].icon;
            var link = document.createElement('img');
            var today = dayjs().format('MMM DD, YYYY');
            //Puts current days weather on the page
            document.querySelector('#city').innerHTML = data.name + ' (' + today + ')';
            link.src = 'https://openweathermap.org/img/wn/' + icon + '.png';
            document.querySelector('#city').appendChild(link);
            document.querySelector('#humidity').innerHTML = 'Humidity: ' + data.main.humidity + ' %';
            document.querySelector('#wind').innerHTML = 'Wind: ' + data.wind.speed + ' MPH';
            document.querySelector('#temp').innerHTML = 'Temp: ' + data.main.temp + '°F';

            //Added units=imperial to get fahrenheit
            var fiveDay = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=' + APIKey + '&units=imperial';

            fetch(fiveDay)
                .then(function (response) {
                    return response.json();// takes response turns into json data
                })
                .then(function (data) { //take json data to do something with it
                    console.log(data);
                    document.querySelector('#forecast').innerHTML = '5-Day Forecast:'
                    //1
                    var dateOne = dayjs(data.list[0].dt_txt).format('MM-DD-YYYY');
                    var icon = data.list[0].weather[0].icon;
                    var link = document.createElement('img');
                    //First day of 5 day forecast
                    document.querySelector('#future-one').innerHTML = dateOne;
                    link.src = 'https://openweathermap.org/img/wn/' + icon + '.png';
                    document.querySelector('#future-one').appendChild(link);
                    document.querySelector('#humidity-one').innerHTML = 'Humidity: ' + data.list[0].main.humidity + ' %';
                    document.querySelector('#wind-one').innerHTML = 'Wind: ' + data.list[0].wind.speed + ' MPH';
                    document.querySelector('#temp-one').innerHTML = 'Temp: ' + data.list[0].main.temp + '°F';

                    //2
                    var dateTwo = dayjs(data.list[8].dt_txt).format('MM-DD-YYYY');
                    var iconTwo = data.list[8].weather[0].icon
                    var linkTwo = document.createElement('img');
                    //copied from above
                    document.querySelector('#future-two').innerHTML = dateTwo;
                    linkTwo.src = 'https://openweathermap.org/img/wn/' + iconTwo + '.png';
                    document.querySelector('#future-two').appendChild(linkTwo);
                    document.querySelector('#humidity-two').innerHTML = 'Humidity: ' + data.list[8].main.humidity + ' %';
                    document.querySelector('#wind-two').innerHTML = 'Wind: ' + data.list[8].wind.speed + ' MPH';
                    document.querySelector('#temp-two').innerHTML = 'Temp: ' + data.list[8].main.temp + '°F';

                    //3
                    var dateThree = dayjs(data.list[16].dt_txt).format('MM-DD-YYYY');
                    var iconThree = data.list[16].weather[0].icon;
                    var linkThree = document.createElement('img');
                    //copied from above
                    document.querySelector('#future-three').innerHTML = dateThree;
                    linkThree.src = 'https://openweathermap.org/img/wn/' + iconThree + '.png';
                    document.querySelector('#future-three').appendChild(linkThree);
                    document.querySelector('#humidity-three').innerHTML = 'Humidity: ' + data.list[16].main.humidity + ' %';
                    document.querySelector('#wind-three').innerHTML = 'Wind: ' + data.list[16].wind.speed + ' MPH';
                    document.querySelector('#temp-three').innerHTML = 'Temp: ' + data.list[16].main.temp + '°F';

                    //4
                    var dateFour = dayjs(data.list[24].dt_txt).format('MM-DD-YYYY');
                    var iconFour = data.list[24].weather[0].icon;
                    var linkFour = document.createElement('img');
                    //copied from above
                    document.querySelector('#future-four').innerHTML = dateFour;
                    linkFour.src = 'https://openweathermap.org/img/wn/' + iconFour + '.png';
                    document.querySelector('#future-four').appendChild(linkFour);
                    document.querySelector('#humidity-four').innerHTML = 'Humidity: ' + data.list[24].main.humidity + ' %';
                    document.querySelector('#wind-four').innerHTML = 'Wind: ' + data.list[24].wind.speed + ' MPH';
                    document.querySelector('#temp-four').innerHTML = 'Temp: ' + data.list[24].main.temp + '°F';

                    //5
                    var dateFive = dayjs(data.list[32].dt_txt).format('MM-DD-YYYY');
                    var iconFive = data.list[32].weather[0].icon;
                    var linkFive = document.createElement('img');
                    //copied from above
                    document.querySelector('#future-five').innerHTML = dateFive;
                    linkFive.src = 'https://openweathermap.org/img/wn/' + iconFive + '.png';
                    document.querySelector('#future-five').appendChild(linkFive);
                    document.querySelector('#humidity-five').innerHTML = 'Humidity: ' + data.list[32].main.humidity + ' %';
                    document.querySelector('#wind-five').innerHTML = 'Wind: ' + data.list[32].wind.speed + ' MPH';
                    document.querySelector('#temp-five').innerHTML = 'Temp: ' + data.list[32].main.temp + '°F';

                    //bring up activity 3 to compare how they put it in the page
                    //document.querySelector('div').innerHTML = data.city;

                    //console.log(data.list[0].weather[0].icon);
                    //activity 9 might have good ideas for putting info on page
                    //activity 20 shows me how to make another page to post results to.
                })
        })
}

function displayCities() {
    //need  button that modifies array and runs getAPI.    
    if (savedCities[0]) {
        savedOne.innerHTML = savedCities[0];
        savedOne.classList = 'column button';
        savedOne.onclick = function () {
            var recent = savedOne.innerHTML;
            savedCities.unshift(recent);
            getApi();
            savedSearch();
            displayCities();
        }
    }
    if (savedCities[1]) {
        savedTwo.innerHTML = savedCities[1];
        savedTwo.classList = 'column button';
        savedTwo.onclick = function () {
            var recent = savedTwo.innerHTML;
            savedCities.unshift(recent);
            getApi();
            savedSearch();
            displayCities();
        }
    }
    if (savedCities[2]) {
        savedThree.innerHTML = savedCities[2];
        savedThree.classList = 'column button';
        savedThree.onclick = function () {
            var recent = savedThree.innerHTML;
            savedCities.unshift(recent);
            getApi();
            savedSearch();
            displayCities();
        }
    }
    if (savedCities[3]) {
        savedFour.innerHTML = savedCities[3];
        savedFour.classList = 'column button';
        savedFour.onclick = function () {
            var recent = savedFour.innerHTML;
            savedCities.unshift(recent);
            getApi();
            savedSearch();
            displayCities();
        }
    }
    if (savedCities[4]) {
        savedFive.innerHTML = savedCities[4];
        savedFive.classList = 'column button';
        savedFive.onclick = function () {
            var recent = savedFive.innerHTML;
            savedCities.unshift(recent);
            getApi();
            savedSearch();
            displayCities();
        }
    }
}

function savedSearch() {
    localStorage.setItem('cities', JSON.stringify(savedCities));
}

function onLoad() {
    var initial = JSON.parse(localStorage.getItem('cities'));

    if (initial !== null) {
        savedCities = initial;
        displayCities();
    }

}

btn.addEventListener('click',
    function (event) {
        event.preventDefault();
        var initialCity = userInput.value.trim();

        savedCities.unshift(initialCity);
        userInput.value = '';

        getApi();
        savedSearch();
        displayCities();
    });

onLoad();

clear.addEventListener('click',
    function () {

        localStorage.clear();
    })


    
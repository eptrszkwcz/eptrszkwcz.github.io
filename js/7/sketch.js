var APIkey = 'eb42cb81f7a8cbf6f51bba12ed1e6225';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var weatherData;
var city;
var country;
var cityName;
var button;
var cityInput;
var windSpeed;
var description = '';
var temperature = 0;
var temperatureF =0;
var temperatureF_round = 999;
temperatureHI = 0;
var temperatureF_HI =0;
var temperatureF_round_HI = 999;
var tempABS;
var humidity = 0;
var pressure = 0;
var mySound;
var temp_rate;
var bg;
var temperature_diff

function preload() {
  soundFormats('mp3', 'ogg');
  // mySound = loadSound('Somewhere_120.mp3');
  mySound = createAudio('data/Somewhere_120.mp3');
}

function setup(){
  createCanvas(700,500);
  bg = loadImage("images/Assignment7/IZ.png")
  // noLoop();
  // queryAPI();
  // back in html, there is an ID submit, the select command allows you to acces that!!
  button = select('#submit');
  city = select('#city');
  button.mousePressed(queryAPI);
  queryAPI_HI();

}

function queryAPI(){
  var request = baseURL + city.value() +'&apikey=' + APIkey;
  // console.log(request)
  // call back function!! has one main task (0,x) and then do a secondary function (x, 1).
  // this will will getWeatherData after storing request
  loadJSON(request, getWeatherData)
}

function queryAPI_HI(){
  var requestHI = baseURL + "honolulu" + '&apikey=' + APIkey;
  loadJSON(requestHI, getWeatherDataHI)
}

// becuae this function is the second part of callback, it assumes that the output of the first function
// is the input for the second function
function getWeatherData(APIData){
  weatherData = APIData;
  description = weatherData.weather[0].description;
  windSpeed = weatherData.wind.speed;
  pressure = weatherData.main.pressure;
  temperature = weatherData.main.temp;
  country = weatherData.sys.country;
  cityName = weatherData.name;
  temperatureF = (temperature-273.15)*1.8+32
  temperatureF_round = Math.round(temperatureF)

  temperature_diff = temperatureF_round - temperatureF_round_HI
  tempABS = Math.abs(temperature_diff)
  console.log(temperatureF_round_HI)
  console.log(temperatureF_round)
  console.log(temperature_diff)
  // console.log(temperatureF)
  // console.log(temperatureF_round)
  print(weatherData);
  redraw();
}

function getWeatherDataHI(APIDataHI){
  weatherDataHI = APIDataHI;
  temperatureHI = weatherDataHI.main.temp;
  console.log(temperatureHI)
  temperatureF_HI = ((temperatureHI-273.15)*1.8)+32
  temperatureF_round_HI = Math.round(temperatureF_HI)
  console.log(temperatureF_HI)
  // console.log(temperatureF)
  // console.log(temperatureF_round)
  print(weatherDataHI);
  // redraw();
}

function songspeed(rate){
  mySound.stop()
  // mySound.setVolume(0.1);
  mySound.play()
  mySound.speed(rate)
}

function rateChange(){
  if (temperatureF_round==70){
    songspeed(1)
  }
  if (temperatureF_round>temperatureF_HI&&temperatureF_round<998){
    temp_rate = map(temperatureF_round, temperatureF_HI, 130 , 1, 3)
    console.log(temp_rate)
    songspeed(temp_rate)
  }
  if (temperatureF_round<temperatureF_HI){
    temp_rate = map(temperatureF_round, -10, temperatureF_HI, 0.3, 1)
    console.log(temp_rate)
    songspeed(temp_rate)
}
}

function draw(){
  background(bg);
  // var temperature_diff2 = -3
  if (weatherData){
    textAlign(CENTER, CENTER)
    fill(255,255,255,95)
    textSize(25)
    text(cityName+", "+country, width/2, (height/3)-10)
    fill(255,255,255,120)
    textSize(120)
    text(str(tempABS), width/2, (height/2)-20)
    textSize(14)
    if (temperature_diff > 0) {
      text("degrees F warmer than Honolulu", width/2, (height/2)+47)
    }
    if (temperature_diff < 0) {
      text("degrees F colder than Honolulu", width/2, (height/2)+47)
    }
    noLoop();
    rateChange();
  }
  else {
    textAlign(CENTER, CENTER)
    fill(255,255,255,95)
    textSize(25)
    text("Honolulu, HI", width/2, (height/3)-10)
    fill(255,255,255,120)
    textSize(120)
    text(temperatureF_round_HI, width/2, (height/2)-20)
  }
  // fill (255,255,255,70)
  // textSize(14);
  // text("Israel's Tempo: 3.1", width/2, height-14)
  // text("fog", width/2, height/2+80)
  // rateChange();


  }

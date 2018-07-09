var id = 0; //for assigning id to location panels
//for storing data for each location panel
var geoData = {
  "data":
  [
   
  ]
};
var fahrenheit = true;

$(document).ready(function(){//when loaded
    if(navigator.geolocation){//if we can get geolocation
      navigator.geolocation.getCurrentPosition(function(position){//create a panel for geolocation
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        createLocation(latitude,longitude, "Your Location");
    });
    }
    $("#add").click(function(){//create a panel with given lat/logn when add button clicked
      createLocation();
    });
  $("#clear").click(function(){
    $("div").remove(".location");
  });
  $("#unit").click(function(){
    let text = $("#temperature").text();
    text = text.slice(text.indexOf(' ')+1,text.length);
    let num = text.valueOf();
    //console.log(fahrenheit);
    if(!fahrenheit){
      num = (num*9/5 + 32).toFixed(2);
      $("#unit").text("Fahrenheit");
    }
    else{
      num = ((num - 32)*5/9).toFixed(2);
      $("#unit").text("Celcius");
    }
    $("#temperature").text("Temperature- " + num);
    fahrenheit = !fahrenheit;
    console.log("work");
  });
});

function createLocation(){//latitude,longitude
  var latitude = 0;
  var longitude = 0;
  var name = "";
  if(arguments.length !=0){//if arguments are passed use them
    latitude = arguments[0];
    longitude = arguments[1];
    name = arguments[2];
    makeCard(latitude,longitude,name);
  }
  else{//if no arguments are passed, use the bar
  var bar = $("#bar").val();
  if(bar != ""){ //don't do stuff if the bar is empty, refine later to check for input type
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address' : bar},function(results,status){
      if(status == 'OK'){
        makeCard(results[0].geometry.location.lat(),results[0].geometry.location.lng(),bar);
      }
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    /*latitude = Number(bar.substr(0,bar.indexOf(" ")));
    longitude = Number(bar.substr(bar.indexOf(" ")+1,bar.length-1));
    makeCard(latitude,longitude);*/
  }
 }
}

function makeCard(latitude, longitude, name){
  var call = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c956b6206414a31a19d67d119e5fa53f/" + latitude +"," +longitude;
  //console.log(call);
  let temp = {};
  $.getJSON(call,function(json){
  temp["id"] = id;
  temp["name"] = name;
  temp.latitude = json.latitude;
  temp.longitude = json.longitude;
  temp.currently = json.currently;
  geoData.data.push(temp);
    
  let card = $("<div></div>").attr("class","location");
  card.attr("id",id.toString());
  card.addClass("w3-round w3-rightbar w3-border-blue");
   
  let text = $("<p></p>").text(name + " (" + Math.round(latitude) + "," + Math.round(longitude) +")");
  card.append(text);
  card.click(function(){
    for(let entry of geoData.data){
      if($(this).attr("id") == entry.id){
         updateWeatherData(entry);
      }
    }
    updateWeatherData()
  });
  $("#locations").prepend(card);
  //more icon stuff
  updateWeatherData(temp);
  id++;
  });
}

function updateWeatherData(json){
  //update skycon
  let skycons = new Skycons({"color": "black"});
  let str = json.currently.icon.toUpperCase().split('');
  for(let i = 0; i < str.length; i++){
     if(str[i] == '-')str[i] ='_';
  } 
  let weather = str.join('');
  skycons.set("weather-icon", Skycons[weather]);
  skycons.play()
  //update left panel
  //update summary
  let summary = "Summary- " + json.currently.summary;
  $("#summary").text(summary);
  //update temperature
  let number = json.currently.temperature;
  if(!fahrenheit){
    number = ((number - 32)*5/9).toFixed(2);
  }
  let temperature = "Temperature- " + number;
  $("#temperature").text(temperature);
  //update humidity
  let humidity = "Humidity- " + json.currently.humidity*100 + "%";
  $("#humidity").text(humidity);
  //update pressure
  let pressure = "Pressure- " + json.currently.pressure + "hPa";
  $("#pressure").text(pressure);
  //update UV Index
  let uvIndex = "UV Index- " + json.currently.uvIndex;
  $("#uv-index").text(uvIndex);
  //update cloudCover
  let cloudCover = "Cloud Cover- " + json.currently.cloudCover*100 + "%";
  $("#cloud-cover").text(cloudCover);
  //update title
  let title = "Weather- " + json.name;
  $("#weather-name").text(title);
}
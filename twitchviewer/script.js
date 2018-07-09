var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","timthetatman"];
$(document).ready(function(){
  for(let i = 0; i < channels.length;i++){
    makeCard(channels[i]);
  }
  $("#all").click(function(){ 
    $(".online").show();      
    $(".offline").show();                                            
  });
  $("#online").click(function(){
    $(".online").show();                                                  
    $(".offline").hide();
  });                                            
  $("#offline").click(function(){                 
    $(".online").hide();                                  
    $(".offline").show();                                                
  });
});
function makeCard(channel){
   let link = "https://wind-bow.glitch.me/twitch-api/channels/" + channel;
  $.getJSON(link,function(json){
    let card = $("<div></div>").addClass("card w3-panel");
    let logo = $("<img></img>").attr("src",json.logo);
    logo.addClass("w3-circle");
    logo.css({
      "width": "100px",
      "height": "100px"
    });
    let name = $("<p></p>").text(json.display_name);
    name.css({
      "position":"relative",
      "top":"10px",
      "left":"10px"
    });
    card.append(logo);
    card.append(name);
    card.click(function(){
      window.open(json.url,"_blank");
    });
    let onlineLink = "https://wind-bow.glitch.me/twitch-api/streams/" + channel;
    $.getJSON(onlineLink,function(json){
      let status = "";
      if(json.stream == null){
        status = "offline";
        card.addClass("w3-dark-gray");
        card.addClass("offline");
      }
      else{
        status = "online"  + ', "' + json.stream.channel.status + '"' + ", playing " + json.stream.channel.game;
        card.addClass("w3-red");
        card.addClass("online");
      }
      let textStatus = $("<p></p>").text(status);
      textStatus.css({
      "position":"relative",
      "top":"10px",
      "left":"10px"
      });
      card.append(textStatus);
      card.attr("id",status);
      $("#channels").append(card);
    });
  });
}
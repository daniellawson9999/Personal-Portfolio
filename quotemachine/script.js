$(document).ready(function(){
  var url ="https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
  $.getJSON(url, getQuote);
  $("#button").on("click",function(){
   $.getJSON(url, getQuote);
  });
});

function getQuote(data){
  var collors = ["olive","navy","purple","gray","maroon","green","red","MediumSeaGreen","MediumSlateBlue","NavajoWhite","Salmon"];
  var random = Math.floor(Math.random() * collors.length);
  var collor = collors[random];
  $("#quote").text('"'+data.quoteText +'"');
  $("#author").text(data.quoteAuthor);
  $("body").css("background-color",collor);
  $("#button").css("background-color",collor);
  var link = "https://twitter.com/intent/tweet?text="+ $("#quote").text().replace(/;/g, ',') + " "+$("#author").text();
  $("#tweet").attr("href",link);
}



 $(document).ready(function(){
      $("#clear").hide();
      $("#random").click(function(){
        window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
      });                                       
      $("#search-enter").keydown(function(){ 
        if(event.which == 13){
          list($("#search-enter").val());
        }
      });
      $("#search").click(function(){
        list($("#search-enter").val());
      });
      $("#clear").click(function(){
        $("#results").empty();
        $(this).fadeOut("slow");
      });
    });

    function list(search){
      var url ="https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + search   +  "&format=json";
      $.getJSON(url,function(json){
        $("#results").empty();
        let count = 0;
        for(let entry in json[1]){
          makeEntry(json[1][count],json[2][count],json[3][count]);
          count++;
        }
      });
    }
    function makeEntry(title,description,link){
      //console.log("title: " + title + " description: " +description + " link: " + link + "\n");
      $("#clear").fadeIn("slow");
      let entry = $("<div></div>").addClass("w3-panel w3-leftbar w3-sand entry");
      let name = $("<p></p>").text(title);
      let info = $("<p></p>").text(description);
      console.log("test");
      entry.append(name);
      entry.append(info);
      entry.click(function(){
        window.open(link, "_blank");
      });
      $("#results").append(entry);
      entry.hide();
      entry.slideDown("slow");
    }
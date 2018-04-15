$(document).ready(function() {
  function searchBandsInTown(artist) {
    var queryURL ="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=06eb39d6496f7c099e8fb74c69111298";
    
    // calling the Bandsintown API
      $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
          console.log(response);
            
            // Taking the Bandintown API response 
            for (var i = 0; i < response.length; i++) {
              var artistName = response[i].lineup;
              var venueName = response[i].venue.name;
              var venueLat = response[i].venue.latitude;
              var venueLong = response[i].venue.longitude;
              var eventURL = response[i].url;
              var city = response[i].venue.city;
              var state = response[i].venue.region;
              var locBand = { lat: venueLat, lng: venueLong };
            
            // modifying variables to create the date look we want
              var eventDate = response[i].datetime.substring(0, 10);
              var formattedEventDate = new Date( Date.parse(eventDate) );
              var newStr = formattedEventDate.toString();

            // Creating HTML and adding API response
            var p1 = $("<p>").text(venueName);
            var p3 = $("<p>").text(newStr.substring(0,15));
            var p4 = $("<p>").text(city + ', ' + state);

            //creates button next to results
              var mapsBut = $("<a class= 'modal-trigger waves-effect waves-light btn blue'>Get Drunk</a>");
            
            //button opens modal
              mapsBut.attr("href", "#modal1");
            //applies the latitude and longitude data for venue to button
              mapsBut.prop({ dataLat: venueLat, dataLong: venueLong });
            //on click function for maps button
              mapsBut.on("click", function() {
                  loc1 = {};
            // loc 1 latitude and longitude are floats of the latitutde and longitude output from bands in town
                  loc1.lat = parseFloat($(this).prop("dataLat"));
                  loc1.lng = parseFloat($(this).prop("dataLong"));
            //materialize code for opening modal
                  var elem = document.querySelector(".modal");
                  var instance = M.Modal.init(elem);
                  initMap();
              });

              var pB = $("<hr>");
              var p2 = $("<a>").attr({ href: eventURL, target: '_blank' }).text("Click to buy tickets");

        $("#featured-div").append(p1, p4, p3, p2, mapsBut, pB);
      }
    });
  }

  // This event reads the artist entered to the search form when user hits search
  // button and calls the main bands events function
        $("#search-btn").on("click", function(event) {
        $("#featured-div").empty();
        event.preventDefault();
        var inputBand = $("#searchBand").val().trim();
        searchBandsInTown(inputBand);
        });
      });
        
      //empties out results
        $("#clear-btn").on("click", function(event) {
        $("#featured-div").empty();
});

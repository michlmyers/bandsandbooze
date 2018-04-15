var map;
var infoWindow;

// Creates the map.
function initMap() {
  //location equals location pulled from maps button
  var loc = loc1;
  console.log(loc);
  map = new google.maps.Map(document.getElementById("map"), {
    center: loc,
    zoom: 15
  });

  // Create the places service.
  var service = new google.maps.places.PlacesService(map);
  infoWindow = new google.maps.InfoWindow();

  // Perform a nearby search.
  service.nearbySearch(
    { location: loc, radius: 500, type: ["bar"] },

    function(results, status, pagination) {
      if (status !== "OK") return;

      for (var i = 0; i < results.length; i++) {
        request = {
          placeId: results[i].place_id
        };

        service.getDetails(request, placeDetailsCallback);

        function placeDetailsCallback(place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMarker(place);
          }
        }
      }
    }
  );
}
//creates variable for location pins to be beer icon
var beer = "assets/images/beer-icon.png";
//add markers
function createMarker(place) {
  var marker = new google.maps.Marker({
    position: map.getCenter(),
    map:map,
  });
  var marker = new google.maps.Marker({
    //sets marker icon as beer
    icon: beer,
    map: map,
    position: place.geometry.location,
    title: place.name
  });

  //expand marker when clicked
  google.maps.event.addListener(marker, "click", function() {
      console.log(place.url);
    var name = "<p><strong> " + place.name + "</strong></br>";
    var address = "Address: " + place.formatted_address+ "</br>";
    var link = `<a href="${place.url}" target="_blank">Open in Google Maps</a>`

   ;
    infoWindow.setContent(name + address + link);
    infoWindow.open(map, this);
  });
}

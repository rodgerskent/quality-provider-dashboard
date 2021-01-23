


function createMap(bikeStations) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Facilities": bikeStations
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [39.678, -104.826],
    zoom: 12,
    layers: [lightmap, bikeStations]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

//function createMarkers(response) {
function createMarkers(markers) {
  //console.log("create markers kicked off")
  //console.log("markers in createMarkers:", markers)
  // Pull the "facilities" property off of response.data
  var facilities = markers[0].ProgramIdentifier;
  //console.log("should have facility names", facilities)
  // Initialize an array to hold bike markers
  var bikeMarkers = [];

  // Loop through the facilities array
  for (var index = 0; index < markers.length; index++) {
    var restaurants = markers[index];

  // For each facility, create a marker and bind a popup with the facilities name
    var bikeMarker = L.marker([restaurants.GISLatitude, restaurants.GISLongitude])
      .bindPopup("<h3>" + restaurants.ProgramIdentifier + "<h3><h3>Address: " + restaurants.SiteAddress + "</h3>");

  // Add the marker to the bikeMarkers array
    bikeMarkers.push(bikeMarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(bikeMarkers));
}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
//d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);

// Retrieve data from the CSV file as a basic starting point
//d3.csv("./data.csv").then(function(diningData) {
//d3.csv("data.csv").then(function(diningData) {
//d3.csv("./js/data.csv").then(function(diningData) {
d3.csv("./static/js/data.csv").then(function(diningData) {
  //console.log(diningData);
  var stations = diningData
  console.log("stations variable being passed to createMarkers:", stations)
   var county = diningData.map(data => data.County)
   //console.log(county)
   var city = diningData.map(data => data.City)
   //console.log(city)
   var zip = diningData.map(data => data.Zip)
   //console.log(zip)
   var street = diningData.map(data => data.SiteAddress)
   //console.log(street)
   var name = diningData.map(data => data.ProgramIdentifier)
   //console.log(name)
   var latitude = diningData.map(data => data.GISLatitude)
   //console.log(latitude)
   var longitude = diningData.map(data => data.GISLongitude)
   //console.log(longitude)
   var foodviolations = diningData.map(data => data.TotalFoodborneViolations)
   //console.log(foodviolations)
   var retailviolations = diningData.map(data => data.TotalRetailViolations)
   //console.log(retailviolations)
   var facilityid = diningData.map(data => data["Facility ID"])
   console.log("facility id:", facilityid)
  createMarkers(stations)
});



/// Map stuff
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
  var map = L.map("map", {
    center: [39.678, -104.826],
    zoom: 10,
    layers: [lightmap, bikeStations]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
  console.log("createmap fn complete")
  map.invalidateSize();
}

function createMarkers(markers) {
  //console.log("create markers kicked off")
  //console.log("markers in createMarkers:", markers)
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
  console.log("create markers fn compplete ... markers here")
  console.log(bikeMarkers)
}
 

  d3.csv("./data.csv").then(function(diningData) {
    //console.log(diningData);
    var stations = diningData
    console.log("Full data set loading at start:", stations)
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
    //console.log("facility id:", facilityid)
    var premise = diningData.map(data => data["Description"])
    //console.log("premisetype:", premise)
    var selectedCity = stations
    // setting this variable to a starting point
    // var starterStations = diningData.map(data => data.City === "Glendale")
    // console.log("Glendale file for map kick-off")
    // console.log(starterStations)
  

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    var uniqueCity = city.filter(onlyUnique)
    //var uniqueCity = uniqueCity.sort
    //console.log("unique city" , uniqueCity)

    var uniquePremise = premise.filter(onlyUnique)
    //console.log("unique premise" , uniquePremise)

    var uniqueFoodviolations = foodviolations.filter(onlyUnique)
    //console.log("unique violations" , uniqueFoodviolations)

    
  var menuList = uniqueCity;
  //console.log("stuff for city drop down menu")
  //console.log(menuList);
  var menu = d3.select("#selDataset1")
  uniqueCity.forEach((menuList) => {
      // menu.html("");
      //if menu not in row
      var row = menu.append("option");
      Object.values(menuList).forEach(([value]) => {
        var cell = row.append("option");
        cell.text(value);
      });

  
  });

  var menuList2 = uniquePremise;
  //console.log("stuff for premise drop down menu")
  //console.log(menuList2);
  var menu2 = d3.select("#selDataset2")
  uniquePremise.forEach((menuList2) => {
      // menu.html("");
      //if menu not in row
      var row2 = menu2.append("option");
      Object.values(menuList2).forEach(([value]) => {
        var cell2 = row2.append("option");
        cell2.text(value);
      });
  });

  var menuList3 = uniqueFoodviolations;
  //console.log("stuff for violations drop down menu")
  //console.log(menuList3);
  var menu3 = d3.select("#selDataset3")
  uniqueFoodviolations.forEach((menuList3) => {
      // menu.html("");
      //if menu not in row
      var row3 = menu3.append("option");
      Object.values(menuList3).forEach(([value]) => {
        var cell3 = row3.append("option");
        cell3.text(value);
      });
  });

  // Initial bar chart stuff
  var y = foodviolations

  var trace = {
    x: y,
    //y: y,
    //text: x,
    // name: yy[0],
    type: "histogram",
  };

  var data = [trace];

  var layout = {
    title: "The Number of Establishments by Violation Count (Start)",
    xaxis: { title: "Number of Violations" },
    // yaxis: { title: "OTU"}
  };

  Plotly.newPlot("bar", data, layout);
  // End of starter bar chart stuff

  /// start of pie chart
  var data = [{
    title: "Violations by Establishment Type (Starter)",
    //values: [19, 26, 55],
    values: foodviolations,
    //labels: ['Residential', 'Non-Residential', 'Utility'],
    labels: premise,
    type: 'pie'
  }];
  
  var layout = {
    //font-size: 9px,
    //height: 400,
    //width: 500
  };
  
  Plotly.newPlot('myDiv', data, layout);
  /// end of pie chart

createMarkers(stations)
//console.log("starter load kicked off create markers fn")
});


//var button = d3.select("#selDataset");
var form = d3.select("form");
form.on("submit", optionChanged);

function optionChanged() {
    
  d3.csv("./data.csv").then(function(targetData) {
      
      console.log("Confirms full dataset in optionChanged")
      var targetCity = targetData
      console.log(targetCity)

      // if filtered approach stuff
      // targetStations stuff narrowed to users selection
      function fnFilter(targetCity) {
        //d3.event.preventDefault();
         console.log('fnFilter function active')
         var inputElement1 = d3.select("#selDataset1");
         var inputValue1 = inputElement1.property("value");
        // console.log(inputValue1);
         var inputElement2 = d3.select("#selDataset2");
         var inputValue2 = inputElement2.property("value"); 
        // console.log(inputValue2);


        if (inputValue1 != "All"){
          if (inputValue2 != "All"){
            return targetCity.Description === inputValue2 && targetCity.City ===inputValue1
          }
          return targetCity.City === inputValue1
        }
        if (inputValue2 != "All"){
        return targetCity.Description === inputValue2
        }
        return targetCity = targetCity
        
      }
  
        var selectedCity = targetCity.filter(fnFilter)
        //console.log("should be smaller dataset with just one city")
        //console.log(selectedCity)
        
        var foodinCity = selectedCity.map(data => data.TotalFoodborneViolations)
        //console.log("array for graphing violations")
        //console.log(foodinCity)

        var typeinCity = selectedCity.map(data => data.Description)
    
            
      // Targeted bar chart stuff
      var trace = {
        x: foodinCity,
        //y: y,
        //text: labels,
        // name: yy[0],
        type: "histogram",
          
      };

      var data = [trace];

      var layout = {
        title: "Number of Establishments by Violation Count (optionChanged)",
        xaxis: { title: "Number of Violations" },
        //height: 400,
        //width: 500
        //yaxis: { title: "OTU"}
      };

      Plotly.newPlot("bar", data, layout);
      // End of targeted bar chart stuff

      /// start of pie chart
  var data = [{
    title: "Violations by Establishment Type (OnChange)",
    //values: [19, 26, 55],
    values: foodinCity,
    //labels: ['Residential', 'Non-Residential', 'Utility'],
    labels: typeinCity,
    type: 'pie'
  }];
  
  var layout = {
    //height: 400,
    //width: 500
  };
  
  Plotly.newPlot('myDiv', data, layout);
  /// end of targeted pie chart

  // Targeted Map start here



  // Targeted Map end here




  });

}
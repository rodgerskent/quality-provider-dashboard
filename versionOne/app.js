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

  //Create a layer group made from the bike markers array, and make available for creating map
  return (L.layerGroup(bikeMarkers));
}
 

  d3.csv("./data.csv").then(function(diningData) {
    //console.log(diningData);
    var stations = diningData
    //console.log("Full data set loading at start:", stations)
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
  
    // Function to build a list of unique drop down menu items
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

    // builds drop down menu for city selection
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

  // builds drop down menu for premise type selection
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

  // Builds drop down menu for number of violations selection
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

  // Initial bar chart build
  var y = foodviolations
  var trace = {
    x: y,
    type: "histogram",
  };
  var data = [trace];
  var layout = {
    //title: "The Number of Establishments by Violation Count (Start)",
    xaxis: { title: "Number of Violations" },
    margin: {
      l: 5,
      r: 2,
      b: 0,
      t: 5,
      pad: 8
    }
  };
  Plotly.newPlot("bar", data, layout);
  // End of starter bar chart stuff

  /// Initial pie chart build
  var data = [{
    //title: "Violations by Establishment Type (Starter)",
    values: foodviolations,
    labels: premise,
    type: 'pie'
  }];
  
  var layout = {
    margin: {
      l: 5,
      r: 2,
      b: 0,
      t: 5,
      pad: 8
    }
  };
  Plotly.newPlot('myDiv', data, layout);
  /// end of initial pie chart build

  // Initial map build
  bikeMarkers = createMarkers(stations)
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
    "Facilities": bikeMarkers
  };
  // Create the map object with options
  var map = L.map("map", {
    center: [39.678, -104.826],
    zoom: 10,
    layers: [lightmap, bikeMarkers]
  });
  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
  // End of initial d3 data, drop down, chart and map builds
  console.log("Finished initial load = map, bar, pie & menus")
});

// 2nd Main Section that responds to user selections on city and premise type
var form = d3.select("form");
form.on("submit", optionChanged);

function optionChanged() {
  d3.csv("./data.csv").then(function(targetData) {
    //console.log("past through map clear function") 
    //console.log("Confirms full dataset in optionChanged")
      var targetCity = targetData
      //console.log(targetCity)
      // Functiont to target the data set based on city selected
      function fnFilter(targetCity) {
        //d3.event.preventDefault();
         //console.log('fnFilter function active')
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
    
            
      // Builds user driven bar chart
      var trace = {
        x: foodinCity,
        type: "histogram",
      };
      var data = [trace];
      var layout = {
        //title: "Number of Establishments by Violation Count (optionChanged)",
        xaxis: { title: "Number of Violations" },
      };
      Plotly.newPlot("bar", data, layout);
      // End of user driven bar chart

      /// Start of user selected Pie Chart build
      var data = [{
        //title: "Violations by Establishment Type (OnChange)",
        values: foodinCity,
        labels: typeinCity,
        type: 'pie'
      }];
      var layout = {
        //height: 400,
        //width: 500
      };
  
    Plotly.newPlot('myDiv', data, layout);
    /// End of user driven pie chart build
 
  console.log("Array with user driven city stuff")
  console.log(selectedCity)
  createMarkersII(selectedCity)
  });

}

function createMarkersII(markers) {
  console.log("createMarkersII kicked off")
  //console.log("markers in createMarkers:", markers)
  var facilities = markers[0].ProgramIdentifier;
  var targetedMarkers = [];

  // Loop through the user driven establishments array
  for (var index = 0; index < markers.length; index++) {
    var targetRestaurants = markers[index];

  // For each facility, create a marker and bind a popup with the establishment name
    var targetedMarker = L.marker([targetRestaurants.GISLatitude, targetRestaurants.GISLongitude])
      .bindPopup("<h3>" + targetRestaurants.ProgramIdentifier + "<h3><h3>Address: " + targetRestaurants.SiteAddress + "</h3>");

  // Add the marker to the bikeMarkers array
    targetedMarkers.push(targetedMarker);
  }

  console.log('remove layer here?')
  map.removeLayer(overlayMaps);

  console.log("should have new markers here")
  console.log(targetedMarkers)
  var overlayMaps = {
    "Facilities": targetedMarkers
  };

  L.control.layers(overlayMaps, {
    collapsed: false
  }).addTo(map);

} 
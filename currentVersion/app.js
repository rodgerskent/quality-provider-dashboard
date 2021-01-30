function createMarkers(markers) {
  //console.log("create markers kicked off")
  //console.log("markers in createMarkers:", markers)
  var facilities = markers[0]["Program Identifier"];
  //console.log("should have facility names", facilities)
  // Initialize an array to hold bike markers
  var bikeMarkers = [];
  // Loop through the facilities array
  for (var index = 0; index < markers.length; index++) {
    var restaurants = markers[index];
  // For each facility, create a marker and bind a popup with the facilities name
    var bikeMarker = L.marker([restaurants["GIS Latitude"], restaurants["GIS Longitude"]])
      .bindPopup("<h3>" + restaurants["Program Identifier"] + "<h3><h3>Address: " + restaurants["Site Address"] + "</h3>");
  // Add the marker to the bikeMarkers array
    bikeMarkers.push(bikeMarker);
  }

  //Create a layer group made from the bike markers array, and make available for creating map
  return (L.layerGroup(bikeMarkers));
}
 
console.log(vDescriptions)


 d3.csv("./inspectionData.csv").then(function(diningData) {
    //console.log(diningData);
    var stations = diningData
    //console.log("Full data set loading at start:", stations)
    var county = diningData.map(data => data.County)
    //console.log(county)
    var city = diningData.map(data => data.City)
    //console.log(city)
    var zip = diningData.map(data => data.Zip)
    //console.log(zip)
    var street = diningData.map(data => data["Site Address"])
    //console.log(street)
    var name = diningData.map(data => data["Program Identifier"])
    //console.log(name)
    var latitude = diningData.map(data => data["GIS Latitude"])
    //console.log(latitude)
    var longitude = diningData.map(data => data["GIS Longitude"])
    //console.log(longitude)
    var foodviolations = diningData.map(data => data["Total Foodborne Illness Risk Violations"])
    //console.log(foodviolations)
    var retailviolations = diningData.map(data => data["Total Good Retail Practices Violations"])
    //console.log(retailviolations)
    var facilityid = diningData.map(data => data["Facility ID"])
    //console.log("facility id:", facilityid)
    var premise = diningData.map(data => data["Description"])
    //console.log("premisetype:", premise)
    var inputValue1 = city[0]
    //console.log("Initial City ...")
    //console.log(inputValue1)

    // var shameHover = diningData.filter(item => item["Program Identifier"] === "JP Asian Bistro Corporation")
    // shameHover = shameHover.filter(item => item.FC08 >=1)
    // console.log(shameHover)

    // fn that takes shameHover FC's through a loop and appends
    


    function shameSorter(a, b) {
      if (a > b) {
        return -1;
      }
      if (a < b) {
        return 1;
      }
      return 0;
    }

    if (inputValue1) {
      var tbody = d3.select("tbody");
      tbody.html("");
      var starterData = stations.filter(item => item.City === inputValue1);
      var starterShame = starterData.filter(item => item["Total Foodborne Illness Risk Violations"] >=5)
      starterShame = starterShame.sort(shameSorter);
      starterShame = starterShame.slice(0,6)
      foodviolations = starterData.map(item => item["Total Foodborne Illness Risk Violations"])
      //console.log("shame list")
      //console.log(starterShame)
      starterShame.forEach((offender) => {
        var row = tbody.append("tr");
        var cell = row.append("td");
        cell.text(offender["Program Identifier"])
        
      });
      //console.log(starterShame)
      
      document.querySelectorAll('#shame-table td')
      .forEach(e => e.addEventListener("mouseover", function() {
          // Here, `this` refers to the element the event was hooked on
          console.log(this.innerText)
          var restaurantName = this.innerText
          var grossData = stations.filter(item => item["Program Identifier"] === restaurantName)[0];
          //console.log(Object.entries(grossData))
          //var grossList = grossData.filter(item => item["FC ... "] === restaurantName);
      for ([key,values] of Object.entries(grossData)){
        if (key.startsWith("FC") && values >=1){
          def = vDescriptions.filter(item => item.Key === key)
          //console.log(def[0])
          console.log(key, values, def[0].Value)
          
        }
        //console.log(values)

      }

      }));



    }
  
    // Function to build a list of unique drop down menu items
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
 
    function compare(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }

    var uniqueCity = city.filter(onlyUnique)
    //var uniqueCity = uniqueCity.sort
    uniqueCity.sort(compare);


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
    marker: {
      color: 'crimson',
    },
    type: "histogram",
  };
  var data = [trace];
  var layout = {
    //title: "The Number of Establishments by Violation Count (Start)",
    xaxis: { title: "Number of Foodborne Violations"},
    yaxis: { title: "Number of Establishments"},
    height: 245,
    width: 480,
    bargap: 0.2,
    margin: {
      l: 75,
      r: 5,
      b: 40,
      t: 10,
      pad: 8,
    }
  };
  Plotly.newPlot("bar", data, layout);
  // End of starter bar chart stuff

  /// Initial pie chart build
  var data = [{
    title: "Violations by Establishment Type",
    //title-font: 12px,
    titleposition: "bottom-left",
    legendposition: "bottom-right",
    values: foodviolations,
    labels: premise,
    type: 'pie'
  }];
  
  var layout = {
      height: 245,
      width: 420,
      margin: {
        l: 35,
        r: 5,
        b: 40,
        t: 10,
        pad: 8,
      }
  };
  Plotly.newPlot('myDiv', data, layout);
  /// end of initial pie chart build

  // Initial map build
  bikeMarkers = createMarkers(starterData)
  //console.log("Initial bike markers here")
  //console.log(bikeMarkers)
  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });


  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": dark
  };
  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Facilities": bikeMarkers
  };
  // Create the map object with options
  var map = L.map("map", {
    center: [39.678, -104.826],
    zoom: 9,
    layers: [lightmap, bikeMarkers]
  });
  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  var [apanLat] = starterData.map(data => data["GIS Latitude"])
  var [apanLng] = starterData.map(data => data["GIS Longitude"])
  map.panTo(new L.LatLng(apanLat-.30, apanLng));

  // End of initial d3 data, drop down, chart and map builds
  console.log("Finished initial load = map, bar, pie & menus")
  //console.log(overlayMaps)
  //return overlayMaps
});




// 2nd Main Section that responds to user selections on city and premise type
var form = d3.select("form");
form.on("submit", optionChanged);

function optionChanged() {
  d3.csv("./inspectionData.csv").then(function(targetData) {
    //console.log("past through map clear function") 
    //console.log("Confirms full dataset in optionChanged")
      var targetCity = targetData
      //console.log(targetCity)
      // Function to target the data set based on city selected
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
        var foodinCity = selectedCity.map(data => data["Total Foodborne Illness Risk Violations"])
        //console.log("array for graphing violations")
        //console.log(foodinCity)
        var typeinCity = selectedCity.map(data => data.Description)
    
       // Updated list of shame
       function fnShame(a, b) {
        if (a > b) {
          return -1;
        }
        if (a < b) {
          return 1;
        }
        return 0;
      }
          
        var tbody = d3.select("tbody");
        tbody.html("");
        //var targetCity = targetCity.filter(item => item.City === inputValue1);
        var updateShame = selectedCity.filter(item => item["Total Foodborne Illness Risk Violations"] >=5)
        //updateShame = updateShame.sort(fnShame);
        updateShame = updateShame.slice(0,6)
        console.log("shame list")
        console.log(updateShame)
        updateShame.forEach((offender) => {
          var row = tbody.append("tr");
          var cell = row.append("td");
          cell.text(offender["Program Identifier"]);
        });
        console.log(updateShame) 

            
      // Builds user driven bar chart
      var trace = {
        x: foodinCity,
        marker: {
          color: 'crimson',
        },
        type: "histogram",
      };
      var data = [trace];
      var layout = {
        //title: "Number of Establishments by Violation Count (optionChanged)",
        xaxis: { title: "Number of Foodborne Violations"},
        yaxis: { title: "Number of Establishments"},
        height: 245,
        width: 480,
        bargap: 0.2,
        margin: {
          l: 75,
          r: 5,
          b: 40,
          t: 10,
          pad: 8,
        }
      };
      Plotly.newPlot("bar", data, layout);
      // End of user driven bar chart

      /// Start of user selected Pie Chart build
      var data = [{
        title: "Violations by Establishment Type",
        values: foodinCity,
        labels: typeinCity,
        type: 'pie'
      }];
      var layout = {
        height: 245,
        width: 420,
        margin: {
          l: 35,
          r: 5,
          b: 40,
          t: 10,
          pad: 8,
        }
      };
  
    Plotly.newPlot('myDiv', data, layout);
    /// End of user driven pie chart build
 

  // User driven mapping process starts here
  console.log("Here is smaller city list going to mapping")
  console.log(selectedCity)
  
  // Here is the user driven marker call
  targetedMarkers = createMarkersII(selectedCity)
  // console.log("targeted markers here")
  // console.log(targetedMarkers)

  d3.select("#map")
      .remove()
      .enter()

  d3.select("#map-container")
      .append("div")
      .attr("id", "map")
    
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": dark
  };

  var overlayMaps = {
    "Facilities": targetedMarkers
  };

  var map = L.map("map", {
    center: [39.678, -104.826],
    zoom: 10,
    layers: [lightmap, targetedMarkers]
  });

  var [panLat] = selectedCity.map(data => data["GIS Latitude"])
  var [panLng] = selectedCity.map(data => data["GIS Longitude"])
  map.panTo(new L.LatLng(panLat-.20, panLng));

  //map.invalidateSize();

  L.control.layers(baseMaps,overlayMaps)
  .addTo(map);

  });

}

function createMarkersII(secondlap) {
  console.log("Fn that creates user driven markers started")
  var establishments = secondlap[0]["Program Identifier"];
  var targetedMarkers = [];

  // Loop through the user driven establishments array
  for (var index = 0; index < secondlap.length; index++) {
    var targetRestaurants = secondlap[index];

  // For each facility, create a marker and bind a popup with the establishment name
    var targetedMarker = L.marker([targetRestaurants["GIS Latitude"], targetRestaurants["GIS Longitude"]])
      .bindPopup("<h3>" + targetRestaurants["Program Identifier"] + "<h3><h3>Address: " + targetRestaurants["Site Address"] + "</h3>");

  // Add the marker to the bikeMarkers array
    targetedMarkers.push(targetedMarker);
  }
  // return (L.layerGroup(targetedMarkers));
  console.log("Here is what fn produced ...")
  console.log(targetedMarkers)
  return L.layerGroup(targetedMarkers)
} 
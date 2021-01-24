/// Map stuff
 

  d3.csv("./static/js/data.csv").then(function(diningData) {
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
  //var x = [0, 1,2,3,4,5,6,7,8,9,9,9,9,9]
  //var y = [60,50,40,30,30,20,10,5,3,12]
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
    title: "The Number of Establishments by Violation Count (Starter Load)",
    xaxis: { title: "Number of Violations" },
    // yaxis: { title: "OTU"}
  };

  Plotly.newPlot("bar", data, layout);
  // End of starter bar chart stuff


  });


//var button = d3.select("#selDataset");
var form = d3.select("form");
form.on("submit", optionChanged);

function optionChanged() {
    
  d3.csv("./static/js/data.csv").then(function(targetData) {
      
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
         console.log(inputValue2);


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
        //return targetCity = targetCity.filter(item => item.City === inputValue1)
        //   }
        //   else var targetCity = targetCity.filter(item => item.City === inputValue1)
      }
  
        var selectedCity = targetCity.filter(fnFilter)
        console.log("should be smaller dataset with just one city")
        console.log(selectedCity)
        
        var foodinCity = selectedCity.map(data => data.TotalFoodborneViolations)
        console.log("array for graphing violations")
        console.log(foodinCity)


      // Stuff that was working ... targetStations stuff narrowed to users selection
      // function fnCity(targetCity) {
      //   //d3.event.preventDefault();
      //   var inputElement1 = d3.select("#selDataset1");
      //   var inputValue1 = inputElement1.property("value");
      //   //console.log('City ... Input Values')
      //   console.log(inputValue1);
      //   return targetCity.City === inputValue1;
      // }

      // var selectedCity = targetCity.filter(fnCity)
      // console.log("should be smaller dataset with just one city")
      // console.log(selectedCity)
      
      // var foodinCity = selectedCity.map(data => data.TotalFoodborneViolations)
      // console.log("array for graphing violations")
      // console.log(foodinCity)

      // end stuff that was working

      // FN to narrow on premise type
      // function fnPremise(selectedCity) {
      //   //d3.event.preventDefault();
      //   var inputElement2 = d3.select("#selDataset2");
      //   var inputValue2 = inputElement2.property("value");
      //   console.log('Confirmation that fnPremise is active')
      //   console.log(inputValue2);
      //   return premiseinCity.Description === inputValue2;
      // }

      // var premiseinCity = selectedCity.filter(fnPremise);
      // console.log("Premise in City dataset")
      // console.log(premiseinCity)

      
      // var axisy = sampleSelected.map(samples => samples.otu_ids.slice(0,10).reverse());
      // var onesampleSelected = sampleSelected[0]
      // var yyy = onesampleSelected.otu_ids.slice(0,10)
      // var otuforY = yyy.map(item => `OTU ${item}`).reverse()
      // var bubbleX = sampleSelected.map(samples => samples.otu_ids);
            
      // Targeted car chart stuff
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
        // yaxis: { title: "OTU"}
      };

      Plotly.newPlot("bar", data, layout);
      // End of targeted bar chart stuff

  });

}
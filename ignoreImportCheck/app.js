// Retrieve data from the CSV file as a basic starting point
d3.csv("./data.csv").then(function(diningData) {
  console.log(diningData);
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
});

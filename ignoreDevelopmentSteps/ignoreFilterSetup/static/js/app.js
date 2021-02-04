// from data.js
var startData = data;

// Console.log the initial data set from data.js
console.log(startData);

// Get a reference to the table body
var tbody = d3.select("tbody");

// Insert the starting (unfiltered) data into a table
data.forEach((startData) => {
    var row = tbody.append("tr");
    Object.entries(startData).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("form");

// Create event handlers for clicking the button or pressing the enter key
//button.on("click", runEnter);
form.on("submit",runEnter);

// Create the function to run for both events
function runEnter() {
    // Clear earlier rows of data
    // tbody.html("");

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
    var inputElement2 = d3.select("#city");
    var inputElement3 = d3.select("#state");
    var inputElement4 = d3.select("#country");
    var inputElement5 = d3.select("#shape");
    
    // Show the inputElement in the console log for bug detection
    console.log(inputElement);
    console.log(inputElement2);
    console.log(inputElement3);
    console.log(inputElement4);
    console.log(inputElement5);

    // Get the value property of the input element
    var icountry = inputElement4.property("value");
    var istate = inputElement3.property("value");
    var icity = inputElement2.property("value");
    var idate = inputElement.property("value");
    var ishape = inputElement5.property("value");
    
    // Show the value in the console log for bug detection
    console.log(icountry);
    console.log(istate);
    console.log(icity);
    console.log(idate);    
    console.log(ishape);

     

  // Mon 12-28 nested filter
    if (icountry) { 
    // tbody.html("");
      if (icountry && istate) {
        // tbody.html("");
        if (icountry && istate && icity) {
          // tbody.html("");
          if (icountry && istate && icity && idate) {
            // tbody.html("");
            if (icountry && istate && icity && idate && ishape) {
              var filteredData = startData.filter(item => item.country === icountry && item.state === istate && item.city === icity && item.datetime === idate && item.shape === ishape)
              console.log('country first with all')
              console.log(filteredData);
              tbody.html("");
              filteredData.forEach((userinput) => {
                var row = tbody.append("tr");
                Object.entries(userinput).forEach(([key, value]) => {
                  var cell = row.append("td");
                  cell.text(value);
                });
              });
            }
              else var filteredData = startData.filter(item => item.country === icountry && item.state === istate && item.city === icity && item.datetime === idate)
              console.log('country first then state, city and date')
              console.log(filteredData);
              tbody.html("");
              filteredData.forEach((userinput) => {
                var row = tbody.append("tr");
                Object.entries(userinput).forEach(([key, value]) => {
                  var cell = row.append("td");
                  cell.text(value);
                });
               });
          }
            else var filteredData = startData.filter(item => item.country === icountry && item.state === istate && item.city === icity)
            console.log('country first then state, city')
            console.log(filteredData);
            tbody.html("");
            filteredData.forEach((userinput) => {
              var row = tbody.append("tr");
              Object.entries(userinput).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
               });
            });
        }
          else var filteredData = startData.filter(item => item.country === icountry && item.state === istate)
          console.log('country first then state')
          console.log(filteredData);
          tbody.html("");
          filteredData.forEach((userinput) => {
            var row = tbody.append("tr");
            Object.entries(userinput).forEach(([key, value]) => {
              var cell = row.append("td");
              cell.text(value);
            });
          });
      }  
        else var filteredData = startData.filter(item => item.country === icountry)
        console.log(filteredData);
        console.log('country only')
        tbody.html("");
        filteredData.forEach((userinput) => {
          var row = tbody.append("tr");
          Object.entries(userinput).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
          });
        });
    }   
  
//   // Mon 12-28 second filter brace
//     if (istate) {
//     // tbody.html("");
//       if (istate && icity) {
//         // tbody.html("");
//         if (istate && icity && idate) {
//           // tbody.html("");
//           if (istate && icity && idate && ishape) {
//             // tbody.html("");
//             if (istate && icity && idate && ishape && icountry) {
//               var filteredData = startData.filter(item => item.country === icountry && item.state === istate && item.city === icity && item.datetime === idate && item.shape === ishape)
//               console.log('state first with all')
//               console.log(filteredData);
//               tbody.html("");
//               filteredData.forEach((userinput) => {
//                 var row = tbody.append("tr");
//                 Object.entries(userinput).forEach(([key, value]) => {
//                   var cell = row.append("td");
//                   cell.text(value);
//                 });
//               });
//             }
//               else var filteredData = startData.filter(item => item.shape === ishape && item.state === istate && item.city === icity && item.datetime === idate)
//               console.log('state first then city, date and shape')
//               console.log(filteredData);
//               tbody.html("");
//               filteredData.forEach((userinput) => {
//                 var row = tbody.append("tr");
//                 Object.entries(userinput).forEach(([key, value]) => {
//                   var cell = row.append("td");
//                   cell.text(value);
//                 });
//               });
//           }
//             else var filteredData = startData.filter(item => item.datetime === idate && item.state === istate && item.city === icity)
//             console.log('state first, then city, then date')
//             console.log(filteredData);
//             tbody.html("");
//             filteredData.forEach((userinput) => {
//               var row = tbody.append("tr");
//               Object.entries(userinput).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//               });
//             });
//         }
//           else var filteredData = startData.filter(item => item.city === icity && item.state === istate)
//           console.log('state first then city')
//           console.log(filteredData);
//           tbody.html("");
//           filteredData.forEach((userinput) => {
//             var row = tbody.append("tr");
//             Object.entries(userinput).forEach(([key, value]) => {
//               var cell = row.append("td");
//               cell.text(value);
//             });
//           });
//       }
//         else var filteredData = startData.filter(item => item.state === istate)
//         console.log('state first and only')
//         console.log(filteredData);
//         tbody.html("");
//         filteredData.forEach((userinput) => {
//           var row = tbody.append("tr");
//           Object.entries(userinput).forEach(([key, value]) => {
//             var cell = row.append("td");
//             cell.text(value);
//           });
//         });  
//     }
// // End of Mon second brace


// // Mon 12-28 third filter brace
//   if (icity) {
//   // tbody.html("");
//     if (icity && idate) {
//       // tbody.html("");
//       if (icity && idate && ishape) {
//         // tbody.html("");
//         if (icity && idate && ishape && icountry) {
//           // tbody.html("");
//           if (icity && idate && ishape && icountry && istate) {
//             var filteredData = startData.filter(item => item.country === icountry && item.state === istate && item.city === icity && item.datetime === idate && item.shape === ishape)
//             console.log('city first with all')
//             console.log(filteredData);
//             tbody.html("");
//             filteredData.forEach((userinput) => {
//               var row = tbody.append("tr");
//               Object.entries(userinput).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//               });
//             });
//           }
//             else var filteredData = startData.filter(item => item.shape === ishape && item.country === icountry && item.city === icity && item.datetime === idate)
//             console.log('city first then date, shape, country')
//             console.log(filteredData);
//             tbody.html("");
//             filteredData.forEach((userinput) => {
//               var row = tbody.append("tr");
//               Object.entries(userinput).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//               });
//             });
//         }
//           else var filteredData = startData.filter(item => item.datetime === idate && item.shape === ishape && item.city === icity)
//           console.log('city first then date, shape')
//           console.log(filteredData);
//           tbody.html("");
//           filteredData.forEach((userinput) => {
//             var row = tbody.append("tr");
//             Object.entries(userinput).forEach(([key, value]) => {
//               var cell = row.append("td");
//               cell.text(value);
//             });
//           });
//       }
//         else var filteredData = startData.filter(item => item.city === icity && item.datetime === idate)
//         console.log('city first then date')
//         console.log(filteredData);
//         tbody.html("");
//         filteredData.forEach((userinput) => {
//           var row = tbody.append("tr");
//           Object.entries(userinput).forEach(([key, value]) => {
//             var cell = row.append("td");
//             cell.text(value);
//           });
//         });
//     }

//       else var filteredData = startData.filter(item => item.city === icity)
//       console.log('city first and only')
//       console.log(filteredData);
//       tbody.html("");
//       filteredData.forEach((userinput) => {
//         var row = tbody.append("tr");
//         Object.entries(userinput).forEach(([key, value]) => {
//           var cell = row.append("td");
//           cell.text(value);
//         });
//       });  
//   }
// // End of Mon third brace


// // Tue 12-29 fourth filter brace
// if (idate) {
//   // tbody.html("");
//     if (idate && ishape) {
//       // tbody.html("");
//       if (idate && ishape && icountry) {
//         // tbody.html("");
//         if (idate && ishape && icountry && istate) {
//           // tbody.html("");
//           if (idate && ishape && icountry && istate && icity) {
//             var filteredData = startData.filter(item => item.country === icountry && item.state === istate && item.city === icity && item.datetime === idate && item.shape === ishape)
//             console.log('date first with all')
//             console.log(filteredData);
//             tbody.html("");
//             filteredData.forEach((userinput) => {
//               var row = tbody.append("tr");
//               Object.entries(userinput).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//               });
//             });
//           }
//             else var filteredData = startData.filter(item => item.shape === ishape && item.country === icountry && item.datetime === idate && item.state === istate)
//             console.log('date first then shape, country, state')
//             console.log(filteredData);
//             tbody.html("");
//             filteredData.forEach((userinput) => {
//               var row = tbody.append("tr");
//               Object.entries(userinput).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//               });
//             });
//         }
//           else var filteredData = startData.filter(item => item.datetime === idate && item.shape === ishape && item.country === icountry)
//           console.log('date first then shape, country')
//           console.log(filteredData);
//           tbody.html("");
//           filteredData.forEach((userinput) => {
//             var row = tbody.append("tr");
//             Object.entries(userinput).forEach(([key, value]) => {
//               var cell = row.append("td");
//               cell.text(value);
//             });
//           });
//       }
//         else var filteredData = startData.filter(item => item.datetime === idate && item.shape === ishape)
//         console.log('date first then shape')
//         console.log(filteredData);
//         tbody.html("");
//         filteredData.forEach((userinput) => {
//           var row = tbody.append("tr");
//           Object.entries(userinput).forEach(([key, value]) => {
//             var cell = row.append("td");
//             cell.text(value);
//           });
//         });
//     }

//       else var filteredData = startData.filter(item => item.datetime === idate)
//       console.log('date first and only')
//       console.log(filteredData);
//       tbody.html("");
//       filteredData.forEach((userinput) => {
//         var row = tbody.append("tr");
//         Object.entries(userinput).forEach(([key, value]) => {
//           var cell = row.append("td");
//           cell.text(value);
//         });
//       });  
//   }
// // End of Tue fourth brace


// // Tue 12-29 fifth filter brace
// if (ishape) {
//   // tbody.html("");
//     if (ishape && icountry) {
//       // tbody.html("");
//       if (ishape && icountry && istate) {
//         // tbody.html("");
//         if (ishape && icountry && istate && icity) {
//           // tbody.html("");
//           if (ishape && icountry && istate && icity && idate) {
//             var filteredData = startData.filter(item => item.country === icountry && item.state === istate && item.city === icity && item.datetime === idate && item.shape === ishape)
//             console.log('shape first with all')
//             console.log(filteredData);
//             tbody.html("");
//             filteredData.forEach((userinput) => {
//               var row = tbody.append("tr");
//               Object.entries(userinput).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//               });
//             });
//           }
//             else var filteredData = startData.filter(item => item.shape === ishape && item.country === icountry && item.state === istate && item.city === icity)
//             console.log('shape first then country, state, city')
//             console.log(filteredData);
//             tbody.html("");
//             filteredData.forEach((userinput) => {
//               var row = tbody.append("tr");
//               Object.entries(userinput).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//               });
//             });
//         }
//           else var filteredData = startData.filter(item => item.shape === ishape && item.country === icountry && item.state === istate)
//           console.log('shape first then country, state')
//           console.log(filteredData);
//           tbody.html("");
//           filteredData.forEach((userinput) => {
//             var row = tbody.append("tr");
//             Object.entries(userinput).forEach(([key, value]) => {
//               var cell = row.append("td");
//               cell.text(value);
//             });
//           });
//       }
//         else var filteredData = startData.filter(item => item.shape === ishape && item.country === icountry)
//         console.log('shape first then country')
//         console.log(filteredData);
//         tbody.html("");
//         filteredData.forEach((userinput) => {
//           var row = tbody.append("tr");
//           Object.entries(userinput).forEach(([key, value]) => {
//             var cell = row.append("td");
//             cell.text(value);
//           });
//         });
//     }

//       else var filteredData = startData.filter(item => item.shape === ishape)
//       console.log('shape first and only')
//       console.log(filteredData);
//       tbody.html("");
//       filteredData.forEach((userinput) => {
//         var row = tbody.append("tr");
//         Object.entries(userinput).forEach(([key, value]) => {
//           var cell = row.append("td");
//           cell.text(value);
//         });
//       });  
//   }
// // End of Tue fifth brace


}
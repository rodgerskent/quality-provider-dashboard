Quality Dining Dashboard

Overview
This project integrates JavaScript, HTML, CSS, Plotly and Mapbox to build an interactive and comprehensive quality dashboard for front range restaurant goes. The restaurant inspection data is retrieved from data.colorado.gov. Specifically, the data is from data.colorado.gov/Health/Restaurant-Inspections-in-Tri-County-Colorado/869n-zj3f. Users can select the city they desire to focus on and summary level performance (violation) information is presented in a histogram and pie chart. A list of restaurants to avoid is created for each city and is branded as the “List of Shame”. Further, the user may select a restaurant and see the list of detailed violations. Locations are mapped so that the user can retrieve location and address information for desirable destinations. The map offers both a light and dark map option. 

Approach & Methodology
The project is currently presented with a static January 2020 Tri-County Inspection Result file. It can easily be aligned with an API for regular updates with state API approval. The application is made of three key subroutines as follows:
1.	Initial load
a.	Retrieves latest data - Targets the city of Aurora as a starting point 
b.	Maps each location
c.	Presents Food Violation data in a summary histogram
d.	Presents Food Violation data in a Pie Chart …
i.	… by establishment type (restaurant, grocery, institution)
e.	Presents a list of restaurants to avoid

2.	Target City Update – Functions as the initial load but targets the user selected city

3.	Detail Violations – presents the detail list of violations in place of the restaurants to avoid.

Key Takeaways
Surprisingly, many dashboard testers were disappointed to find a local favorite on the “List of Shame”. My personal set back was with Golden Shanghai, a family favorite.

Repository Summary & Deliverables Locator
The project repository is located at: https://github.com/rodgerskent/qualityDining-dashboard
The HTML dashboard is available at: https://rodgerskent.github.io/qualityDining-dashboard/

Support
The course TA Joe Comeaux and the course Tutor Jaired Jawed contributed greatly to the success of this effort. 

Contributing
This project was complete on an individual basis

Project status
Project is complete

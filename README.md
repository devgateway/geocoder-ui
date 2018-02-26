
Open Aid Geocoder
============= 

Open Aid Geocoder helps users to assign precise geospatial data on the locations of development projects. 
The tool is composed by two main component a pure Javascript React Based UI, that can be plugged into an existing system, and an API that together with the UI can make Open Aid Geocoder work as an standalone application.
The geocoder and auto geocoder can run together connected to the same database  to enable manual geocode to send aid project to the autogecode job queue and be able to automatically geocode the imported activities.


Open Aid Geocoder Workflow
Users import a valid IATI formatted XML using the import interface.
Activities gets inserted into activities table and locations of imported activities gets stored into the database.
User picks a project from activities lists page.
System will show the map interface showing current project location if exists.
System will load country boundaries layer base on activity’s recipient country.
User searches for location using the geonames search component.
System shows returned locations on the map.
Users click on one of the locations.
The system show a pre populated form containing the following information:
Name of the Location from Geonames, the system also try to get names on the available system languages from the alternate name list returned by geonames.
First Administrative Division name which is default obtained from the current boundary layer if active. If country boundary layer is not active or the location falls outside of the layer first admin name is obtained from geonames.
Second Administrative Division name which is default obtained from the current boundary layer if active. If country boundary layer is not active or the location falls outside of the layer second admin name is obtained from geonames.
Identifier from geonames.
Feature Code from geonames.
Feature Designation from geonames.
Users should enter the following fields:
Location Class from the list box.
Geographically Exactness from the list box.
Location Reach from the list box.
Activity Description this field can be entered in all available system languages. 
Description this field can be entered in all available system languages.
Users save the location.
Users save project changes. 
If User has selected the option to auto geocode activities during the import process , a record per activity gets inserted into the QUEUE table.
Autocode will run the auto geocode as service workflow triggered by a queue type ACTIVITY_QUEUE please check workflows section of Auto Geocode documentation.	
User verifies  auto geocoded locations on the map.

Software Requirements.
Node =>v4.7.2
NPM=>v3.5.2

Compiling 
	$ git clone https://github.com/devgateway/geocoder-ui.git
	$ cd geocoder-ui
	$ npm install
  $ npm run build

Compiled js and other web files will be located under dist folder.


Open Aid Geocoder
=============


Open Aid Geocoder helps users to assign precise geospatial data on the locations of development projects.

The tool is composed by two main component a pure Javascript React Based UI, that **can be plugged into an existing system**.
And an API https://github.com/devgateway/geocoder-api which gives to the Open Aid Geocoder the availability of running as an
standalone wbe application.

Open Aid Geocoder can also be integrated with AutoGeocoder. This integration enables Open Aid Geocoder to send aid activities to 
autogecoder job queue. please look at https://github.com/devgateway/geocoder-ie 


### Software Requirements.

* Node =>v4.7.2
* NPM=>v3.5.2

### Compiling
	$ git clone https://github.com/devgateway/geocoder-ui.git
	$ cd geocoder-ui
	$ npm install
	$ npm run build
Compiled js and other web files will be located under dist folder.



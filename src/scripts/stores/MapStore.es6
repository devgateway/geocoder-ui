import {createStore} from 'reflux';

import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import {StoreMixins} from '../mixins/StoreMixins.es6';

import ProjectStore from './ProjectStore.es6';
import CountryGeo from './CountryShapeStore.es6';
import LocationsGeoJson from './LocationsGeo.es6';
import ProjectGeoJsonStore from './ProjectGeoJsonStore.es6';
import Reflux from "reflux";

/*This store should be renamed to geocoding and should actually manage the state of teh coding data  whic*/
const MapStore = createStore({
  initialData: {
    map: {
      center: [0.0, 0.0],
      zoom: 3,
      boxZoom: true,
      zoomControl: false
    },
    layers: {
      countries: [],
      locations: null,
      geocoding: null
    },
    popup: {
      mode: 'info',
      data: {}
    },
    project: null,
    activeLocation: null,
    activeDataentry: null,
    geocoding: null,
    clickedLocationPosition: null
  },

  mixins: [StoreMixins],

  init() {
    // TODO - use directly singleton when we switch to Reflux es6
    this.listenTo(Reflux.initStore(ProjectStore), this.onProjectUpdate);
    this.listenTo(ProjectGeoJsonStore, this.updateGeocodingLayer);
    this.listenTo(LocationsGeoJson, this.updateGazetteerLayer);

    this.listenTo(CountryGeo, this.updateCountry);
    this.listenTo(Actions.get(Constants.ACTION_POPUP_INFO), 'updatePopupInfo');
    this.listenTo(Actions.get(Constants.ACTION_OPEN_DATAENTRY_POPUP), 'closeInfoWindow');
    this.listenTo(Actions.get(Constants.ACTION_SET_ACTIVE_LOCATION), 'setActiveLocation');
    this.listenTo(Actions.get(Constants.ACTION_CLEAN_MAP_STORE), 'cleanStore');
  },

  // TODO - link MapView with ProejctStore if we really need the project in the MapView
  onProjectUpdate(projectStore) {
    //debugger;
    //const newState = Object.assign({}, this.get());
    //newState.project = projectStore.project;
    //this.setData(newState);
  },

  cleanStore() {
    this.setData(this.initialData);
  },

  getInitialState() {
    return this.get();
  },

  setActiveLocation(params) {
    const {locationFeature, isCoded, activeDataentry} = params;
    console.log(locationFeature);
    var newState = Object.assign({}, this.get());
    let activeLocation;
    if (isCoded) {
      var lf = Object.assign({}, locationFeature);
      Object.assign(lf, {'lat': lf.x});
      Object.assign(lf, {'lng': lf.y});
      activeLocation = lf;
    } else {
      activeLocation = locationFeature;
    }
    if (activeDataentry) {
      Object.assign(newState, {'activeDataentry': activeLocation});
    } else {
      Object.assign(newState, {'activeLocation': activeLocation});
    }
    this.setData(newState);
  },

  updateCountry(data) {
    var newState = Object.assign({}, this.get())
    newState.layers.countries = data.countries;
    this.setData(newState);
  },

  closeInfoWindow(params) {
    this.setData(Object.assign({}, this.get(), {
      popup: {
        'open': false
      }
    }));
  },

  updateGazetteerLayer(data) {
    var newState = Object.assign({}, this.get())
    newState.layers.locations = data;

    Object.assign(newState, {
      popup: {
        'open': false
      }
    });

    this.setData(newState);
  },


  updateGeocodingLayer(data) {
    debugger;
    var newState = Object.assign({}, this.get())
    newState.layers.geocoding = data;

    Object.assign(newState, {
      popup: {
        'open': false
      }
    });

    this.setData(newState);
  },

  updatePopupInfo(properties) {

    const {countryFeature, locationFeature, position, showDataEntry} = properties;
    const {ID_0, ID_1, GAUL01, ID_2, GAUL02, NAME_0, Country, NAME_1, ADM1, NAME_2, ADM2} = (countryFeature) ? countryFeature.properties : {}; //TODO: normalize field extraction
    const {
      fclName, adminCode1, adminCode2, adminId1, adminId2, adminName1, adminName2, adminName3, fcode, fcodeName, geonameId, lat, lng, name, toponymName, countryId, countryName, activityDescription
    } = locationFeature.properties;
    const params = {
      ID_0: (ID_0 || GAUL02),
      ID_1: (ID_1 || GAUL01),
      ID_2: (ID_2 || GAUL02),
      NAME_0: (NAME_0 || Country),
      NAME_1: (NAME_1 || ADM1),
      NAME_2: (NAME_2 || ADM2),
      ...locationFeature.properties
    };

    var geocoding = locationFeature.properties;
    this.addAdminCodes(geocoding, params);


    /*creates info window parameters */
    if (showDataEntry) {
      Actions.invoke(Constants.ACTION_OPEN_DATAENTRY_POPUP, geocoding);
    } else {
      this.setData(Object.assign({}, this.get(), {
        popup: {
          'open': true,
          'position': position,
          'location': geocoding
        }
      }));
    }
  },

  makeGeocodingObject(params) {
    let model = {
      'name': params.name,
      'id': params.geonameId,
      'activityDescription': params.activityDescription || '',
      'geometry': {
        'type': 'Point',
        'coordinates': [params.lng, params.lat]
      },

      'toponymName': params.toponymName,
      'featureDesignation': {
        code: params.fcode,
        name: params.fcodeName
      },
      'type': params.type || 'location',
      'status': params.status || 'EXISTING',
      'locationClass': params.locationClass || null, //{code:''m,name:''}
      'exactness': params.exactness || null, // {{'code': '1', 'name': 'Exact'}

    }
    return model;
  },

  addAdminCodes(model, params) {

    var adminCodes = {
      geonames: {
        'country': {
          code: params.countryId,
          name: params.countryName
        },
        'admin1': {
          code: params.adminId1,
          name: params.adminName1
        },
        'admin2': {
          code: params.adminId2,
          name: params.adminName2
        }
      }
    }

    if (params.ID_0 && params.ID_1 && params.ID_2) {
      Object.assign(adminCodes, {
        shape: {
          'country': {
            code: params.ID_0,
            name: params.NAME_0
          },
          'admin1': {
            code: params.ID_1,
            name: params.NAME_1
          },
          'admin2': {
            code: params.ID_2,
            name: params.NAME_2
          }
        }
      })
    }
    if (model.rollbackData) {
      Object.assign(adminCodes, {
        saved: {
          'country': model.rollbackData.country,
          'admin1': model.rollbackData.admin1,
          'admin2': model.rollbackData.admin2
        }
      })
    }
    Object.assign(model, {
      adminCodes
    })
  },


});

export default MapStore;

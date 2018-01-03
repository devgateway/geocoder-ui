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
    //this.listenTo(Reflux.initStore(ProjectStore), this.onProjectUpdate);
    this.listenTo(ProjectGeoJsonStore, this.updateGeocodingLayer);
    this.listenTo(Reflux.initStore(LocationsGeoJson), this.updateGazetteerLayer);

    this.listenTo(CountryGeo, this.updateCountry);
    //this.listenTo(Actions.get(Constants.ACTION_POPUP_INFO), 'updatePopupInfo');
    this.listenTo(Actions.get(Constants.ACTION_OPEN_DATAENTRY_POPUP), 'closeInfoWindow');
    this.listenTo(Actions.get(Constants.ACTION_SET_ACTIVE_LOCATION), 'setActiveLocation');
    this.listenTo(Actions.get(Constants.ACTION_CLEAN_MAP_STORE), 'cleanStore');
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

    var newState = Object.assign({}, this.get())
    newState.layers.geocoding = data;

    Object.assign(newState, {
      popup: {
        'open': false
      }
    });

    this.setData(newState);
  }


});

export default MapStore;

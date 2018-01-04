import {createStore} from 'reflux';
import Reflux from "reflux";
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import {StoreMixins} from '../mixins/StoreMixins.es6';

import CountryGeo from './CountryShapeStore.es6';
import LocationsGeoJson from './LocationsGeo.es6';
import ProjectGeoJsonStore from './ProjectGeoJsonStore.es6';

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
    project: null,
    geocoding: null,
    clickedLocationPosition: null
  },

  mixins: [StoreMixins],

  init() {
    // TODO - use directly singleton when we switch to Reflux es6
    //this.listenTo(Reflux.initStore(ProjectStore), this.onProjectUpdate);

    this.listenTo(Reflux.initStore(ProjectGeoJsonStore), this.updateGeocodingLayer);
    this.listenTo(Reflux.initStore(LocationsGeoJson), this.updateGazetteerLayer);

    this.listenTo(CountryGeo, this.updateCountry);
    this.listenTo(Actions.get(Constants.ACTION_OPEN_DATAENTRY_POPUP), 'closeInfoWindow');
    this.listenTo(Actions.get(Constants.ACTION_CLEAN_MAP_STORE), 'cleanStore');
  },

  cleanStore() {
    this.setData(this.initialData);
  },

  getInitialState() {
    return this.get();
  },

  updateCountry(data) {
    let newState = Object.assign({}, this.get());
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
    let newState = Object.assign({}, this.get());
    newState.layers.locations = data;

    Object.assign(newState, {
      popup: {
        'open': false
      }
    });

    this.setData(newState);
  },


  updateGeocodingLayer(data) {
    let newState = Object.assign({}, this.get());
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

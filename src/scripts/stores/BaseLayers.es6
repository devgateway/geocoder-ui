import L from 'leaflet';
import * as Providers from 'leaflet-providers';
import {createStore} from 'reflux';
import Constants from '../constants/Contants.es6';
import {StoreMixins} from '../mixins/StoreMixins.es6';
import * as Actions from '../actions/Actions.es6';
// OSM tile usage policy: https://operations.osmfoundation.org/policies/tiles/
// use the single https host (no {s} subdomains) and keep attribution visible.
var defaultLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const initialData = {
  'OpenStreetMap': defaultLayer,
  'OpenStreetMap German Style': L.tileLayer.provider('OpenStreetMap.DE'),
  'OpenStreetMap H.O.T.': L.tileLayer.provider('OpenStreetMap.HOT'),
  'Esri WorldStreetMap': L.tileLayer.provider('Esri.WorldStreetMap'),
  'Esri WorldTopoMap': L.tileLayer.provider('Esri.WorldTopoMap'),
  'Esri WorldImagery': L.tileLayer.provider('Esri.WorldImagery'),
  'Esri WorldTerrain': L.tileLayer.provider('Esri.WorldTerrain'),
  'Esri WorldShadedRelief': L.tileLayer.provider('Esri.WorldShadedRelief'),
  'Esri WorldPhysical': L.tileLayer.provider('Esri.WorldPhysical'),
  'Esri OceanBasemap': L.tileLayer.provider('Esri.OceanBasemap'),
  'Esri NatGeoWorldMap': L.tileLayer.provider('Esri.NatGeoWorldMap'),
  'Esri WorldGrayCanvas': L.tileLayer.provider('Esri.WorldGrayCanvas'),
};


const BaseLayers = createStore({
  initialData: initialData,
  mixins: [StoreMixins],


  init() {
    this.listenTo(Actions.get(Constants.ACTION_CLEAN_MAP_STORE), 'cleanStore');
  },

  cleanStore() {
    console.log('cleaning BaseLayers');
    this.setData(this.initialData);
  }
});

export default BaseLayers;

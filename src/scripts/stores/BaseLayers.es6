import L from 'leaflet';
import * as Providers from 'leaflet-providers';
import {createStore} from 'reflux';
import Constants from '../constants/Contants.es6';
import {StoreMixins} from '../mixins/StoreMixins.es6';
import * as Actions from '../actions/Actions.es6';
var defaultLayer = L.tileLayer.provider('OpenStreetMap.Mapnik');

const initialData = {
  'OpenStreetMap': defaultLayer,
  'OpenStreetMap German Style': L.tileLayer.provider('OpenStreetMap.DE'),
  'OpenStreetMap Black and White': L.tileLayer.provider('OpenStreetMap.BlackAndWhite'),
  'OpenStreetMap H.O.T.': L.tileLayer.provider('OpenStreetMap.HOT'),
  'Hydda Full': L.tileLayer.provider('Hydda.Full'),
  'Stamen Toner': L.tileLayer.provider('Stamen.Toner'),
  'Stamen Terrain': L.tileLayer.provider('Stamen.Terrain'),
  'Stamen Watercolor': L.tileLayer.provider('Stamen.Watercolor'),
  'Esri WorldStreetMap': L.tileLayer.provider('Esri.WorldStreetMap'),
  'Esri DeLorme': L.tileLayer.provider('Esri.DeLorme'),
  'Esri WorldTopoMap': L.tileLayer.provider('Esri.WorldTopoMap'),
  'Esri WorldImagery': L.tileLayer.provider('Esri.WorldImagery'),
  'Esri WorldTerrain': L.tileLayer.provider('Esri.WorldTerrain'),
  'Esri WorldShadedRelief': L.tileLayer.provider('Esri.WorldShadedRelief'),
  'Esri WorldPhysical': L.tileLayer.provider('Esri.WorldPhysical'),
  'Esri OceanBasemap': L.tileLayer.provider('Esri.OceanBasemap'),
  'Esri NatGeoWorldMap': L.tileLayer.provider('Esri.NatGeoWorldMap'),
  'Esri WorldGrayCanvas': L.tileLayer.provider('Esri.WorldGrayCanvas'),



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

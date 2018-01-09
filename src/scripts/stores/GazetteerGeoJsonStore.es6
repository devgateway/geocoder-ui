import Reflux from "reflux";
import Constants from '../constants/Contants.es6';
import GazetteerStore from './GazetteerStore.es6';
import {GeoJsonBuilder} from '../util/GeojsonBuilder.es6';
import * as Actions from '../actions/Actions.es6';

const initialState = {
  autoZoom: true,
  data: {}
};

class GazetteerGeoJsonStore extends Reflux.Store {
  constructor() {
    super();
    
    this.state = initialState;
    this.listenTo(Reflux.initStore(GazetteerStore), this.process);
    this.listenTo(Actions.get(Constants.ACTION_SAVE), this.removeSavedLocation)
  }
  
  process(data) {
    if (data.locations && data.locations.total > 0) {
      let featureCollection =
        new GeoJsonBuilder({
          type: 'Point',
          coordinates: function () {
            return [this.lng, this.lat]
          }
        }).build(data.locations.records);
      
      let newData = Object.assign(this.state, {data: featureCollection, autoZoom: true});
      this.setState(newData);
    }
  }
  
  removeSavedLocation(location) {
    /* TODO - should we remove this?
    let newState = Object.assign({}, this.state)
    let newGeoJson = newState.data;
    let filteredFeatures = newGeoJson.features.filter((it) => {

      if (it.properties.geonameId != location.id) {
        return it
      }
    })
    newGeoJson = Object.assign(newGeoJson, {'features': filteredFeatures})
    newState = Object.assign(newState, {data: newGeoJson, autoZoom: false});
    this.setState(newState);
    */
  }
}

export default GazetteerGeoJsonStore;
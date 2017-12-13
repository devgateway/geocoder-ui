import Reflux from "reflux";
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import SingleProjectStore from './Project.es6';

const initialState = {
  fuzzy:    false,
  country:  false,
  text:     '',
  locations: {
    total: 0,
    records: [],
    types: []
  },
  loadingLocations: false,
  countryISO: null
};
class LocationsStore extends Reflux.Store {
  constructor() {
    super();
    this.state = initialState;
    
    // this.listenTo(SingleProjectStore, this.updateCountryISO); TODO
    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATIONS), this.search);
    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATIONS).completed, this.done);
    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATIONS).failed, this.failed);
    this.listenTo(Actions.get(Constants.ACTION_FILTER_BY_TYPE), this.filter);
    this.listenTo(Actions.get(Constants.ACTION_CLEAN_MAP_STORE), this.cleanStore);
  }
  
  // initialData: initialData,
  // cachedData: null,
  
  search() {
    let newState = Object.assign({}, this.get());
    Object.assign(newState, {'loadingLocations': true});
    this.setState(newState);
  }
  
  updateCountryISO(project) {
    let newState = Object.assign({}, this.get());
    Object.assign(newState, {countryISO: project.country ? project.country.iso2 : null});
    this.setState(newState);
  }
  
  done(rawData) {
    
    let newState = Object.assign({}, this.get());
    if (rawData.totalResultsCount > 0) {
      let types = rawData.geonames.map((a) => {
        return {code: a.fcode, name: a.fcodeName}
      })
      let uniqueTypes = types.filter((value, index, self) => {
        let valuefound = self.find(function (e) {
          return e.code == value.code
        });
        return self.indexOf(valuefound) === index
      })
      let locations = new Map({
        total: rawData.totalResultsCount,
        records: this.inmutateResults(rawData.geonames),
        types: this.inmutateResults(uniqueTypes)
      });
      Object.assign(newState, {'locations': locations, 'loadingLocations': false});
      this.cachedData = locations;
    }
    else {
      Object.assign(newState, {'locations': initialData.locations, 'loadingLocations': false});
    }
    this.setState(newState);
  }
  
  inmutateResults(results) {
    return new List(results);
  }
  
  failed() {
    console.log('failed');
  }
  
  filter(type) {
    let newState = Object.assign({}, this.get());
    if (type != 'ALL') {
      let map = this.cachedData;
      let list = map.get('records')
      const filteredList = list.filter((function (e) {
        return e.fcode == type
      }));
      let locations = new Map({total: map.get('total'), records: filteredList, types: map.get('types')});
      Object.assign(newState, {'locations': locations});
    } else {
      Object.assign(newState, {'locations': this.cachedData});
    }
    this.setState(newState);
  }
  
}

export default LocationsStore;

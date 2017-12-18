import Reflux from "reflux";
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import ProjectStore from './ProjectStore.es6';

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
  countryISO: undefined
};
class LocationsStore extends Reflux.Store {
  constructor() {
    super();
    this.state = initialState;
    
    this.cachedData = undefined;
    
    this.listenTo(ProjectStore, this.updateCountryISO);
    this.listenTo(Actions.get(Constants.ACTION_GAZETTEER_SEARCHTYPE), this.toggleSearchType);
    this.listenTo(Actions.get(Constants.ACTION_GAZETTEER_UPDATETEXT), this.updateText);
    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATIONS), this.search);
    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATIONS).completed, this.completed);
    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATIONS).failed, this.failed);
    this.listenTo(Actions.get(Constants.ACTION_FILTER_BY_TYPE), this.filter);
    this.listenTo(Actions.get(Constants.ACTION_CLEAN_MAP_STORE), this.cleanStore);
  }
  
  updateText(text) {
    this.setState({
      text: text
    });
  }
  
  toggleSearchType(searchType) {
    console.log(searchType);
    this.setState({
      [searchType]: !this.state[searchType]
    });
  }
  
  search() {
    console.log('Loading Gazetteer...');
    
    this.setState({
      loadingLocations: true
    });
  }
  
  updateCountryISO(project) {
    const {countries} = project;
    let iso2;
    if (countries !== undefined && countries.length !== 0) {
      iso2 = countries[0].iso2;
    }
    
    this.setState({
      countryISO: iso2
    });
  }
  
  completed(rawData) {
    const newLocations = {...this.state.locations};
    
    if (rawData.totalResultsCount > 0) {
      let types = rawData.geonames.map((a) => {
        return {code: a.fcode, name: a.fcodeName}
      });
      let uniqueTypes = types.filter((value, index, self) => {
        let valuefound = self.find(function (e) {
          return e.code === value.code
        });
        return self.indexOf(valuefound) === index;
      });
      
      newLocations.total = rawData.totalResultsCount;
      newLocations.records = rawData.geonames;
      newLocations.types = uniqueTypes;
      
      this.cachedData = newLocations;
    }
    
    this.setState({
      locations: newLocations,
      loadingLocations: false
    });
  }
  
  failed() {
    console.log('failed');
  }
  
  filter(type) {
    let newState = Object.assign({}, this.get());
    if (type !== 'ALL') {
      let map = this.cachedData;
      let list = map.get('records');
      const filteredList = list.filter((function (e) {
        return e.fcode === type
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

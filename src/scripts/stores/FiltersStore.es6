import Reflux from "reflux";
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';

/**
 * Stored used to keep the filters options. For example it's used in {@link ProjectList} component.
 */
const initialState = {
  filterCountries:  [],
  filterYears:      []
};
class FiltersStore extends Reflux.Store {
  
  constructor() {
    super();
    this.state = initialState;
    
    this.listenTo(Actions.get(Constants.ACTION_FETCH_FILTERS), this.loading);
    this.listenTo(Actions.get(Constants.ACTION_FETCH_FILTERS).completed, this.completed);
    this.listenTo(Actions.get(Constants.ACTION_FETCH_FILTERS).failed, this.failed);
  }
  
  loading() {
    console.log('Loading all filters...')
  }
  
  completed(data) {
    this.setState({
      filterCountries:  data.countries,
      filterYears:      data.years
    });
  }
  
  failed(message) {
    console.error(`Error loading filters: ${message}`)
  }
}

export default FiltersStore;

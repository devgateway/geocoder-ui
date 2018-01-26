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

    this.listenTo(Actions.get(Constants.UPDATE_FILTER_SELECTION), this.updateFilter);
    this.listenTo(Actions.get(Constants.SELECT_ALL_FILTER), this.selectAllFilter);
    this.listenTo(Actions.get(Constants.SELECT_NONE_FILTER), this.selectNoneFilter);

    this.listenTo(Actions.get(Constants.ACTION_CLEAR_FILTERS), this.clearFilters);
  }

  loading() {
    console.log('Loading all filters...')
  }

  completed(data) {
    this.setState({
      filterCountries:  data.countries.map((country, index) => {
        return {
          index:    index,
          selected: false,
          ...country
        }
      }),
      filterYears:      data.years.map((year, index) => {
        return {
          name: year,
          selected: false,
          index:    index,
        }
      })
    });
  }

  failed(message) {
    console.error(`Error loading filters: ${message}`)
  }

  updateFilter(filter, index) {
    const newState = {...this.state};
    newState[filter][index].selected = !this.state[filter][index].selected;

    this.setState({...newState});
  }

  selectNoneFilter(state, filter) {
    const newState = {...this.state};

    state[filter] = this.state[filter].map(item => {
      const newItem = Object.assign({}, item);
      // update the new item
      newItem.selected = false;

      return newItem;
    });

    return state;
  }

  clearFilters() {
    let newState = {...this.state};

    newState = this.selectNoneFilter(newState, "filterCountries");
    newState = this.selectNoneFilter(newState, "filterYears");

    this.setState({...newState});
  }
}

export default FiltersStore;

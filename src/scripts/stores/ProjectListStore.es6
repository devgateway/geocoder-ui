import Reflux from "reflux";
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import FiltersStore from "./FiltersStore.es6";

/**
 * Stored used in {@link ProjectList} component.
 */
const initialState = {
  data: {},
  params: {
    lang: 'en',
    text: '',
    countries: [],
    years:     [],
    withNoLocation:       false,
    pendingVerification:  false,
    verifiedLocation:     false,
    page: 0
  }
};
class ProjectListStore extends Reflux.Store {
  
  constructor() {
    super();
    this.state = initialState;
    
    this.listenTo(Reflux.initStore(FiltersStore), this.updateFilterStore);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS), this.loading);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS).completed, this.completed);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS).failed, this.failed);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS_SET_PARAM), this.setParam);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS_SET_PAGE), this.setPage);
    this.listenTo(Actions.get(Constants.ACTION_CLEAR_FILTERS), this.clearFilters);
  }
  
  updateFilterStore(filterStore) {
    const newParams = {...this.state.params};
    
    // get only selected filters
    const countries = filterStore.filterCountries.filter(country => country.selected === true).map(country => country.iso2);
    const years = filterStore.filterYears.filter(year => year.selected === true).map(year => year.name);
    
    newParams.countries = countries;
    newParams.years = years;
    
    this.setState({params: newParams});
    Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.state.params);
  }
  
  loading() {
    console.log('Loading all projects...')
  }
  
  completed(data) {
    this.setState({
      data
    });
  }
  
  failed(message) {
    console.error(`Error loading projects: ${message}`)
  }
  
  setParam(paramName, paramValue) {
    const newParams = {...this.state.params};
    
    // first reset all the params if we filter by location status
    if (paramName === 'withNoLocation' || paramName === 'pendingVerification'
      || paramName === 'verifiedLocation' || paramName === 'allOptions') {
      newParams.withNoLocation = false;
      newParams.pendingVerification = false;
      newParams.verifiedLocation = false;
    }
    
    
    newParams[paramName] = paramValue;
    newParams.page = 0;   // also reset the page number when a filter parameter is changed
    
    this.setState({params: newParams});
    
    Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.state.params);
  }
  
  setPage(page) {
    const newParams = {...this.state.params};
    newParams.page = page - 1;    // the pagination is 1-indexed
    
    this.setState({params: newParams});
    
    Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.state.params);
  }
  
  clearFilters() {
    const newParams = {...this.state.params};
    
    newParams.withNoLocation = false;
    newParams.pendingVerification = false;
    newParams.verifiedLocation = false;
    
    this.setState({params: newParams});
  }
}

export default ProjectListStore;

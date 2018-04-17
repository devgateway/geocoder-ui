import Reflux from "reflux";
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import FiltersStore from "./FiltersStore.es6";
import FileSaver from "file-saver";

/**
 * Stored used in {@link ProjectList} component.
 */
const initialState = {
  loading:      false,
  downloading:  false,
  data: {},
  params: {
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
    
    // Init a timeout variable to be used to delay the search
    this.searchTimeout = undefined;
    
    this.listenTo(Reflux.initStore(FiltersStore), this.updateFilterStore);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS), this.loading);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS).completed, this.completed);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS).failed, this.failed);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS_SET_PARAM), this.setParam);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS_SET_PAGE), this.setPage);
    
    this.listenTo(Actions.get(Constants.ACTION_EXPORT_PROJECTS), this.download);
    this.listenTo(Actions.get(Constants.ACTION_EXPORT_PROJECTS).completed, this.downloadCompleted);
    this.listenTo(Actions.get(Constants.ACTION_EXPORT_PROJECTS).failed, this.failed);
    
    this.listenTo(Actions.get(Constants.ACTION_CLEAR_FILTERS), this.clearFilters);
    
    this.listenTo(Actions.get(Constants.ACTION_CLEAR_PROJECTLIST_STORE), this.clearStore);
  }
  
  clearStore() {
    clearInterval(this.intervalId);
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
  
  download() {
    console.log('Export projects...');
    
    this.setState({
      downloading: true
    });
  }
  
  downloadCompleted(data) {
    this.setState({
      downloading: false,
    });
    
    const blob = new Blob([data], {type: "text/xml"});
    FileSaver.saveAs(blob, "XML Export.xml");
  }
  
  loading() {
    console.log('Loading all projects...');
    
    // be sure that the interval is cleared before the request is completed
    clearInterval(this.intervalId);
    this.setState({
      loading: true
    });
  }
  
  completed(data) {
    this.setState({
      loading: false,
      data
    });
    
    // reset the interval and refresh again the project list in 60 seconds
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.state.params);
    }, 60000);
  }
  
  failed(message) {
    console.error(`Error loading projects: ${message}`);
    
    this.setState({
      loading:      false,
      downloading:  false
    });
  }
  
  setParam(paramName, paramValue, delaySearch) {
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
    
    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing if it has been less than <MILLISECONDS>.
    clearTimeout(this.searchTimeout);
    
    if (delaySearch === true) {
      // Make a new timeout set to go off in 1000ms
      this.searchTimeout = setTimeout(() => {
        Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.state.params);
      }, 1000);
    } else {
      Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.state.params);
    }
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
    newParams.countries = [];
    newParams.years = [];
    newParams.text = '';
    newParams.page = 0;   // also reset the page number when a filter parameter is changed
    
    this.setState({params: newParams});
    
    Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.state.params);
  }
}

export default ProjectListStore;

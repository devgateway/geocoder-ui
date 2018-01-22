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
    
    this.setState({
      loading: true
    });
  }
  
  completed(data) {
    this.setState({
      loading: false,
      data
    });
  }
  
  failed(message) {
    console.error(`Error loading projects: ${message}`);
    
    this.setState({
      loading: false
    });
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
    newParams.countries = [];
    newParams.years = [];
    newParams.text = '';
    newParams.page = 0;   // also reset the page number when a filter parameter is changed
    
    this.setState({params: newParams});
    
    Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.state.params);
  }
}

export default ProjectListStore;

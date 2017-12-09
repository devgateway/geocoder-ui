import {createStore} from 'reflux';
import Reflux from "reflux";
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';

/**
 * Stored used in {@link ProjectList} component.
 */
const initialState = {
  data: {},
  params: {
    lan: 'en',
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
    
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS), this.loading);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS).completed, this.completed);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS).failed, this.failed);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS_SET_PARAM), this.setParam);
    this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS_SET_PAGE), this.setPage);
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
}

export default ProjectListStore;

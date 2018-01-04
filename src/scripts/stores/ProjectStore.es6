import Reflux from "reflux";
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import _ from 'lodash';
import DataEntryStore from './DataEntryStore.es6'
const initialState = {
  project: {}
};


class ProjectStore extends Reflux.Store {
  constructor() {
    super();
    this.state = initialState;
    
    this.listenTo(Actions.get(Constants.ACTION_LOAD_SINGLE_PROJECT), this.loading);
    this.listenTo(Actions.get(Constants.ACTION_LOAD_SINGLE_PROJECT).completed, this.completed);
    this.listenTo(Actions.get(Constants.ACTION_LOAD_SINGLE_PROJECT).failed, this.failed);
    
    
    this.listenTo(Actions.get(Constants.ACTION_SUBMIT_GEOCODING), this.submitGeocoding);
    
    this.listenTo(Reflux.initStore(DataEntryStore), this.updateLocation);
    
    this.listenTo(Actions.get(Constants.ACTION_SAVE_PROJECT), this.save);
    this.listenTo(Actions.get(Constants.ACTION_SAVE_PROJECT).completed, this.saveSuccess);
    this.listenTo(Actions.get(Constants.ACTION_SAVE_PROJECT).failed, this.failed);
    this.listenTo(Actions.get(Constants.ACTION_CLEAN_MAP_STORE), this.cleanStore);
  }
  
  cleanStore() {
    this.setState(this.initialData);
  }
  
  loading() {
    console.log('Loading project...');
  }
  
  save() {
    console.log('Save project...');
  }
  
  completed(response) {
    let project = response.data;
    if (project.countries !== undefined && project.countries.length !== 0) {
      const firstCountry = project.countries[0];
      Actions.invoke(Constants.ACTION_LOAD_SHAPE, (firstCountry.iso3 || firstCountry.iso2 || firstCountry.iso));
    }
    project.locationsBackup = _.cloneDeep(project.locations); //add a copy of the locations for rollback purposes
    this.setState({project: project});
  }
  
  failed(message) {
    console.error(`Error loading project: ${message}`)
  }
  
  updateLocation(data){
    const {geocoding:{locationFeature},save}=data
    if (save){
      const {properties:{locationStatus,id},properties}=locationFeature
      let project=Object.assign({},this.state.project)
      
      let newLocations=project.locations.slice(0).map(loc=>{
        if (loc.id==id){
          return Object.assign({},properties)
        }else{
          return Object.assign({},loc)
        }
      })
      let newProject=Object.assign(project,{locations:newLocations})
      this.setState({project: newProject});
    }
  }
  
  
  submitGeocoding(geocoding) {
    
    let newpProject = {...this.state.project};
    let locations = newpProject.locations || [];
    
    let locNotDeleted = locations.filter(it => it.status !== 'DELETED');
    
    let locNoStatus = [];
    locNotDeleted.map((it) => {
      // remove unnecesary fields before submit
      locNoStatus.push(_.omit(it, ['status', 'adminSource', 'confirmDelete', 'adminCodes', 'rollbackData']));
    });
    
    newpProject.locations = locNoStatus;
    
    newpProject = _.omit(newpProject, 'locationsBackup');
    this.setState({project: newpProject});
    
    Actions.invoke(Constants.ACTION_SAVE_PROJECT, newpProject);
  }
  
  
  saveSuccess() {
    window.history.back();
    window.location.reload();
  }
}

export default ProjectStore;

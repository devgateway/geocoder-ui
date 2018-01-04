import Reflux from "reflux";
import ProjectStore from './ProjectStore.es6';
import {GeoJsonBuilder} from '../util/GeojsonBuilder.es6';

const initialState = {};
class ProjectGeoJsonStore extends Reflux.Store {
  
  constructor() {
    super();
    this.state = initialState;
    
    this.listenTo(Reflux.initStore(ProjectStore), this.process);
  }
  
  process(projectStore) {
    if (projectStore) {
      const project = projectStore.project;
      let newData;
      if (project.locations) {
        let featureCollection = new GeoJsonBuilder({ type: 'Point', coordinates: function () { return [this.x, this.y] } }).build(project.locations);
        featureCollection.features.forEach((record) => {
          
          let rollbackData = project.locationsBackup ? project.locationsBackup.find((it) => { return it.id == record.properties.id }) : null;
          Object.assign(record, {'propertiesBackup': JSON.parse(JSON.stringify(rollbackData))});//duplicates the values into same object for rollback purposes
        });
        newData = Object.assign(this.state, {data: featureCollection, autoZoom: false, date: new Date()});
      } else {
        newData = Object.assign(this.state, {data: null, autoZoom: false, date: new Date()});
      }
      this.setState(newData);
    }
  }
}

export default ProjectGeoJsonStore;

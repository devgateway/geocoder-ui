import ProjectStore from './ProjectStore.es6';
import { GeoJsonBuilder } from '../util/GeojsonBuilder.es6';
import Reflux from "reflux";
import _ from 'lodash'

const initialState = { data: undefined, autoZoom: false };
class ProjectGeoJsonStore extends Reflux.Store {
  constructor() {
    super();
    
    this.state = initialState;
    this.listenTo(Reflux.initStore(ProjectStore), this.process);
  }
  
  process(projectStore) {
    let newData;
    if (projectStore) {
      const project = projectStore.project;
      
      if (project.locations) {
        const featureCollection = new GeoJsonBuilder({
          "type": 'Point',
          "coordinates": function() {
            return [this.point.coordinates[0], this.point.coordinates[1]]
          }
        }).build(_.cloneDeep(project.locations));
        
        newData = { data: featureCollection, autoZoom: false, date: new Date() };
      } else {
        newData = { data: undefined, autoZoom: false };
      }
      this.setState(newData);
    }
  }
  
}

export default ProjectGeoJsonStore;

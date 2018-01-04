import ProjectStore from './ProjectStore.es6';
import { GeoJsonBuilder } from '../util/GeojsonBuilder.es6';
import Reflux from "reflux";
import _ from 'lodash'

const initialState = { data: null, autoZoom: false };

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
            return [this.x, this.y]
          }
        }).build(_.cloneDeep(project.locations));

        newData = { data: featureCollection, autoZoom: false, date: new Date() };

    } else {
        newData = _.cloneDeep(initialData)
    }
    this.setState(newData);
  }
}

}

export default ProjectGeoJsonStore;

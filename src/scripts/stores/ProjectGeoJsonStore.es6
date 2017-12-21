import {createStore} from 'reflux';
import {getAction} from '../actions/Actions.es6';
import {StoreMixins} from '../mixins/StoreMixins.es6';
import ProjectStore from './ProjectStore.es6';
import {GeoJsonBuilder} from '../util/GeojsonBuilder.es6';
import Reflux from "reflux";

const initialData = {'geojson': null};

const ProjectGeoJsonStore = createStore({
  
  initialData: initialData,
  mixins: [StoreMixins],
  
  init() {
    // TODO - use directly singleton when we switch to Reflux es6
    this.listenTo(Reflux.initStore(ProjectStore), this.process);
  },
  
  process(projectStore) {
    const project = projectStore.project;
    let newData;
    if (project.locations) {
      let featureCollection =
        new GeoJsonBuilder({
          type: 'Point',
          coordinates: function () {
            return [this.x, this.y]
          }
        }).build(project.locations);
      featureCollection.features.forEach((record) => {
        let rollbackData = project.locationsBackup ? project.locationsBackup.find((it) => {
          return it.id == record.properties.id
        }) : null;
        Object.assign(record.properties, {'rollbackData': rollbackData});//duplicates the values into same object for rollback purposes
      });
      newData = Object.assign(this.get(), {data: featureCollection, autoZoom: false, date: new Date()});
    } else {
      newData = Object.assign(this.get(), {data: null, autoZoom: false, date: new Date()});
    }
    
    this.setData(newData);
  }
  
});

export default ProjectGeoJsonStore;

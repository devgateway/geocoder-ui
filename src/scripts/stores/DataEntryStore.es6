import {createStore} from 'reflux';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import {StoreMixins} from '../mixins/StoreMixins.es6';
import Reflux from "reflux";

const initialState = {showPopup:false};



class DataEntryStore extends Reflux.Store {

  constructor() {

    super();

    this.state = initialState;

    this.listenTo(Actions.get(Constants.ACTION_OPEN_DATAENTRY_POPUP), this.openPopup);
    this.listenTo(Actions.get(Constants.ACTION_CLOSE_DATAENTRY_POPUP), this.closePopup);
    this.listenTo(Actions.get(Constants.ACTION_CHANGE_CODING_VALUE), this.valueChanged);
    this.listenTo(Actions.get(Constants.ACTION_PREPARE_SAVE_LOCATION), this.saveLocation);
    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID), this.loadingData);
    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID).completed, this.updateData);
    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID).failed, this.geonamesFailed);
    this.listenTo(Actions.get(Constants.ACTION_UPDATE_ADM_FROM_GEONAMES), this.loadingAdminData);
    this.listenTo(Actions.get(Constants.ACTION_UPDATE_ADM_FROM_GEONAMES).completed, this.updateAdminData);
    this.listenTo(Actions.get(Constants.ACTION_UPDATE_ADM_FROM_GEONAMES).failed, this.geonamesFailed);


  }

  closePopup() {

    let newState = Object.assign({}, this.state);
    Object.assign(newState, {'showPopup': false, 'error': null});
    this.setState(newState);
  }

  openPopup(data) {

    let newState = Object.assign({}, this.state);
    //let adminSource = location.adminSource || (location.type == 'geocoding' ? 'saved' : location.adminCodes.shape ? 'shape' : 'geonames');
    //adminSource if it is not set, it will be set by default to:
    // 'saved' if it is an already coded location
    // 'shape' if it is a new location and have values from shapes
    // 'geonames' if it is a new location and it doesn't have values from shapes
    //Object.assign(location, {'adminSource': adminSource});
    Object.assign(newState, {'geocoding': data,'showPopup': true});//set the location to be used
    //Object.assign(newState, {'showPopup': true});//open the popup

    //if (location.adminSource == 'geonames') {
      //Actions.invoke(Constants.ACTION_UPDATE_ADM_FROM_GEONAMES, {'geonameID': newState.geocoding.id});
    //}
    this.setState(newState);
  }

  cleanStore() {

    this.setState(this.initialData);
  }

  valueChanged(newValue) {
    debugger
    let newState = Object.assign({}, this.state);
    let newGeocoding = Object.assign({}, newState.geocoding);
    const val = {};
    val[newValue.name] = newValue.value;
    Object.assign(newGeocoding, val);
    Object.assign(newState, {'geocoding': newGeocoding});
    this.setState(newState);
  }

  loadingAdminData() {
    debugger
    let newState = Object.assign({}, this.get());
    Object.assign(newState, {'loadingAdminGeonames': true});
    this.setState(newState);
  }

  loadingData() {
    debugger
    let newState = Object.assign({}, this.get());
    Object.assign(newState, {'loadingGeonames': true});
    this.setState(newState);
  }

  saveLocation() {
    let newState = Object.assign({}, this.state);
    let geocoding = newState.geocoding;
    let prev_status = geocoding.status;
    let status = geocoding.type == 'location' ? 'NEW' : newState.geocoding.confirmDelete == 'CONFIRMED' ? 'DELETED' : 'UPDATED';
    if (prev_status == 'NEW' && status == 'DELETED') {
      status = 'LOCATION';
    }
    if (prev_status == 'NEW' && status == 'UPDATED') {
      status = 'NEW';
    }
    let saveGeo = Object.assign({}, geocoding);
    Object.assign(saveGeo, {'status': status});
    Actions.invoke(Constants.ACTION_SAVE_LOCATION, saveGeo);
  }

  /**
   * Create final geocoding object
   * @return {[type]} [description]
   */
  buildGecoding(source) {
    debugger
    const newGeocoding = {};
    Object.assign(newGeocoding, {
      name: source.name,
      'id': source.id,
      'geometry': source.geometry,
      'description': source.description,
      'featureDesignation': source.featureDesignation,
      'type': source.type,
      'status': source.status,
      'activityDescription': source.activityDescription,
      'locationClass': source.locationClass,
      'exactness': source.exactness,
      'adminSource': source.adminSource
    });
    Object.assign(newGeocoding, {
      'country': source.adminCodes[source.adminSource].country,
      'admin1': source.adminCodes[source.adminSource].admin1,
      'admin2': source.adminCodes[source.adminSource].admin2,
    });
    return newGeocoding;
  }

  updateAdminData(location) {
    debugger
    let newState = Object.assign({}, this.state);
    const newAdminData = {
      'country': {
        code: location.countryId,
        name: location.countryName
      },
      'admin1': {
        code: location.adminId1,
        name: location.adminName1
      },
      'admin2': {
        code: location.adminId2,
        name: location.adminName2
      }
    }
    Object.assign(newState.geocoding.adminCodes.geonames, newAdminData);//set the new data from Geonames
    Object.assign(newState, {'loadingAdminGeonames': false});
    this.setState(newState);
  }

  updateData(location) {
    debugger
    const newState = Object.assign({}, this.state);
    let newData = {
      'name': location.name,
      'toponymName': location.toponymName,
      'featureDesignation': {
        code: location.fcode,
        name: location.fcodeName
      }
    }
    Object.assign(newState.geocoding, newData);//set the new data from Geonames
    const newAdminData = {
      'country': {
        code: location.countryId,
        name: location.countryName
      },
      'admin1': {
        code: location.adminId1,
        name: location.adminName1
      },
      'admin2': {
        code: location.adminId2,
        name: location.adminName2
      }
    };
    Object.assign(newState.geocoding.adminCodes.geonames, newAdminData);//set the new data from Geonames
    Object.assign(newState, {'loadingGeonames': false});
    this.setState(newState);
  }

  geonamesFailed(error) {
    debugger
    let newState = Object.assign({}, this.state);
    Object.assign(newState, {error, 'loadingGeonames': false, 'loadingAdminGeonames': false});
    this.setState(newState);
  }
}


export default DataEntryStore;

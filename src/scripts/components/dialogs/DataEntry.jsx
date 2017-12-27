import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Link} from 'react-router';

import DataEntryStore from '../../stores/DataEntryStore.es6';
import LangStore from '../../stores/LangStore.es6';

import Reflux from "reflux";
import * as Actions from '../../actions/Actions.es6'
import Constants from '../../constants/Contants.es6';
import DataEntryHelp from '../../help/DataEntry.es6';
import ReactDOM from 'react-dom';
import Message from '../Message.jsx'
import MultiLangualInput from './MultiLangualInput.jsx'

class AdminOptions extends React.Component {

  toggleAdminSource(e) {
    var newSource = e.target.parentElement.value;
    this.props.changeCodingValue('adminSource', newSource);
    if (newSource == 'geonames') {
      Actions.invoke(Constants.ACTION_UPDATE_ADM_FROM_GEONAMES, {'geonameID': this.props.geocoding.id});
    }
  }

  render() {
    let geocoding = this.props.geocoding;
    let adminSource = this.props.adminSource;
    return (
      <div className="pull-right options" id="adminOptionsContainer">
        <label className="inline mini">Use Admin Division from:</label>
        {(geocoding.type == 'geocoding' && geocoding.status != 'NEW') ? //if it is an existing location, it shows the "Stored" option
          <button className={adminSource == 'saved' ? "btn btn-xs btn-success" : "btn btn-xs btn-default"} value='saved'
                  onClick={this.toggleAdminSource.bind(this)}>
            <Message k="dataentry.sourceadmin.stored"/>
          </button>
          : null
        }
        {geocoding.adminCodes.shape ? //if it have shapes data, it shows the "Shapes" option
          <button className={adminSource == 'shape' ? "btn btn-xs btn-success" : "btn btn-xs btn-default"} value='shape'
                  onClick={this.toggleAdminSource.bind(this)}>
            <Message k="dataentry.sourceadmin.shapes"/>
          </button>
          : null
        }
        <button className={adminSource == 'geonames' ? "btn btn-xs btn-success" : "btn btn-xs btn-default"}
                value='geonames' onClick={this.toggleAdminSource.bind(this)}><Message
          k="dataentry.sourceadmin.geonames"/></button>
        {this.props.loadingAdminGeonames ?
          <i className="fa fa-spinner fa-spin"></i>
          : null
        }
      </div>
    )
  }
}

/*Popup Data Entry*/
class DataEntryContent extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  codingValueChanged(e) {
    this.changeCodingValue(e.target.name, e.target.value);
    this.validateField(e.target.value, e.target.name)
  }

  changeCodingValue(name, value) {
    let val;
    switch (name) {
      case "locationClass":
        val = Constants.LOCATION_CLASS_LIST.find((item) => {
          if (item.code == value) return item;
        }) || null;
        break;
      case "exactness":
        val = Constants.EXACTNESS_LIST.find((item) => {
          if (item.code == value) return item;
        }) || null;
        break;
      default:
        val = value;
        break;
    }
    Actions.invoke(Constants.ACTION_CHANGE_CODING_VALUE, {'name': name, 'value': val});
  }

  onDelete() {
    this.changeCodingValue('confirmDelete', 'TO_CONFIRM');
  }

  doDelete() {
    this.changeCodingValue('confirmDelete', 'CONFIRMED');
    this.save(true);
  }

  cancelDelete() {
    this.changeCodingValue('confirmDelete', 'CANCELED');
  }

  onSave() {
    this.save(false)
  }

  save(skipValidation) {
    let valid = (skipValidation) ? true : this.validate(this.props.geocoding);
    if (valid) {
      Actions.invoke(Constants.ACTION_PREPARE_SAVE_LOCATION);
      this.onCancel();
    }
  }

  /**
   * Validate the new geocoding object
   */
  validate(newGeocoding) {
    return (
      this.validateField(newGeocoding.exactness, 'exactness') &
      this.validateField(newGeocoding.locationClass, 'locationClass') &
      this.validateField(newGeocoding.activityDescription, 'activityDescription', (val) => {
        return (val != null && val.length > 0)
      })
    );
  }

  validateField(value, elementId, validator) {
    if (!validator) { //default validator
      validator = (val) => {
        return val != null
      }; //validator should return true if object is valid or false if object si not valid
    }
    if (!validator(value)) {
      var element = document.getElementById(elementId);
      element.parentElement.classList.add('has-error');
      return false;
    } else {
      var element = document.getElementById(elementId);
      element.parentElement.classList.remove('has-error');
      return true;
    }
  }

  /*end field*/
  onCancel() {
    this.props.onCancel ? this.props.onCancel() : null;
  }

  updateFromGeonames() {
    Actions.invoke(Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID, {'geonameID': this.props.geocoding.id});
    this.changeCodingValue('adminSource', 'geonames');
  }

  getAdminSource(geocoding) {
    /*adminSource values:
        saved: load admin data from stored values
        shape: load admin data from shape info
        geocoding: load admin data from geonames
     */
    if (geocoding.adminSource) {
      return geocoding.adminSource; //if adminSource is set, return it
    } else if (geocoding.type == 'geocoding') {
      return 'saved'; //if adminSource is NOT set and it is an existing location, return saved
    } else if (geocoding.adminCodes.shape) {
      return 'shape'; //else if it have shapes data, return shape
    } else {
      return 'geonames'; //otherwise, return geonames
    }
  }

  render() {

    let {geocoding:{countryFeature,locationFeature},lang} = this.props;

    let {properties:{activityDescriptions,administratives,descriptions,exactness,featuresDesignation,gazetteerAgency,locationClass,locationReach,locationStatus,names}}=locationFeature


     administratives.filter(adm=>adm.level==1)
     debugger;
    let type='geocoding'
    debugger;
    if (this.props.geocoding.confirmDelete == 'TO_CONFIRM') {
      return (
        <div>
          <h4 className='list-group-item-heading'>
            <Message k="dataentry.deletemessage"/>
          </h4>
          <hr/>
          <Button bsStyle='danger' onClick={this.cancelDelete.bind(this)}><Message k="general.no"/></Button>
          <Button bsStyle='success' className="pull-right" onClick={this.doDelete.bind(this)}><Message k="general.yes"/></Button>
        </div>
      )
    } else {
      return (
        <div id='dataentry' className={locationStatus == 'EXISTING' ? 'update' : 'new'}>

            <label className=""><b> * All entered text will be stored in "{this.props.lang}" language</b></label>
          <div id='noneditablefields'>
            <div className="row">
              <div className="col-lg-12">
                  <label className="colored" htmlFor="name">
                  <Message k="dataentry.name"/></label>
                  <MultiLangualInput id="name" name="name" texts={names}></MultiLangualInput>
              </div>

            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <label className="colored" htmlFor="country,"><Message k="dataentry.country"/></label>
                  <input type="text" className="form-control" id="country" placeholder="NA" value={''} disabled/>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label className="colored" htmlFor="admin1"><Message k="dataentry.admin1"/></label>
                  <input type="text" className="form-control" id="admin1" placeholder="NA" value={administratives.find(adm=>adm.level==1).name} disabled/>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label className="colored" htmlFor="admin2"><Message k="dataentry.admin2"/></label>
                  <input type="text" className="form-control" id="admin2" placeholder="NA" value={administratives.find(adm=>adm.level==2).name} disabled/>
                </div>
              </div>

            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <label className="colored" for="id"><Message k="dataentry.identifier"/></label>
                  <input type="text" className="form-control" id="id" placeholder="id" value={''} disabled/>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label className="colored" for="geometryType"><Message k="dataentry.type"/></label>
                  <input type="text" className="form-control" id="geometryType" placeholder=""
                         value={''} disabled/>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group" id="coordinates">
                  <label className="colored"><Message k="dataentry.coordinates"/></label>
                  <div>{''}</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3">
                <div className="form-group">
                  <label className="colored"><Message k="dataentry.featuredesignation"/></label>
                  <input type="text" className="form-control" id="featureDesignation"
                         value={''} disabled/>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="form-group">
                  <label>&nbsp;</label>
                  <input type="text" className="form-control" id="featureDesignationName"
                         value={''} disabled/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label className="colored" for="locationClass"><Message k="dataentry.locationclass"/></label>
                <select value={locationClass ? locationClass.code : ''} className="form-control"
                        name="locationClass" id="locationClass" onChange={this.codingValueChanged.bind(this)}>
                  <option>Select</option>
                  {
                    Constants.LOCATION_CLASS_LIST.map((item) => {
                      return (<option key={item.code} value={item.code}>{item.name}</option>)
                    })
                  }
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label className="colored" for="Exactness"><Message k="dataentry.geographicexactness"/></label>
                <select value={exactness ? exactness.code : ''} className="form-control"
                        name="exactness" id="exactness" onChange={this.codingValueChanged.bind(this)}>
                  <option>Select</option>
                  {
                    Constants.EXACTNESS_LIST.map((item) => {
                      return (<option key={item.code} value={item.code}>{item.name}</option>)
                    })
                  }
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="form-group">
                <label className="colored"><Message k="dataentry.activitydescription"/></label>
                <textarea className="form-control" name="activityDescription" id="activityDescription"
                          value={''}
                          onChange={this.codingValueChanged.bind(this)}></textarea>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 help-container">
              <div className='separator'/>
              <DataEntryHelp parentId='dataentry' type={type}/>
              <div className='separator'/>
              <button className="btn btn-lg btn-success pull-right" id="savebutton"
                      onClick={this.onSave.bind(this)}>{locationStatus == 'EXISTING' ? Message.t('dataentry.save') : Message.t('dataentry.update')}</button>
                    {(locationStatus != 'NEW') ? <button className="btn btn-lg btn-danger pull-right" id="deletebutton"
                                                        onClick={this.onDelete.bind(this)}><Message
                k="dataentry.delete"/></button> : null}
              <button className="btn btn-lg btn-warning pull-right" id="cancelbutton"
                      onClick={this.onCancel.bind(this)}><Message k="dataentry.cancel"/></button>
              <button className="btn btn-lg btn-default pull-right" title={Message.t('dataentry.updatefromgeonames')}
                      onClick={this.updateFromGeonames.bind(this)}>
                {(this.props.loadingGeonames) ? <i className="fa fa-refresh fa-spin"></i> :
                  <i className="fa fa-refresh"></i>}
              </button>
            </div>
          </div>
          {this.props.error ?
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group has-error">
                  <label className="colored">
                    ERROR: {this.props.error}
                  </label>
                </div>
              </div>
            </div>
            : null}
        </div>
      );
    }//end else
  }
}


/*Data Entry Main Container*/
class DataEntry extends Reflux.Component {

  constructor() {
    super();

    this.state = {};
    this.stores = [DataEntryStore,LangStore];
  }

  close(e) {
    Actions.invoke(Constants.ACTION_CLOSE_DATAENTRY_POPUP);
  }

  render() {

    return (
      <Modal className="dataentry-dialog" {...this.props} show={this.state.showPopup} onHide={this.close}>
        <Modal.Body>
          <DataEntryContent {...this.state} onCancel={this.close.bind(this)}/>
        </Modal.Body>
      </Modal>
    )
  }
}

export default DataEntry

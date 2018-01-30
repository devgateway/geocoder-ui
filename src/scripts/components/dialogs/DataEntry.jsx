import React from 'react';
import Reflux from "reflux";
import {Button, Modal} from 'react-bootstrap';
import DataEntryStore from '../../stores/DataEntryStore.es6';
import LangStore from '../../stores/LangStore.es6';
import * as Actions from '../../actions/Actions.es6'
import Constants from '../../constants/Contants.es6';
import DataEntryHelp from '../../help/DataEntryHelp.es6';
import Message from '../Message.jsx';
import MultiLangualInput from './MultiLingualInput.jsx';
import MultiLangualTextArea from './MultiLingualTextArea.jsx';
import LangSelector from '../LangSelector.jsx';

/* Popup Data Entry */
class DataEntryContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  changeCodingValue(name, value, lang) {
    let val;
    
    switch (name) {
      case "locationClass":
        val = Constants.LOCATION_CLASS_LIST.find((item) => {
            if (item.code == value)
              return item;
          }
        ) || null;
        break;
      case "exactness":
        val = Constants.EXACTNESS_LIST.find((item) => {
            if (item.code == value)
              return item;
          }
        ) || null;
        break;
      case "locationReach":
        val = Constants.LOCATION_REACH_LIST.find((item) => {
            if (item.code == value)
              return item;
          }
        ) || null;
        break;
      default:
        val = value;
        break;
    }
    
    Actions.invoke(Constants.ACTION_CHANGE_CODING_VALUE, {
      'name': name,
      'value': val,
      'lang': lang
    });
  }
  
  onCancel() {
    Actions.invoke(Constants.ACTION_CANCEL);
  }
  
  onDelete() {
    Actions.invoke(Constants.ACTION_SHOW_DELETE_CONFIRM);
  }
  
  onSave() {
    Actions.invoke(Constants.ACTION_SAVE);
  }
  
  updateAdminInfo(geonameID) {
    Actions.invoke(Constants.ACTION_UPDATE_ADM_FROM_GEONAMES, {'geonameID': geonameID});
  }
  
  updateAdminFromShapes() {
    Actions.invoke(Constants.ACTION_UPDATE_ADM_FROM_SHAPES)
  }
  
  updateLocationInfo(geonameID) {
    Actions.invoke(Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID, {'geonameID': geonameID});
  }
  
  changeLan(lang) {
    Actions.invoke(Constants.ACTION_CHANGE_LANGUAGE, lang);
  }
  
  componentWillReceiveProps(nextProps) {
    // check if the language changed and if we have the proper translations for names.
    if (this.props.lang !== nextProps.lang) {
      const names = nextProps.geocoding.locationFeature.properties.names;
      
      const translationLanguage = names.find(val => val.lang === nextProps.lang);
      
      if (translationLanguage === undefined
        || translationLanguage.description === undefined
        || translationLanguage.description === "") {
        
        const locationIdentifiers = nextProps.geocoding.locationFeature.properties.locationIdentifiers;
        const geonamesIdentifier = locationIdentifiers.find(id => {
          return (
            id.vocabulary
              ? id.vocabulary.code === 'G1'
              : false)
        });
        let geonamesId;
        if (geonamesIdentifier) {
          geonamesId = geonamesIdentifier.code
        }
        
        this.updateLocationInfo(geonamesId);
      } else {
      }
    }
  }
  
  render() {
    let {
      geocoding: {
        countryFeature,
        locationFeature
      }
    } = this.props;
    
    let {
      activityDescriptions,
      administratives,
      descriptions,
      exactness,
      featuresDesignation,
      locationClass,
      locationReach,
      locationStatus,
      names,
      locationIdentifiers
    } = locationFeature.properties
      ? locationFeature.properties
      : {};
    
    let geonamesIdentifier = locationIdentifiers.find(id => {
      return (
        id.vocabulary
          ? id.vocabulary.code === 'G1'
          : false)
    });
    let geonamesId;
    if (geonamesIdentifier) {
      geonamesId = geonamesIdentifier.code
    }
    
    return (
      <div id='dataentry' className={locationStatus ? locationStatus : ''}>
        <div className="popup-header">
          
          <div className="col-md-4 no-padding location-name">
            <MultiLangualInput id="name" name="name" texts={names}></MultiLangualInput>
          </div>
          
          <div className="col-md-8">
            <div className="popup-close">
              <span className="close-icon" onClick={e => this.onCancel()}></span>
            </div>
            <LangSelector></LangSelector>
            
            <div className="header-buttons">
              {
                geonamesId
                  ? (<button className="btn btn-popup-header" onClick={e => {
                    this.updateAdminInfo(geonamesId)
                  }}>
                    <Message k="dataentry.sourceadmin.geonames"/>
                  </button>)
                  : null
              }
              {
                countryFeature
                  ? (<button className="btn btn-popup-header" onClick={e => {
                    this.updateAdminFromShapes()
                  }}>
                    <Message k="dataentry.sourceadmin.shapes"/>
                  </button>)
                  : null
              }
            </div>
          </div>
        </div>
        
        <div className="popup-section">
          <label className="form-description">* All entered text will be stored in "{this.props.lang}"
            language</label>
        </div>
        
        <div className="popup-section">
          {
            administratives.sort((a, b) => a.level - b.level).map(admin => {
              return (<div key={admin.level} className="col-md-4 no-padding">
                <div className="form-group">
                  <label className="noneditable" htmlFor={`admin${admin.level}`}><Message
                    k={`dataentry.admin${admin.level}`}/>
                  </label>
                  <input type="text" className="form-control noneditable" id={`admin${admin.level}`} placeholder="NA"
                         value={admin.name} disabled="disabled"/>
                  <Message k="dataentry.source"/>: {admin.vocabulary.name}
                </div>
              </div>)
            })
          }
        </div>
        
        <div className="popup-section">
          {locationIdentifiers.map(id =>
            <div key={id.id + id.code}>
              <div className="col-md-4 no-padding">
                <label htmlFor="id"><Message k="dataentry.identifier"/></label>
                <input type="text" className="form-control noneditable" id="id" placeholder="id" value={id.code}
                       disabled/>
              </div>
              
              <div className="col-md-4 no-padding">
                <label>Type</label>
                <input type="text" className="noneditable" id="type" value="Point" disabled="true"/>
              </div>
              
              <div className="col-md-4 no-padding">
                <label>Coordinattes</label>
                <input type="text" className="noneditable" id="coordinates" value="13.1339 - 27.8493"
                       disabled="true"/>
              </div>
            </div>)
          }
        </div>
        
        <div className="popup-section">
          
          <div className="col-md-4 no-padding">
            <label className="noneditable"><Message k="dataentry.code"/></label>
            <input type="text" className="noneditable" id="featureDesignation" value={featuresDesignation
              ? featuresDesignation.code
              : ''} disabled="disabled"/>
          </div>
          
          <div className="col-md-8 no-padding">
            <label className="noneditable"><Message k="dataentry.featuredesignation"/></label>
            <input type="text" className="input-wide noneditable" id="featureDesignationName"
                   value={featuresDesignation
                     ? featuresDesignation.name
                     : 'None'} disabled="disabled"/>
          </div>
        </div>
        
        <hr/>
        
        <div className="popup-section editable">
          <div>
            <div className="col-md-6 no-padding">
              <div className="form-group">
                <label className="colored" htmlFor="locationClass"><Message k="dataentry.locationclass"/></label>
                <select value={locationClass
                  ? locationClass.code
                  : ''} className="form-control" name="locationClass" id="locationClass"
                        onChange={e => this.changeCodingValue(e.target.name, e.target.value)}>
                  <option>Select</option>
                  {
                    Constants.LOCATION_CLASS_LIST.map((item) => {
                      return (<option key={item.code} value={item.code}>{item.name}</option>)
                    })
                  }
                </select>
              </div>
            </div>
            
            <div className="col-md-6 no-padding-r">
              <div className="form-group">
                <label className="colored" htmlFor="Exactness"><Message k="dataentry.geographicexactness"/></label>
                <select value={exactness
                  ? exactness.code
                  : ''} className="form-control" name="exactness" id="exactness"
                        onChange={e => this.changeCodingValue(e.target.name, e.target.value)}>
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
          
          <div>
            <div className="col-md-12 no-padding">
              <div className="form-group">
                <label className="colored" htmlFor="locationReach"><Message k="dataentry.locationreach"/></label>
                <select value={locationReach
                  ? locationReach.code
                  : ''} className="form-control" name="locationReach" id="locationReach"
                        onChange={e => this.changeCodingValue(e.target.name, e.target.value)}>
                  <option>Select</option>
                  <option value="1">Activity</option>
                  <option value="2">Intended Beneficiaries</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <div className="col-md-12 no-padding">
              <div className="form-group">
                <label className="colored"><Message k="dataentry.activitydescription"/> {
                  activityDescriptions.sort(it => it.lang).map(d => (<span key={d.lang}>
                  <b className={(d.lang == this.props.lang) ? "link selected" : "link"}
                     onClick={e => this.changeLan(d.lang)}>{d.lang}{' | '}</b>
                </span>))
                }</label>
                <MultiLangualTextArea name="activityDescriptions" id="activityDescription"
                                      onChange={this.changeCodingValue}
                                      texts={activityDescriptions}></MultiLangualTextArea>
              </div>
            </div>
          </div>
          
          <div>
            <div className="col-md-12 no-padding">
              <div className="form-group">
                <label className="colored"><Message k="dataentry.description"/> {
                  descriptions.sort(it => it.lang).map(d => (<span key={d.lang}>
                      <b className={(d.lang == this.props.lang) ? "link selected" : "link"}
                         onClick={e => this.changeLan(d.lang)}>{d.lang}{' | '}</b>
                </span>))
                }</label>
                <MultiLangualTextArea name="descriptions" id="description" onChange={this.changeCodingValue}
                                      texts={descriptions}></MultiLangualTextArea>
              </div>
            </div>
          </div>
        </div>
        
        <div className="popup-section button-row">
          <div className="help-container no-padding">
            <DataEntryHelp/>
            
            <div className="popup-btn-wrapper">
              <button className="btn btn-lg btn-success pull-right" id="savebutton" onClick={e => this.onSave()}>
                {locationStatus === 'EXISTING'
                  ? Message.t('dataentry.update')
                  : null
                }
                {locationStatus === 'UPDATED'
                  ? Message.t('dataentry.update')
                  : null
                }
                {locationStatus === 'NEW'
                  ? Message.t('dataentry.update')
                  : null
                }
                {locationStatus === 'CREATED'
                  ? Message.t('dataentry.add')
                  : null
                }
                {locationStatus === 'AUTO_CODED'
                  ? Message.t('dataentry.verify')
                  : null
                }
                {locationStatus === 'DELETED'
                  ? Message.t('dataentry.save')
                  : null
                }
              </button>
              {
                (locationStatus === 'CREATED' || locationStatus === 'DELETED')
                  ? null
                  : <button className="btn btn-lg btn-danger pull-right" id="deletebutton"
                            onClick={e => this.onDelete()}>
                    <Message k="dataentry.delete"/>
                  </button>
              }
              
              <button className="btn btn-lg btn-warning pull-right" id="cancelbutton" onClick={e => this.onCancel()}>
                <Message k="dataentry.cancel"/>
              </button>
              {geonamesId
                ? <button className="btn btn-lg btn-blue pull-right" title={Message.t('dataentry.updatefromgeonames')}
                          onClick={e => this.updateLocationInfo(geonamesId)}>
                  {
                    (this.props.loadingGeonames)
                      ? <i className="fa fa-refresh fa-spin"></i>
                      : <Message k="dataentry.refresh"/>
                  }
                </button>
                : null
              }
            </div>
          </div>
        </div>
        {
          this.props.error
            ? <div>
              <div className="col-md-12">
                <div className="form-group has-error">
                  <label className="colored">
                    ERROR: {this.props.error}
                  </label>
                </div>
              </div>
            </div>
            : null
        }
      </div>);
  }
}

/* Data Entry Main Container */
class DataEntry extends Reflux.Component {
  constructor() {
    super();
    
    this.state = {};
    this.stores = [DataEntryStore, LangStore];
  }
  
  doDelete() {
    Actions.invoke(Constants.ACTION_DELETE);
  }
  
  cancelDelete() {
    Actions.invoke(Constants.ACTION_CANCEL_DELETE);
  }
  
  render() {
    return (<div>
      <Modal.Body className="dataentry-dialog">
        <DataEntryContent {...this.state}/>
      </Modal.Body>
      
      
      <Modal show={this.state.confirmDeletion} onHide={this.cancelDelete.bind(this)}>
        <Modal.Body>
          <h4 className='list-group-item-heading'>
            <Message k="dataentry.deletemessage"/>
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={e => this.cancelDelete()}><Message k="general.no"/></Button>
          <Button bsStyle='success' onClick={e => this.doDelete()}><Message k="general.yes"/></Button>
        </Modal.Footer>
      </Modal>
    </div>)
  }
}

export default DataEntry;

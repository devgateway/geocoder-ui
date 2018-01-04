import {PropTypes} from 'react';
import React from 'react';
import * as Actions from '../../../actions/Actions.es6';
import Constants from '../../../constants/Contants.es6';
import Message from '../../Message.jsx';
import MultiLingualText from '../../MultiLingualText.jsx';

/*Popup info*/
class InfoView extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  onPickLocation() {
    this.props.onPickLocation ? this.props.onPickLocation() : null
  }
  
  render() {
    
    
    var cssClass;
    
    if (this.props.type == 'location') {
      cssClass = 'popup-location';
    }
    else {
      cssClass = this.props.status ? 'popup-' + this.props.status.toLowerCase() : 'popup-existing';
    }
    
    let country, admin1, admin2, comment;
    
    if (this.props.type == 'geocoding') {
      //country = this.props.country ? this.props.country.name : null;
      //admin1 = this.props.admin1 ? this.props.admin1.name : null;
      //admin2 = this.props.admin2 ? this.props.admin2.name : null;
    } else if (false) {
      //country = this.props.adminCodes.shape.country ? this.props.adminCodes.shape.country.name : null;
      //admin1 = this.props.adminCodes.shape.admin1 ? this.props.adminCodes.shape.admin1.name : null;
      //admin2 = this.props.adminCodes.shape.admin2 ? this.props.adminCodes.shape.admin2.name : null;
      //comment = Message.t('locationpopup.adminsource.shapes');
    } else {
      //country = this.props.adminCodes.geonames.country ? this.props.adminCodes.geonames.country.name : null;
      //admin1 = this.props.adminCodes.geonames.admin1 ? this.props.adminCodes.geonames.admin1.name : null;
      //admin2 = this.props.adminCodes.geonames.admin2 ? this.props.adminCodes.geonames.admin2.name : null;
      //comment = Message.t('locationpopup.adminsource.geonames');
    }
    
    //  switch (this.props.adminSource) {
    //  case 'geonames':
    //  comment = Message.t('locationpopup.adminsource.geonames');
    //  break;
    //  case 'shape':
    //  comment = Message.t('locationpopup.adminsource.shapes');
    //  break;
    //  case 'saved':
    //  comment = Message.t('locationpopup.adminsource.stored');
    //  break;
    //}
    
    
    return (
      
      
      <div id="location-info-popup" className={cssClass}>
        <h2><MultiLingualText texts={this.props.names}/></h2>
        
        <div className="row border">
          {this.props.administratives.sort((a,b)=>a.level-b.level).map(adm=> <div className="col-lg-4">
            <label className="mini"><Message k={`dataentry.admin${adm.level}`}/> <span className="small">*</span></label></div>)}
        </div>
        
        <div className="row">
          {this.props.administratives.sort((a,b)=>a.level-b.level).map(adm=> <div className="col-lg-4"> <label className="green text-large bolder">{adm.name || 'NA'}</label> </div>)}
        </div>
        
        <div className="row border">
          <div className="col-lg-4">
            <label className="mini"><Message k="dataentry.identifier"/></label>
          </div>
          
          <div className="col-lg-4">
            <label className="mini"><Message k="dataentry.coordinates"/></label>
          </div>
          
          <div className="col-lg-4">
            <label className="mini"><Message k="dataentry.featuredesignation"/></label>
          </div>
        </div>
        
        
        
        
        
        <div className="row">
          <div className="col-lg-4">
            <label className="green text-large bolder">{this.props.locationIdentifiers.map(it=>it.code)}</label>
          </div>
          <div className="col-lg-4">
            <label className="green text-large bolder">{this.props.x} , {this.props.y}</label>
          </div>
          <div className="col-lg-4">
            <label className="green text-large bolder">{this.props.featuresDesignation.code}</label>
          </div>
        </div>
        
        
        <div className="row border">
          <div className="col-lg-4">
            <label className="mini"><Message k="dataentry.locationclass"/></label>
          </div>
          <div className="col-lg-4">
            <label className="mini"><Message k="dataentry.geographicexactness"/></label>
          </div>
          
          <div className="col-lg-4">
            <label className="mini"><Message k="dataentry.locationreach"/></label>
          </div>
        </div>
        
        
        <div className="row">
          <div className="col-lg-4">
            <label className="green text-large bolder">{this.props.locationClass.name}</label>
          </div>
          <div className="col-lg-4">
            <label className="green text-large bolder">{this.props.exactness.name}</label>
          </div>
          <div className="col-lg-4">
            <label className="green text-large bolder">{this.props.locationReach.name}</label>
          </div>
        </div>
        
        <div className="row border">
          <div className="col-lg-12">
            <label className="mini"><Message k="dataentry.activitydescription"/></label>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-12">
            <label className="green text-large bolder"> <MultiLingualText texts={this.props.activityDescriptions}/> </label>
          
          </div>
        </div>
        
        
        <div className="row border">
          <div className="col-lg-12">
            <label className="mini"><Message k="dataentry.description"/></label>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-12">
            <label className="green text-large bolder"> <MultiLingualText texts={this.props.descriptions}/> </label>
          
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-12">
            <div className="small"><span>* {comment} </span></div>
            
            <button
              className={this.props.type == 'location' ? "btn btn-sm btn-success pull-right" : "btn btn-sm btn-warning pull-right"}
              onClick={e=>this.onPickLocation(e)}>
              {this.props.type == 'location' ? Message.t('locationpopup.picklocation') : Message.t('locationpopup.update')}
            </button>
          
          </div>
        </div>
      </div>
    );
  }
}

export default class LocationPopup extends React.Component {
  
  turnDataEntryOn() {
    
    Actions.invoke(Constants.ACTION_OPEN_DATAENTRY_POPUP);
  }
  
  render() {
    const location = this.props.location;
    return (<InfoView  {...location} onPickLocation={e=>this.turnDataEntryOn(e)}/>);
  }
}

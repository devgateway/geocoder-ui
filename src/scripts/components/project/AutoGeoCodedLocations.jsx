import React from 'react';
import Reflux from "reflux";
import {Label} from 'react-bootstrap';
import Constants from "../../constants/Contants.es6";
import ProjectGeoJsonStore from "../../stores/ProjectGeoJsonStore.es6";
import Message from '../Message.jsx';
import MultiLingualText from '../MultiLingualText.jsx';
import * as Actions from '../../actions/Actions.es6';
import PropTypes from "prop-types";
import L from "leaflet";

/**
 * Renders a single Location
 */
class Item extends Reflux.Component {
  static propTypes = {
    getCountryLayerFeatures:  PropTypes.func.isRequired
  };
  
  constructor() {
    super();
    this.store = ProjectGeoJsonStore;
  }
  
  getLocationFeatures() {
    // find the feature from the state
    return this.state.data.features.find(f => f.properties.id === this.props.id);
  }
  
  showDataEntryForm() {
    // find the feature from the state
    const locationFeature = this.getLocationFeatures();
    const coordinates = locationFeature.geometry.coordinates;
    const countryFeature = this.props.getCountryLayerFeatures(new L.LatLng(coordinates[1], coordinates[0]));
    
    Actions.invoke(Constants.ACTION_OPEN_DATAENTRY_POPUP, {locationFeature, countryFeature})
  }
  
  deleteLocation() {
    const feature = this.getLocationFeatures();
    
    // show the data entry form and invoke deletion immediately
    Actions.invoke(Constants.ACTION_OPEN_DATAENTRY_POPUP, {locationFeature: feature});
    Actions.invoke(Constants.ACTION_SHOW_DELETE_CONFIRM);
  }
  
  showDocumentRef() {
    const currentLocationId = this.props.id;
    
    Actions.invoke(Constants.ACTION_TOGGLE_DOCUMENT_REF_POPUP, currentLocationId);
  }
  
  render() {
    return (
      <div className="list-group-item">
        <h3><MultiLingualText texts={this.props.names}/></h3>
        
        <div className="list-group-item-text">
          <label><Message k="dataentry.featuredesignation"/>:</label>
          <span> {this.props.featuresDesignation ? this.props.featuresDesignation.code : ''} - {this.props.featuresDesignation ? this.props.featuresDesignation.name : ''}</span>
        </div>
        
        <div className="list-group-item-text">
          <label><Message k="dataentry.activitydescription"/>:</label>
          <span><MultiLingualText texts={this.props.activityDescriptions}/></span>
        </div>
        
        <div className="list-group-item-text">
          <label><Message k="dataentry.type"/>:</label>
          <span>{this.props.locationClass.name}</span>
        </div>
        
        <div className="list-group-item-text">
          <label className="inline"><Message k="dataentry.status"/>:</label>
          <Label bsStyle="default" className="pending-locations-background">{this.props.locationStatus}</Label>
        </div>
        
        <div className="list-group-item-text pull-left">
          <div className="geocoded-btns">
            <button className="verify" onClick={this.showDataEntryForm.bind(this)}>Verify</button>
            <button className="preview" onClick={this.showDocumentRef.bind(this)}>Preview Ref</button>
            <button className="remove" onClick={this.deleteLocation.bind(this)}>Remove</button>
          </div>
        </div>
        <br/>
      </div>
    )
  }
}

export default class AutoGeoCodedLocations extends React.Component {
  static propTypes = {
    getCountryLayerFeatures:  PropTypes.func.isRequired
  };
  
  render() {
    const {getCountryLayerFeatures} = this.props;
    let locations;
    if (this.props.locations !== undefined) {
      locations = this.props.locations.filter(location => location.locationStatus === Constants.AUTO_CODED);
    } else {
      locations = [];
    }
    
    return (
      <div className="panel-section">
        <div className="accordion-content">
          <ul className="project-list search-results">
            {
              locations.map((item) => {
                return <Item key={item.id} {...item} getCountryLayerFeatures={getCountryLayerFeatures}/>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

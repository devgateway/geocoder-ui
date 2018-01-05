import React from 'react';
import Reflux from "reflux";
import {Label} from 'react-bootstrap';
import Constants from "../../constants/Contants.es6";
import ProjectGeoJsonStore from "../../stores/ProjectGeoJsonStore.es6";
import Message from '../Message.jsx';
import MultiLingualText from '../MultiLingualText.jsx';
import * as Actions from '../../actions/Actions.es6';

/**
 * Renders a single Location
 */
class Item extends Reflux.Component {
  constructor() {
    super();
    this.store = ProjectGeoJsonStore;
  }
  
  showDataEntryForm() {
    // find the feature from the state
    const feature = this.state.data.features.find(f => f.properties.id === this.props.id);
    
    Actions.invoke(Constants.ACTION_OPEN_DATAENTRY_POPUP, {locationFeature: feature})
  }
  
  showDocumentRef() {
    const currentLocationId = this.props.id;
  
    Actions.invoke(Constants.ACTION_TOGGLE_DOCUMENT_REF_POPUP, currentLocationId);
  }
  
  render() {
    return (
      <div className="list-group-item">
        <h3 className="list-group-item-heading"><b><MultiLingualText texts={this.props.names}/> </b></h3>
    
        <div className="list-group-item-text">
          <label><Message k="dataentry.featuredesignation"/></label>
          <span> {this.props.featuresDesignation ? this.props.featuresDesignation.code : ''} - {this.props.featuresDesignation ? this.props.featuresDesignation.name : ''}</span>
        </div>
    
        <div className="list-group-item-text">
          <label><Message k="dataentry.activitydescription"/></label>
          <span><MultiLingualText texts={this.props.activityDescriptions}/></span>
        </div>
    
        <div className="list-group-item-text">
          <label><Message k="dataentry.type"/></label>
          <span>{this.props.locationClass.name}</span>
        </div>
    
        <div className="list-group-item-text">
          <label><Message k="dataentry.geographicexactness"/></label>
          <span>{this.props.exactness.name}</span>
        </div>
    
        <div className="list-group-item-text">
          <label className="inline"><Message k="dataentry.status"/></label>
          <Label bsStyle="default" className="pending-locations-background">{this.props.locationStatus}</Label>
        </div>
    
        <div className="list-group-item-text pull-right">
          <div className="geocoded-btns">
            <button className="verify" onClick={this.showDataEntryForm.bind(this)}>Verify</button>
            <button className="preview" onClick={this.showDocumentRef.bind(this)}>Preview Ref</button>
            <button className="remove">Remove</button>
          </div>
        </div>
        <br/>
      </div>
    )
  }
}

export default class AutoGeoCodedLocations extends React.Component {
  
  render() {
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
                return <Item key={item.id} {...item}/>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

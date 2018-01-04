import React from 'react';
import Reflux from "reflux";
import {Label} from 'react-bootstrap';
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import Message from '../Message.jsx';
import MultiLingualText from '../MultiLingualText.jsx';
import ProjectGeoJsonStore from "../../stores/ProjectGeoJsonStore.es6";

/**
 * Renders a single Location
 */
class Item extends Reflux.Component {
  constructor() {
    super();
    this.store = ProjectGeoJsonStore;
  }
  
  _showDataEntryForm() {
    // find the feature from the state
    const feature = this.state.data.features.find(f => f.properties.id === this.props.id);
    
    Actions.invoke(Constants.ACTION_OPEN_DATAENTRY_POPUP, {locationFeature: feature})
  }
  
  render() {
    let status = !this.props.locationStatus ? 'EXISTING' : this.props.locationStatus;
    let statusLabel, statusStyle;
    switch (status) {
      case 'NEW':
        statusLabel = Message.t('projectinfo.locationstatus.new');
        statusStyle = 'success';
        break;
      case 'EXISTING':
        statusLabel = Message.t('projectinfo.locationstatus.existing');
        statusStyle = 'warning';
        break;
      case 'UPDATED':
        statusLabel = Message.t('projectinfo.locationstatus.updated');
        statusStyle = 'warning';
        break;
      case 'DELETED':
        statusLabel = Message.t('projectinfo.locationstatus.deleted');
        statusStyle = 'danger';
        break;
    }
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
          <Label bsStyle={statusStyle}
                 style={status === 'EXISTING' ? {'backgroundColor': '#FFEE42'} : {}}>{statusLabel}</Label>
        </div>
        
        <div className="list-group-item-text pull-right">
          <div className="geocoded-btns">
            <button className="edit" onClick={this._showDataEntryForm.bind(this)}>
              <Message k="projectinfo.locationslist.edit"/>
            </button>
            <button className="remove">Remove</button>
          </div>
        </div>
        <br/>
      </div>
    )
  }
}

/*
   This view renders the Project Information UI component
   */
export default class SelectedLocations extends React.Component {
  render() {
    let locations;
    if (this.props.locations !== undefined) {
      locations = this.props.locations.filter(location => location.locationStatus !== Constants.AUTO_CODED);
    } else {
      locations = [];
    }
    
    return (
      <div className="list">
        <div className="list-group">
          {
            locations.map((item) => {
              return <Item key={item.id} {...item}/>
            })
          }
        </div>
      </div>
    );
  }
}

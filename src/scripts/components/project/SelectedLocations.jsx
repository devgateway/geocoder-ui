import React from 'react';
import {Button, Label} from 'react-bootstrap';
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import Message from '../Message.jsx';

/*
  Renders a single Location
  */
class Item extends React.Component {
  
  constructor() {
    super();
  }
  
  _showLocationPopup() {
    Actions.invoke(Constants.ACTION_SET_ACTIVE_LOCATION, {'isCoded': true, 'locationFeature': this.props});
  }
  
  _showDataEntryForm() {
    Actions.invoke(Constants.ACTION_SET_ACTIVE_LOCATION, {
      'isCoded': true,
      'locationFeature': this.props,
      'activeDataentry': true
    });
  }
  
  render() {
    var status = !this.props.status ? 'EXISTING' : this.props.status;
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
        <h3 className="list-group-item-heading"><b>{this.props.name}</b></h3>
        
        <p className="list-group-item-text">
          <label><Message k="dataentry.featuredesignation"/></label>
          <span> {this.props.featureDesignation ? this.props.featureDesignation.code : ''} - {this.props.featureDesignation ? this.props.featureDesignation.name : ''}</span>
        </p>
        <p className="list-group-item-text">
          <label><Message k="dataentry.activitydescription"/></label>
          
          <span>{this.props.activityDescription}</span>
        </p>
        <p className="list-group-item-text">
          <label><Message k="dataentry.type"/></label>
          <span>{this.props.locationClass.name}</span>
        </p>
        
        <p className="list-group-item-text">
          <label><Message k="dataentry.geographicexactness"/></label>
          <span>{this.props.exactness.name}</span>
        </p>
        
        <p className="list-group-item-text">
          <label className="inline"><Message k="dataentry.status"/></label>
          <Label bsStyle={statusStyle}
                 style={status == 'EXISTING' ? {'backgroundColor': '#FFEE42'} : {}}>{statusLabel}</Label>
        </p>
        <p className="list-group-item-text pull-right">
          <Button className="show-location-btn"
                  onClick={this._showDataEntryForm.bind(this)}>
            <Message k="projectinfo.locationslist.edit"/>
          </Button>
          <Button className="map-location-btn"
                  onClick={this._showLocationPopup.bind(this)}>
            <Message k="projectinfo.locationslist.mapit"/>
          </Button>
        </p>
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

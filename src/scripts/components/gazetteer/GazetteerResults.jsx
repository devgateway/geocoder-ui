import React from 'react';
import Reflux from "reflux";
import GazetteerStore from '../../stores/GazetteerStore.es6';
import GazetteerGeoJsonStore from "../../stores/GazetteerGeoJsonStore.es6";
import ProjectStore from "../../stores/ProjectStore.es6";
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import Message from '../Message.jsx';
import PropTypes from "prop-types";
import L from "leaflet";

/**
 * This view renders the Gazetteer results.
 */
class GazetteerResults extends Reflux.Component {
  static propTypes = {
    getCountryLayerFeatures:  PropTypes.func.isRequired
  };
  
  constructor() {
    super();
    this.stores = [GazetteerStore, ProjectStore];
    this.storeKeys = ['locations', 'project'];
  }
  
  /**
   * Functions that filters the Gazettee Results that were already selected by the user.
   */
  filterSelectedRecords() {
    const records = [];
    
    this.state.locations.records.forEach(record => {
      const found = this.state.project.locations.find(function(location) {
        return location.id === record.geonameId;
      });
      
      if (found === undefined) {
        records.push(record);
      }
    });
  
    this.state.locations.records = records;
    return this.state.locations;
  }
  
  typeFilter(e) {
    Actions.invoke(Constants.ACTION_FILTER_BY_TYPE, e.target.value)
  }
  
  render() {
    const {getCountryLayerFeatures} = this.props;
  
    return (
      <div id="search-results">
        <div className="form">
          <div className="form-group form-sm">
            <label className="bolder"><Message k="projectinfo.locationtype"/>:</label>
            <select name="typeFilter" className="large-input  form-control" onChange={this.typeFilter.bind(this)}
                    value={this.state.locations.typeFilter}>
              <option value='ALL'>All Types</option>
              {this.state.locations.types.map((t) => {
                return <option key={t.code} value={t.code}>{t.name}</option>
              })}
            </select>
          </div>
        </div>
        <ListItems {...this.filterSelectedRecords()} getCountryLayerFeatures={getCountryLayerFeatures}/>
      </div>
    )
  }
}

/**
 * Renders a  List of locations.
 */
class ListItems extends React.Component {
  static propTypes = {
    getCountryLayerFeatures:  PropTypes.func.isRequired
  };
  
  render() {
    const {getCountryLayerFeatures} = this.props;
  
    if (!this.props.records || this.props.records.length === 0) {
      return (
        <h4> No location results found. </h4>
      )
    } else {
      return (
        <div className="list-group">
          {
            this.props.records.map((item) => {
              return <Item key={item.geonameId + item.lat + item.lng} {...item} getCountryLayerFeatures={getCountryLayerFeatures}/>
            })
          }
        </div>
      )
    }
  }
}

/**
 * Renders a single Location.
 */
class Item extends Reflux.Component {
  static propTypes = {
    getCountryLayerFeatures:  PropTypes.func.isRequired
  };
  
  constructor() {
    super();
    this.store = GazetteerGeoJsonStore;
    this.storeKeys = ['data'];
  }
  
  getLocationFeatures() {
    // find the feature from the state
    return this.state.data.features.find(f => f.properties.geonameId === this.props.geonameId);
  }
  
  setActiveLocation() {
    const locationFeature = this.getLocationFeatures();
    const coordinates = locationFeature.geometry.coordinates;
    const countryFeature = this.props.getCountryLayerFeatures(new L.LatLng(coordinates[1], coordinates[0]));
  
    Actions.invoke(Constants.ACTION_TRANSFORM_TO_GEOCODING, {locationFeature, countryFeature});
  }
  
  render() {
    return (
      <div className="list-group-item">
        <span className="map-it-btn"
                onClick={this.setActiveLocation.bind(this)}><Message
          k="projectinfo.locationslist.mapit"/></span>
        <p className="list-group-item-text">
          <label className='green text-large inline'>{this.props.name}:</label> {this.props.countryName}
        </p>
        <p className="list-group-item-text">
          {this.props.fclName} {this.props.fcodeName}
        </p>
      </div>
    )
  }
}

export default GazetteerResults;
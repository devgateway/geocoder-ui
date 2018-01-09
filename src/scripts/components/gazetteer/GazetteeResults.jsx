import React from 'react';
import Reflux from "reflux";
import GazetteerStore from '../../stores/GazetteerStore.es6';
import GazetteerGeoJsonStore from "../../stores/GazetteerGeoJsonStore.es6";
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import {Button} from 'react-bootstrap';
import Message from '../Message.jsx';

/**
 * This view renders the Gazetteer results.
 */
class GazetteeResults extends Reflux.Component {
  
  constructor() {
    super();
    this.store = GazetteerStore;
    this.storeKeys = ['locations'];
  }
  
  typeFilter(e) {
    Actions.invoke(Constants.ACTION_FILTER_BY_TYPE, e.target.value)
  }
  
  render() {
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
        <ListItems {...this.state.locations}/>
      </div>
    )
  }
}

/**
 * Renders a  List of locations.
 */
class ListItems extends React.Component {
  render() {
    if (!this.props.records || this.props.records.length === 0) {
      return (
        <h4> No location results found. </h4>
      )
    } else {
      return (
        <div className="list-group">
          {
            this.props.records.map((item) => {
              return <Item key={item.geonameId + item.lat + item.lng} {...item}/>
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
  
  constructor() {
    super();
    this.store = GazetteerGeoJsonStore;
    this.storeKeys = ['data'];
  }
  
  getLocationFeatures() {
    // find the feature from the state
    return this.state.data.features.find(f => f.properties.id === this.props.id);
  }
  
  setActiveLocation(data) {
    const feature = this.getLocationFeatures();
    Actions.invoke(Constants.ACTION_TRANSFORM_TO_GEOCODING, {locationFeature: feature})
  }
  
  render() {
    return (
      <div className="list-group-item">
        <Button className="map-it-btn"
                onClick={this.setActiveLocation.bind(this, this.props)}><Message
          k="projectinfo.locationslist.mapit"/></Button>
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

export default GazetteeResults;
import React from 'react';
import {PropTypes} from 'react';

import {L, Map, ZoomControl} from 'react-leaflet';
import leafletPip from 'leaflet-pip';

import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';

/*Layer*/
import LayerGroup from './layers/LayerGroup.jsx';
import GeocodingLayer from './layers/GeocodingLayer.jsx';
import CountryLayer from './layers/CountryLayer.jsx';
import GazetterLayer from './layers/GazetterLayer.jsx'

/*Controls*/
import Control from './controls/Control.jsx'; //control container
import MiniMap from './controls/MiniMap.jsx';
import CountrySelector from './controls/CountrySelector.jsx'
import CodingControls from './controls/CodingControls.jsx';

/*Dialogs*/
import DataEntryPopup from '../dialogs/DataEntry.jsx';
import DocumentRef from '../dialogs/DocumentRef.jsx';

/*Store*/
import MapStore from '../../stores/MapStore.es6';

import MapPopup from './popups/MapPopup.jsx';

require('leaflet/dist/leaflet.css');

export default class MapView extends React.Component {
  
  constructor() {
    super();
    
    this.state = MapStore.get();
    this.render = this.render.bind(this);
  }
  
  componentDidMount() {
    this.unsubscribe = MapStore.listen(this.onMapUpdated.bind(this));
  }
  
  componentWillUnmount() {
    try {
      Actions.invoke(Constants.ACTION_CLEAN_MAP_STORE);
      this.unsubscribe();
    } catch (e) {
      console.log(e)
    }
  }
  
  onMapUpdated(data) {
    this.setState(data);
  }
  
  /**
   * This is called by location onClick.
   *
   * @param latlng
   */
  getCountryLayerFeatures(latlng) {
    const countryInfo = this.queryFeatures(latlng);
    const countryFeature = (countryInfo && countryInfo.length > 0) ? countryInfo[0].feature : null;
  
    return countryFeature;
  }
  
  /**
   * Query features behind the point.
   *
   * @param latlng
   */
  queryFeatures(latlng) {
    const countryInfos = [];
    const map = this.refs.map.leafletElement;
    
    map.eachLayer(function (layer) {
      if (layer.eachLayer) {
        const countryInfo = leafletPip.pointInLayer(latlng, layer);
        if (countryInfo && countryInfo.length > 0) {
          countryInfos.push(countryInfo);
        }
      }
    });
    
    return countryInfos[0];
  }
  
  onLocationClick(e) {
    const locationFeature = e.target.feature;
    const {latlng} = e;
    const countryFeature = this.getCountryLayerFeatures(latlng);
  
    Actions.invoke(Constants.ACTION_TRANSFORM_TO_GEOCODING, {locationFeature, countryFeature})
  }
  
  onGeocodingClick(e) {
    const locationFeature = e.target.feature;
    const {latlng} = e;
    const countryFeature = this.getCountryLayerFeatures(latlng);
  
    Actions.invoke(Constants.ACTION_OPEN_DATAENTRY_POPUP, {locationFeature, countryFeature});
  }
  
  render() {
    return (
      <div id="mapContainer">
        <div className="map">
          <DocumentRef/>
          <Map {...this.state.map} ref="map">
  
            <MapPopup {...this.state.popup}>
              <DataEntryPopup/>
            </MapPopup>
            
            <MiniMap collapsed={true} position='topright' topPadding={1500} bottomPadding={40}>
              <LayerGroup name="Administrative Shapes" ref="country" showAsMiniMap={false}>
                {this.state.layers.countries ? this.state.layers.countries.map((country) => {
                  return <CountryLayer {...country}/>
                }) : null}
              </LayerGroup>
              
              <GazetterLayer name="Available Locations"
                             onFeatureClick={e => this.onLocationClick(e)}  {...this.state.layers.locations} showAsMiniMap={true} />
              <GeocodingLayer name="Geocoding" onFeatureClick={e => this.onGeocodingClick(e)} showAsMiniMap={true}  {...this.state.layers.geocoding}/>
            </MiniMap>
            
            <ZoomControl position="bottomright"/>
            
            <Control className="leaflet-control-layer-selector" position="bottomleft">
              <CountrySelector/>
            </Control>
            
            <Control bottomPadding={80} topPadding={0} className="leaflet-control-info-panel" position="topleft">
              <CodingControls id={this.props.match.params.projectID}
                              getCountryLayerFeatures={this.getCountryLayerFeatures.bind(this)}/>
            </Control>
          
          </Map>
        </div>
      </div>
    )
  }
}

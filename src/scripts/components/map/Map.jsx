import React from 'react';
import {PropTypes} from 'react';

import {L, Map, ZoomControl} from 'react-leaflet';
import leafletPip from 'leaflet-pip';

import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';

/*Layer*/
import LayerGroup from './layers/LayerGroup.jsx';
import GeocodingLayer from './layers/GeocodingLayer.jsx';

/*Controls*/
import Control from './controls/Control.jsx'; //control container

import ActionButtons from './controls/ActionButtons.jsx';
import MiniMap from './controls/MiniMap.jsx';
import CountrySelector from './controls/CountrySelector.jsx'
import CodingControls from './controls/CodingControls.jsx';

/*Popups*/
import MapPopUp from './popups/PopUp.jsx';
import LocationPopup from './popups/LocationPopup.jsx';

/*Dialogs*/
import DataEntryPopup from '../dialogs/DataEntry.jsx';

/*Store*/
import MapStore from '../../stores/Map.es6';


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
    Actions.invoke(Constants.ACTION_CLEAN_MAP_STORE);
    this.unsubscribe();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.activeLocation && nextState.activeLocation != this.state.activeLocation) {
      this.setActiveLocation(nextState.activeLocation);
    }
    if (nextState.activeDataentry && nextState.activeDataentry != this.state.activeDataentry) {
      this.setActiveLocation(nextState.activeDataentry, true);
    }
  }

  onMapUpdated(data) {
    this.setState(data);
  }

  /*
    This is called by location onClick
    */
  locationClick(e) {
    debugger;
    //using geonames lat and lng instead of event latlng should be more precise.
    let countryInfo = this.queryFeatures(e.latlng);
    let countryFeature = (countryInfo && countryInfo.length > 0) ? countryInfo[0].feature : null;
    let locationFeature = e.target.feature
    const {latlng} = e;
    //at this stage I have the location feature + country feature
    Actions.invoke(Constants.ACTION_POPUP_INFO, {
      locationFeature, countryFeature, 'position': latlng
    })
  }

  /*Query features behind the point*/
  queryFeatures(latlng, layer) {
    debugger;
    let countryInfos = [];
    const map = this.refs.map.leafletElement
    map.eachLayer(function (layer) {
      if (layer.eachLayer) {
        let countryInfo = leafletPip.pointInLayer(latlng, layer);
        if (countryInfo && countryInfo.length > 0) {
          countryInfos.push(countryInfo);
        }
      }
    });
    return countryInfos[0];
  }

  /* Pass on location click from location list window, make selected location active and show popup */
  setActiveLocation(location, showDataEntry) {
    debugger;
    let countryInfo = this.queryFeatures([location.lng, location.lat], this.refs.country.leafletElement);
    let countryFeature = (countryInfo && countryInfo.length > 0) ? countryInfo[0].feature : null;
    this.refs.map.leafletElement.panTo({lat: location.lat, lng: location.lng});//center the map at point
    Actions.invoke(Constants.ACTION_POPUP_INFO, {
      locationFeature: {
        properties: location
      },
      countryFeature,
      'position': [location.lat, location.lng],
      'showDataEntry': showDataEntry
    })
  }

  render() {

    return (

      <div id="mapContainer">
        <div className="map">
          <DataEntryPopup/>
          <Map   {...this.state.map} ref="map">


            <MapPopUp maxWidth="850" {...this.state.popup}>
              <LocationPopup/>
            </MapPopUp>

            <MiniMap>
              <LayerGroup name="GeoCoding" showAsMiniMap={true} ref="country" showAsMiniMap={true}>
                <GeocodingLayer onFeatureClick={this.locationClick.bind(this)}  {...this.state.layers.geocoding}/>
              </LayerGroup>

            </MiniMap>


            <ZoomControl position="bottomright"/>
            <Control className="leaflet-control-layer-selector" position="bottomleft">
              <CountrySelector/>
            </Control>

            <Control className="leaflet-control-actions-buttons" position="bottomright">
              <ActionButtons/>
            </Control>

            <Control bottomPadding={80} topPadding={0} className="leaflet-control-info-panel" position="topleft">
              <CodingControls id={this.props.match.params.projectID}/>
            </Control>

          </Map>
        </div>
      </div>
    )
  }
}

import React from 'react';
import Reflux from "reflux";
import mapType from "react-leaflet/lib/propTypes/map";
import L from "leaflet";

import {Popup} from 'react-leaflet';
import DataEntryStore from "../../../stores/DataEntryStore.es6";

export default class MapPopup extends Popup {
  
  static contextTypes = {
    map: mapType,
  };
  
  static defaultProps = {
    closeOnClick:       false,
    autoClose:          false,
    keepInView:         true,
    closeButton:        false,
    closeOnEscapeKey:   false,
    autoPanPadding:     new L.Point(window.innerWidth / 2, 5) // try to center the popup
  };
  
  constructor() {
    super();
    this.unsubscribe = Reflux.initStore(DataEntryStore).listen(this.onMapUpdated.bind(this));
  }
  
  componentWillUnmount() {
    this.unsubscribe();
  }
  
  onMapUpdated(data) {
    this.setState(data);
  }
  
  componentDidUpdate(prevProps) {
    const map = this.context.map;
    
    if (this.state !== null && this.state !== undefined && this.state.showPopup === true) {
      // get the point coordinates from DataEntryStore
      const coordinates = this.state.geocoding.locationFeature.geometry.coordinates;
      
      this.leafletElement
        .setLatLng(new L.LatLng(coordinates[1], coordinates[0]))
        .openOn(map);
      
    } else {
      map.closePopup();
    }
  }
  
  /**
   * Keep this method empty!
   */
  componentDidMount() {
  };
}

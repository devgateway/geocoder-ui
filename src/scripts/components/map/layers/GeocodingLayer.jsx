import React from 'react';
import {PropTypes} from 'react';
import GeoJsonLayer from './GeoJsonLayer.jsx';

export default class GeocodingLayer extends GeoJsonLayer {

  constructor() {
    super();
  }


  pointToLayer(feature, latlng) {

    let iconClass = feature.properties.locationStatus ? ' marker geocoding-marker-' + feature.properties.locationStatus.toLowerCase() : 'marker geocoding-marker-existing';
    if (iconClass == 'geocoding-marker-location') {
      iconClass = 'location-marker';
    }
    let icon = L.divIcon({
      iconSize: [30, 30],
      className: iconClass,
      html: `<div class='text'>${feature.properties.featuresDesignation ? feature.properties.featuresDesignation.code : ''}</div>`
    });
    let marker = L.marker(latlng, {
      icon: icon,
      forceZIndex:50000
    });
    return marker
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.onFeatureClick.bind(this)
    });
    debugger;
  }

  onFeatureClick(e) {
    if (this.props.onFeatureClick) {
      this.props.onFeatureClick(e);
    }
  }

}

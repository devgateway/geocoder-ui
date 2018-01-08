import React from 'react';
import {PropTypes} from 'react';
import GeoJsonLayer from './GeoJsonLayer.jsx';

export default class GazetteerLayer extends GeoJsonLayer {
  constructor() {
    super();
  }
  
  pointToLayer(feature, latlng) {
    
    let icon = L.divIcon({
      iconSize: [30, 30],
      className: 'marker location-marker',
      html: `<div class="text">${feature.properties.fcode}</div>`
    }); //TODO:this  can be managed by a child view of the layer
    
    return L.marker(latlng, {icon: icon})
  }
  
  onEachFeature(feature, layer) {
    layer.on({
      click: this.onFeatureClick.bind(this)
    });
    
  }
  
  onFeatureClick(e) {
    this.props.onFeatureClick ? this.props.onFeatureClick(e) : null;
  }
}

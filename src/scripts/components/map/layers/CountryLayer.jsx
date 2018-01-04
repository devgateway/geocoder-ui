import React from 'react';
import {PropTypes} from 'react';
import GeoJsonLayer from './GeoJsonLayer.jsx';

export default class CountryLayer extends GeoJsonLayer {
  /**
   Set feature style
   */
  style() {
    return this.props.style;
  }
  
  /*
   set feature hlightStyle
   */
  highlightStyle() {
    return this.props.hlightStyle;
  }
  
  
  highlightFeature(e) {
    const layer = e.target;
    layer.setStyle(this.highlightStyle());
  }
  
  /*Set feature events*/
  onEachFeature(feature, layer) {
    layer.on({
      mouseover: this.highlightFeature.bind(this),
      mouseout: this.resetHighlight.bind(this)
    });
  }
  
  /*Return to original style*/
  resetHighlight(e) {
    const layer = e.target;
    layer.setStyle(this.style());
  }
}
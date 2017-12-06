import React from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';
import {Map, popup} from 'leaflet';
import {Popup} from 'react-leaflet';
import {Children} from 'react';
import Leaflet from 'leaflet'

export default class MapPopUp extends Popup {
  
  static contextTypes = {
    map: PropTypes.instanceOf(Leaflet.Map),
  };
  
  constructor() {
    super();
  }
  
  componentDidUpdate(prevProps) {
    
    const map = this.context.map;
    const {open, position} = this.props;
    
    if (open) {
      this.leafletElement.setLatLng(position);
      this.leafletElement.openOn(map);
    } else {
      map.closePopup();
    }
    
    
    if (this.leafletElement.isOpen()) {
      this.renderPopUp();
    }
  }
  
  componentDidMount() {
    /*keep this method empty*/
  };
  
  renderPopUp() {
    if (this.props.children) {
      render(
        React.cloneElement(Children.only(this.props.children), this.props),
        this.leafletElement._contentNode
      );
      console.log(this.leafletElement._contentNode.offsetWidth);
      
      this.leafletElement._updateLayout();
      this.leafletElement._updatePosition();
      this.leafletElement._adjustPan();
    } else {
      this.removePopupContent();
    }
  }
}

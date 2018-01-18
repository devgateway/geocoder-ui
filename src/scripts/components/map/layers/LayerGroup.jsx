import React from 'react';
import {LayerGroup} from 'react-leaflet';
import {featureGroup} from 'leaflet';
import {Control} from 'leaflet';

export default class Group extends LayerGroup {
  componentWillMount() {
    super.componentWillMount();
    this.leafletElement = featureGroup();
    // Add this group to layer control
    if (this.props.layerControl) {
      
      this.props.layerControl.addOverlay(this.leafletElement, this.props.name, this.props.showAsMiniMap);

    }
  }

  createLeafletElement(props) {
    return new Control.Layers(props);
  };

  render() {
    return (<div>{this.props.children}</div>)
  }
}

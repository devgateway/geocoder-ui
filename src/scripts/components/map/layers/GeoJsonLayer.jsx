import {geoJson} from 'leaflet';
import {Path} from 'react-leaflet';
import React from 'react';
import _ from "lodash"
/**
 * This class implements a geojson layer which automatically recreates him self everytime the geosjon data changes
 */
export default class GeoJsonLayer extends Path {

  componentWillMount() {

    this.leafletElement=this.createLeafletElement()
    if (this.props.layerControl) {
      this.props.layerControl.addOverlay(this.leafletElement, this.props.name, this.props.showAsMiniMap);
    }
  }

  componentWillUnmount(){
    //  this.props.layerControl.removeOverlay(this.leafletElement, this.props.name, this.props.showAsMiniMap);

  }

  createLeafletElement() {
    const {data, ...props} = this.props;

    const leafletElement = geoJson(data, Object.assign({
      'pointToLayer': this.pointToLayer.bind(this),
      'onEachFeature': this.onEachFeature.bind(this),
      'style': this.style.bind(this)
    }, props));

    if (this.props.alwaysOnTop) {
      leafletElement.bringToFront();
    }
    return leafletElement
  }

  componentDidUpdate(prevProps) {
    const {data, ...props} = this.props;

    if (this.props.data != prevProps.data) { //we should do a better work to detect data changes

      this.leafletElement.clearLayers()
      if (this.props.layerControl) {
        this.props.layerControl.removeOverlay(this.leafletElement);
      }
      if(this.props.data){
        this.leafletElement.addData(this.props.data)
      }
      if (this.props.layerControl) {
        this.props.layerControl.addOverlay(this.leafletElement, this.props.name, this.props.showAsMiniMap);
      }
    }

    this.setStyleIfChanged(prevProps, this.props);
  }

  pointToLayer(feature, latlng) {
    console.log('not implemented');
  }

  style() {
    console.log('not implemented');
  }

  onEachFeature(feature, layer) {
    console.log('not implemented');
  }
}

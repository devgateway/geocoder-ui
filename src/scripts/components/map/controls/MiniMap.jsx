import React from 'react';
import * as MiniMap from '../../../libs/mnimaps.es6';
import BaseLayerStore from '../../../stores/BaseLayers.es6';
import L from 'leaflet';
import PropTypes from 'prop-types'

 export default class MiniMapControl extends  React.Component {

    static contextTypes = {
      map: PropTypes.instanceOf(L.Map),
    };

  constructor() {
    super()
    let baseLayers = Object.assign({}, BaseLayerStore.get());
    this.state = Object.assign({overlay: {}, baseLayers: baseLayers});
  }

  componentWillMount(){
    this.leafletElement=this.createLeafletElement()

  }

  createLeafletElement() {
    const leafletElement = L.control.layers.minimap(this.state.baseLayers, this.state.overlay, {})
      leafletElement.addTo(this.context.map);

      return leafletElement;
  }

  componentWillUnmount() {

  }


  addOverlay(layer, name, showAsMiniMap) {
    if (this.leafletElement){
      this.leafletElement.addOverlay(layer, name, showAsMiniMap);
    }
  }

  removeOverlay(layer) {
    if (this.leafletElement){
      this.leafletElement.removeOverlay(layer);
    }
  }

  refresh(layer){
    if (this.leafletElement){
      this.leafletElement.refresh(layer);
    }
  }

  getClonedChildrenWithMap(extra) {
    const map = this.context.map
    const {children} = this.props;
    const props = Object.assign({map}, extra);
    return React.Children.map(children, child => {
      return child ? React.cloneElement(child, props) : null;
    });
  }

  renderChildrenWithProps(props) {

    const children = this.getClonedChildrenWithMap(props);
    return (<div style={{display: 'none'}}>{children}</div>);
  }

  render() {
    return (this.renderChildrenWithProps({layerControl: this}));
  }
}

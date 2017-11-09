//TODO: this file needs a big refactoring (TODO ADDED By @sdimunzio 31 01 2016)
import React from 'react';
import {Button} from 'react-bootstrap';
import {MapComponent, MapControl} from 'react-leaflet';
import {Control} from 'leaflet';

import * as MiniMap from '../../../libs/mnimaps.es6';
import BaseLayerStore from '../../../stores/BaseLayers.es6';
import L from 'leaflet';

import PropTypes from 'prop-types'


export default class  extends MapControl{

	static contextTypes = {
        map: PropTypes.instanceOf(L.Map),
      }


	constructor() {
		super();
		let baseLayers = Object.assign({}, BaseLayerStore.get());
		this.state =Object.assign({overlay:{} ,baseLayers: baseLayers});
	}

createLeafletElement(){
	this.state.baseLayers.OpenStreetMap.addTo(this.context.map);
	const leafletElement = L.control.layers.minimap(this.state.baseLayers, this.state.overlay, {
		collapsed: true,
		overlayBackgroundLayer: this.state.baseLayers.OpenStreetMap
	}).addTo(this.context.map);


	this.initiated=true;
return leafletElement;
}

	componentWillUnmount(){
		this.context.map.eachLayer(function(i){this.context.map.removeLayer(i);}.bind(this));//removes all layers from map
		this.leafletElement = null;
	}

	addLayer(layer,name,showAsMiniMap){
		
		if (!this.initiated){
			let newState=Object.assign({},this.state);

			newState.overlay[name]={layer,showAsMiniMap};

			this.setState(newState)
		} else {
			if (this.leafletElement){
				this.leafletElement.addOverlay(layer, name,showAsMiniMap);
			}
		}
		this.context.map.addLayer(layer);
	}

	removeLayer(layer){
		this.context.map.removeLayer(layer);
		if (this.leafletElement){
			this.leafletElement.removeLayer(layer);
		}
	}

	getClonedChildrenWithMap(extra) {
		const map= this.context.map
		const { children } = this.props;
		const props = Object.assign({map}, extra);
		return React.Children.map(children, child => {
			return child ? React.cloneElement(child, props) : null;
		});
	}

	renderChildrenWithProps(props) {
		const children = this.getClonedChildrenWithMap(props);
		return (<div style={{display: 'none'}}>{children}</div>);
	}

	render(){
		return (this.renderChildrenWithProps({layerControl:this}));
	}


}

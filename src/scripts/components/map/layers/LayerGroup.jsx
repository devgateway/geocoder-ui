import React from 'react';
import {MapLayer} from 'react-leaflet';
import { featureGroup } from 'leaflet';
import { Control } from 'leaflet';
import PropTypes from 'prop-types'

export default class LayerGroup extends MapLayer {

	getChildContext() {

	    return {layerGroup:  this.leafletElement,};
	  }

	static childContextTypes={
		layerGroup:Control.Layers
	}

	componentWillMount() {
		super.componentWillMount();
		this.leafletElement = featureGroup();
		//Add this group to layer control
		if(this.props.layerControl){
			this.props.layerControl.addLayer(this.leafletElement ,this.props.name,this.props.showAsMiniMap);
		}

	}

	createLeafletElement (props) {
			return new Control.Layers(props);
	};

	render() {
		return (<div>{this.props.children}}</div>)
	}
}

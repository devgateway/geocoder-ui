import {
    geoJson
} from 'leaflet'
import {
    Path
} from 'react-leaflet'
import React from 'react'
import Leaflet from 'leaflet'
import PropTypes from 'prop-types'

/**
 * This class implements a geojson layer which automatically recreates him self everytime the geosjon data changes
 */


export default class GeoJsonLayer extends Path {


    componentDidMount() {
        this.layerContainer.addLayer(this.leafletElement);
    };

    createLeafletElement() {
        const {data,...props} = this.props;

        const leafletElement = geoJson(data,   Object.assign({
          'pointToLayer': this.pointToLayer.bind(this),
          'onEachFeature': this.onEachFeature.bind(this),
          'style': this.style.bind(this)
        },props));

        if (this.props.alwaysOnTop) {
            leafletElement.bringToFront();
        }
        return leafletElement
    }
    componentDidUpdate(prevProps) {

        const {data,...props} = this.props;

        if (this.props.data != prevProps.data) { //we should do a better work to detect data changes
            this.layerContainer.removeLayer(this.leafletElement);
            this.leafletElement=this.createLeafletElement();
            this.layerContainer.addLayer(this.leafletElement);
        }

        this.setStyleIfChanged(prevProps, this.props);
    }



    componentWillUnmount() {
    super.componentWillUnmount();
    //this._remove();//remove this layer while unmounting the component
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

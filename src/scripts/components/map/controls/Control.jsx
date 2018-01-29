import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types'
import Leaflet from 'leaflet'

class MapControl extends React.Component {
  
  static contextTypes = {
    map: PropTypes.instanceOf(Leaflet.Map),
  }
  
  componentDidMount() {
    const map = this.context.map;
    let pos = this.props.position;
    let corner = map._controlCorners[pos];
    
    this.container = L.DomUtil.create('div', 'leaflet-control ' + this.props.className);
    
    if (pos.indexOf('bottom') !== -1) {
      corner.insertBefore(this.container, corner.firstChild);
    } else {
      corner.appendChild(this.container);
    }
    
    map.on('resize', this.onResize.bind(this), this);
    
    ReactDOM.render(this.props.children, this.container);
    
    map.on('zoomend', (a) => {
    }, this);
  }
  
  
  onResize() {
    const map = this.context.map;
    const mapHeight = map.getContainer().clientHeight;
    this.container.style.maxHeight = (mapHeight - (this.props.bottomPadding || 0) - (this.props.topPadding || 0)) + 'px';
  }
  
  render() {
    return null;
  }
}

export default MapControl;

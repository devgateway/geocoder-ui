import React from 'react';
import {Button} from 'react-bootstrap';
import Message from '../../Message.jsx'
import CountryLayersStore from '../../../stores/CountryLayersStore.es6';
import * as Actions from '../../../actions/Actions.es6'
import Constants from '../../../constants/Contants.es6';

/**
 * Renders a single Item.
 */
class LayerItem extends React.Component {
  addLayer(e) {
    Actions.invoke(Constants.ACTION_ADD_COUNTRY_LAYER, e.currentTarget.value);
  }
  
  removeLayer(e) {
    Actions.invoke(Constants.ACTION_REMOVE_COUNTRY_LAYER, e.currentTarget.value);
  }
  
  render() {
    
    return (
      <p className="list-group-item-text">
        {this.props.name}
        {this.props.loading ?
          <i className="fa fa-spinner fa-spin pull-right"></i>
          :
          (this.props.added) ?
            <Button bsStyle='warning' className='pull-right' onClick={e=>this.removeLayer(e)}
                    value={this.props.iso3}>
              <Message k="layerselector.remove"/>
            </Button>
            :
            <Button bsStyle='info' className='pull-right' onClick={e=>this.addLayer(e)}
                    value={this.props.iso3}>
              <Message k="layerselector.add"/>
            </Button>
        }
      </p>
    )
  }
}


/**
 * Renders a  List of Country Layers.
 */
class LayerList extends React.Component {
  render() {
    return (
      <div className="list-group-item">
        <div className="list-group-item-heading">
          <h4>
            <Message k="layerselector.countryboundaries"/>
            <div className="close-btn" onClick={this.props.onClose}>
              <i className='close-icon country-panel'></i>
            </div>
          </h4>
        </div>
        {
          this.props.shapeList.map((item) => {
            return <LayerItem key={item.iso2} {...item}/>
          })
        }
      </div>
    )
  }
}


export default class CountrySelector extends React.Component {
  constructor() {
    super();
    this.store = CountryLayersStore;
    this.state = {'expanded': false};
  }
  
  componentDidMount() {
    Actions.invoke(Constants.ACTION_LOAD_COUNTRY_LAYER_LIST); //loads country layer list
    this.unsuscribe = this.store.listen(this.onStoreChange.bind(this));
  }
  
  componentWillUnmount() {
    this.unsuscribe();
  }
  
  onStoreChange(storeData) {
    let newState = Object.assign(this.state, storeData);
    this.setState(newState);
  }
  
  toggle(e) {
    let newState = Object.assign(this.state, {'expanded': !this.state.expanded});
    this.setState(newState);
  }
  
  
  render() {
    return (
      <div className="leaflet-control leaflet-control-layers" id="countryLayerSelector">
        {(!this.state.expanded)
          ? <div className="leaflet-control-country-toggle" title={Message.t('layerselector.managecountrylayers')}
                 onClick={this.toggle.bind(this)}></div>
          : <div className="countries-list">
            <LayerList {...this.state} onClose={this.toggle.bind(this)}/>
          </div>
        }
      </div>
    )
  }
}

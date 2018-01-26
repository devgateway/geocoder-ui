import React from 'react';
import Reflux from "reflux";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import * as Actions from '../../../actions/Actions.es6';
import Constants from '../../../constants/Contants.es6';

import ProjectStore from '../../../stores/ProjectStore.es6';
import GazetteerStore from '../../../stores/GazetteerStore.es6';
import GazetteerResults from '../../gazetteer/GazetteerResults.jsx';
import L from 'leaflet';
import Message from '../../Message.jsx';
import SelectedLocations from '../../project/SelectedLocations.jsx';
import PanelHeading from './PanelHeading.jsx';
import AutoGeoCodedLocations from '../../project/AutoGeoCodedLocations.jsx';
import GazetteerSearch from '../../gazetteer/GazetteerSearch.jsx';
import CollapsibleControl from './CollapsibleControl.jsx';
import ActionButtons from './../controls/ActionButtons.jsx';

/**
 * This view renders the info tab view UI component.
 */
class CodingControls extends Reflux.Component {
  static propTypes = {
    getCountryLayerFeatures:  PropTypes.func.isRequired
  };
  
  constructor() {
    super();
    
    this.state = {
      expanded:   true,
      showTab:    1
    };
    
    this.stores = [ProjectStore, GazetteerStore];
  }
  
  componentDidMount() {
    const container = ReactDOM.findDOMNode(this);
    L.DomEvent.disableClickPropagation(container).disableScrollPropagation(container);
    L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);
    
    Actions.invoke(Constants.ACTION_LOAD_SINGLE_PROJECT, {id: this.props.id})
  }
  
  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }
  
  render() {
    const {project} = this.state;
    const {getCountryLayerFeatures} = this.props;
    
    let countAutogeoCoded = 0;
    let countSelected = 0;
    if (this.state.project.locations !== undefined) {
      countAutogeoCoded = this.state.project.locations.filter(location => location.locationStatus === Constants.AUTO_CODED).length;
      countSelected = this.state.project.locations.filter(location => location.locationStatus !== Constants.AUTO_CODED && location.locationStatus !== Constants.DELETED).length;
    }
    
    let activeTab = this.state.showTab || 1;
    return (
      <div className="leaflet-control leaflet-control-layers" id="infoControl">
        {(!this.state.expanded)
          ? <div className="control-info-toggle" title="Info Panel" onClick={this.toggle.bind(this)}></div>
          : <div id="project-info">
            <div className="panel panel-success">
              <PanelHeading project={project}  toggle={this.toggle.bind(this)} countAutogeoCoded={countAutogeoCoded} countSearch={this.state.locations.records.length}/>
              <div className="tab-container no-padding">
                <GazetteerSearch/>
                
                { (this.state.locations.records.length > 0)
                  ? <CollapsibleControl title={"Search Results"} iconClass={"project-search-icon"} className={"gazetteer-locations"} count={this.state.locations.records.length}>
                    <div className="panel-section padded-section">
                      {Message.t('projectinfo.gazetteerlocations') + " (" + (this.state.locations.records.length) + ")"}
                      <GazetteerResults getCountryLayerFeatures={getCountryLayerFeatures}/>
                    </div>
                  </CollapsibleControl>
                  : null
                }
                
                { (countAutogeoCoded > 0)
                  ? <CollapsibleControl title={"Auto-Geocoded"} iconClass={"geocoded-icon"} className={"autogeocoded"} count={countAutogeoCoded}>
                    <AutoGeoCodedLocations {...this.state.project} getCountryLayerFeatures={getCountryLayerFeatures}/>
                  </CollapsibleControl>
                  : null
                }
                
                <CollapsibleControl title={"Selected Locations"} iconClass={"selected-locations-icon"} className={"selected-locations"} count={countSelected}>
                  <SelectedLocations {...this.state.project} getCountryLayerFeatures={getCountryLayerFeatures}/>
                </CollapsibleControl>
              </div>
  
              <ActionButtons/>
            </div>
          </div>}
      </div>
    )
  }
}

export default CodingControls;

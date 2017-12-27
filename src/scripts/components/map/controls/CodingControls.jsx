import React from 'react';
import Reflux from "reflux";
import ReactDOM from 'react-dom';
import * as Actions from '../../../actions/Actions.es6';
import Constants from '../../../constants/Contants.es6';

import ProjectStore from '../../../stores/ProjectStore.es6';
import LocationsStore from '../../../stores/LocationsStore.es6';
import GazetteeResults from '../../gazetteer/GazetteeResults.jsx';
import ProjectInfoHelp from '../../../help/ProjectInfo.es6';
import L from 'leaflet';
import Message from '../../Message.jsx';
import SelectedLocations from '../../project/SelectedLocations.jsx';
import PanelHeading from './PanelHeading.jsx';
import AutoGeoCodedLocations from '../../project/AutoGeoCodedLocations.jsx';
import GazetteerSearch from '../../gazetteer/GazetteerSearch.jsx';
import CollapsibleControl from './CollapsibleControl.jsx';


/**
 * This view renders the info tab view UI component.
 */
class CodingControls extends Reflux.Component {

  constructor() {
    super();

    this.state = {
      expanded:   true,
      showTab:    1
    };

    this.stores = [ProjectStore, LocationsStore];
  }

  componentWillUpdate(nextProps, nextState) {

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

    let activeTab = this.state.showTab || 1;
    return (
      <div className="leaflet-control leaflet-control-layers" id="infoControl">
        {(!this.state.expanded)
          ? <div className="control-info-toggle" title="Info Panel" onClick={this.toggle.bind(this)}></div>
          : <div id="project-info">
            <div className="panel panel-success">
              <PanelHeading project={project}  toggle={this.toggle.bind(this)}/>
              <div className="tab-container no-padding">
                <GazetteerSearch/>

                <CollapsibleControl>
                  <div>{Message.t('projectinfo.gazetteerlocations') + " (" + (this.state.locations.records.length) + ")"}</div>
                  <GazetteeResults/>
                </CollapsibleControl>

                <CollapsibleControl>
                  <AutoGeoCodedLocations {...this.state.project}/>
                </CollapsibleControl>

                <CollapsibleControl>
                  <div>{Message.t('projectinfo.geocoding') + " (" + (this.state.project.locations ? this.state.project.locations.length : 0) + ")"}</div>
                  <SelectedLocations {...this.state.project}/>
                </CollapsibleControl>
              </div>
            </div>
          </div>}
      </div>
    )
  }
}

export default CodingControls;

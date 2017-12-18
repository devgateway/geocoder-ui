import React from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import * as Actions from '../../../actions/Actions.es6';
import Constants from '../../../constants/Contants.es6';
import ProjectStore from '../../../stores/ProjectStore.es6';
import LocationsStore from '../../../stores/LocationsStore.es6';
import GazetteeResults from '../../gazetteer/GazetteeResults.jsx';
import ProjectInfoHelp from '../../../help/ProjectInfo.es6';
import L from 'leaflet';
import Message from '../../Message.jsx';
import ProjectCoding from '../../project/ProjectCoding.jsx';
import PanelHeading from './PanelHeading.jsx';
import ProjectListAutoGeoCoded from '../../project/TempProjectListAutoGeocoded.jsx';
import GazetteerSearch from '../../gazetteer/GazetteerSearch.jsx';


/**
 * This view renders the info tab view UI component.
 */
class InfoPanel extends React.Component {
  
  constructor() {
    super();
    this.state = {expanded: true, project: {}, locationsCount: 0, showTab: 1};
  }
  
  componentWillMount() {
    this.unsuscribe1 = ProjectStore.listen(this.onStoreChange.bind(this));
    // this.unsuscribe2 = LocationsStore.listen(this.onLocationsLoaded.bind(this)); TODO - update this
    
    Actions.invoke(Constants.ACTION_LOAD_SINGLE_PROJECT, {id: this.props.id})
    // Actions.invoke(Constants.ACTION_LOAD_SINGLE_PROJECT, {id: this.props.id, lan: LanStore.get().lan}) TODO - use language
  }
  
  /** TODO - update this
   changeLanguage(lan) {
    Actions.invoke(Constants.ACTION_LOAD_SINGLE_PROJECT, {id: this.props.id, lan: LanStore.get().lan})
    this.forceUpdate()
  }*/
  
  componentWillUnmount() {
    this.unsuscribe1();
    this.unsuscribe2();
  }
  
  componentDidMount() {
    
    let container = ReactDOM.findDOMNode(this);
    L.DomEvent.disableClickPropagation(container).disableScrollPropagation(container);
    L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);
  }
  
  
  onLocationsLoaded(data) {
    
    let newState = Object.assign({}, this.state);
    if (data.loadingLocations) {
      Object.assign(newState, {'showTab': 3}); //if hit load locations, then show the results tab
    }
    Object.assign(newState, {'locationsCount': data.locations.toJS().records.length});
    this.setState(newState);
  }
  
  handleSelect(key) {
    let newState = Object.assign({}, this.state);
    Object.assign(newState, {'showTab': key});
    this.setState(newState);
  }
  
  onStoreChange(project) {
    let newState = Object.assign({}, this.state);
    Object.assign(newState, {project})
    this.setState(newState);
  }
  
  toggle() {
    let newState = Object.assign({}, this.state);
    Object.assign(newState, {expanded: !newState.expanded})
    this.setState(newState);
  }
  
  render() {
    // console.log(this.state);
    
    let activeTab = this.state.showTab || 1;
    return (
      <div className="leaflet-control leaflet-control-layers" id="infoControl">
        {(!this.state.expanded)
          ? <div className="control-info-toggle" title="Info Panel" onClick={this.toggle.bind(this)}></div>
          : <div id="project-info">
            <div className="panel panel-success">
              <PanelHeading project={this.state.project}/>
              <div className="tab-container no-padding">
                <GazetteerSearch/>
                <ProjectListAutoGeoCoded/>
              </div>
            </div>
            
            
            
            
            
            <div className="panel panel-success">
              <div className="close-btn" onClick={this.toggle.bind(this)}>
                <i className='fa fa-times-circle-o'></i>
              </div>
              
              <div className="tab-container">
                <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                  <Tab eventKey={2}
                       title={Message.t('projectinfo.geocoding') + " (" + (this.state.project.locations ? this.state.project.locations.length : 0) + ")"}>
                    <ProjectCoding {...this.state.project}/>
                  </Tab>
                  <Tab eventKey={3}
                       title={Message.t('projectinfo.gazetteerlocations') + " (" + (this.state.locationsCount) + ")"}>
                    <GazetteeResults/>
                  </Tab>
                </Tabs>
              </div>
            </div>
          
          </div>}
      </div>
    )
  }
}

export default InfoPanel;

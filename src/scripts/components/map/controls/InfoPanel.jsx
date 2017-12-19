import React from 'react';
import Reflux from "reflux";
import {Tabs, Tab} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import * as Actions from '../../../actions/Actions.es6';
import Constants from '../../../constants/Contants.es6';
import LangStore from '../../../stores/LangStore.es6';
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
class InfoPanel extends Reflux.Component {
  
  constructor() {
    super();
    
    this.state = {
      expanded: true,
      project: {},
      showTab: 1
    };
    
    this.stores = [LocationsStore, LangStore];
  }
  
  componentWillMount() {
    super.componentWillMount();
    
    this.unsuscribe = ProjectStore.listen(this.onStoreChange.bind(this));
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (this.state.lang !== nextState.lang) {
      Actions.invoke(Constants.ACTION_LOAD_SINGLE_PROJECT, {id: this.props.id, lang: this.state.lang})
    }
  }
  
  componentDidMount() {
    Actions.invoke(Constants.ACTION_LOAD_SINGLE_PROJECT, {id: this.props.id, lang: this.state.lang});
    
    const container = ReactDOM.findDOMNode(this);
    L.DomEvent.disableClickPropagation(container).disableScrollPropagation(container);
    L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);
  }
  
  componentWillUnmount() {
    super.componentWillUnmount();
    this.unsuscribe();
  }
  
  handleSelect(key) {
    let newState = Object.assign({}, this.state);
    Object.assign(newState, {'showTab': key});
    this.setState(newState);
  }
  
  onStoreChange(project) {
    let newState = Object.assign({}, this.state);
    Object.assign(newState, {project});
    this.setState(newState);
  }
  
  toggle() {
    let newState = Object.assign({}, this.state);
    Object.assign(newState, {expanded: !newState.expanded});
    this.setState(newState);
  }
  
  render() {
    const {project, lang} = this.state;
    
    let activeTab = this.state.showTab || 1;
    return (
      <div className="leaflet-control leaflet-control-layers" id="infoControl">
        {(!this.state.expanded)
          ? <div className="control-info-toggle" title="Info Panel" onClick={this.toggle.bind(this)}></div>
          : <div id="project-info">
            <div className="panel panel-success">
              <PanelHeading project={project} lang={lang}/>
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
                       title={Message.t('projectinfo.gazetteerlocations') + " (" + (this.state.locations.records.length) + ")"}>
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

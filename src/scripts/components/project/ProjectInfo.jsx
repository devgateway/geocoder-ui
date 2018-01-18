import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import Message from '../Message.jsx';
import MultiLingualText from '../MultiLingualText.jsx';
import Constants from "../../constants/Contants.es6";
import {OverlayTrigger, Tooltip, Button, Modal} from "react-bootstrap";
import * as Actions from "../../actions/Actions.es6";

/**
 * Component that displays main information related to a project.
 */
class ProjectInfo extends React.Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    lang:    PropTypes.string.isRequired,
  };
  
  constructor() {
    super();
    
    this.state = {
      showModal: false,
    };
  }
  
  /**
   * Function that determines the color code for an activity.
   */
  activityClass(locations) {
    if (locations === undefined || locations.length === 0) {
      return "bs-callout-warning";
    }
    
    for(let i = 0; i < locations.length; i++) {
      if (locations[i].locationStatus === Constants.AUTO_CODED) {
        return "bs-callout-info";
      }
    }
    
    return "bs-callout-success";
  }
  
  getGeocodeText(locations) {
    for(let i = 0; i < locations.length; i++) {
      if (locations[i].locationStatus === Constants.AUTO_CODED) {
        return <Message k="projectlist.verifyproject"/>
      }
    }
    
    return <Message k="projectlist.geocodeproject"/>;
  }
  
  /**
   * Close the "delete project" modal.
   */
  cancelModal() {
    let newState = Object.assign({}, this.state);
    Object.assign(newState, {
      showModal: false,
    });
    this.setState(newState);
  }
  
  /**
   * Open the delete confirmation modal
   */
  openConfirm() {
    let newState = Object.assign({}, this.state);
    
    Object.assign(newState, {
      showModal: true,
    });
    this.setState(newState);
  }
  
  /**
   * Make a request to delete a project
   */
  deleteProject() {
    const {project: {id}} = this.props;
    
    Actions.invoke(Constants.ACTION_DELETE_PROJECT, id);
    
    this.cancelModal();
  }
  
  render() {
    const {project: {id, queue, locations, countries, titles, descriptions, identifier}} = this.props;
    const ST_PENDING = "PENDING";
    
    return (
      <div className={"bs-callout " + this.activityClass(locations)}>
        <div className="callout-heading">
          <div className="project-id">{identifier}</div>
          <div className="country">
            <b> {countries.map(country => (<span key={country.name}>{country.name}</span>))}</b>
            <span className="delete-project pull-right" onClick={e => this.openConfirm()}/>
          </div>
        </div>
        <div className="project-panel-content">
          {(queue && queue.state === ST_PENDING)
            ? <div>
              <i className="fa fa-spinner fa-2x fa-spin pull-right loading"></i>
              <OverlayTrigger placement="bottom"
                              overlay={<Tooltip id={id}>Autogeocode in process.</Tooltip>}>
                <div className="status-link gray"><Message k="projectlist.geocodeproject"/></div>
              </OverlayTrigger>
            </div>
            : <div className="status-link"><Link to={'map/' + id}>{this.getGeocodeText(locations)}</Link></div>
          }
          
          {(queue && queue.state === ST_PENDING)
            ? <h3><MultiLingualText texts={titles}/></h3>
            : <h3><Link to={'map/' + id}><MultiLingualText texts={titles}/></Link></h3>
          }
          {<MultiLingualText texts={descriptions}/>}
        </div>
        
        
        <Modal  {...this.props} show={this.state.showModal} onHide={this.cancelModal.bind(this)}>
          <Modal.Body>
            <h2 className="list-group-item-heading">
              <Message k="submitgeocoding.deletemessage"/>
            </h2>
            <hr/>
            <Button bsStyle='danger' onClick={this.cancelModal.bind(this)}><Message k="general.no"/></Button>
            <Button bsStyle='success' className="pull-right" onClick={this.deleteProject.bind(this)}><Message
              k="general.yes"/></Button>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default ProjectInfo;

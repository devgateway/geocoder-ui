import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import Message from '../Message.jsx';
import MultiLingualText from '../MultiLingualText.jsx';
import Constants from "../../constants/Contants.es6";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

/**
 * Component that displays main information related to a project.
 */
class ProjectInfo extends React.Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    lang:    PropTypes.string.isRequired,
  };
  
  
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
  
  render() {
    const {project: {id, queue, locations, countries, titles, descriptions, identifier}} = this.props;
    const ST_PENDING = "PENDING";
    
    return (
      <div className={"bs-callout " + this.activityClass(locations)}>
        <div className="callout-heading">
          <div className="project-id">{identifier}</div>
          <div className="country">
            <b> {countries.map(country => (<span key={country.name}>{country.name}</span>))}</b>
          </div>
        </div>
        <div className="project-panel-content">
          {(queue && queue.state === ST_PENDING)
            ? <div>
              <i className="fa fa-spinner fa-2x fa-spin pull-right loading"></i>
              <OverlayTrigger placement="bottom"
                              overlay={<Tooltip id={id}>Autogeocode in process.</Tooltip>}>
                <div className="status-link gray"><Link to={'map/' + id}><Message k="projectlist.geocodeproject"/></Link></div>
              </OverlayTrigger>
            </div>
            : <div className="status-link"><Link to={'map/' + id}>{this.getGeocodeText(locations)}</Link></div>
          }
          
          <h3><Link to={'map/' + id}><MultiLingualText texts={titles}/></Link></h3>
          {<MultiLingualText texts={descriptions}/>}
        </div>
      </div>
    )
  }
}

export default ProjectInfo;

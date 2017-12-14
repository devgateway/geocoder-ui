import React from 'react';
import {Link} from 'react-router-dom';
import Message from '../Message.jsx';

/**
 * Component that displays main information related to a project.
 */
class ProjectInfo extends React.Component {
  
  /**
   * Function that determines the color code for an activity.
   */
  activityClass(locations) {
    const AUTO_CODED = "AUTO_CODED";
    
    if (locations === undefined || locations.length === 0) {
      return "bs-callout-info";
    }
    
    for(let i = 0; i < locations.length; i++) {
      if (locations[i].locationStatus === AUTO_CODED) {
        return "bs-callout-warning";
      }
    }
    
    return "bs-callout-success";
  }
  
  render() {
    const {id, locations, countries, title, description, identifier} = this.props;
    
    return (
      <div className={"bs-callout " + this.activityClass(locations)}>
        <div className="text-vertical">{identifier}</div>
        <h3><Link to={'map/' + id}>{title}</Link></h3>
        <span>
         <b> {countries.map(country => (<span key={country.name}>{country.name}</span>))}</b>
        </span>
        <p>
          {description}
        </p>
        
        <div className="pull-right"><Link to={'map/' + id}><Message k="projectlist.geocodeproject"/></Link></div>
        <br/>
      </div>
    )
  }
}

export default ProjectInfo;

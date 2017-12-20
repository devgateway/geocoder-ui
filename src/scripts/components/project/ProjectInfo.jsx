import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import Message from '../Message.jsx';
import MultiLingualText from '../MultiLingualText.jsx';
import Constants from "../../constants/Contants.es6";

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
  
  render() {
    const {lang, project: {id, locations, countries, titles, descriptions, identifier}} = this.props;
    
    return (
      <div className={"bs-callout " + this.activityClass(locations)}>
        <div className="text-vertical">{identifier}</div>
        <h3><Link to={'map/' + id}><MultiLingualText texts={titles}/></Link></h3>
        <span>
         <b> {countries.map(country => (<span key={country.name}>{country.name}</span>))}</b>
        </span>
        
        {<MultiLingualText texts={descriptions}/>}
        
        <div className="pull-right"><Link to={'map/' + id}><Message k="projectlist.geocodeproject"/></Link></div>
        <br/>
      </div>
    )
  }
}

export default ProjectInfo;

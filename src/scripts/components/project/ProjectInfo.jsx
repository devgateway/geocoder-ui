import React from 'react';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import Message from '../Message.jsx';
import Translate from '../../util/Translate';

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
    const AUTO_CODED = "AUTO_CODED";
    
    if (locations === undefined || locations.length === 0) {
      return "bs-callout-warning";
    }
    
    for(let i = 0; i < locations.length; i++) {
      if (locations[i].locationStatus === AUTO_CODED) {
        return "bs-callout-info";
      }
    }
    
    return "bs-callout-success";
  }
  
  render() {
    const {lang, project: {id, locations, countries, titles, descriptions, identifier}} = this.props;
    const title = new Translate(titles, lang);
    const description = new Translate(descriptions, lang);
    
    return (
      <div className={"bs-callout " + this.activityClass(locations)}>
        <div className="text-vertical">{identifier}</div>
        <h3><Link to={'map/' + id}>{title.getTranslation()}</Link></h3>
        <span>
         <b> {countries.map(country => (<span key={country.name}>{country.name}</span>))}</b>
        </span>
        <p>
          {description.getTranslation()}
        </p>
        
        <div className="pull-right"><Link to={'map/' + id}><Message k="projectlist.geocodeproject"/></Link></div>
        <br/>
      </div>
    )
  }
}

export default ProjectInfo;

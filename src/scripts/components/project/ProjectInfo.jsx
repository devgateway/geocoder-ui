import React from 'react';
import {Link} from 'react-router-dom';
import Message from '../Message.jsx';

/**
 * Component that displays main information related to a project.
 */
class ProjectInfo extends React.Component {
  render() {
    const {id, locations, countries, title, description, identifier} = this.props;
    
    return (
      <div className={(locations && locations.length > 0) ? 'bs-callout bs-callout-success' : 'bs-callout bs-callout-info'}>
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

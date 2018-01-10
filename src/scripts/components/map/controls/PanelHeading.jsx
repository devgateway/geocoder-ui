import React from 'react';
import PropTypes from 'prop-types';
import Message from '../../Message.jsx';
import MultiLingualText from "../../MultiLingualText.jsx";
import MultiLingualTextShowMore from "../../MultiLingualTextShowMore.jsx";

/**
 * This view renders the Project Information UI component (title, description, etc...)
 */
export default class PanelHeading extends React.Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    toggle:  PropTypes.func.isRequired,
  };
  
  render() {
    const {project, toggle} = this.props;
    
    return (
      <div className="panel-heading">
        <div className="project-icon"/>
        
        <div className="panel-content">
          <div className="project-code">{project.identifier}</div>
          
          <div className="panel-section">
            <div className="project-info-label"><MultiLingualText texts={project.titles}/></div>
            <div className="project-info">{Date(project.date)}</div>
            <div className="project-info-label">{Message.t('projectinfo.projectinfo')}</div>
            <div className="project-info">
              <MultiLingualTextShowMore texts={project.descriptions}/>
            </div>
            
            <p>
              <label className="green inline text-medium"><Message k="projectinfo.country"/>:</label>
              {project.countries ? project.countries.map((c) => {
                return (<span className="country-name" key={c.name}>{c.name}</span>)
              }) : 'N/A'}
            </p>
          </div>
        
        </div>
        
        <div className="heading-buttons">
          <ul>
            <li>
              {/*<ProjectInfoHelp parentId="project-info"/>*/}
              <span className="info-icon"/>
            </li>
            <li>
              <span className="close-icon" onClick={toggle}/>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

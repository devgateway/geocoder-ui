import React from 'react';
import PropTypes from 'prop-types';
import Message from '../../Message.jsx';
import MultiLangualText from "../../MultiLangualText";

/**
 * This view renders the Project Information UI component (title, description, etc...)
 */
export default class PanelHeading extends React.Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    toggle:  PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    const {project, toggle} = this.props;

    return (
      <div className="panel-heading">
        <div className="project-icon"/>

        <div className="panel-content">
          <div className="project-code">{project.identifier}</div>

          <div className="panel-section">
            <div className="project-info-label"><MultiLangualText texts={project.titles}/></div>
            <div className="project-info">{Date(project.date)}</div>
          </div>

          <div className="panel-section">
            <div className="project-info-label">{Message.t('projectinfo.projectinfo')}</div>
            <div className="project-info">
              <MultiLangualText texts={project.descriptions}/>
              <a href="">more</a>
            </div>

            <p>
              <label className="green inline text-medium"><Message k="projectinfo.country"/>:</label>
              {project.countries ? project.countries.map((c) => {
                return (<b key={c.name}>{c.name}</b>)
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

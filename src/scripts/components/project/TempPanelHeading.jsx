import React from 'react';
import Message from '../Message.jsx';

export default class PanelHeading extends React.Component {
  
  constructor() {
    super();
  }
  
  render() {
    return (
      <div className="panel-heading">
        <div className="project-icon"/>
        
        <div className="panel-content">
        <div className="project-code">P-MA-K00-012</div>
        
        <div className="panel-section">
          <div className="project-info-label">Project Title</div>
          <div className="project-info">Lorem Ipsum</div>
        </div>
        
        <div className="panel-section">
          <div className="project-info-label">Description</div>
          <div className="project-info">Lorem ipsum dolor sit amet, vel an simul vulputate adolescens, natum choro ne usu. Offendit scribentur his ut, ea sea dolores expetendis. Has an congue verterem, nominati quaerendum eos ut. Ius vide solum offendit an. Vitae singulis suscipiantur et cum, mandamus mnesarchum usu an. <a href="">more</a>
          </div>
        </div>
        
        </div>
        
        <div className="heading-buttons">
          <ul>
            <li>
              <span className="info-icon"/>
            </li>
            <li>
              <span className="close-icon"/>
            </li>
          </ul>
        </div>
        
      </div>
    );
  }
}

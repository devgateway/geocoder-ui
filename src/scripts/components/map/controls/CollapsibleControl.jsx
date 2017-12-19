import React from "react";
import {Button, Panel} from 'react-bootstrap';

/**
 * This is just a wrapper component that hosts a child control panel.
 */
class CollapsibleControl extends React.Component {
  constructor() {
    super();
    
    this.state = {
      open: true,
    };
  }
  
  render() {
    return (<div>
      <div className="accordion-heading" onClick={() => this.setState({ open: !this.state.open })}>
        <div className="geocoded-icon"/>
        <span className="accordion-title">Auto-Geocoded <span className="project-count">(4)</span></span>
      </div>
      <Panel collapsible expanded={this.state.open}>
        {this.props.children}
      </Panel>
    </div>)
  }
}

export default CollapsibleControl;

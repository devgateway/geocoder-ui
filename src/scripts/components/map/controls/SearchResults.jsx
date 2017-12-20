import React from "react";
import {Button, Panel} from 'react-bootstrap';

/**
 * This is just a wrapper component that hosts a child control panel.
 */
class SearchResults extends React.Component {
  constructor() {
    super();
    
    this.state = {
      open: false,
    };
  }
  
  render() {
    return (<div>
      <div className="accordion-heading" onClick={() => this.setState({ open: !this.state.open })}>
        <span className="accordion-title results-title">Search Results 
        <span className="project-count results-count">
          <span className="results-value">6</span> results founds</span></span>
        <div className="arrow-icon"></div>
      </div>
      <Panel collapsible expanded={this.state.open}>
        {this.props.children}
      </Panel>
    </div>)
  }
}

export default SearchResults;

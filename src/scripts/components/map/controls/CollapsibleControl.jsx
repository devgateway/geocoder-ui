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
      <Button className="pull-right" onClick={() => this.setState({ open: !this.state.open })}>
        expand
      </Button>
      <Panel collapsible expanded={this.state.open}>
        {this.props.children}
      </Panel>
    </div>)
  }
}

export default CollapsibleControl;

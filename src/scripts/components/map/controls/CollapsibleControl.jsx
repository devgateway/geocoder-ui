import React from "react";
import {Panel} from 'react-bootstrap';
import PropTypes from "prop-types";

/**
 * This is just a wrapper component that hosts a child control panel.
 */
class CollapsibleControl extends React.Component {
  static propTypes = {
    title:     PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    count:     PropTypes.number.isRequired,
    className: PropTypes.string
  };
  
  constructor() {
    super();
    
    this.state = {
      open: false,
    };
  }
  
  render() {
    const{title, iconClass, count, className} = this.props;
    
    return (<div className={className}>
      <div className="accordion-heading" onClick={() => this.setState({ open: !this.state.open })}>
        <div className={iconClass}/>
        <span className="accordion-title">{title} <span className="project-count">({count})</span></span>
        <div className="arrow-icon"></div>
      </div>
      <Panel collapsible expanded={this.state.open}>
        {this.props.children}
      </Panel>
    </div>)
  }
}

export default CollapsibleControl;

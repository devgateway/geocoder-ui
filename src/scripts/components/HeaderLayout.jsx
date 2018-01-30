import React from 'react';
import Reflux from "reflux";
import {Link} from 'react-router-dom';
import Message from './Message.jsx';
import LangSelector from './LangSelector.jsx';

export default class HeaderLayout extends Reflux.Component {
  onClick(location, event) {
    if (location.pathname.startsWith("/map")) {
      if (!confirm('Changes have not been saved, are you sure you want to leave?')) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
  
  render() {
    
    return (
      <div className="header">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/" onClick={this.onClick.bind(this, this.props.history.location)}>
                <Message k="header.branding"/>
                <i className="fa fa-home fa-lg home-icon"></i>
              </Link>
            
            </div>
            
            <div className="nav navbar-rigth lan-selector-container">
              <LangSelector/>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

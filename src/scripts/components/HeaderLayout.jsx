import React from 'react';
import Reflux from "reflux";
import {Link} from 'react-router-dom';
import Message from './Message.jsx';
import LangSelector from './LangSelector.jsx';

export default class HeaderLayout extends Reflux.Component {
  
  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/"><Message k="header.branding"/></Link>
            </div>
            <div className="nav navbar-left">
              <div className="separator"/>
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

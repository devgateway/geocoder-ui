import React from 'react';
import Reflux from "reflux";
import Message from './Message.jsx';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import LangSelector from './LangSelector.jsx';

export default class MapHeader extends Reflux.Component {

  constructor() {
    super();

  }


  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Message className="navbar-brand" k="header.branding"/>
            </div>
            <div className="nav navbar-left">
              <div className="separator"/>
            </div>

            <div className="nav navbar-rigth lan-selector-container">
              <LangSelector></LangSelector>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

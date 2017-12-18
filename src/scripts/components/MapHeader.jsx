import React from 'react';
import Reflux from "reflux";
import Message from './Message.jsx';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import LanStore from '../stores/LanStore.es6';

export default class MapHeader extends Reflux.Component {
  
  constructor() {
    super();
    this.store = LanStore;
  }
  
  changeLan(evt) {
    let lan = evt.target.value;
    Actions.invoke(Constants.ACTION_CHANGE_LANGUAGE, lan);
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
              <select value={this.state.lan} name="lan" className="pull-right" onChange={this.changeLan}>
                <option value="en">{Message.t('header.language.english')}</option>
                <option value="es">{Message.t('header.language.spanish')}</option>
              </select>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

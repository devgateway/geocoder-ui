import React from 'react';
import Reflux from 'reflux';
import Message from './Message.jsx';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import LangStore from '../stores/LangStore.es6';

export default class ProjectListHeader extends Reflux.Component {
  
  constructor() {
    super();
    this.store = LangStore;
  }
  
  changeLan(evt) {
    let lang = evt.target.value;
    Actions.invoke(Constants.ACTION_CHANGE_LANGUAGE, lang);
  }
  
  render() {
    return (
      <div className="header">
        <nav className="project-list-header">
          <div className="container">
              <div className="col-md-6"><h2>Projects</h2></div>
              <div className="col-md-6">Buttons</div>
          </div>
        </nav>
      </div>
    )
  }
}

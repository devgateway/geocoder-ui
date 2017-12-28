import React from 'react';
import Reflux from "reflux";
import Message from './Message.jsx';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import LangStore from '../stores/LangStore.es6';

export default class LangSelector extends Reflux.Component {

  constructor() {
    super();
    this.store = LangStore;
  }

  changeLan(evt) {
    let lang = evt.target.value;
    Actions.invoke(Constants.ACTION_CHANGE_LANGUAGE, lang);
  }

  render() {
      return (<select value={this.state.lang} name="lang" className="pull-right" onChange={this.changeLan}>
          <option value="en">{Message.t('header.language.english')}</option>
          <option value="es">{Message.t('header.language.spanish')}</option>
          <option value="fr">{Message.t('header.language.french')}</option>
        </select>)
  }
}

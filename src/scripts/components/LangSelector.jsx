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
      return (<select value={this.state.lang} name="lang" className="btn-popup-header pull-right" onChange={this.changeLan}>
        <option value="en">{Message.t('lang.en')}</option>
        <option value="es">{Message.t('lang.es')}</option>
        <option value="fr">{Message.t('lang.fr')}</option>
      </select>)
    }
}

import React from 'react';
import Reflux from 'reflux';
import i18next from 'i18next';
import LanStore from '../stores/LanStore.es6';

export default class Message extends Reflux.Component {
  
  constructor() {
    super();
    this.store = LanStore;
  }
  
  static t(k) {
    return i18next.t(k)
  }
  
  /**
   * Force update if the language was changed.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.lan !== nextState.lan;
  }
  
  render() {
    let w = i18next.t(this.props.k, this.props);
    
    return <span className={this.props.className}>{w}</span>
  }
}

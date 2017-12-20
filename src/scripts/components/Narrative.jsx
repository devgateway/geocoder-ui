import React from 'react';
import Reflux from 'reflux';
import i18next from 'i18next';
import LangStore from '../stores/LangStore.es6';

export default class Message extends Reflux.Component {

  constructor() {
    super();
    this.store = LangStore;
  }

  static t(k) {
    return i18next.t(k)
  }

  getText(){
    const text=this.props.texts;
  }

  /**
   * Force update if the language was changed OR if the this.props object changed.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.lang !== nextState.lang
      || JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  render() {

    return <span className={this.props.className}>Narrative</span>
  }
}

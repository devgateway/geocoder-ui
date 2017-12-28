import React from 'react';
import Reflux from "reflux";
import ReactDOM from 'react-dom';
import MultiLangualText from '../MultiLangualText'

class MultiLangualTextArea extends MultiLangualText {

  render() {
      return (<textarea className="form-control" name={this.props.name} id={this.props.id} value={this.getTranslation(this.props.texts,true)}  onChange={this.props.onChange}></textarea>)
    }
}


export default MultiLangualTextArea

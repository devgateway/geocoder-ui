import React from 'react';
import Reflux from "reflux";
import ReactDOM from 'react-dom';
import MultiLangualText from '../MultiLangualText'

class MultiLangualInput extends MultiLangualText {

  render() {
    debugger;
      const {lang,sources}=this.props
      const value=this.getTranslation(this.props.texts);

      return (<input type="text" className="form-control big" id="name" placeholder="name" value={value} disabled/>)
    }
}


export default MultiLangualInput

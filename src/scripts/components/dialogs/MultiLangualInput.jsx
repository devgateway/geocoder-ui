import React from 'react';
import Reflux from "reflux";
import ReactDOM from 'react-dom';
import MultiLangualText from '../MultiLangualText'

class MultiLangualInput extends MultiLangualText {


  render() {
    const value=this.getTranslation(this.props.texts,true);
    return (<input type="text" className="form-control big" name={this.props.name} id={this.props.id} placeholder="name" value={value} disabled/>)
    }
}


export default MultiLangualInput

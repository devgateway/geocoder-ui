import React from 'react';
import Reflux from "reflux";
import ReactDOM from 'react-dom';
import MultiLangualText from '../MultiLangualText'

class MultiLangualTextArea extends MultiLangualText {


  onChange(e){
    this.props.onChange(e.target.name,e.target.value,this.state.lang)
  }

  render() {
    
      return (<textarea className="form-control" name={this.props.name} id={this.props.id} value={this.getTranslation(this.props.texts,true)}  onChange={e=>this.onChange(e)}></textarea>)
    }
}


export default MultiLangualTextArea

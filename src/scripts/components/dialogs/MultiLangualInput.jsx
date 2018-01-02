import React from 'react';
import MultiLingualText from '../MultiLingualText.jsx';

class MultiLangualInput extends MultiLingualText {
  
  render() {
    const value = this.getTranslation(this.props.texts, true);
    return (<input type="text" className="form-control big" name={this.props.name} id={this.props.id} placeholder="name"
                   value={value} disabled/>)
  }
}

export default MultiLangualInput;

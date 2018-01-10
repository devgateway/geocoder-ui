import React from 'react';
import MultiLingualText from './MultiLingualText.jsx';

class MultiLingualTextShowMore extends MultiLingualText {
  /**
   * Return index for truncating a text to a specified limit.
   * Also try to prevent the truncating in the middle of a word or after a punctuation symbol.
   */
  truncateText(text, limit) {
    if (text.length > limit) {
      for (let i = limit; i > 0; i--) {
        if (text.charAt(i) === ' '
          && (text.charAt(i - 1) != ',' || text.charAt(i - 1) != '.' || text.charAt(i - 1) != ';')) {
          return i;
        }
      }
    }
    else {
      return text;
    }
  }
  
  render() {
    const value = this.getTranslation(this.props.texts, false);
    const index = this.truncateText(value, 200);
    const lessText = value.substring(0, index);
    const moreText = value.substring(index, value.length - 1);
    
    return (<div>
      <input type="checkbox" className="read-more-state" id="project-description" />
      
      <p className="read-more-wrap">{lessText}
        <span className="read-more-target">{moreText}</span>
      </p>
      
      <label htmlFor="project-description" className="read-more-trigger"></label>
    </div>)
  }
}

export default MultiLingualTextShowMore;

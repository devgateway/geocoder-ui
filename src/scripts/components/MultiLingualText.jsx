import React from 'react';
import Reflux from "reflux";
import LangStore from "../stores/LangStore.es6";
import PropTypes from "prop-types";

/**
 * Component that picks the right translation from an Array of translations.
 * The structure of the array should be the same as Narrative Entity.
 *
 * (see: AUTOGEO-85)
 */
export default class MultiLingualText extends Reflux.Component {
  static ENGLISH_LANG = "en";
  
  static propTypes = {
    texts: PropTypes.array,
  };
  
  constructor() {
    super();
    this.store = LangStore;
  }
  
  /**
   * Force update if the language was changed OR if the this.props object changed.
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.lang !== nextState.lang || JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
  
  /**
   * Get the proper translation based on the following logic:
   *  * try to find the text in the selected language OR
   *  * try to find the text in the english language OR
   *  * return the first translation available.
   */
  getTranslation(texts, exact) {
    if (texts === undefined || texts.length === 0) {
      return "";
    }
    
    const translationLanguage = texts.find(val => val.lang === this.state.lang);
    if (translationLanguage !== undefined) {
      return translationLanguage.description;
    } else {
      if (!exact) {
        const translationEnglish = texts.find(val => val.lang === MultiLangualText.ENGLISH_LANG);
        
        if (translationEnglish !== undefined) {
          return translationEnglish.description;
        }
      }
    }
    
    if (!exact) {
      return texts[0].description;
    } else {
      return "";
    }
  }
  
  render() {
    return <div>{this.getTranslation(this.props.texts, false)}</div>
  }
}

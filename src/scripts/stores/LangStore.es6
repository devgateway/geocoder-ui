import Reflux from 'reflux';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import i18next from 'i18next';

const initialState = {lang: 'en'};

class LangStore extends Reflux.Store {
  constructor() {
    super();
    this.state = initialState;
    this.listenTo(Actions.get(Constants.ACTION_CHANGE_LANGUAGE), this.setLang);
  }
  
  setLang(lang) {
    i18next.changeLanguage(lang, (err, t) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({lang: lang})
      }
    });
  }
}

export default LangStore;

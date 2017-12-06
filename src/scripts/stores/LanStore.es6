import Reflux from 'reflux';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import i18next from 'i18next';

const initialState = {lan: 'en'};

class LanStore extends Reflux.Store {
  constructor() {
    super();
    this.state = initialState;
    this.listenTo(Actions.get(Constants.ACTION_CHANGE_LANGUAGE), this.setLan);
  }
  
  setLan(lan) {
    i18next.changeLanguage(lan, (err, t) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({'lan': lan})
      }
    });
  }
}

export default LanStore;

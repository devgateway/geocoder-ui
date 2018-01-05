import Reflux from 'reflux';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';

const initialState = {
  showPopup:          true,
  currentLocationId:  undefined,
  references:         new Map()
};

class DocumentRefStore extends Reflux.Store {
  constructor() {
    super();
    this.state = initialState;
    
    this.listenTo(Actions.get(Constants.ACTION_TOGGLE_DOCUMENT_REF_POPUP), this.togglePopup);
    this.listenTo(Actions.get(Constants.ACTION_FETCH_DOCUMENT_REF), this.fetch);
    this.listenTo(Actions.get(Constants.ACTION_FETCH_DOCUMENT_REF).completed, this.completed);
    this.listenTo(Actions.get(Constants.ACTION_FETCH_DOCUMENT_REF).failed, this.failed);
  }
  
  togglePopup(currentLocationId) {
    this.setState({
      showPopup:          !this.state.showPopup,
      currentLocationId:  currentLocationId
    });
  }
  
  fetch(locationId) {
    console.log("fetch doc ref for locaiton: " + locationId);
  }
  
  completed(response) {
    this.setState({references: this.state.references.set(this.state.currentLocationId, response)});
  }
  
  failed(message) {
    console.error(`Error loading project: ${message}`);
  }
}

export default DocumentRefStore;

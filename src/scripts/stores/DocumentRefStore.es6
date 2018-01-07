import Reflux from 'reflux';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';

const initialState = {
  showPopup:          false,
  currentReferences:  undefined,
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
    let currentReferences;
    
    // if we need to show the popoup we try to get the documents from the cache or we fetch them.
    if (!this.state.showPopup) {
      currentReferences = this.state.references.get(currentLocationId);
      if (currentReferences === undefined) {
        Actions.invoke(Constants.ACTION_FETCH_DOCUMENT_REF, currentLocationId);
      }
    } else {
      currentReferences = undefined;
    }
    this.setState({
      showPopup:          !this.state.showPopup,
      currentReferences:  currentReferences,
      currentLocationId:  currentLocationId
    });
  }
  
  fetch(locationId) {
    console.log("fetch doc ref for location: " + locationId);
  }
  
  completed(response) {
    this.setState({
      currentReferences:  response,
      references:         this.state.references.set(this.state.currentLocationId, response)
    });
  }
  
  failed(message) {
    console.error(`Error loading project: ${message}`);
  }
}

export default DocumentRefStore;

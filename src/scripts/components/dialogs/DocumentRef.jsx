import React from 'react';
import Reflux from "reflux";
import {Modal, Button} from 'react-bootstrap';
import DocumentRefStore from '../../stores/DocumentRefStore.es6';
import * as Actions from '../../actions/Actions.es6'
import Constants from '../../constants/Contants.es6';

/**
 * Modal that displayes Document References for auto-geocoded locations.
 */
class DocumentRef extends Reflux.Component {
  
  constructor() {
    super();
    
    this.stores = [DocumentRefStore];
  }
  
  componentDidMount() {
    Actions.invoke(Constants.ACTION_FETCH_DOCUMENT_REF, 1989);
  }
  
  closeModal() {
    Actions.invoke(Constants.ACTION_TOGGLE_DOCUMENT_REF_POPUP);
  }
  
  render() {
    console.log(this.state);
    
    return (
      <Modal className="document-ref-dialog" show={this.state.showPopup} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1> TEST </h1>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DocumentRef;
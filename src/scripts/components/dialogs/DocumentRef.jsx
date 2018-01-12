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
  
  closeModal() {
    Actions.invoke(Constants.ACTION_TOGGLE_DOCUMENT_REF_POPUP);
  }
  
  render() {
    return (
      <Modal className="document-ref-dialog" show={this.state.showPopup} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title className="green">Location  Name / References</Modal.Title>
        </Modal.Header>
        {this.state.currentReferences !== undefined
          ? <table className="table">
            <tbody>
            <tr>
              <th>File Name</th>
              <th>Document Details</th>
              <th>Locations</th>
            </tr>
            {
              this.state.currentReferences.map(reference =>
                <tr key={reference.id} className="success">
                  <td>{reference.fileName.replace(/^.*[\\\/]/, '')}</td>
                  <td>{reference.text}</td>
                  <td>{reference.entities}</td>
                </tr>)
            }
            </tbody>
          </table>
          : null
        }
        <Modal.Footer>
          <Button onClick={this.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DocumentRef;
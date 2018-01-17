import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Link} from 'react-router';
import * as Actions from '../../../actions/Actions.es6'
import Constants from '../../../constants/Contants.es6';
import MapHelp from '../../../help/MapHelp.es6';
import Message from '../../Message.jsx'
import ReactDOM from 'react-dom';

class SubmitGeocoding extends React.Component {
  
  constructor() {
    super();
    
    this.state = {
      showModal: false,
      submit:    false,
      cancel:    false
    };
  }
  
  onSubmitCoding() {
    Actions.invoke(Constants.ACTION_SUBMIT_GEOCODING);
    this.cancel();
  }
  
  onCancelCoding() {
    this.cancel();
    window.history.back();
  }
  
  cancel() {
    let newState = Object.assign({}, this.state);
    Object.assign(newState, {
      showModal: false,
      submit:    false,
      cancel:    false
    });
    this.setState(newState);
  }
  
  openConfirm(isSubmit) {
    let newState = Object.assign({}, this.state);
    
    Object.assign(newState, {
      showModal: true,
      submit:    isSubmit,
      cancel:    !isSubmit
    });
    this.setState(newState);
  }
  
  componentDidMount() {
    let container = ReactDOM.findDOMNode(this);
    L.DomEvent.disableClickPropagation(container).disableScrollPropagation(container);
    L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);
  }
  
  render() {
    return (
      <div className="actions-container">
        <Modal  {...this.props} show={this.state.showModal && this.state.submit} onHide={this.cancel}>
          <Modal.Body>
            <h4 className="list-group-item-heading">
              <Message k="submitgeocoding.submitmessage"/>
            </h4>
            <hr/>
            <Button bsStyle='danger' onClick={this.cancel.bind(this)}><Message k="general.no"/></Button>
            <Button bsStyle='success' className="pull-right" onClick={this.onSubmitCoding.bind(this)}><Message
              k="general.yes"/></Button>
          </Modal.Body>
        </Modal>
        
        <Modal  {...this.props} show={this.state.showModal && this.state.cancel} onHide={this.cancel}>
          <Modal.Body>
            <h4 className="list-group-item-heading">
              <Message k="submitgeocoding.cancelmessage"/>
            </h4>
            <hr/>
            <Button bsStyle='danger' onClick={this.cancel.bind(this)}><Message k="general.no"/></Button>
            <Button bsStyle='success' className="pull-right" onClick={this.onCancelCoding.bind(this)}><Message
              k="general.yes"/></Button>
          </Modal.Body>
        </Modal>
        
        <MapHelp/>
        <Button bsStyle='warning' id='cancelCoding' onClick={this.openConfirm.bind(this, false)}><Message
          k="submitgeocoding.cancel"/></Button>
        <Button bsStyle='success' id='submitCoding' onClick={this.openConfirm.bind(this, true)}><Message
          k="submitgeocoding.submit"/></Button>
      </div>
    );
  }
}

export default SubmitGeocoding;
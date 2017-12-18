import React from 'react';
import Reflux from 'reflux';
import {FormControl, Button} from 'react-bootstrap';
import * as Actions from '../../actions/Actions.es6'
import LocationsStore from '../../stores/LocationsStore.es6';
import Constants from '../../constants/Contants.es6';
import Message from '../Message.jsx';
import Help from '../../help/LocationsSearch.es6';

class GazetteerSearch extends Reflux.Component {
  constructor() {
    super();
    this.store = LocationsStore;
  }
  
  doSearch() {
    Actions.invoke(Constants.ACTION_SEARCH_LOCATIONS, this.state)
  }
  
  handleChange(e) {
    let fuzzy = (e.target.name === 'fuzzy') ? !this.state.fuzzy : this.state.fuzzy;
    let country = (e.target.name === 'country') ? !this.state.country : this.state.country;
    let text = this.state.text;
    if (e.target.name === 'text') {
      text = e.target.value;
    }
    
    // TODO - here we need to update the store.
    let newState = Object.assign(this.state, {text, fuzzy, country});
    this.setState(newState);
  }
  
  handleKey(e) {
    if (e.keyCode === 13) {
      this.doSearch();
    }
  }
  
  validationState() {
    let length = this.state.text.length;
    if (length > 3) {
      return 'success';
    } else if (length > 0) {
      return 'error';
    }
  }
  
  render() {
    console.log(JSON.stringify(this.state, null, '\t'));
    
    return (
      <div id="gazetteer-search" className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <Help parentId="gazetteer-search"/>
        </div>
        
        <div className="form-group">
          <div className="separator"/>
        </div>
        
        <div className="form-group">
          <FormControl
            name="text"
            type="text" value={this.state.text}
            placeholder={Message.t('header.search.holder')}
            bsStyle={this.validationState()}
            bsSize="small" ref="text"
            onChange={this.handleChange.bind(this)}
            onKeyDown={this.handleKey.bind(this)}/>
        </div>
        
        <div className="form-group" id="fuzzydiv">
          <div className="middle">
            <FormControl type="checkbox" id="fuzzy" name="fuzzy" checked={this.state.fuzzy}
                         onChange={this.handleChange.bind(this)}/>
            <label htmlFor="fuzzy"><Message k="header.search.fuzzy"/></label>
          </div>
        </div>
        
        <div className="form-group" id="countrydiv">
          <div className="middle">
            <FormControl type="checkbox" id="country" name="country" checked={this.state.country}
                         onChange={this.handleChange.bind(this)}/>
            <label htmlFor="country"> <Message k="header.search.country"/></label>
          </div>
        </div>
        
        <div className="form-group small" id="searchdiv">
          <Button className="btn-search wide" bsStyle="success" bsSize="small" onClick={this.doSearch.bind(this)}>
            <Message k="header.search.submit"/> </Button>
        </div>
        {this.state.loadingLocations ? <i className="fa fa-spinner fa-spin"></i> : null}
      </div>
    )
  }
}

export default GazetteerSearch;
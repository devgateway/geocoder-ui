import React from 'react';
import Reflux from 'reflux';
import * as Actions from '../../actions/Actions.es6'
import GazetteerStore from '../../stores/GazetteerStore.es6';
import Constants from '../../constants/Contants.es6';
import Message from '../Message.jsx';
import Help from '../../help/LocationsSearch.es6';

/**
 * Component that performs the Gazetteer Search.
 */
class GazetteerSearch extends Reflux.Component {
  constructor() {
    super();
    this.store = GazetteerStore;
  }
  
  doSearch() {
    Actions.invoke(Constants.ACTION_SEARCH_LOCATIONS, this.state)
  }
  
  handleChange(event) {
    const text = event.target.value;
    
    Actions.invoke(Constants.ACTION_GAZETTEER_UPDATETEXT, text);
  }
  
  handleToggle(searchType) {
    Actions.invoke(Constants.ACTION_GAZETTEER_SEARCHTYPE, searchType);
  }
  
  handleKey(e) {
    if (e.keyCode === 13) {
      this.doSearch();
    }
  }
  
  render() {
    return (
      <div className="panel-section search-section">
        <div className="project-search padded-section">
          <div className="project-search-icon"/>
          {/*<Help parentId="gazetteer-search"/>*/}
          
          <div className="form-section">
            <input type="text" name="text" value={this.state.text} placeholder={Message.t('header.search.holder')}
                   onChange={this.handleChange.bind(this)}
                   onKeyDown={this.handleKey.bind(this)}/>
            
            <div className="select-section" id="fuzzydiv" onClick={this.handleToggle.bind(this, "fuzzy")}>
              <span className={"select-box " + (this.state.fuzzy ? "selected" : "")}></span>
              <span className="search-option-label"><Message k="header.search.fuzzy"/></span>
            </div>
            
            <div className="select-section" id="countrydiv" onClick={this.handleToggle.bind(this, "country")}>
              <span className={"select-box " + (this.state.country ? "selected" : "")}></span>
              <span className="search-option-label"><Message k="header.search.country"/></span>
            </div>
          </div>
          
          <button onClick={this.doSearch.bind(this)}>Go</button>
          {this.state.loadingLocations ? <i className="fa fa-spinner fa-spin"></i> : null}
        </div>
      </div>
    )
  }
}

export default GazetteerSearch;
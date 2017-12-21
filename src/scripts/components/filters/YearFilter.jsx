import React from 'react';
import Reflux from "reflux";
import {ButtonToolbar, DropdownButton} from 'react-bootstrap';
import FiltersStore from '../../stores/FiltersStore.es6';

/**
 * Component that displays the Year filter.
 */
class YearFilter extends Reflux.Component {
  constructor() {
    super();
    this.store = FiltersStore;
    this.storeKeys = ['filterYears'];
  }
  
  optionClicked() {
  
  }
  
  render() {
    
    return (<div className="filter-button-wrapper">
      <ButtonToolbar>
        <DropdownButton bsStyle="primary" bsSize="large" title="Year" id="dropdown-size-large">
          {
            this.state.filterYears.map(year => {
              return (<li key={year} className="filter-section" onClick={this.optionClicked.bind(this)}>
                <span className={"select-box selected"}></span>
                <span className="search-option-label">{year}</span>
              </li>)
            })
          }
        </DropdownButton>
      </ButtonToolbar>
    </div>)
  }
}

export default YearFilter;

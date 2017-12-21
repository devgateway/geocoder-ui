import React from 'react';
import Reflux from "reflux";
import {ButtonToolbar, DropdownButton} from 'react-bootstrap';
import FiltersStore from '../../stores/FiltersStore.es6';

/**
 * Component that displays the CountryFilter filter.
 */
class CountryFilter extends Reflux.Component {
  constructor() {
    super();
    this.store = FiltersStore;
    this.storeKeys = ['filterCountries'];
  }
  
  optionClicked() {
    
  }
  
  render() {
    return (<div className="filter-button-wrapper">
      <ButtonToolbar>
        <DropdownButton bsStyle="primary" bsSize="large" title="Country" id="dropdown-size-large">
          {
            this.state.filterCountries.map(country => {
              return (<li key={country.iso2} className="filter-section" onClick={this.optionClicked.bind(this)}>
                <span className={"select-box selected"}></span>
                <span className="search-option-label">{country.name}</span>
              </li>)
            })
          }
        </DropdownButton>
      </ButtonToolbar>
    </div>)
  }
}

export default CountryFilter;

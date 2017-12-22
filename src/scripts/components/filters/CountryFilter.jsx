import React from 'react';
import Reflux from "reflux";
import {ButtonToolbar, DropdownButton} from 'react-bootstrap';
import FiltersStore from '../../stores/FiltersStore.es6';
import * as Actions from "../../actions/Actions.es6";
import Constants from "../../constants/Contants.es6";

/**
 * Component that displays the CountryFilter filter.
 */
class CountryFilter extends Reflux.Component {
  constructor() {
    super();
    this.store = FiltersStore;
    this.storeKeys = ['filterCountries'];
  }
  
  optionClicked(index) {
    Actions.invoke(Constants.UPDATE_FILTER_SELECTION, "filterCountries", index);
  }
  
  render() {
    return (<div className="filter-button-wrapper">
      <ButtonToolbar>
        <DropdownButton className="filter-btn" title="Country" id="dropdown-size-large">
          {
            this.state.filterCountries.map((country, index) => {
              return (<li key={country.iso2} className="filter-section" onClick={this.optionClicked.bind(this, index)}>
                <span className={"select-box " + (country.selected ? "selected" : "")}></span>
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

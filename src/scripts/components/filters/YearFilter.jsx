import React from 'react';
import Reflux from "reflux";
import {ButtonToolbar, DropdownButton} from 'react-bootstrap';
import FiltersStore from '../../stores/FiltersStore.es6';
import * as Actions from "../../actions/Actions.es6";
import Constants from '../../constants/Contants.es6';

/**
 * Component that displays the Year filter.
 */
class YearFilter extends Reflux.Component {
  constructor() {
    super();
    this.store = FiltersStore;
    this.storeKeys = ['filterYears'];
  }
  
  optionClicked(index) {
    Actions.invoke(Constants.UPDATE_FILTER_SELECTION, "filterYears", index);
  }
  
  render() {
    return (<div className="filter-button-wrapper">
      <ButtonToolbar>
        <DropdownButton className="filter-btn" title="Year" id="year-dropdown">
          {
            this.state.filterYears.map((year, index) => {
              return (<li key={year.name} className="filter-section" onClick={this.optionClicked.bind(this, index)}>
                <span className={"select-box " + (year.selected ? "selected" : "")}></span>
                <span className="search-option-label">{year.name}</span>
              </li>)
            })
          }
        </DropdownButton>
      </ButtonToolbar>
    </div>)
  }
}

export default YearFilter;

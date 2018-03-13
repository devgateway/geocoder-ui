import React from 'react';
import Reflux from "reflux";
import {ButtonToolbar, DropdownButton} from 'react-bootstrap';
import FiltersStore from '../../stores/FiltersStore.es6';
import * as Actions from "../../actions/Actions.es6";
import Constants from "../../constants/Contants.es6";
import Message from '../Message.jsx';

/**
 * Component that displays the CountryFilter filter.
 */
class CountryFilter extends Reflux.Component {
  constructor() {
    super();
    this.state = {
      text:   "",
      isOpen: false
    };
    this.store = FiltersStore;
    this.storeKeys = ['filterCountries'];
  }

  optionClicked(index) {
    Actions.invoke(Constants.UPDATE_FILTER_SELECTION, "filterCountries", index);
  }

  searchTermInCountries(filterCountries, term) {
    if (term === undefined || term === "") {
      return filterCountries;
    }

    term = term.toLowerCase();
    const countries = [];

    for (let i = 0; i < filterCountries.length; i++) {
      if (filterCountries[i].iso2.toLowerCase().match(term)
        || filterCountries[i].iso3.toLowerCase().match(term)
        || filterCountries[i].name.toLowerCase().match(term)) {
        countries.push(filterCountries[i]);
      }
    }

    return countries;
  }

  handleChange(event) {
    const text = event.target.value;

    this.setState({
      text: text
    });
  }

  /**
   * Control the behaviour of the DropdownButton component.
   * We should not change the Dropdown state when the user clicks on the search input text element - in that case
   * the event will be undefined.
   */
  onToggle(isOpen, event) {
    if (event !== undefined)
      this.setState({
        isOpen: isOpen
      });
  }

  render() {
    const {text, isOpen} = this.state;
    
    return (<div className="filter-button-wrapper">
      <ButtonToolbar>
        <DropdownButton onToggle={this.onToggle.bind(this)} open={isOpen} className="filter-btn" title="Country" id="country-dropdown">
          <div className="input-group">
            <input className="form-control" value={text} placeholder={Message.t('header.search.holder')}
                   onChange={this.handleChange.bind(this)}/>
            <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
          </div>
          {
            this.searchTermInCountries(this.state.filterCountries, text).map(country => {
              return (<li key={country.iso2} className="filter-section" onClick={this.optionClicked.bind(this, country.index)}>
                <span className={"select-box " + (country.selected ? "selected" : "")}></span>
                <span className="search-option-label">{country.name} </span>
              </li>)
            })
          }
        </DropdownButton>
      </ButtonToolbar>
    </div>)
  }
}

export default CountryFilter;

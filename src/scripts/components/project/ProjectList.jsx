import React from 'react';
import Reflux from "reflux";
import {ListGroup, Pagination, Grid, Row, Col, FormControl, FormGroup, Button, ButtonToolbar, DropdownButton} from 'react-bootstrap';
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import ProjectListStore from '../../stores/ProjectListStore.es6';
import LangStore from '../../stores/LangStore.es6';
import ProjectInfo from './ProjectInfo.jsx';
import YearFilter from '../filters/YearFilter.jsx';
import CountryFilter from '../filters/CountryFilter.jsx';
import Message from '../Message.jsx';

/**
 * Component that displays a paginated list with all the projects.
 */
class ProjectList extends Reflux.Component {
  constructor() {
    super();
    this.stores = [ProjectListStore, LangStore];
  }

  componentDidMount() {
    Actions.invoke(Constants.ACTION_FETCH_FILTERS);
    Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.state.params);
  }

  handlePageChanged(page) {
    Actions.invoke(Constants.ACTION_FIND_PROJECTS_SET_PAGE, page);
  }

  handleFilterChange(event) {
    const name = event.target.name;
    const value = event.target.type === 'radio' || event.target.type === 'checkbox' ? event.target.checked :event.target.value;

    Actions.invoke(Constants.ACTION_FIND_PROJECTS_SET_PARAM, name, value);
  }

  clearFilters() {
    Actions.invoke(Constants.ACTION_CLEAR_FILTERS);
  }

  render() {
    const {lang} = this.state;

    return (
      <Grid fluid className="no-padding">

        <div className="project-header">
          <div className="container-fluid">
            <Row>
              <Col md={2} sm={2}>
                <h2>Projects</h2>
              </Col>

              <Col md={5} sm={5}>
                <FormControl className="project-header-search pull-left" type="text" name="text" value={this.state.params.text}
                             placeholder="Enter text to search" label="Text search" ref="input"
                             onChange={this.handleFilterChange.bind(this)}/>
              </Col>

              <Col md={5} sm={5}>
                <button className="action-btn">export</button>
                <button className="action-btn">import</button>
              </Col>
            </Row>
          </div>
        </div>

        <div id="container-fluid" className="filter-container">
          <Row>
            <Col md={12} className="project-search-form">
              <div className="form form-inline">
                <Col md={2} sm={2}>
                  <h3><Message k="projects.projectsCount" count={this.state.data.totalElements}/></h3>
                </Col>
                <Col md={10} className="project-list-filters">

                  <YearFilter/>
                  <CountryFilter/>
                  <div className="project-filters-btn-group">
                  <Message className="filter-group-label" k="projectlist.geocodingfilter"/>

                  <FormGroup className="spacingLg">
                    <FormControl className="no-location" type="checkbox" checked={this.state.params.withNoLocation} onChange={this.handleFilterChange.bind(this)}
                                 id="withNoLocation" name="withNoLocation"/>
                    <label className="geo-filter" htmlFor="withNoLocation" style={{color: "#f0ad4e"}}>{Message.t('projectlist.withNoLocation')}</label>

                    <FormControl className="pending-location" type="checkbox" checked={this.state.params.pendingVerification} onChange={this.handleFilterChange.bind(this)}
                                 id="pendingVerification" name="pendingVerification"/>
                    <label className="geo-filter" htmlFor="pendingVerification" style={{color: "#2ba0f7"}}>{Message.t('projectlist.pendingVerification')}</label>

                    <FormControl className="verified-location" type="checkbox" checked={this.state.params.verifiedLocation} onChange={this.handleFilterChange.bind(this)}
                                 id="verifiedLocation" name="verifiedLocation"/>
                    <label className="geo-filter" htmlFor="verifiedLocation" style={{color: "#669933"}}>{Message.t('projectlist.verifiedLocation')}</label>

                    <FormControl className="all-options" type="checkbox" onChange={this.handleFilterChange.bind(this)}
                                 checked={!this.state.params.withNoLocation && !this.state.params.pendingVerification && !this.state.params.verifiedLocation}
                                 id="allOptions" name="allOptions"/>
                    <label className="all-options" htmlFor="allOptions" style={{color: "#000"}}>{Message.t('projectlist.any')}</label>
                  </FormGroup>

                  </div>


                  <div className="clear-btn-wrapper"><Button className="pull-right" bsStyle='danger'
                          onClick={this.clearFilters.bind(this)}>Clear All Filters</Button></div>


                </Col>

              </div>
            </Col>
          </Row>
        </div>


        <div className="container-fluid project-search-results">
          <Row id="project-search-list">
            <Col md={10}>
              <ListGroup>
                {
                  this.state.data.content ? this.state.data.content.map((project) => (
                    <ProjectInfo key={project.id} lang={lang} project={project}/>)) : null
                }
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="centered">
              <Pagination next={true} maxButtons={10} prev={true} bsSize="small"
                          items={this.state.data.totalPages} activePage={this.state.params.page + 1}
                          onSelect={this.handlePageChanged.bind(this)}/>
            </Col>
          </Row>
        </div>
      </Grid>
    )
  }
}

export default ProjectList;

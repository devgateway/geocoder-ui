import React from 'react';
import Reflux from "reflux";
import {ListGroup, Pagination, Grid, Row, Col, FormControl, FormGroup} from 'react-bootstrap';
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import ProjectListStore from '../../stores/ProjectListStore.es6';
import FiltersStore from '../../stores/FiltersStore.es6';
import LangStore from '../../stores/LangStore.es6';
import ProjectInfo from './ProjectInfo.jsx';
import Message from '../Message.jsx';

/**
 * Component that displays a paginated list with all the projects.
 */
class ProjectList extends Reflux.Component {
  constructor() {
    super();
    this.stores = [ProjectListStore, FiltersStore, LangStore];
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

  render() {
    const {lang} = this.state;

    return (
      <Grid>
        <Row>
          <Col lg={12}>
            <h1>Projects</h1>
          </Col>
        </Row>
        <div id="project-search-form">

          <Row>
            <Col lg={8}>
              <FormControl type="text" name="text" value={this.state.params.text}
                           placeholder="Enter text to search" label="Text search" ref="input"
                           onChange={this.handleFilterChange.bind(this)}/>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <div className="form form-inline pull-rigth">
                <h2><Message k="projects.projectsCount" count={this.state.data.totalElements}/></h2>

                <Message k="projectlist.geocodingfilter"/>

                <FormGroup className="spacingLg">
                  <FormControl type="checkbox" checked={this.state.params.withNoLocation} onChange={this.handleFilterChange.bind(this)}
                               id="withNoLocation" name="withNoLocation"/>
                  <label htmlFor="withNoLocation" style={{color: "#f0ad4e"}}>{Message.t('projectlist.withNoLocation')}</label>

                  <FormControl type="checkbox" checked={this.state.params.pendingVerification} onChange={this.handleFilterChange.bind(this)}
                               id="pendingVerification" name="pendingVerification"/>
                  <label htmlFor="pendingVerification" style={{color: "#5bc0de"}}>{Message.t('projectlist.pendingVerification')}</label>

                  <FormControl type="checkbox" checked={this.state.params.verifiedLocation} onChange={this.handleFilterChange.bind(this)}
                               id="verifiedLocation" name="verifiedLocation"/>
                  <label htmlFor="verifiedLocation" style={{color: "#669933"}}>{Message.t('projectlist.verifiedLocation')}</label>

                  <FormControl type="checkbox" onChange={this.handleFilterChange.bind(this)}
                               id="allOptions" name="allOptions"/>
                  <label htmlFor="allOptions" style={{color: "#000"}}>{Message.t('projectlist.any')}</label>
                </FormGroup>
              </div>
            </Col>
          </Row>
        </div>

        <Row id="project-search-list">
          <Col lg={12}>
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
      </Grid>
    )
  }
}

export default ProjectList;

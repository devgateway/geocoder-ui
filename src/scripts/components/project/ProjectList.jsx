import React from 'react';
import Reflux from "reflux";
import {ListGroup, Pagination, Grid, Row, Col, FormControl, Radio, FormGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import ProjectListStore from '../../stores/ProjectListStore.es6';
import Message from '../Message.jsx';

const ProjectInfo = (props) => {
  return (
    <div
      className={(props.locations && props.locations.length > 0) ? 'bs-callout bs-callout-success' : 'bs-callout bs-callout-info'}>
      <div className="text-vertical">{props.identifier}</div>
      <h3><Link to={'map/' + props.id}>{props.title}</Link></h3>
      <span>
         <b> {props.countries.map(country => (<span key={country.name}>{country.name}</span>))}</b>
        </span>
      <p>
        {props.description}
      </p>
      
      <div className="pull-right"><Link to={'map/' + props.id}><Message k="projectlist.geocodeproject"/></Link></div>
      <br/>
    </div>
  )
};

/**
 * Component that displays a paginated list with all the projects.
 */
class ProjectList extends Reflux.Component {
  constructor() {
    super();
    this.store = ProjectListStore;
  }
  
  componentDidMount() {
    Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.state.params);
  }
  
  validationState() {
    let length = this.state.params.t ? this.state.params.t.length : 0;
    if (length > 3) return 'success';
    else if (length > 0) return 'warning';
    else if (length > 0) return 'error';
  }
  
  search() {
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
    console.log(JSON.stringify(this.state.params, null, '\t'));
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
                  <label htmlFor="withNoLocation">{Message.t('projectlist.withNoLocation')}</label>
                  
                  <FormControl type="checkbox" checked={this.state.params.pendingVerification} onChange={this.handleFilterChange.bind(this)}
                               id="pendingVerification" name="pendingVerification"/>
                  <label htmlFor="pendingVerification">{Message.t('projectlist.pendingVerification')}</label>
                  
                  <FormControl type="checkbox" checked={this.state.params.verifiedLocation} onChange={this.handleFilterChange.bind(this)}
                               id="verifiedLocation" name="verifiedLocation"/>
                  <label htmlFor="verifiedLocation">{Message.t('projectlist.verifiedLocation')}</label>
                  
                  <FormControl type="checkbox" onChange={this.handleFilterChange.bind(this)}
                               id="allOptions" name="allOptions"/>
                  <label htmlFor="allOptions">{Message.t('projectlist.any')}</label>
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
                  <ProjectInfo key={project.id} {...project}/>)) : null
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
    
    // console.log(this.state.data);
  }
}

export default ProjectList;

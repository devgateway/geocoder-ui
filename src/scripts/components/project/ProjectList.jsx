
import React from 'react';
import ReactDOM from 'react-dom';
import {ListGroup,ListGroupItem,Pagination,Grid,Row,Col,FormControl,Button}  from 'react-bootstrap';
import { Link  } from 'react-router-dom';
import  * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import Projects from '../../stores/Projects.es6';
import Message from '../Message.jsx';
import Dropzone from 'react-dropzone';


const ProjectInfo= (props)=>{
   return (
    <div className={(props.locations && props.locations.length>0)?'bs-callout bs-callout-success':'bs-callout bs-callout-info'}>
      <div className="text-vertical">{props.identifier}</div>
      <h3><Link to={'map/'+props.id}>{props.title}</Link> </h3>
        <span>
         <b> {props.countries.map(country=>(<span>{country.name}</span>))}</b>
        </span>
        <p>
          {props.description}
        </p>

        <div className="pull-right"> <Link to={'map/' + props.id}><Message k="projectlist.geocodeproject"/></Link></div>
      <br/>
    </div>
  )
}


class ProjectList extends React.Component {

  constructor() {
    super();
    const a = Projects;
    this.state = Projects.get().toJS();
  }

  componentDidMount() {
  	this.unsuscribe=Projects.listen(this.onStoreChange.bind(this));
  }

  componentWillMount(){
    Actions.invoke(Constants.ACTION_FIND_PROJECTS,this.state.params);
  }

  componentWillUnmount() {
  	this.unsuscribe()
  }

  onStoreChange(data){
    this.setState(data.toJS());
  }

  validationState() {

    let length = this.state.params.t?this.state.params.t.length:0;
    if (length > 3) return 'success';
    else if (length > 0) return 'warning';
    else if (length > 0) return 'error';
  }

  search(){
    Actions.invoke(Constants.ACTION_FIND_PROJECTS,this.state.params);
  }

  handlePageChanged(page){
    Actions.invoke(Constants.ACTION_FIND_PROJECTS_SET_PAGE,page);
  }


  handleChange(event){
    let name=event.target.name;
    let value =event.target.value;
    let param={};
    param[name]=value;
    Actions.invoke(Constants.ACTION_FIND_PROJECTS_SET_PARAM,param);

  }

  onDrop(files) {

      Actions.invoke(Constants.ACTION_SET_FILE,files);
  }


  render() {
  debugger;
 return (
      <Grid>
        <Row>
          <Col>
              <h1>Projects</h1>
          </Col>
        </Row>
        <div id="project-search-form">

          <Row>

            <Col lg={8}>
              <FormControl  type="text"
                name="t"
                value={this.state.value}
                placeholder="Enter text to search"
                label="Text search"
                ref="input"
                onChange={this.handleChange.bind(this)}/>
            </Col>


          </Row>

          <Row>
            <Col lg={12}>
              <div className="form form-inline pull-rigth">
                <label>
                  <Message k="projectlist.geocodingfilter"/>
                </label>
                <div className="form-group spacingLg">
                  <FormControl className="radio-inline" type="radio" name="withLoc" label={Message.t('projectlist.havelocations')} value="yes" checked={this.state.params.withLoc =='yes'}  onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="form-group spacingLg">
                  <FormControl className="radio-inline" type="radio" name="withLoc" label={Message.t('projectlist.nothavelocations')} value="no" checked={this.state.params.withLoc  =='no'}  onChange={this.handleChange.bind(this)}/>
                </div>
                <div className="form-group spacingLg">
                  <FormControl className="radio-inline" type="radio" name="withLoc" label={Message.t('projectlist.any')} value="none" checked={this.state.params.withLoc  =='none'}  onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row id="project-search-list">
          <Col lg={12}>
            <ListGroup>
              <h4> <Message k="projects.projectsCount" count={this.state.data.totalElements}/> </h4>
              {
                this.state.data.content?this.state.data.content.map((project) =>(<ProjectInfo  key={project.id} {...project}/>)):null
              }
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col className="centered">
              <Pagination next={true}  maxButtons={10} prev={true} bsSize="small"
              items={this.state.data.totalElements} activePage={((this.state.data.number/this.state.data.size)+1)}
              onSelect={this.handlePageChanged.bind(this)} />
          </Col>
        </Row>
      </Grid>
    )
  }
}


export default ProjectList

import React from 'react';
import {Tabs, Tab, Button, Label}  from 'react-bootstrap';
import ReactDOM from 'react-dom';
import  * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import Message from '../Message.jsx';

/*
   This view renders the Project Information UI component
   */
   export default class ProjectDescription extends React.Component {

    constructor() {
      super();
    }

    render() {
      debugger;
     return (
      <div className="panel-body">
      {this.props.description}

      <p>
      <label className="green inline text-medium"><Message k="projectinfo.country"/>:</label>
          {this.props.countries?this.props.countries.map((c)=>{return (<b key={c.name}>{c.name}</b>)}):'N/A'}
      </p>
      </div>
      );
   }
 }

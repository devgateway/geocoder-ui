import React from 'react';
import Message from '../Message.jsx';

/*
   This view renders the Project Information UI component
   */
export default class ProjectDescription extends React.Component {
  
  constructor() {
    super();
  }
  
  render() {
    return (
      <div className="panel-body">
        {this.props.description}
        
        <p>
          <label className="green inline text-medium"><Message k="projectinfo.country"/>:</label>
          {this.props.countries ? this.props.countries.map((c) => {
            return (<b key={c.name}>{c.name}</b>)
          }) : 'N/A'}
        </p>
      </div>
    );
  }
}

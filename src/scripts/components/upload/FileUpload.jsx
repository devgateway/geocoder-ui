import React from 'react';
import Reflux from "reflux";
import {Link} from 'react-router';
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import Dropzone from 'react-dropzone';
import {Button} from 'react-bootstrap';

import ImportStore from '../../stores/ImportStore.es6';
import Tooltip from "react-simple-tooltip"
/**
 * Component used to upload and import a file.
 */
class FileUpload extends Reflux.Component {
  
  constructor() {
    super();
    this.store = ImportStore;
  }
  
  toggleAutoGeocode(autoType) {
    Actions.invoke(Constants.ACTION_TOGGLE_AUTOGEOCODE, autoType);
  }
  
  toggleOverwriteProjects() {
    Actions.invoke(Constants.ACTION_TOGGLE_OVERWRITEPROJECTS);
  }
  
  onDrop(acceptedFiles) {
    Actions.invoke(Constants.ACTION_SET_FILE, acceptedFiles);
  }
  
  onRemove(name) {
    Actions.invoke(Constants.ACTION_REMOVE_FILE, name);
  }
  
  onUpload() {
    if (this.state.files.length > 0) {
      Actions.invoke(Constants.ACTION_UPLOAD_FILES, this.state);
    } else {
      Actions.invoke(Constants.ACTION_UPLOAD_FILES_VALIDATION, "Please upload some files first.");
    }
  }
  
  render() {
    return (
      <div className="container">
        <h1>Upload XML File</h1>
        <p>Only *.xml files will be accepted</p>
        <div className="dropzone">
          <Dropzone accept="text/xml, application/xml" onDrop={this.onDrop} disableClick={true} ref="dropzone">
            <p>Try dropping some files here, or click to select files to upload.</p>
            <ul>
              {
                this.state.files.map(file =>
                  <li key={file.name}> {file.name} - {file.size} bytes
                    
                    {file.status === 'LOADING'
                      ? <div className="label label-info"></div>
                      : null
                    }
                    {file.status === 'LOADING'
                      ? <div className="spinner">  <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                      </div>: null
                    }
                    
                    {file.status !== 'LOADING'? <button onClick={(e) => this.onRemove(file.name)} className="btn btn-xs btn-default link pull-right">Remove</button> : null}
                    {file.status === 'ERROR' ? <div className="label label-warning" >Failed <Tooltip content={file.message ? file.message.map(m=><div key={m} className="error-row">{m}</div>):''}>(Mouse over for details)</Tooltip></div> : null}
                    {file.status === 'DONE' ? <div className="label label-success" >Done <Tooltip content={file.message ? file.message.map(m=><div key={m} className="error-row">{m}</div>):''}>(Mouse over for statistics)</Tooltip></div> : null}
                  </li>)
              }
            </ul>
            
            {this.state.error ?
              <div className="alert alert-danger" role="alert">{this.state.error}</div> : null}
          </Dropzone>
        </div>
        
        <div className="upload-options row">
          <div className="panel panel-primary col-md-5">
            <div className="panel-heading"><b>AutoGeocode Options</b></div>
            <div className="panel-body">
              <div className="select-section" onClick={this.toggleAutoGeocode.bind(this, "autoGeocodeAll")}>
                <span className={"select-box " + (this.state.autoGeocodeAll ? "selected" : "")}></span>
                <span className="search-option-label">AutoCode ALL Projects</span>
              </div>
              <div className="select-section" onClick={this.toggleAutoGeocode.bind(this, "autoGeocodeAllWithoutLoc")}>
                <span className={"select-box " + (this.state.autoGeocodeAllWithoutLoc ? "selected" : "")}></span>
                <span className="search-option-label">AutoCode Projects Without Locations</span>
              </div>
            </div>
          </div>
          
          <div className="panel panel-danger col-md-4">
            <div className="panel-heading"><b>Import Options</b></div>
            <div className="panel-body">
              <div className="select-section" onClick={!this.state.overwriteProjects ? this.toggleOverwriteProjects.bind(this) : null}>
                <span className={"select-box " + (this.state.overwriteProjects ? "selected" : "")}></span>
                <span className="search-option-label">Overwrite Projects</span>
              </div>
              <div className="select-section" onClick={this.state.overwriteProjects ? this.toggleOverwriteProjects.bind(this) : null}>
                <span className={"select-box " + (this.state.overwriteProjects ? "" : "selected")}></span>
                <span className="search-option-label">Add New Projects ONLY</span>
              </div>
            </div>
          </div>
          
          <div className="col-md-3">
            <Button bsSize="lg" bsStyle='success' className="pull-right upload-button" onClick={e => this.onUpload()}>
              Upload and Import
            </Button>
            
            <Button bsSize="lg" bsStyle='info' className="pull-right upload-button" onClick={() => {this.refs.dropzone.open()}}>
              Add File
            </Button>
          </div>
        </div>
      </div>)
  }
  
}

export default FileUpload;

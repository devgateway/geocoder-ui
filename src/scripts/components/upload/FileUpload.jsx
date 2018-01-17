import React from 'react';
import Reflux from "reflux";
import {Link} from 'react-router';
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import Dropzone from 'react-dropzone';
import {OverlayTrigger, Tooltip, Button, Modal} from 'react-bootstrap';
import ImportStore from '../../stores/ImportStore.es6';

/**
 * Component used to upload and import a file.
 */
class FileUpload extends Reflux.Component {
  
  constructor() {
    super();
    this.store = ImportStore;
  }
  
  componentWillUnmount() {
    super.componentWillUnmount();
    Actions.invoke(Constants.ACTION_CLEAN_IMPORT_STORE);
  }
  
  toggleAutoGeocode(autoType) {
    Actions.invoke(Constants.ACTION_TOGGLE_AUTOGEOCODE, autoType);
  }
  
  toggleOverwriteProjects() {
    Actions.invoke(Constants.ACTION_TOGGLE_OVERWRITEPROJECTS);
  }
  
  onDrop(acceptedFiles) {
    const acceptedFilesSet = [];
    const ignoredFiles = [];
    
    // check for file duplicates
    acceptedFiles.forEach(file => {
      let accepted = true;
      for (let i = 0; i < acceptedFilesSet.length; i++) {
        if (file.name === acceptedFilesSet[i].name) {
          ignoredFiles.push(file.name);
          accepted = false;
          break;
        }
      }
      
      for (let i = 0; i < this.state.files.length; i++) {
        if (file.name === this.state.files[i].name) {
          ignoredFiles.push(file.name);
          accepted = false;
          break;
        }
      }
      
      if (accepted === true) {
        acceptedFilesSet.push(file);
      }
    });
    
    // if we ignored some files then we display the warning message.
    if (ignoredFiles.length !== 0) {
      let newState = Object.assign({}, this.state);
      Object.assign(newState, {
        showModal: true,
        ignoredFiles: ignoredFiles
      });
      this.setState(newState);
    }
    
    Actions.invoke(Constants.ACTION_SET_FILE, acceptedFilesSet);
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
  
  cancelModal() {
    let newState = Object.assign({}, this.state);
    Object.assign(newState, {
      showModal:    false,
      ignoredFiles: []
    });
    this.setState(newState);
  }
  
  render() {
    
    return (
      <div className="container">
        <h1>Upload XML File</h1>
        <p>Only *.xml files will be accepted</p>
        <div className="dropzone">
          <Dropzone accept="text/xml, application/xml" onDrop={this.onDrop.bind(this)} disableClick={true} style={{}} ref="dropzone">
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
                    
                    {file.status !== 'LOADING' ? <button onClick={(e) => this.onRemove(file.name)} className="btn btn-xs btn-default link pull-right">Remove</button> : null}
                    {file.status === 'ERROR'
                      ? <div className="label label-warning">
                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip id={file.name}>{file.message ? file.message.map(m=><div key={m} className="error-row">{m}</div>):''}</Tooltip>}>
                          <span>Failed (Mouse over for details)</span>
                        </OverlayTrigger>
                      </div>
                      : null
                    }
                    {file.status === 'DONE'
                      ? <div className="label label-success">
                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip id={file.name}>{file.message ? file.message.map(m=><div key={m} className="error-row">{m}</div>):''}</Tooltip>}>
                          <span>Done (Mouse over for statistics)</span>
                        </OverlayTrigger>
                      </div>
                      : null
                    }
                  </li>)
              }
            </ul>
            
            {this.state.error ?
              <div className="alert alert-danger" role="alert">{this.state.error}</div> : null}
          </Dropzone>
        </div>
        
        <div className="upload-options row">
          <div className="panel panel-primary col-md-5">
            <div className="panel-heading no-locations-background"><b>AutoGeocode Options</b></div>
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
          
          <div className="panel panel-primary col-md-4">
            <div className="panel-heading no-locations-background"><b>Import Options</b></div>
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
            <Button bsSize="lg" bsStyle='success' className="pull-right upload-button verified-locations-background" onClick={e => this.onUpload()}>
              Upload and Import
            </Button>
            
            <Button bsSize="lg" bsStyle='info' className="pull-right upload-button pending-locations-background" onClick={() => {this.refs.dropzone.open()}}>
              Add File
            </Button>
          </div>
        </div>
        
        <Modal show={this.state.showModal} onHide={this.cancelModal.bind(this)}>
          <Modal.Body>
            <h2 className="list-group-item-heading">
              Some files have already been added and they have been ignored:
              {this.state.ignoredFiles !== undefined
                ? this.state.ignoredFiles.map(file => <li key={file}>{file}</li>)
                : null}
            </h2>
            <hr/>
            <Button bsStyle='success' onClick={this.cancelModal.bind(this)}>OK</Button>
          </Modal.Body>
        </Modal>
      
      </div>)
  }
  
}

export default FileUpload;

import React from 'react';
import Reflux from "reflux";
import {Link} from 'react-router';
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import Dropzone from 'react-dropzone';
import {FormControl, Button} from 'react-bootstrap';

import ImportStore from '../../stores/ImportStore.es6';

/**
 * Component used to upload and import a file.
 */
class FileUpload extends Reflux.Component {

  constructor() {
    super();
    this.store = ImportStore;
  }

  toggleAutoGeocode() {
    Actions.invoke(Constants.ACTION_TOGGLE_AUTOGEOCODE);
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
    debugger;
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


                  {file.status === 'LOADING' ? <div className="label label-info"></div> : null}
                      {file.status === 'LOADING' ? <div class="spinner">  <div class="rect1"></div>
                        <div class="rect2"></div>
                        <div class="rect3"></div>
                        <div class="rect4"></div>
                        <div class="rect5"></div>
                      </div>: null}


                      {file.status != 'LOADING'?<button onClick={(e) => this.onRemove(file.name)} className="btn btn-xs btn-default link pull-right">Remove</button> : null}
                      {file.status === 'ERROR' ? <div className="label label-warning">Failed ({file.message})</div> : null}
                      {file.status === 'DONE' ? <div className="label label-success">Done</div> : null}

                  </li>)
              }
            </ul>

            {this.state.error ?
              <div className="alert alert-danger" role="alert">{this.state.error}</div> : null}
          </Dropzone>
        </div>

        <div className="upload-options">
          <Button bsSize="lg" bsStyle='success' className="pull-right" onClick={() => {this.refs.dropzone.open()}}>
            Add File
          </Button>

          <Button bsSize="lg" bsStyle='success' className="pull-right" onClick={e => this.onUpload()}>
            Upload and Import
          </Button>

          <div className="select-section" onClick={this.toggleAutoGeocode.bind(this)}>
            <span className={"select-box " + (this.state.autoGeocode ? "selected" : "")}></span>
            <span className="search-option-label">Auto Code Projects</span>
          </div>
        </div>
      </div>)
  }

}

export default FileUpload;

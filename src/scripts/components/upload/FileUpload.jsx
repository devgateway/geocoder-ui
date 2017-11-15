import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import * as Actions from '../../actions/Actions.es6';
import Constants from '../../constants/Contants.es6';
import Message from '../Message.jsx';
import Dropzone from 'react-dropzone';
import {ListGroup,ListGroupItem,Pagination,Grid,Row,Col,FormControl,Button}  from 'react-bootstrap';

import ImportStore from '../../stores/ImportStore.es6';
import BaseStoreComponent from '../BaseStoreComponent.es6'

class Upload extends BaseStoreComponent {

  constructor() {
     super()
     this.state={}
     this.store=ImportStore;
   }

  onDrop(acceptedFiles, rejectedFiles) {
        Actions.invoke(Constants.ACTION_SET_FILE,acceptedFiles);

  }

  onRemove(name){
    Actions.invoke(Constants.ACTION_REMOVE_FILE,name);

  }


  onUpload(){
    const files=this.store.getData().files
    if (files.length>0) {
      Actions.invoke(Constants.ACTION_UPLOAD_FILES,this.store.getData().files);
    }else{
      Actions.invoke(Constants.ACTION_UPLOAD_FILES_VALIDATION,'Shoul shoulld  some files here')
    }
  }

  render() {

    return (
        <div className="container">
          <h1>Upload XML File</h1>
          <p>Only *.xml files will be accepted</p>
          <div className="dropzone">
            <Dropzone accept="text/xml, application/xml" onDrop={this.onDrop} disableClick={true} ref="dropzone">
              <p>Try dropping some files here, or click to select files to upload.
                <ul>
                  {
                    this.store.getData().files.map(f =>

                      <li key={f.name}>{f.name} - {f.size}  bytes
                        {f.status=='ERROR'?<div className="label label-warning">Error when Loading this file</div>:null}

                        {f.status=='DONE'?<div className="label label-success">File Uploaded</div>:null}

                        <button  onClick={(e)=>this.onRemove(f.name)} className="btn btn-xs link pull-right">(remove)</button>

                      </li>)
                  }
                </ul>

                {this.store.getData().error?<div class="alert alert-danger" role="alert">{this.store.getData().error}</div>:null}
              </p>
            </Dropzone>

        </div>
          <div className="upload-options">
          <Button bsSize="small" bsStyle='success' className="pull-right" onClick={() => { this.refs.dropzone.open() }}>
            Add File
          </Button>

          <Button bsSize="small" bsStyle='success' className="pull-right" onClick={e=>this.onUpload()}>Upload and Import </Button>

          <div className="form-group" >
            <FormControl type="checkbox" name="autocode" label="Autocode Activities" value="yes"/>
            <label htmlFor="autocode">Auto Code Projects</label>
          </div>

          </div>
        </div>)
  }

}

export default Upload

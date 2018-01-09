import {createStore} from 'reflux';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import Reflux from "reflux";
import _ from "lodash"
/**
 * Stored used in {@link FileUpload} component.
 */
const initialState = {
  autoGeocode:  false,
  files:        []
};
class ImportSore extends Reflux.Store {
  constructor() {
    super();
    this.state = initialState;

    this.listenTo(Actions.get(Constants.ACTION_TOGGLE_AUTOGEOCODE), this.toggleAutoGeocode);
    this.listenTo(Actions.get(Constants.ACTION_SET_FILE), this.setFile);
    this.listenTo(Actions.get(Constants.ACTION_REMOVE_FILE), this.removeFile);
    this.listenTo(Actions.get(Constants.ACTION_UPLOAD_FILES_VALIDATION), this.setError);
    this.listenTo(Actions.get(Constants.ACTION_UPLOAD_FILES), this.upload);
    this.listenTo(Actions.get(Constants.ACTION_UPLOAD_FILES).completed, this.uploadCompleted);
    this.listenTo(Actions.get(Constants.ACTION_UPLOAD_FILES).failed, this.uploadFailed);
  }

  toggleAutoGeocode() {
    this.setState({autoGeocode: !this.state.autoGeocode});
  }

  setFile(files) {
    const newFiles = this.state.files.concat(files);

    this.setState({
      files: newFiles,
      error: undefined
    });
  }

  removeFile(name) {
    const newFiles = this.state.files.filter(file => file.name !== name);

    this.setState({
      files: newFiles
    });
  }

  setError(error) {
    this.setState({
      error
    });
  }


  upload(data){
    const newFiles = [...this.state.files];
    newFiles.map(f=>{
      f.status = 'LOADING'
      return f});
      debugger;
      
    this.setState({
      files: newFiles
    });
  }

  uploadCompleted(file) {
    const newFiles = [...this.state.files];
    const fileIndex = this.state.files.findIndex(f => f.name === file.name);
    newFiles[fileIndex].status = 'DONE';

    this.setState({
      files: newFiles
    });
  }

  uploadFailed(data) {
    const {message, file} = data;
    debugger;
    const newFiles = [...this.state.files];
    const fileIndex = this.state.files.findIndex(f => f.name === file.name);
    newFiles[fileIndex].status = 'ERROR';
    newFiles[fileIndex].message = message;

    this.setState({
      files: newFiles
    });
  }
}

export default ImportSore;

import {
    createStore
} from 'reflux';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import {
    Map,
    List,
    fromJS
} from 'immutable';
import {
    StoreMixins
} from '../mixins/StoreMixins.es6';
import i18next from 'i18next';

const initialData = fromJS({
    files: []
});
//
const ImportSore = createStore({

    initialData: initialData,

    mixins: [StoreMixins],

    init() {
        this.data = initialData;
        this.listenTo(Actions.get(Constants.ACTION_SET_FILE), 'setFile');
        this.listenTo(Actions.get(Constants.ACTION_REMOVE_FILE), 'removeFile');
        this.listenTo(Actions.get(Constants.ACTION_UPLOAD_FILES_VALIDATION), 'setError');
        this.listenTo(Actions.get(Constants.ACTION_UPLOAD_FILES).completed, 'uploadCompleted');
        this.listenTo(Actions.get(Constants.ACTION_UPLOAD_FILES).failed, 'uploadFailed');
    },

    setFile(files) {
        const newFiles = this.get().get('files').concat(List(files))
        const newData = this.get().set('files', newFiles).delete('error', )
        this.setData(newData);
    },

    removeFile(name) {
        const newData = this.get().updateIn(['files'], function(files) {
            return files.filter(function(file) {
                return file.name !== name;
            });
        });

        this.setData(newData);
    },

    setError(error) {
        this.setData(this.get().set('error', error));
    },

    uploadCompleted(file) {
      const newData = this.get().updateIn(['files'], function(files) {
        return files.update(function(files) {
          return files.update(
            files.findIndex(function(item) {
              return item.name === file.name;
            }), function(item) {
              
              item.status='DONE'
              return item
            }
          );
        });
    });
      this.setData(newData);
    },

    uploadFailed(data) {
        const {message,file} = data
          const newData = this.get().updateIn(['files'], function(files) {
            return files.update(function(files) {
              return files.update(
                files.findIndex(function(item) {
                  return item.name === file.name;
                }), function(item) {
                  
                  item.status='ERROR'
                  return item
                }
              );
            });
        });

        this.setData(newData);
    },

});

export default ImportSore;

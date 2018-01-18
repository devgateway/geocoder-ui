import {createAction, createActions} from 'reflux';

import Constants from '../constants/Contants.es6';
import Geonames from '../util/gazetteers/Geonames.es6';
import APIClient from '../util/APIClient.es6';

let actionsDef = {};

actionsDef[Constants.ACTION_FETCH_FILTERS] = {
  children: ['completed', 'failed']
};

actionsDef[Constants.ACTION_SEARCH_LOCATIONS] = {
  children: ['completed', 'failed']
};
actionsDef[Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID] = {
  children: ['completed', 'failed']
};
actionsDef[Constants.ACTION_UPDATE_ADM_FROM_GEONAMES] = {
  children: ['completed', 'failed']
};
actionsDef[Constants.ACTION_LOAD_SHAPE] = {
  children: ['completed', 'failed']
};
actionsDef[Constants.ACTION_FIND_PROJECTS] = {
  children: ['completed', 'failed']
};
actionsDef[Constants.ACTION_LOAD_SINGLE_PROJECT] = {
  children: ['completed', 'failed']
};
actionsDef[Constants.ACTION_LOAD_COUNTRY_LAYER_LIST] = {
  children: ['completed', 'failed']
};
actionsDef[Constants.ACTION_ADD_COUNTRY_LAYER] = {
  children: ['completed', 'failed']
};
actionsDef[Constants.ACTION_TOGGLE_LAYER_VISIBILITY] = {
  children: ['completed', 'failed']
};

actionsDef[Constants.ACTION_SAVE_PROJECT] = {
  children: ['completed', 'failed']
};

actionsDef[Constants.ACTION_DELETE_PROJECT] = {
  children: ['completed', 'failed']
};

actionsDef[Constants.ACTION_UPLOAD_FILES] = {
  children: ['completed', 'failed']
};

actionsDef[Constants.ACTION_DELETE] = {
  children: ['completed', 'failed']
};


actionsDef[Constants.ACTION_SHOW_DELETE_CONFIRM] = {
  children: ['completed', 'failed']
};


actionsDef[Constants.ACTION_SAVE] = {
  children: ['completed', 'failed']
};


actionsDef[Constants.ACTION_TRANSFORM_TO_GEOCODING] = {
  children: ['completed', 'failed']
};

actionsDef[Constants.ACTION_FETCH_DOCUMENT_REF] = {
  children: ['completed', 'failed']
};


/*create async actions*/
const actions = createActions(actionsDef);

/**
 * Call  action by name
 * @param  String name    [description]
 * @param  Object options [description]
 */
let invoke = (name, ...options) => {
  console.log("invoke action: " + name);
  if (!actions[name]) {
    let action = createAction();
    actions[name] = action;
  }
  actions[name](...options);
};

/**
 * Get action by name
 * @param  String name [description]
 * @return {[type]}      [description]
 */
let get = (name) => {
  if (!actions[name]) {
    let action = createAction();
    actions[name] = action;
  }
  return actions[name]
};


/************************************   Ajax calls for async actions    ************************************/
/**
 * Load all filters.
 */
actions[Constants.ACTION_FETCH_FILTERS].listen(function() {
  APIClient.getAllFilters()
    .then((results) => actions[Constants.ACTION_FETCH_FILTERS].completed(results))
    .catch((message) => actions[Constants.ACTION_FETCH_FILTERS].failed(message));
});

actions[Constants.ACTION_SEARCH_LOCATIONS].listen(function (options) {
  new Geonames(options)
    .find().then((results) => actions[Constants.ACTION_SEARCH_LOCATIONS].completed(results))
    .catch((message) => actions[Constants.ACTION_SEARCH_LOCATIONS].failed(message));
})
;
actions[Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID].listen(function (options) {
  new Geonames(options)
    .findByGeonameID().then((results) => actions[Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID].completed(results))
    .catch((message) => actions[Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID].failed(message));
});

actions[Constants.ACTION_UPDATE_ADM_FROM_GEONAMES].listen(function (options) {
  new Geonames(options)
    .findByGeonameID().then((results) => actions[Constants.ACTION_UPDATE_ADM_FROM_GEONAMES].completed(results))
    .catch((message) => actions[Constants.ACTION_UPDATE_ADM_FROM_GEONAMES].failed(message));
});

actions[Constants.ACTION_LOAD_SHAPE].listen(function (iso) {
  
  
  APIClient.getGeoJsonShape(iso).then((results) => actions[Constants.ACTION_LOAD_SHAPE].completed(results, iso))
    .catch((message) => actions[Constants.ACTION_LOAD_SHAPE].failed(message));
});

/* Load  projects asynchronously */
actions[Constants.ACTION_FIND_PROJECTS].listen(function (params) {
  APIClient.getProjectList(params)
    .then((results) => actions[Constants.ACTION_FIND_PROJECTS].completed(results))
    .catch((message) => actions[Constants.ACTION_FIND_PROJECTS].failed(message));
});

actions[Constants.ACTION_LOAD_SINGLE_PROJECT].listen(function (options) {
  APIClient.getProject(options.id)
    .then((results) => {
      
      return actions[Constants.ACTION_LOAD_SINGLE_PROJECT].completed(results)
    })
    .catch((message) => actions[Constants.ACTION_LOAD_SINGLE_PROJECT].failed(message));
});

actions[Constants.ACTION_SAVE_PROJECT].listen(function (project) {
  APIClient.saveProject(project)
    .then((results) => actions[Constants.ACTION_SAVE_PROJECT].completed(results))
    .catch((message) => actions[Constants.ACTION_SAVE_PROJECT].failed(message));
});

actions[Constants.ACTION_DELETE_PROJECT].listen(function (id) {
  APIClient.deleteProject(id)
    .then((results) => actions[Constants.ACTION_DELETE_PROJECT].completed(results))
    .catch((message) => actions[Constants.ACTION_DELETE_PROJECT].failed(message));
});

actions[Constants.ACTION_LOAD_COUNTRY_LAYER_LIST].listen(function () {
  APIClient.getCountryList().then((results) => actions[Constants.ACTION_LOAD_COUNTRY_LAYER_LIST].completed(results))
    .catch((message) => actions[Constants.ACTION_LOAD_COUNTRY_LAYER_LIST].failed(message));
});

actions[Constants.ACTION_UPLOAD_FILES].listen(function (fileStore) {
  fileStore.files.forEach(file => {
    if (!file.status) {
      APIClient.upload(file, fileStore.autoGeocodeAll, fileStore.autoGeocodeAllWithoutLoc, fileStore.overwriteProjects)
        .then((results) => {
          actions[Constants.ACTION_UPLOAD_FILES].completed(file, results.data)
        })
        .catch((ajax) => {
          console.log(ajax);
          actions[Constants.ACTION_UPLOAD_FILES].failed({
            message: ajax.response.data,
            file
          })
        });
    }
  })
});


/**
 * Load document references.
 */
actions[Constants.ACTION_FETCH_DOCUMENT_REF].listen(function(locationId) {
  APIClient.getDocumentRef(locationId)
    .then((results) => actions[Constants.ACTION_FETCH_DOCUMENT_REF].completed(results))
    .catch((message) => actions[Constants.ACTION_FETCH_DOCUMENT_REF].failed(message));
});

export {
  get,
  invoke
};

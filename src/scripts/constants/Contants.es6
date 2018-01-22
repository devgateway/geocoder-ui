export default class Constants {
  
  static AUTO_CODED = "AUTO_CODED";
  
  static ACTION_FETCH_FILTERS = 'ACTION_FETCH_FILTERS';
  static UPDATE_FILTER_SELECTION = 'UPDATE_FILTER_SELECTION';
  static SELECT_ALL_FILTER = 'SELECT_ALL_FILTER';
  static SELECT_NONE_FILTER = 'SELECT_NONE_FILTER';
  
  static ACTION_FIND_PROJECTS = 'ACTION_FIND_PROJECTS';
  static ACTION_FIND_PROJECTS_SET_PARAM = 'ACTION_FIND_PROJECTS_SET_PARAM';
  static ACTION_FIND_PROJECTS_SET_PAGE = 'ACTION_FIND_PROJECTS_SET_PAGE';
  static ACTION_CLEAR_FILTERS = 'ACTION_CLEAR_FILTERS';
  static ACTION_EXPORT_PROJECTS = 'ACTION_EXPORT_PROJECTS';
  
  static ACTION_GAZETTEER_SEARCHTYPE = 'ACTION_GAZETTEER_SEARCHTYPE';
  static ACTION_GAZETTEER_UPDATETEXT = 'ACTION_GAZETTEER_UPDATETEXT';
  static ACTION_SEARCH_LOCATIONS = 'ACTION_SEARCH_LOCATIONS';
  static ACTION_FILTER_BY_TYPE = 'ACTION_FILTER_BY_TYPE';
  
  static ACTION_LOAD_SINGLE_PROJECT = 'ACTION_LOAD_SINGLE_PROJECT';
  static ACTION_SAVE = 'ACTION_SAVE';
  static ACTION_SUBMIT_GEOCODING = 'ACTION_SUBMIT_GEOCODING';
  static ACTION_SAVE_PROJECT = 'ACTION_SAVE_PROJECT';
  static ACTION_DELETE_PROJECT = 'ACTION_DELETE_PROJECT';
  static ACTION_CLEAN_MAP_STORE = 'ACTION_CLEAN_MAP_STORE';
  
  static ACTION_LOAD_SHAPE = 'ACTION_LOAD_SHAPE';
  static ACTION_UNLOAD_SHAPE = 'ACTION_UNLOAD_SHAPE';
  
  static ACTION_SEARCH_LOCATION_BY_GEONAMEID = 'ACTION_SEARCH_LOCATION_BY_GEONAMEID'
  
  static ACTION_UPDATE_ADM_FROM_GEONAMES = 'ACTION_UPDATE_ADM_FROM_GEONAMES'
  static ACTION_UPDATE_ADM_FROM_SHAPES = 'ACTION_UPDATE_ADM_FROM_SHAPES '
  
  static ACTION_LOAD_COUNTRY_LAYER_LIST = 'ACTION_LOAD_COUNTRY_LAYER_LIST'
  
  static ACTION_COUNTRY_LAYER_ADDED_TO_MAP = 'ACTION_COUNTRY_LAYER_ADDED_TO_MAP'
  
  static ACTION_COUNTRY_LAYER_REMOVED_FROM_MAP = 'ACTION_COUNTRY_LAYER_REMOVED_FROM_MAP'
  
  static ACTION_ADD_COUNTRY_LAYER = 'ACTION_ADD_COUNTRY_LAYER'
  
  static ACTION_REMOVE_COUNTRY_LAYER = 'ACTION_REMOVE_COUNTRY_LAYER'
  
  static ACTION_CHANGE_CODING_VALUE = 'ACTION_CHANGE_CODING_VALUE'
  
  static ACTION_TOGGLE_LAYER_VISIBILITY = 'ACTION_TOGGLE_LAYER_VISIBILITY'
  
  static ACTION_OPEN_DATAENTRY_POPUP = 'ACTION_OPEN_DATAENTRY_POPUP';
  
  static ACTION_CLOSE_DATAENTRY_POPUP = 'ACTION_CLOSE_DATAENTRY_POPUP'
  
  static ACTION_CHANGE_LANGUAGE = 'ACTION_CHANGE_LANGUAGE'
  
  static ACTION_SET_FILE = 'ACTION_SET_FILE';
  static ACTION_REMOVE_FILE = 'ACTION_REMOVE_FILE';
  static ACTION_UPLOAD_FILES = 'ACTION_UPLOAD_FILES';
  static ACTION_UPLOAD_FILES_VALIDATION = 'ACTION_UPLOAD_FILES_VALIDATION';
  static ACTION_TOGGLE_AUTOGEOCODE = 'ACTION_TOGGLE_AUTOGEOCODE';
  static ACTION_TOGGLE_OVERWRITEPROJECTS = 'ACTION_TOGGLE_OVERWRITEPROJECTS';
  static ACTION_CLEAN_IMPORT_STORE = 'ACTION_CLEAN_IMPORT_STORE';
  
  static ACTION_DELETE = 'ACTION_DELETE';
  static ACTION_SHOW_DELETE_CONFIRM = 'ACTION_SHOW_DELETE_CONFIRM';
  
  static ACTION_TRANSFORM_TO_GEOCODING='ACTION_TRANSFORM_TO_GEOCODING';
  
  static ACTION_TOGGLE_DOCUMENT_REF_POPUP = 'ACTION_TOGGLE_DOCUMENT_REF_POPUP';
  static ACTION_FETCH_DOCUMENT_REF = 'ACTION_FETCH_DOCUMENT_REF';
  
  static LOCATION_CLASS_LIST = [{
    'code': '1',
    'name': 'Administrative Region',
    'language': 'en',
    'description': 'The designated geographic location is an administrative region (state, county, province, district, municipality etc.)'
  }, {
    'code': '2',
    'name': 'Populated Place',
    'language': 'en',
    'description': 'The designated geographic location is a populated place (town, village, farm etc.)'
  }, {
    'code': '3',
    'name': 'Structure',
    'language': 'en',
    'description': 'The designated geopgraphic location is a structure (such as a school or a clinic)'
  }, {
    'code': '4',
    'name': 'Other Topographical Feature',
    'language': 'en',
    'description': 'The designated geographic location is a topographical feature, such as a mountain, a river, a forest'
  }]
  
  static EXACTNESS_LIST = [{
    'code': '1',
    'name': 'Exact',
    'language': 'en',
    'description': 'The designated geographic location is exact'
  }, {
    'code': '2',
    'name': 'Approximate',
    'language': 'en',
    'description': 'The designated geographic location is approximate'
  }]
  
  
  static LOCATION_REACH_LIST = [{
    'code': '1',
    'name': 'Activity',
    'language': 'en',
    'description': 'The location specifies where the activity is carried out'
  }, {
    'code': '2',
    'name': 'Intended Beneficiaries',
    'language': 'en',
    'description': 'The location specifies where the intended beneficiaries of the activity live'
  }]
  
}

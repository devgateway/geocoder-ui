import AjaxUtil from './AjaxUtil.es6';
import Axios from 'axios';
import Settings from '../util/Settings.es6';

let settings = Settings.getInstace();

export default class ApiClient {

  /**
   * Fetches all the filters from the server.
   */
  static getAllFilters() {

    const API_BASE_URL = settings.get('API', 'API_BASE_URL');
    const ALL_FILTERS_END_POINT = settings.get('API', 'ALL_FILTERS_END_POINT');

    return new Promise((resolve, reject) => {
      AjaxUtil.get(`${API_BASE_URL}/${ALL_FILTERS_END_POINT}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(`got ${response.status}  ${response.statusText}`)
        })
    })
  }

  /**
   * Get all projects from the API
   * @return {[array]}     an array with all projects
   */
  static getProjectList(params) {
    const API_BASE_URL = settings.get('API', 'API_BASE_URL');
    const PROJECT_LIST_END_POINT = settings.get('API', 'PROJECT_LIST_END_POINT');

    return new Promise((resolve, reject) => {
      AjaxUtil.get(`${API_BASE_URL}/${PROJECT_LIST_END_POINT}`, params)
        .then((response) => {
          resolve(response.data);
        })
        .catch((response) => {
          reject(`got ${response.status}  ${response.statusText}`)
        })
    })
  }

  static getGeoJsonShape(iso) {

    const API_BASE_URL = settings.get('API', 'API_BASE_URL');
    const BOUNDARY_END_POINT = settings.get('API', 'BOUNDARY_END_POINT');
    let url = `${API_BASE_URL}/${BOUNDARY_END_POINT}?codes=${iso}`;
      return new Promise((resolve, reject) => {

        AjaxUtil.get(url)
          .then((response) => {
            resolve(response.data);
          })
          .catch((response) => {
            reject(`got ${response.status}  ${response.statusText}`)
          })
      })

  }

  static getCountryList(iso) {
    const API_BASE_URL = settings.get('API', 'API_BASE_URL');
    const COUNTRY_END_POINT = settings.get('API', 'COUNTRY_END_POINT');
    
    let url = `${API_BASE_URL}/${COUNTRY_END_POINT}`;
      return new Promise((resolve, reject) => {
        AjaxUtil.get(url)
          .then((response) => {
            resolve(response.data);
          })
          .catch((response) => {
            reject(`got ${response.status}  ${response.statusText}`)
          })
      })

  }


  /**
   * Get a project by project_id
   * @return {} project
   */
  static getProject(project_id) {
    const API_BASE_URL = settings.get('API', 'API_BASE_URL');
    const PROJECT_END_POINT = settings.get('API', 'PROJECT_END_POINT');
    return new Promise((resolve, reject) => {
      AjaxUtil.get(`${API_BASE_URL}/${PROJECT_END_POINT}/${project_id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(`got ${response.status}  ${response.statusText}`)
        })
    })
  }

  /**
   * Save a project by project_id
   * @return {} project
   */
  static saveProject(project) {
    const API_BASE_URL = settings.get('API', 'API_BASE_URL');
    const PROJECT_END_POINT = settings.get('API', 'PROJECT_END_POINT');
    let url = `${API_BASE_URL}/${PROJECT_END_POINT}/${project.id}`;

    return new Promise((resolve, reject) => {
      AjaxUtil.put(url, project)
        .then((response) => {
          resolve(response);
        })
        .catch((response) => {
          reject(`got ${response.status}  ${response.statusText}`)
        })
    })
  }

  /**
   * Uploads a file to the server.
   */
  static upload(file, autoGeocode) {
    const API_BASE_URL = settings.get('API', 'API_BASE_URL');
    const IMPORT_END_POINT = settings.get('API', 'IMPORT_END_POINT');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("autoGeocode", autoGeocode);

    return Axios.post(`${API_BASE_URL}/${IMPORT_END_POINT}`, formData, {
      headers: {"X-Requested-With": "XMLHttpRequest"},
    })
  }
}

import Axios from 'axios';
import qs from 'qs';

export default class AjaxUtil {
  static parseFilters = (filters) => {
    const parsedFilters = {};
    
    Object.keys(filters).forEach((key) => {
      if (Array.isArray(filters[key])) {
        // sort the filters before sending them to the server.
        parsedFilters[key] = filters[key].sort();
      } else {
        parsedFilters[key] = filters[key];
      }
    });
    
    return parsedFilters;
  };
  
  
  static get(url, params = {}) {
    return new Promise(
      function (resolve, reject) { // (A)
        Axios.get(url, {
          responseType: 'json',
          params: AjaxUtil.parseFilters(params),
          paramsSerializer: function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
          }
        })
          .then(function (response) {
            resolve(response);
          })
          .catch(function (response) {
            reject(response);
          });
      });
  }
  
  static post(url, data) {
    return new Promise(
      function (resolve, reject) { // (A)
        Axios.post(url, data)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (response) {
            reject(response);
          });
      });
  }
  
  
  static put(url, body = {}) {
    return new Promise(
      function (resolve, reject) {
        Axios.put(url, body)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (response) {
            reject(response);
          });
      });
  }
  
}
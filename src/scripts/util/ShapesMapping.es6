import AjaxUtil from './AjaxUtil.es6';
import Settings from './Settings.es6';

let settings = Settings.getInstace();

let util = AjaxUtil;

export default class ShapesMapping {

  static getShapeList() {
    return new Promise((resolve, reject) => {
      resolve(settings.get('SHAPES', 'LIST'));
    })
  }

}


export default class Settings {

  constructor() {
    //this.env = (document.location.host.indexOf('localhost') > -1 ? 'development' : 'production');
    this.env = (document.location.host.indexOf('localhost') > -1 ? 'development' : (document.location.host.indexOf('developmentgateway') > -1?'production':'staging'));
    console.log('runing env is '+this.env)
  }

  initialize(settings) {
    window._setting = settings;
  }


  static getInstace() {
    if (!window._setting_instance) {
      window._setting_instance = new Settings()
    }
    return window._setting_instance;
  }

  get(module, name) {
    if (!window._setting) {
      throw new Error('Settings should be initialize');
    }
    let mod = window._setting[module];
    let item = mod[name];

    if (item instanceof Array) {
      return item;
    } else if (item instanceof Object) {
      return item[this.env]; //return env based settin
    } else {
      return item;
    }
  }

  set(name, value) {
    window._setting[name] = value;
  }

  getEnv() {
    return this.env

  }

  setEnv(env) {
    this.env = env;
  }

}

window._setting_instance = null;

require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('babel-polyfill');
require('../stylesheets/main.scss');

import React from 'react';
import {render} from 'react-dom';
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import AjaxUtil from './util/AjaxUtil.es6';
import Setting from './util/Settings.es6';
import Routes from './AppRoutes.jsx'

/*
Not found view
*/
class NoMatch extends React.Component {
  render() {
    return <h1>Not found</h1>
  }
}

AjaxUtil.get('conf/settings.json').then((conf) => {
  let settings = new Setting();
  settings.initialize(conf.data);
  const options = settings.get('I18N', 'OPTIONS');
  
  i18next.use(XHR).init(options, (err, t) => {
    //if a locale was loaded
    render(<Routes/>, document.getElementById('root'))
  });
});

if (module.hot) {
  module.hot.accept();
}

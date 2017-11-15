/*webpack require directives*/

window._setting_instance=null;

require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
//require('intro.js/introjs.css');
require('babel-polyfill');
require('../stylesheets/main.scss');


import {BrowserRouter, Route, Link ,IndexRoute,Redirect} from 'react-router-dom'

import React from 'react';
import  Settings from  './util/Settings.es6';


import { render } from 'react-dom';

/*Layout elements*/
import Header  from './components/Header.jsx';
import ProjectList  from './components/project/ProjectList.jsx';
import Map from  './components/map/Map.jsx';

import Upload from  './components/upload/FileUpload.jsx';

import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import AjaxUtil from './util/AjaxUtil.es6';
import Setting from './util/Settings.es6';
import Routes from './Routes.jsx'



/*
Not found view
*/
class NoMatch extends React.Component{
	render(){
		return <h1>Not found</h1>
	}
}



AjaxUtil.get('conf/settings.json').then((conf)=>{

  let settings=new Setting();
  settings.initialize(conf.data);
  const options = settings.get('I18N', 'OPTIONS');

  i18next.use(XHR).init(options, (err, t) => {
    //if a locale was loaded
    render(<Routes/>, document.getElementById('root'))
  });
})

if (module.hot) {
    module.hot.accept();
}

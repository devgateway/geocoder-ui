

import {BrowserRouter,HashRouter, Route, Link ,IndexRoute,Redirect} from 'react-router-dom'

import React from 'react';
import  Settings from  './util/Settings.es6';


import { render } from 'react-dom';

/*Layout elements*/
import Header  from './components/Header.jsx';

import ProjectListHeader  from './components/ProjectListHeader.jsx';
import ProjectList  from './components/project/ProjectList.jsx';
import Map from  './components/map/Map.jsx';

import Upload from  './components/upload/FileUpload.jsx';


import { Router,Switch } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import Routes from './Routes.jsx'

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory()
/**
 * Root view
 */
 class MapLayout extends React.Component {
   render() {
    return (
      <div className="app">
      <Header/>
        <Map {...this.props}/>
      </div>
      )
  }
}

class ProjectListLayout extends React.Component {
  render() {
   return (
     <div>
     <ProjectListHeader/>
       <ProjectList {...this.props}/>
     </div>
     )
 }
}




 const AppRoutes=(props)=>{
   return (<Router  history={history}>
     <div>
     <nav className="navbar navbar-default">
     <div className="container-fluid">
       <div className="navbar-header">
         <a className="navbar-brand" href="#">Open Aid Geocoder</a>
       </div>
       <ul className="nav navbar-nav">
        <li><Link to="/">Project List</Link></li>
        <li><Link to="/upload">Import Activities</Link></li>
      </ul>
     </div>
    </nav>
    <Route exact path="/" component={ProjectListLayout}/>
    <Route path="/upload" component={Upload}/>
    <Route path="/map/:projectID" component={MapLayout}/>

    </div>

</Router>)
}

export default AppRoutes

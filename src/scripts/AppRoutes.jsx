import {Route} from 'react-router-dom';
import React from 'react';
import {Router} from 'react-router';

/*Layout elements*/
import HeaderLayout from './components/HeaderLayout.jsx';
import ProjectList from './components/project/ProjectList.jsx';
import MapView from './components/map/MapView.jsx';
import FileUpload from './components/upload/FileUpload.jsx';

import createHashHistory from 'history/createHashHistory';

const history = createHashHistory();

/**
 * Root view
 */
class MapLayout extends React.Component {
  render() {
    return (
      <MapView{...this.props}/>
    )
  }
}

class ProjectListLayout extends React.Component {
  render() {
    return (
      <ProjectList {...this.props}/>
    )
  }
}


const AppRoutes = (props) => {
  return (<Router history={history}>
    <div>
      <HeaderLayout/>
      
      <Route exact path="/" component={ProjectListLayout}/>
      <Route path="/upload" component={FileUpload}/>
      <Route path="/map/:projectID" component={MapLayout}/>
    </div>
  </Router>)
};

export default AppRoutes;

import React from 'react';
import Message from '../Message.jsx';

export default class PanelSearch extends React.Component {
  
  constructor() {
    super();
  }
  
  render() {
    return (
      <div className="panel-section">
                  
          <div className="project-search padded-section">
          
          <div className="project-search-icon"/>
          
          <form>
          
            <div class="form-section">
              <input type="text" id="uname" name="name"/>
              
              <div class="select-section">
                <span className="select-box selected"></span>
                <span className="search-option-label">Fuzzy</span>
              </div>
              
              <div class="select-section">
                <span className="select-box"></span>
                <span className="search-option-label">Country</span>
              </div>
              
            </div>
        
            <button>Go</button>
            
          </form>
        

        </div>
        
      </div>
    );
  }
}

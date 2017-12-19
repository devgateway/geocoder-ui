import React from 'react';
import Message from '../Message.jsx';

export default class ProjectListAutoGeoCoded extends React.Component {
  
  constructor() {
    super();
  }
  
  render() {
    return (
      <div className="panel-section">
          <div className="accordion-content">
                <ul className="project-list search-results">
                  
                  <li>
                  <div className="project-location">
                    Lobito: <span className="location-country">Angola</span>
                  </div>
                  <p>Administrative Level: Lorem Ipsum dolor sit amet.</p>
                  <div className="geocoded-btns">
                    <button className="remove">Remove</button>
                    <button className="preview">Preview</button>
                    <button className="verify">Verify</button>
                  </div>
                  </li>
                  
                  <li>
                  <div className="project-location">
                    Luanna: <span className="location-country">Angola</span>
                  </div>
                  <p>Administrative Level: Lorem Ipsum dolor sit amet.</p>
                  <div className="geocoded-btns">
                    <button className="remove">Remove</button>
                    <button className="preview">Preview</button>
                    <button className="verify">Verify</button>
                  </div>
                  </li>
                  
                  
                  <li>
                  <div className="project-location">
                    Zaire: <span className="location-country">Angola</span>
                  </div>
                  <p>Administrative Level: Typically, Lorem Ipsum text consists of a jumbled section of De finibus bonorum et malorum.</p>
                  <div className="geocoded-btns">
                    <button className="remove">Remove</button>
                    <button className="preview">Preview</button>
                    <button className="verify">Verify</button>
                  </div>
                  </li>
                
                </ul>        
        </div>
      </div>
    );
  }
}

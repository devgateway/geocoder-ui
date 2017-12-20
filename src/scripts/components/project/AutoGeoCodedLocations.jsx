import React from 'react';
import Constants from "../../constants/Contants.es6";
import Message from '../Message.jsx';

export default class AutoGeoCodedLocations extends React.Component {
  render() {
    let locations;
    if (this.props.locations !== undefined) {
      locations = this.props.locations.filter(location => location.locationStatus === Constants.AUTO_CODED);
    } else {
      locations = [];
    }
    
    return (
      <div className="panel-section">
        <div className="padded-section">
          
          <div className="accordion-heading">
            <div className="geocoded-icon"/>
            <span className="accordion-title">Auto-Geocoded <span className="project-count">({locations.length})</span></span>
          </div>
          <div className="accordion-content">
            <div className="panel-content">
              <ul className="project-list search-results">
                {
                  locations.map((location) => {
                    return (<li key={location.id}>
                      <div className="project-location">
                        [[{location.name}]]: <span className="location-country">{location.name}</span>
                      </div>
                      <p>{location.locationClass.name}</p>
                      <div className="geocoded-btns">
                        <button className="remove">Remove</button>
                        <button className="preview">Preview</button>
                        <button className="verify">Verify</button>
                      </div>
                    </li>)
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

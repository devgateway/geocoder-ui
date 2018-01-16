import React from 'react';
import * as Shepherd from 'tether-shepherd';

require('tether-shepherd/dist/css/shepherd-theme-arrows.css');

/**
 * Component that uses 'tether-shepherd' library to display a help menu.
 * Extend this class to create specific help menus like 'GazetteerSearchHelp'.
 */
export default class Help extends React.Component {
  getButton(tour, button) {
    switch (button) {
      case "next":
        return {
          text: 'Next',
          action: tour.next,
          classes: 'btn'
        };
      case "back":
        return {
          text: 'Back',
          action: tour.back,
          classes: 'shepherd-button-secondary btn',
        };
      case "finish":
        return {
          text: 'Finish',
          action: tour.next,
          classes: 'btn'
        };
      case "exit":
        return {
          text: 'Exit',
          classes: 'shepherd-button-secondary btn',
          action: function () {
            return tour.hide();
          }
        };
      default:
        return {
          text: 'Next',
          action: tour.next,
          classes: 'btn'
        };
    }
  }
  
  addSteps(tour) {
    console.log("`addSteps` method not implemented!");
  }
  
  show() {
    const tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-arrows',
        showCancelLink: true
      }
    });
    
    this.addSteps(tour);
    
    tour.start();
  }
  
  render() {
    return (
      <span className="help pull-right" onClick={this.show.bind(this)}>{""}</span>
    );
  }
}

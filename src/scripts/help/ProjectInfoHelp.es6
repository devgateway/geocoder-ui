import React from 'react';
import Help from './Help.jsx'
import Message from '../components/Message.jsx';

export default class ProjectInfoHelp extends Help {
  addSteps(tour) {
    tour.addStep('step1', {
      title: 'Project Info Help',
      text: Message.t('help.main.panel_project'),
      attachTo: '.panel-heading bottom',
      buttons: [this.getButton(tour, 'exit'), this.getButton(tour, 'next')]
    });
    if (this.props.countSearch > 0) {
      tour.addStep('step2', {
        title: 'Project Info Help',
        text: Message.t('help.main.panel_locations'),
        attachTo: '.gazetteer-locations bottom',
        buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
      });
    }
    if (this.props.countAutogeoCoded > 0) {
      tour.addStep('step3', {
        title: 'Project Info Help',
        text: Message.t('help.main.panel_locations'),
        attachTo: '.autogeocoded bottom',
        buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
      });
    }
    tour.addStep('step4', {
      title: 'Project Info Help',
      text: Message.t('help.main.panel_geocoding'),
      attachTo: '.selected-locations bottom',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'finish')]
    });
  }
}

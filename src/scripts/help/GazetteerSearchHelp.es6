import React from 'react';
import Help from './Help.jsx';
import Message from '../components/Message.jsx';

export default class GazetteerSearchHelp extends Help {
  addSteps(tour) {
    tour.addStep('step1', {
      title: 'Gazetteer Search Help',
      text: Message.t('help.header.textinput'),
      attachTo: '.project-search input[type=text] bottom',
      buttons: [this.getButton(tour, 'exit'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step2', {
      title: 'Gazetteer Search Help',
      text: Message.t('help.header.fuzzycheck'),
      attachTo: '.project-search #fuzzydiv bottom',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step3', {
      title: 'Gazetteer Search Help',
      text: Message.t('help.header.countrycheck'),
      attachTo: '.project-search #countrydiv bottom',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step4', {
      title: 'Gazetteer Search Help',
      text: Message.t('help.header.searchbtn'),
      attachTo: '.project-search button bottom',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'finish')]
    });
  }
}
import React from 'react';
import Help from './Help.jsx'
import Message from '../components/Message.jsx'

export default class DataEntryHelp extends Help {
  addSteps(tour) {
    tour.addStep('step1', {
      title: 'Data Entry Help',
      text: Message.t('help.dataentry.locationclass'),
      attachTo: '#locationClass bottom',
      buttons: [this.getButton(tour, 'exit'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step2', {
      title: 'Data Entry Help',
      text: Message.t('help.dataentry.exactness'),
      attachTo: '#exactness bottom',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step3', {
      title: 'Data Entry Help',
      text: Message.t('help.dataentry.activitydescription'),
      attachTo: '#activityDescription bottom',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step4', {
      title: 'Data Entry Help',
      text: Message.t('help.dataentry.savebtn'),
      attachTo: '#savebutton bottom',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step5', {
      title: 'Data Entry Help',
      text: Message.t('help.dataentry.cancelbtn'),
      attachTo: '#cancelbutton bottom',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step6', {
      title: 'Data Entry Help',
      text: Message.t('help.dataentry.deletebtn'),
      attachTo: '#deletebutton bottom',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'finish')]
    });
  }
}

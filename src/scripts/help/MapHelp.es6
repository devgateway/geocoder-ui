import React from 'react';
import Help from './Help.jsx'
import Message from '../components/Message.jsx'

export default class MapHelp extends Help {
  addSteps(tour) {
    tour.addStep('step1', {
      title: 'Map Help',
      text: Message.t('help.main.map'),
      attachTo: '#mapContainer bottom',
      buttons: [this.getButton(tour, 'exit'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step2', {
      title: 'Map Help',
      text: Message.t('help.main.countrylayercontrol'),
      attachTo: '#countryLayerSelector right',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step3', {
      title: 'Map Help',
      text: Message.t('help.main.layercontrol'),
      attachTo: '.leaflet-control-layers-minimap left',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step4', {
      title: 'Map Help',
      text: Message.t('help.main.infocontrol'),
      attachTo: '#infoControl right',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step5', {
      title: 'Map Help',
      text: Message.t('help.main.zoomcontrol'),
      attachTo: '.leaflet-control-zoom left',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step6', {
      title: 'Map Help',
      text: Message.t('help.main.cancelbtn'),
      attachTo: '#cancelCoding top',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'next')]
    });
    
    tour.addStep('step7', {
      title: 'Map Help',
      text: Message.t('help.main.submitbtn'),
      attachTo: '#submitCoding left',
      buttons: [this.getButton(tour, 'back'), this.getButton(tour, 'finish')]
    });
  }
}

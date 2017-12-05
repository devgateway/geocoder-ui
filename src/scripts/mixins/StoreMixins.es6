import {createStore} from 'reflux';
import {Map} from 'immutable';

const FALSE_DATA = new Map({});

const StoreMixins = {
  initialData: FALSE_DATA,
  mixins: [],
  
  init: function () {
    if (this.initialData === FALSE_DATA) {
      throw new Error('Sane stores must specifi an initialData static property');
    }
    this.data = this.initialData;
  },
  
  setData: function (newData, silent) {
    this.data = newData;
    if (silent != true) {
      this.emit();
    }
  },
  
  get: function () {
    return this.data;
  },
  //use getdata to immutable data as js
  getData: function () {
    return this.data.toJS();
  },
  
  emit: function () {
    this.trigger(this.get());
  },
  
  getInitialState: function () {
    return this.get();
  },
}

export {StoreMixins};

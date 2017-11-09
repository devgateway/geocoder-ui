import React from 'react';

class BaseStoreComponent extends React.Component {

  constructor() {
     super()
   }

  componentDidMount() {
  	this.unsuscribe=this.store.listen(this.onStoreChange.bind(this));
  }

  componentWillUnmount() {
  	this.unsuscribe()
  }

  onStoreChange(data){
    this.setState(data);
  }

}

export default BaseStoreComponent

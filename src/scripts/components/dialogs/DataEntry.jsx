import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Link} from 'react-router';
import DataEntryStore from '../../stores/DataEntryStore.es6';
import LangStore from '../../stores/LangStore.es6';
import Reflux from "reflux";
import * as Actions from '../../actions/Actions.es6'
import Constants from '../../constants/Contants.es6';
import DataEntryHelp from '../../help/DataEntry.es6';
import ReactDOM from 'react-dom';
import Message from '../Message.jsx'
import MultiLangualInput from './MultiLangualInput.jsx'
import MultiLangualTextArea from './MultiLangualTextArea.jsx'
import LangSelector from '../LangSelector.jsx'


/*Popup Data Entry*/
class DataEntryContent extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  changeCodingValue(name, value,lang) {

    let val;
    switch (name) {
      case "locationClass":
        val = Constants.LOCATION_CLASS_LIST.find((item) => {
          if (item.code == value) return item;
        }) || null;
        break;
      case "exactness":
        val = Constants.EXACTNESS_LIST.find((item) => {
          if (item.code == value) return item;
        }) || null;
        break;
      default:
        val = value;
        break;
    }

    Actions.invoke(Constants.ACTION_CHANGE_CODING_VALUE, {'name': name, 'value': val,'lang':lang});
  }

  onDelete() {
    Actions.invoke(Constants.ACTION_SHOW_DELETE_CONFIRM);
  }

  doDelete() {
    Actions.invoke(Constants.ACTION_DELETE);
  }

  cancelDelete() {
    Actions.invoke(Constants.ACTION_CANCEL_DELETE);
  }

  onSave() {
      Actions.invoke(Constants.ACTION_SAVE_LOCATION);
  }


  updateAdminInfo(geonameID) {
    Actions.invoke(Constants.ACTION_UPDATE_ADM_FROM_GEONAMES, {'geonameID': geonameID});
  }

  updateAdminFromShapes(){
    Actions.invoke(Constants.ACTION_UPDATE_ADM_FROM_SHAPES)
  }

  updateLocationInfo(geonameID) {
    Actions.invoke(Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID, {'geonameID': geonameID});
  }


  render() {

    let {geocoding:{countryFeature,locationFeature},lang,confirmDeletion} = this.props;

    let {properties:{ activityDescriptions, administratives, descriptions,
      exactness,featuresDesignation,gazetteerAgency,locationClass,locationReach,
      locationStatus,names,locationIdentifiers}}=locationFeature

    debugger;
    let type='geocoding'

    let geonamesIdentifier=locationIdentifiers.find(id=>id.vocabulary.code=='G1')
    let geonamesId
    if (geonamesIdentifier){
        geonamesId=geonamesIdentifier.code
    }


    if (confirmDeletion) {
      return (
        <div>
          <h4 className='list-group-item-heading'>
            <Message k="dataentry.deletemessage"/>
          </h4>
          <hr/>
          <Button bsStyle='danger' onClick={e=>this.cancelDelete()}><Message k="general.no"/></Button>
          <Button bsStyle='success' className="pull-right" onClick={e=>this.doDelete()}><Message k="general.yes"/></Button>
        </div>
      )
    } else {

      return (
        <div id='dataentry' className={locationStatus == 'EXISTING' ? 'update' : 'new'}>
            <LangSelector></LangSelector>
            <label className=""><b> * All entered text will be stored in "{this.props.lang}" language</b></label>


              {locationIdentifiers.map(id=>
                <div className="row" key={id.id}>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="colored" htmlFor="id"><Message k="dataentry.identifier"/></label>
                          <div><input type="text" className="form-control" id="id" placeholder="id" value={id.code} disabled/></div>
                        </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group" id="source">
                    <label className="colored"><Message k="dataentry.source"/></label>
                  <input type="text" className="form-control" id="id" placeholder="id" value={id.vocabulary.name} disabled/>


              </div>
                </div>
              </div>
              )}

            <div id='noneditablefields'>
              <div className="row">
                <div className="col-lg-12">
                    <label className="colored" htmlFor="name">
                    <Message k="dataentry.name"/> {names.sort(it=>it.lang).map(d=>(<span><b>{d.lang}{' | '}</b></span>))}</label>
                    <MultiLangualInput id="name" name="name" texts={names}></MultiLangualInput>
                </div>
            </div>
            <div className="row">
               {administratives.sort((a,b)=>a.level-b.level).map(admin=>{return (
                 <div className={`col-lg-${12/administratives.length}`}>
                   <div className="form-group">
                     <label className="colored" htmlFor={`admin${admin.level}`}><Message k={`dataentry.admin${admin.level}`}/> </label>
                     <input type="text" className="form-control" id={`admin${admin.level}`} placeholder="NA" value={admin.name} disabled/>
                    <Message k="dataentry.source"/>: {admin.vocabulary.name}
                 </div>
                 </div>)})}
            </div>
              <div className="row">
                  <div className="col-lg-12 ">
                    Update admin names from:
                        {geonamesId?(<button className="btn btn-xs btn-success pull-right" onClick={e=>{this.updateAdminInfo(geonamesId)}}>
                          <Message k="dataentry.sourceadmin.geonames"/>
                        </button>):null}

                    {countryFeature?(<button className="btn btn-xs btn-success pull-right" onClick={e=>{this.updateAdminFromShapes()}}>
                       <Message k="dataentry.sourceadmin.shapes"/>
                    </button>):null}

                  </div>
              </div>




            <div className="row">
              <div className="col-lg-3">
                <div className="form-group">
                  <label className="colored"><Message k="dataentry.featuredesignation"/></label>
                  <input type="text" className="form-control" id="featureDesignation"
                         value={featuresDesignation.code} disabled/>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="form-group">
                  <label>&nbsp;</label>
                  <input type="text" className="form-control" id="featureDesignationName"
                         value={featuresDesignation.description} disabled/>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label className="colored" htmlFor="locationClass"><Message k="dataentry.locationclass"/></label>
                <select value={locationClass ? locationClass.code : ''} className="form-control"
                        name="locationClass" id="locationClass" onChange={e=>this.changeCodingValue(e.target.name, e.target.value)}>
                  <option>Select</option>
                  {
                    Constants.LOCATION_CLASS_LIST.map((item) => {
                      return (<option key={item.code} value={item.code}>{item.name}</option>)
                    })
                  }
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label className="colored" htmlFor="Exactness"><Message k="dataentry.geographicexactness"/></label>
                <select value={exactness ? exactness.code : ''} className="form-control"
                        name="exactness" id="exactness" onChange={e=>this.changeCodingValue(e.target.name, e.target.value)}>
                  <option>Select</option>
                  {
                    Constants.EXACTNESS_LIST.map((item) => {
                      return (<option key={item.code} value={item.code}>{item.name}</option>)
                    })
                  }
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="form-group">
                <label className="colored"><Message k="dataentry.activitydescription"/> {activityDescriptions.sort(it=>it.lang).map(d=>(<span><b>{d.lang}{' | '}</b></span>))}</label>
                <MultiLangualTextArea  name="activityDescriptions" id="activityDescription" onChange={this.changeCodingValue} texts={activityDescriptions}></MultiLangualTextArea>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="form-group">
                <label className="colored"><Message k="dataentry.description"/> {descriptions.sort(it=>it.lang).map(d=>(<span><b>{d.lang}{' | '}</b></span>))}</label>
                <MultiLangualTextArea  name="descriptions" id="description" onChange={this.changeCodingValue} texts={descriptions}></MultiLangualTextArea>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 help-container">
              <div className='separator'/>
              <DataEntryHelp parentId='dataentry' type={type}/>
              <div className='separator'/>

              <button className="btn btn-lg btn-success pull-right" id="savebutton" onClick={e=>this.onSave()}>
                {locationStatus == 'EXISTING' ? Message.t('dataentry.save') : Message.t('dataentry.update')}
              </button>

               <button className="btn btn-lg btn-danger pull-right" id="deletebutton" onClick={e=>this.onDelete()}>
                  <Message k="dataentry.delete"/>
              </button>

              <button className="btn btn-lg btn-warning pull-right" id="cancelbutton" onClick={e=>this.onCancel()}>
                  <Message k="dataentry.cancel"/>
              </button>

              <button className="btn btn-lg btn-default pull-right" title={Message.t('dataentry.updatefromgeonames')} onClick={e=>this.updateLocationInfo(geonamesId)}>
                  {(this.props.loadingGeonames) ? <i className="fa fa-refresh fa-spin"></i> : <i className="fa fa-refresh"></i>}
              </button>

            </div>
          </div>
          {this.props.error ?
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group has-error">
                  <label className="colored">
                    ERROR: {this.props.error}
                  </label>
                </div>
              </div>
            </div>
            : null}
        </div>
      );
    }//end else
  }
}


/*Data Entry Main Container*/
class DataEntry extends Reflux.Component {

  constructor() {
    super();

    this.state = {};
    this.stores = [DataEntryStore,LangStore];
  }



  render() {
  debugger;
    return (
      <Modal className="dataentry-dialog" {...this.props} show={this.state.showPopup} onHide={this.cancel} >
        <Modal.Body>
          <DataEntryContent {...this.state}/>
        </Modal.Body>
      </Modal>
    )
  }
}

export default DataEntry

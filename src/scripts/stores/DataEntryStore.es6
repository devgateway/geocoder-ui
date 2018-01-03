import {createStore} from 'reflux'
import * as Actions from '../actions/Actions.es6'
import Constants from '../constants/Contants.es6'
import {StoreMixins} from '../mixins/StoreMixins.es6'
import Reflux from "reflux"
import Settings from '../util/Settings.es6'
let settings = Settings.getInstace()

const initialState = {showPopup:false,save:false}


const LOCATION_CLASS_ADM_REGION = { "code": "1", "name": "Administrative Region"}
const LOCATION_CLASS_PPL = {"code": "2",  "name": "Populated Place"}
const LOCATION_CLASS_STR = {"code": "3",  "name": "Structure"}
const LOCATION_CLASS_OTHER = {"code": "4",  "name": "Other Topographical Feature"}



class DataEntryStore extends Reflux.Store {

  constructor() {

    super()
    this.state = initialState
    this.listenTo(Actions.get(Constants.ACTION_OPEN_DATAENTRY_POPUP), this.openPopup)

    this.listenTo(Actions.get(Constants.ACTION_CLOSE_DATAENTRY_POPUP), this.closePopup)

    this.listenTo(Actions.get(Constants.ACTION_CHANGE_CODING_VALUE), this.updateValue)

    this.listenTo(Actions.get(Constants.ACTION_SAVE_LOCATION), this.saveLocation)
    this.listenTo(Actions.get(Constants.ACTION_SHOW_DELETE_CONFIRM), this.beforeDelete)
    this.listenTo(Actions.get(Constants.ACTION_DELETE), this.delete)
    this.listenTo(Actions.get(Constants.ACTION_CANCEL), this.cancel)

    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID), this.loadingData)
    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID).completed, this.updateFromGeonames)
    this.listenTo(Actions.get(Constants.ACTION_SEARCH_LOCATION_BY_GEONAMEID).failed, this.geonamesFailed)


    this.listenTo(Actions.get(Constants.ACTION_UPDATE_ADM_FROM_GEONAMES), this.loadingAdminData)
    this.listenTo(Actions.get(Constants.ACTION_UPDATE_ADM_FROM_GEONAMES).completed, this.updateAdminData)
    this.listenTo(Actions.get(Constants.ACTION_UPDATE_ADM_FROM_GEONAMES).failed, this.geonamesFailed)

    this.listenTo(Actions.get(Constants.ACTION_UPDATE_ADM_FROM_GEONAMES), this.loadingAdminData)
    this.listenTo(Actions.get(Constants.ACTION_UPDATE_ADM_FROM_SHAPES), this.setShapesAdmins)

  }

  closePopup() {
    let newState = Object.assign({}, this.state)
    Object.assign(newState, {'showPopup': false,'save':false})//set the location to be used
    //Object.assign(newState, {'geocodingBackup': null})//set the location to be used
    this.setState(newState)
  }

  openPopup(data) {
    let newState = Object.assign({}, this.state)
    Object.assign(newState, {'geocoding': data,'showPopup': true,'confirmDeletion':false})//set the location to be used
    Object.assign(newState, {'geocodingBackup': data})//set the location to be used
    this.setState(newState)
  }


  beforeDelete() {
    let newState = Object.assign({}, this.state,{'confirmDeletion':true})
    this.setState(newState)
  }

  delete() {
    let newState = Object.assign({}, this.state,{'confirmDeletion':true})
    newState=this.valueChanged(newState,{'name':'locationStatus','value':'DELETED'})
    Object.assign(newState,{'save':true})
    this.setState(newState)
    this.closePopup()
  }


  saveLocation() {
    let newState = Object.assign({}, this.state)
    newState=this.valueChanged(newState,{'name':'locationStatus','value':'UPDATED'})
    Object.assign(newState,{'save':true})
    this.setState(newState)
    this.closePopup()

  }



  cleanStore() {
    this.setState(this.initialData)
  }




  updateValue(newValue) {
    let newState = Object.assign({}, this.state)
    newState=this.valueChanged(newState,newValue)
    this.setState(newState)
  }



  valueChanged(newState,newValue) {

    const {name,value,lang}=newValue
    const val = {}
    let newProperties = Object.assign({}, newState.geocoding.locationFeature.properties)

    if (lang!=undefined && lang !=null){

      let currentValues=newProperties[name].slice()
      debugger
      let position=currentValues.findIndex(it=>it.lang==lang)

      if (position>-1){
        if (value !='' && value!=null){
          currentValues[position]={'description':value,'lang':lang}
        }else{
          debugger
          currentValues.splice(position,1)
        }
      }else{
        currentValues.push({'description':value,'lang':lang})
      }
      val[name] =currentValues
    }else{
      val[name] =value
    }

    Object.assign(newProperties, val)
    newState.geocoding.locationFeature.properties = newProperties
    console.log(newState.geocoding.locationFeature.properties)

    return newState
  }



  loadingData() {
    let newState = Object.assign({}, this.state)
    Object.assign(newState, {'loadingGeonames': true})
    this.setState(newState)
  }


  loadingAdminData(){
    let newState = Object.assign({}, this.state)
    Object.assign(newState, {'loadingAdminNames': true})
    this.setState(newState)
  }


  setShapesAdmins(){
    debugger;
    const {geocoding:{countryFeature:{properties}}}=this.state

    const {ADMIN_0_CODE,ADMIN_0_NAME,ADMIN_1_CODE,ADMIN_1_NAME,ADMIN_2_CODE,ADMIN_2_NAME}=properties
    const data={adminCode0:ADMIN_0_CODE,adminCode1:ADMIN_1_CODE,adminCode2:ADMIN_2_CODE,adminName0:ADMIN_0_NAME,adminName1:ADMIN_1_NAME,adminName2:ADMIN_2_NAME}
    const vocabulary={code:"A3", name:"Global Administrative Areas"}
    this.setAdministratives(data,vocabulary)
  }

  updateAdminData(data) {
    let newState = Object.assign({}, this.state)
    Object.assign(newState, {'loadingAdminNames': false})
    const vocabulary={code:"G1", name:"Geonames"}
    this.setAdministratives(data,vocabulary)
  }

  setAdministratives(data,vocabulary) {
    debugger;
    let newState = Object.assign({}, this.state)
    var newLocationFeature = JSON.parse(JSON.stringify(newState.geocoding.locationFeature))
    const admins=[];
    const {adminCode0,adminCode1,adminCode2,adminName0,adminName1,adminName2}=data
    if (adminCode0 && adminName0){
        admins.push({code:adminCode0,level:1,name:adminName0,vocabulary})
    }
    if (adminCode1 && adminName1){
        admins.push({code:adminCode1,level:1,name:adminName1,vocabulary})
    }
    if (adminCode2 && adminName2){
        admins.push({code:adminCode2,level:2,name:adminName2,vocabulary})
    }
    newLocationFeature.properties.administratives=admins;
    newState.geocoding.locationFeature=newLocationFeature;
    this.setState(newState)
  }



  getClassFromFcl(fcl){
    if (fcl == 'A'){
      return LOCATION_CLASS_ADM_REGION
    }

    if (fcl == 'P'){
      return LOCATION_CLASS_PPL
    }

    if (fcl in ['R', 'S']){
      return LOCATION_CLASS_STR
    }
    else{
      return LOCATION_CLASS_OTHER
    }
  }


  updateFromGeonames(location) {
    debugger;
    let newState = Object.assign({}, this.state)

    Object.assign(newState, {'loadingGeonames': false})

    const langs = settings.get('I18N', 'LANGUAGES').map(l=>l.code)
    const names=location.alternateNames.filter((n)=>langs.indexOf(n.lang)>-1 && n.isPreferredName==true).map(name=>{
      return {'description':name.name,'lang':name.lang}
    })
    newState=this.valueChanged(newState,{'name':'names','value':names})
    newState=this.valueChanged(newState,{'name':'locationClass','value':this.getClassFromFcl(location.fcl)})
    newState=this.valueChanged(newState,{'name':'featuresDesignation','value':{code: "PPLC", name: "capital of a political entity"}})

    this.setState(newState)
  }

  geonamesFailed(error) {
    let newState = Object.assign({}, this.state)
    Object.assign(newState, {error, 'loadingGeonames': false, 'loadingAdminGeonames': false})
    this.setState(newState)
  }
}


export default DataEntryStore

<<<<<<< HEAD
import { createStore } from 'reflux'
import * as Actions from '../actions/Actions.es6'
import Constants from '../constants/Contants.es6'
import { StoreMixins } from '../mixins/StoreMixins.es6'
import Reflux from "reflux"
import Settings from '../util/Settings.es6'
let settings = Settings.getInstace()
import _ from 'lodash'
const initialState = { "confirmDeletion": false, "showPopup": false, "save": false, "add": false, "geocoding": { "locationFeature": {}, "countryFeature": {} } }


const LOCATION_CLASS_ADM_REGION = { "code": "1", "name": "Administrative Region" }
const LOCATION_CLASS_PPL = { "code": "2", "name": "Populated Place" }
const LOCATION_CLASS_STR = { "code": "3", "name": "Structure" }
const LOCATION_CLASS_OTHER = { "code": "4", "name": "Other Topographical Feature" }
=======
import Reflux from "reflux";
import * as Actions from '../actions/Actions.es6'
import Constants from '../constants/Contants.es6'
import Settings from '../util/Settings.es6'

let settings = Settings.getInstace();

const initialState = {
  showPopup: false,
  save: false
};
>>>>>>> master

const geoNamesVocabulary = { "code": "G1", "name": "Geonames", "lang": "en" }
const gadminVocabulary = { "code": "A3", "name": "Global Administrative Areas" }


class DataEntryStore extends Reflux.Store {
  constructor() {
<<<<<<< HEAD

    super()
    this.state = _.cloneDeep(initialState)

=======
    super();
    
    this.state = initialState;
    
>>>>>>> master
    this.listenTo(Actions.get(Constants.ACTION_OPEN_DATAENTRY_POPUP), this.openPopup)
    this.listenTo(Actions.get(Constants.ACTION_CLOSE_DATAENTRY_POPUP), this.closePopup)
    this.listenTo(Actions.get(Constants.ACTION_CHANGE_CODING_VALUE), this.updateValue)
    this.listenTo(Actions.get(Constants.ACTION_SHOW_DELETE_CONFIRM), this.beforeDelete)

    this.listenTo(Actions.get(Constants.ACTION_SAVE), this.save)
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
<<<<<<< HEAD
    this.listenTo(Actions.get(Constants.ACTION_TRANSFORM_TO_GEOCODING), this.makeGeoCoding)

=======
    this.listenTo(Actions.get(Constants.ACTION_TRANSFORM_TO_GEOCODING),this.makeGeoCoding)
    
>>>>>>> master
  }
  
  closePopup() {

    this.setState(_.cloneDeep(initialState))
  }
  
  openPopup(data) {
<<<<<<< HEAD

    let newState = _.cloneDeep(this.state)
    Object.assign(newState, { 'geocoding': _.cloneDeep(data), 'showPopup': true, 'confirmDeletion': false }) //set the location to be used
=======
    let newState = Object.assign({}, this.state);
    Object.assign(newState, {'geocoding': JSON.parse(JSON.stringify(data)),'showPopup': true,'confirmDeletion':false})//set the location to be used
>>>>>>> master
    this.setState(newState)
  }
  
  
  beforeDelete() {
    let newState = Object.assign({}, this.state, { 'confirmDeletion': true })
    this.setState(newState)
  }
  
  
  cancel() {
    this.setState(_.cloneDeep(initialState))
  }
  
  delete() {
    let newState = Object.assign({}, this.state, { 'confirmDeletion': false })
    newState = this.valueChanged(newState, { 'name': 'locationStatus', 'value': 'DELETED' })
    Object.assign(newState, { 'save': true })
    this.setState(newState)
    this.closePopup()
  }
<<<<<<< HEAD


  save() {

    let newState = _.cloneDeep(this.state)

    const { geocoding: { locationFeature: { properties: { locationStatus } } } } = newState

    if (locationStatus != 'NEW') {
      newState = this.valueChanged(newState, { 'name': 'locationStatus', 'value': 'UPDATED' })
      Object.assign(newState, { 'save': true })
    } else {
      Object.assign(newState, { 'add': true })
    }
    this.setState(newState)
    this.closePopup();
  }



=======
  
  
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
  
  
>>>>>>> master
  updateValue(newValue) {
    let newState = _.cloneDeep(this.state)
    newState = this.valueChanged(newState, newValue)
    this.setState(newState)
  }
<<<<<<< HEAD


  valueChanged(newState, newValue) {
    const { name, value, lang } = newValue
    const val = {}
    let newProperties = Object.assign({}, newState.geocoding.locationFeature.properties)
    if (lang != undefined && lang != null) {
      let currentValues = newProperties[name].slice()
      let position = currentValues.findIndex(it => it.lang == lang)
      if (position > -1) {
        if (value != '' && value != null) {
          currentValues[position] = { 'description': value, 'lang': lang }
        } else {
          currentValues.splice(position, 1)
=======
  
  
  valueChanged(newState,newValue) {
    
    const {name,value,lang}=newValue
    const val = {}
    let newProperties = Object.assign({}, newState.geocoding.locationFeature.properties)
    
    if (lang!=undefined && lang !=null){
      
      let currentValues=newProperties[name].slice()
      
      let position=currentValues.findIndex(it=>it.lang==lang)
      
      if (position>-1){
        if (value !='' && value!=null){
          currentValues[position]={'description':value,'lang':lang}
        }else{
          
          currentValues.splice(position,1)
>>>>>>> master
        }
      } else {
        currentValues.push({ 'description': value, 'lang': lang })
      }
      val[name] = currentValues
    } else {
      val[name] = value
    }
    
    Object.assign(newProperties, val)
    newState.geocoding.locationFeature.properties = newProperties
    console.log(newState.geocoding.locationFeature.properties)
<<<<<<< HEAD
    return newState
  }

  makeGeoCoding(data) {

    const { locationFeature: { properties }, countryFeature } = data
    const { lat, lng, geonameId, name, toponymName, alternateNames, fcl, fcode, fcodeName } = properties
    const names = this.getNames(name, toponymName, alternateNames)
    const admins = []
    let { adminCode0, adminCode1, adminCode2, adminName0, adminName1, adminName2 } = properties

    if (countryFeature) {
      const { ADMIN_0_CODE, ADMIN_1_CODE, ADMIN_2_CODE, ADMIN_0_NAME, ADMIN_1_NAME, ADMIN_2_NAME } = countryFeature.properties
      adminCode0 = ADMIN_0_CODE
      adminCode1 = ADMIN_1_CODE
      adminCode2 = ADMIN_2_CODE
      adminName0 = ADMIN_0_NAME
      adminName1 = ADMIN_1_NAME
      adminName2 = ADMIN_2_NAME
    }

    if (adminCode0 && adminName0) {
      admins.push({ "code": adminCode0, "level": 0, "name": adminName0, "vocabulary": gadminVocabulary })
    }
    if (adminCode1 && adminName1) {
      admins.push({ "code": adminCode1, "level": 1, "name": adminName1, "vocabulary": gadminVocabulary })
    }
    if (adminCode2 && adminName2) {
      admins.push({ "code": adminCode2, "level": 2, "name": adminName2, "vocabulary": gadminVocabulary })
    }

    const props = {
      "id": geonameId,
      "names": names,
      "activityDescriptions": [],
      "descriptions": [],
      "locationIdentifiers": [{ "vocabulary": geoNamesVocabulary, "code": geonameId }],
      "administratives": admins,
      "locationClass": this.getClassFromFcl(fcl),
      "exactness": { "id": 21, "code": "1", "name": "Exact" },
      "locationReach": { "id": 19, "code": "1", "name": "Activity" },
      "featuresDesignation": { "code": fcode, "name": fcodeName },
      "locationStatus": "NEW"
    }

    const newLocationFeature = {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [lng, lat] },
      "properties": props
    }

    let newState = _.cloneDeep(initialState)
    let newGeocding = _.cloneDeep(newState.geocoding)
    Object.assign(newGeocding, { locationFeature: newLocationFeature, countryFeature: _.cloneDeep(data.countryFeature) })
    Object.assign(newState, { geocoding: newGeocding, 'showPopup': true })

    this.setState(newState)
  }


=======
    
    return newState
  }
  
  
  
  makeGeoCoding(data){
    
    const {locationFeature:{properties},countryFeature}=data
    const {lat,lng,geonameId,name,toponymName,alternateNames,fcl,fcode,fcodeName}=properties
    const names=this.getNames(name,toponymName,alternateNames)
    const admins=[]
    
    const {ADMIN_0_CODE,ADMIN_1_CODE,ADMIN_2_CODE,ADMIN_0_NAME,ADMIN_1_NAME,ADMIN_2_NAME}=countryFeature.properties
    
    const adminCode0=ADMIN_0_CODE
    const adminCode1=ADMIN_1_CODE
    const adminCode2=ADMIN_2_CODE
    const adminName0=ADMIN_0_NAME
    const adminName1=ADMIN_1_NAME
    const adminName2=ADMIN_2_NAME
    
    
    if (adminCode0 && adminName0){
      admins.push({"code":adminCode0,"level":0,"name":adminName0,"vocabulary":gadminVocabulary})
    }
    if (adminCode1 && adminName1){
      admins.push({"code":adminCode1,"level":1,"name":adminName1,"vocabulary":gadminVocabulary})
    }
    if (adminCode2 && adminName2){
      admins.push({"code":adminCode2,"level":2,"name":adminName2,"vocabulary":gadminVocabulary})
    }
    
    const props={
      "names":names,
      "activityDescriptions":[],
      "descriptions":[],
      "locationIdentifiers":[{"vocabulary":geoNamesVocabulary,"code":geonameId}],
      "administratives":admins,
      "locationClass":this.getClassFromFcl(fcl),
      //"exactness":{"id":21,"code":"1","name":"Exact","description":"The designated geographic location is exact","lang":"en"},"locationReach":{"id":19,"code":"1","name":"Activity","description":"The location specifies where the activity is carried out","lang":"en"},
      "featuresDesignation":{"code": fcode, "name":fcodeName},
      "locationStatus":"NEW"
      //  "precision":null,"gazetteerAgency":null,"locationStatus":"EXISTING","x":31.58247,"y":4.85165}
    }
    
    const newLocationFeature = {
      "type":"Feature",
      "geometry":{"type":"Point","coordinates":[lng,lat]},
      "properties":props,
      "propertiesBackup":JSON.parse(JSON.stringify(props))
    }
    
    let newState=Object.assign({},this.state)
    let newGeocding=Object.assign({},newState.geocoding)
    Object.assign(newGeocding,{locationFeature:newLocationFeature,countryFeature:JSON.parse(JSON.stringify(data.countryFeature))})
    Object.assign(newState,{geocoding:newGeocding,'showPopup': true})
    
    this.setState(newState)
  }
  
  
>>>>>>> master
  loadingData() {
    let newState = _.cloneDeep(this.state)
    Object.assign(newState, { 'loadingGeonames': true })
    this.setState(newState)
  }
<<<<<<< HEAD


  loadingAdminData() {
    let newState = _.cloneDeep(this.state)
    Object.assign(newState, { 'loadingAdminNames': true })
    this.setState(newState)
  }


  setShapesAdmins() {
    const { geocoding: { countryFeature: { properties } } } = this.state
    const { ADMIN_0_CODE, ADMIN_0_NAME, ADMIN_1_CODE, ADMIN_1_NAME, ADMIN_2_CODE, ADMIN_2_NAME } = properties
    const data = { adminCode0: ADMIN_0_CODE, adminCode1: ADMIN_1_CODE, adminCode2: ADMIN_2_CODE, adminName0: ADMIN_0_NAME, adminName1: ADMIN_1_NAME, adminName2: ADMIN_2_NAME }
    this.setAdministratives(data, gadminVocabulary)
=======
  
  
  loadingAdminData(){
    let newState = Object.assign({}, this.state)
    Object.assign(newState, {'loadingAdminNames': true})
    this.setState(newState)
  }
  
  
  setShapesAdmins(){
    const {geocoding:{countryFeature:{properties}}}=this.state
    const {ADMIN_0_CODE,ADMIN_0_NAME,ADMIN_1_CODE,ADMIN_1_NAME,ADMIN_2_CODE,ADMIN_2_NAME}=properties
    const data={adminCode0:ADMIN_0_CODE,adminCode1:ADMIN_1_CODE,adminCode2:ADMIN_2_CODE,adminName0:ADMIN_0_NAME,adminName1:ADMIN_1_NAME,adminName2:ADMIN_2_NAME}
    this.setAdministratives(data,gadminVocabulary)
>>>>>>> master
  }
  
  updateAdminData(data) {
    let newState = _.cloneDeep(this.state)
    Object.assign(newState, { 'loadingAdminNames': false })
    this.setAdministratives(data, geoNamesVocabulary)
  }
<<<<<<< HEAD

  setAdministratives(data, vocabulary) {
    let newState = _.cloneDeep(this.state)
    var newLocationFeature = _.cloneDeep(newState.geocoding.locationFeature)
    const admins = [];
    const { adminCode0, adminCode1, adminCode2, adminName0, adminName1, adminName2 } = data
    if (adminCode0 && adminName0) {
      admins.push({ code: adminCode0, level: 0, name: adminName0, vocabulary })
    }
    if (adminCode1 && adminName1) {
      admins.push({ code: adminCode1, level: 1, name: adminName1, vocabulary })
    }
    if (adminCode2 && adminName2) {
      admins.push({ code: adminCode2, level: 2, name: adminName2, vocabulary })
=======
  
  setAdministratives(data,vocabulary) {
    
    let newState = Object.assign({}, this.state)
    var newLocationFeature = JSON.parse(JSON.stringify(newState.geocoding.locationFeature))
    const admins=[];
    const {adminCode0,adminCode1,adminCode2,adminName0,adminName1,adminName2}=data
    if (adminCode0 && adminName0){
      admins.push({code:adminCode0,level:0,name:adminName0,vocabulary})
    }
    if (adminCode1 && adminName1){
      admins.push({code:adminCode1,level:1,name:adminName1,vocabulary})
    }
    if (adminCode2 && adminName2){
      admins.push({code:adminCode2,level:2,name:adminName2,vocabulary})
>>>>>>> master
    }
    newLocationFeature.properties.administratives = admins;
    newState.geocoding.locationFeature = newLocationFeature;
    this.setState(newState)
  }
<<<<<<< HEAD



  getClassFromFcl(fcl) {
    if (fcl == 'A') {
      return LOCATION_CLASS_ADM_REGION
    }

    if (fcl == 'P') {
      return LOCATION_CLASS_PPL
    }

    if (fcl in ['R', 'S']) {
=======
  
  
  
  getClassFromFcl(fcl){
    if (fcl == 'A'){
      return LOCATION_CLASS_ADM_REGION
    }
    
    if (fcl == 'P'){
      return LOCATION_CLASS_PPL
    }
    
    if (fcl in ['R', 'S']){
>>>>>>> master
      return LOCATION_CLASS_STR
    } else {
      return LOCATION_CLASS_OTHER
    }
  }
<<<<<<< HEAD


  getNames(defName, toponymName, alternateNames) {

    const langs = settings.get('I18N', 'LANGUAGES').map(l => l.code)

    const names = []
    langs.forEach(lng => {

      let name = null
      let candidates = alternateNames ? alternateNames.filter(n => n.lang == lng) : []

      if (candidates.length == 1) {
        name = { 'description': candidates[0].name, 'lang': lng }
      }

      if (candidates.length > 1) {
        let filterd = candidates.filter(c => c.isPreferredName == true)
        if (filterd && filterd.length > 0) {
          name = { 'description': filterd[0].name, 'lang': lng }
        }
      }

      if (name == null && lng == 'en') {
        name = { 'description': defName, 'lang': lng }
      } else if (name == null) {
        name = { 'description': toponymName, 'lang': lng }
      }

      if (name != null) {
=======
  
  
  getNames(defName,toponymName,alternateNames){
    
    const langs = settings.get('I18N', 'LANGUAGES').map(l=>l.code)
    
    const names=[]
    langs.forEach(lng=>{
      
      let name=null
      let candidates=alternateNames.filter(n=>n.lang==lng)
      
      if (candidates.length ==1){
        name= {'description':candidates[0].name,'lang':lng}
      }
      
      if(candidates.length > 1){
        let filterd=candidates.filter(c=>c.isPreferredName==true)
        if (filterd && filterd.length >0){
          name={'description':filterd[0].name,'lang':lng}
        }
      }
      
      if (name==null && lng=='en'){
        name={'description':defName,'lang':lng}
      }else if(name==null){
        name={'description':toponymName,'lang':lng}
      }
      
      if (name!=null){
>>>>>>> master
        names.push(name)
      }
      
    })
    
    return names
  }
  
  updateFromGeonames(location) {
<<<<<<< HEAD

    let newState = _.cloneDeep(this.state)
    Object.assign(newState, { 'loadingGeonames': false })
    const names = this.getNames(location.name, location.toponymName, location.alternateNames)
    newState = this.valueChanged(newState, { 'name': 'names', 'value': names })
    newState = this.valueChanged(newState, { 'name': 'locationClass', 'value': this.getClassFromFcl(location.fcl) })
    newState = this.valueChanged(newState, { 'name': 'featuresDesignation', 'value': { code: location.fcode, name: location.fcodeName } })

=======
    
    let newState = Object.assign({}, this.state)
    Object.assign(newState, {'loadingGeonames': false})
    const names=this.getNames(location.name,location.toponymName,location.alternateNames)
    newState=this.valueChanged(newState,{'name':'names','value':names})
    newState=this.valueChanged(newState,{'name':'locationClass','value':this.getClassFromFcl(location.fcl)})
    newState=this.valueChanged(newState,{'name':'featuresDesignation','value':{code: location.fcode, name: location.fcodeName}})
    
>>>>>>> master
    this.setState(newState)
  }
  
  geonamesFailed(error) {
    let newState = _.cloneDeep(this.state)
    Object.assign(newState, { error, 'loadingGeonames': false, 'loadingAdminGeonames': false })

    this.setState(newState)
  }
}


export default DataEntryStore

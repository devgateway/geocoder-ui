import {
	createStore
}
from 'reflux';
import  { Map } from 'immutable';
import * as Actions from '../actions/Actions.es6';
import  Constants from '../constants/Contants.es6';
import {
	StoreMixins
}
from '../mixins/StoreMixins.es6';

 import Stateful from '../mixins/StoreMixins.es6';

const pageSize = 20;
const initialData =new Map( {
	files:[],
	data: {},
 	page:1,
	params: {
		t: '',
		withLoc: 'none',
		'sort': 'title',
		'order': 1,

	}
});

const Projects = createStore({

	initialData: initialData,

	mixins: [StoreMixins],


	init() {
		this.data = initialData;
		this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS), 'loading');
		this.listenTo(Actions.get(Constants.ACTION_SET_FILE), 'setFile');
		this.listenTo(Actions.get(Constants.ACTION_UPLOAD_FILE).completed, 'uploadCompleted');
		this.listenTo(Actions.get(Constants.ACTION_UPLOAD_FILE).failed, 'uploadCompleted');
		this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS).completed, 'completed');
		this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS).failed, 'failed');
		this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS_SET_PARAM), 'setParam');
		this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS_SET_PAGE), 'setPage');

	},

	loading() {
		console.log('Loading all projects...')
	},

	completed(data) {

		this.setData( this.get().set('data',Map(data)));
	},


	setParam(param) {

		let resetParams=Object.assign({},this.get().params,{'skip':0});
		//let newState = this.cloneState({page:1,params:resetParams}); //reset pagination since it will be a new result
		//Object.assign(newState.params, param);
		const state=this.get().setIn(['page'],1)
		this.setData(state)
		Actions.invoke(Constants.ACTION_FIND_PROJECTS,state );
	},


	setFile(files) {

		let newState = this.cloneState({files:files}); //reset pagination since it will be a new result
		this.setData(newState);
		Actions.invoke(Constants.ACTION_UPLOAD_FILE, files[0]);
	},

	setPage(page) {

		let skip = (page - 1) * pageSize;
		let limit = pageSize;
		let newState = this.cloneState({page});
		Object.assign(newState.params, {skip, limit});
		this.setData(newState);
		Actions.invoke(Constants.ACTION_FIND_PROJECTS, newState.params);
	},

	uploadCompleted(){

		let newState = this.cloneState({files:[]}); //reset pagination since it will be a new result
		this.setData(newState);
	},





	failed(message) {

		console.error(`Error loading projects: ${message}`)
	}

});


export default Projects;

import {
    createStore
}
from 'reflux';
import {
    Map,
    fromJS,
} from 'immutable';
import * as Actions from '../actions/Actions.es6';
import Constants from '../constants/Contants.es6';
import {
    StoreMixins
}
from '../mixins/StoreMixins.es6';

import Stateful from '../mixins/StoreMixins.es6';

const pageSize = 20;
const initialData = new fromJS({
    files: [],
    data: {},
    params: {
        t: '',
        'withLoc': 'none',
        'sort': 'title',
        'order': 1,
        'page': 1,
        'lan': 'en',
				'page':0
    }
});

const Projects = createStore({

    initialData: initialData,

    mixins: [StoreMixins],


    init() {
        this.data = initialData;
        this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS), 'loading');
        this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS).completed, 'completed');
        this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS).failed, 'failed');
        this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS_SET_PARAM), 'setParam');
        this.listenTo(Actions.get(Constants.ACTION_FIND_PROJECTS_SET_PAGE), 'setPage');

    },

    loading() {
        console.log('Loading all projects...')
    },

    completed(data) {
				debugger;
			  this.setData(this.get().set('data', Map(data)));
    },


    setParam(params) {

        const state = this.get().setIn(['params'], Map(params))
																.setIn(['params', 'page'], 0)
        this.setData(state)
				debugger;
        Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.get().get('params').toJS());
    },


    setPage(page) {
        const state = this.get().setIn(['params', 'page'], page-1);
        this.setData(state);
        Actions.invoke(Constants.ACTION_FIND_PROJECTS, this.get().get('params').toJS());
    },


    failed(message) {
        console.error(`Error loading projects: ${message}`)
    }

});


export default Projects;

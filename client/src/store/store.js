import Vue from 'vue';
import Vuex from 'vuex';

import action from './actions';
import mutations from './mutations'
import state from './state'
Vue.use(Vuex);

let store = new Vuex.Store({
    state,
    action,
    mutations
});
export default store

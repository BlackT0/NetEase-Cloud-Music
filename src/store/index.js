import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state';
import getters from './getter';
import mutations from './mutations';
import actions from './actions';


export default new Vuex.Store({
    state,
    getters,
    // mutations 保存修改数据的全局方法
    mutations,
    // actions：用于保存触发mutations中的方法
    actions,
    modules: {}
})

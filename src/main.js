import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './assets/iconfont/iconfont.css'

//引入所有CSS文件
import './assets/css/base.scss'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    attempt: 1
})
Vue.config.productionTip = false

new Vue({
    VueLazyload,
    router,
    store,
    render: h => h(App)
}).$mount('#app')

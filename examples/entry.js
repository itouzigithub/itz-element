import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'simditor/styles/simditor.css';
import itzElement from '../src/index.js';
import VueResource from 'vue-resource';
import App from './app';
import VueRouter from 'vue-router';
import configRouter from './route.config';
import mainHeader from './components/header';
import sideNav from './components/side-nav';

Vue.use(VueResource);
Vue.use(Element);
Vue.use(itzElement);
Vue.use(VueRouter);
Vue.component('main-header', mainHeader);
Vue.component('side-nav', sideNav);
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: configRouter
});
Vue.http.options.emulateJSON = true;

var vm  = new Vue({ // eslint-disable-line
    render: h => h(App),
    router
}).$mount('#app');

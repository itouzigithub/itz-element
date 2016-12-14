import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'simditor/styles/simditor.css';
import itzElement from '../src/index.js';
import VueResource from 'vue-resource';
import App from './app';

Vue.use(VueResource);
Vue.use(Element);
Vue.use(itzElement);
new Vue({ // eslint-disable-line
  el: '#app',
  render: h => h(App)
});

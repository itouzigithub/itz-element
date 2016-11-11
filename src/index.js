import ItzTable from '../packages/itzTable/index.js';
import ItzForm from '../packages/itzForm/index.js';
import ItzFormItem from '../packages/ItzFormItem/index.js';
const install = function(Vue) {
  if (install.installed) return;

  Vue.component(ItzTable.name, ItzTable);
  Vue.component(ItzForm.name, ItzForm);
  Vue.component(ItzFormItem.name, ItzFormItem);
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  version: '1.0.0',
  install: install,
  ItzTable,
  ItzForm,
  ItzFormItem
};

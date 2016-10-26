import ItzTable from '../packages/itzTable/index.js';

const install = function(Vue) {
  if (install.installed) return;

  Vue.component(ItzTable.name, ItzTable);
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

module.exports = {
  version: '1.0.0',
  install:install,
  ItzTable
};

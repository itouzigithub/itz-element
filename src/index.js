import ItzTable from '../packages/itzTable/index.js';
import ItzForm from '../packages/itzForm/index.js';
import ItzFormItem from '../packages/itzFormItem/index.js';
import ItzEditor from '../packages/itzEditor/index.js';
import ItzUpload from '../packages/itzUpload/index.js';
const install = function(Vue) {
  if (install.installed) return;

  Vue.component(ItzTable.name, ItzTable);
  Vue.component(ItzForm.name, ItzForm);
  Vue.component(ItzFormItem.name, ItzFormItem);
  Vue.component(ItzEditor.name, ItzEditor);
  Vue.component(ItzUpload.name, ItzUpload);
};
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default { //eslint-disable-line no-undef
  version: '1.0.0',
  install: install,
  ItzTable,
  ItzForm,
  ItzFormItem,
  ItzEditor,
  ItzUpload
};

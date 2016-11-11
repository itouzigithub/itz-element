const ItzFormItem = require('../itzForm/src/itzFormItem');

ItzFormItem.install = function(Vue) {
    Vue.component(ItzFormItem.name, ItzFormItem);
};

module.exports = ItzFormItem;

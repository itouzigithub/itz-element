const ItzForm = require('./src/itzForm');

ItzForm.install = function(Vue) {
    Vue.component(ItzForm.name, ItzForm);
};

module.exports = ItzForm;

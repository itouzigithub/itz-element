const ItzUpload = require('./src/itzUpload');

ItzUpload.install = function(Vue) {
    Vue.component(ItzUpload.name, ItzUpload);
};

module.exports = ItzUpload;

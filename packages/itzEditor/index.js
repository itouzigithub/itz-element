const ItzEditor = require('./src/itzEditor');

ItzEditor.install = function(Vue) {
    Vue.component(ItzEditor.name, ItzEditor);
};

module.exports = ItzEditor;

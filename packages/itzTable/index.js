const ItzTable = require('./src/itzTable');

ItzTable.install = function(Vue) {
  Vue.component(ItzTable.name, ItzTable);
};

module.exports = ItzTable;

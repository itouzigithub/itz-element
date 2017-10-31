var cooking = require('cooking');
var config = require('./config');
const fs = require('fs');
const path = require('path');

cooking.set({
  entry: './src/index.js',
  dist: './lib',
  clean: false,
  format: 'cjs',
  extends: ['vue2'],
  minimize: false,
  alias: config.alias,
  externals: { vue: 'vue' }
});

cooking.add('output.filename', 'itz-dashboard-ui.common.js');

fs.writeFile(__dirname+'/con1.log', JSON.stringify(cooking.resolve()), (error) => {
  console.log(error);
});
module.exports = cooking.resolve();

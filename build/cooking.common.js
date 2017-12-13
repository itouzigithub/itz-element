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

var config = cooking.resolve();

var json = JSON.stringify(config,function(key,value) {
    if (key == 'test') {
        return value.toString();
    }else {
        return value;
    }
})

fs.writeFile(__dirname+'/con1.json', json, (error) => {
  console.log(error);
});
module.exports = config;

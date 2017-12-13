var cooking = require('cooking');
var config = require('./config');
const fs = require('fs');
const path = require('path');

cooking.set({
  entry: './examples/entry.js',
  dist: './examples/dist',
  template: './examples/index.tpl',

  devServer: {
    port: 8081,
    hostname:'localhost',
    publicPath: 'http://localhost:8081/'
  },

  // production
  clean: true,
  hash: true,
  sourceMap: true,
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: '/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: true,
  alias: config.alias,
  extends: ['vue2', 'buble']
});

cooking.add('loader.less', {
  test: /\.less$/,
  loaders: ['less-loader']
})

var conf = cooking.resolve();
conf.resolve.extensions.push('.less');

var json = JSON.stringify(conf,function(key,value) {
    if (key == 'test') {
        return value.toString();
    }else {
        return value;
    }
})
fs.writeFile(__dirname+'/conDemo.json', json, (error) => {
  console.log(error);
});
module.exports = conf;

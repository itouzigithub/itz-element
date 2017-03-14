var cooking = require('cooking');
var config = require('./config');

cooking.set({
  entry: './examples/entry.js',
  dist: './examples/dist',
  template: './examples/index.tpl',

  devServer: {
    port: 8081,
    hostname:'10.100.10.31',
    publicPath: 'http://10.100.10.31:8081/'
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

module.exports = cooking.resolve();

// Fix for html-webpack-plugin loader issue
const path = require('path');

module.exports = {
  resolveLoader: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ]
  }
};
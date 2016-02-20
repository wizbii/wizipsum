var path = require('path')

module.exports = {
  entry: {
    popup: "./src/js/popup.js",
    content: "./src/js/content.js"
  },
  output: {
    path: path.join(__dirname, 'public', 'scripts'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loaders: ['json-loader'] }
    ]
  }
}
